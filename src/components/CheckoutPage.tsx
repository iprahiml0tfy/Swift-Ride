import React, { useState } from 'react';
import {
  ChevronLeft,
  CreditCard,
  Wallet,
  ShieldCheck,
  Check,
  Tag,
  Info,
  Clock,
  MapPin,
  Shield,
  ArrowRight,
  Lock,
  Bitcoin
} from 'lucide-react';
import { ASSETS, FLAGSHIP_SCOOTER } from '../data/scootersData';
import { Scooter, PageView, BookingReservation } from '../types';

interface CheckoutPageProps {
  scooter?: Scooter;
  reservationDraft?: Partial<BookingReservation>;
  onConfirmAndPay: (confirmedBooking: BookingReservation) => void;
  onNavigate: (page: PageView) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  scooter = FLAGSHIP_SCOOTER,
  reservationDraft,
  onConfirmAndPay,
  onNavigate
}) => {
  // Payment Method Selection
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet' | 'crypto'>('card');

  // Form Fields
  const [nameOnCard, setNameOnCard] = useState('Johnathan Doe');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiryDate, setExpiryDate] = useState('12/28');
  const [cvv, setCvv] = useState('123');
  const [saveCard, setSaveCard] = useState(true);

  const [email, setEmail] = useState('alex.chen@techmail.com');
  const [zipCode, setZipCode] = useState('94103');

  // Promo Code
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>({
    code: 'SWIFT20',
    discount: 6.00
  });
  const [promoFeedback, setPromoFeedback] = useState<string | null>(null);

  // Submitting state
  const [isProcessing, setIsProcessing] = useState(false);

  // Duration & Pricing calculation matching the design
  const durationHours = reservationDraft?.durationHours || 2;
  const standardHourlyRate = 15.00;
  const baseRate = standardHourlyRate * durationHours; // $30.00
  const insuranceFee = 4.50;
  const serviceCharge = 2.00;
  const discountAmount = appliedPromo ? appliedPromo.discount : 0;
  const totalAmount = Math.max(0, baseRate + insuranceFee + serviceCharge - discountAmount); // $30.50

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;

    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'SWIFT20' || code === 'SWIFT10' || code === 'SAVE20' || code === 'ECOCOMMUTE') {
      setAppliedPromo({
        code: code,
        discount: 6.00
      });
      setPromoFeedback('Promo code applied! Saved $6.00');
    } else {
      setPromoFeedback('Invalid or expired promo code.');
    }
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const newReservation: BookingReservation = {
        id: 'SR-882941-X',
        scooterName: scooter.name || 'Swift Urban Pro',
        scooterModel: scooter.model || 'Model A',
        scooterImage: scooter.image || ASSETS.commuter,
        date: reservationDraft?.date || 'October 24, 2026',
        timeWindow: reservationDraft?.timeWindow || '10:00 AM • 2 Hours',
        location: reservationDraft?.location || 'Central Park North, Dock #14',
        dockNumber: '#14',
        totalCost: totalAmount,
        status: 'Reserved',
        durationHours: durationHours,
        withProtection: true,
        withHelmet: true,
        paymentMethod: paymentMethod === 'card' ? 'Visa' : paymentMethod === 'wallet' ? 'Apple Pay' : 'BitPay',
        cardLast4: '4242',
        promoCode: appliedPromo?.code,
        discountAmount: discountAmount
      };
      onConfirmAndPay(newReservation);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20">
      {/* Top Breadcrumb Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <button
          id="back-to-booking-btn"
          onClick={() => onNavigate('booking')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer py-1"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Booking Details</span>
        </button>

        <div className="mt-3">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Secure Checkout
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete your reservation and get ready for the ride.
          </p>
        </div>
      </div>

      {/* Main Checkout Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Forms */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Payment Method */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                  1
                </div>
                <h2 className="text-base font-bold text-slate-900">Payment Method</h2>
              </div>

              {/* Method Selector Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Credit / Debit Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative ${
                    paymentMethod === 'card'
                      ? 'border-2 border-emerald-500 bg-emerald-50/40 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <p className="font-bold text-slate-900 text-xs sm:text-sm mt-2.5">Credit/Debit Card</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Visa, Mastercard, Amex</p>
                </button>

                {/* Digital Wallet */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative ${
                    paymentMethod === 'wallet'
                      ? 'border-2 border-emerald-500 bg-emerald-50/40 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <Wallet className={`w-5 h-5 ${paymentMethod === 'wallet' ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <p className="font-bold text-slate-900 text-xs sm:text-sm mt-2.5">Digital Wallet</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Apple Pay, Google Pay</p>
                </button>

                {/* Cryptocurrency */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('crypto')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative ${
                    paymentMethod === 'crypto'
                      ? 'border-2 border-emerald-500 bg-emerald-50/40 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className={`w-5 h-5 flex items-center justify-center font-bold text-[10px] rounded border ${
                    paymentMethod === 'crypto' ? 'border-emerald-600 text-emerald-700' : 'border-slate-400 text-slate-500'
                  }`}>
                    BTC
                  </div>
                  <p className="font-bold text-slate-900 text-xs sm:text-sm mt-2.5">Cryptocurrency</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">BitPay Secure</p>
                </button>
              </div>

              {/* Card Inputs */}
              {paymentMethod === 'card' && (
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <p className="text-xs text-slate-500 mb-4">
                    Enter your card information for secure processing.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        value={nameOnCard}
                        onChange={(e) => setNameOnCard(e.target.value)}
                        placeholder="Johnathan Doe"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Card Number
                      </label>
                      <div className="relative">
                        <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="0000 0000 0000 0000"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-semibold text-slate-700">
                            CVV
                          </label>
                          <Info className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="123"
                          maxLength={4}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
                      />
                      <span className="text-xs text-slate-600 font-medium select-none">
                        Save card for future rentals
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {paymentMethod === 'wallet' && (
                <div className="mt-6 pt-5 border-t border-slate-100 text-center py-6">
                  <Wallet className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-800">Apple Pay & Google Pay Express</p>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                    Click 'Confirm & Pay' to authenticate with your device's biometric wallet.
                  </p>
                </div>
              )}

              {paymentMethod === 'crypto' && (
                <div className="mt-6 pt-5 border-t border-slate-100 text-center py-6">
                  <Bitcoin className="w-10 h-10 text-amber-500 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-800">BitPay Instant Crypto Gateway</p>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                    Supports BTC, ETH, USDT, USDC with zero conversion markup.
                  </p>
                </div>
              )}
            </div>

            {/* Step 2: Billing Information */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                  2
                </div>
                <h2 className="text-base font-bold text-slate-900">Billing Information</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex.chen@techmail.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    ZIP / Postal Code
                  </label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="94103"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Promo Code Section */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
              <div className="flex items-center gap-2.5 mb-3">
                <Tag className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-slate-900 tracking-wide uppercase">Promo Code</h3>
              </div>

              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 border border-emerald-600 text-emerald-700 hover:bg-emerald-50 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {promoFeedback && (
                <p className={`text-[11px] font-medium mt-2 ${appliedPromo ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {promoFeedback}
                </p>
              )}

              {appliedPromo && !promoFeedback && (
                <div className="mt-2.5 flex items-center justify-between px-3 py-1.5 bg-emerald-50/70 border border-emerald-200/80 rounded-lg text-xs">
                  <span className="font-semibold text-emerald-800">
                    Active Code: <strong className="font-mono">{appliedPromo.code}</strong> (-${appliedPromo.discount.toFixed(2)})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setAppliedPromo(null);
                      setPromoFeedback('Promo removed.');
                    }}
                    className="text-emerald-700 hover:text-emerald-900 text-[11px] underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Booking Summary Card */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
              {/* Dark Navy Header */}
              <div className="bg-[#0b1329] px-6 py-4">
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Booking Summary
                </h3>
              </div>

              <div className="p-6">
                {/* Scooter Preview Item */}
                <div className="flex items-center gap-3.5 pb-5 border-b border-slate-100">
                  <img
                    src={ASSETS.commuter}
                    alt={scooter.name}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-100 shadow-xs shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      Swift Urban Pro
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Model A • Carbon Stealth
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                      <span className="text-[11px] font-semibold text-emerald-600">
                        Fully Charged
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ride Details List */}
                <div className="py-4 space-y-2.5 border-b border-slate-100 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-2 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Rental Duration
                    </span>
                    <span className="font-bold text-slate-900">{durationHours} Hours</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-2 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      Pickup Point
                    </span>
                    <span className="font-bold text-slate-900">Central Park North</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-2 text-slate-500">
                      <Shield className="w-3.5 h-3.5 text-slate-400" />
                      Ride Protection
                    </span>
                    <span className="font-bold text-slate-900">Premium Plan</span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="py-4 space-y-2 text-xs border-b border-slate-100">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Standard Rate ($15.00/hr)</span>
                    <span className="font-medium text-slate-900">${baseRate.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span>Insurance & Safety Fee</span>
                    <span className="font-medium text-slate-900">${insuranceFee.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span>Service Charge</span>
                    <span className="font-medium text-slate-900">${serviceCharge.toFixed(2)}</span>
                  </div>

                  {appliedPromo && (
                    <div className="flex items-center justify-between text-emerald-600 font-semibold">
                      <span>Promo Discount ({appliedPromo.code})</span>
                      <span>-${appliedPromo.discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="pt-4 pb-5 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Total Amount</span>
                  <span className="text-2xl font-black text-emerald-600">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>

                {/* Action Button */}
                <button
                  id="checkout-confirm-pay-btn"
                  type="button"
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/10 cursor-pointer transition-all disabled:opacity-75"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing Secure Payment...
                    </span>
                  ) : (
                    <>
                      <span>Confirm & Pay</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* SSL Secured Trust Box */}
            <div className="mt-4 text-center px-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wide">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>SSL Secured Payment</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Your data is encrypted and protected. By confirming, you agree to SwiftRide's{' '}
                <a
                  href="#terms"
                  onClick={(e) => { e.preventDefault(); onNavigate('about'); }}
                  className="underline hover:text-slate-600"
                >
                  Terms of Use
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
