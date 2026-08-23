import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Smartphone, 
  Zap, 
  Check
} from 'lucide-react';
import { ASSETS } from '../data/scootersData';
import { UserProfile } from '../types';

interface SignUpPageProps {
  onSignUpSuccess: (user: Partial<UserProfile>) => void;
  onNavigateToLogin: () => void;
  onNavigateTerms?: () => void;
  onNavigatePrivacy?: () => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({
  onSignUpSuccess,
  onNavigateToLogin,
  onNavigateTerms,
  onNavigatePrivacy
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [subscribeNews, setSubscribeNews] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!agreeTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSignUpSuccess({
        name: fullName,
        email: email,
        phone: phone || '+1 (555) 123-4567',
        city: 'San Francisco, CA',
        tier: 'Gold Member',
        balance: 42.50,
        totalRides: 0
      });
    }, 750);
  };

  const handleSocialSignUp = (provider: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSignUpSuccess({
        name: `${provider} Commuter`,
        email: `rider@${provider.toLowerCase()}.com`,
        phone: '+1 (555) 987-6543',
        city: 'San Francisco, CA',
        tier: 'Gold Member',
        balance: 42.50,
        totalRides: 0
      });
    }, 600);
  };

  return (
    <div id="signup-page" className="w-full min-h-[calc(100vh-140px)] bg-[#f8fafc] flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
        {/* Left Column: Visual Banner */}
        <div className="lg:col-span-5 relative bg-[#091122] text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between overflow-hidden">
          {/* Background image & gradient overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105"
            style={{ backgroundImage: `url(${ASSETS.signupScooterCity || ASSETS.loginCitySkyscraper})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#091122] via-[#091122]/75 to-[#091122]/85" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Heading Section */}
          <div className="relative z-10 text-left pt-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.12] mb-5">
              Join the<br />
              <span className="text-emerald-400">Revolution</span> of<br />
              Urban Mobility.
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm mb-10">
              Create an account to unlock SwiftRide's premium fleet of electric scooters. Faster commutes, sustainable choices, and unmatched style.
            </p>

            {/* 3 Key Benefits */}
            <div className="space-y-5">
              {/* Feature 1 */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    Secure Payments
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-relaxed">
                    Enterprise-grade encryption for all your ride transactions.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    App Integration
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-relaxed">
                    Seamlessly unlock scooters with our high-performance mobile app.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    Swift Experience
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-relaxed">
                    From sign-up to first ride in less than 2 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom subtle brand note */}
          <div className="relative z-10 pt-6">
            <div className="h-0.5 w-12 bg-emerald-500/40 rounded-full" />
          </div>
        </div>

        {/* Right Column: Sign Up Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-white text-left">
          <div>
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1.5">
                Create your account
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Already have an account?{' '}
                <button
                  id="signup-to-login-link"
                  onClick={onNavigateToLogin}
                  className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            </div>

            {/* Social Buttons (Google & GitHub) */}
            <div className="grid grid-cols-2 gap-3.5 mb-5">
              <button
                type="button"
                id="signup-social-google"
                onClick={() => handleSocialSignUp('Google')}
                className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                id="signup-social-github"
                onClick={() => handleSocialSignUp('GitHub')}
                className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 fill-slate-800" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex py-2 items-center mb-4">
              <div className="flex-grow border-t border-slate-200" />
              <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                OR CONTINUE WITH EMAIL
              </span>
              <div className="flex-grow border-t border-slate-200" />
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    id="signup-fullname-input"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    id="signup-email-input"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    id="signup-phone-input"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="signup-password-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Must be at least 8 characters with 1 special symbol.
                </p>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2 pt-1">
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="signup-terms-check"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500 cursor-pointer"
                  />
                  <label htmlFor="signup-terms-check" className="text-xs text-slate-600 leading-snug cursor-pointer select-none">
                    I agree to the{' '}
                    <span className="text-emerald-600 font-semibold hover:underline">Terms of Service</span> and{' '}
                    <span className="text-emerald-600 font-semibold hover:underline">Privacy Policy</span>.
                  </label>
                </div>

                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="signup-news-check"
                    checked={subscribeNews}
                    onChange={(e) => setSubscribeNews(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500 cursor-pointer"
                  />
                  <label htmlFor="signup-news-check" className="text-xs text-slate-600 leading-snug cursor-pointer select-none">
                    Keep me updated with the latest news, offers, and urban mobility insights from SwiftRide.
                  </label>
                </div>
              </div>

              {/* Big Green Submit Button */}
              <button
                type="submit"
                id="signup-submit-button"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-70 mt-3"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Bottom Green Commuter Rewards Box */}
          <div className="mt-6 p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex items-center gap-3 text-left">
            <div className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              By joining, you get access to our <strong className="font-bold text-slate-900">Green Commuter Rewards</strong> program, earning credits for every sustainable mile you ride.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
