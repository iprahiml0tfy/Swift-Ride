import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Download,
  Info,
  ChevronRight,
  Phone,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Edit3,
  Unlock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ASSETS } from '../data/scootersData';
import { PageView, BookingReservation } from '../types';

interface MyBookingsPageProps {
  onNavigate: (page: PageView) => void;
  onStartRide?: (scooterName: string) => void;
  initialReservations?: BookingReservation[];
}

export const MyBookingsPage: React.FC<MyBookingsPageProps> = ({
  onNavigate,
  onStartRide,
  initialReservations
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'active' | 'history'>('upcoming');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showModifyModal, setShowModifyModal] = useState(false);

  // Default booking if none passed
  const [bookings, setBookings] = useState<BookingReservation[]>(
    initialReservations && initialReservations.length > 0
      ? initialReservations
      : [
          {
            id: 'SR-8842',
            scooterName: 'Swift Glide',
            scooterModel: 'Model B',
            scooterImage: ASSETS.foldingScooter,
            date: 'Tomorrow, Oct 25',
            timeWindow: '10:00 AM - 12:00 PM',
            location: 'Central Park North Dock',
            totalCost: 12.00,
            status: 'Reserved',
            durationHours: 2,
            withProtection: true,
            withHelmet: true
          }
        ]
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUnlockEarly = (booking: BookingReservation) => {
    if (onStartRide) {
      onStartRide(booking.scooterName);
    }
    showToast(`Unlocking ${booking.scooterName}... Your ride has started!`);
  };

  const handleDownloadLog = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Booking ID,Scooter,Date,Time,Location,Cost,Status\n"
      + bookings.map(b => `${b.id},${b.scooterName},${b.date},${b.timeWindow},${b.location},$${b.totalCost.toFixed(2)},${b.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "SwiftRide_Bookings_Log.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Booking history log downloaded successfully!");
  };

  const faqs = [
    {
      q: 'How do I cancel a booking?',
      a: 'You can cancel any upcoming reservation up to 15 minutes before your scheduled start time without any penalty. Go to your booking card and click "Modify Trip" to cancel.'
    },
    {
      q: 'What if I have an issue with the scooter battery?',
      a: 'All our scooters are guaranteed to have at least 80% battery when reserved. If battery falls unexpectedly, swap at any SwiftRide hub for free or contact 24/7 live support.'
    },
    {
      q: 'Can I extend my booking duration?',
      a: 'Yes, as long as the scooter is not reserved by another commuter right after your slot. You can extend directly in the app from the active ride screen.'
    },
    {
      q: 'Where can I find the rental receipt?',
      a: 'Itemized receipts are automatically sent to your registered email address and saved under Account > Billing & Payments.'
    }
  ];

  return (
    <div id="my-bookings-page" className="w-full bg-[#f8fafc] text-slate-800 pb-16">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Modify Trip Modal */}
      {showModifyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-left shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Modify Reservation</h3>
            <p className="text-xs text-slate-500 mb-4">
              Update your pickup time or cancel this reservation with full refund.
            </p>
            <div className="space-y-3 mb-6">
              <button
                onClick={() => {
                  showToast("Reservation time extended by 1 hour!");
                  setShowModifyModal(false);
                }}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer text-left flex items-center justify-between"
              >
                <span>Reschedule for Later Time</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => {
                  setBookings(prev => prev.filter(b => b.id !== 'SR-8842'));
                  showToast("Reservation cancelled. $12.00 refunded to your balance.");
                  setShowModifyModal(false);
                }}
                className="w-full py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer text-left flex items-center justify-between"
              >
                <span>Cancel Reservation (No Fee)</span>
                <AlertCircle className="w-4 h-4 text-rose-500" />
              </button>
            </div>

            <button
              onClick={() => setShowModifyModal(false)}
              className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Hero Header Banner */}
      <section className="w-full bg-[#0b1329] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left Title & Subtitle */}
          <div className="text-left max-w-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Calendar className="w-5 h-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                My Bookings
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Manage your urban journeys. Track active rides, prepare for upcoming trips, or review your rental history with SwiftRide.
            </p>
          </div>

          {/* Right Metrics Stat Boxes */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Stat 1: Total Trips */}
            <div className="flex-1 md:flex-none min-w-[120px] bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-left shadow-md">
              <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
                TOTAL TRIPS
              </p>
              <p className="text-2xl font-black text-white">
                24
              </p>
            </div>

            {/* Stat 2: CO2 Saved */}
            <div className="flex-1 md:flex-none min-w-[120px] bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-left shadow-md">
              <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
                CO2 SAVED
              </p>
              <p className="text-2xl font-black text-emerald-400">
                12kg
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Navigation & Tab Controls Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200/80">
          {/* Tabs */}
          <div className="flex items-center bg-slate-100/90 p-1.5 rounded-full border border-slate-200/90">
            <button
              id="bookings-tab-upcoming"
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'upcoming'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Upcoming</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === 'upcoming' ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {bookings.length}
              </span>
            </button>

            <button
              id="bookings-tab-active"
              onClick={() => setActiveTab('active')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'active'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Active</span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            </button>

            <button
              id="bookings-tab-history"
              onClick={() => setActiveTab('history')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              History
            </button>
          </div>

          {/* Right Download & Community Avatars */}
          <div className="flex items-center gap-4 self-end sm:self-auto">
            <button
              id="download-booking-log-btn"
              onClick={handleDownloadLog}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Download Log</span>
            </button>

            {/* Commuter Group Avatars */}
            <div className="flex items-center -space-x-2 pl-2 border-l border-slate-200">
              <img
                src={ASSETS.alexAvatar}
                alt="Alex"
                className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs"
                referrerPolicy="no-referrer"
              />
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white border-2 border-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                +12
              </div>
            </div>
          </div>
        </div>

        {/* Tab 1: UPCOMING */}
        {activeTab === 'upcoming' && (
          <div className="space-y-6">
            {bookings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800 mb-1">No Upcoming Bookings</h3>
                <p className="text-xs text-slate-500 mb-5">
                  Reserve a high-performance scooter in advance for your next commute.
                </p>
                <button
                  onClick={() => onNavigate('rentals')}
                  className="px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  Explore Scooters
                </button>
              </div>
            ) : (
              bookings.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 text-left"
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 justify-between">
                    {/* Left: Scooter Image & Basic Info */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                      <div className="w-28 h-28 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-2">
                        <img
                          src={item.scooterImage || ASSETS.foldingScooter}
                          alt={item.scooterName}
                          className="max-h-full max-w-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-slate-900">
                            {item.scooterName}
                          </h3>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                            <Calendar className="w-3 h-3" />
                            <span>{item.status}</span>
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mb-4">
                          {item.scooterModel} • ID: {item.id}
                        </p>

                        {/* Details Row */}
                        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600">
                          {/* Date */}
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                              DATE
                            </p>
                            <p className="font-semibold text-slate-800">
                              {item.date}
                            </p>
                          </div>

                          {/* Time Window */}
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                              TIME WINDOW
                            </p>
                            <p className="font-semibold text-slate-800">
                              {item.timeWindow}
                            </p>
                          </div>

                          {/* Location */}
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                              LOCATION
                            </p>
                            <p className="font-semibold text-slate-800">
                              {item.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Price & Action Buttons */}
                    <div className="flex flex-col items-start lg:items-end justify-between self-stretch pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                      <div className="mb-4 lg:text-right">
                        <span className="text-2xl font-black text-emerald-600 block">
                          ${item.totalCost.toFixed(2)}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          TOTAL COST
                        </span>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={() => onNavigate('booking-details')}
                          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                        >
                          Trip Details
                        </button>

                        <button
                          type="button"
                          onClick={() => onNavigate('unlock-scooter')}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <span>Unlock Early</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Guaranteed Ride Protection Callout Banner */}
            <div className="bg-emerald-50/50 border border-dashed border-emerald-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Guaranteed Ride Protection
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Your reservation guarantees your scooter will be available at the chosen location. Cancel up to 15 minutes before the start time with no fees.
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('how-it-works')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 whitespace-nowrap cursor-pointer shrink-0"
              >
                <span>Safety Policy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: ACTIVE */}
        {activeTab === 'active' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Unlock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">No Active Ride in Progress</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              When you unlock a scooter at any SwiftRide hub, your real-time telemetry, speed, route map, and duration will appear here.
            </p>
            <button
              onClick={() => onNavigate('rentals')}
              className="px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-colors"
            >
              Find Scooter Near Me
            </button>
          </div>
        )}

        {/* Tab 3: HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-4 text-left">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Swift Urban Pro • Financial District Loop</h4>
                  <p className="text-xs text-slate-500">Oct 20, 2026 • 28 mins • 4.2 miles</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-bold text-slate-900">$8.40</span>
                <span className="block text-[11px] text-emerald-600 font-semibold">Completed</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Swift Glide • Embarcadero Waterfront</h4>
                  <p className="text-xs text-slate-500">Oct 18, 2026 • 15 mins • 2.1 miles</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-bold text-slate-900">$4.50</span>
                <span className="block text-[11px] text-emerald-600 font-semibold">Completed</span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Section: Frequently Asked Questions & Assistance Card */}
        <div className="mt-16 text-left">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left FAQ Accordion (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full p-4 flex items-center justify-between gap-4 text-left hover:bg-slate-50/50 cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-800">
                      {faq.q}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                      <Info className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  {openFaqIndex === idx && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Assistance Emerald Card (5 cols) */}
            <div className="lg:col-span-5 relative bg-emerald-500 rounded-3xl p-7 text-white overflow-hidden shadow-xl shadow-emerald-500/20">
              {/* Background watermark badge */}
              <div className="absolute -bottom-6 -right-6 w-40 h-40 text-emerald-400/30 pointer-events-none">
                <ShieldCheck className="w-full h-full stroke-1" />
              </div>

              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-black text-white mb-2">
                  Need Immediate Assistance?
                </h3>
                <p className="text-xs text-emerald-50 mb-6 leading-relaxed">
                  Our SwiftRide agents are standing by to help you with any active ride issues or billing inquiries.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Call Support */}
                  <button
                    onClick={() => {
                      showToast("Connecting to live phone dispatcher: 1-800-SWIFT-RIDE");
                    }}
                    className="px-5 py-2.5 rounded-full bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-extrabold shadow-sm transition-all cursor-pointer"
                  >
                    Call Support
                  </button>

                  {/* Chat with Agent */}
                  <button
                    onClick={() => onNavigate('contact')}
                    className="px-5 py-2.5 rounded-full bg-emerald-600/80 hover:bg-emerald-600 text-white border border-emerald-400/60 text-xs font-extrabold transition-all cursor-pointer"
                  >
                    Chat with Agent
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
