import React, { useState } from 'react';
import { 
  Compass, 
  ArrowRight, 
  Target, 
  Eye, 
  Leaf, 
  Zap, 
  Globe, 
  RotateCcw, 
  Users, 
  ShieldCheck, 
  Award, 
  Sparkles,
  ChevronRight,
  Briefcase,
  Mail,
  X
} from 'lucide-react';
import { ASSETS, ABOUT_CORE_VALUES, ABOUT_GREEN_INITIATIVES, ABOUT_STATS } from '../data/scootersData';

interface AboutUsPageProps {
  onNavigateToRentals: () => void;
  onNavigateToContact: () => void;
  onNavigateHome: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onNavigateToRentals,
  onNavigateToContact,
  onNavigateHome
}) => {
  const [activeModal, setActiveModal] = useState<'positions' | 'press' | 'impact' | 'roadmap' | null>(null);

  const getValueIcon = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Users className="w-5 h-5 text-emerald-600" />;
      case 'zap':
        return <Zap className="w-5 h-5 text-emerald-600" />;
      case 'shield':
        return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'award':
        return <Award className="w-5 h-5 text-emerald-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-emerald-600" />;
    }
  };

  const getGreenIcon = (iconName: string) => {
    switch (iconName) {
      case 'leaf':
        return <Leaf className="w-4 h-4 text-emerald-500" />;
      case 'zap':
        return <Zap className="w-4 h-4 text-emerald-500" />;
      case 'globe':
        return <Globe className="w-4 h-4 text-emerald-500" />;
      case 'recycle':
        return <RotateCcw className="w-4 h-4 text-emerald-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div id="about-us-page" className="w-full bg-[#f8fafc] text-slate-800 pb-16">
      {/* Top Header Section */}
      <section className="pt-12 pb-12 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-5">
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>OUR JOURNEY</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-5">
              Redefining<br />
              Urban <span className="text-emerald-500">Mobility</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mb-8">
              SwiftRide was born from a simple vision: to make cities more accessible, sustainable, and connected through high-performance electric transport. We aren't just a rental platform; we're a movement towards a cleaner tomorrow.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                id="about-explore-fleet-btn"
                onClick={onNavigateToRentals}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
              >
                Explore Our Fleet
              </button>
              <a
                href="#environmental-impact"
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-colors"
              >
                Our Sustainability Goal
              </a>
            </div>
          </div>

          {/* Right Column: Team Office Image */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 relative group aspect-[4/3] sm:aspect-[16/11]">
              <img
                src={ASSETS.aboutOfficeTeam}
                alt="SwiftRide headquarters team collaborating"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Dual Cards: The Mission & The Vision */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Card 1: The Mission (Dark Card) */}
          <div className="bg-[#0b1326] text-white p-7 sm:p-8 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-6">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                The Mission
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                To deliver premium, eco-friendly transit solutions that eliminate the stress of urban congestion while reducing the carbon footprint of every individual ride.
              </p>
            </div>
            <button
              id="mission-impact-btn"
              onClick={() => setActiveModal('impact')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors self-start"
            >
              <span>Learn about our impact</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: The Vision (Light Card) */}
          <div className="bg-white text-slate-800 p-7 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center mb-6">
                <Eye className="w-5 h-5 text-slate-700" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                The Vision
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                We envision a world where personal car ownership is unnecessary in city centers, replaced by a seamless, intelligent grid of shared electric vehicles.
              </p>
            </div>
            <button
              id="vision-roadmap-btn"
              onClick={() => setActiveModal('roadmap')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-900 hover:text-emerald-600 transition-colors self-start"
            >
              <span>Our future roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Environmental Impact Section */}
      <section id="environmental-impact" className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Illustration */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm bg-white aspect-[4/3] flex items-center justify-center p-2">
              <img
                src={ASSETS.ecoCityGreen}
                alt="Committed to a greener horizon eco city"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-4">
              <span>ENVIRONMENTAL IMPACT</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
              Committed to a Greener Horizon
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl mb-8">
              At SwiftRide, sustainability isn't a buzzword—it's the core engine of our engineering. Every scooter in our fleet is designed for longevity and recyclability.
            </p>

            {/* 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 w-full">
              {ABOUT_GREEN_INITIATIVES.map((item) => (
                <div key={item.id} className="flex flex-col text-left">
                  <div className="flex items-center gap-2 mb-1.5">
                    {getGreenIcon(item.icon)}
                    <h3 className="font-bold text-emerald-600 text-xs sm:text-sm">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section: Built on Principles */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-3">
          <span>CORE VALUES</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          Built on Principles
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto mb-10 leading-relaxed">
          Our culture is defined by a relentless pursuit of excellence and a deep-seated respect for the communities we serve.
        </p>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ABOUT_CORE_VALUES.map((val) => (
            <div
              key={val.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-left flex flex-col justify-between hover:border-emerald-200 hover:shadow-md transition-all"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
                  {getValueIcon(val.icon)}
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-2">
                  {val.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Row */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {ABOUT_STATS.map((stat, idx) => (
              <div key={idx} className={`flex flex-col items-center justify-center text-center ${idx > 0 ? 'pt-4 md:pt-0' : ''}`}>
                <p className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Revolution Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 my-10">
        <div className="relative bg-[#0b1326] rounded-3xl overflow-hidden shadow-xl text-white p-8 sm:p-12 text-center">
          {/* Ambient Glow */}
          <div className="absolute left-1/2 -top-24 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Join the Revolution
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            We're always looking for brilliant minds to help us build the future of urban transport. If you're passionate about tech, design, and the environment, we want to hear from you.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <button
              id="about-positions-btn"
              onClick={() => setActiveModal('positions')}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              View Open Positions
            </button>
            <button
              id="about-press-btn"
              onClick={() => setActiveModal('press')}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs sm:text-sm border border-slate-700 transition-colors"
            >
              Contact the Press
            </button>
          </div>

          {/* 3 Sub Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-800/80 text-left">
            <div>
              <h3 className="text-sm font-bold text-white mb-1.5">Innovation Hub</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our R&D center in San Francisco is where the next generation of micro-mobility hardware is born.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1.5">Global Presence</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Operations in North America, Europe, and Asia-Pacific allow us to scale impact globally.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1.5">Sustainability Labs</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We invest heavily in materials science to create the longest-lasting vehicle platforms in the industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-Footer Breadcrumbs & Quick Links Strip */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-1.5">
            <button onClick={onNavigateHome} className="hover:text-slate-900 transition-colors">Home</button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-900">About Us</span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <button onClick={() => setActiveModal('press')} className="hover:text-emerald-600 transition-colors">Press Kit</button>
            <button onClick={() => setActiveModal('positions')} className="hover:text-emerald-600 transition-colors">Investor Relations</button>
            <button onClick={() => setActiveModal('positions')} className="hover:text-emerald-600 transition-colors">Brand Assets</button>
            <button onClick={onNavigateToContact} className="hover:text-emerald-600 transition-colors font-medium">Partner With Us</button>
          </div>
        </div>
      </section>

      {/* Interactive Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative text-left">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'positions' && (
              <>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Join the SwiftRide Team</h3>
                <p className="text-xs text-slate-500 mb-5">
                  We are hiring across engineering, hardware design, fleet operations, and city partnerships.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Senior IoT Firmware Engineer</p>
                      <p className="text-[11px] text-slate-500">San Francisco, CA • Full-time</p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600">Apply</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-slate-900">City Operations Manager</p>
                      <p className="text-[11px] text-slate-500">Austin, TX • Hybrid</p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600">Apply</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Battery Systems Specialist</p>
                      <p className="text-[11px] text-slate-500">Seattle, WA • Full-time</p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600">Apply</span>
                  </div>
                </div>
              </>
            )}

            {activeModal === 'press' && (
              <>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Press & Media Inquiries</h3>
                <p className="text-xs text-slate-500 mb-4">
                  For press releases, high-resolution media kits, and interview requests with our founding team:
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
                  <p className="text-xs font-mono font-bold text-slate-800">press@swiftride.com</p>
                  <p className="text-[11px] text-slate-500 mt-1">Average press response time: under 4 hours</p>
                </div>
              </>
            )}

            {(activeModal === 'impact' || activeModal === 'roadmap') && (
              <>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {activeModal === 'impact' ? 'Our Environmental Impact' : '2025-2027 Mobility Roadmap'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {activeModal === 'impact' 
                    ? 'SwiftRide has offset over 12,000 tons of CO2 across 45+ cities by replacing fossil-fuel micro trips with 100% solar and wind-backed electric dock rides.' 
                    : 'Our upcoming phase introduces high-speed wireless induction charging docks, AI-assisted obstacle safety guidance, and autonomous fleet redistribution vehicles.'}
                </p>
              </>
            )}

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
