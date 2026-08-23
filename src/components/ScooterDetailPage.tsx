import React, { useState } from 'react';
import { Scooter } from '../types';
import { FLAGSHIP_SCOOTER, RELATED_SCOOTERS } from '../data/scootersData';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Star, 
  MapPin, 
  Battery, 
  Lock, 
  Navigation, 
  ShieldCheck, 
  Gauge, 
  Zap, 
  Clock, 
  Feather, 
  CheckCircle2, 
  ChevronRight, 
  MessageSquare, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface ScooterDetailPageProps {
  scooter?: Scooter;
  onBackToFleet: () => void;
  onBookScooter: (scooter: Scooter) => void;
  onLocateOnMap: () => void;
  onSelectRelatedScooter?: (scooter: Scooter) => void;
}

export const ScooterDetailPage: React.FC<ScooterDetailPageProps> = ({
  scooter = FLAGSHIP_SCOOTER,
  onBackToFleet,
  onBookScooter,
  onLocateOnMap,
  onSelectRelatedScooter
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'safety'>('description');
  const [copiedShare, setCopiedShare] = useState(false);

  const images = scooter.galleryImages && scooter.galleryImages.length > 0
    ? scooter.galleryImages
    : [scooter.image, scooter.image, scooter.image];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
      
      {/* 1. TOP BREADCRUMB NAVIGATION */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <button
          onClick={onBackToFleet}
          className="flex items-center gap-1.5 hover:text-slate-900 transition-colors font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Fleet</span>
        </button>
        <span className="text-slate-300">|</span>
        <span className="text-slate-900 font-semibold">{scooter.name}</span>
      </div>

      {/* 2. MAIN VEHICLE SHOWCASE (LEFT: GALLERY, RIGHT: DETAILS & PRICING) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* LEFT COLUMN: Large Hero Image & Thumbnails */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Display Card */}
          <div className="relative aspect-[16/11] bg-slate-950 rounded-3xl overflow-hidden shadow-xl border border-slate-800 flex items-center justify-center group">
            {/* Top Badges & Quick Action Controls */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500 text-white font-bold text-xs tracking-wide shadow-md">
                {scooter.tag || 'New 2024 Model'}
              </span>
            </div>

            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
                  isFavorite
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/80 hover:bg-white text-slate-700'
                }`}
                title="Save to favorites"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 backdrop-blur-md transition-all shadow-md cursor-pointer"
                title="Share scooter link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Main Featured Photo */}
            <img
              src={images[activeImageIndex] || scooter.image}
              alt={scooter.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
            />
          </div>

          {/* 3-Thumbnail Preview Strip */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-slate-900 ${
                  activeImageIndex === idx
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN: Specs, Status, Booking Actions, Assurance */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Header Title & Badges */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-xs border border-emerald-200">
                {scooter.badge || 'Premium Fleet'}
              </span>
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{scooter.rating || 4.9}</span>
                <span className="text-slate-400 font-normal">({scooter.reviewCount || 128} reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {scooter.name}
            </h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
              {scooter.series || '2024 FLAGSHIP SERIES'}
            </p>
          </div>

          {/* Pricing & Reservation Box (Matches visily-scooter-details.jpg) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            
            {/* Rates */}
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-500 block">Rental Rate</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">
                    ${scooter.pricePerMin.toFixed(2)}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ min</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 block">Unlock Fare</span>
                <span className="text-sm font-bold text-slate-800">
                  ${(scooter.unlockFare || 1.0).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Closest Station Info */}
            <div className="bg-slate-50 border border-slate-150 rounded-xl p-3 flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-tight">
                  CLOSEST STATION
                </span>
                <span className="font-semibold text-slate-800">
                  {scooter.location}
                </span>
              </div>
            </div>

            {/* Estimated Battery */}
            <div className="bg-slate-50 border border-slate-150 rounded-xl p-3 flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Battery className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-tight">
                  ESTIMATED BATTERY
                </span>
                <span className="font-semibold text-slate-800">
                  {scooter.batteryPercentage || 92}% Charge • ~{scooter.rangeMiles || 42} mi range
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                id="reserve-now-detail-btn"
                onClick={() => onBookScooter(scooter)}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-white font-bold text-sm shadow-md shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Reserve Now</span>
              </button>

              <button
                id="locate-on-map-btn"
                onClick={onLocateOnMap}
                className="w-full py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-slate-500" />
                <span>Locate on Map</span>
              </button>
            </div>

            {/* Subtext */}
            <p className="text-[11px] text-center text-slate-400 leading-tight">
              By booking, you agree to our <span className="text-slate-600 underline">Rental Terms</span> and <span className="text-slate-600 underline">Safety Guidelines</span>.
            </p>

          </div>

          {/* SwiftRide Assurance Box (Matches visily-scooter-details.jpg) */}
          <div className="bg-emerald-50/50 border border-emerald-200/70 rounded-2xl p-4.5 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-bold text-slate-900 text-xs">
                SwiftRide Assurance
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every Urban Pro X undergoes a rigorous 42-point safety inspection before every rental. Included: free helmet at docking stations.
            </p>
            <button className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 pt-1 cursor-pointer">
              <span>View Maintenance History</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

        </div>

      </div>

      {/* 3. KEY METRICS STRIP (4 CARDS: TOP SPEED, MAX RANGE, WEIGHT, CHARGE TIME) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Top Speed */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 text-center space-y-1">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
            <Gauge className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            TOP SPEED
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-900">
            {scooter.topSpeedMph || 28} mph
          </span>
        </div>

        {/* Max Range */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 text-center space-y-1">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
            <Battery className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            MAX RANGE
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-900">
            {scooter.rangeMiles || 55} miles
          </span>
        </div>

        {/* Weight */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 text-center space-y-1">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
            <Feather className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            WEIGHT
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-900">
            {scooter.weightLbs || 38} lbs
          </span>
        </div>

        {/* Charge Time */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 text-center space-y-1">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
            <Zap className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            CHARGE TIME
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-900">
            {scooter.chargeTimeHours || 4} hours
          </span>
        </div>
      </div>

      {/* 4. DETAILS TABS SECTION */}
      <div className="space-y-6 pt-4">
        {/* Tab Headers */}
        <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-semibold text-slate-500">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-3 transition-colors border-b-2 cursor-pointer ${
              activeTab === 'description'
                ? 'border-emerald-500 text-slate-900 font-bold'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`pb-3 transition-colors border-b-2 cursor-pointer ${
              activeTab === 'features'
                ? 'border-emerald-500 text-slate-900 font-bold'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            Key Features
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className={`pb-3 transition-colors border-b-2 cursor-pointer ${
              activeTab === 'safety'
                ? 'border-emerald-500 text-slate-900 font-bold'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            Safety & Tech
          </button>
        </div>

        {/* Tab 1: Description */}
        {activeTab === 'description' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <h3 className="text-xl font-bold text-slate-900">
              Ride Into the Future
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
              {scooter.description || 'The Swift Urban Pro X represents the pinnacle of urban mobility. Engineered with a lightweight aerospace-grade aluminum frame and high-torque dual motors, it delivers a smooth, powerful ride that conquers hills and traffic with ease. Perfect for the modern commuter who values both performance and aesthetics.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h5 className="font-bold text-slate-900">Smooth Suspension</h5>
                  <p className="text-slate-500 mt-0.5">Dual spring suspension absorbs urban bumps effortlessly.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h5 className="font-bold text-slate-900">Portable Design</h5>
                  <p className="text-slate-500 mt-0.5">Folds in 3 seconds for easy storage in trunks or offices.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Key Features */}
        {activeTab === 'features' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <h3 className="text-xl font-bold text-slate-900">
              Engineered for City Living
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
              {(scooter.features || [
                'Aerospace Aluminum Alloy Chassis',
                'Dual 500W Brushless High-Torque Motors',
                'Full Regenerative E-ABS & Dual Hydraulic Disc Brakes',
                'Intelligent Dynamic LED Headlamp & Smart Taillights',
                'Integrated 4.5" Color Cockpit Telemetry Display',
                'Bluetooth 5.3 Smart BLE Locking & GPS Tracking'
              ]).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-150 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Safety & Tech */}
        {activeTab === 'safety' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <h3 className="text-xl font-bold text-slate-900">
              Safety & Smart Diagnostics
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Equipped with real-time IoT diagnostic telemetry. Instant tilt detection, auto-locking when parked, and geofenced auto-speed modulation for pedestrian zones.
            </p>
          </div>
        )}
      </div>

      {/* 5. EXPLORE MORE / YOU MIGHT ALSO LIKE (4 CARDS MATCHING DESIGN) */}
      <section className="space-y-6 pt-6 border-t border-slate-200">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">
              EXPLORE MORE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              You Might Also Like
            </h2>
          </div>

          <button
            onClick={onBackToFleet}
            className="text-xs font-semibold text-slate-700 hover:text-emerald-600 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View Full Fleet</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {RELATED_SCOOTERS.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectRelatedScooter ? onSelectRelatedScooter(item) : onBookScooter(item)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container with Range Tag */}
              <div className="relative aspect-[4/3] bg-slate-100 p-3 flex items-center justify-center overflow-hidden">
                <span className="absolute top-2.5 left-2.5 z-10 text-[10px] font-bold text-slate-700 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md border border-slate-200">
                  {item.rangeMiles} miles Range
                </span>
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-600 transition-colors">
                    {item.name}
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {item.model}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    ${item.pricePerMin.toFixed(2)}/min
                  </span>

                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. "NEED HELP CHOOSING YOUR RIDE?" DARK PROMO BANNER */}
      <section className="bg-[#0b1326] text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text & CTA Buttons */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Need help choosing your ride?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              Our mobility experts are available 24/7 to help you find the perfect scooter for your commute or weekend adventure.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => alert('Starting live support chat with SwiftRide Mobility Specialist...')}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/20 transition-colors cursor-pointer"
              >
                Live Chat
              </button>
              <button
                onClick={onBackToFleet}
                className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                View FAQ
              </button>
            </div>
          </div>

          {/* Right Support Metrics Box */}
          <div className="lg:col-span-4">
            <div className="bg-[#121d38] border border-slate-700/70 rounded-2xl p-4.5 space-y-3.5 shadow-lg">
              
              {/* Fast Support */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-tight">
                    Fast Support
                  </span>
                  <span className="text-xs font-extrabold text-white">
                    Average response: 2m
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-700/60"></div>

              {/* Safe Ride Guarantee */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-tight">
                    Safe Ride Guarantee
                  </span>
                  <span className="text-xs font-extrabold text-white">
                    Full insurance included
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
