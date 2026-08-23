import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  Wifi,
  Shield,
  Flashlight,
  Keyboard,
  Info,
  CheckCircle2,
  Lock,
  Unlock,
  Zap,
  Battery,
  AlertCircle,
  HelpCircle,
  X,
  Play
} from 'lucide-react';
import { ASSETS } from '../data/scootersData';
import { PageView } from '../types';

interface UnlockScooterPageProps {
  scooterName?: string;
  vehicleId?: string;
  onNavigate: (page: PageView) => void;
  onRideStarted?: (scooterName: string) => void;
}

export const UnlockScooterPage: React.FC<UnlockScooterPageProps> = ({
  scooterName = 'Swift Urban Pro',
  vehicleId = 'SR-V882',
  onNavigate,
  onRideStarted
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [isScanning, setIsScanning] = useState(true);
  const [activeRideSeconds, setActiveRideSeconds] = useState(0);
  const [isRiding, setIsRiding] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  // Simulate scanning cycle
  const handleTriggerScan = () => {
    setIsScanning(true);
    setCurrentStep(1);

    setTimeout(() => {
      setCurrentStep(2); // Verify vehicle
      setTimeout(() => {
        setCurrentStep(3); // Unlocked!
        setIsScanning(false);
      }, 1400);
    }, 1200);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.length >= 4) {
      setManualModalOpen(false);
      handleTriggerScan();
    }
  };

  const handleStartRide = () => {
    setIsRiding(true);
    if (onRideStarted) {
      onRideStarted(scooterName);
    }
    setTimeout(() => {
      onNavigate('active-ride');
    }, 600);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRiding) {
      interval = setInterval(() => {
        setActiveRideSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRiding]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20">
      {/* Top Header Row */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <div className="flex items-center justify-between">
          <button
            id="back-to-map-btn"
            onClick={() => onNavigate('booking-details')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer py-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Booking</span>
          </button>

          {/* Connected Pill */}
          <div className="flex items-center gap-2 bg-emerald-50/90 border border-emerald-200/90 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="tracking-wide">CONNECTED</span>
          </div>
        </div>

        {/* Title & Subtext */}
        <div className="mt-4">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Ready for SwiftRide?
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Position the QR code located on the center of the handlebars within the frame below to begin your journey.
          </p>
        </div>
      </div>

      {/* Main 2-Column Content Layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3 Steps & Safety Banner (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Step 1: Locate QR Code */}
            <div
              onClick={() => setCurrentStep(1)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                currentStep === 1
                  ? 'bg-emerald-50/50 border-emerald-400 shadow-sm'
                  : 'bg-white border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 ${
                    currentStep === 1
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  01
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                    Locate QR Code
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Find the code on the handlebars or the rear fender.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Verify Vehicle */}
            <div
              onClick={() => setCurrentStep(2)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                currentStep === 2
                  ? 'bg-emerald-50/50 border-emerald-400 shadow-sm'
                  : 'bg-white border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 ${
                    currentStep === 2
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  02
                </div>
                <div className="flex-1">
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                    Verify Vehicle
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    We'll check battery health and safety diagnostics.
                  </p>

                  {currentStep === 2 && (
                    <div className="mt-3 pt-2.5 border-t border-emerald-200/50 grid grid-cols-2 gap-2 text-[11px]">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Battery 98% (42 mi)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Brakes & Lights OK</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Step 3: Unlock & Ride */}
            <div
              onClick={() => setCurrentStep(3)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                currentStep === 3
                  ? 'bg-emerald-50/50 border-emerald-400 shadow-sm'
                  : 'bg-white border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 ${
                    currentStep === 3
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  03
                </div>
                <div className="flex-1">
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                    Unlock & Ride
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    The lock will release automatically once authorized.
                  </p>

                  {currentStep === 3 && (
                    <div className="mt-3">
                      {!isRiding ? (
                        <button
                          onClick={handleStartRide}
                          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                        >
                          <Unlock className="w-3.5 h-3.5" />
                          <span>Release Lock & Start Ride</span>
                        </button>
                      ) : (
                        <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                            <span className="text-xs font-bold">Ride in Progress</span>
                          </div>
                          <span className="font-mono font-bold text-emerald-400 text-xs">
                            {formatTimer(activeRideSeconds)}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Ride Safely Dark Banner */}
            <div className="p-4 bg-slate-800 text-white rounded-2xl flex items-start gap-3.5 shadow-sm mt-4">
              <div className="w-8 h-8 rounded-xl bg-slate-700/80 border border-slate-600 flex items-center justify-center shrink-0 text-emerald-400">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Ride Safely</h4>
                <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                  Always wear a helmet and follow local traffic laws. Check brakes before accelerating.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Camera Viewfinder / Scanner View (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Viewfinder Metallic Chassis Container */}
            <div
              className={`w-full max-w-md aspect-square bg-slate-900 rounded-3xl p-4 sm:p-5 relative overflow-hidden shadow-2xl border-4 border-slate-800 flex flex-col justify-between transition-all ${
                flashlightOn ? 'ring-8 ring-amber-200/20' : ''
              }`}
            >
              {/* Corner Target Markers */}
              <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-emerald-500 pointer-events-none z-20" />
              <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-emerald-500 pointer-events-none z-20" />
              <div className="absolute bottom-16 left-4 w-7 h-7 border-b-2 border-l-2 border-emerald-500 pointer-events-none z-20" />
              <div className="absolute bottom-16 right-4 w-7 h-7 border-b-2 border-r-2 border-emerald-500 pointer-events-none z-20" />

              {/* Viewfinder Camera Feed */}
              <div className="absolute inset-0 z-0">
                <img
                  src={ASSETS.scooterHandlebarsScanner}
                  alt="Scooter Handlebars Scanner"
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    flashlightOn ? 'brightness-125 contrast-110' : 'brightness-90'
                  }`}
                />

                {/* Ambient Radial Vignette */}
                <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80" />
              </div>

              {/* Centered Holographic Target Box */}
              <div className="relative z-10 my-auto flex flex-col items-center justify-center">
                <div
                  onClick={handleTriggerScan}
                  className="w-44 sm:w-52 h-44 sm:h-52 rounded-2xl border-2 border-emerald-400/90 shadow-[0_0_25px_rgba(16,185,129,0.35)] flex flex-col items-center justify-center relative backdrop-blur-3xs cursor-pointer group hover:border-emerald-300 transition-colors"
                >
                  {/* Sweep Animation Line */}
                  <div className="absolute left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_8px_#34d399] animate-pulse top-1/2 -translate-y-1/2" />

                  <div className="text-center p-2">
                    {currentStep === 1 && (
                      <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded-full border border-emerald-500/40">
                        Align Handlebar QR
                      </span>
                    )}
                    {currentStep === 2 && (
                      <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded-full border border-cyan-500/40 animate-pulse">
                        Verifying Diagnostics...
                      </span>
                    )}
                    {currentStep === 3 && (
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded-full border border-emerald-400">
                        Vehicle Ready
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Control Bar in Viewfinder */}
              <div className="relative z-20 flex items-center justify-between gap-2 pt-2">
                {/* Flashlight Button */}
                <button
                  onClick={() => setFlashlightOn(!flashlightOn)}
                  title="Toggle Light"
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg ${
                    flashlightOn
                      ? 'bg-amber-400 text-slate-900 ring-2 ring-amber-300'
                      : 'bg-white/80 hover:bg-white text-slate-800 backdrop-blur-md'
                  }`}
                >
                  <Flashlight className="w-4 h-4" />
                </button>

                {/* Enter ID Manually Pill */}
                <button
                  onClick={() => setManualModalOpen(true)}
                  className="flex-1 py-2.5 px-4 bg-white/85 hover:bg-white text-slate-900 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg backdrop-blur-md transition-all cursor-pointer"
                >
                  <Keyboard className="w-3.5 h-3.5 text-slate-700" />
                  <span>Enter ID Manually</span>
                </button>

                {/* Info Button */}
                <button
                  onClick={() => setInfoModalOpen(true)}
                  title="Scanner Help"
                  className="w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-lg backdrop-blur-md"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Support Link */}
            <div className="mt-4 text-center">
              <button
                onClick={() => setManualModalOpen(true)}
                className="text-xs text-slate-500 hover:text-emerald-600 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <AlertCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Trouble scanning? <strong className="text-emerald-600 font-bold hover:underline">Get Help</strong></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Code Modal */}
      {manualModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 relative">
            <button
              onClick={() => setManualModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Keyboard className="w-5 h-5" />
            </div>

            <h3 className="text-base font-bold text-slate-900">Enter Scooter ID or Code</h3>
            <p className="text-xs text-slate-500 mt-1">
              Type the 4-digit code located directly beneath the QR sticker on the handlebar.
            </p>

            <form onSubmit={handleManualSubmit} className="mt-4 space-y-4">
              <input
                type="text"
                maxLength={8}
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                placeholder="e.g. 8294 or SR-V882"
                className="w-full text-center tracking-widest text-lg font-mono font-bold py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                autoFocus
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setManualCode('8294');
                  }}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200 cursor-pointer"
                >
                  Fill Code (8294)
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Verify & Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {infoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-600" />
              <span>Scanning Tips</span>
            </h3>

            <ul className="mt-3 space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>Ensure your camera lens is clean and unobstructed.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>In low-light conditions, tap the flashlight button on the bottom left.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>Hold your device 6–10 inches from the handlebar code sticker.</span>
              </li>
            </ul>

            <button
              onClick={() => setInfoModalOpen(false)}
              className="w-full mt-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
