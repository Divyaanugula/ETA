import { useState, useEffect, useRef } from 'react';
import { Radio, RefreshCw, Train, Activity, Gauge, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { getTrainStatus, getETAPrediction } from '../services/api';
import { getMockStatus, getMockPrediction, MOCK_TRAINS } from '../data/mockData';
import TrainStatusCard from '../components/TrainStatusCard';
import RouteMap from '../components/RouteMap';
import LiveClock from '../components/LiveClock';
import AIExplanationSuite from '../components/AIExplanationSuite';

// Speedometer widget
function SpeedGauge({ speedKmh = 0, maxSpeed = 130 }) {
  const pct = Math.min(speedKmh / maxSpeed, 1);
  const angle = -140 + pct * 280;
  const r = 44;
  const cx = 56, cy = 56;
  const arcPath = (startAngle, endAngle, radius) => {
    const toRad = a => (a * Math.PI) / 180;
    const x1 = cx + radius * Math.cos(toRad(startAngle));
    const y1 = cy + radius * Math.sin(toRad(startAngle));
    const x2 = cx + radius * Math.cos(toRad(endAngle));
    const y2 = cy + radius * Math.sin(toRad(endAngle));
    const large = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`;
  };
  const color = speedKmh === 0 ? '#ef4444' : speedKmh < 60 ? '#f59e0b' : '#22c55e';
  return (
    <div className="flex flex-col items-center">
      <svg width="112" height="80" viewBox="0 0 112 80">
        {/* Track arc */}
        <path d={arcPath(-140, 140, r)} fill="none" stroke="#e2e8f0" strokeWidth="8" strokeLinecap="round" />
        {/* Value arc */}
        {pct > 0 && <path d={arcPath(-140, -140 + pct * 280, r)} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" />}
        {/* Needle */}
        <line
          x1={cx} y1={cy}
          x2={cx + 36 * Math.cos(((angle) * Math.PI) / 180)}
          y2={cy + 36 * Math.sin(((angle) * Math.PI) / 180)}
          stroke={color} strokeWidth="2.5" strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="4" fill={color} />
        {/* Speed text */}
        <text x={cx} y={cy + 20} textAnchor="middle" fontSize="14" fontWeight="800" fill={color}>{Math.round(speedKmh)}</text>
        <text x={cx} y={cy + 32} textAnchor="middle" fontSize="8" fill="#64748b">km/h</text>
      </svg>
      <span className="text-[10px] font-semibold text-slate-500 -mt-1">
        {speedKmh === 0 ? 'HALTED' : speedKmh < 60 ? 'SLOW' : speedKmh < 100 ? 'CRUISING' : 'HIGH SPEED'}
      </span>
    </div>
  );
}

// Countdown timer to next station
function NextStationCountdown({ distanceKm = 0, speedKmh = 0 }) {
  const [seconds, setSeconds] = useState(null);

  useEffect(() => {
    if (!speedKmh || speedKmh < 1) { setSeconds(null); return; }
    const etaSeconds = Math.round((distanceKm / speedKmh) * 3600);
    setSeconds(etaSeconds);
    const timer = setInterval(() => {
      setSeconds(s => (s !== null && s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [distanceKm, speedKmh]);

  if (seconds === null) return <span className="text-slate-400 text-xs">Halted</span>;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return (
    <span className="font-mono font-bold text-blue-600 text-sm">
      {h > 0 && `${h}h `}{m}m {String(s).padStart(2, '0')}s
    </span>
  );
}

// Delay severity bar
function DelaySeverityBar({ delayMinutes }) {
  const pct = Math.min((delayMinutes / 60) * 100, 100);
  const color = delayMinutes === 0 ? 'bg-green-500' : delayMinutes < 15 ? 'bg-amber-400' : delayMinutes < 30 ? 'bg-orange-500' : 'bg-red-600';
  const label = delayMinutes === 0 ? 'On Time' : delayMinutes < 15 ? 'Minor Delay' : delayMinutes < 30 ? 'Moderate' : 'Major Delay';
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className={`text-[10px] font-semibold ${delayMinutes === 0 ? 'text-green-600' : 'text-red-600'}`}>{label}</span>
        <span className="text-[10px] text-slate-500">{delayMinutes > 0 ? `+${delayMinutes}m` : '0m'}</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function LiveTracking({ backendOnline }) {
  const [allTrains, setAllTrains] = useState([]);
  const [selected, setSelected] = useState('12723');
  const [statusData, setStatusData] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all' | 'running' | 'halted' | 'delayed' | 'ontime'
  const [searchQuery, setSearchQuery] = useState('');
  const [syncTimer, setSyncTimer] = useState(30);

  // Fetch all trains with their live status
  const fetchAllTrains = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      let data = [];
      if (backendOnline) {
        try {
          data = await getLiveTrains();
        } catch {
          data = getMockLiveTrains();
        }
      } else {
        data = getMockLiveTrains();
      }
      if (data && data.length > 0) {
        setAllTrains(data);
      }
    } catch {
      setAllTrains(getMockLiveTrains());
    } finally {
      if (isManual) setTimeout(() => setRefreshing(false), 500);
      setSyncTimer(30);
    }
  };

  useEffect(() => {
    fetchAllTrains();
    handleSelect(selected || '12723');
    const interval = setInterval(() => fetchAllTrains(), 30000);
    const countdown = setInterval(() => {
      setSyncTimer(prev => (prev > 1 ? prev - 1 : 30));
    }, 1000);
    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, [backendOnline]);

  const handleSelect = async (no) => {
    setSelected(no);
    setLoading(true);
    try {
      const [s, p] = await Promise.all([
        backendOnline ? getTrainStatus(no) : getMockStatus(no),
        backendOnline ? getETAPrediction(no) : getMockPrediction(no),
      ]);
      setStatusData(s || getMockStatus(no));
      setPrediction(p || getMockPrediction(no));
    } catch {
      setStatusData(getMockStatus(no));
      setPrediction(getMockPrediction(no));
    }
    setLoading(false);
  };

  // Metrics across all tracked trains
  const metrics = {
    total: allTrains.length,
    running: allTrains.filter(t => t.live?.status === 'Running').length,
    halted: allTrains.filter(t => t.live?.status === 'Halted').length,
    delayed: allTrains.filter(t => (t.live?.current_delay_minutes || 0) > 10).length,
    ontime: allTrains.filter(t => (t.live?.current_delay_minutes || 0) === 0).length,
  };

  // Filtered and searched trains list
  const filteredTrains = allTrains.filter(t => {
    const delay = t.live?.current_delay_minutes || 0;
    const status = t.live?.status || '';

    // Status filter
    if (filter === 'running' && status !== 'Running') return false;
    if (filter === 'halted' && status !== 'Halted') return false;
    if (filter === 'delayed' && delay <= 10) return false;
    if (filter === 'ontime' && delay !== 0) return false;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchNo = t.train_no?.toLowerCase().includes(q);
      const matchName = t.train_name?.toLowerCase().includes(q);
      const matchFrom = t.from_station?.toLowerCase().includes(q) || t.from_code?.toLowerCase().includes(q);
      const matchTo = t.to_station?.toLowerCase().includes(q) || t.to_code?.toLowerCase().includes(q);
      const matchCur = t.live?.current_station_name?.toLowerCase().includes(q) || t.live?.current_station_code?.toLowerCase().includes(q);
      return matchNo || matchName || matchFrom || matchTo || matchCur;
    }
    return true;
  });

  const liveData = statusData?.live;
  const speedKmh = liveData?.current_speed_kmh ?? 0;
  const distanceToNext = liveData?.distance_to_next_station ?? 0;
  const nextStation = prediction?.station_etas?.find(s => s.status !== 'Passed');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header & Live KPI Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-800">All-India Live Train Fleet Tracking</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">
              {allTrains.length} Trains Live
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            Tracking all active trains in real-time with live GPS telemetry, speed gauges, and AI arrival predictions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <LiveClock variant="compact" />
          <button
            onClick={() => fetchAllTrains(true)}
            disabled={refreshing}
            className="flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3.5 py-2 rounded-xl transition-all disabled:opacity-60"
            title="Refresh all train telemetry now"
          >
            <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
            <span>Sync ({syncTimer}s)</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 border border-green-200 px-3 py-2 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live IR Feed
          </div>
        </div>
      </div>

      {/* KPI Stats Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <button
          onClick={() => setFilter('all')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            filter === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          <p className={`text-[11px] font-semibold ${filter === 'all' ? 'text-slate-300' : 'text-slate-500'}`}>Total Fleet</p>
          <p className="text-xl font-black mt-0.5">{metrics.total} <span className="text-xs font-normal opacity-80">trains</span></p>
        </button>

        <button
          onClick={() => setFilter('running')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            filter === 'running'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
          }`}
        >
          <p className={`text-[11px] font-semibold ${filter === 'running' ? 'text-emerald-100' : 'text-emerald-600'}`}>🟢 Running</p>
          <p className="text-xl font-black mt-0.5">{metrics.running} <span className="text-xs font-normal opacity-80">on track</span></p>
        </button>

        <button
          onClick={() => setFilter('halted')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            filter === 'halted'
              ? 'bg-rose-600 text-white border-rose-600 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:border-rose-300'
          }`}
        >
          <p className={`text-[11px] font-semibold ${filter === 'halted' ? 'text-rose-100' : 'text-rose-600'}`}>🔴 Halted</p>
          <p className="text-xl font-black mt-0.5">{metrics.halted} <span className="text-xs font-normal opacity-80">at stations</span></p>
        </button>

        <button
          onClick={() => setFilter('delayed')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            filter === 'delayed'
              ? 'bg-amber-600 text-white border-amber-600 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300'
          }`}
        >
          <p className={`text-[11px] font-semibold ${filter === 'delayed' ? 'text-amber-100' : 'text-amber-600'}`}>⚠️ Delayed (&gt;10m)</p>
          <p className="text-xl font-black mt-0.5">{metrics.delayed} <span className="text-xs font-normal opacity-80">affected</span></p>
        </button>

        <button
          onClick={() => setFilter('ontime')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            filter === 'ontime'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
          }`}
        >
          <p className={`text-[11px] font-semibold ${filter === 'ontime' ? 'text-blue-100' : 'text-blue-600'}`}>✅ On Schedule</p>
          <p className="text-xl font-black mt-0.5">{metrics.ontime} <span className="text-xs font-normal opacity-80">punctual</span></p>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search train no (e.g. 20607, 12951, 12723), name, route, or station..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium px-1 flex items-center gap-1">
            <Filter size={12} /> Filter:
          </span>
          {[
            { id: 'all', label: `All (${allTrains.length})` },
            { id: 'running', label: `Running (${metrics.running})` },
            { id: 'halted', label: `Halted (${metrics.halted})` },
            { id: 'delayed', label: `Delayed (${metrics.delayed})` },
            { id: 'ontime', label: `On Time (${metrics.ontime})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                filter === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Train Cards Grid - All Tracked Trains */}
      {filteredTrains.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <Activity size={32} className="mx-auto mb-2 text-slate-300" />
          <p className="text-slate-600 font-semibold">No trains matched your filter or search</p>
          <button
            onClick={() => { setFilter('all'); setSearchQuery(''); }}
            className="mt-3 text-xs text-blue-600 font-semibold hover:underline"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {filteredTrains.map(t => {
            const delay = t.live?.current_delay_minutes || 0;
            const isSelected = selected === t.train_no;
            const isRunning = t.live?.status === 'Running';
            const speed = t.live?.current_speed_kmh || 0;

            return (
              <button
                key={t.train_no}
                onClick={() => handleSelect(t.train_no)}
                className={`text-left p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 shadow-lg shadow-blue-100 ring-2 ring-blue-400/20'
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Bar: Train No, Type, Live Status */}
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Train size={15} className={isSelected ? 'text-blue-600' : 'text-slate-600'} />
                      <span className="font-extrabold text-slate-900 text-sm tracking-tight">{t.train_no}</span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200 truncate max-w-[90px]">
                        {t.train_type?.replace('Express', 'Exp')}
                      </span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                      isRunning
                        ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                        : 'text-rose-700 bg-rose-50 border-rose-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                      {isRunning ? 'Running' : 'Halted'}
                    </span>
                  </div>

                  {/* Train Name and Route */}
                  <p className="text-xs font-bold text-slate-800 truncate mb-0.5">{t.train_name}</p>
                  <p className="text-[10px] text-slate-500 truncate mb-2.5">
                    {t.from_station} ({t.from_code}) → {t.to_station} ({t.to_code})
                  </p>

                  {/* Delay severity progress bar */}
                  <DelaySeverityBar delayMinutes={delay} />
                </div>

                {/* Bottom live stats */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 text-[10px] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">
                      At: <strong className="text-slate-700 font-semibold">{t.live?.current_station_name}</strong>
                    </span>
                    <span className={`font-mono font-bold ${speed > 0 ? 'text-blue-700' : 'text-slate-400'}`}>
                      {Math.round(speed)} km/h
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-slate-500 truncate">
                    {delay > 0 ? (
                      <>
                        <AlertTriangle size={10} className="text-amber-500 flex-shrink-0" />
                        <span className="truncate text-slate-600">{t.live?.primary_delay_reason}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={10} className="text-emerald-500 flex-shrink-0" />
                        <span className="text-emerald-700 truncate">On Schedule · Clear Track</span>
                      </>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Selected train section header */}
      <div className="pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
            <h2 className="text-lg font-black text-slate-800">
              Live Telemetry &amp; AI Prediction: <span className="text-blue-600">{statusData?.train_no} {statusData?.train_name}</span>
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">Click any card above to switch train</span>
        </div>
      </div>

      {/* Live instrument panel for selected train */}
      {!loading && statusData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Speed Gauge */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col items-center justify-center gap-2 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 self-start w-full">
              <span className="flex items-center gap-1.5"><Gauge size={14} className="text-blue-500" /> Current Speed</span>
              <span className="font-mono text-slate-700">{statusData?.train_no}</span>
            </div>
            <SpeedGauge speedKmh={speedKmh} />
          </div>

          {/* Next Station Countdown */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Clock size={14} className="text-indigo-500" />
              Next Station ETA
            </div>
            {nextStation ? (
              <>
                <p className="text-lg font-black text-slate-800 leading-tight">{nextStation.station_name}</p>
                <div className="text-xs text-slate-500">
                  <span>Predicted Arrival: </span>
                  <span className="font-semibold text-slate-700">{nextStation.predicted_arrival}</span>
                </div>
                <div className="text-xs text-slate-500">
                  <span>Time away: </span>
                  <NextStationCountdown distanceKm={distanceToNext} speedKmh={speedKmh} />
                </div>
                <div className="text-xs text-slate-500">
                  <span>Distance: </span>
                  <span className="font-semibold text-blue-700">{distanceToNext} km</span>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-400">No upcoming station data</p>
            )}
          </div>

          {/* Delay Summary */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Radio size={14} className="text-orange-500" />
              Live Delay Status
            </div>
            <div>
              <p className={`text-3xl font-black ${(liveData?.current_delay_minutes || 0) > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                {(liveData?.current_delay_minutes || 0) > 0 ? `+${liveData.current_delay_minutes}` : '0'}
                <span className="text-base font-semibold ml-1">min</span>
              </p>
              <p className="text-xs text-slate-500 mt-1 truncate">{liveData?.primary_delay_reason}</p>
            </div>
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Track Congestion</span>
                <span className={`font-semibold ${(liveData?.track_congestion || 0) > 0.5 ? 'text-red-600' : 'text-slate-700'}`}>
                  {Math.round((liveData?.track_congestion || 0) * 100)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Weather Factor</span>
                <span className="font-semibold text-slate-700">{Math.round((liveData?.weather_factor || 0) * 100)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Speed Restriction</span>
                <span className={`font-semibold ${liveData?.speed_restriction ? 'text-red-600' : 'text-emerald-600'}`}>
                  {liveData?.speed_restriction ? 'Active' : 'None'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selected train detail cards */}
      {loading && <div className="h-48 bg-slate-100 rounded-2xl shimmer" />}
      {!loading && statusData && prediction && (
        <div className="space-y-6">
          <TrainStatusCard status={statusData} prediction={prediction} />
          <RouteMap prediction={prediction} status={statusData} />
          <AIExplanationSuite prediction={prediction} status={statusData} />
        </div>
      )}

      {!selected && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <Activity size={32} className="mx-auto mb-3 text-slate-300" />
          <p className="text-slate-600 font-medium">Select any train above to see its live route &amp; AI prediction</p>
        </div>
      )}
    </div>
  );
}

