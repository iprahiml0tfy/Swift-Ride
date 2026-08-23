import React from 'react';
import { ActiveRide } from '../types';
import { CheckCircle2, Zap, Leaf, DollarSign, X, ArrowRight, Star } from 'lucide-react';

interface RideSummaryModalProps {
  completedRide: {
    scooterName: string;
    model: string;
    durationMinutes: number;
    totalCost: number;
    co2SavedGrams: number;
  } | null;
  onClose: () => void;
}

export const RideSummaryModal: React.FC<RideSummaryModalProps> = ({
  completedRide,
  onClose,
}) => {
  if (!completedRide) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-150 p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200">
        
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h3 className="text-xl font-extrabold text-slate-900">
          Ride Completed!
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Vehicle securely locked in Smart Docking Zone.
        </p>

        {/* Receipt Box */}
        <div className="my-6 bg-slate-50 rounded-2xl p-4 border border-slate-150 text-left space-y-2.5 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Scooter Model</span>
            <span className="font-semibold text-slate-900">{completedRide.scooterName} ({completedRide.model})</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Ride Duration</span>
            <span className="font-semibold text-slate-900">{completedRide.durationMinutes} minutes</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Carbon Prevented</span>
            <span className="font-semibold text-emerald-600 flex items-center gap-1">
              <Leaf className="w-3 h-3" /> {completedRide.co2SavedGrams}g CO2 saved
            </span>
          </div>
          <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900 text-sm">
            <span>Total Paid</span>
            <span className="text-emerald-600">${completedRide.totalCost.toFixed(2)} (Promo Applied)</span>
          </div>
        </div>

        {/* Star Rating */}
        <div className="mb-6">
          <p className="text-xs text-slate-500 mb-2 font-medium">How was your ride experience?</p>
          <div className="flex items-center justify-center gap-2 text-amber-400">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} className="hover:scale-125 transition-transform cursor-pointer">
                <Star className="w-6 h-6 fill-current" />
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
        >
          Done
        </button>

      </div>
    </div>
  );
};
