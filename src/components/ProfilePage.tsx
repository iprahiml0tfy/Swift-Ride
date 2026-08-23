import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Heart, 
  Bell, 
  Shield, 
  Smartphone, 
  LogOut, 
  Edit2, 
  History, 
  Wallet, 
  Star, 
  Check, 
  AlertCircle,
  Clock,
  Sparkles,
  Zap,
  ChevronRight,
  Plus,
  X
} from 'lucide-react';
import { ASSETS } from '../data/scootersData';
import { UserProfile, PageView } from '../types';

interface ProfilePageProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onLogout: () => void;
  onNavigate: (page: PageView) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onUpdateUser,
  onLogout,
  onNavigate
}) => {
  const [topTab, setTopTab] = useState<'Account' | 'Payments' | 'Favorites' | 'Alerts'>('Account');
  const [sidebarTab, setSidebarTab] = useState<
    'personal' | 'billing' | 'saved' | 'notifications' | 'privacy' | 'devices'
  >('personal');

  // Form states for Personal Information
  const [fullName, setFullName] = useState(user.name || 'Alex Sterling');
  const [emailAddress, setEmailAddress] = useState(user.email || 'alex.sterling@example.com');
  const [phoneNumber, setPhoneNumber] = useState(user.phone || '+1 (555) 123-4567');
  const [homeCity, setHomeCity] = useState(user.city || 'San Francisco, CA');
  const [isSaved, setIsSaved] = useState(false);

  // Modals
  const [topUpModalOpen, setTopUpModalOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('25');
  const [topUpSuccess, setTopUpSuccess] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [perksModalOpen, setPerksModalOpen] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name: fullName,
      email: emailAddress,
      phone: phoneNumber,
      city: homeCity
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleTopUpConfirm = () => {
    const amountNum = parseFloat(topUpAmount) || 0;
    onUpdateUser({
      balance: user.balance + amountNum
    });
    setTopUpSuccess(true);
    setTimeout(() => {
      setTopUpSuccess(false);
      setTopUpModalOpen(false);
    }, 1200);
  };

  return (
    <div id="profile-dashboard-page" className="w-full bg-[#f8fafc] text-slate-800 pb-20">
      {/* Top Dark Hero User Banner */}
      <section className="w-full bg-[#0a1120] text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* User Info Left */}
          <div className="flex items-center gap-5">
            {/* Avatar with Edit Badge */}
            <div className="relative shrink-0">
              <img
                src={user.avatarUrl || ASSETS.alexAvatar}
                alt={user.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-emerald-500/80 shadow-xl"
                referrerPolicy="no-referrer"
              />
              <button
                id="profile-avatar-edit-btn"
                title="Edit Avatar"
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-md transition-transform hover:scale-105 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Name, Badge, Email, Balance & Rides */}
            <div className="text-left space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {user.name}
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500 text-slate-950 shadow-sm">
                  {user.tier || 'Gold Member'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{user.email}</span>
              </p>

              <div className="flex items-center gap-6 pt-2">
                <div>
                  <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    BALANCE
                  </p>
                  <p className="text-lg sm:text-xl font-black text-white">
                    ${user.balance.toFixed(2)}
                  </p>
                </div>
                <div className="border-l border-slate-700/80 pl-6">
                  <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    TOTAL RIDES
                  </p>
                  <p className="text-lg sm:text-xl font-black text-white">
                    {user.totalRides}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Right: History & Top Up */}
          <div className="flex items-center gap-3 self-start md:self-center">
            <button
              id="profile-history-btn"
              onClick={() => setHistoryModalOpen(true)}
              className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <History className="w-4 h-4 text-slate-400" />
              <span>History</span>
            </button>

            <button
              id="profile-topup-btn"
              onClick={() => setTopUpModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              <Wallet className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>Top Up</span>
            </button>
          </div>
        </div>
      </section>

      {/* Top Segmented Navigation Tabs (Account, Payments, Favorites, Alerts) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="inline-flex bg-slate-200/70 p-1 rounded-xl">
          {(['Account', 'Payments', 'Favorites', 'Alerts'] as const).map((tab) => {
            const isActive = topTab === tab;
            return (
              <button
                key={tab}
                id={`profile-top-tab-${tab.toLowerCase()}`}
                onClick={() => {
                  setTopTab(tab);
                  if (tab === 'Payments') setSidebarTab('billing');
                  else if (tab === 'Favorites') setSidebarTab('saved');
                  else if (tab === 'Alerts') setSidebarTab('notifications');
                  else setSidebarTab('personal');
                }}
                className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Content Area: Left Menu Sidebar + Right Details Card */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Menu */}
          <div className="lg:col-span-4 space-y-1.5 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/90 shadow-sm text-left">
            <button
              id="profile-tab-personal"
              onClick={() => { setSidebarTab('personal'); setTopTab('Account'); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                sidebarTab === 'personal'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Personal Information</span>
            </button>

            <button
              id="profile-tab-billing"
              onClick={() => { setSidebarTab('billing'); setTopTab('Payments'); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                sidebarTab === 'billing'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Billing & Payments</span>
            </button>

            <button
              id="profile-tab-saved"
              onClick={() => { setSidebarTab('saved'); setTopTab('Favorites'); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                sidebarTab === 'saved'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Saved Scooters</span>
            </button>

            <button
              id="profile-tab-notifications"
              onClick={() => { setSidebarTab('notifications'); setTopTab('Alerts'); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                sidebarTab === 'notifications'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Notification Settings</span>
            </button>

            <button
              id="profile-tab-privacy"
              onClick={() => setSidebarTab('privacy')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                sidebarTab === 'privacy'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Privacy & Security</span>
            </button>

            <button
              id="profile-tab-devices"
              onClick={() => setSidebarTab('devices')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                sidebarTab === 'devices'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Connected Devices</span>
            </button>

            <div className="pt-2 border-t border-slate-100 mt-2">
              <button
                id="profile-btn-signout"
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Right Main Column */}
          <div className="lg:col-span-8 space-y-6 text-left">
            {sidebarTab === 'personal' && (
              <>
                {/* Profile Details Card */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm">
                  <div className="mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      Profile Details
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Update your personal information and public profile.
                    </p>
                  </div>

                  {isSaved && (
                    <div className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Profile changes saved successfully!</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveProfile}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            id="profile-fullname-input"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
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
                            id="profile-email-input"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            required
                            className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            id="profile-phone-input"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      {/* Home City */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Home City
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            id="profile-city-input"
                            value={homeCity}
                            onChange={(e) => setHomeCity(e.target.value)}
                            className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        id="profile-save-btn"
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>

                {/* Membership Tier Card */}
                <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4 text-emerald-500" />
                      <h3 className="text-sm font-bold text-slate-900">
                        Membership Tier
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-800">
                      You are currently a {user.tier || 'Gold Member'}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Unlock Platinum by completing {user.ridesNeededForNextTier || 26} more rides this month.
                    </p>
                  </div>

                  <button
                    id="profile-view-perks-btn"
                    onClick={() => setPerksModalOpen(true)}
                    className="px-4 py-2 rounded-xl border border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-xs font-semibold transition-colors shrink-0 self-start sm:self-center cursor-pointer"
                  >
                    View Perks
                  </button>
                </div>
              </>
            )}

            {/* Billing & Payments Sub-view */}
            {sidebarTab === 'billing' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Billing & Payment Methods</h2>
                    <p className="text-xs text-slate-500">Manage your cards, digital wallets, and auto-refill.</p>
                  </div>
                  <button
                    onClick={() => setTopUpModalOpen(true)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Funds</span>
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-slate-900 rounded text-white flex items-center justify-center text-[10px] font-bold">
                        VISA
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Visa ending in 4242</p>
                        <p className="text-[11px] text-slate-500">Expires 09/28 • Default method</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Primary
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-blue-600 rounded text-white flex items-center justify-center text-[10px] font-bold">
                        MC
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Mastercard ending in 8819</p>
                        <p className="text-[11px] text-slate-500">Expires 04/27</p>
                      </div>
                    </div>
                    <button className="text-xs font-semibold text-slate-500 hover:text-slate-800">
                      Make Default
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Saved Scooters Sub-view */}
            {sidebarTab === 'saved' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-slate-900">Saved & Favorite Scooters</h2>
                <p className="text-xs text-slate-500">Fast access to your preferred models in nearby hubs.</p>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-xs font-bold text-emerald-950">SwiftPro X (Flagship)</p>
                      <p className="text-[11px] text-emerald-700">Downtown Ferry Terminal Hub • 98% Battery</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('rentals')}
                    className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg"
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Sub-view */}
            {sidebarTab === 'notifications' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-slate-900">Notification Preferences</h2>
                <div className="space-y-3 text-xs text-slate-700">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span>Ride trip summaries & digital receipts</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span>Exclusive promotional codes and seasonal passes</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span>Battery safety alerts and parking zone updates</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
                  </label>
                </div>
              </div>
            )}

            {/* Privacy & Security Sub-view */}
            {sidebarTab === 'privacy' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-slate-900">Privacy & Security Controls</h2>
                <p className="text-xs text-slate-500">Manage two-factor authentication and telemetry data.</p>
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Two-Factor Authentication (2FA)</p>
                      <p className="text-[11px] text-slate-500">Enabled via SMS to {user.phone}</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">Active</span>
                  </div>
                </div>
              </div>
            )}

            {/* Connected Devices Sub-view */}
            {sidebarTab === 'devices' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-slate-900">Authorized Connected Devices</h2>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-slate-700" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">iPhone 15 Pro • SwiftRide iOS App</p>
                      <p className="text-[11px] text-slate-500">Last active 10 mins ago • San Francisco, CA</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">Current</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Top Up Balance Modal */}
      {topUpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 relative text-left">
            <button
              onClick={() => setTopUpModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Wallet className="w-5 h-5" />
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1">Top Up Wallet Balance</h3>
            <p className="text-xs text-slate-500 mb-4">
              Add funds to your SwiftRide balance for instant ride unlock and commuter discounts.
            </p>

            {topUpSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                <Check className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                <p className="text-xs font-bold text-emerald-900">Balance Added!</p>
                <p className="text-[11px] text-emerald-700">Your wallet has been updated with +${topUpAmount}.00</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Select Amount</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['15', '25', '50'].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setTopUpAmount(amt)}
                        className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                          topUpAmount === amt
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleTopUpConfirm}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  Confirm Top Up (${topUpAmount}.00)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Ride History Modal */}
      {historyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative text-left">
            <button
              onClick={() => setHistoryModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <History className="w-5 h-5" />
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1">Recent Trip History</h3>
            <p className="text-xs text-slate-500 mb-4">
              Here are your most recent journeys across the city.
            </p>

            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {[
                { id: '1', date: 'Yesterday, 5:45 PM', duration: '18 mins', distance: '3.4 mi', cost: '$5.50', model: 'SwiftPro X' },
                { id: '2', date: 'Aug 21, 8:15 AM', duration: '12 mins', durationSec: '2.1 mi', cost: '$3.80', model: 'SwiftLite Urban' },
                { id: '3', date: 'Aug 19, 6:30 PM', duration: '24 mins', distance: '4.8 mi', cost: '$7.20', model: 'SwiftPro X' },
                { id: '4', date: 'Aug 18, 12:10 PM', duration: '8 mins', distance: '1.2 mi', cost: '$2.90', model: 'EcoGlide Series' },
              ].map((trip) => (
                <div key={trip.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-900">{trip.model}</p>
                    <p className="text-[11px] text-slate-500">{trip.date} • {trip.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">{trip.cost}</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">Completed</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  setHistoryModalOpen(false);
                  onNavigate('my-bookings');
                }}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Go to My Bookings Hub →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gold Perks Modal */}
      {perksModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative text-left">
            <button
              onClick={() => setPerksModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Star className="w-5 h-5" />
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1">Gold Member Benefits</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enjoy exclusive rewards as a top-tier SwiftRide commuter:
            </p>

            <div className="space-y-2.5 text-xs text-slate-700 mb-6">
              <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Free Unlock:</strong> $0 unlock fee on all weekday rides.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>15% Minute Discount:</strong> Reduced rate on all Pro series scooters.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Priority Booking:</strong> Reserve a scooter up to 30 mins in advance.</span>
              </div>
            </div>

            <button
              onClick={() => setPerksModalOpen(false)}
              className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
