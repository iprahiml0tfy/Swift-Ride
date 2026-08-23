import React, { useState, useMemo } from 'react';
import { DOCKING_LOCATIONS } from '../data/scootersData';
import { DockingLocation, Scooter } from '../types';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Star, 
  Zap, 
  Compass, 
  ChevronRight, 
  ExternalLink,
  Layers,
  ArrowUpRight
} from 'lucide-react';

interface LocationsPageProps {
  onSelectScooter?: (scooter: Scooter) => void;
  onOpenBookingModal?: (location: DockingLocation) => void;
}

export const LocationsPage: React.FC<LocationsPageProps> = ({
  onSelectScooter,
  onOpenBookingModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'docking' | 'individual'>('docking');
  const [selectedStationId, setSelectedStationId] = useState<string>(DOCKING_LOCATIONS[0].id);

  const filteredLocations = useMemo(() => {
    return DOCKING_LOCATIONS.filter((loc) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        loc.name.toLowerCase().includes(q) ||
        loc.address.toLowerCase().includes(q) ||
        loc.distance.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const selectedLocation = useMemo(() => {
    return DOCKING_LOCATIONS.find((l) => l.id === selectedStationId) || DOCKING_LOCATIONS[0];
  }, [selectedStationId]);

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-140px)] bg-slate-50 border-b border-slate-200">
      
      {/* LEFT SIDEBAR: Station Search & List (Matches visily-locations.jpg) */}
      <div 
        id="locations-sidebar"
        className="w-full md:w-[380px] lg:w-[420px] bg-white border-r border-slate-200 flex flex-col shrink-0"
      >
        {/* Sidebar Header & Controls */}
        <div className="p-5 sm:p-6 border-b border-slate-100 space-y-4">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Find SwiftRide
          </h1>

          {/* Search Input */}
          <div className="relative">
            <input
              id="station-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search station or address..."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-2xs"
            />
          </div>

          {/* Segmented Control: [ Docking Hubs ] [ Individual ] */}
          <div className="flex p-1 bg-slate-100 rounded-lg border border-slate-200/80 text-xs font-semibold">
            <button
              id="tab-docking-hubs"
              onClick={() => setActiveTab('docking')}
              className={`flex-1 py-1.5 px-3 rounded-md transition-all text-center ${
                activeTab === 'docking'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Docking Hubs
            </button>
            <button
              id="tab-individual"
              onClick={() => setActiveTab('individual')}
              className={`flex-1 py-1.5 px-3 rounded-md transition-all text-center ${
                activeTab === 'individual'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Individual
            </button>
          </div>
        </div>

        {/* Station List Items (Exact items from visily-locations.jpg) */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {filteredLocations.map((location) => {
            const isSelected = location.id === selectedStationId;
            const hasScooters = location.availableCount > 0;

            return (
              <div
                key={location.id}
                id={`station-item-${location.id}`}
                onClick={() => setSelectedStationId(location.id)}
                className={`p-4 sm:p-5 transition-all cursor-pointer select-none ${
                  isSelected
                    ? 'bg-slate-50/90 ring-1 ring-inset ring-emerald-500/20'
                    : 'bg-white hover:bg-slate-50/50'
                }`}
              >
                {/* Title & Distance */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {location.name}
                  </h3>
                  <div className="flex items-center gap-0.5 text-xs text-slate-500 font-medium shrink-0 pt-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 stroke-[2.5]" />
                    <span>{location.distance}</span>
                  </div>
                </div>

                {/* Address */}
                <p className="text-xs text-slate-500 mb-3">
                  {location.address}
                </p>

                {/* Badges & Rating Row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {/* Available badge */}
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        hasScooters
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-700 text-white'
                      }`}
                    >
                      {location.availableCount} available
                    </span>

                    {/* Slots badge */}
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {location.slotsRatio}
                    </span>
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-xs text-slate-700 font-medium">
                    <Star className="w-3.5 h-3.5 text-slate-400 fill-slate-300" />
                    <span>{location.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredLocations.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-xs">
              No docking stations found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>

      {/* RIGHT MAIN AREA: Interactive Map Visualizer (Matches visily-locations.jpg) */}
      <div 
        id="locations-map-canvas"
        className="flex-1 relative bg-[#f4f6f8] overflow-hidden min-h-[450px] md:min-h-auto flex items-center justify-center select-none"
      >
        {/* Styled Vector Map Grid & Roads Background */}
        <div className="absolute inset-0 bg-[#f6f7f9]">
          {/* Subtle grid lines */}
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          
          {/* Stylized geometric park / river polygons */}
          <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" preserveAspectRatio="none">
            {/* Water path / Hudson river outline */}
            <path
              d="M0,0 L220,0 Q260,200 180,450 Q120,700 240,1000 L0,1000 Z"
              fill="#e3effa"
            />
            {/* Central Park Green polygon */}
            <rect
              x="54%"
              y="18%"
              width="14%"
              height="20%"
              rx="12"
              fill="#e2f6e9"
              stroke="#bbf0cf"
              strokeWidth="1.5"
            />
            {/* Major road arteries */}
            <line x1="20%" y1="0%" x2="80%" y2="100%" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <line x1="20%" y1="0%" x2="80%" y2="100%" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
            <line x1="80%" y1="0%" x2="40%" y2="100%" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
            <line x1="80%" y1="0%" x2="40%" y2="100%" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="0%" y1="42%" x2="100%" y2="40%" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
            <line x1="0%" y1="42%" x2="100%" y2="40%" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Map Location Pins (Exact relative placement from visily-locations.jpg) */}
        {DOCKING_LOCATIONS.map((loc) => {
          const isSelected = loc.id === selectedStationId;
          
          return (
            <div
              key={loc.id}
              id={`map-pin-${loc.id}`}
              onClick={() => setSelectedStationId(loc.id)}
              style={{
                top: `${loc.mapY}%`,
                left: `${loc.mapX}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
            >
              {/* Pulse effect for selected pin */}
              {isSelected && (
                <div className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping scale-150"></div>
              )}

              {/* Pin Icon Bubble (Emerald circular pin matching design) */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 ${
                  isSelected
                    ? 'bg-emerald-500 scale-125 ring-4 ring-emerald-300/60 z-30 shadow-emerald-500/40'
                    : 'bg-emerald-500 hover:scale-110 shadow-slate-400/30'
                }`}
              >
                <MapPin className="w-5 h-5 fill-current" />
              </div>

              {/* Hover/Selected Tooltip Label */}
              {isSelected && (
                <div className="absolute left-1/2 -translate-x-1/2 top-11 bg-slate-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg shadow-xl text-[11px] font-semibold whitespace-nowrap pointer-events-none z-30 flex items-center gap-1.5 animate-in fade-in zoom-in-90 duration-150">
                  <span>{loc.name}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="text-emerald-300 font-bold">{loc.availableCount} ready</span>
                </div>
              )}
            </div>
          );
        })}

        {/* Bottom Floating Station Quick Action Card */}
        {selectedLocation && (
          <div className="absolute bottom-6 right-6 left-6 md:left-auto md:w-80 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-200/80 z-30 animate-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
                  Selected Hub
                </span>
                <h4 className="font-bold text-slate-900 text-sm">
                  {selectedLocation.name}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedLocation.address}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg font-black text-emerald-600">
                  {selectedLocation.availableCount}
                </span>
                <span className="text-[10px] text-slate-400 block -mt-1">available</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 mb-3">
              <span>Distance: <strong>{selectedLocation.distance}</strong></span>
              <span>Slots: <strong>{selectedLocation.slotsRatio}</strong></span>
            </div>

            <button
              onClick={() => {
                if (onOpenBookingModal) {
                  onOpenBookingModal(selectedLocation);
                }
              }}
              className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions to Station</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
