import React, { useState } from 'react';
import { Scooter } from '../types';
import { 
  X, 
  Zap, 
  Battery, 
  Gauge, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Loader2
} from 'lucide-react';

interface BookingModalProps {
  scooter: Scooter | null;
  onClose: () => void;
  onStartRide: (scooter: Scooter) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  scooter,
  onClose,
  onStartRide,
}) => {
  const [step, setStep] = useState<'details' | 'unlocking' | 'ready'>('details');
  const [usePromo, setUsePromo] = useState(true);

  if (!scooter) return null;

  const handleConfirmUnlock = () => {
    setStep('unlocking');
    setTimeout(() => {
      setStep('ready');
      setTimeout(() => {
        onStartRide(scooter);
      }, 1000);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="booking-modal-card"
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-150 animate-in zoom-in-95 duration-200"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {step === 'details' ? 'Confirm Reservation' : step === 'unlocking' ? 'Unlocking Vehicle...' : 'Ready to Ride!'}
              </h3>
              <p className="text-xs text-slate-400">
                {scooter.name} ({scooter.model})
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

        {/* Body Content */}
        <div className="p-6">
          {step === 'details' && (
            <div className="space-y-5">
              
              {/* Scooter Photo & Quick Specs */}
              <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-150">
                <img
                  src={scooter.image}
                  alt={scooter.name}
                  referrerPolicy="no-referrer"
                  className="w-24 h-20 object-contain rounded-lg bg-white p-1"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{scooter.name}</span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {scooter.batteryPercentage || 90}% Battery
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {scooter.location}
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-600">
                    <span className="bg-slate-200/80 px-2 py-0.5 rounded-md font-medium">
                      ⚡ {scooter.rangeMiles} mi range
                    </span>
                    <span className="bg-slate-200/80 px-2 py-0.5 rounded-md font-medium">
                      ⏱ {scooter.topSpeedMph} mph max
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="bg-white rounded-2xl border border-slate-150 p-4 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Unlock Fee</span>
                  <span className={usePromo ? "line-through text-slate-400" : "font-medium text-slate-900"}>
                    $1.00
                  </span>
                </div>
                {usePromo && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> First 3 Rides Free Promo
                    </span>
                    <span>-$1.00 (FREE)</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Ride Rate</span>
                  <span className="font-bold text-slate-900">${scooter.pricePerMin.toFixed(2)} / min</span>
                </div>
                <div className="border-t border-slate-100 pt-2 flex justify-between font-bold text-slate-900 text-sm">
                  <span>Initial Hold / Unlock Total</span>
                  <span className="text-emerald-600">{usePromo ? "$0.00" : "$1.00"}</span>
                </div>
              </div>

              {/* Safety & Helmet Assurance */}
              <div className="flex items-start gap-2.5 text-xs text-slate-500 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Wear a helmet and ride in designated bike lanes. Follow local speed limits and park in marked Smart Zones.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmUnlock}
                  className="flex-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-white font-bold text-xs shadow-md shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Unlock & Start Ride</span>
                </button>
              </div>

            </div>
          )}

          {step === 'unlocking' && (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto animate-pulse">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Connecting to Scooter...</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Transmitting encrypted BLE security token to {scooter.name}
                </p>
              </div>
            </div>
          )}

          {step === 'ready' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto scale-110 transition-transform">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Scooter Unlocked!</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Kick off with one foot and gently press the right throttle. Enjoy your carbon-free ride!
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
