import React, { useState } from 'react';
import { DOCKING_LOCATIONS } from '../data/scootersData';
import { DockingLocation } from '../types';
import { 
  X, 
  MapPin, 
  Navigation, 
  Zap, 
  CheckCircle, 
  Compass, 
  ExternalLink,
  Layers
} from 'lucide-react';

interface LocationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStation?: (station: DockingLocation) => void;
}

export const LocationsModal: React.FC<LocationsModalProps> = ({
  isOpen,
  onClose,
  onSelectStation,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<DockingLocation>(DOCKING_LOCATIONS[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-150 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Docking Hubs & Smart Zones
              </h3>
              <p className="text-xs text-slate-400">
                12 active docking hubs across the metropolitan area
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content: Interactive List + Visual Map */}
        <div className="grid grid-cols-1 md:grid-cols-12 overflow-y-auto flex-1">
          
          {/* Station List (Left) */}
          <div className="md:col-span-5 border-r border-slate-100 p-4 space-y-2.5 overflow-y-auto max-h-[400px]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
              Nearby Stations
            </p>

            {DOCKING_LOCATIONS.map((loc) => {
              const isSelected = selectedLocation.id === loc.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-emerald-50/60 border-emerald-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-bold text-slate-900 text-xs">
                      {loc.name}
                    </h4>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full shrink-0">
                      {loc.availableCount} Available
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {loc.address}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-medium">
                    <span>{loc.distance} walking</span>
                    <span>{loc.slotsRatio || `${loc.totalSlots} total bays`}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Map Visualizer (Right) */}
          <div className="md:col-span-7 bg-slate-100 p-6 flex flex-col justify-between relative min-h-[300px]">
            
            {/* Simulated Clean Vector Map Graphic */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-emerald-50/40 opacity-90 overflow-hidden">
              {/* Map grid lines */}
              <div className="w-full h-full opacity-20 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px]"></div>
              {/* Central Park representation */}
              <div className="absolute top-10 right-10 w-48 h-36 bg-emerald-200/40 rounded-3xl border border-emerald-300/40 flex items-center justify-center text-emerald-800 text-[10px] font-bold">
                Central Park Green Belt
              </div>
              
              {/* Pins for stations */}
              {DOCKING_LOCATIONS.map((loc) => {
                const isSelected = selectedLocation.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`absolute cursor-pointer transition-transform duration-200 ${
                      loc.id === 'loc-1' ? 'top-16 left-20' :
                      loc.id === 'loc-2' ? 'top-32 left-44' :
                      loc.id === 'loc-3' ? 'bottom-20 left-28' : 'bottom-10 right-16'
                    } ${isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'}`}
                  >
                    <div className={`p-2 rounded-full shadow-md flex items-center justify-center text-white ${
                      isSelected ? 'bg-emerald-600 ring-4 ring-emerald-300/60' : 'bg-slate-800'
                    }`}>
                      <Zap className="w-3.5 h-3.5 fill-current" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Station Card Overlay */}
            <div className="relative z-20 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-150 mt-auto">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{selectedLocation.name}</h4>
                  <p className="text-xs text-slate-500">{selectedLocation.address}</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-emerald-600">
                    {selectedLocation.availableCount}
                  </span>
                  <span className="text-xs text-slate-400 block -mt-1">scooters ready</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={onClose}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Walking Directions</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
