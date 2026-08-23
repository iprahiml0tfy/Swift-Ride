import React from 'react';
import { X, MapPin, QrCode, ShieldCheck, Zap, ArrowRight, Check } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreRentals: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  isOpen,
  onClose,
  onExploreRentals,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-150 p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
                How SwiftRide Works
              </h3>
              <p className="text-xs text-slate-400">
                Start moving with clean electric power in 3 simple steps
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Steps */}
        <div className="space-y-4 mb-8">
          
          {/* Step 1 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-150">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/20">
              1
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                Locate Nearby Scooter
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Open the map or browse Available Scooters to find a vehicle near you. Check remaining battery range and reserve in advance.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-150">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/20">
              2
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                Scan QR Code to Unlock
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Scan the handlebar QR code with your phone. The electronic safety lock will click open instantly with zero paperwork.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-150">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/20">
              3
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                Ride & Park Responsibly
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Ride safely in bike lanes. When done, park inside any designated Smart Zone or docking hub and lock via the app.
              </p>
            </div>
          </div>

        </div>

        {/* Safety Guidelines */}
        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 mb-6 text-xs text-slate-700 space-y-1.5">
          <p className="font-bold text-emerald-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Safety Rules & Regulations
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 pt-1">
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Helmet recommended for all riders</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>One rider per scooter only</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Yield to pedestrians on crossings</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Park upright in Smart Zones</span>
            </li>
          </ul>
        </div>

        {/* Action button */}
        <button
          onClick={() => {
            onClose();
            onExploreRentals();
          }}
          className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-white font-bold text-sm shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Explore Available Scooters</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
