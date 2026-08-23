import React, { useState, useMemo } from 'react';
import { Scooter } from '../types';
import { ALL_SCOOTERS } from '../data/scootersData';
import { ScooterCard } from './ScooterCard';
import { 
  Zap, 
  MapPin, 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  X, 
  Check, 
  ShieldCheck, 
  Sparkles,
  Info
} from 'lucide-react';

interface ScootersPageProps {
  onBookScooter: (scooter: Scooter) => void;
  onViewScooterDetail?: (scooter: Scooter) => void;
  onOpenHowItWorks: () => void;
  onOpenOffers: () => void;
  initialSearchQuery?: string;
}

export const ScootersPage: React.FC<ScootersPageProps> = ({
  onBookScooter,
  onViewScooterDetail,
  onOpenHowItWorks,
  onOpenOffers,
  initialSearchQuery = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedModel, setSelectedModel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'range-high' | 'speed-high'>('popular');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [onlyAvailableFilter, setOnlyAvailableFilter] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(1);

  // Filter and sort logic
  const filteredScooters = useMemo(() => {
    return ALL_SCOOTERS.filter((scooter) => {
      // Search matching
      const matchesSearch = 
        scooter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scooter.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scooter.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scooter.features?.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

      // Model filter
      const matchesModel = selectedModel === 'all' || scooter.model.toLowerCase() === selectedModel.toLowerCase();

      // Availability filter
      const matchesAvailability = !onlyAvailableFilter || scooter.status === 'available';

      return matchesSearch && matchesModel && matchesAvailability;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePerMin - b.pricePerMin;
      if (sortBy === 'range-high') return b.rangeMiles - a.rangeMiles;
      if (sortBy === 'speed-high') return b.topSpeedMph - a.topSpeedMph;
      return 0; // Default popular
    });
  }, [searchQuery, selectedModel, sortBy, onlyAvailableFilter]);

  const availableCount = ALL_SCOOTERS.filter(s => s.status === 'available').length;

  const handleClearFilters = () => {
    setSelectedModel('all');
    setSearchQuery('');
    setOnlyAvailableFilter(false);
    setSortBy('popular');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>          

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Available Scooters
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-xl">
            Explore our fleet of high-performance electric vehicles. Filter by range, speed, or availability to find your perfect ride.
          </p>
        </div>

        {/* Right Status Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white shadow-xs text-xs font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>{availableCount} Available</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white shadow-xs text-xs font-semibold text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>12 Docking Zones</span>
          </div>
        </div>
      </div>

      {/* 2. FILTER & SEARCH CONTROLS BAR */}
      <div className="space-y-3 mb-8">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="scooter-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, model or feature..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 shadow-xs transition-all placeholder-slate-400 text-slate-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-9 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:border-emerald-500 shadow-xs cursor-pointer"
              >
                <option value="popular">Sort by: Most Popular</option>
                <option value="price-low">Sort by: Lowest Price</option>
                <option value="range-high">Sort by: Longest Range</option>
                <option value="speed-high">Sort by: Highest Speed</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Filter Toggle Button */}
            <button
              id="filter-toggle-btn"
              onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all shadow-xs cursor-pointer ${
                filterDrawerOpen
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            </button>
          </div>
        </div>

        {/* Expandable Filter Drawer */}
        {filterDrawerOpen && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-2">Model Category</label>
                <div className="flex flex-wrap gap-1.5">
                  {['all', 'Model A', 'Model B', 'Model C'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedModel(m)}
                      className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                        selectedModel === m
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {m === 'all' ? 'All Models' : m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-2">Availability</label>
                <button
                  onClick={() => setOnlyAvailableFilter(!onlyAvailableFilter)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                    onlyAvailableFilter
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${onlyAvailableFilter ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'}`}>
                    {onlyAvailableFilter && <Check className="w-3 h-3" />}
                  </div>
                  <span>Available only</span>
                </button>
              </div>

              <div className="flex items-end justify-end">
                <button
                  onClick={handleClearFilters}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Row (Matches Design) */}
        <div className="flex items-center gap-2.5 text-xs pt-1">
          <span className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
            ACTIVE:
          </span>

          {/* All Models Tag Chip */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium border border-slate-200">
            <span>{selectedModel === 'all' ? 'All Models' : selectedModel}</span>
            <button
              onClick={() => setSelectedModel('all')}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {onlyAvailableFilter && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium border border-slate-200">
              <span>Available Only</span>
              <button
                onClick={() => setOnlyAvailableFilter(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          <button
            id="clear-all-filters-btn"
            onClick={handleClearFilters}
            className="text-emerald-600 hover:text-emerald-700 font-semibold ml-2 cursor-pointer"
          >
            Clear all
          </button>
        </div>
      </div>

      {/* 3. SCOOTERS GRID (6 CARDS) */}
      {filteredScooters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredScooters.map((scooter) => (
            <ScooterCard
              key={scooter.id}
              scooter={scooter}
              onBook={onBookScooter}
              onViewDetails={onViewScooterDetail}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 mb-16">
          <p className="text-slate-600 font-semibold text-base mb-2">No scooters match your current filters</p>
          <p className="text-slate-400 text-xs mb-4">Try clearing your search query or adjusting your filters.</p>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-emerald-500 text-white text-xs font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* 4. NEW COMMUTER OFFER PROMO BANNER (MATCHES DESIGN) */}
      <section className="bg-[#0b1326] text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text & CTAs */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-semibold text-xs">
              <span>New Commuter Offer</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Unlock your first 3 rides for free
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg">
              Join SwiftRide today and experience the future of urban mobility. High-performance electric scooters, always ready when you are.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="claim-offer-now-btn"
                onClick={onOpenOffers}
                className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold transition-colors shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                Claim Offer Now
              </button>
              <button
                id="promo-how-it-works-btn"
                onClick={onOpenHowItWorks}
                className="px-5 py-2.5 rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                Learn How It Works
              </button>
            </div>
          </div>

          {/* Right Live Telemetry Card Widget */}
          <div className="lg:col-span-4">
            <div className="bg-[#111c33] border border-slate-700/60 rounded-2xl p-5 shadow-lg">
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider leading-tight">
                    ACTIVE STATUS
                  </p>
                  <p className="text-sm font-extrabold text-white leading-tight">
                    System Optimal
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-700/60 my-3"></div>

              {/* Key Stats */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Available Fleet</span>
                  <span className="font-bold text-white">1,240+</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Active Riders</span>
                  <span className="font-bold text-white">842</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Carbon Saved</span>
                  <span className="font-bold text-emerald-400">12.4 Tons</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
