export type PageView = 
  | 'home' 
  | 'rentals' 
  | 'locations' 
  | 'scooter-detail' 
  | 'how-it-works' 
  | 'offers' 
  | 'about' 
  | 'contact' 
  | 'faq' 
  | 'login' 
  | 'signup' 
  | 'profile' 
  | 'booking' 
  | 'checkout'
  | 'confirmation'
  | 'booking-details'
  | 'unlock-scooter'
  | 'active-ride'
  | 'rate-scooter'
  | 'my-bookings';

export interface BookingReservation {
  id: string;
  scooterName: string;
  scooterModel: string;
  scooterImage: string;
  date: string;
  timeWindow: string;
  location: string;
  dockNumber?: string;
  totalCost: number;
  status: 'Reserved' | 'Active' | 'Completed' | 'Cancelled';
  durationHours: number;
  withProtection: boolean;
  withHelmet: boolean;
  paymentMethod?: string;
  cardLast4?: string;
  promoCode?: string;
  discountAmount?: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  city: string;
  tier: 'Standard' | 'Gold Member' | 'Platinum Member';
  balance: number;
  totalRides: number;
  avatarUrl?: string;
  ridesNeededForNextTier: number;
}

export interface Scooter {
  id: string;
  name: string;
  model: string;
  series?: string;
  rangeMiles: number;
  topSpeedMph: number;
  weightLbs?: number;
  chargeTimeHours?: number;
  location: string;
  distanceMiles: number;
  pricePerMin: number;
  unlockFare?: number;
  status: 'available' | 'rented' | 'maintenance';
  image: string;
  galleryImages?: string[];
  batteryPercentage?: number;
  dockingZone?: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  tag?: string;
  description?: string;
  features?: string[];
  featureDetails?: { title: string; desc: string }[];
}

export interface DockingLocation {
  id: string;
  name: string;
  address: string;
  distance: string;
  distanceNum: number;
  availableCount: number;
  slotsRatio: string;
  totalSlots: number;
  rating: number;
  lat: number;
  lng: number;
  mapX: number; // percentage X on visual map (0-100)
  mapY: number; // percentage Y on visual map (0-100)
}

export interface FilterState {
  searchQuery: string;
  selectedModel: string;
  sortBy: 'popular' | 'price-low' | 'range-high' | 'speed-high';
  onlyAvailable: boolean;
  maxPrice?: number;
}

export interface ActiveRide {
  scooter: Scooter;
  startTime: number;
  elapsedSeconds: number;
  cost: number;
  isPaused: boolean;
}

export interface PromoOffer {
  id: string;
  title: string;
  category: 'all' | 'seasonal' | 'students' | 'commuters';
  discountText: string;
  discountBadge?: string;
  description: string;
  expires: string;
  code: string;
  badge?: 'Most Popular' | 'Best Value' | 'Exclusive';
  image: string;
  isPrimary?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface HowItWorksStep {
  number: number;
  title: string;
  description: string;
  image: string;
  alt: string;
  iconType: 'pin' | 'qr' | 'bolt' | 'nav' | 'park' | 'receipt';
}

