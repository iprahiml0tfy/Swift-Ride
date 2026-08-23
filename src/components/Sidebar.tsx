import React from 'react';
import { PageView } from '../types';
import { 
  Home, 
  Bike, 
  HelpCircle, 
  MapPin, 
  Tag, 
  MessageCircle, 
  Users, 
  Mail,
  X
} from 'lucide-react';

interface SidebarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

interface NavItemConfig {
  id: PageView;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isOpen = false,
  onClose
}) => {
  const navItems: NavItemConfig[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Us', icon: Users },
    { id: 'rentals', label: 'Rentals', icon: Bike },
    { id: 'how-it-works', label: 'How It Works', icon: HelpCircle },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'offers', label: 'Offers', icon: Tag, badge: true },
    { id: 'faq', label: 'FAQ', icon: MessageCircle },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <>
      {/* Backdrop for Mobile when Sidebar is Open */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 md:hidden transition-opacity"
        />
      )}

      <aside 
        id="main-desktop-sidebar"
        aria-label="Main Navigation"
        className={`fixed left-0 top-20 bottom-0 h-[calc(100vh-5rem)] z-40 w-20 flex-col items-center justify-between py-4 bg-transparent transition-transform duration-300 select-none overflow-visible ${
          isOpen ? 'translate-x-0 flex' : '-translate-x-full md:translate-x-0 md:flex'
        }`}
      >
        {/* Mobile Close Button (Top inside Sidebar) */}
        <div className="flex md:hidden w-full px-3 justify-end flex-shrink-0">
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-500 hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
            aria-label="Close Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="hidden md:block" />

        {/* Center Navigation Icons with Floating Tooltips */}
        <nav className="flex flex-col items-center justify-center gap-2 my-auto w-full px-2.5 py-2 overflow-visible min-h-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id || 
              (item.id === 'rentals' && currentPage === 'scooter-detail');

            return (
              <div key={item.id} className="relative group flex items-center justify-center w-full py-1">
                <button
                  id={`sidebar-link-${item.id}`}
                  onClick={() => {
                    onNavigate(item.id);
                    if (onClose) onClose();
                  }}
                  aria-label={item.label}
                  className={`relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
                    isActive
                      ? 'text-white scale-105'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/40 dark:hover:bg-slate-800/40 hover:scale-105'
                  }`}
                >
                  {/* دائرة متوهجة تظهر خلف الأيقونة النشطة فقط */}
                  <div className={`flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/40 text-white' 
                      : 'w-5 h-5 text-slate-500 dark:text-slate-400'
                  }`}>
                    <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.4]' : 'stroke-[1.9]'}`} />
                  </div>

                  {item.badge && !isActive && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0b1120]" />
                  )}
                </button>

                {/* Floating Tooltip */}
                <div 
                  role="tooltip"
                  className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold tracking-wide shadow-2xl border border-slate-700 whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999] hidden md:flex items-center gap-1.5"
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 bg-emerald-500 text-[10px] font-bold rounded-full text-white">NEW</span>
                  )}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  )}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900 dark:border-r-slate-800" />
                </div>
              </div>
            );
          })}
        </nav>

        {/* Bottom Status Indicator */}
        <div className="flex flex-col items-center flex-shrink-0 pb-1">
          <div className="relative group">
            <div 
              tabIndex={0}
              aria-label="Fleet status: 100% online"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100/30 dark:bg-slate-800/20 text-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-colors cursor-help focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>

            <div 
              role="tooltip"
              className="pointer-events-none absolute left-full bottom-0 ml-3 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-800 text-white text-[11px] font-medium tracking-wide shadow-2xl border border-slate-700 whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999] hidden md:flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
              <span>Fleet Live & Docks Ready</span>
              <div className="absolute right-full bottom-2 border-4 border-transparent border-r-slate-900 dark:border-r-slate-800" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};