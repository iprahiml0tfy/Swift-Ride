import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Headphones, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  MessageSquare, 
  Compass, 
  Globe,
  Clock,
  ExternalLink,
  X,
  PhoneCall
} from 'lucide-react';
import { ASSETS, GLOBAL_REGIONS, CONTACT_FAQS } from '../data/scootersData';

interface ContactUsPageProps {
  onNavigateToFAQ?: () => void;
  onNavigateToOffers?: () => void;
}

export const ContactUsPage: React.FC<ContactUsPageProps> = ({
  onNavigateToFAQ,
  onNavigateToOffers
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('contact-faq-1');
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [callbackModalOpen, setCallbackModalOpen] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    { sender: 'bot', text: 'Hello! Welcome to SwiftRide 24/7 Live Support. How can we help you today?' }
  ]);
  const [userChatInput, setUserChatInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userChatInput.trim()) return;
    const msg = userChatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: msg }]);
    setUserChatInput('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { 
          sender: 'bot', 
          text: 'Thanks for reaching out! An agent is reviewing your message. For immediate roadside unlocking or safety assistance, you can also dial 1-800-SWIFTRIDE.' 
        }
      ]);
    }, 900);
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone) return;
    setCallbackSubmitted(true);
    setTimeout(() => {
      setCallbackSubmitted(false);
      setCallbackModalOpen(false);
      setCallbackPhone('');
    }, 2500);
  };

  return (
    <div id="contact-us-page" className="w-full bg-[#f8fafc] text-slate-800 pb-16">
      {/* Hero Header with Aerial City Night View */}
      <section className="relative w-full bg-slate-950 py-16 sm:py-20 px-4 sm:px-6 overflow-hidden">
        {/* Background Image & Gradient */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: `url(${ASSETS.contactCityNight})` }}
        />
        {/* تم تعديل التدرج هنا لإزالة اللون الأبيض كلياً */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950/80" />

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-slate-200 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <span>Reach Out</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Connect with <span className="text-emerald-400">SwiftRide</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed">
            Our team is ready to help you revolutionize your daily commute. Experience the future of urban mobility.
          </p>
        </div>
      </section>

      {/* Main Contact Grid (Send Inquiry Form + Support Channels / HQ) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Send an Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-lg p-6 sm:p-8 text-left">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Send an Inquiry
              </h2>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm mb-6">
              Fill out the form below and our support team will get back to you within 24 hours.
            </p>

            {formSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center py-10">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Message Sent Successfully</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto mb-4">
                  Thank you for contacting SwiftRide! A support specialist has received your inquiry and will reply shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us more about your request..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  id="contact-send-message-btn"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Support Channels + Map Card + Knowledge Callout */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Support Channels Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center gap-2">
                <Headphones className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs sm:text-sm font-bold tracking-wide">Support Channels</h3>
              </div>

              <div className="p-5 space-y-4">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Email</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">support@swiftride.com</p>
                    <span className="inline-block mt-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      AVERAGE RESPONSE: 2H
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Phone</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">+1 (555) 000-0000</p>
                    <p className="text-[10px] font-semibold text-emerald-600 mt-0.5">
                      MON-FRI: 9AM - 6PM
                    </p>
                  </div>
                </div>

                {/* Office */}
                <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Office</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">123 Mobility Lane</p>
                    <p className="text-[11px] text-slate-500">San Francisco, CA 94103</p>
                  </div>
                </div>
              </div>
            </div>

            {/* HQ Map Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="relative h-36 bg-slate-900 flex items-center justify-center overflow-hidden">
                {/* Map Grid Vector Background */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

                {/* Pin with pulse */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/40 animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="mt-1 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-emerald-500/40 text-[10px] font-bold text-emerald-300">
                    HQ Location
                  </span>
                </div>
              </div>

              {/* Bottom details */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">San Francisco HQ</h4>
                  <p className="text-[11px] text-slate-500">South of Market District</p>
                </div>
                <button
                  onClick={() => alert('Opening map directions to 123 Mobility Lane, San Francisco, CA...')}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span>Get Directions</span>
                </button>
              </div>
            </div>

            {/* Knowledge Base Callout */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                    Need quick answers?
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Check our Knowledge Base for immediate help with common questions about billing, safety, and parking.
                  </p>
                  <a
                    href="#contact-faq-section"
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    <span>Browse FAQs</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SwiftRide Globally Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 my-14">
        <div className="bg-[#1e293b] rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              SwiftRide Globally
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Scaling urban mobility across continents. Join the movement for smarter, greener cities.
            </p>
          </div>

          {/* 4 Regions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GLOBAL_REGIONS.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 text-left flex flex-col justify-between"
              >
                <div>
                  <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                    {item.region}
                  </p>
                  <p className="text-xl font-bold text-white mb-3">
                    {item.cities}
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-700/60">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-slate-300">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="contact-faq-section" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto mb-10 leading-relaxed">
          Quick answers to common inquiries before you reach out.
        </p>

        {/* Accordion List */}
        <div className="space-y-3 mb-10 text-left">
          {CONTACT_FAQS.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;
            return (
              <div
                key={faq.id}
                id={`contact-faq-${faq.id}`}
                className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-xs sm:text-sm font-bold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 text-center">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
            Still have questions?
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Our dedicated support experts are here for you around the clock.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              id="contact-live-chat-btn"
              onClick={() => setChatModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Live Chat</span>
            </button>
            <button
              id="contact-callback-btn"
              onClick={() => setCallbackModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-200 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-slate-500" />
              <span>Request Callback</span>
            </button>
          </div>
        </div>
      </section>

      {/* Live Chat Modal */}
      {chatModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[500px] text-left">
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 font-bold text-xs">
                    SR
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 absolute -bottom-0.5 -right-0.5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">SwiftRide Support</h4>
                  <p className="text-[10px] text-emerald-400">Online • Typically replies in 2m</p>
                </div>
              </div>
              <button
                onClick={() => setChatModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-none'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChatMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={userChatInput}
                onChange={(e) => setUserChatInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Request Callback Modal */}
      {callbackModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-left relative">
            <button
              onClick={() => setCallbackModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <PhoneCall className="w-5 h-5" />
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1">Request a Phone Callback</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter your mobile number and a SwiftRide fleet support representative will call you back within 15 minutes.
            </p>

            {callbackSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                <Check className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                <p className="text-xs font-bold text-emerald-900">Callback Requested!</p>
                <p className="text-[11px] text-emerald-700">Expect a call from +1 (555) 000-0000 shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Submit Callback Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};