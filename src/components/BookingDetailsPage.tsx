import React, { useState } from 'react';
import {
  ChevronLeft,
  HelpCircle,
  XCircle,
  Battery,
  Zap,
  Copy,
  Check,
  Calendar,
  Clock,
  CreditCard,
  Shield,
  ExternalLink,
  MapPin,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { ASSETS } from '../data/scootersData';
import { PageView, BookingReservation } from '../types';

interface BookingDetailsPageProps {
  booking?: BookingReservation;
  onNavigate: (page: PageView) => void;
  onStartRide?: (scooterName: string) => void;
}

export const BookingDetailsPage: React.FC<BookingDetailsPageProps> = ({
  booking,
  onNavigate,
  onStartRide
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [safetyModalOpen, setSafetyModalOpen] = useState(false);

  // Default booking metadata matching visily-booking-details.jpg
  const details = {
    bookingId: booking?.id || 'SR-98241',
    status: isCancelled ? 'Cancelled' : (booking?.status || 'Upcoming'),
    scooterName: booking?.scooterName || 'Swift Urban Pro',
    scooterModel: 'Model S-2024',
    batteryPercent: 92,
    maxRange: '42 miles',
    vehicleId: 'SR-V882',
    date: booking?.date || 'Oct 24, 2024',
    pickupTime: '10:30 AM',
    duration: '2 Hours',
    paymentMethod: 'Visa ending in 4242',
    insurance: 'Premium Covered',
    totalPrice: booking?.totalCost ? `$${booking.totalCost.toFixed(2)}` : '$18.50',
    pickupAddress: '14th St & Broadway, NY 10003',
    unlockCode: ['8', '2', '9', '4']
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(details.unlockCode.join(''));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleConfirmCancel = () => {
    setIsCancelled(true);
    setCancelModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20">
      {/* Top Header Row */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <button
          id="back-to-my-bookings-btn"
          onClick={() => onNavigate('my-bookings')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer py-1"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to My Bookings</span>
        </button>

        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Booking #{details.bookingId}
              </h1>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                  isCancelled
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}
              >
                {details.status}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Confirm your rental details and prepare for your ride.
            </p>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-2.5">
            <button
              id="booking-details-support-btn"
              onClick={() => onNavigate('contact')}
              className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>Support</span>
            </button>

            {!isCancelled && (
              <button
                id="booking-details-cancel-btn"
                onClick={() => setCancelModalOpen(true)}
                className="px-3.5 py-2 bg-rose-50/70 hover:bg-rose-100/80 text-rose-600 border border-rose-200/80 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Cancel Ride</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main 3-Column Content Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Scooter Card & Scan to Unlock (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Scooter Info Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden p-5">
              {/* Scooter Rider Image */}
              <div className="w-full h-52 bg-slate-100 rounded-xl overflow-hidden mb-4 border border-slate-100">
                <img
                  src={ASSETS.commuter}
                  alt={details.scooterName}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Title & Battery Status */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base leading-tight">
                    {details.scooterName}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {details.scooterModel}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/80 text-emerald-700 px-2 py-0.5 rounded-md text-[11px] font-bold">
                  <Battery className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{details.batteryPercent}% CHARGED</span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    MAX RANGE
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
                    {details.maxRange}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    VEHICLE ID
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5 font-mono">
                    {details.vehicleId}
                  </p>
                </div>
              </div>

              {/* Ready to Ride Banner */}
              <div className="mt-4 p-3.5 bg-emerald-50/60 border border-emerald-200/70 rounded-xl text-left">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                  <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                  <span>Ready to Ride</span>
                </div>
                <p className="text-[11px] text-emerald-950/80 mt-1 leading-relaxed">
                  This vehicle was recently inspected and is in peak performance condition.
                </p>
              </div>
            </div>

            {/* Scan to Unlock Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 text-center">
              {/* QR Code Container */}
              <div className="w-36 h-36 bg-slate-50 border border-slate-200/80 rounded-2xl mx-auto flex items-center justify-center p-3 shadow-2xs">
                <div className="w-full h-full border-2 border-dashed border-slate-400 rounded-xl flex flex-col items-center justify-center relative group">
                  {/* Stylized QR Glyphs */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="w-6 h-6 border-2 border-slate-900 rounded-md flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-slate-900 rounded-xs" />
                    </div>
                    <div className="w-6 h-6 bg-slate-900 rounded-md" />
                    <div className="w-6 h-6 border-2 border-slate-900 rounded-md flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-slate-900 rounded-xs" />
                    </div>
                    <div className="w-6 h-6 bg-slate-900 rounded-md" />
                    <div className="w-6 h-6 border border-slate-900 rounded-xs flex items-center justify-center">
                      <Zap className="w-3 h-3 text-slate-900" />
                    </div>
                    <div className="w-6 h-6 bg-slate-900 rounded-md" />
                    <div className="w-6 h-6 border-2 border-slate-900 rounded-md flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-slate-900 rounded-xs" />
                    </div>
                    <div className="w-6 h-6 bg-slate-900 rounded-md" />
                    <div className="w-6 h-6 border-2 border-slate-900 rounded-md flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-slate-900 rounded-xs" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <h4 className="text-xs font-black text-emerald-600 uppercase tracking-wider">
                  SCAN TO UNLOCK
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Point your phone camera at the vehicle's QR code
                </p>
              </div>

              {/* Manual Unlock Code */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  MANUAL UNLOCK CODE
                </p>

                <div className="flex items-center justify-center gap-2">
                  {details.unlockCode.map((digit, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-mono font-bold text-sm text-slate-800 shadow-2xs"
                    >
                      {digit}
                    </div>
                  ))}

                  <button
                    onClick={handleCopyCode}
                    title="Copy code"
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Unlock Action Button */}
              <button
                id="unlock-via-bluetooth-btn"
                onClick={() => onNavigate('unlock-scooter')}
                className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-900/10 cursor-pointer"
              >
                <Smartphone className="w-4 h-4" />
                <span>Unlock via Bluetooth</span>
              </button>
            </div>
          </div>

          {/* Middle Column: Rental Summary & Pickup Location (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Rental Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
              <h3 className="text-base font-bold text-slate-900 mb-5">
                Rental Summary
              </h3>

              <div className="space-y-3.5 text-xs">
                {/* Date */}
                <div className="flex items-center justify-between py-1 border-b border-slate-50">
                  <span className="flex items-center gap-2 text-slate-500">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Date</span>
                  </span>
                  <span className="font-bold text-slate-900">{details.date}</span>
                </div>

                {/* Pickup Time */}
                <div className="flex items-center justify-between py-1 border-b border-slate-50">
                  <span className="flex items-center gap-2 text-slate-500">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>Pickup Time</span>
                  </span>
                  <span className="font-bold text-slate-900">{details.pickupTime}</span>
                </div>

                {/* Duration */}
                <div className="flex items-center justify-between py-1 border-b border-slate-50">
                  <span className="flex items-center gap-2 text-slate-500">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>Duration</span>
                  </span>
                  <span className="font-bold text-slate-900">{details.duration}</span>
                </div>

                {/* Payment Method */}
                <div className="flex items-center justify-between py-1 border-b border-slate-50">
                  <span className="flex items-center gap-2 text-slate-500">
                    <CreditCard className="w-4 h-4 text-slate-400" />
                    <span>Payment Method</span>
                  </span>
                  <span className="font-bold text-slate-900">{details.paymentMethod}</span>
                </div>

                {/* Insurance */}
                <div className="flex items-center justify-between py-1">
                  <span className="flex items-center gap-2 text-slate-500">
                    <Shield className="w-4 h-4 text-slate-400" />
                    <span>Insurance</span>
                  </span>
                  <span className="font-bold text-slate-900">{details.insurance}</span>
                </div>
              </div>

              {/* Total Price Row */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Total Price</span>
                <span className="text-2xl font-black text-emerald-600">
                  {details.totalPrice}
                </span>
              </div>
            </div>

            {/* Pickup Location Card with 3D Isometric Map */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-slate-900">
                  Pickup Location
                </h3>

                <button
                  onClick={() => onNavigate('locations')}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Maps</span>
                </button>
              </div>

              <p className="text-xs text-slate-600 flex items-center gap-1.5 mb-4">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{details.pickupAddress}</span>
              </p>

              {/* 3D Isometric Map Graphic */}
              <div className="relative w-full h-56 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group">
                <img
                  src={ASSETS.isometricCityMap}
                  alt="Pickup Location Map"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Center Pin Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white shadow-lg flex items-center justify-center text-white font-black text-xs animate-bounce">
                    1
                  </div>
                  <div className="w-3 h-1.5 bg-black/30 rounded-full blur-2xs mt-0.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Guide & Safety First (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Quick Guide Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">
                  i
                </div>
                <h3 className="text-xs font-extrabold text-slate-900 tracking-wide uppercase">
                  Quick Guide
                </h3>
              </div>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Arrive at location</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      Be there at least 5 mins before your scheduled time.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Unlock vehicle</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      Scan the QR code on the handlebar or use the code provided.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Safety check</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      Test the brakes and check the tires before accelerating.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setSafetyModalOpen(true)}
                  className="text-[11px] font-semibold text-slate-400 hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  Full Safety Guide &gt;
                </button>
              </div>
            </div>

            {/* Safety First Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-4">
                SAFETY FIRST
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900">Helmet Mandatory</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      Always wear a helmet. Local laws apply.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900">Parking Zones</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      Park only in designated SwiftRide bays.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {cancelModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900">Cancel Booking?</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Are you sure you want to cancel reservation #{details.bookingId}? Free cancellation is available up to 15 minutes before the start time.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={() => setCancelModalOpen(false)}
                className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancel}
                className="py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Safety Guide Modal */}
      {safetyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>SwiftRide Safety Guidelines</span>
            </h3>

            <div className="mt-4 space-y-3 text-xs text-slate-600 max-h-72 overflow-y-auto pr-1">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="font-bold text-slate-900">1. Pre-Ride Brake Check</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Squeeze both left and right handbrake levers before accelerating to confirm hydraulic response.</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="font-bold text-slate-900">2. Designated Bike Lanes</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Always ride in marked bicycle lanes or street right-hand lanes. Never ride on pedestrian sidewalks.</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="font-bold text-slate-900">3. Speed Limits</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Maximum permitted speed in city center zones is 15 mph. In park paths, keep speed under 10 mph.</p>
              </div>
            </div>

            <button
              onClick={() => setSafetyModalOpen(false)}
              className="w-full mt-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
