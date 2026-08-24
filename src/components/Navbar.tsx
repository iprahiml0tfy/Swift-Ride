import React, { useState, useRef, useEffect } from 'react';
import { PageView, UserProfile } from '../types';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Search, 
  MapPin, 
  User, 
  Info, 
  Phone, 
  HelpCircle, 
  Tag, 
  Compass, 
  Bike,
  Zap,
  ChevronDown,
  Settings,
  Calendar,
  Compass as TelemetryIcon,
  Star,
  FileText,
  LogOut,
  Home
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenLocations: () => void;
  onOpenHowItWorks: () => void;
  onOpenOffers: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentUser: UserProfile | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenLocations,
  onOpenHowItWorks,
  onOpenOffers,
  searchQuery,
  onSearchChange,
  currentUser,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => handleNavClick('home')}
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              Swift<span className="text-emerald-500">Ride</span>
            </span>
            <span className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              Urban Mobility
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search scooters, models, docks..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-emerald-500 dark:focus:border-emerald-500 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          
          <button
            onClick={onOpenLocations}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-slate-700 dark:text-slate-300 hover:text-emerald-600 text-sm font-medium transition-colors"
          >
            <MapPin className="w-4 h-4 text-emerald-500" />
            <span>Locations</span>
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <div 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 cursor-pointer p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <img 
                  src={currentUser.avatarUrl} 
                  alt={currentUser.name} 
                  className="w-9 h-9 rounded-full object-cover border-2 border-emerald-500"
                />
                <ChevronDown className="w-4 h-4 text-slate-500 hidden sm:block" />
              </div>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white truncate">{currentUser.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => handleNavClick('profile')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-left"
                    >
                      <Settings className="w-4 h-4 text-emerald-500" />
                      <span>Profile & Settings</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('my-bookings')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-left"
                    >
                      <Calendar className="w-4 h-4 text-emerald-500" />
                      <span>My Bookings</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('active-ride')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-left"
                    >
                      <TelemetryIcon className="w-4 h-4 text-emerald-500" />
                      <span>Active Ride Telemetry</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('rate-scooter')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-left"
                    >
                      <Star className="w-4 h-4 text-emerald-500" />
                      <span>Rate Scooter / Receipt</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('booking')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-left"
                    >
                      <FileText className="w-4 h-4 text-emerald-500" />
                      <span>Reservation Form</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800 pt-1 mt-1">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-medium text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => handleNavClick('login')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium shadow-md shadow-emerald-500/20 transition-all"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}

          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              setProfileDropdownOpen(false);
            }}
            className="md:hidden p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
            aria-label="Open Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 shadow-xl md:hidden flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search scooters, models, docks..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 max-h-[60vh] overflow-y-auto">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-left"
            >
              <Home className="w-5 h-5 text-emerald-500" />
              <span>Home</span>
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-left"
            >
              <Info className="w-5 h-5 text-emerald-500" />
              <span>About Us</span>
            </button>

            <button
              onClick={() => handleNavClick('rentals')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-left"
            >
              <Bike className="w-5 h-5 text-emerald-500" />
              <span>Rentals</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLocations();
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-left"
            >
              <MapPin className="w-5 h-5 text-emerald-500" />
              <span>Locations</span>
            </button>

            {/* How It Works Page Link */}
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-left"
            >
              <HelpCircle className="w-5 h-5 text-emerald-500" />
              <span>How It Works</span>
            </button>

            {/* Offers Page Link */}
            <button
              onClick={() => handleNavClick('offers')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-left"
            >
              <Tag className="w-5 h-5 text-emerald-500" />
              <span>Offers & Promotions</span>
            </button>

            <button
              onClick={() => handleNavClick('faq')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-left"
            >
              <HelpCircle className="w-5 h-5 text-emerald-500" />
              <span>FAQ</span>
            </button> 

            <button
              onClick={() => handleNavClick('contact')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-left"
            >
              <Phone className="w-5 h-5 text-emerald-500" />
              <span>Contact Us</span>
            </button>
            
          </div>

          {currentUser ? (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('profile')}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-left"
              >
                <Settings className="w-5 h-5 text-emerald-500" />
                <span>Profile & Settings</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 font-medium text-left"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <button
                onClick={() => handleNavClick('login')}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-white font-medium text-center text-sm shadow-md"
              >
                Sign In
              </button>
              <button
                onClick={() => handleNavClick('signup')}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-center text-sm"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};