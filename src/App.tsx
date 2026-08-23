/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageView, Scooter, ActiveRide, DockingLocation, UserProfile, BookingReservation } from './types';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ScootersPage } from './components/ScootersPage';
import { LocationsPage } from './components/LocationsPage';
import { ScooterDetailPage } from './components/ScooterDetailPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { OffersPage } from './components/OffersPage';
import { AboutUsPage } from './components/AboutUsPage';
import { ContactUsPage } from './components/ContactUsPage';
import { FaqPage } from './components/FaqPage';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { ProfilePage } from './components/ProfilePage';
import { BookingReservationPage } from './components/BookingReservationPage';
import { CheckoutPage } from './components/CheckoutPage';
import { BookingConfirmationPage } from './components/BookingConfirmationPage';
import { BookingDetailsPage } from './components/BookingDetailsPage';
import { UnlockScooterPage } from './components/UnlockScooterPage';
import { ActiveRidePage } from './components/ActiveRidePage';
import { RateScooterPage } from './components/RateScooterPage';
import { MyBookingsPage } from './components/MyBookingsPage';
import { BookingModal } from './components/BookingModal';
import { LocationsModal } from './components/LocationsModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { OffersModal } from './components/OffersModal';
import { ActiveRideBar } from './components/ActiveRideBar';
import { RideSummaryModal } from './components/RideSummaryModal';
import { FLAGSHIP_SCOOTER, ASSETS } from './data/scootersData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>({
    name: 'Alex Sterling',
    email: 'alex.sterling@example.com',
    phone: '+1 (555) 123-4567',
    city: 'San Francisco, CA',
    tier: 'Gold Member',
    balance: 42.50,
    totalRides: 124,
    avatarUrl: ASSETS.alexAvatar,
    ridesNeededForNextTier: 26,
  });
  
  // Scooter for Detail View
  const [selectedScooterForDetail, setSelectedScooterForDetail] = useState<Scooter>(FLAGSHIP_SCOOTER);

  // Modals & Active state
  const [selectedScooterToBook, setSelectedScooterToBook] = useState<Scooter | null>(null);
  const [locationsModalOpen, setLocationsModalOpen] = useState(false);
  const [howItWorksModalOpen, setHowItWorksModalOpen] = useState(false);
  const [offersModalOpen, setOffersModalOpen] = useState(false);
  
  // Active Ride Tracker
  const [activeRide, setActiveRide] = useState<ActiveRide | null>(null);
  const [completedRide, setCompletedRide] = useState<{
    scooterName: string;
    model: string;
    durationMinutes: number;
    totalCost: number;
    co2SavedGrams: number;
  } | null>(null);

  // Reservations List
  const [reservations, setReservations] = useState<BookingReservation[]>([
    {
      id: 'SR-8842',
      scooterName: 'Swift Glide',
      scooterModel: 'Model B',
      scooterImage: ASSETS.foldingScooter,
      date: 'Tomorrow, Oct 25',
      timeWindow: '10:00 AM - 12:00 PM',
      location: 'Central Park North Dock',
      dockNumber: '#14',
      totalCost: 12.00,
      status: 'Reserved',
      durationHours: 2,
      withProtection: true,
      withHelmet: true,
    },
  ]);

  // Current In-Progress Booking Draft and Confirmed Booking
  const [bookingDraft, setBookingDraft] = useState<Partial<BookingReservation>>({
    id: 'SR-882941-X',
    scooterName: 'Swift Urban Pro',
    scooterModel: 'Model A',
    scooterImage: ASSETS.commuter,
    date: 'October 24, 2026',
    timeWindow: '10:00 AM • 2 Hours',
    location: 'Central Park North, Dock #14',
    dockNumber: '#14',
    durationHours: 2,
    totalCost: 30.50,
    withProtection: true,
    withHelmet: true
  });
  
  const [confirmedBooking, setConfirmedBooking] = useState<BookingReservation | null>(null);

  const handleProceedToCheckout = (draft: Partial<BookingReservation>) => {
    setBookingDraft(draft);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingConfirmed = (newReservation: BookingReservation) => {
    setReservations((prev) => [newReservation, ...prev]);
    setConfirmedBooking(newReservation);
    setCurrentPage('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (user: { name: string; email: string }) => {
    setCurrentUser((prev) => ({
      name: user.name,
      email: user.email,
      phone: prev?.phone || '+1 (555) 123-4567',
      city: prev?.city || 'San Francisco, CA',
      tier: prev?.tier || 'Gold Member',
      balance: prev?.balance || 42.50,
      totalRides: prev?.totalRides || 124,
      avatarUrl: prev?.avatarUrl || ASSETS.alexAvatar,
      ridesNeededForNextTier: prev?.ridesNeededForNextTier || 26,
    }));
    setCurrentPage('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignUpSuccess = (newUser: Partial<UserProfile>) => {
    setCurrentUser({
      name: newUser.name || 'Alex Sterling',
      email: newUser.email || 'alex.sterling@example.com',
      phone: newUser.phone || '+1 (555) 123-4567',
      city: newUser.city || 'San Francisco, CA',
      tier: newUser.tier || 'Gold Member',
      balance: newUser.balance ?? 42.50,
      totalRides: newUser.totalRides ?? 0,
      avatarUrl: ASSETS.alexAvatar,
      ridesNeededForNextTier: 26,
    });
    setCurrentPage('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setCurrentUser((prev) => (prev ? { ...prev, ...updated } : null));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const handleViewScooterDetail = (scooter: Scooter) => {
    const enriched: Scooter = {
      ...FLAGSHIP_SCOOTER,
      ...scooter,
      galleryImages: scooter.galleryImages || [scooter.image, FLAGSHIP_SCOOTER.galleryImages?.[1] || scooter.image, FLAGSHIP_SCOOTER.galleryImages?.[2] || scooter.image],
    };
    setSelectedScooterForDetail(enriched);
    setCurrentPage('scooter-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartRide = (scooter: Scooter) => {
    setSelectedScooterToBook(null);
    setActiveRide({
      scooter,
      startTime: Date.now(),
      elapsedSeconds: 742,
      cost: 4.80,
      isPaused: false,
    });
    setCurrentPage('active-ride');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePauseToggle = () => {
    if (!activeRide) return;
    setActiveRide((prev) => prev ? { ...prev, isPaused: !prev.isPaused } : null);
  };

  const handleEndRide = () => {
    if (!activeRide) {
      setCurrentPage('rate-scooter');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elapsedMinutes = Math.max(1, Math.ceil(activeRide.elapsedSeconds / 60));
    setCompletedRide({
      scooterName: activeRide.scooter.name,
      model: activeRide.scooter.model,
      durationMinutes: elapsedMinutes,
      totalCost: 8.75,
      co2SavedGrams: elapsedMinutes * 120,
    });
    setActiveRide(null);
    setCurrentPage('rate-scooter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (currentPage !== 'rentals' && query.trim().length > 0) {
      setCurrentPage('rentals');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-emerald-500 selection:text-white transition-colors w-full overflow-x-hidden">
      
      {/* 1. Navbar يوضع في قمة الصفحة تماماً وبأقصى عرض */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenLocations={() => handleNavigate('locations')}
        onOpenHowItWorks={() => setHowItWorksModalOpen(true)}
        onOpenOffers={() => setOffersModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* 2. الحاوية السفلى التي تجمع القائمة الجانبية (Sidebar) ومحتوى الصفحات */}
      <div className="flex flex-1 w-full relative">
        
        {/* Sidebar الجانبي */}
        <Sidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />

        {/* محتوى الصفحات مع ترك مسافة يسار (md:pl-20) ومسافة علوية (pt-20) للـ Navbar */}
        <div className="flex-1 flex flex-col min-w-0 md:pl-20 lg:pl-24 pt-20 transition-all">
          
          <main className="flex-1 flex flex-col">
            {currentPage === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onBookScooter={(scooter) => setSelectedScooterToBook(scooter)}
                onViewScooterDetail={handleViewScooterDetail}
                onOpenHowItWorks={() => setHowItWorksModalOpen(true)}
                onOpenLocations={() => handleNavigate('locations')}
                onOpenOffers={() => setOffersModalOpen(true)}
              />
            )}

            {currentPage === 'rentals' && (
              <ScootersPage
                onBookScooter={(scooter) => setSelectedScooterToBook(scooter)}
                onViewScooterDetail={handleViewScooterDetail}
                onOpenHowItWorks={() => setHowItWorksModalOpen(true)}
                onOpenOffers={() => setOffersModalOpen(true)}
                initialSearchQuery={searchQuery}
              />
            )}

            {currentPage === 'locations' && (
              <LocationsPage
                onSelectScooter={(scooter) => setSelectedScooterToBook(scooter)}
                onOpenBookingModal={(loc) => {
                  setSelectedScooterToBook({
                    id: `dock-${loc.id}-scooter`,
                    name: `Swift Urban Pro (${loc.name})`,
                    model: 'Model A',
                    rangeMiles: 45,
                    topSpeedMph: 20,
                    location: `${loc.name} • ${loc.distance}`,
                    distanceMiles: loc.distanceNum,
                    pricePerMin: 1.50,
                    status: 'available',
                    image: FLAGSHIP_SCOOTER.image,
                    batteryPercentage: 94,
                    dockingZone: loc.name,
                  });
                }}
              />
            )}

            {currentPage === 'how-it-works' && (
              <HowItWorksPage
                onNavigateToRentals={() => handleNavigate('rentals')}
                onNavigateToLocations={() => handleNavigate('locations')}
              />
            )}

            {currentPage === 'offers' && (
              <OffersPage
                onNavigateToRentals={() => handleNavigate('rentals')}
                onNavigateToLocations={() => handleNavigate('locations')}
              />
            )}

            {currentPage === 'about' && (
              <AboutUsPage
                onNavigateToRentals={() => handleNavigate('rentals')}
                onNavigateToContact={() => handleNavigate('contact')}
                onNavigateHome={() => handleNavigate('home')}
              />
            )}

            {currentPage === 'contact' && (
              <ContactUsPage
                onNavigateToFAQ={() => handleNavigate('faq')}
                onNavigateToOffers={() => handleNavigate('offers')}
              />
            )}

            {currentPage === 'faq' && (
              <FaqPage
                onNavigateToContact={() => handleNavigate('contact')}
                onNavigateToLocations={() => handleNavigate('locations')}
                onOpenHowItWorks={() => setHowItWorksModalOpen(true)}
                onOpenLocations={() => setLocationsModalOpen(true)}
              />
            )}

            {currentPage === 'login' && (
              <LoginPage
                onLoginSuccess={handleLoginSuccess}
                onNavigateHome={() => handleNavigate('home')}
                onNavigateToRentals={() => handleNavigate('rentals')}
                onNavigateToSignUp={() => handleNavigate('signup')}
              />
            )}

            {currentPage === 'signup' && (
              <SignUpPage
                onSignUpSuccess={handleSignUpSuccess}
                onNavigateToLogin={() => handleNavigate('login')}
              />
            )}

            {currentPage === 'profile' && currentUser && (
              <ProfilePage
                user={currentUser}
                onUpdateUser={handleUpdateUser}
                onLogout={handleLogout}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'booking' && (
              <BookingReservationPage
                scooter={selectedScooterForDetail}
                onProceedToConfirmation={handleBookingConfirmed}
                onProceedToCheckout={handleProceedToCheckout}
                onNavigate={handleNavigate}
                onSelectScooter={(scooter) => {
                  setSelectedScooterForDetail(scooter);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {currentPage === 'checkout' && (
              <CheckoutPage
                scooter={selectedScooterForDetail}
                reservationDraft={bookingDraft}
                onConfirmAndPay={handleBookingConfirmed}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'confirmation' && (
              <BookingConfirmationPage
                booking={confirmedBooking || (reservations[0] as BookingReservation)}
                onNavigate={handleNavigate}
                onSelectScooter={(scooter) => {
                  setSelectedScooterForDetail(scooter);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {currentPage === 'my-bookings' && (
              <MyBookingsPage
                onNavigate={handleNavigate}
                onStartRide={handleStartRide}
                initialReservations={reservations}
              />
            )}

            {currentPage === 'booking-details' && (
              <BookingDetailsPage
                booking={confirmedBooking || (reservations[0] as BookingReservation)}
                onNavigate={handleNavigate}
                onStartRide={handleStartRide}
              />
            )}

            {currentPage === 'unlock-scooter' && (
              <UnlockScooterPage
                scooterName={confirmedBooking?.scooterName || selectedScooterForDetail.name || 'Swift Urban Pro'}
                vehicleId={confirmedBooking?.id ? `SR-${confirmedBooking.id.replace(/\D/g, '')}` : 'SR-V882'}
                onNavigate={handleNavigate}
                onRideStarted={handleStartRide}
              />
            )}

            {currentPage === 'active-ride' && (
              <ActiveRidePage
                scooterName={activeRide?.scooter.name || confirmedBooking?.scooterName || 'Swift Urban Pro'}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'rate-scooter' && (
              <RateScooterPage
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'scooter-detail' && (
              <ScooterDetailPage
                scooter={selectedScooterForDetail}
                onBackToFleet={() => handleNavigate('rentals')}
                onBookScooter={(scooter) => {
                  setSelectedScooterForDetail(scooter);
                  handleNavigate('booking');
                }}
                onLocateOnMap={() => handleNavigate('locations')}
                onSelectRelatedScooter={(scooter) => handleViewScooterDetail(scooter)}
              />
            )}
          </main>

          {/* Footer */}
          <Footer
            onNavigate={handleNavigate}
            onOpenHowItWorks={() => handleNavigate('how-it-works')}
            onOpenLocations={() => handleNavigate('locations')}
            onOpenOffers={() => handleNavigate('offers')}
          />
        </div>

      </div>

      {/* Floating Active Ride Bar */}
      {currentPage !== 'active-ride' && (
        <ActiveRideBar
          ride={activeRide}
          onPauseToggle={handlePauseToggle}
          onEndRide={handleEndRide}
        />
      )}

      {/* Booking & Unlock Modal */}
      <BookingModal
        scooter={selectedScooterToBook}
        onClose={() => setSelectedScooterToBook(null)}
        onStartRide={handleStartRide}
      />

      {/* Locations & Docking Stations Modal */}
      <LocationsModal
        isOpen={locationsModalOpen}
        onClose={() => setLocationsModalOpen(false)}
      />

      {/* How It Works Guide Modal */}
      <HowItWorksModal
        isOpen={howItWorksModalOpen}
        onClose={() => setHowItWorksModalOpen(false)}
        onExploreRentals={() => {
          setHowItWorksModalOpen(false);
          handleNavigate('rentals');
        }}
      />

      {/* Offers & Promo Modal */}
      <OffersModal
        isOpen={offersModalOpen}
        onClose={() => setOffersModalOpen(false)}
        onExploreRentals={() => {
          setOffersModalOpen(false);
          handleNavigate('rentals');
        }}
      />

      {/* Ride Completed Receipt Modal */}
      <RideSummaryModal
        completedRide={completedRide}
        onClose={() => setCompletedRide(null)}
      />

    </div>
  );
}