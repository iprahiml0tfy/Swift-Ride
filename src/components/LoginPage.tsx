import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Check, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  QrCode, 
  Compass, 
  User, 
  CheckCircle2, 
  X,
  Building
} from 'lucide-react';
import { ASSETS } from '../data/scootersData';

interface LoginPageProps {
  onLoginSuccess: (user: { name: string; email: string }) => void;
  onNavigateHome: () => void;
  onNavigateToRentals: () => void;
  onNavigateToSignUp?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigateHome,
  onNavigateToRentals,
  onNavigateToSignUp
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const [teamsModalOpen, setTeamsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const userName = name.trim() || email.split('@')[0] || 'SwiftRider';
      onLoginSuccess({
        name: userName.charAt(0).toUpperCase() + userName.slice(1),
        email: email
      });
    }, 800);
  };

  const handleSocialLogin = (provider: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        name: `Rider via ${provider}`,
        email: `user@${provider.toLowerCase()}.com`
      });
    }, 600);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSubmitted(true);
    setTimeout(() => {
      setForgotSubmitted(false);
      setForgotModalOpen(false);
      setForgotEmail('');
    }, 2500);
  };

  return (
    <div id="login-auth-page" className="w-full min-h-[calc(100vh-140px)] bg-[#f8fafc] flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Column: Visual Skyline Hero Card */}
        <div className="lg:col-span-6 relative bg-slate-950 text-white p-8 sm:p-12 flex flex-col justify-between overflow-hidden">
          {/* Background Image with Dark Gradient & Teal Vignette */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-luminosity scale-105"
            style={{ backgroundImage: `url(${ASSETS.loginCitySkyscraper || ASSETS.contactCityNight})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/80" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Logo */}
          <div className="relative z-10 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-md shadow-emerald-500/30">
              <Zap className="w-5 h-5 fill-slate-950" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">SwiftRide</span>
          </div>

          {/* Middle Body Copy */}
          <div className="relative z-10 my-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15] mb-5 text-left">
              Urban mobility,<br />
              <span className="text-emerald-400">redefined.</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md mb-8 text-left">
              Experience the next generation of city commuting. Sustainable, fast, and perfectly integrated into your digital lifestyle.
            </p>

            {/* Feature Checklist */}
            <div className="space-y-3.5 text-left">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-200">Premium Fleet access</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-200">Smart route optimization</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-200">Instant unlocking via QR</span>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="relative z-10 text-left pt-4 border-t border-slate-800/80">
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              SWIFTRIDE MOBILITY TECHNOLOGIES © 2024
            </p>
          </div>
        </div>

        {/* Right Column: Authentication Form Card */}
        <div className="lg:col-span-6 p-6 sm:p-10 md:p-12 flex flex-col justify-between bg-white text-left">
          <div>
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                {isSignUp ? 'Create an Account' : 'Welcome Back'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                {isSignUp 
                  ? 'Join millions of urban riders and start exploring today.' 
                  : 'Enter your credentials to access your SwiftRide account.'}
              </p>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {/* Google */}
              <button
                type="button"
                id="login-social-google"
                onClick={() => handleSocialLogin('Google')}
                className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer"
                title="Sign in with Google"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </button>

              {/* GitHub */}
              <button
                type="button"
                id="login-social-github"
                onClick={() => handleSocialLogin('GitHub')}
                className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer"
                title="Sign in with GitHub"
              >
                <svg className="w-4 h-4 fill-slate-800" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </button>

              {/* Twitter / X */}
              <button
                type="button"
                id="login-social-twitter"
                onClick={() => handleSocialLogin('Twitter')}
                className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer"
                title="Sign in with Twitter / X"
              >
                <svg className="w-4 h-4 fill-slate-800" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex py-2 items-center mb-5">
              <div className="flex-grow border-t border-slate-200" />
              <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                OR CONTINUE WITH EMAIL
              </span>
              <div className="flex-grow border-t border-slate-200" />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={isSignUp}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    id="login-email-input"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  {!isSignUp && (
                    <button
                      type="button"
                      id="login-forgot-password-btn"
                      onClick={() => setForgotModalOpen(true)}
                      className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="login-password-input"
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
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500 cursor-pointer"
                />
                <label htmlFor="remember-me" className="text-xs text-slate-600 select-none cursor-pointer">
                  Keep me logged in for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="login-submit-button"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-70 mt-2"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isSignUp ? 'Create Free Account' : 'Sign In to Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Toggle Sign Up / Sign In */}
            <div className="mt-5 text-center">
              <p className="text-xs text-slate-500">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  id="login-toggle-signup-btn"
                  onClick={() => {
                    if (onNavigateToSignUp && !isSignUp) {
                      onNavigateToSignUp();
                    } else {
                      setIsSignUp(!isSignUp);
                    }
                  }}
                  className="font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                >
                  {isSignUp ? 'Sign in here' : 'Create one for free'}
                </button>
              </p>
            </div>
          </div>

          {/* Teams Promo Banner Card at bottom */}
          <div className="mt-8 p-3.5 bg-slate-50 border border-slate-200/90 rounded-2xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-none">SwiftRide for Teams</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Manage your employee fleet dashboard</p>
              </div>
            </div>
            <button
              onClick={() => setTeamsModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-bold shrink-0 transition-colors cursor-pointer"
            >
              Join →
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 relative text-left">
            <button
              onClick={() => setForgotModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Lock className="w-5 h-5" />
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1">Reset Your Password</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter your email address and we'll send a secure password reset link to your inbox.
            </p>

            {forgotSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                <p className="text-xs font-bold text-emerald-900">Reset Email Sent</p>
                <p className="text-[11px] text-emerald-700">Check your inbox for password recovery instructions.</p>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Send Reset Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* SwiftRide for Teams Modal */}
      {teamsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative text-left">
            <button
              onClick={() => setTeamsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Building className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-1">SwiftRide for Enterprise Teams</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Equip your corporate workforce or campus with subsidized zero-carbon commuter passes, centralized billing, and custom dock hubs.
            </p>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 mb-5 text-xs text-slate-700">
              <p className="flex items-center gap-2">✓ Centralized company billing dashboard</p>
              <p className="flex items-center gap-2">✓ Up to 40% discount on volume monthly passes</p>
              <p className="flex items-center gap-2">✓ Dedicated fleet maintenance & parking zones</p>
            </div>

            <button
              onClick={() => {
                setTeamsModalOpen(false);
                alert('Thank you! Our enterprise sales team will contact you at enterprise@swiftride.com.');
              }}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl"
            >
              Request Enterprise Demo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
