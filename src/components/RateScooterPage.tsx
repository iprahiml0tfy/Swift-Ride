import React, { useState } from 'react';
import {
  Star,
  Shield,
  ThumbsUp,
  Zap,
  MapPin,
  Clock,
  Navigation,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  X,
  ArrowRight,
  Sparkles,
  Download
} from 'lucide-react';
import { ASSETS } from '../data/scootersData';
import { PageView } from '../types';

interface RateScooterPageProps {
  onNavigate: (page: PageView) => void;
}

export const RateScooterPage: React.FC<RateScooterPageProps> = ({ onNavigate }) => {
  // Ratings State
  const [overallRating, setOverallRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [safetyRating, setSafetyRating] = useState<number>(5);
  const [cleanlinessRating, setCleanlinessRating] = useState<number>(5);

  // Feedback Tags
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'Smooth Ride',
    'Great Battery'
  ]);

  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reportIssueModal, setReportIssueModal] = useState(false);
  const [wrongSpotModal, setWrongSpotModal] = useState(false);

  const availableTags = [
    'Smooth Ride',
    'Great Battery',
    'Easy Lock',
    'Clean Vehicle',
    'Precise GPS',
    'Responsive Brakes'
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onNavigate('my-bookings');
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20">
      {/* Top Scenic Sunset Hero Banner */}
      <div className="relative w-full h-72 sm:h-80 bg-slate-950 overflow-hidden">
        <img
          src={ASSETS.sunsetScooterCity}
          alt="Scooter parked at sunset"
          className="w-full h-full object-cover object-center opacity-75"
        />

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-slate-950/90" />

        {/* Hero Copy Overlay */}
        <div className="absolute inset-0 max-w-6xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-8 z-10">
          {/* Ride Completed Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/90 text-slate-950 text-[11px] font-black rounded-full uppercase tracking-wider w-fit shadow-md mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 fill-slate-950 text-emerald-300" />
            <span>Ride Completed</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            How was your journey?
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            You've successfully ended your ride on <strong className="text-white font-bold">SR-9214</strong>. We hope you enjoyed the speed and efficiency of SwiftRide.
          </p>
        </div>
      </div>

      {/* Main Form & Summary Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Rating Form (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Overall Experience */}
              <div>
                <h3 className="text-base font-bold text-slate-900">Overall Experience</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Rate your total satisfaction with this trip.
                </p>

                {/* Big 5 Star Buttons */}
                <div className="flex items-center gap-2 mt-3">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = (hoverRating !== null ? hoverRating : overallRating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setOverallRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 transition-transform hover:scale-110 cursor-pointer"
                      >
                        <Star
                          className={`w-7 h-7 sm:w-8 sm:h-8 ${
                            isFilled
                              ? 'text-emerald-500 fill-emerald-500'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sub-Ratings Grid: Safety & Stability + Vehicle Cleanliness */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                {/* Safety & Stability */}
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Safety & Stability</h4>
                  <div className="flex items-center gap-1.5 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setSafetyRating(star)}
                        className="cursor-pointer"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            safetyRating >= star
                              ? 'text-emerald-500 fill-emerald-500'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vehicle Cleanliness */}
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Vehicle Cleanliness</h4>
                  <div className="flex items-center gap-1.5 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setCleanlinessRating(star)}
                        className="cursor-pointer"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            cleanlinessRating >= star
                              ? 'text-emerald-500 fill-emerald-500'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Feedback Tags */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-800 mb-2.5">
                  Quick Feedback Tags
                </h4>

                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => {
                    const active = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          active
                            ? 'bg-emerald-500 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Feedback (Optional) */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
                  <span>Detailed Feedback (Optional)</span>
                </div>

                <textarea
                  rows={4}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Tell us more about your ride, any issues encountered, or things you loved..."
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              {/* Submit Feedback Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-full flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Feedback Submitted! Returning...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Feedback</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Ride Summary Receipt Card (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6">
              {/* Card Header with Scooter Thumbnail */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-black text-slate-900">Ride Summary</h3>
                </div>
                <span className="text-xs font-mono text-slate-400 font-bold">
                  ID: #98231-SR
                </span>
              </div>

              {/* Scooter Model Header */}
              <div className="flex items-center gap-3 py-3 border-b border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                  <img
                    src={ASSETS.commuter}
                    alt="Swift Urban Pro"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">Swift Urban Pro</h4>
                  <p className="text-[11px] text-slate-400">Model A • Blue Slate Edition</p>
                </div>
              </div>

              {/* Pickup / Drop-off Timeline */}
              <div className="py-4 space-y-3 text-xs border-b border-slate-100 relative before:absolute before:left-1.5 before:top-6 before:bottom-6 before:w-0.5 before:bg-slate-200">
                <div className="relative pl-5 flex items-start gap-2">
                  <span className="absolute left-0 top-1 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-emerald-50" />
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      PICKUP
                    </span>
                    <p className="font-bold text-slate-900">Ferry Building, San Francisco</p>
                    <p className="text-[11px] text-slate-400">08:45 AM</p>
                  </div>
                </div>

                <div className="relative pl-5 flex items-start gap-2">
                  <span className="absolute left-0 top-1 w-3 h-3 rounded-full bg-slate-800" />
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      DROP-OFF
                    </span>
                    <p className="font-bold text-slate-900">Union Square North</p>
                    <p className="text-[11px] text-slate-400">09:12 AM</p>
                  </div>
                </div>
              </div>

              {/* 4 Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5 py-4 border-b border-slate-100 text-left">
                {/* Duration */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>DURATION</span>
                  </span>
                  <p className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">27 min</p>
                </div>

                {/* Distance */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1">
                    <Navigation className="w-3 h-3 text-slate-400" />
                    <span>DISTANCE</span>
                  </span>
                  <p className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">4.2 miles</p>
                </div>

                {/* Avg Speed */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1">
                    <Zap className="w-3 h-3 text-slate-400" />
                    <span>AVG SPEED</span>
                  </span>
                  <p className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">12 mph</p>
                </div>

                {/* Safety */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1">
                    <Shield className="w-3 h-3 text-slate-400" />
                    <span>SAFETY</span>
                  </span>
                  <p className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">100%</p>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="py-4 space-y-2 text-xs border-b border-slate-100">
                <div className="flex justify-between text-slate-500">
                  <span>Base Fare</span>
                  <span className="font-bold text-slate-800">$1.50</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Time (27m x $0.25)</span>
                  <span className="font-bold text-slate-800">$6.75</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Insurance & Fees</span>
                  <span className="font-bold text-slate-800">$1.00</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Early Drop-off Discount</span>
                  <span className="font-bold">-$0.50</span>
                </div>

                {/* Total Paid */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">Total Paid</span>
                  <span className="text-xl font-black text-emerald-600">$8.75</span>
                </div>

                <p className="text-[10px] text-slate-400 text-center pt-1">
                  Charged to Mastercard ending in ••42
                </p>
              </div>

              {/* Need help with this ride? */}
              <div className="pt-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center mb-2.5">
                  Need help with this ride?
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setReportIssueModal(true)}
                    className="py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                    <span>Report Issue</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWrongSpotModal(true)}
                    className="py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Wrong Spot</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Safety Statement */}
        <div className="mt-12 text-center max-w-2xl mx-auto space-y-3 pb-8">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Shield className="w-5 h-5" />
          </div>

          <h3 className="text-base font-bold text-slate-900">
            Committed to Urban Safety
          </h3>

          <p className="text-xs text-slate-500 leading-relaxed">
            By submitting this review, you contribute to the safety and reliability of the SwiftRide network. Our maintenance team inspects vehicles with lower ratings within 2 hours to ensure quality for the next rider.
          </p>

          <div className="flex items-center justify-center gap-6 pt-2 text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>98% Satisfied Riders</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-emerald-700">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>5M+ Miles Travelled</span>
            </span>
          </div>
        </div>
      </div>

      {/* REPORT ISSUE MODAL */}
      {reportIssueModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900">Report Ride Issue</h3>
              <button onClick={() => setReportIssueModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Select any issue experienced during ride #98231-SR:
            </p>
            <div className="space-y-2 text-xs">
              {['Brake response was sluggish', 'Battery depleted faster than expected', 'Lock mechanism took time to engage', 'App connectivity delay'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setReportIssueModal(false);
                    alert('Thank you! Our maintenance team has been flagged.');
                  }}
                  className="w-full p-2.5 text-left bg-slate-50 hover:bg-slate-100 rounded-xl font-medium text-slate-700 border border-slate-200 cursor-pointer"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* WRONG SPOT MODAL */}
      {wrongSpotModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Report Wrong Bay Location</h3>
            <p className="text-xs text-slate-500 mt-1">
              Did the app record the incorrect drop-off bay for Union Square North?
            </p>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <button
                onClick={() => setWrongSpotModal(false)}
                className="py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  setWrongSpotModal(false);
                  alert('GPS location correction recorded.');
                }}
                className="py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Send GPS Pin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
