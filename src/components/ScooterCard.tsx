import React from 'react';
import { Scooter } from '../types';
import { Zap, Gauge, MapPin, ChevronRight, Battery } from 'lucide-react';

interface ScooterCardProps {
  scooter: Scooter;
  onBook: (scooter: Scooter) => void;
  onViewDetails?: (scooter: Scooter) => void;
}

export const ScooterCard: React.FC<ScooterCardProps> = ({ scooter, onBook, onViewDetails }) => {
  const isAvailable = scooter.status === 'available';

  return (
    <div 
      id={`scooter-card-${scooter.id}`}
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col group overflow-hidden"
    >
      {/* Top Image Container with Badge */}
      <div 
        onClick={() => onViewDetails ? onViewDetails(scooter) : onBook(scooter)}
        className="relative w-full aspect-[4/3] bg-slate-50 overflow-hidden flex items-center justify-center p-3 cursor-pointer"
      >
        {/* Availability Badge */}
        <div className="absolute top-3 left-3 z-10">
          {isAvailable ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500 text-white shadow-xs">
              Available Now
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-200 text-slate-600">
              Currently Rented
            </span>
          )}
        </div>

        {/* Scooter Image */}
        <img
          src={scooter.image}
          alt={`${scooter.name} ${scooter.model}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain object-center group-hover:scale-103 transition-transform duration-300 rounded-lg"
        />
      </div>

      {/* Card Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div 
          onClick={() => onViewDetails ? onViewDetails(scooter) : onBook(scooter)}
          className="cursor-pointer"
        >
          {/* Name & Model */}
          <div className="mb-2">
            <h3 className="font-bold text-slate-900 text-base leading-snug tracking-tight group-hover:text-emerald-600 transition-colors">
              {scooter.name}
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              {scooter.model}
            </p>
          </div>

          {/* Specs: Range & Speed Badges */}
          <div className="flex items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-500/10 text-slate-700 text-xs font-semibold">
              <Zap className="w-3 h-3 text-slate-600" />
              <span>{scooter.rangeMiles} miles</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-500/10 text-slate-700 text-xs font-semibold">
              <Gauge className="w-3 h-3 text-slate-600" />
              <span>{scooter.topSpeedMph} mph</span>
            </div>
          </div>

          {/* Location Line */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-normal mb-4">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{scooter.location}</span>
          </div>
        </div>

        {/* Price & Book Action */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100/80">
          <div>
            <span className="text-base font-bold text-slate-900">
              ${scooter.pricePerMin.toFixed(2)}
            </span>
            <span className="text-xs font-medium text-slate-500">/min</span>
          </div>

          <button
            id={`book-btn-${scooter.id}`}
            onClick={() => onBook(scooter)}
            disabled={!isAvailable}
            className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              isAvailable
                ? 'bg-emerald-500 hover:bg-emerald-600 active:scale-97 text-white shadow-sm shadow-emerald-500/20'
                : 'bg-emerald-300/80 text-white/90 cursor-not-allowed opacity-70'
            }`}
          >
            <span>Book Now</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};