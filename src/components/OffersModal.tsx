import React, { useState } from 'react';
import { X, Gift, CheckCircle2, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';

interface OffersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreRentals: () => void;
}

export const OffersModal: React.FC<OffersModalProps> = ({
  isOpen,
  onClose,
  onExploreRentals,
}) => {
  const [copied, setCopied] = useState(false);
  const [claimed, setClaimed] = useState(true);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('SWIFT3FREE');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-150 p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
                Exclusive Commuter Offers
              </h3>
              <p className="text-xs text-slate-400">
                Active promotions and savings on your next rides
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

        {/* Highlight Offer Card */}
        <div className="bg-gradient-to-br from-[#0b1326] to-[#12213d] text-white p-5 rounded-2xl border border-slate-700 shadow-md mb-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Welcome Bonus
            </span>
            <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Auto-Applied
            </span>
          </div>

          <h4 className="text-xl font-extrabold text-white mt-2">
            First 3 Rides 100% Free
          </h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Enjoy up to 20 minutes per ride with zero unlock fee and zero per-minute charge. Valid on all fleet models.
          </p>

          <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Promo Code</span>
              <span className="font-mono font-bold text-sm tracking-wider text-emerald-400">SWIFT3FREE</span>
            </div>

            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 border border-slate-600 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>
        </div>

        {/* Additional Passes */}
        <div className="space-y-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <h5 className="font-bold text-slate-900">Day Pass Unlimited</h5>
              <p className="text-slate-500 text-[11px]">Unlimited 45-min unlocks for 24 hours</p>
            </div>
            <div className="text-right">
              <span className="font-bold text-slate-900 text-sm">$14.99</span>
              <button
                onClick={() => { onClose(); onExploreRentals(); }}
                className="block text-[11px] font-semibold text-emerald-600 hover:underline"
              >
                Select Pass
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <h5 className="font-bold text-slate-900">Monthly Commuter Club</h5>
              <p className="text-slate-500 text-[11px]">Zero unlock fees + 25% off all per-minute rates</p>
            </div>
            <div className="text-right">
              <span className="font-bold text-slate-900 text-sm">$29.99/mo</span>
              <button
                onClick={() => { onClose(); onExploreRentals(); }}
                className="block text-[11px] font-semibold text-emerald-600 hover:underline"
              >
                Join Club
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            onClose();
            onExploreRentals();
          }}
          className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <span>Use Promo on Next Ride</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
