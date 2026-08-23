import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  Percent, 
  Zap, 
  Star, 
  Users, 
  Gift, 
  Headphones, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  Share2,
  X
} from 'lucide-react';
import { PROMO_OFFERS, FAQS, SWIFTRIDE_PERKS, ASSETS } from '../data/scootersData';
import { PromoOffer } from '../types';

interface OffersPageProps {
  onNavigateToRentals: () => void;
  onNavigateToLocations: () => void;
  onApplyPromoCode?: (code: string) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({
  onNavigateToRentals,
  onNavigateToLocations,
  onApplyPromoCode
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'seasonal' | 'students' | 'commuters'>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');
  const [referralModalOpen, setReferralModalOpen] = useState(false);
  const [redeemedOffer, setRedeemedOffer] = useState<PromoOffer | null>(null);

  const filteredOffers = PROMO_OFFERS.filter(offer => {
    if (selectedCategory === 'all') return true;
    return offer.category === selectedCategory;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleRedeem = (offer: PromoOffer) => {
    handleCopyCode(offer.code);
    setRedeemedOffer(offer);
    if (onApplyPromoCode) {
      onApplyPromoCode(offer.code);
    }
  };

  const getPerkIcon = (iconName: string) => {
    switch (iconName) {
      case 'star':
        return <Star className="w-5 h-5 text-emerald-600" />;
      case 'users':
        return <Users className="w-5 h-5 text-emerald-600" />;
      case 'gift':
        return <Gift className="w-5 h-5 text-emerald-600" />;
      case 'info':
        return <Headphones className="w-5 h-5 text-emerald-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div id="offers-page" className="w-full bg-[#f8fafc] text-slate-800 pb-20">
      {/* Top Header Section with Flash Banner */}
      <section className="pt-12 pb-10 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>ACTIVE CAMPAIGNS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-4">
              Premium Rides,<br />
              <span className="text-emerald-500">Better Prices.</span>
            </h1>

            <p className="text-slate-600 text-base leading-relaxed max-w-lg mb-8">
              Explore our latest seasonal promotions and exclusive member discounts designed to keep you moving through the city for less.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#available-discounts"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm transition-all text-sm"
              >
                View All Offers
              </a>
              <a
                href="#swiftride-perks"
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold border border-slate-200 transition-colors text-sm"
              >
                Member Perks
              </a>
            </div>
          </div>

          {/* Right Column: Weekend Flash Hero Banner Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-800 bg-slate-900 p-6 sm:p-8 flex flex-col justify-between min-h-[220px]">
              {/* Background Glow & City Texture */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
                style={{ backgroundImage: `url(${ASSETS.proXCityStreet})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950/95" />

              {/* Floating Green % Badge */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center shadow-lg shadow-emerald-500/20 text-base">
                %
              </div>

              {/* Card Content */}
              <div className="relative z-10 text-left">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1.5">Weekend Flash</h3>
                <p className="text-slate-300 text-xs sm:text-sm max-w-xs leading-relaxed mb-6">
                  Get 50% off all rides this Saturday and Sunday.
                </p>
              </div>

              {/* Code Box & Copy CTA */}
              <div className="relative z-10 flex items-center justify-between bg-slate-800/90 border border-slate-700/80 rounded-xl p-2.5 px-4 backdrop-blur-sm">
                <span className="text-xs sm:text-sm font-mono font-bold text-emerald-400">
                  Code: WKND50
                </span>
                <button
                  id="copy-flash-code-btn"
                  onClick={() => handleCopyCode('WKND50')}
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-medium transition-colors"
                >
                  {copiedCode === 'WKND50' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Discounts Section */}
      <section id="available-discounts" className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1">
              Available Discounts
            </h2>
            <p className="text-slate-500 text-sm">
              Select a category to find specific savings for your next commute.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80 self-start">
            {(['all', 'seasonal', 'students', 'commuters'] as const).map((cat) => (
              <button
                key={cat}
                id={`filter-tab-${cat}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {cat === 'all' ? 'All Offers' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Offer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              id={`offer-card-${offer.id}`}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow relative text-left group"
            >
              {/* Card Image Banner */}
              <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Popular / Best Value Top Badge */}
                {offer.badge && (
                  <div className="absolute top-3 left-3 bg-emerald-500 text-slate-950 font-bold text-[11px] px-2.5 py-1 rounded-full shadow-sm">
                    {offer.badge}
                  </div>
                )}

                {/* Discount Overlay Text */}
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-300">
                    {offer.discountBadge || 'EXCLUSIVE OFFER'}
                  </p>
                  <p className="text-2xl font-black text-white tracking-tight">
                    {offer.discountText}
                  </p>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                    {offer.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed mb-4">
                    {offer.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Expires: {offer.expires}</span>
                  </div>
                </div>

                {/* Bottom Promo Code & Action */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-2 px-3">
                    <span className="font-mono text-xs font-bold text-slate-800">
                      {offer.code}
                    </span>
                    <button
                      id={`copy-code-${offer.id}`}
                      onClick={() => handleCopyCode(offer.code)}
                      className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      {copiedCode === offer.code ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    id={`redeem-btn-${offer.id}`}
                    onClick={() => handleRedeem(offer)}
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      offer.isPrimary
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200'
                    }`}
                  >
                    <span>Redeem Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Referral Program Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 my-10">
        <div className="relative bg-[#0b1326] rounded-3xl overflow-hidden shadow-xl text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Subtle Ambient Teal glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Text & CTAs */}
          <div className="max-w-lg z-10 flex flex-col items-start text-left">
            <div className="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Referral Program
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-3">
              Share the ride,<br />
              <span className="text-emerald-400">earn $20 in credits.</span>
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Invite your friends to SwiftRide. When they complete their first ride, both of you get $20 added to your digital wallets instantly.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <button
                id="referral-invite-friends-btn"
                onClick={() => setReferralModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                Invite Friends
              </button>
              <button
                id="referral-learn-more-btn"
                onClick={() => setReferralModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs sm:text-sm border border-slate-700 transition-colors"
              >
                Learn More
              </button>
            </div>

            {/* Metrics */}
            <div className="flex items-center gap-8 pt-4 border-t border-slate-800">
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">12k+</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Referrers</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-emerald-400">$240k</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rewards Distributed</p>
              </div>
            </div>
          </div>

          {/* Right Vector Tree Graphic container */}
          <div className="w-full md:w-5/12 flex justify-center z-10">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900/90 border border-emerald-500/20 p-6 flex flex-col items-center justify-center shadow-inner">
              {/* Circuit lines vector representation */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="w-24 h-24 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20 animate-pulse">
                <Zap className="w-12 h-12 text-emerald-400" />
              </div>
              <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">SwiftRide Network</p>
              <p className="text-[11px] text-slate-400 text-center mt-1">Smart mobility reward matrix</p>
            </div>
          </div>
        </div>
      </section>

      {/* The SwiftRide Perks (4-column Bento) */}
      <section id="swiftride-perks" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          The SwiftRide Perks
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto mb-10 leading-relaxed">
          Being part of the SwiftRide community goes beyond just discounts. We provide integrated solutions for urban mobility.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SWIFTRIDE_PERKS.map((perk) => (
            <div
              key={perk.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-left flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 border border-emerald-100">
                  {getPerkIcon(perk.icon)}
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {perk.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {perk.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Heading & Support Contact Box */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
              Have questions about how our promotional codes work? We've gathered the most common inquiries to help you save time and money.
            </p>

            {/* Support Callout Box */}
            <div className="w-full bg-[#0b1326] text-white p-5 rounded-2xl border border-slate-800 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Still need help?</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Our support team is available 24/7 to assist with promo code issues.
                  </p>
                </div>
              </div>
              <button
                onClick={() => alert('Support line: 1-800-SWIFTRIDE (24/7 Support Active)')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 pt-1"
              >
                <span>Contact Support</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: FAQ Accordions */}
          <div className="lg:col-span-7 space-y-3">
            {FAQS.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  id={`faq-${faq.id}`}
                  className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden text-left transition-all"
                >
                  <button
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className="w-full flex items-center justify-between p-4 text-xs sm:text-sm font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Emerald CTA Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white p-8 sm:p-12 text-center shadow-xl">
          {/* Subtle Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Ready to save on your next ride?
          </h2>
          <p className="text-emerald-50 text-xs sm:text-sm max-w-lg mx-auto mb-8 leading-relaxed">
            Download the SwiftRide app to manage all your active offers and track your rewards progress in real-time.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              id="offers-get-app-btn"
              onClick={onNavigateToRentals}
              className="px-6 py-3 rounded-xl bg-white text-emerald-700 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              Get the App
            </button>
            <button
              id="offers-view-locations-btn"
              onClick={onNavigateToLocations}
              className="px-6 py-3 rounded-xl bg-emerald-700/60 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm border border-emerald-400/40 transition-colors"
            >
              View Locations
            </button>
          </div>
        </div>
      </section>

      {/* Invite Friends Modal */}
      {referralModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative text-left">
            <button
              onClick={() => setReferralModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Invite Friends, Earn $20</h3>
            <p className="text-xs text-slate-500 mb-6">
              Share your personal invite code. When a friend completes their first ride, both accounts receive $20 credit.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-6 flex items-center justify-between">
              <span className="font-mono font-bold text-sm text-slate-900">SWIFT-FRIEND-20</span>
              <button
                onClick={() => handleCopyCode('SWIFT-FRIEND-20')}
                className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                {copiedCode === 'SWIFT-FRIEND-20' ? 'Copied!' : 'Copy Code'}
              </button>
            </div>

            <button
              onClick={() => setReferralModalOpen(false)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Redeem Notification Toast / Modal */}
      {redeemedOffer && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-4 max-w-sm">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
            <Check className="w-5 h-5" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-xs font-bold text-white">{redeemedOffer.title} Applied</p>
            <p className="text-[11px] text-slate-300">Code <span className="font-mono text-emerald-400">{redeemedOffer.code}</span> copied to clipboard.</p>
          </div>
          <button
            onClick={() => setRedeemedOffer(null)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
