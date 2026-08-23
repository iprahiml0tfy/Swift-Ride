import React, { useState, useMemo } from 'react';
import { 
  Search, 
  HelpCircle, 
  Zap, 
  Layers, 
  CreditCard, 
  ShieldCheck, 
  Headphones, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Info, 
  BookOpen, 
  Check, 
  X,
  Shield
} from 'lucide-react';
import { 
  FAQ_CATEGORIES, 
  KNOWLEDGE_BASE_FAQS, 
  FAQ_COMMUNITY_PARTNERS, 
  FaqKnowledgeItem 
} from '../data/scootersData';

interface FaqPageProps {
  onNavigateToContact: () => void;
  onNavigateToLocations: () => void;
  onOpenHowItWorks?: () => void;
  onOpenLocations?: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({
  onNavigateToContact,
  onNavigateToLocations,
  onOpenHowItWorks,
  onOpenLocations
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-kb-1');
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, 'yes' | 'no'>>({});
  const [safetyModalOpen, setSafetyModalOpen] = useState(false);

  // Category Icon Resolver
  const getCategoryIcon = (iconName: string, isSelected: boolean) => {
    const iconClass = isSelected ? 'w-4 h-4 text-white' : 'w-4 h-4 text-slate-500';
    switch (iconName) {
      case 'zap':
        return <Zap className={iconClass} />;
      case 'layers':
        return <Layers className={iconClass} />;
      case 'credit-card':
        return <CreditCard className={iconClass} />;
      case 'shield-check':
        return <ShieldCheck className={iconClass} />;
      case 'headphones':
        return <Headphones className={iconClass} />;
      default:
        return <HelpCircle className={iconClass} />;
    }
  };

  // Partner Icon Resolver
  const getPartnerIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return <Zap className="w-4 h-4 text-emerald-500" />;
      case 'shield':
        return <Shield className="w-4 h-4 text-emerald-500" />;
      case 'book-open':
        return <BookOpen className="w-4 h-4 text-emerald-500" />;
      case 'headphones':
        return <Headphones className="w-4 h-4 text-emerald-500" />;
      default:
        return <Zap className="w-4 h-4 text-emerald-500" />;
    }
  };

  // Filtered FAQs based on Category and Search
  const filteredFaqs = useMemo(() => {
    return KNOWLEDGE_BASE_FAQS.filter((faq) => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleFeedback = (faqId: string, value: 'yes' | 'no') => {
    setHelpfulFeedback(prev => ({ ...prev, [faqId]: value }));
  };

  return (
    <div id="faq-knowledge-base-page" className="w-full bg-[#f8fafc] text-slate-800 pb-16">
      {/* Top Hero Banner with Dark Teal Network Background */}
      <section className="relative w-full bg-[#0a1120] py-16 sm:py-20 px-4 sm:px-6 overflow-hidden text-center text-white">
        {/* Subtle Cyber Grid / Radial Glow */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          {/* Top Pill Graphic */}
          {/* <div className="w-24 h-7 rounded-full border border-emerald-400/40 bg-emerald-950/40 backdrop-blur-sm mb-6 flex items-center justify-center">
            <span className="w-10 h-1 rounded-full bg-emerald-400/60" />
          </div> */}

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            How can we <span className="text-emerald-400">help you</span> ride?
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed mb-8">
            Find answers to all your questions about SwiftRide rentals, safety protocols, and account management in our comprehensive knowledge base.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-xl relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              id="faq-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for questions (e.g., 'parking', 'pricing')..."
              className="w-full pl-11 pr-10 py-3.5 bg-white text-slate-900 placeholder:text-slate-400 rounded-xl text-xs sm:text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Grid: Categories Sidebar (Left) + FAQs Accordion & Resources (Right) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Categories + Still Need Help Card */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                CATEGORIES
              </p>
              <div className="space-y-1.5">
                {FAQ_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      id={`faq-category-tab-${cat.id}`}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/70'
                      }`}
                    >
                      {getCategoryIcon(cat.icon, isSelected)}
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Still Need Help? Dark Card */}
            <div className="bg-[#0f172a] text-white p-6 rounded-2xl border border-slate-800 shadow-md">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">
                Still need help?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-5">
                Our support team is available 24/7 to assist with your journey.
              </p>
              <button
                id="faq-contact-support-btn"
                onClick={onNavigateToContact}
                className="w-full py-2.5 rounded-xl bg-transparent hover:bg-slate-800 text-white border border-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Contact Support
              </button>
            </div>
          </div>

          {/* Right Column: FAQ Accordion + Additional Resources */}
          <div className="lg:col-span-8 space-y-8 text-left">
            {/* Header & Result Count */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Frequently Asked Questions
              </h2>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-500 tracking-wider uppercase">
                {filteredFaqs.length} RESULTS
              </span>
            </div>

            {/* FAQs List */}
            <div className="space-y-3">
              {filteredFaqs.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
                  <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-700">No questions found</p>
                  <p className="text-xs text-slate-500 mt-1">Try adjusting your search terms or category filter.</p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                    className="mt-4 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold hover:bg-emerald-100"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredFaqs.map((faq) => {
                  const isExpanded = expandedFaqId === faq.id;
                  const feedback = helpfulFeedback[faq.id];
                  return (
                    <div
                      key={faq.id}
                      id={`faq-item-${faq.id}`}
                      className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-xs sm:text-sm font-bold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left"
                      >
                        <span className="pr-4">{faq.question}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100">
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                            {faq.answer}
                          </p>

                          {/* Was This Helpful? Feedback Row */}
                          <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                              WAS THIS HELPFUL?
                            </span>
                            {feedback ? (
                              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" />
                                {feedback === 'yes' ? 'Thanks for your feedback!' : 'We will improve this answer.'}
                              </span>
                            ) : (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleFeedback(faq.id, 'yes')}
                                  className="px-2.5 py-1 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => handleFeedback(faq.id, 'no')}
                                  className="px-2.5 py-1 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                                >
                                  No
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Additional Resources Section */}
            <div className="pt-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
                Additional Resources
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Resource Card 1: Safety Guidelines */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-emerald-200 transition-all">
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                      <Zap className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                      Safety Guidelines
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      Essential safety rules and regional traffic laws for a responsible ride.
                    </p>
                  </div>
                  <button
                    onClick={() => setSafetyModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-wider self-start cursor-pointer"
                  >
                    <span>LEARN MORE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Resource Card 2: Docking & Zones */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-emerald-200 transition-all">
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center mb-3">
                      <Info className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                      Docking & Zones
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      Learn about parking rules, restricted areas, and designated docking stations.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (onOpenLocations) onOpenLocations();
                      else onNavigateToLocations();
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-wider self-start cursor-pointer"
                  >
                    <span>VIEW MAP</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join the SwiftRide Community Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Join the SwiftRide Community
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mb-8">
          Follow us on social media for the latest urban mobility tips, community events, and exclusive promotional codes.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {FAQ_COMMUNITY_PARTNERS.map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-slate-700 font-bold text-xs sm:text-sm"
            >
              {getPartnerIcon(partner.icon)}
              <span>{partner.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Safety Guidelines Modal */}
      {safetyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative text-left">
            <button
              onClick={() => setSafetyModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">SwiftRide Rider Safety Rules</h3>
            <p className="text-xs text-slate-500 mb-4">
              Follow these golden safety principles every time you unlock a scooter:
            </p>

            <div className="space-y-3 mb-6 text-xs text-slate-700">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Always Wear a Helmet:</strong> Protect your head on every ride regardless of speed.</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Ride in Bike Lanes:</strong> Never ride on pedestrian sidewalks unless legally designated.</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>One Rider per Scooter:</strong> Tandem riding is strictly prohibited for your safety.</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Park Responsibly:</strong> Keep sidewalks, curb ramps, and doorways completely clear.</span>
              </div>
            </div>

            <button
              onClick={() => setSafetyModalOpen(false)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
            >
              I Understand & Agree
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
