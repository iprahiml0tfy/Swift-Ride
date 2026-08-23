import React, { useEffect, useState } from 'react';
import { ActiveRide } from '../types';
import { Zap, Pause, Play, Lock, CheckCircle2, MapPin, Battery, Clock, DollarSign } from 'lucide-react';

interface ActiveRideBarProps {
  ride: ActiveRide | null;
  onPauseToggle: () => void;
  onEndRide: () => void;
}

export const ActiveRideBar: React.FC<ActiveRideBarProps> = ({
  ride,
  onPauseToggle,
  onEndRide,
}) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!ride) {
      setSeconds(0);
      return;
    }

    const interval = setInterval(() => {
      if (!ride.isPaused) {
        setSeconds((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [ride?.isPaused, ride?.startTime]);

  if (!ride) return null;

  const minutes = Math.floor(seconds / 60);
  const remainingSecs = seconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSecs).padStart(2, '0')}`;
  
  // Cost calculation (first 3 rides free voucher or regular)
  const currentCost = (minutes * ride.scooter.pricePerMin).toFixed(2);

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-2xl bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-700/80 backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Scooter & Status */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 fill-current animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white">{ride.scooter.name}</span>
              <span className="text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                {ride.isPaused ? 'Paused' : 'In Transit'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Model {ride.scooter.model} • Central Park Zone
            </p>
          </div>
        </div>

        {/* Middle: Live Stats */}
        <div className="flex items-center gap-5 text-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Duration</span>
            <span className="font-mono font-bold text-sm text-white">{formattedTime}</span>
          </div>
          <div className="h-6 w-px bg-slate-700"></div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Live Fare</span>
            <span className="font-mono font-bold text-sm text-emerald-400">${currentCost}</span>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={onPauseToggle}
            className={`p-2.5 rounded-xl border transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
              ride.isPaused
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 hover:bg-amber-500/30'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {ride.isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            <span>{ride.isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          <button
            onClick={onEndRide}
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-97 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md shadow-red-600/30 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>End & Lock</span>
          </button>
        </div>

      </div>
    </div>
  );
};
