// Mock data fallback — mirrors the exact API response shapes.
// Used when the backend is unavailable.

export const MOCK_TRAINS = [
  { train_no: "20607", train_name: "Vande Bharat Express", from_station: "MGR Chennai Central", from_code: "MAS", to_station: "Mysuru Jn", to_code: "MYS", train_type: "Vande Bharat" },
  { train_no: "22436", train_name: "Vande Bharat Express", from_station: "New Delhi", from_code: "NDLS", to_station: "Varanasi Jn", to_code: "BSB", train_type: "Vande Bharat" },
  { train_no: "12002", train_name: "Bhopal Shatabdi Express", from_station: "New Delhi", from_code: "NDLS", to_station: "Rani Kamlapati", to_code: "RKMP", train_type: "Shatabdi Express" },
  { train_no: "12951", train_name: "Mumbai Tejas Rajdhani", from_station: "Mumbai Central", from_code: "MMCT", to_station: "New Delhi", to_code: "NDLS", train_type: "Rajdhani Express" },
  { train_no: "12301", train_name: "Howrah Rajdhani Express", from_station: "Howrah Jn", from_code: "HWH", to_station: "New Delhi", to_code: "NDLS", train_type: "Rajdhani Express" },
  { train_no: "22691", train_name: "Bengaluru Rajdhani Express", from_station: "KSR Bengaluru City", from_code: "SBC", to_station: "Hazrat Nizamuddin", to_code: "NZM", train_type: "Rajdhani Express" },
  { train_no: "12723", train_name: "Telangana Express", from_station: "Hyderabad Deccan", from_code: "HYB", to_station: "New Delhi", to_code: "NDLS", train_type: "Superfast Express" },
  { train_no: "12724", train_name: "Telangana Express (Return)", from_station: "New Delhi", from_code: "NDLS", to_station: "Hyderabad Deccan", to_code: "HYB", train_type: "Superfast Express" },
  { train_no: "12759", train_name: "Charminar Express", from_station: "Hyderabad Deccan", from_code: "HYB", to_station: "MGR Chennai Central", to_code: "MAS", train_type: "Superfast Express" },
  { train_no: "17201", train_name: "Golconda Express", from_station: "Secunderabad Jn", from_code: "SC", to_station: "Guntur Jn", to_code: "GNT", train_type: "Express" },
  { train_no: "12841", train_name: "Coromandel Express", from_station: "Howrah Jn", from_code: "HWH", to_station: "MGR Chennai Central", to_code: "MAS", train_type: "Superfast Express" },
  { train_no: "12615", train_name: "Grand Trunk (GT) Express", from_station: "MGR Chennai Central", from_code: "MAS", to_station: "New Delhi", to_code: "NDLS", train_type: "Superfast Express" },
  { train_no: "12626", train_name: "Kerala Express", from_station: "New Delhi", from_code: "NDLS", to_station: "Thiruvananthapuram Central", to_code: "TVC", train_type: "Superfast Express" },
  { train_no: "12245", train_name: "Howrah - Yesvantpur Duronto", from_station: "Howrah Jn", from_code: "HWH", to_station: "Yesvantpur Jn", to_code: "YPR", train_type: "Duronto Express" },
  { train_no: "12431", train_name: "Trivandrum Rajdhani", from_station: "Thiruvananthapuram Central", from_code: "TVC", to_station: "Hazrat Nizamuddin", to_code: "NZM", train_type: "Rajdhani Express" },
  { train_no: "12137", train_name: "Punjab Mail", from_station: "Mumbai CSMT", from_code: "CSMT", to_station: "New Delhi", to_code: "NDLS", train_type: "Superfast Express" },
  { train_no: "12009", train_name: "Mumbai - Ahmedabad Shatabdi", from_station: "Mumbai Central", from_code: "MMCT", to_station: "Ahmedabad Jn", to_code: "ADI", train_type: "Shatabdi Express" },
  { train_no: "12925", train_name: "Paschim Express", from_station: "Mumbai Central", from_code: "MMCT", to_station: "Amritsar Jn", to_code: "ASR", train_type: "Superfast Express" },
  { train_no: "12649", train_name: "Karnataka Sampark Kranti", from_station: "Yesvantpur Jn", from_code: "YPR", to_station: "Hazrat Nizamuddin", to_code: "NZM", train_type: "Superfast Express" },
  { train_no: "12801", train_name: "Purushottam Express", from_station: "Bhubaneswar", from_code: "HWH", to_station: "New Delhi", to_code: "NDLS", train_type: "Superfast Express" },
  { train_no: "12269", train_name: "Chennai Duronto Express", from_station: "MGR Chennai Central", from_code: "MAS", to_station: "Hazrat Nizamuddin", to_code: "NZM", train_type: "Duronto Express" },
];

export const MOCK_STATUS = {
  "20607": {
    train_no: "20607", train_name: "Vande Bharat Express", from_station: "MGR Chennai Central", from_code: "MAS", to_station: "Mysuru Jn", to_code: "MYS", train_type: "Vande Bharat",
    live: { current_station_code: "KPD", current_station_name: "Katpadi Jn", current_delay_minutes: 2, current_speed_kmh: 115.0, distance_to_next_station: 85, status: "Running", last_updated: "Just now", track_congestion: 0.10, weather_factor: 0.0, speed_restriction: false, primary_delay_reason: "Running on Schedule — Clear line & green signals" }
  },
  "22436": {
    train_no: "22436", train_name: "Vande Bharat Express", from_station: "New Delhi", from_code: "NDLS", to_station: "Varanasi Jn", to_code: "BSB", train_type: "Vande Bharat",
    live: { current_station_code: "CNB", current_station_name: "Kanpur Central", current_delay_minutes: 0, current_speed_kmh: 128.0, distance_to_next_station: 194, status: "Running", last_updated: "Just now", track_congestion: 0.12, weather_factor: 0.05, speed_restriction: false, primary_delay_reason: "High Speed Priority Corridor Clearance" }
  },
  "12002": {
    train_no: "12002", train_name: "Bhopal Shatabdi Express", from_station: "New Delhi", from_code: "NDLS", to_station: "Rani Kamlapati", to_code: "RKMP", train_type: "Shatabdi Express",
    live: { current_station_code: "GWL", current_station_name: "Gwalior Jn", current_delay_minutes: 6, current_speed_kmh: 98.0, distance_to_next_station: 98, status: "Running", last_updated: "Just now", track_congestion: 0.22, weather_factor: 0.0, speed_restriction: false, primary_delay_reason: "Station Dwell & Passenger Boarding (+4m)" }
  },
  "12951": {
    train_no: "12951", train_name: "Mumbai Tejas Rajdhani", from_station: "Mumbai Central", from_code: "MMCT", to_station: "New Delhi", to_code: "NDLS", train_type: "Rajdhani Express",
    live: { current_station_code: "BRC", current_station_name: "Vadodara Jn", current_delay_minutes: 4, current_speed_kmh: 112.0, distance_to_next_station: 392, status: "Running", last_updated: "Just now", track_congestion: 0.18, weather_factor: 0.0, speed_restriction: false, primary_delay_reason: "Fast line progression via WR Trunk Route" }
  },
  "12301": {
    train_no: "12301", train_name: "Howrah Rajdhani Express", from_station: "Howrah Jn", from_code: "HWH", to_station: "New Delhi", to_code: "NDLS", train_type: "Rajdhani Express",
    live: { current_station_code: "PRYJ", current_station_name: "Prayagraj Jn", current_delay_minutes: 14, current_speed_kmh: 104.0, distance_to_next_station: 194, status: "Running", last_updated: "Just now", track_congestion: 0.38, weather_factor: 0.15, speed_restriction: false, primary_delay_reason: "Dense freight traffic regulation on Grand Chord" }
  },
  "22691": {
    train_no: "22691", train_name: "Bengaluru Rajdhani Express", from_station: "KSR Bengaluru City", from_code: "SBC", to_station: "Hazrat Nizamuddin", to_code: "NZM", train_type: "Rajdhani Express",
    live: { current_station_code: "SC", current_station_name: "Secunderabad Jn", current_delay_minutes: 8, current_speed_kmh: 88.0, distance_to_next_station: 132, status: "Running", last_updated: "Just now", track_congestion: 0.25, weather_factor: 0.0, speed_restriction: false, primary_delay_reason: "Platform Interlocking Clearance at Secunderabad" }
  },
  "12723": {
    train_no: "12723", train_name: "Telangana Express", from_station: "Hyderabad Deccan", from_code: "HYB", to_station: "New Delhi", to_code: "NDLS", train_type: "Superfast Express",
    live: { current_station_code: "WL", current_station_name: "Warangal", current_delay_minutes: 18, current_speed_kmh: 62.0, distance_to_next_station: 56, status: "Running", last_updated: "Just now", track_congestion: 0.35, weather_factor: 0.1, speed_restriction: false, primary_delay_reason: "Signal Precedence Hold at Kazipet Outer (+10m)" }
  },
  "12724": {
    train_no: "12724", train_name: "Telangana Express (Return)", from_station: "New Delhi", from_code: "NDLS", to_station: "Hyderabad Deccan", to_code: "HYB", train_type: "Superfast Express",
    live: { current_station_code: "AGC", current_station_name: "Agra Cantt", current_delay_minutes: 25, current_speed_kmh: 75.0, distance_to_next_station: 216, status: "Running", last_updated: "Just now", track_congestion: 0.42, weather_factor: 0.2, speed_restriction: true, primary_delay_reason: "Speed restriction & caution order in NCR section" }
  },
  "12759": {
    train_no: "12759", train_name: "Charminar Express", from_station: "Hyderabad Deccan", from_code: "HYB", to_station: "MGR Chennai Central", to_code: "MAS", train_type: "Superfast Express",
    live: { current_station_code: "KZJ", current_station_name: "Kazipet Jn", current_delay_minutes: 5, current_speed_kmh: 85.0, distance_to_next_station: 9, status: "Running", last_updated: "Just now", track_congestion: 0.15, weather_factor: 0.0, speed_restriction: false, primary_delay_reason: "Yard Throat Interlocking Cross-Over (+3m)" }
  },
  "17201": {
    train_no: "17201", train_name: "Golconda Express", from_station: "Secunderabad Jn", from_code: "SC", to_station: "Guntur Jn", to_code: "GNT", train_type: "Express",
    live: { current_station_code: "BZA", current_station_name: "Vijayawada Jn", current_delay_minutes: 32, current_speed_kmh: 0.0, distance_to_next_station: 32, status: "Halted", last_updated: "Just now", track_congestion: 0.60, weather_factor: 0.25, speed_restriction: true, primary_delay_reason: "Platform #1 Occupancy Contention at Vijayawada Outer (+18m)" }
  },
  "12841": {
    train_no: "12841", train_name: "Coromandel Express", from_station: "Howrah Jn", from_code: "HWH", to_station: "MGR Chennai Central", to_code: "MAS", train_type: "Superfast Express",
    live: { current_station_code: "VSKP", current_station_name: "Visakhapatnam Jn", current_delay_minutes: 0, current_speed_kmh: 102.0, distance_to_next_station: 349, status: "Running", last_updated: "Just now", track_congestion: 0.15, weather_factor: 0.0, speed_restriction: false, primary_delay_reason: "On Schedule · Clear coastal corridor" }
  },
  "12615": {
    train_no: "12615", train_name: "Grand Trunk (GT) Express", from_station: "MGR Chennai Central", from_code: "MAS", to_station: "New Delhi", to_code: "NDLS", train_type: "Superfast Express",
    live: { current_station_code: "NGP", current_station_name: "Nagpur Jn", current_delay_minutes: 12, current_speed_kmh: 82.0, distance_to_next_station: 390, status: "Running", last_updated: "Just now", track_congestion: 0.28, weather_factor: 0.0, speed_restriction: false, primary_delay_reason: "Ghat section speed deceleration (+8m)" }
  },
  "12626": {
    train_no: "12626", train_name: "Kerala Express", from_station: "New Delhi", from_code: "NDLS", to_station: "Thiruvananthapuram Central", to_code: "TVC", train_type: "Superfast Express",
    live: { current_station_code: "ET", current_station_name: "Itarsi Jn", current_delay_minutes: 22, current_speed_kmh: 74.0, distance_to_next_station: 298, status: "Running", last_updated: "Just now", track_congestion: 0.40, weather_factor: 0.15, speed_restriction: false, primary_delay_reason: "Heavy traffic bottleneck around Itarsi Junction" }
  },
  "12245": {
    train_no: "12245", train_name: "Howrah - Yesvantpur Duronto", from_station: "Howrah Jn", from_code: "HWH", to_station: "Yesvantpur Jn", to_code: "YPR", train_type: "Duronto Express",
    live: { current_station_code: "BBS", current_station_name: "Bhubaneswar", current_delay_minutes: 0, current_speed_kmh: 118.0, distance_to_next_station: 443, status: "Running", last_updated: "Just now", track_congestion: 0.08, weather_factor: 0.0, speed_restriction: false, primary_delay_reason: "Non-stop priority line clearance" }
  },
  "12431": {
    train_no: "12431", train_name: "Trivandrum Rajdhani", from_station: "Thiruvananthapuram Central", from_code: "TVC", to_station: "Hazrat Nizamuddin", to_code: "NZM", train_type: "Rajdhani Express",
    live: { current_station_code: "ERS", current_station_name: "Ernakulam Jn", current_delay_minutes: 7, current_speed_kmh: 95.0, distance_to_next_station: 450, status: "Running", last_updated: "Just now", track_congestion: 0.20, weather_factor: 0.1, speed_restriction: false, primary_delay_reason: "Monsoon caution speed order along coastal stretch" }
  },
  "12137": {
    train_no: "12137", train_name: "Punjab Mail", from_station: "Mumbai CSMT", from_code: "CSMT", to_station: "New Delhi", to_code: "NDLS", train_type: "Superfast Express",
    live: { current_station_code: "ET", current_station_name: "Itarsi Jn", current_delay_minutes: 15, current_speed_kmh: 68.0, distance_to_next_station: 92, status: "Running", last_updated: "Just now", track_congestion: 0.32, weather_factor: 0.05, speed_restriction: false, primary_delay_reason: "Precedence given to Rajdhani Express (+12m)" }
  },
  "12009": {
    train_no: "12009", train_name: "Mumbai - Ahmedabad Shatabdi", from_station: "Mumbai Central", from_code: "MMCT", to_station: "Ahmedabad Jn", to_code: "ADI", train_type: "Shatabdi Express",
    live: { current_station_code: "ST", current_station_name: "Surat", current_delay_minutes: 3, current_speed_kmh: 120.0, distance_to_next_station: 129, status: "Running", last_updated: "Just now", track_congestion: 0.14, weather_factor: 0.0, speed_restriction: false, primary_delay_reason: "High speed cruising on Western line" }
  },
  "12925": {
    train_no: "12925", train_name: "Paschim Express", from_station: "Mumbai Central", from_code: "MMCT", to_station: "Amritsar Jn", to_code: "ASR", train_type: "Superfast Express",
    live: { current_station_code: "KOTA", current_station_name: "Kota Jn", current_delay_minutes: 45, current_speed_kmh: 0.0, distance_to_next_station: 466, status: "Halted", last_updated: "Just now", track_congestion: 0.65, weather_factor: 0.3, speed_restriction: true, primary_delay_reason: "Locomotive safety inspection & yard regulation hold" }
  },
  "12649": {
    train_no: "12649", train_name: "Karnataka Sampark Kranti", from_station: "Yesvantpur Jn", from_code: "YPR", to_station: "Hazrat Nizamuddin", to_code: "NZM", train_type: "Superfast Express",
    live: { current_station_code: "BPQ", current_station_name: "Balharshah Jn", current_delay_minutes: 16, current_speed_kmh: 78.0, distance_to_next_station: 208, status: "Running", last_updated: "Just now", track_congestion: 0.30, weather_factor: 0.0, speed_restriction: false, primary_delay_reason: "Goods rake crossing precedence at junction" }
  },
  "12801": {
    train_no: "12801", train_name: "Purushottam Express", from_station: "Bhubaneswar", from_code: "HWH", to_station: "New Delhi", to_code: "NDLS", train_type: "Superfast Express",
    live: { current_station_code: "CNB", current_station_name: "Kanpur Central", current_delay_minutes: 35, current_speed_kmh: 52.0, distance_to_next_station: 440, status: "Running", last_updated: "Just now", track_congestion: 0.55, weather_factor: 0.2, speed_restriction: true, primary_delay_reason: "Heavy traffic density in Northern Railway zone" }
  },
  "12269": {
    train_no: "12269", train_name: "Chennai Duronto Express", from_station: "MGR Chennai Central", from_code: "MAS", to_station: "Hazrat Nizamuddin", to_code: "NZM", train_type: "Duronto Express",
    live: { current_station_code: "BZA", current_station_name: "Vijayawada Jn", current_delay_minutes: 0, current_speed_kmh: 110.0, distance_to_next_station: 659, status: "Running", last_updated: "Just now", track_congestion: 0.05, weather_factor: 0.0, speed_restriction: false, primary_delay_reason: "Clear green aspect on high-priority express corridor" }
  }
};

export const MOCK_PREDICTION = {
  "12723": {
    train_no: "12723",
    train_name: "Telangana Express",
    total_expected_delay: 25,
    prediction_confidence: 0.91,
    current_speed: 62.0,
    station_etas: [
      { stop_number: 1, station_code: "HYB", station_name: "Hyderabad", scheduled_arrival: "Starts", predicted_arrival: "Starts", delay_minutes: 0, status: "Current", distance_from_origin: 0 },
      { stop_number: 2, station_code: "KZJ", station_name: "Kazipet", scheduled_arrival: "10:24 PM", predicted_arrival: "10:42 PM", delay_minutes: 18, status: "Delayed", distance_from_origin: 148 },
      { stop_number: 3, station_code: "WL",  station_name: "Warangal", scheduled_arrival: "11:00 PM", predicted_arrival: "11:18 PM", delay_minutes: 18, status: "Delayed", distance_from_origin: 157 },
      { stop_number: 4, station_code: "MB",  station_name: "Mahabubabad", scheduled_arrival: "12:15 AM", predicted_arrival: "12:32 AM", delay_minutes: 17, status: "Delayed", distance_from_origin: 213 },
      { stop_number: 5, station_code: "BZA", station_name: "Vijayawada", scheduled_arrival: "02:10 AM", predicted_arrival: "02:35 AM", delay_minutes: 25, status: "Delayed", distance_from_origin: 430 },
      { stop_number: 6, station_code: "GNT", station_name: "Guntur", scheduled_arrival: "03:15 AM", predicted_arrival: "03:41 AM", delay_minutes: 26, status: "Delayed", distance_from_origin: 459 },
      { stop_number: 7, station_code: "OGL", station_name: "Ongole", scheduled_arrival: "04:30 AM", predicted_arrival: "04:57 AM", delay_minutes: 27, status: "Delayed", distance_from_origin: 555 },
      { stop_number: 8, station_code: "NLR", station_name: "Nellore", scheduled_arrival: "05:30 AM", predicted_arrival: "05:58 AM", delay_minutes: 28, status: "Delayed", distance_from_origin: 626 },
    ],
    factors_applied: {
      current_delay_minutes: 18,
      track_congestion: "35%",
      weather_severity: "10%",
      speed_restriction_active: false,
      unscheduled_stop_probability: "8% per station",
      historical_data_stations: 6,
    },
    anomaly_detection: {
      level: "MODERATE",
      anomaly_score: 42,
      schedule_divergence: "1.5σ",
      detected_issues: [
        { type: "Moderate Delay Drift", severity: "Medium", message: "Accumulated +18m delay against 30-day baseline average (+12m)." },
        { type: "Section Headway Margin", severity: "Low", message: "Running 11.7 km behind freight rake 402; automatic block signaling operative." }
      ]
    },
    congestion_detection: {
      percentage: 35,
      level_of_service: "LOS B (Normal Flow)",
      headway_distance_km: 11.7,
      delay_impact_minutes: 6,
      crossing_conflict_risk: "Low",
      bottleneck_node: "Kazipet Jn Interlocking",
    },
    future_delays: {
      p10_optimistic: 19,
      p50_expected: 25,
      p90_pessimistic: 39,
      recovery_potential: "Moderate (2.5m buffer available)",
      cascade_risk: "Moderate",
      expected_terminal_delay: 28,
    },
    delay_reasons: [
      {
        id: "sig_precedence_kzj",
        category: "Signaling & Traffic",
        title: "Signal Precedence Hold at Kazipet Outer Interlocking",
        impact_minutes: 10,
        severity: "High",
        location: "Kazipet Jn (KZJ) Outer Signal Home Cabin",
        description: "Held at outer home signal to accord operational precedence to 20834 Vande Bharat Express on the Secunderabad-Kazipet trunk route.",
        official_code: "IR-SIG-04",
        recovery_outlook: "Moderate: Line clear granted, train proceeding to yard junction.",
        icon_type: "signal"
      },
      {
        id: "auto_block_congestion",
        category: "Traffic & Routing",
        title: "Section Automatic Block Density & Caution Aspects",
        impact_minutes: 5,
        severity: "Medium",
        location: "Cherlapalli – Kazipet Quadruple Corridor",
        description: "High freight trailing volume created headway compression down to 11.7 km, enforcing recurring double-yellow caution signals (speed ceiling 45 km/h).",
        official_code: "IR-OPR-09",
        recovery_outlook: "Constrained: Dense traffic flow until Warangal junction.",
        icon_type: "traffic"
      },
      {
        id: "station_dwell_hyb",
        category: "Station Operations",
        title: "Heavy Boarding & Mail Parcel Loading Dwell",
        impact_minutes: 3,
        severity: "Low",
        location: "Hyderabad Deccan (HYB) Platform #4",
        description: "High passenger volume in non-AC coaches and heavy parcel express van loading extended station dwell beyond scheduled timetable departure.",
        official_code: "IR-OPT-03",
        recovery_outlook: "High: Buffer slack of 4 min available ahead towards Guntur.",
        icon_type: "clock"
      }
    ],
    primary_delay_reason: {
      id: "sig_precedence_kzj",
      category: "Signaling & Traffic",
      title: "Signal Precedence Hold at Kazipet Outer Interlocking",
      impact_minutes: 10,
      severity: "High",
      location: "Kazipet Jn (KZJ) Outer Signal Home Cabin",
      description: "Held at outer home signal to accord operational precedence to 20834 Vande Bharat Express on the Secunderabad-Kazipet trunk route.",
      official_code: "IR-SIG-04",
      recovery_outlook: "Moderate: Line clear granted, train proceeding to yard junction.",
      icon_type: "signal"
    },
    delay_attribution_breakdown: [
      { category: "Signaling & Traffic", minutes: 10, percentage: 56, color: "red" },
      { category: "Traffic & Routing", minutes: 5, percentage: 28, color: "amber" },
      { category: "Station Operations", minutes: 3, percentage: 16, color: "blue" }
    ],
  },
  "12759": {
    train_no: "12759",
    train_name: "Charminar Express",
    total_expected_delay: 7,
    prediction_confidence: 0.95,
    current_speed: 85.0,
    station_etas: [
      { stop_number: 1, station_code: "HYB", station_name: "Hyderabad", scheduled_arrival: "Starts", predicted_arrival: "Starts", delay_minutes: 0, status: "Passed", distance_from_origin: 0 },
      { stop_number: 2, station_code: "SC",  station_name: "Secunderabad", scheduled_arrival: "3:45 PM", predicted_arrival: "3:45 PM", delay_minutes: 0, status: "Passed", distance_from_origin: 5 },
      { stop_number: 3, station_code: "KZJ", station_name: "Kazipet", scheduled_arrival: "5:45 PM", predicted_arrival: "5:50 PM", delay_minutes: 5, status: "Current", distance_from_origin: 148 },
      { stop_number: 4, station_code: "WL",  station_name: "Warangal", scheduled_arrival: "6:10 PM", predicted_arrival: "6:15 PM", delay_minutes: 5, status: "Delayed", distance_from_origin: 157 },
      { stop_number: 5, station_code: "BZA", station_name: "Vijayawada", scheduled_arrival: "9:00 PM", predicted_arrival: "9:07 PM", delay_minutes: 7, status: "Delayed", distance_from_origin: 430 },
      { stop_number: 6, station_code: "NLR", station_name: "Nellore", scheduled_arrival: "11:45 PM", predicted_arrival: "11:52 PM", delay_minutes: 7, status: "Delayed", distance_from_origin: 626 },
      { stop_number: 7, station_code: "MAS", station_name: "Chennai Central", scheduled_arrival: "4:00 AM", predicted_arrival: "4:07 AM", delay_minutes: 7, status: "Delayed", distance_from_origin: 793 },
    ],
    factors_applied: {
      current_delay_minutes: 5,
      track_congestion: "15%",
      weather_severity: "0%",
      speed_restriction_active: false,
      unscheduled_stop_probability: "8% per station",
      historical_data_stations: 0,
    },
    anomaly_detection: {
      level: "NOMINAL",
      anomaly_score: 12,
      schedule_divergence: "0.4σ",
      detected_issues: []
    },
    congestion_detection: {
      percentage: 15,
      level_of_service: "LOS A (Free Flow)",
      headway_distance_km: 15.3,
      delay_impact_minutes: 2,
      crossing_conflict_risk: "Negligible",
      bottleneck_node: "Clear Corridor",
    },
    future_delays: {
      p10_optimistic: 2,
      p50_expected: 7,
      p90_pessimistic: 18,
      recovery_potential: "High (3.5m slack buffer)",
      cascade_risk: "Low",
      expected_terminal_delay: 7,
    },
    delay_reasons: [
      {
        id: "kzj_yard_slack",
        category: "Traffic & Routing",
        title: "Yard Interlocking Throat Route Cross-Over",
        impact_minutes: 3,
        severity: "Low",
        location: "Kazipet Yard South Throat",
        description: "Routine routing cross-over deceleration (speed 15 km/h) through diamond crossing points during yard switch.",
        official_code: "IR-YRD-01",
        recovery_outlook: "High: Clear mainline ahead on Warangal-Vijayawada block.",
        icon_type: "traffic"
      },
      {
        id: "secunderabad_dwell",
        category: "Station Operations",
        title: "Passenger Boarding & Dwell Fluctuation",
        impact_minutes: 2,
        severity: "Low",
        location: "Secunderabad Jn (SC) Platform #1",
        description: "Minor 2-minute dwell extension during commuter boarding rush.",
        official_code: "IR-OPT-02",
        recovery_outlook: "Optimal: 3.5 min recovery slack scheduled before Vijayawada.",
        icon_type: "clock"
      }
    ],
    primary_delay_reason: {
      id: "kzj_yard_slack",
      category: "Traffic & Routing",
      title: "Yard Interlocking Throat Route Cross-Over",
      impact_minutes: 3,
      severity: "Low",
      location: "Kazipet Yard South Throat",
      description: "Routine routing cross-over deceleration (speed 15 km/h) through diamond crossing points during yard switch.",
      official_code: "IR-YRD-01",
      recovery_outlook: "High: Clear mainline ahead on Warangal-Vijayawada block.",
      icon_type: "traffic"
    },
    delay_attribution_breakdown: [
      { category: "Traffic & Routing", minutes: 3, percentage: 60, color: "amber" },
      { category: "Station Operations", minutes: 2, percentage: 40, color: "blue" }
    ],
  },
  "17201": {
    train_no: "17201",
    train_name: "Golconda Express",
    total_expected_delay: 42,
    prediction_confidence: 0.76,
    current_speed: 0.0,
    station_etas: [
      { stop_number: 1, station_code: "SC",  station_name: "Secunderabad", scheduled_arrival: "Starts", predicted_arrival: "Starts", delay_minutes: 0, status: "Passed", distance_from_origin: 0 },
      { stop_number: 2, station_code: "KZJ", station_name: "Kazipet", scheduled_arrival: "8:10 AM", predicted_arrival: "8:42 AM", delay_minutes: 32, status: "Passed", distance_from_origin: 145 },
      { stop_number: 3, station_code: "BZA", station_name: "Vijayawada", scheduled_arrival: "11:30 AM", predicted_arrival: "12:02 PM", delay_minutes: 32, status: "Current", distance_from_origin: 428 },
      { stop_number: 4, station_code: "NLR", station_name: "Nellore", scheduled_arrival: "2:30 PM", predicted_arrival: "3:12 PM", delay_minutes: 42, status: "Delayed", distance_from_origin: 623 },
      { stop_number: 5, station_code: "MAS", station_name: "Chennai Central", scheduled_arrival: "7:30 PM", predicted_arrival: "8:12 PM", delay_minutes: 42, status: "Delayed", distance_from_origin: 791 },
    ],
    factors_applied: {
      current_delay_minutes: 32,
      track_congestion: "60%",
      weather_severity: "25%",
      speed_restriction_active: true,
      unscheduled_stop_probability: "8% per station",
      historical_data_stations: 0,
    },
    anomaly_detection: {
      level: "CRITICAL",
      anomaly_score: 88,
      schedule_divergence: "2.7σ",
      detected_issues: [
        { type: "Unscheduled Halted State", severity: "High", message: "Train stationary at Vijayawada Outer (speed 0 km/h) for >18 mins." },
        { type: "Active Track Caution Order", severity: "Medium", message: "Permanent speed restriction (30 km/h) on Krishna River rail bridge." },
        { type: "Platform Occupancy Contention", severity: "High", message: "BZA Platform #1 occupied by 12616 Grand Trunk Express." }
      ]
    },
    congestion_detection: {
      percentage: 60,
      level_of_service: "LOS C (Dense Traffic)",
      headway_distance_km: 7.2,
      delay_impact_minutes: 11,
      crossing_conflict_risk: "Elevated",
      bottleneck_node: "BZA Yard Junction Interlocking",
    },
    future_delays: {
      p10_optimistic: 36,
      p50_expected: 42,
      p90_pessimistic: 58,
      recovery_potential: "Constrained (Heavy caution orders)",
      cascade_risk: "High",
      expected_terminal_delay: 42,
    },
    delay_reasons: [
      {
        id: "platform_contention_bza",
        category: "Signaling & Traffic",
        title: "Platform Occupancy Contention at Vijayawada Outer",
        impact_minutes: 18,
        severity: "High",
        location: "Vijayawada Jn (BZA) Krishna Canal Junction Outer",
        description: "Train halted (speed 0 km/h) for 18 minutes outside Vijayawada because designated Platform #1 remains occupied by 12616 Grand Trunk Express.",
        official_code: "IR-PFM-02",
        recovery_outlook: "Constrained: Awaiting departure of 12616 before route can be set.",
        icon_type: "signal"
      },
      {
        id: "krishna_bridge_tsr",
        category: "Infrastructure & Track",
        title: "Permanent Speed Restriction (30 km/h) on Krishna Rail Bridge",
        impact_minutes: 8,
        severity: "Medium",
        location: "Krishna River Major Rail Bridge #42",
        description: "Permanent Way engineering caution order strictly capping bridge traversal velocity to 30 km/h for steel girder vibration safety.",
        official_code: "IR-ENG-12",
        recovery_outlook: "Non-recoverable: Enforced structural speed limit.",
        icon_type: "track"
      },
      {
        id: "monsoon_weather_adhesion",
        category: "Weather & Environment",
        title: "Monsoon Track Wetness & Reduced Adhesion Braking Margin",
        impact_minutes: 6,
        severity: "Medium",
        location: "South Central Costal Delta Zone",
        description: "Intermittent heavy monsoon showers creating railhead wheel-slip conditions, mandating conservative brake application and gradual acceleration curves.",
        official_code: "IR-WTR-02",
        recovery_outlook: "Moderate: Weather radar predicts rain easing past Tenali.",
        icon_type: "weather"
      }
    ],
    primary_delay_reason: {
      id: "platform_contention_bza",
      category: "Signaling & Traffic",
      title: "Platform Occupancy Contention at Vijayawada Outer",
      impact_minutes: 18,
      severity: "High",
      location: "Vijayawada Jn (BZA) Krishna Canal Junction Outer",
      description: "Train halted (speed 0 km/h) for 18 minutes outside Vijayawada because designated Platform #1 remains occupied by 12616 Grand Trunk Express.",
      official_code: "IR-PFM-02",
      recovery_outlook: "Constrained: Awaiting departure of 12616 before route can be set.",
      icon_type: "signal"
    },
    delay_attribution_breakdown: [
      { category: "Signaling & Traffic", minutes: 18, percentage: 56, color: "red" },
      { category: "Infrastructure & Track", minutes: 8, percentage: 25, color: "orange" },
      { category: "Weather & Environment", minutes: 6, percentage: 19, color: "cyan" }
    ],
  },
};

export const MOCK_DELAY_HISTORY = {
  "12723": {
    train_no: "12723",
    avg_delay_by_station: { HYB: 5, KZJ: 17, WL: 18, MB: 19, BZA: 24, NLR: 27 },
    history: [
      { station_code: "HYB", station_name: "Hyderabad",   delay_minutes: 0,  date: "2026-09-08" },
      { station_code: "KZJ", station_name: "Kazipet",     delay_minutes: 15, date: "2026-09-08" },
      { station_code: "WL",  station_name: "Warangal",    delay_minutes: 16, date: "2026-09-08" },
      { station_code: "MB",  station_name: "Mahabubabad", delay_minutes: 18, date: "2026-09-08" },
      { station_code: "BZA", station_name: "Vijayawada",  delay_minutes: 22, date: "2026-09-08" },
      { station_code: "NLR", station_name: "Nellore",     delay_minutes: 25, date: "2026-09-08" },
    ],
  },
};

export function getMockLiveTrains(statusFilter = 'all') {
  let trains = MOCK_TRAINS.map(t => {
    const status = MOCK_STATUS[t.train_no];
    return {
      ...t,
      live: status ? status.live : {
        current_station_code: t.from_code,
        current_station_name: t.from_station,
        current_delay_minutes: 0,
        current_speed_kmh: 80.0,
        distance_to_next_station: 60,
        status: "Running",
        last_updated: "Just now",
        track_congestion: 0.15,
        weather_factor: 0.0,
        speed_restriction: false,
        primary_delay_reason: "Clear green aspect on main route",
      }
    };
  });

  if (statusFilter && statusFilter !== 'all') {
    const filter = statusFilter.toLowerCase();
    if (filter === 'running') {
      trains = trains.filter(t => t.live.status === 'Running');
    } else if (filter === 'halted') {
      trains = trains.filter(t => t.live.status === 'Halted');
    } else if (filter === 'delayed') {
      trains = trains.filter(t => (t.live.current_delay_minutes || 0) > 10);
    } else if (filter === 'ontime' || filter === 'on_time') {
      trains = trains.filter(t => (t.live.current_delay_minutes || 0) === 0);
    }
  }

  return trains;
}

export function getMockStatus(trainNo) {
  if (MOCK_STATUS[trainNo]) {
    return MOCK_STATUS[trainNo];
  }
  const meta = MOCK_TRAINS.find(t => t.train_no === trainNo);
  const fromName = meta?.from_station || "Origin Station";
  const toName = meta?.to_station || "Destination Station";
  return {
    train_no: trainNo,
    train_name: meta?.train_name || `Express ${trainNo}`,
    from_station: fromName,
    from_code: meta?.from_code || "ORIG",
    to_station: toName,
    to_code: meta?.to_code || "DEST",
    train_type: meta?.train_type || "Superfast Express",
    live: {
      current_station_code: meta?.from_code || "ORIG",
      current_station_name: fromName,
      current_delay_minutes: 5,
      current_speed_kmh: 88.0,
      distance_to_next_station: 45,
      status: "Running",
      last_updated: "Just now",
      track_congestion: 0.2,
      weather_factor: 0.0,
      speed_restriction: false,
      primary_delay_reason: "Scheduled operational clearance",
    },
  };
}

export function getMockPrediction(trainNo) {
  if (MOCK_PREDICTION[trainNo]) {
    return MOCK_PREDICTION[trainNo];
  }
  const status = getMockStatus(trainNo);
  const delay = status.live?.current_delay_minutes || 0;
  return {
    train_no: trainNo,
    train_name: status.train_name,
    total_expected_delay: delay + 4,
    prediction_confidence: 0.89,
    current_speed: status.live?.current_speed_kmh || 85.0,
    station_etas: [
      { stop_number: 1, station_code: status.from_code, station_name: status.from_station, scheduled_arrival: "Starts", predicted_arrival: "Starts", delay_minutes: 0, status: "Passed", distance_from_origin: 0 },
      { stop_number: 2, station_code: status.live?.current_station_code || "STN1", station_name: status.live?.current_station_name || "Mid Junction", scheduled_arrival: "11:30 AM", predicted_arrival: "11:35 AM", delay_minutes: delay, status: "Current", distance_from_origin: 180 },
      { stop_number: 3, station_code: status.to_code, station_name: status.to_station, scheduled_arrival: "05:00 PM", predicted_arrival: "05:09 PM", delay_minutes: delay + 4, status: "Delayed", distance_from_origin: 520 },
    ],
    factors_applied: {
      current_delay_minutes: delay,
      track_congestion: "20%",
      weather_severity: "0%",
      speed_restriction_active: false,
      unscheduled_stop_probability: "5% per station",
      historical_data_stations: 3,
    },
    anomaly_detection: {
      level: delay > 15 ? "MODERATE" : "NOMINAL",
      anomaly_score: delay > 15 ? 38 : 12,
      schedule_divergence: delay > 15 ? "1.2σ" : "0.3σ",
      detected_issues: delay > 15 ? [{ type: "Minor Delay Drift", severity: "Low", message: `Trailing +${delay}m baseline.` }] : []
    },
    congestion_detection: {
      percentage: 20,
      level_of_service: "LOS A (Free Flow)",
      headway_distance_km: 14.5,
      delay_impact_minutes: 2,
      crossing_conflict_risk: "Low",
      bottleneck_node: "Clear Route",
    },
    future_delays: {
      p10_optimistic: Math.max(0, delay - 2),
      p50_expected: delay + 4,
      p90_pessimistic: delay + 12,
      recovery_potential: "Moderate",
      cascade_risk: "Low",
      expected_terminal_delay: delay + 4,
    },
    delay_reasons: [
      {
        id: "section_clearance",
        category: "Signaling & Traffic",
        title: "Section Line Clearance & Signaling Regulation",
        impact_minutes: delay || 2,
        severity: delay > 15 ? "Medium" : "Low",
        location: status.live?.current_station_name || "Section Outer",
        description: status.live?.primary_delay_reason || "Scheduled line clearance.",
        official_code: "IR-SIG-01",
        recovery_outlook: "Good: Corridor clear ahead.",
        icon_type: "signal"
      }
    ],
    primary_delay_reason: {
      id: "section_clearance",
      category: "Signaling & Traffic",
      title: "Section Line Clearance & Signaling Regulation",
      impact_minutes: delay || 2,
      severity: delay > 15 ? "Medium" : "Low",
      location: status.live?.current_station_name || "Section Outer",
      description: status.live?.primary_delay_reason || "Scheduled line clearance.",
      official_code: "IR-SIG-01",
      recovery_outlook: "Good: Corridor clear ahead.",
      icon_type: "signal"
    },
    delay_attribution_breakdown: [
      { category: "Signaling & Traffic", minutes: delay || 2, percentage: 70, color: "red" },
      { category: "Station Operations", minutes: 1, percentage: 30, color: "blue" }
    ],
  };
}

export function getMockDelayHistory(trainNo) {
  return MOCK_DELAY_HISTORY[trainNo] || { train_no: trainNo, avg_delay_by_station: {}, history: [] };
}

