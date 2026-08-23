import React from 'react';
import { PageView, Scooter } from '../types';
import { POPULAR_MODELS, ASSETS } from '../data/scootersData';
import { ScooterCard } from './ScooterCard';
import { 
  Zap, 
  ArrowRight, 
  ChevronRight, 
  Globe, 
  Users, 
  TrendingUp, 
  Leaf, 
  ShieldCheck, 
  Smartphone, 
  Clock, 
  MapPin, 
  Building2, 
  Sparkles,
  CheckCircle,
  Star
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageView) => void;
  onBookScooter: (scooter: Scooter) => void;
  onViewScooterDetail?: (scooter: Scooter) => void;
  onOpenHowItWorks: () => void;
  onOpenLocations: () => void;
  onOpenOffers: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onBookScooter,
  onViewScooterDetail,
  onOpenHowItWorks,
  onOpenLocations,
  onOpenOffers,
}) => {
  return (
    <div className="w-full">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Hero Left Column */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Swift Ride .<br />
              <span className="text-emerald-500">Sustainable</span><br />
                Future.
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg">
              Unlock the city with SwiftRide's premium electric scooter fleet. Fast, affordable, and 100% carbon neutral. Your commute just got an upgrade.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                id="hero-find-scooter-btn"
                onClick={() => onNavigate('rentals')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-97 text-white font-semibold text-sm shadow-md shadow-emerald-500/25 transition-all cursor-pointer"
              >
                <span>Find a Scooter</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-how-it-works-btn"
                onClick={onOpenHowItWorks}
                className="inline-flex items-center px-6 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm transition-all cursor-pointer"
              >
                How It Works
              </button>
            </div>

            {/* Social Proof Avatars & Stars */}
            <div className="flex items-center gap-3 pt-3">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Rider"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Rider"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                  alt="Rider"
                />
              </div>

              <div>
                <div className="flex items-center gap-0.5 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <p className="text-[11px] font-medium text-slate-500">
                  Trusted by 50,000+ riders
                </p>
              </div>
            </div>

          </div>

          {/* Hero Right Column: Image with Overlapping Floating Badge (No Border) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[2rem] overflow-visible bg-gradient-to-b from-slate-100 to-slate-200 shadow-xl aspect-[4/3] sm:aspect-[16/11]">
              <img
                src={ASSETS.heroScooter}
                alt="SwiftRide Electric Scooter"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center rounded-[2rem]"
              />

              {/* Floating Top Speed Badge */}
              <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl border border-slate-100/90 flex items-center gap-3 z-20">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <div className="flex flex-col">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    TOP SPEED
                  </p>
                  <p className="text-base font-extrabold text-slate-900 leading-tight">
                    25 mph
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. STATS 4-CARDS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 text-center flex flex-col items-center justify-center shadow-xs">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Globe className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">24</div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">CITIES ACTIVE</div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 text-center flex flex-col items-center justify-center shadow-xs">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">500k+</div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">TOTAL RIDES</div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 text-center flex flex-col items-center justify-center shadow-xs">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">98%</div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">USER SATISFACTION</div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 text-center flex flex-col items-center justify-center shadow-xs">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Leaf className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">120t</div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">CO2 SAVED</div>
          </div>
        </div>
      </section>

      {/* 3. MOST POPULAR MODELS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Most Popular Models
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-xl">
              Choose the perfect ride for your journey. From ultra-portable folding models to high-performance long-range commuters.
            </p>
          </div>

          <button
            id="home-view-all-scooters-link"
            onClick={() => onNavigate('rentals')}
            className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold text-xs sm:text-sm transition-colors cursor-pointer group"
          >
            <span>View All Scooters</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_MODELS.map((scooter) => (
            <ScooterCard
              key={scooter.id}
              scooter={scooter}
              onBook={onBookScooter}
              onViewDetails={onViewScooterDetail}
            />
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE SWIFTRIDE? */}
      <section className="bg-[#0b132b] text-white py-16 sm:py-20 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
              Why Choose SwiftRide?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              We've obsessed over every detail to provide a premium rental experience that's safer, faster, and more intuitive than any other platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-sm border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Premium Safety</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Integrated GPS, triple-braking systems, and automated safety checks before every single ride.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-sm border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">App Integration</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Seamlessly unlock, navigate, and pay with our award-winning mobile application. No credit cards needed.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-sm border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">24/7 Availability</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Thousands of scooters distributed across the city, ready whenever you are. Day or night.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-sm border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Smart Zones</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Intelligent parking zones ensure the sidewalks stay clear while keeping scooters exactly where you need them.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-sm border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Fast Charging</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our fleet is managed by a network of rapid-chargers, ensuring 95%+ of scooters are always ready for long hauls.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-sm border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Corporate Plans</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Empower your team with sustainable commuting options and custom billing for businesses of all sizes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. A GREENER WAY TO MOVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-[4/3] bg-emerald-50">
              <img
                src={ASSETS.ecoCity}
                alt="Sustainable Eco City"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Our Mission
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              A Greener Way to Move
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              SwiftRide isn't just about getting from A to B. It's about changing how our cities breathe. By choosing electric micro-mobility, you're directly contributing to reducing urban congestion and lowering carbon emissions.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Leaf className="w-2.5 h-2.5 fill-current" />
                </div>
                <span>100% renewable energy used for charging</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Leaf className="w-2.5 h-2.5 fill-current" />
                </div>
                <span>Fully recyclable aluminum scooter frames</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Leaf className="w-2.5 h-2.5 fill-current" />
                </div>
                <span>Carbon-offsetting for all operations</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Leaf className="w-2.5 h-2.5 fill-current" />
                </div>
                <span>Community outreach for urban planning</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="home-impact-btn"
                onClick={onOpenHowItWorks}
                className="inline-flex items-center px-5 py-2.5 rounded-full border border-slate-300 hover:border-emerald-500 text-slate-700 hover:text-emerald-600 text-xs font-semibold bg-white transition-all cursor-pointer"
              >
                Learn More About Our Impact
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-8 sm:p-14 text-center shadow-xl shadow-emerald-500/10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight max-w-2xl mx-auto mb-3">
            Ready to experience the future of urban commuting?
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm max-w-lg mx-auto mb-8 leading-relaxed">
            Join thousands of riders already moving smarter. Download the SwiftRide app and unlock your first ride today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <button
              id="cta-get-started-btn"
              onClick={() => onNavigate('rentals')}
              className="px-6 py-3 rounded-full bg-[#0b132b] hover:bg-black text-white text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer"
            >
              Get Started Now
            </button>
            <button
              id="cta-view-locations-btn"
              onClick={onOpenLocations}
              className="px-6 py-3 rounded-full border border-white/60 hover:bg-white/10 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              View Locations
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};