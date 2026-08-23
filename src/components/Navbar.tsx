import React, { useState } from 'react';
import { PageView } from '../types';
import { useTheme } from '../context/ThemeContext';
import { 
  Zap, 
  MapPin, 
  User, 
  ChevronDown, 
  Search, 
  Menu, 
  X, 
  LogOut,
  Sun,
  Moon,
  Calendar,
  Compass,
  Star,
  FileText
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenLocations: () => void;
  onOpenHowItWorks?: () => void;
  onOpenOffers?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  currentUser?: { name: string; email: string; avatarUrl?: string } | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenLocations,
  searchQuery = '',
  onSearchChange,
  currentUser = null,
  onLogout
}) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  return (
    <header className="fixed top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-all w-full">
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20 w-full">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-sm shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
                  Swift<span className="text-emerald-600 dark:text-emerald-400">Ride</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 tracking-wide uppercase mt-0.5 hidden sm:inline">
                  Urban Mobility
                </span>
              </div>
            </button>
          </div>

          {/* Right Controls */}
          <div className="hidden sm:flex items-center gap-3 lg:gap-4">
            <div className="relative flex items-center">
              <div className="absolute left-3.5 pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                placeholder="Search scooters, models, docks..."
                className="w-48 md:w-60 lg:w-72 pl-9 pr-3.5 py-2 text-xs bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 rounded-full border border-slate-200/80 dark:border-slate-700/80 focus:border-emerald-500 focus:outline-none transition-all"
              />
            </div>

            <button
              onClick={onOpenLocations}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-600 hover:bg-emerald-50/60 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>Locate</span>
            </button>

            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-emerald-600 hover:border-emerald-500/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-2xs"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-slate-700" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
              )}
            </button>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {currentUser.avatarUrl ? (
                    <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500 shadow-sm" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                      {getInitials(currentUser.name)}
                    </div>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
                </button>

                {accountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/90 dark:border-slate-800 py-2 z-50 text-left">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                    </div>

                    <div className="py-1">
                      <button onClick={() => { onNavigate('profile'); setAccountMenuOpen(false); }} className="w-full px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 cursor-pointer">
                        <User className="w-4 h-4 text-emerald-600" /> Profile & Settings
                      </button>
                      <button onClick={() => { onNavigate('my-bookings'); setAccountMenuOpen(false); }} className="w-full px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 cursor-pointer">
                        <Calendar className="w-4 h-4 text-emerald-600" /> My Bookings
                      </button>
                      <button onClick={() => { onNavigate('active-ride'); setAccountMenuOpen(false); }} className="w-full px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 cursor-pointer">
                        <Compass className="w-4 h-4 text-emerald-600" /> Active Ride Telemetry
                      </button>
                      <button onClick={() => { onNavigate('rate-scooter'); setAccountMenuOpen(false); }} className="w-full px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 cursor-pointer">
                        <Star className="w-4 h-4 text-emerald-600" /> Rate Scooter / Receipt
                      </button>
                      <button onClick={() => { onNavigate('booking'); setAccountMenuOpen(false); }} className="w-full px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 cursor-pointer">
                        <FileText className="w-4 h-4 text-emerald-600" /> Reservation Form
                      </button>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-1 mt-1">
                      <button onClick={() => { if (onLogout) onLogout(); setAccountMenuOpen(false); }} className="w-full px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2.5 cursor-pointer">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => onNavigate('login')} className="px-3.5 py-1.5 text-xs font-semibold rounded-full border text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 cursor-pointer">
                  Sign In
                </button>
                <button onClick={() => onNavigate('signup')} className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-sm">
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button onClick={toggleTheme} className="p-2 text-slate-700 dark:text-slate-200 rounded-full">
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-700 dark:text-slate-200 rounded-lg">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};