import React, { useState } from 'react';
import {
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  Shield,
  HardHat,
  Info,
  Check,
  Lock,
  CreditCard,
  Headphones,
  ArrowRight,
  Star,
  Zap,
  Gauge,
  BatteryCharging
} from 'lucide-react';
import { ASSETS, FLAGSHIP_SCOOTER, ALL_SCOOTERS } from '../data/scootersData';
import { Scooter, PageView, BookingReservation } from '../types';

interface BookingReservationPageProps {
  scooter?: Scooter;
  onProceedToConfirmation: (booking: BookingReservation) => void;
  onProceedToCheckout?: (draft: Partial<BookingReservation>) => void;
  onNavigate: (page: PageView) => void;
  onSelectScooter?: (scooter: Scooter) => void;
}

export const BookingReservationPage: React.FC<BookingReservationPageProps> = ({
  scooter = FLAGSHIP_SCOOTER,
  onProceedToConfirmation,
  onProceedToCheckout,
  onNavigate,
  onSelectScooter
}) => {
  // Booking Form State
  const [pickupDate, setPickupDate] = useState('2026-08-22');
  const [pickupTime, setPickupTime] = useState('10:00');
  const [durationHours, setDurationHours] = useState(2);
  const [withProtection, setWithProtection] = useState(true);
  const [withHelmet, setWithHelmet] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Cost calculation
  const baseRentalCost = 25.00 * (durationHours / 2);
  const protectionCost = withProtection ? 4.99 : 0;
  const helmetCost = withHelmet ? 2.00 : 0;
  const serviceFee = 1.50;
  const totalAmount = baseRentalCost + protectionCost + helmetCost + serviceFee;

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const draftBooking: Partial<BookingReservation> = {
        id: 'SR-882941-X',
        scooterName: scooter.name || 'Swift Urban Pro',
        scooterModel: scooter.model || 'Model A',
        scooterImage: scooter.image || ASSETS.commuter,
        date: 'October 24, 2026',
        timeWindow: `${pickupTime} AM • ${durationHours} Hours`,
        location: 'Central Park North, Dock #14',
        dockNumber: '#14',
        totalCost: totalAmount,
        status: 'Reserved',
        durationHours: durationHours,
        withProtection,
        withHelmet
      };

      if (onProceedToCheckout) {
        onProceedToCheckout(draftBooking);
      } else {
        onProceedToConfirmation(draftBooking as BookingReservation);
      }
    }, 400);
  };

  // Alternative recommendations
  const alternativeScooters = [
    {
      id: 'swift-glide-lite',
      name: 'Swift Glide Lite',
      model: 'Model B',
      price: '$0.99/min',
      range: '30 MILES',
      speed: '15 MPH',
      image: ASSETS.foldingScooter
    },
    {
      id: 'swift-mountain-max',
      name: 'Swift Mountain Max',
      model: 'Model C',
      price: '$2.50/min',
      range: '60 MILES',
      speed: '25 MPH',
      image: ASSETS.performanceScooter
    },
    {
      id: 'swift-urban-pro-white',
      name: 'Swift Urban Pro',
      model: 'White Edition',
      price: '$1.50/min',
      range: '45 MILES',
      speed: '20 MPH',
      image: ASSETS.commuter
    }
  ];

  return (
    <div id="booking-reservation-page" className="w-full bg-[#f8fafc] text-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <div className="text-left mb-4">
          <button
            id="booking-back-btn"
            onClick={() => onNavigate('rentals')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Scooters</span>
          </button>
        </div>

        {/* Page Heading */}
        <div className="text-left mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Complete Your Reservation
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Confirm your rental details and pickup location. You're just one step away from your SwiftRide.
          </p>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form & Steps */}
          <div className="lg:col-span-8 space-y-6 text-left">
            {/* Selected Scooter Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-center">
              <div className="w-full sm:w-44 h-40 bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                <img
                  src={ASSETS.commuter}
                  alt={scooter.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 w-full">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                    Premium Choice
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>4.9 <span className="text-slate-400 font-normal">(128)</span></span>
                  </div>
                </div>

                <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
                  Swift Urban Pro
                </h2>
                <p className="text-xs text-slate-500 mb-4">
                  Model A • High Performance
                </p>

                {/* 3 Metrics Badge Row */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
                  <div>
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
                      <Zap className="w-3.5 h-3.5 text-emerald-600" />
                      <span>45 miles</span>
                    </div>
                    <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mt-0.5">
                      MAX RANGE
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
                      <Gauge className="w-3.5 h-3.5 text-emerald-600" />
                      <span>20 mph</span>
                    </div>
                    <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mt-0.5">
                      TOP SPEED
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
                      <BatteryCharging className="w-3.5 h-3.5 text-emerald-600" />
                      <span>100% Electric</span>
                    </div>
                    <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mt-0.5">
                      ENGINE
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 1: Schedule Your Ride */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                  1
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Schedule Your Ride
                </h3>
              </div>
              <p className="text-xs text-slate-500 ml-9 mb-5">
                When and for how long do you need the scooter?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                {/* Pickup Date */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Pickup Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Pickup Time */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Pickup Time
                  </label>
                  <div className="relative">
                    <select
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer appearance-none"
                    >
                      <option value="08:00">08:00 AM</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">01:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                      <option value="18:00">06:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Duration (Hours) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Duration (Hours)
                  </label>
                  <div className="relative">
                    <select
                      value={durationHours}
                      onChange={(e) => setDurationHours(Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer appearance-none"
                    >
                      <option value={1}>1 Hour</option>
                      <option value={2}>2 Hours</option>
                      <option value={3}>3 Hours</option>
                      <option value={4}>4 Hours</option>
                      <option value={8}>Full Day (8 Hours)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Flexible Returns Banner */}
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex items-start gap-2.5 text-xs text-slate-700">
                <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="font-bold text-slate-900">Flexible Returns:</strong> You can return the scooter to any designated SwiftRide hub within the city. Overdue rentals are billed at $0.50/min.
                </span>
              </div>
            </div>

            {/* Step 2 & Step 3 Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Step 2: Pickup Location */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                      2
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      Pickup Location
                    </h3>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200/90 rounded-xl flex items-start gap-2.5 mb-4">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        Central Park North Hub
                      </p>
                      <p className="text-[11px] text-slate-500">
                        West 110th St, New York, NY 10026
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Graphic Preview */}
                <div className="w-full h-36 rounded-xl overflow-hidden border border-slate-200 relative bg-slate-100">
                  <img
                    src={ASSETS.centralParkMap}
                    alt="Pickup Location Map"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg ring-4 ring-emerald-400/30">
                      <MapPin className="w-4 h-4 fill-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Protection & Gear */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    3
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Protection & Gear
                  </h3>
                </div>

                {/* Option 1: Premium Protection */}
                <div
                  onClick={() => setWithProtection(!withProtection)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                    withProtection
                      ? 'bg-emerald-50/40 border-emerald-500 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        withProtection ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {withProtection && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-bold text-slate-900">Premium Protection</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">$4.99</span>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-6 leading-relaxed">
                    Full coverage for theft, accidental damage, and liability. Highly recommended.
                  </p>
                </div>

                {/* Option 2: Safety Helmet */}
                <div
                  onClick={() => setWithHelmet(!withHelmet)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                    withHelmet
                      ? 'bg-emerald-50/40 border-emerald-500 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        withHelmet ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {withHelmet && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-bold text-slate-900">Safety Helmet</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">$2</span>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-6 leading-relaxed">
                    Adjustable sanitised professional grade helmet. Required by local laws in some areas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Price Summary & Support */}
          <div className="lg:col-span-4 space-y-6 text-left sticky top-24">
            {/* Price Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg overflow-hidden">
              {/* Green top accent line */}
              <div className="h-1.5 w-full bg-emerald-500" />

              <div className="p-6">
                <h3 className="text-lg font-extrabold text-slate-900 mb-0.5">
                  Price Summary
                </h3>
                <p className="text-xs text-slate-500 mb-5">
                  Review your rental costs before proceeding.
                </p>

                <div className="space-y-3 text-xs text-slate-600 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      Swift Urban Pro Rental
                      <Info className="w-3 h-3 text-slate-400" />
                    </span>
                    <span className="font-semibold text-slate-800">${baseRentalCost.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Duration</span>
                    <span className="font-semibold text-slate-800">{durationHours} Hours</span>
                  </div>

                  {withProtection && (
                    <div className="flex items-center justify-between">
                      <span>Premium Protection</span>
                      <span className="font-semibold text-slate-800">${protectionCost.toFixed(2)}</span>
                    </div>
                  )}

                  {withHelmet && (
                    <div className="flex items-center justify-between">
                      <span>Helmet Rental</span>
                      <span className="font-semibold text-slate-800">${helmetCost.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span>Service Fee</span>
                    <span className="font-semibold text-slate-800">${serviceFee.toFixed(2)}</span>
                  </div>
                </div>

                {/* Total Row */}
                <div className="pt-4 border-t border-slate-100 mb-6 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Total Amount</span>
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                      TAXES INCLUDED IN TOTAL
                    </span>
                  </div>
                  <span className="text-2xl font-black text-emerald-600">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  id="booking-proceed-checkout-btn"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-75"
                >
                  {isProcessing ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Security badges */}
                <div className="flex items-center justify-center gap-6 mt-4 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                  <div className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                    <span>SECURE PAYMENT</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ALL CARDS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help Card */}
            <div className="bg-[#0b1329] rounded-2xl p-6 text-white text-left shadow-lg border border-slate-800">
              <h4 className="text-sm font-bold text-white mb-1.5">
                Need help with your booking?
              </h4>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Our team is available 24/7 to assist with your reservation or any technical issues.
              </p>
              <button
                id="booking-contact-support-btn"
                onClick={() => onNavigate('contact')}
                className="w-full py-2.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* You Might Also Like Section */}
        <section className="mt-16 text-left">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
              You might also like
            </h3>
            <button
              onClick={() => onNavigate('rentals')}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>View All Scooters</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {alternativeScooters.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="w-full h-36 bg-slate-50 rounded-xl overflow-hidden mb-4 flex items-center justify-center p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                    <span className="text-xs font-extrabold text-emerald-600">{item.price}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">{item.model}</p>

                  <div className="flex items-center gap-4 text-slate-600 text-[11px] font-bold mb-4 bg-slate-50 p-2 rounded-lg">
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-emerald-600" />
                      <span>{item.range}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Gauge className="w-3 h-3 text-emerald-600" />
                      <span>{item.speed}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const found = ALL_SCOOTERS.find(s => s.id === item.id) || FLAGSHIP_SCOOTER;
                    if (onSelectScooter) onSelectScooter(found);
                  }}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer text-center"
                >
                  Switch to this
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
