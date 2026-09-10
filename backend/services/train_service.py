from sqlalchemy.orm import Session
from database.db import Train, Station, Schedule, LiveStatus, DelayHistory
from models.schemas import TrainStatusResponse, LiveStatusSchema, StationETA, PredictionResponse
from prediction.eta_engine import engine as prediction_engine
from typing import List, Optional, Dict
from datetime import datetime, timedelta
import random


def get_delay_reason_text(delay_minutes: int, speed: float, congestion: float, restriction: bool, weather: float, station_code: str = "") -> str:
    """Generate intelligent root-cause explanation for train delay."""
    if delay_minutes <= 0:
        return "Running on Schedule — Clear Line & Green Signals"
    if speed == 0 and delay_minutes > 5:
        return f"Unscheduled Signal Hold at {station_code or 'Outer'} Junction"
    if congestion >= 0.4:
        return f"Heavy Line Congestion & Goods Precedence ({int(congestion * 100)}%)"
    if restriction:
        return "Permanent Way Speed Restriction (30 km/h Caution Order)"
    if weather >= 0.2:
        return "Adverse Weather / Fog Safety Speed Regulation"
    return "Station Dwell Extension & Platform Clearance"


def ensure_train_exists(db: Session, train_no: str) -> Train:
    """
    On-demand train generator: If a user enters ANY train number that doesn't
    exist in the database, automatically generate realistic route, stations,
    schedule, live status, and historical data so that ANY train can be tracked!
    """
    clean_no = str(train_no).strip()
    train = db.query(Train).filter(Train.train_no == clean_no).first()
    if train:
        # Check if it has a live status; if not, create one
        live = db.query(LiveStatus).filter(LiveStatus.train_id == train.id).first()
        if not live:
            create_dynamic_live_status(db, train)
        return train

    # Generate a realistic train profile
    train_types = [
        "Superfast Express", "Vande Bharat Express", "Rajdhani Express",
        "Express", "Mail/Express", "Shatabdi Express"
    ]
    picked_type = random.choice(train_types)
    train_name = f"Indian Railways Express ({clean_no})"

    # Corridors to choose from
    corridors = [
        [("HYB", "Hyderabad Deccan", 0), ("KZJ", "Kazipet Jn", 141), ("WL", "Warangal", 151),
         ("BZA", "Vijayawada Jn", 358), ("OGL", "Ongole", 496), ("NLR", "Nellore", 613), ("MAS", "MGR Chennai Central", 789)],
        [("NDLS", "New Delhi", 0), ("AGC", "Agra Cantt", 195), ("GWL", "Gwalior Jn", 313),
         ("VGLJ", "Virangana Lakshmibai", 411), ("BPL", "Bhopal Jn", 703), ("ET", "Itarsi Jn", 795), ("NGP", "Nagpur Jn", 1093)],
        [("MMCT", "Mumbai Central", 0), ("ST", "Surat", 263), ("BRC", "Vadodara Jn", 392),
         ("KOTA", "Kota Jn", 920), ("NDLS", "New Delhi", 1386)],
        [("SBC", "KSR Bengaluru City", 0), ("SC", "Secunderabad Jn", 703), ("KZJ", "Kazipet Jn", 835),
         ("BPQ", "Balharshah Jn", 1070), ("NGP", "Nagpur Jn", 1278), ("NZM", "Hazrat Nizamuddin", 2365)],
        [("HWH", "Howrah Jn", 0), ("KGP", "Kharagpur Jn", 115), ("BBS", "Bhubaneswar", 437),
         ("VSKP", "Visakhapatnam Jn", 880), ("BZA", "Vijayawada Jn", 1229), ("MAS", "MGR Chennai Central", 1661)],
    ]
    corridor = random.choice(corridors)
    from_st, to_st = corridor[0], corridor[-1]

    train = Train(
        train_no=clean_no,
        train_name=train_name,
        from_station=from_st[1],
        from_code=from_st[0],
        to_station=to_st[1],
        to_code=to_st[0],
        train_type=picked_type,
        is_active=True
    )
    db.add(train)
    db.flush()

    # Create schedules
    base_hour = random.randint(5, 14)
    for idx, (code, name, dist) in enumerate(corridor, start=1):
        arr_h = (base_hour + int(dist / 70)) % 24
        arr_m = (int(dist) * 3) % 60
        arr_str = "Starts" if idx == 1 else f"{arr_h:02d}:{arr_m:02d}"
        dep_str = "Ends" if idx == len(corridor) else f"{(arr_h + (1 if arr_m >= 55 else 0)) % 24:02d}:{(arr_m + 5) % 60:02d}"

        sch = Schedule(
            train_id=train.id,
            station_code=code,
            station_name=name,
            arrival_time=arr_str,
            departure_time=dep_str,
            stop_number=idx,
            distance_from_origin=float(dist),
            avg_halt_minutes=5 if idx not in (1, len(corridor)) else 0
        )
        db.add(sch)

    # Create live status
    mid_idx = random.randint(1, max(1, len(corridor) - 2))
    current_st = corridor[mid_idx]
    delay = random.choice([0, 0, 4, 12, 19, 28, 42])
    speed = 0.0 if delay > 30 and random.random() < 0.4 else random.uniform(65.0, 110.0)
    now_str = datetime.now().strftime("%I:%M %p")

    ls = LiveStatus(
        train_id=train.id,
        current_station_code=current_st[0],
        current_station_name=current_st[1],
        current_delay_minutes=delay,
        current_speed_kmh=round(speed, 1),
        distance_to_next_station=float(random.randint(15, 120)),
        status="Halted" if speed == 0 else "Running",
        last_updated=now_str,
        track_congestion=round(random.uniform(0.1, 0.5), 2),
        weather_factor=round(random.uniform(0.0, 0.2), 2),
        speed_restriction=delay > 25
    )
    db.add(ls)

    # Add historical delay
    causes = ["Signal clearance", "Late rake arrival", "Platform hold", None]
    for d in range(15):
        hist_date = (datetime.now() - timedelta(days=d)).strftime("%Y-%m-%d")
        for stop in corridor[:3]:
            dh = DelayHistory(
                train_no=clean_no,
                station_code=stop[0],
                date=hist_date,
                scheduled_arrival="10:00",
                actual_arrival="10:10",
                delay_minutes=max(0, delay + random.randint(-4, 6)),
                cause=random.choice(causes)
            )
            db.add(dh)

    db.commit()
    return train


def create_dynamic_live_status(db: Session, train: Train):
    """Create live status for a train if it doesn't have one."""
    schedules = db.query(Schedule).filter(Schedule.train_id == train.id).order_by(Schedule.stop_number).all()
    if schedules:
        st = schedules[min(1, len(schedules) - 1)]
        code, name = st.station_code, st.station_name
    else:
        code, name = train.from_code, train.from_station

    delay = random.choice([0, 5, 14, 25])
    speed = 0.0 if delay > 20 and random.random() < 0.3 else round(random.uniform(60, 105), 1)

    ls = LiveStatus(
        train_id=train.id,
        current_station_code=code,
        current_station_name=name,
        current_delay_minutes=delay,
        current_speed_kmh=speed,
        distance_to_next_station=round(random.uniform(10, 80), 1),
        status="Halted" if speed == 0 else "Running",
        last_updated=datetime.now().strftime("%I:%M %p"),
        track_congestion=0.2,
        weather_factor=0.0,
        speed_restriction=False
    )
    db.add(ls)
    db.commit()


def get_all_running_trains(db: Session) -> List[dict]:
    """Get all trains with their live status."""
    trains = db.query(Train).filter(Train.is_active == True).all()
    results = []

    for t in trains:
        live = db.query(LiveStatus).filter(LiveStatus.train_id == t.id).first()
        if not live:
            create_dynamic_live_status(db, t)
            live = db.query(LiveStatus).filter(LiveStatus.train_id == t.id).first()

        # Small real-time simulation variation
        if live:
            speed_delta = random.uniform(-1.5, 1.5)
            new_speed = max(0.0, min(135.0, live.current_speed_kmh + speed_delta))
            if live.status == "Halted":
                new_speed = 0.0
            live.current_speed_kmh = round(new_speed, 1)
            live.last_updated = datetime.now().strftime("%I:%M %p")
            db.commit()

        delay_reason = get_delay_reason_text(
            delay_minutes=live.current_delay_minutes if live else 0,
            speed=live.current_speed_kmh if live else 0,
            congestion=live.track_congestion if live else 0,
            restriction=live.speed_restriction if live else False,
            weather=live.weather_factor if live else 0,
            station_code=live.current_station_code if live else ""
        )

        results.append({
            "train_no": t.train_no,
            "train_name": t.train_name,
            "from_station": t.from_station,
            "from_code": t.from_code,
            "to_station": t.to_station,
            "to_code": t.to_code,
            "train_type": t.train_type,
            "live": {
                "current_station_code": live.current_station_code if live else t.from_code,
                "current_station_name": live.current_station_name if live else t.from_station,
                "current_delay_minutes": live.current_delay_minutes if live else 0,
                "current_speed_kmh": round(live.current_speed_kmh, 1) if live else 0.0,
                "distance_to_next_station": round(live.distance_to_next_station, 1) if live else 0.0,
                "status": live.status if live else "Running",
                "last_updated": live.last_updated if live else datetime.now().strftime("%I:%M %p"),
                "track_congestion": live.track_congestion if live else 0.0,
                "weather_factor": live.weather_factor if live else 0.0,
                "speed_restriction": live.speed_restriction if live else False,
                "primary_delay_reason": delay_reason,
            }
        })

    return results


def search_trains(db: Session, query: str) -> List[Train]:
    """Search trains by number, name, or route, with fallback dynamic creation."""
    q = f"%{query}%"
    trains = db.query(Train).filter(
        (Train.train_no.ilike(q)) |
        (Train.train_name.ilike(q)) |
        (Train.from_station.ilike(q)) |
        (Train.to_station.ilike(q))
    ).filter(Train.is_active == True).all()

    # If nothing matched and query looks like a train number (e.g. 4-5 digits), create it on the fly!
    clean_q = query.strip()
    if not trains and clean_q.isdigit() and len(clean_q) >= 3:
        new_train = ensure_train_exists(db, clean_q)
        return [new_train]

    return trains


def get_train_status(db: Session, train_no: str) -> Optional[dict]:
    """Get full train status with live data, auto-resolving unknown trains."""
    train = db.query(Train).filter(Train.train_no == train_no).first()
    if not train:
        train = ensure_train_exists(db, train_no)

    live = db.query(LiveStatus).filter(LiveStatus.train_id == train.id).first()
    if not live:
        create_dynamic_live_status(db, train)
        live = db.query(LiveStatus).filter(LiveStatus.train_id == train.id).first()

    # Simulate realistic micro-speed variance
    if live and live.status == "Running":
        live.current_speed_kmh = round(max(5.0, min(130.0, live.current_speed_kmh + random.uniform(-2, 2))), 1)
        live.last_updated = datetime.now().strftime("%I:%M %p")
        db.commit()
        db.refresh(live)

    return {
        "train_no": train.train_no,
        "train_name": train.train_name,
        "from_station": train.from_station,
        "from_code": train.from_code,
        "to_station": train.to_station,
        "to_code": train.to_code,
        "train_type": train.train_type,
        "live": live,
    }


def get_upcoming_stations(db: Session, train_no: str) -> List[dict]:
    """Get all schedules for a train."""
    train = db.query(Train).filter(Train.train_no == train_no).first()
    if not train:
        train = ensure_train_exists(db, train_no)

    return db.query(Schedule).filter(Schedule.train_id == train.id).order_by(Schedule.stop_number).all()


def get_eta_prediction(db: Session, train_no: str) -> Optional[dict]:
    """Run full ETA prediction for a train."""
    train = db.query(Train).filter(Train.train_no == train_no).first()
    if not train:
        train = ensure_train_exists(db, train_no)

    live = db.query(LiveStatus).filter(LiveStatus.train_id == train.id).first()
    schedules = db.query(Schedule).filter(Schedule.train_id == train.id).order_by(Schedule.stop_number).all()

    if not live or not schedules:
        return None

    # Build schedule dicts
    schedule_dicts = []
    for s in schedules:
        schedule_dicts.append({
            "station_code": s.station_code,
            "station_name": s.station_name,
            "arrival_time": s.arrival_time,
            "departure_time": s.departure_time,
            "stop_number": s.stop_number,
            "distance_from_origin": s.distance_from_origin,
            "avg_halt_minutes": s.avg_halt_minutes,
        })

    # Historical delay averages
    history_records = db.query(DelayHistory).filter(DelayHistory.train_no == train_no).all()
    station_delay_sums = {}
    station_delay_counts = {}
    for h in history_records:
        code = h.station_code
        station_delay_sums[code] = station_delay_sums.get(code, 0) + h.delay_minutes
        station_delay_counts[code] = station_delay_counts.get(code, 0) + 1

    historical_delays = {
        code: station_delay_sums[code] / station_delay_counts[code]
        for code in station_delay_sums
    }

    # Run prediction engine
    result = prediction_engine.predict(
        schedules=schedule_dicts,
        current_station_code=live.current_station_code,
        current_delay_minutes=live.current_delay_minutes,
        current_speed_kmh=live.current_speed_kmh,
        distance_to_next_station=live.distance_to_next_station,
        track_congestion=live.track_congestion,
        weather_factor=live.weather_factor,
        speed_restriction=live.speed_restriction,
        historical_delays=historical_delays,
    )

    return {
        "train_no": train.train_no,
        "train_name": train.train_name,
        "total_expected_delay": result["total_expected_delay"],
        "prediction_confidence": result["prediction_confidence"],
        "current_speed": live.current_speed_kmh,
        "station_etas": result["station_etas"],
        "factors_applied": result["factors_applied"],
        "anomaly_detection": result.get("anomaly_detection", {}),
        "congestion_detection": result.get("congestion_detection", {}),
        "future_delays": result.get("future_delays", {}),
        "delay_reasons": result.get("delay_reasons", []),
        "primary_delay_reason": result.get("primary_delay_reason", {}),
        "delay_attribution_breakdown": result.get("delay_attribution_breakdown", []),
    }


def get_delay_history(db: Session, train_no: str) -> dict:
    """Get delay history with per-station averages."""
    train = db.query(Train).filter(Train.train_no == train_no).first()
    if not train:
        train = ensure_train_exists(db, train_no)

    records = db.query(DelayHistory).filter(DelayHistory.train_no == train_no).all()

    by_station = {}
    history_list = []

    for r in records:
        if r.station_code not in by_station:
            by_station[r.station_code] = {"total": 0, "count": 0}
        by_station[r.station_code]["total"] += r.delay_minutes
        by_station[r.station_code]["count"] += 1
        history_list.append({
            "station_code": r.station_code,
            "station_name": r.station_code,
            "avg_historical_delay": r.delay_minutes,
            "date": r.date,
            "delay_minutes": r.delay_minutes,
        })

    avg_by_station = {
        code: round(data["total"] / data["count"], 1)
        for code, data in by_station.items()
    } if by_station else {}

    return {
        "train_no": train_no,
        "history": history_list[-30:],
        "avg_delay_by_station": avg_by_station,
    }
