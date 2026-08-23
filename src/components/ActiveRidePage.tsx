import React, { useState, useEffect } from 'react';
import {
  Navigation,
  Battery,
  Clock,
  Zap,
  Shield,
  Pause,
  Play,
  MapPin,
  XCircle,
  MessageSquare,
  AlertTriangle,
  Send,
  X,
  Share2,
  Check,
  ChevronRight,
  Sparkles,
  PhoneCall,
  Activity,
  Gauge
} from 'lucide-react';
import { ASSETS } from '../data/scootersData';
import { PageView } from '../types';

interface ActiveRidePageProps {
  scooterName?: string;
  onNavigate: (page: PageView) => void;
}

export const ActiveRidePage: React.FC<ActiveRidePageProps> = ({
  scooterName = 'Swift Urban Pro',
  onNavigate
}) => {
  // 12:22 starting time elapsed (742 seconds)
  const [elapsedSeconds, setElapsedSeconds] = useState(742);
  const [isPaused, setIsPaused] = useState(false);
  const [speedMph, setSpeedMph] = useState(18);
  const [batteryPercent, setBatteryPercent] = useState(84);
  const [distanceMiles, setDistanceMiles] = useState(3.2);
  const [estimatedCost, setEstimatedCost] = useState(4.80);

  // Modals
  const [endRideModalOpen, setEndRideModalOpen] = useState(false);
  const [changeEndModalOpen, setChangeEndModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [referModalOpen, setReferModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: 'assistant', text: "Hi Alex! I'm tracking your ride on Swift Urban Pro (SW-4829-91). Battery and diagnostics look great. How can I help you today?" }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Active Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isPaused) {
      timer = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPaused]);

  // Subtle speed fluctuation simulation
  useEffect(() => {
    if (isPaused) {
      setSpeedMph(0);
      return;
    }
    const interval = setInterval(() => {
      setSpeedMph((prev) => {
        const delta = (Math.random() - 0.5) * 2;
        const newSpeed = Math.min(22, Math.max(14, Math.round(prev + delta)));
        return newSpeed;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage;
    setChatMessages((prev) => [...prev, { from: 'user', text: userMsg }]);
    setInputMessage('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          from: 'assistant',
          text: "I've noted that! The route to Mission District Hub is optimal with clear bike lanes on Valencia St. Enjoy your ride!"
        }
      ]);
    }, 900);
  };

  const handleEndRideConfirm = () => {
    setEndRideModalOpen(false);
    onNavigate('rate-scooter');
  };

  const handleCopyReferral = () => {
    navigator.clipboard?.writeText('https://swiftride.io/invite/ALEX-SWIFT-20');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20">
      {/* 3D Cybernetic Map Hero HUD */}
      <div className="relative w-full bg-slate-950 border-b border-slate-800 overflow-hidden">
        {/* Cyber Grid Route Map Background */}
        <div className="relative w-full h-80 sm:h-96">
          <img
            src={ASSETS.cyberRouteMap}
            alt="Active Ride Route Cyber Grid Map"
            className="w-full h-full object-cover object-center opacity-85"
          />

          {/* Dark gradient fade on bottom */}
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-slate-950" />

          {/* Top Pill HUD: RIDE IN PROGRESS & Large Timer */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
            {/* Top Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/90 text-slate-950 text-[11px] font-black rounded-full uppercase tracking-wider shadow-lg shadow-emerald-500/30">
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>RIDE IN PROGRESS</span>
            </div>

            {/* Elapsed Time Container */}
            <div className="mt-2 bg-white/95 backdrop-blur-md px-6 py-2 rounded-2xl shadow-2xl border border-white/40 text-center">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                ELAPSED TIME
              </p>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
                {formatTimer(elapsedSeconds)}
              </p>
            </div>
          </div>

          {/* Floating Navigation Card HUD (Left Overlay) */}
          <div className="absolute bottom-4 left-4 sm:left-8 z-20 max-w-xs sm:max-w-sm w-full bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/60 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Navigation className="w-4 h-4 transform rotate-45" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900 leading-none">
                    Heading North
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                    SPEED: <strong className="text-slate-900 font-bold">{speedMph} MPH</strong>
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md">
                GPS ACTIVE
              </span>
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase">NEXT TURN</p>
                <p className="font-bold text-slate-900 truncate">Turn right on Valencia St</p>
              </div>
              <Share2 className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* 3 Floating Metric Pills Strip */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 relative z-30 pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {/* Distance */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  DISTANCE
                </p>
                <p className="text-base font-black text-slate-900">
                  {distanceMiles} <span className="text-xs font-normal text-slate-500">miles</span>
                </p>
              </div>
            </div>

            {/* Battery */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <Battery className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  BATTERY
                </p>
                <p className="text-base font-black text-slate-900">
                  {batteryPercent}% <span className="text-xs font-normal text-slate-500">remaining</span>
                </p>
              </div>
            </div>

            {/* Estimated Cost */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  ESTIMATED COST
                </p>
                <p className="text-base font-black text-emerald-600">
                  ${estimatedCost.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid (Left Details + Right Controls & Support) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Vehicle Details & Journey Progress (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Vehicle Details Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Vehicle Details</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Performance tracking for your {scooterName}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-extrabold text-slate-900 block">Model A-204</span>
                  <span className="text-[11px] font-mono text-slate-400">ID: SW-4829-91</span>
                </div>
              </div>

              {/* Health and Tire Pressure Specs */}
              <div className="mt-5 space-y-4 text-xs">
                {/* Engine Health */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Engine Health</span>
                  <span className="font-bold text-emerald-600">98% Optimal</span>
                </div>

                {/* Tire Pressure with Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-slate-500 font-medium">Tire Pressure</span>
                    <span className="font-bold text-slate-900">32 PSI</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-4/5" />
                  </div>
                </div>
              </div>

              {/* Safety Mode Active Banner */}
              <div className="mt-5 p-3.5 bg-emerald-50/60 border border-emerald-200/70 rounded-xl flex items-start gap-3">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-950">Safety Mode Active</h4>
                  <p className="text-[11px] text-emerald-900/80 mt-0.5 leading-relaxed">
                    Speed-limited zones detected in your area. Helmets are mandatory for this route.
                  </p>
                </div>
              </div>
            </div>

            {/* Journey Progress Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
              <h3 className="text-base font-bold text-slate-900 mb-5">Journey Progress</h3>

              {/* Timeline Sequence */}
              <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {/* Step 1 */}
                <div className="relative flex items-start gap-3.5 pl-6">
                  <span className="absolute left-1 top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      10:14 AM <span className="font-semibold text-slate-700">Started Ride</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>Market St & 4th</span>
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-start gap-3.5 pl-6">
                  <span className="absolute left-1 top-1 w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      10:22 AM <span className="font-semibold text-slate-700">Route Deviation</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>Passed 18th & Guerrero</span>
                    </p>
                  </div>
                </div>

                {/* Step 3 (Current) */}
                <div className="relative flex items-start gap-3.5 pl-6">
                  <span className="absolute left-1 top-1 w-2.5 h-2.5 rounded-full bg-slate-800 ring-4 ring-slate-100" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      NOW <span className="font-semibold text-slate-700">Current Location</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>Approaching Dolores Park</span>
                    </p>
                  </div>
                </div>

                {/* Step 4 (Destination) */}
                <div className="relative flex items-start gap-3.5 pl-6">
                  <span className="absolute left-1 top-1 w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      ~10:32 AM <span className="font-semibold text-slate-700">Destination</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>Mission District Hub</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Ride Controls, Support Assistant, Nearby Alerts (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Ride Controls Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
              <h3 className="text-base font-bold text-slate-900 mb-4">Ride Controls</h3>

              {/* 2 Top Controls */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className={`py-3 px-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    isPaused
                      ? 'bg-amber-500 text-white border-amber-600'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  <span>{isPaused ? 'RESUME RIDE' : 'PAUSE RIDE'}</span>
                </button>

                <button
                  onClick={() => setChangeEndModalOpen(true)}
                  className="py-3 px-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-slate-600" />
                  <span>CHANGE END</span>
                </button>
              </div>

              {/* Red END RIDE Action Button */}
              <button
                id="active-ride-end-btn"
                onClick={() => setEndRideModalOpen(true)}
                className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-rose-600/20 transition-all cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
                <span>END RIDE</span>
              </button>

              <div className="mt-4 text-center">
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-[11px] font-extrabold text-slate-400 hover:text-slate-700 tracking-wider uppercase transition-colors cursor-pointer"
                >
                  SAFETY & ASSISTANCE
                </button>
              </div>
            </div>

            {/* Support Assistant Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={ASSETS.alexAvatar}
                    alt="Support Assistant"
                    className="w-11 h-11 rounded-full object-cover border border-slate-200"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Support Assistant</h4>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">
                    ONLINE NOW
                  </span>
                </div>
              </div>

              <p className="text-xs italic text-slate-500 mt-3 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                "Need help with your current route or vehicle performance? I'm here to assist."
              </p>

              <button
                onClick={() => setChatModalOpen(true)}
                className="w-full mt-3 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                <span>Live Chat Support</span>
              </button>
            </div>

            {/* NEARBY ALERTS Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5">
              <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-3">
                NEARBY ALERTS
              </h4>

              <div className="space-y-3">
                {/* Alert 1 */}
                <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    Construction ahead on <strong className="font-bold">Market Street</strong>. Consider using the bike lane on 5th.
                  </p>
                </div>

                {/* Alert 2 */}
                <div className="p-3 bg-emerald-50/70 border border-emerald-200/70 rounded-xl flex items-start gap-2.5 text-xs text-emerald-900">
                  <Zap className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    High-efficiency zone entered. Battery consumption reduced by 12%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Referral / Promo Reward Banner */}
        <div className="mt-8 rounded-3xl bg-linear-to-r from-emerald-50/80 via-teal-50/50 to-emerald-50/80 border border-emerald-200/60 p-8 text-center shadow-xs">
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Unlock premium rewards by sharing your route and inviting friends. Earn free ride minutes for every successful referral.
          </p>

          <button
            onClick={() => setReferModalOpen(true)}
            className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            Refer a Friend
          </button>
        </div>
      </div>

      {/* END RIDE MODAL */}
      {endRideModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <XCircle className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900">End Active Ride?</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Are you sure you want to end your journey? Ensure your scooter is safely parked in a designated SwiftRide bay and the lock is engaged.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={() => setEndRideModalOpen(false)}
                className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
              >
                Continue Ride
              </button>
              <button
                onClick={handleEndRideConfirm}
                className="py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-md"
              >
                End & Rate Ride
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHANGE END LOCATION MODAL */}
      {changeEndModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Select New Drop-Off Hub</span>
              </h3>
              <button onClick={() => setChangeEndModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <button
                onClick={() => setChangeEndModalOpen(false)}
                className="w-full p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-left flex items-center justify-between font-bold text-emerald-950 cursor-pointer"
              >
                <span>Mission District Hub (Current)</span>
                <span className="text-[10px] text-emerald-700">0.8 mi</span>
              </button>
              <button
                onClick={() => setChangeEndModalOpen(false)}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left flex items-center justify-between text-slate-800 cursor-pointer"
              >
                <span>Union Square North Station</span>
                <span className="text-[10px] text-slate-500">1.4 mi</span>
              </button>
              <button
                onClick={() => setChangeEndModalOpen(false)}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left flex items-center justify-between text-slate-800 cursor-pointer"
              >
                <span>Ferry Building Promenade</span>
                <span className="text-[10px] text-slate-500">2.1 mi</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LIVE CHAT MODAL */}
      {chatModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl border border-slate-100 animate-in zoom-in-95 flex flex-col h-[480px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <img src={ASSETS.alexAvatar} alt="Support" className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">SwiftRide Live Telemetry Support</h4>
                  <p className="text-[10px] text-emerald-600 font-bold">Online • Connected to Vehicle #SW-4829</p>
                </div>
              </div>
              <button onClick={() => setChatModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3 text-xs">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.from === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-xs'
                        : 'bg-slate-100 text-slate-800 rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input form */}
            <form onSubmit={handleSendMessage} className="pt-2 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about route, battery or parking..."
                className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* REFER MODAL */}
      {referModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-100 animate-in zoom-in-95 relative">
            <button onClick={() => setReferModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900">Invite Friends, Get $15</h3>
            <p className="text-xs text-slate-500 mt-1">
              Give your friends $10 off their first ride and you'll get $15 in SwiftRide ride credits.
            </p>

            <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-slate-800">ALEX-SWIFT-20</span>
              <button
                onClick={handleCopyReferral}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
              >
                {copiedLink ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
