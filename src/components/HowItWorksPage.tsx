import React, { useState } from 'react';
import { 
  MapPin, 
  QrCode, 
  Zap, 
  Navigation, 
  CircleParking, 
  FileText, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  Sparkles,
  Smartphone,
  ChevronRight,
  CheckCircle2,
  X
} from 'lucide-react';
import { HOW_IT_WORKS_STEPS, ASSETS } from '../data/scootersData';
import { HowItWorksStep } from '../types';

interface HowItWorksPageProps {
  onNavigateToRentals: () => void;
  onNavigateToLocations: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onNavigateToRentals,
  onNavigateToLocations
}) => {
  const [activeStepModal, setActiveStepModal] = useState<HowItWorksStep | null>(null);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [safetyGuideOpen, setSafetyGuideOpen] = useState(false);

  const getStepIcon = (iconType: HowItWorksStep['iconType']) => {
    switch (iconType) {
      case 'pin':
        return <MapPin className="w-4 h-4 text-emerald-600" />;
      case 'qr':
        return <QrCode className="w-4 h-4 text-emerald-600" />;
      case 'bolt':
        return <Zap className="w-4 h-4 text-emerald-600" />;
      case 'nav':
        return <Navigation className="w-4 h-4 text-emerald-600" />;
      case 'park':
        return <CircleParking className="w-4 h-4 text-emerald-600" />;
      case 'receipt':
        return <FileText className="w-4 h-4 text-emerald-600" />;
      default:
        return <Zap className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div id="how-it-works-page" className="w-full bg-[#f8fafc] text-slate-800 pb-20">
      {/* Hero Header Section */}
      <section className="pt-16 pb-14 text-center px-4 max-w-4xl mx-auto">
        {/* Category Pill */}
        

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-5">
          Simple. Fast.<br />
          <span className="text-emerald-500">Sustainable.</span>
        </h1>

        <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          Renting a SwiftRide is designed to be as intuitive as walking, but three times faster. Here is how we get you moving in seconds.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            id="how-it-works-download-cta"
            onClick={() => setDownloadModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Download the App</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            id="how-it-works-safety-guide-btn"
            onClick={() => setSafetyGuideOpen(true)}
            className="px-5 py-3.5 rounded-xl text-slate-700 hover:text-slate-900 font-medium hover:bg-slate-200/60 transition-colors"
          >
            View Safety Guide
          </button>
        </div>
      </section>

      {/* 6 Step Interactive Alternating Workflow */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16 md:space-y-24 py-8">
        {HOW_IT_WORKS_STEPS.map((step, index) => {
          // Even indexed items (0, 2, 4) have image on left, text on right
          // Odd indexed items (1, 3, 5) have text on left, image on right
          const isImageLeft = index % 2 === 0;

          return (
            <div
              key={step.number}
              id={`how-step-${step.number}`}
              className={`flex flex-col ${
                isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-8 md:gap-14`}
            >
              {/* Illustration Media Container */}
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-100/80 bg-slate-900/90 group">
                  <img
                    src={step.image}
                    alt={step.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Text Description Container */}
              <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                {/* Step Number + Icon Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm shadow-sm">
                    {step.number}
                  </span>
                  <div className="p-1.5 rounded-full bg-emerald-100/70 border border-emerald-200">
                    {getStepIcon(step.iconType)}
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
                  {step.title}
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5">
                  {step.description}
                </p>

                <button
                  id={`step-learn-more-${step.number}`}
                  onClick={() => setActiveStepModal(step)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-800 hover:text-emerald-600 transition-colors group"
                >
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* 4 Trust & Safety Badges */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 my-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
          {/* Badge 1 */}
          <div className="flex flex-col items-start p-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-1">Full Insurance</h4>
            <p className="text-xs sm:text-sm text-slate-500 leading-normal">
              Every ride is covered by premium liability protection.
            </p>
          </div>

          {/* Badge 2 */}
          <div className="flex flex-col items-start p-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-1">24/7 Availability</h4>
            <p className="text-xs sm:text-sm text-slate-500 leading-normal">
              Vehicles are available around the clock, every day.
            </p>
          </div>

          {/* Badge 3 */}
          <div className="flex flex-col items-start p-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <CreditCard className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-1">Transparent Pricing</h4>
            <p className="text-xs sm:text-sm text-slate-500 leading-normal">
              No hidden fees. Pay only for the minutes you ride.
            </p>
          </div>

          {/* Badge 4 */}
          <div className="flex flex-col items-start p-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-1">Eco-Friendly</h4>
            <p className="text-xs sm:text-sm text-slate-500 leading-normal">
              Zero emissions. 100% renewable energy charging.
            </p>
          </div>
        </div>
      </section>

      {/* Dark App Banner CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-12">
        <div className="relative bg-[#0b1326] rounded-3xl overflow-hidden shadow-xl text-white p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Subtle Ambient Background */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
          
          {/* Left Text */}
          <div className="max-w-md z-10 flex flex-col items-start text-left">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl mb-6">
              <Zap className="w-5 h-5" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              Ready to start your first journey?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Join over 500,000 commuters who choose SwiftRide for their daily travels. Sign up today and get your first 15 minutes free.
            </p>

            <button
              id="how-it-works-start-free-btn"
              onClick={onNavigateToRentals}
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-lg shadow-emerald-500/25 mb-8"
            >
              Get Started for Free
            </button>

            {/* Social Proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0b1326]"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="User"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0b1326]"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="User"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0b1326]"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="User"
                />
              </div>
              <span className="text-xs font-semibold text-slate-300">50k+ Happy Riders</span>
            </div>
          </div>

          {/* Right Smartphone Screen Mockup */}
          <div className="w-full md:w-1/2 flex justify-center z-10">
            <div className="relative w-64 sm:w-72 bg-slate-950 p-3 rounded-[2.5rem] shadow-2xl border-4 border-slate-700/60 ring-1 ring-slate-600">
              {/* Dynamic Island / Speaker */}
              <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-2" />
              
              {/* Screen Preview */}
              <div className="rounded-[1.8rem] overflow-hidden bg-slate-900 relative aspect-[9/16] flex flex-col justify-between">
                <img
                  src={ASSETS.heroScooter}
                  alt="SwiftRide App Preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />
                
                {/* On-screen app widgets */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white text-[11px] font-semibold">
                  <span className="bg-emerald-500/90 text-slate-950 px-2 py-0.5 rounded-full">Swift Urban Pro X</span>
                  <span className="text-emerald-400">98% ⚡</span>
                </div>

                <div className="absolute bottom-4 left-3 right-3 p-3 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-700 text-left">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Closest Hub</p>
                  <p className="text-xs font-bold text-white">Central Park North • 0.2 mi</p>
                  <div className="w-full h-2 bg-emerald-500 rounded-full mt-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step Detail Modal */}
      {activeStepModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative text-left">
            <button
              onClick={() => setActiveStepModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm">
                {activeStepModal.number}
              </span>
              <h3 className="text-xl font-bold text-slate-900">{activeStepModal.title}</h3>
            </div>
            <img
              src={activeStepModal.image}
              alt={activeStepModal.alt}
              className="w-full h-44 object-cover rounded-xl mb-4"
            />
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {activeStepModal.description}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setActiveStepModal(null);
                  onNavigateToRentals();
                }}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl"
              >
                Browse Fleet
              </button>
              <button
                onClick={() => {
                  setActiveStepModal(null);
                  onNavigateToLocations();
                }}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold rounded-xl"
              >
                Find Docks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download App Modal */}
      {downloadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 relative text-center">
            <button
              onClick={() => setDownloadModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Download SwiftRide App</h3>
            <p className="text-xs text-slate-500 mb-6">
              Scan this QR code with your mobile camera to get the iOS & Android app instantly.
            </p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 inline-block mb-6">
              <QrCode className="w-32 h-32 text-slate-800 mx-auto" />
            </div>
            <button
              onClick={() => {
                setDownloadModalOpen(false);
                onNavigateToRentals();
              }}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm"
            >
              Continue in Web App
            </button>
          </div>
        </div>
      )}

      {/* Safety Guide Modal */}
      {safetyGuideOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative text-left">
            <button
              onClick={() => setSafetyGuideOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <h3 className="text-xl font-bold text-slate-900">SwiftRide Safety Guide</h3>
            </div>
            <div className="space-y-3 text-sm text-slate-600 mb-6">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Always Wear a Helmet:</strong> Protect your head on every trip. Helmets are available at select hubs.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Use Bike Lanes:</strong> Ride on marked bicycle lanes or roadway shoulders. Avoid pedestrian-heavy sidewalks.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>One Rider at a Time:</strong> Tandem riding is strictly prohibited for your stability and safety.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Observe Traffic Signals:</strong> Stop at red lights and stop signs, yielding to pedestrians at crosswalks.</span>
              </div>
            </div>
            <button
              onClick={() => setSafetyGuideOpen(false)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm"
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
