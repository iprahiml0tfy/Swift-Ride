import React from 'react';
import { PageView } from '../types';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenHowItWorks: () => void;
  onOpenLocations: () => void;
  onOpenOffers: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenHowItWorks,
  onOpenLocations,
  onOpenOffers,
}) => {
  return (
    <footer className="bg-[#fcfdfd] border-t border-slate-200/80 pt-14 pb-8 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Main Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Col 1: About */}
          <div>
            <button
              onClick={() => onNavigate('about')}
              className="text-sm font-bold text-slate-900 mb-3.5 tracking-tight hover:text-emerald-600 transition-colors text-left cursor-pointer block"
            >
              About SwiftRide
            </button>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs mb-3">
              Leading the urban mobility revolution with sustainable, high-performance electric scooters designed for the modern commuter.
            </p>
            <button
              onClick={() => onNavigate('about')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <span>Our Story & Mission →</span>
            </button>
          </div>

          {/* Col 2: Explore */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3.5 tracking-tight">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-emerald-600 transition-colors text-left cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('locations')}
                  className="hover:text-emerald-600 transition-colors text-left cursor-pointer"
                >
                  Locations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rentals')}
                  className="hover:text-emerald-600 transition-colors text-left cursor-pointer"
                >
                  Scooters
                </button>
              </li>
              <li>
                <button
                  id="footer-faq-link"
                  onClick={() => onNavigate('faq')}
                  className="hover:text-emerald-600 transition-colors text-left cursor-pointer"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('offers')}
                  className="hover:text-emerald-600 transition-colors text-left cursor-pointer"
                >
                  Offers & Promotions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-600 transition-colors text-left cursor-pointer"
                >
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3.5 tracking-tight">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li>
                <a href="#terms" className="hover:text-emerald-600 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-emerald-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#cookies" className="hover:text-emerald-600 transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenHowItWorks}
                  className="hover:text-emerald-600 transition-colors text-left cursor-pointer"
                >
                  Safety Guidelines
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <button
              onClick={() => onNavigate('contact')}
              className="text-sm font-bold text-slate-900 mb-3.5 tracking-tight hover:text-emerald-600 transition-colors text-left cursor-pointer block"
            >
              Contact Us
            </button>
            <div className="space-y-2.5 text-xs text-slate-500 mb-4">
              <button
                onClick={() => onNavigate('contact')}
                className="flex items-center gap-2 hover:text-emerald-600 transition-colors text-left cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>support@swiftride.com</span>
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="flex items-center gap-2 hover:text-emerald-600 transition-colors text-left cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>+1 (555) 000-0000</span>
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="flex items-center gap-2 hover:text-emerald-600 transition-colors text-left cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>San Francisco, CA HQ</span>
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter"
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom divider (تم تغييره إلى border-slate-300 ليكون الخط واضحاً) and copyright */}
        <div className="border-t border-slate-300 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 SwiftRide Mobility Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#accessibility" className="hover:text-slate-900 transition-colors">
              Accessibility
            </a>
            <a href="#sitemap" className="hover:text-slate-900 transition-colors">
              Sitemap
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};