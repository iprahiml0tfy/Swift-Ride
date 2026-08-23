import React, { useState } from 'react';
import {
  CheckCircle2,
  Key,
  Download,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  Smartphone,
  Zap,
  Shield,
  ChevronRight,
  Navigation,
  Share2,
  Info,
  ArrowRight,
  Check,
  X,
  Copy
} from 'lucide-react';
import { ASSETS } from '../data/scootersData';
import { PageView, BookingReservation, Scooter } from '../types';

interface BookingConfirmationPageProps {
  booking?: BookingReservation;
  onNavigate: (page: PageView) => void;
  onSelectScooter?: (scooter: any) => void;
}

export const BookingConfirmationPage: React.FC<BookingConfirmationPageProps> = ({
  booking,
  onNavigate,
  onSelectScooter
}) => {
  // Fallback reservation if loaded directly
  const reservation: BookingReservation = booking || {
    id: 'SR-882941-X',
    scooterName: 'Swift Urban Pro',
    scooterModel: 'Model A',
    scooterImage: ASSETS.commuter,
    date: 'October 24, 2026',
    timeWindow: '10:00 AM • 2 Hours',
    location: 'Central Park North, Dock #14',
    dockNumber: '#14',
    totalCost: 12.50,
    status: 'Reserved',
    durationHours: 2,
    withProtection: true,
    withHelmet: true,
    paymentMethod: 'Visa',
    cardLast4: '4242'
  };

  // State for modals
  const [digitalKeyModalOpen, setDigitalKeyModalOpen] = useState(false);
  const [receiptDownloaded, setReceiptDownloaded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [referralModalOpen, setReferralModalOpen] = useState(false);
  const [directionsModalOpen, setDirectionsModalOpen] = useState(false);

  // 4 Fleet Models matching visily-booking-confirmation.jpg bottom carousel
  const otherModels = [
    {
      id: 'urban-explorer',
      name: 'Urban Explorer',
      model: 'Model B',
      rate: '$1.25/min',
      image: ASSETS.foldingScooter
    },
    {
      id: 'mountain-king',
      name: 'Mountain King',
      model: 'Model C',
      rate: '$1.75/min',
      image: ASSETS.performanceScooter
    },
    {
      id: 'swift-urban-pro',
      name: 'Swift Urban Pro',
      model: 'Model A',
      rate: '$1.50/min',
      image: ASSETS.commuter
    },
    {
      id: 'city-glider',
      name: 'City Glider',
      model: 'Lite',
      rate: '$0.90/min',
      image: ASSETS.foldingScooter
    }
  ];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDownloadReceipt = () => {
    setReceiptDownloaded(true);
    setTimeout(() => setReceiptDownloaded(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20">
      {/* Dark Navy Hero Header Section */}
      <section className="bg-[#0b1329] text-white py-12 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle background mesh glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Header Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Booking Confirmed</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Your SwiftRide <br />
                <span className="text-emerald-400">is Ready to Roll.</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                High-five! Your reservation is confirmed. We've sent the digital key and receipt to your email. You're all set for a premium urban commute.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="view-digital-key-btn"
                  onClick={() => setDigitalKeyModalOpen(true)}
                  className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-full font-bold text-xs flex items-center gap-2 transition-transform active:scale-95 cursor-pointer shadow-lg shadow-emerald-900/30"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>View Digital Key</span>
                </button>

                <button
                  id="download-receipt-btn"
                  onClick={handleDownloadReceipt}
                  className="px-5 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 rounded-full font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-slate-300" />
                  <span>{receiptDownloaded ? 'Receipt Downloaded!' : 'Download Receipt'}</span>
                </button>
              </div>
            </div>

            {/* Right Hero Graphic: Neon Checkmark + Scooter Rider Art */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-teal-500/10 pointer-events-none" />
                
                {/* Visual Art container */}
                <div className="relative w-full h-48 sm:h-56 flex items-center justify-center">
                  <img
                    src={ASSETS.bookingSuccessScooter}
                    alt="Booking Success"
                    className="w-full h-full object-contain filter drop-shadow-xl"
                  />
                  
                  {/* Decorative glowing badge */}
                  <div className="absolute bottom-2 right-2 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Unlocked & Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Reservation Details Card & 3 Steps */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7">
              {/* Header row */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Reservation Details
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    BOOKING ID:
                  </span>
                  <span className="font-mono text-xs font-extrabold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/70">
                    {reservation.id}
                  </span>
                </div>
              </div>

              {/* Scooter & Specs Card */}
              <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-5 mt-5">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Left: Scooter Thumbnail & Model */}
                  <div className="md:col-span-4 flex flex-col items-center text-center">
                    <img
                      src={ASSETS.commuter}
                      alt={reservation.scooterName}
                      className="w-32 h-32 rounded-xl object-cover border border-slate-200/80 shadow-xs"
                    />
                    <h3 className="font-bold text-slate-900 text-sm mt-2">
                      {reservation.scooterName}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {reservation.scooterModel}
                    </p>
                  </div>

                  {/* Right: Reservation Spec Rows */}
                  <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    {/* Date */}
                    <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          DATE
                        </p>
                        <p className="font-bold text-slate-900 mt-0.5">
                          {reservation.date}
                        </p>
                      </div>
                    </div>

                    {/* Pickup Time & Duration */}
                    <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          PICKUP TIME & DURATION
                        </p>
                        <p className="font-bold text-slate-900 mt-0.5">
                          {reservation.timeWindow}
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          LOCATION
                        </p>
                        <p className="font-bold text-slate-900 mt-0.5">
                          {reservation.location}
                        </p>
                      </div>
                    </div>

                    {/* Payment */}
                    <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          PAYMENT
                        </p>
                        <p className="font-bold text-slate-900 mt-0.5">
                          ${reservation.totalCost.toFixed(2)} via {reservation.paymentMethod || 'Visa'} ending in {reservation.cardLast4 || '4242'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Step Instructions Guide */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-100">
                {/* Step 1 */}
                <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100/90 text-center">
                  <div className="w-8 h-8 rounded-full bg-white text-slate-700 shadow-xs border border-slate-200 flex items-center justify-center mx-auto mb-2.5">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">1. Find Scooter</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Open the app at the location and tap 'Find'.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100/90 text-center">
                  <div className="w-8 h-8 rounded-full bg-white text-slate-700 shadow-xs border border-slate-200 flex items-center justify-center mx-auto mb-2.5">
                    <Zap className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">2. Unlock</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Scan the QR code on the handlebar to unlock.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100/90 text-center">
                  <div className="w-8 h-8 rounded-full bg-white text-slate-700 shadow-xs border border-slate-200 flex items-center justify-center mx-auto mb-2.5">
                    <Shield className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">3. Ride Safely</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Wear a helmet and follow urban traffic rules.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Actions & Help */}
          <div className="lg:col-span-4 space-y-4">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5">
              <h3 className="text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-3">
                Quick Actions
              </h3>

              <div className="space-y-2">
                <button
                  onClick={() => onNavigate('booking-details')}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-50/80 hover:bg-emerald-100 text-xs font-bold text-emerald-900 border border-emerald-200/60 transition-colors cursor-pointer text-left"
                >
                  <span className="flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>View Trip Details & QR</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-emerald-600" />
                </button>

                <button
                  onClick={() => onNavigate('my-bookings')}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 transition-colors cursor-pointer text-left"
                >
                  <span>Manage My Bookings</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => setDirectionsModalOpen(true)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 transition-colors cursor-pointer text-left"
                >
                  <span>Get Directions</span>
                  <MapPin className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 transition-colors cursor-pointer text-left"
                >
                  <span>{copiedLink ? 'Link Copied!' : 'Share with Friend'}</span>
                  <Share2 className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Need Help? Box (Emerald light box) */}
            <div className="bg-emerald-50/90 border border-emerald-200/90 rounded-2xl p-5 text-left">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                  i
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">Need Help?</h4>
                  <p className="text-[11px] text-emerald-800 font-medium">Available 24/7 for you.</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-3.5">
                Having trouble locating your scooter or need to cancel? Contact our support team immediately.
              </p>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-2.5 bg-[#0b1b17] hover:bg-[#071310] text-white rounded-xl font-bold text-xs transition-colors cursor-pointer shadow-sm"
              >
                Contact Support
              </button>
            </div>

            {/* Pro Tip Banner */}
            <div className="bg-[#0b1329] border border-slate-800 rounded-2xl p-5 text-white relative overflow-hidden">
              <span className="inline-block px-2 py-0.5 bg-emerald-500 text-slate-950 font-bold text-[10px] rounded-full uppercase tracking-wider mb-2">
                Pro Tip
              </span>

              <h4 className="text-sm font-bold text-white leading-tight">
                Save 20% on your next ride!
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Invite a friend to SwiftRide and you both get $5 credits instantly.
              </p>

              <button
                onClick={() => setReferralModalOpen(true)}
                className="mt-3 text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Get Referral Code</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Explore Other Models Section (visily-booking-confirmation.jpg bottom) */}
        <section className="mt-14 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Explore Other Models
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Keep the momentum going with our premium fleet.
              </p>
            </div>

            <button
              onClick={() => onNavigate('rentals')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {otherModels.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (onSelectScooter) onSelectScooter(item);
                  onNavigate('scooter-detail');
                }}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-4 cursor-pointer group"
              >
                <div className="h-36 rounded-xl bg-slate-50 overflow-hidden flex items-center justify-center p-2 mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-slate-400">{item.model}</p>
                  </div>
                  <span className="text-xs font-black text-emerald-600">
                    {item.rate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Digital Key Modal */}
      {digitalKeyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              <Key className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-black text-slate-900">SwiftRide Digital Key</h3>
            <p className="text-xs text-slate-500 mt-1">
              Hold your smartphone near handlebar Dock #14 to unlock automatically.
            </p>

            {/* Mock QR / Key code */}
            <div className="my-5 p-4 bg-slate-900 rounded-2xl text-white">
              <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-1">
                NFC PASSCODE
              </p>
              <p className="text-2xl font-mono font-bold tracking-widest text-emerald-300">
                SWIFT-9824
              </p>
              <div className="w-24 h-24 bg-white rounded-xl mx-auto mt-3 p-2 flex items-center justify-center">
                <div className="w-full h-full border-2 border-dashed border-slate-900 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-slate-900" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setDigitalKeyModalOpen(false);
                  onNavigate('unlock-scooter');
                }}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-md"
              >
                Open Handlebar QR Scanner
              </button>
              <button
                onClick={() => setDigitalKeyModalOpen(false)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Close Pass
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Directions Modal */}
      {directionsModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-emerald-600" />
                <span>Station Navigation</span>
              </h3>
              <button
                onClick={() => setDirectionsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <img
              src={ASSETS.centralParkMap}
              alt="Central Park Map"
              className="w-full h-44 object-cover rounded-xl border border-slate-200 mb-3"
            />

            <div className="text-xs space-y-1.5 text-slate-600 mb-4">
              <p><strong>Dock Location:</strong> Central Park North Hub, Dock #14</p>
              <p><strong>Address:</strong> 110th St & Malcolm X Blvd, New York, NY</p>
              <p><strong>Distance:</strong> 0.2 miles away (~4 min walk)</p>
            </div>

            <button
              onClick={() => setDirectionsModalOpen(false)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Open in Maps App
            </button>
          </div>
        </div>
      )}

      {/* Referral Modal */}
      {referralModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900">Your Referral Code</h3>
            <p className="text-xs text-slate-500 mt-1">
              Give $5, get $5 on every successful friend referral.
            </p>

            <div className="my-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
              <span className="font-mono font-black text-emerald-800 text-base">
                SWIFT-ALEX20
              </span>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText('SWIFT-ALEX20');
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <button
              onClick={() => setReferralModalOpen(false)}
              className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
