import { Scooter, DockingLocation, PromoOffer, FaqItem, HowItWorksStep } from '../types';

// Asset imports
import heroScooterImg from '../assets/images/hero_scooter_1787480651795.jpg';
import commuterImg from '../assets/images/commuter_red_jacket_1787480668784.jpg';
import foldingScooterImg from '../assets/images/folding_scooter_1787480685838.jpg';
import performanceScooterImg from '../assets/images/performance_scooter_1787480698816.jpg';
import stealthScooterImg from '../assets/images/stealth_scooter_1787480732883.jpg';
import ecoCityImg from '../assets/images/eco_city_art_1787480714564.jpg';
import scooterCockpitImg from '../assets/images/scooter_cockpit_1787481275055.jpg';
import scooterWheelSuspensionImg from '../assets/images/scooter_wheel_suspension_1787481290605.jpg';
import proXCityStreetImg from '../assets/images/pro_x_city_street_1787481303377.jpg';
import locateRideImg from '../assets/images/locate_ride_art_1787481639255.jpg';
import scanUnlockImg from '../assets/images/scan_unlock_art_1787481651745.jpg';
import kickoffGoImg from '../assets/images/kickoff_go_art_1787481662281.jpg';
import parkDockImg from '../assets/images/park_dock_art_1787481672034.jpg';
import studentScooterImg from '../assets/images/student_scooter_art_1787481686627.jpg';
import nightRiderImg from '../assets/images/night_rider_art_1787481698416.jpg';
import aboutOfficeTeamImg from '../assets/images/about_office_team_1787482182821.jpg';
import ecoCityGreenImg from '../assets/images/eco_city_green_1787482199071.jpg';
import contactCityNightImg from '../assets/images/contact_city_night_1787482212308.jpg';
import loginCitySkyscraperImg from '../assets/images/login_city_skyscraper_1787482728128.jpg';
import alexAvatarImg from '../assets/images/alex_avatar_profile_1787483322304.jpg';
import signupScooterCityImg from '../assets/images/signup_scooter_city_1787483343461.jpg';
import centralParkMapImg from '../assets/images/central_park_hub_map_1787483981599.jpg';
import bookingSuccessScooterImg from '../assets/images/booking_success_scooter_1787484644207.jpg';
import isometricCityMapImg from '../assets/images/isometric_city_map_1787485196192.jpg';
import scooterHandlebarsScannerImg from '../assets/images/scooter_handlebars_scanner_1787485209619.jpg';
import cyberRouteMapImg from '../assets/images/cyber_route_map_1787485836756.jpg';
import sunsetScooterCityImg from '../assets/images/sunset_scooter_city_1787485850482.jpg';

export const ASSETS = {
  heroScooter: heroScooterImg,
  commuter: commuterImg,
  foldingScooter: foldingScooterImg,
  performanceScooter: performanceScooterImg,
  stealthScooter: stealthScooterImg,
  ecoCity: ecoCityImg,
  scooterCockpit: scooterCockpitImg,
  scooterWheelSuspension: scooterWheelSuspensionImg,
  proXCityStreet: proXCityStreetImg,
  locateRide: locateRideImg,
  scanUnlock: scanUnlockImg,
  kickoffGo: kickoffGoImg,
  parkDock: parkDockImg,
  studentScooter: studentScooterImg,
  nightRider: nightRiderImg,
  aboutOfficeTeam: aboutOfficeTeamImg,
  ecoCityGreen: ecoCityGreenImg,
  contactCityNight: contactCityNightImg,
  loginCitySkyscraper: loginCitySkyscraperImg,
  alexAvatar: alexAvatarImg,
  signupScooterCity: signupScooterCityImg,
  centralParkMap: centralParkMapImg,
  bookingSuccessScooter: bookingSuccessScooterImg,
  isometricCityMap: isometricCityMapImg,
  scooterHandlebarsScanner: scooterHandlebarsScannerImg,
  cyberRouteMap: cyberRouteMapImg,
  sunsetScooterCity: sunsetScooterCityImg,
};

// Flagship Scooter for Detail Page (visily-scooter-details.jpg)
export const FLAGSHIP_SCOOTER: Scooter = {
  id: 'swift-urban-pro-x',
  name: 'Swift Urban Pro X',
  model: 'Model A+',
  series: '2024 FLAGSHIP SERIES',
  rangeMiles: 55,
  topSpeedMph: 28,
  weightLbs: 38,
  chargeTimeHours: 4,
  location: 'Mission District • 0.3 miles',
  distanceMiles: 0.3,
  pricePerMin: 0.45,
  unlockFare: 1.00,
  status: 'available',
  rating: 4.9,
  reviewCount: 128,
  badge: 'Premium Fleet',
  tag: 'New 2024 Model',
  image: heroScooterImg,
  galleryImages: [
    heroScooterImg,
    scooterCockpitImg,
    scooterWheelSuspensionImg
  ],
  batteryPercentage: 92,
  dockingZone: 'Mission District Hub',
  description: 'The Swift Urban Pro X represents the pinnacle of urban mobility. Engineered with a lightweight aerospace-grade aluminum frame and high-torque dual motors, it delivers a smooth, powerful ride that conquers hills and traffic with ease. Perfect for the modern commuter who values both performance and aesthetics.',
  features: [
    'Aerospace Aluminum Alloy Chassis',
    'Dual 500W Brushless High-Torque Motors',
    'Full Regenerative E-ABS & Dual Hydraulic Disc Brakes',
    'Intelligent Dynamic LED Headlamp & Smart Taillights',
    'Integrated 4.5" Color Cockpit Telemetry Display',
    'Bluetooth 5.3 Smart BLE Locking & GPS Tracking'
  ],
  featureDetails: [
    {
      title: 'Smooth Suspension',
      desc: 'Dual spring suspension absorbs urban bumps effortlessly.'
    },
    {
      title: 'Portable Design',
      desc: 'Folds in 3 seconds for easy storage in trunks or offices.'
    }
  ]
};

// Recommended "You Might Also Like" models (visily-scooter-details.jpg bottom row)
export const RELATED_SCOOTERS: Scooter[] = [
  {
    id: 'rec-1',
    name: 'Swift Urban Lite',
    model: 'MODEL B',
    rangeMiles: 35,
    topSpeedMph: 18,
    location: 'Central Park North • 0.2 miles',
    distanceMiles: 0.2,
    pricePerMin: 0.35,
    status: 'available',
    image: foldingScooterImg,
    batteryPercentage: 88,
  },
  {
    id: 'rec-2',
    name: 'Swift Mountain Duo',
    model: 'MODEL C',
    rangeMiles: 60,
    topSpeedMph: 28,
    location: 'Mission District • 0.5 miles',
    distanceMiles: 0.5,
    pricePerMin: 0.55,
    status: 'available',
    image: performanceScooterImg,
    batteryPercentage: 96,
  },
  {
    id: 'rec-3',
    name: 'Swift Eco Commuter',
    model: 'MODEL A',
    rangeMiles: 45,
    topSpeedMph: 20,
    location: 'Broadway Hub • 0.4 miles',
    distanceMiles: 0.4,
    pricePerMin: 0.40,
    status: 'available',
    image: commuterImg,
    batteryPercentage: 91,
  },
  {
    id: 'rec-4',
    name: 'Swift Urban Pro X+',
    model: 'LIMITED EDITION',
    rangeMiles: 65,
    topSpeedMph: 32,
    location: 'Financial District • 0.7 miles',
    distanceMiles: 0.7,
    pricePerMin: 0.65,
    status: 'available',
    image: proXCityStreetImg,
    batteryPercentage: 99,
  }
];

// Popular Models for Homepage (4 items)
export const POPULAR_MODELS: Scooter[] = [
  {
    id: 'pop-1',
    name: 'Swift Urban Pro',
    model: 'Model A',
    rangeMiles: 45,
    topSpeedMph: 20,
    location: 'Central Park North • 0.2 miles',
    distanceMiles: 0.2,
    pricePerMin: 1.50,
    status: 'available',
    image: commuterImg,
    batteryPercentage: 92,
    dockingZone: 'Central Park North Station',
    features: ['Triple Braking', 'Integrated GPS', 'Headlight & Taillight']
  },
  {
    id: 'pop-2',
    name: 'Lite Fold',
    model: 'Model B',
    rangeMiles: 25,
    topSpeedMph: 15,
    location: 'Central Park North • 0.2 miles',
    distanceMiles: 0.2,
    pricePerMin: 1.00,
    status: 'available',
    image: foldingScooterImg,
    batteryPercentage: 88,
    dockingZone: 'Central Park North Station',
    features: ['Ultra-light 22 lbs', 'Quick 3s Fold', 'Puncture-proof Tires']
  },
  {
    id: 'pop-3',
    name: 'Performance Max',
    model: 'Model C',
    rangeMiles: 60,
    topSpeedMph: 25,
    location: 'Central Park North • 0.2 miles',
    distanceMiles: 0.2,
    pricePerMin: 2.00,
    status: 'available',
    image: performanceScooterImg,
    batteryPercentage: 98,
    dockingZone: 'Central Park North Station',
    features: ['Dual Suspension', 'Hydraulic Disc Brakes', 'Off-road 10" Tires']
  },
  {
    id: 'pop-4',
    name: 'City Stealth',
    model: 'Model D',
    rangeMiles: 35,
    topSpeedMph: 18,
    location: 'Central Park North • 0.2 miles',
    distanceMiles: 0.2,
    pricePerMin: 1.25,
    status: 'available',
    image: stealthScooterImg,
    batteryPercentage: 84,
    dockingZone: 'Central Park North Station',
    features: ['Silent Hub Motor', 'Aerospace Aluminum', 'Smart App Lock']
  }
];

// Available Scooters Catalog (Matches visily-scooters.jpg grid of 6)
export const ALL_SCOOTERS: Scooter[] = [
  {
    id: 'scooter-1',
    name: 'Swift Urban Pro',
    model: 'Model A',
    rangeMiles: 45,
    topSpeedMph: 20,
    location: 'Central Park North • 0.2 miles',
    distanceMiles: 0.2,
    pricePerMin: 1.50,
    status: 'available',
    image: commuterImg,
    batteryPercentage: 95,
    dockingZone: 'Central Park North Dock A',
    features: ['Triple Braking', 'Night Luminescence', 'Fast Charge 30m']
  },
  {
    id: 'scooter-2',
    name: 'City Glide',
    model: 'Model B',
    rangeMiles: 30,
    topSpeedMph: 15,
    location: 'Central Park North • 0.2 miles',
    distanceMiles: 0.2,
    pricePerMin: 1.20,
    status: 'available',
    image: foldingScooterImg,
    batteryPercentage: 80,
    dockingZone: 'Central Park North Dock B',
    features: ['Lightweight Frame', 'Electronic Anti-lock Brakes', 'USB Phone Port']
  },
  {
    id: 'scooter-3',
    name: 'Apex Cruiser',
    model: 'Model C',
    rangeMiles: 60,
    topSpeedMph: 25,
    location: 'Central Park North • 0.2 miles',
    distanceMiles: 0.2,
    pricePerMin: 1.80,
    status: 'rented',
    image: performanceScooterImg,
    batteryPercentage: 42,
    dockingZone: 'Central Park North Dock C',
    features: ['Dual 1000W Motors', 'Long Distance Battery', 'Terrain Grip']
  },
  {
    id: 'scooter-4',
    name: 'Swift Urban Pro',
    model: 'Model A',
    rangeMiles: 45,
    topSpeedMph: 20,
    location: 'Central Park North • 0.2 miles',
    distanceMiles: 0.2,
    pricePerMin: 1.50,
    status: 'available',
    image: commuterImg,
    batteryPercentage: 91,
    dockingZone: 'Central Park North Dock D',
    features: ['Triple Braking', 'Integrated GPS', 'Eco Drive Mode']
  },
  {
    id: 'scooter-5',
    name: 'City Glide',
    model: 'Model B',
    rangeMiles: 30,
    topSpeedMph: 15,
    location: 'Central Park North • 0.2 miles',
    distanceMiles: 0.2,
    pricePerMin: 1.20,
    status: 'available',
    image: foldingScooterImg,
    batteryPercentage: 76,
    dockingZone: 'Central Park North Dock A',
    features: ['Compact Folding', 'Smooth Suspension', 'City Commuter Pack']
  },
  {
    id: 'scooter-6',
    name: 'Apex Cruiser',
    model: 'Model C',
    rangeMiles: 60,
    topSpeedMph: 25,
    location: 'Central Park North • 0.2 miles',
    distanceMiles: 0.2,
    pricePerMin: 1.80,
    status: 'available',
    image: performanceScooterImg,
    batteryPercentage: 89,
    dockingZone: 'Central Park North Dock B',
    features: ['All Terrain Shock Absorbers', 'Dual Hydraulic Disc', 'Turbo Boost']
  }
];

// Exact Docking Stations from visily-locations.jpg
export const DOCKING_LOCATIONS: DockingLocation[] = [
  {
    id: 'loc-1',
    name: 'Central Park North',
    address: 'W 110th St, New York, NY 10026',
    distance: '0.2 miles',
    distanceNum: 0.2,
    availableCount: 12,
    slotsRatio: '8/20 slots',
    totalSlots: 20,
    rating: 4.8,
    lat: 40.7968,
    lng: -73.9532,
    mapX: 60,
    mapY: 25
  },
  {
    id: 'loc-2',
    name: 'Times Square Hub',
    address: 'Broadway & 7th Ave, New York, NY 10036',
    distance: '1.4 miles',
    distanceNum: 1.4,
    availableCount: 3,
    slotsRatio: '12/15 slots',
    totalSlots: 15,
    rating: 4.5,
    lat: 40.7580,
    lng: -73.9855,
    mapX: 67,
    mapY: 36
  },
  {
    id: 'loc-3',
    name: 'Brooklyn Bridge Entry',
    address: 'Tillary St, Brooklyn, NY 11201',
    distance: '3.1 miles',
    distanceNum: 3.1,
    availableCount: 18,
    slotsRatio: '7/25 slots',
    totalSlots: 25,
    rating: 4.9,
    lat: 40.6998,
    lng: -73.9880,
    mapX: 49,
    mapY: 44
  },
  {
    id: 'loc-4',
    name: 'High Line Park East',
    address: '10th Ave, New York, NY 10011',
    distance: '2.2 miles',
    distanceNum: 2.2,
    availableCount: 0,
    slotsRatio: '10/10 slots',
    totalSlots: 10,
    rating: 4.2,
    lat: 40.7484,
    lng: -74.0048,
    mapX: 77,
    mapY: 52
  }
];

// Exact How It Works Sequential Steps from visily-how-it-works.jpg
export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: 1,
    title: 'Locate Your Ride',
    description: 'Open the SwiftRide app to see all available scooters near you in real-time. Our smart-map provides the exact location and current battery levels of every vehicle.',
    image: ASSETS.locateRide,
    alt: 'Locating nearby SwiftRide electric scooter on city map',
    iconType: 'pin'
  },
  {
    number: 2,
    title: 'Scan to Unlock',
    description: "Once you've found your scooter, simply scan the QR code located on the handlebar using the app. The electronic lock disengages instantly, and you're ready to go.",
    image: ASSETS.scanUnlock,
    alt: 'Scanning QR code on scooter handlebar with smartphone',
    iconType: 'qr'
  },
  {
    number: 3,
    title: 'Kick Off and Go',
    description: 'Push off with one foot to get some momentum, then press the throttle on the right handlebar to engage the electric motor. Keep both hands on the bars at all times.',
    image: ASSETS.kickoffGo,
    alt: 'Riding electric scooter smoothly across city bridge',
    iconType: 'bolt'
  },
  {
    number: 4,
    title: 'Navigate the City',
    description: 'Enjoy a smooth, silent ride through urban streets. Use bike lanes where available and follow all local traffic laws. Our scooters are optimized for both speed and stability.',
    image: ASSETS.heroScooter,
    alt: 'Navigating city streets with electric scooter',
    iconType: 'nav'
  },
  {
    number: 5,
    title: 'Park Responsibly',
    description: "When you reach your destination, find a designated parking zone or a spot that doesn't block sidewalks, ramps, or building entrances. Deployment is key to urban harmony.",
    image: ASSETS.parkDock,
    alt: 'Parking scooter responsibly at designated docking hub',
    iconType: 'park'
  },
  {
    number: 6,
    title: 'End Rental & Pay',
    description: "Drop the kickstand and tap 'End Ride' in the app. You'll receive an instant summary of your trip distance, duration, and a clear breakdown of the final cost.",
    image: ASSETS.scooterCockpit,
    alt: 'Ride summary confirmation on mobile app',
    iconType: 'receipt'
  }
];

// Exact Promo Offers from visily-offers.jpg
export const PROMO_OFFERS: PromoOffer[] = [
  {
    id: 'offer-1',
    title: 'Student Kickstart',
    category: 'students',
    discountText: '30% Off',
    discountBadge: 'EXCLUSIVE OFFER',
    description: 'Verified students get a recurring discount on all rides during the academic semester.',
    expires: 'Dec 31, 2024',
    code: 'STUDENT30',
    badge: 'Most Popular',
    image: ASSETS.studentScooter,
    isPrimary: true
  },
  {
    id: 'offer-2',
    title: 'First Ride Bonus',
    category: 'all',
    discountText: '$5.00 Off',
    discountBadge: 'EXCLUSIVE OFFER',
    description: 'New to SwiftRide? Welcome aboard! Take your first spin with a significant discount on us.',
    expires: 'No Expiry',
    code: 'HELLO5',
    image: ASSETS.commuter,
    isPrimary: false
  },
  {
    id: 'offer-3',
    title: 'Late Night Safe Travel',
    category: 'commuters',
    discountText: '20% Off',
    discountBadge: 'EXCLUSIVE OFFER',
    description: 'Commuting after hours? Enjoy reduced rates between 11 PM and 5 AM daily.',
    expires: 'Oct 15, 2024',
    code: 'NIGHTOWL',
    image: ASSETS.nightRider,
    isPrimary: false
  },
  {
    id: 'offer-4',
    title: 'Commuter Pass',
    category: 'commuters',
    discountText: 'Free Pass',
    discountBadge: 'EXCLUSIVE OFFER',
    description: 'Our monthly pass for daily riders. Unlimited 30-min rides for a fixed monthly fee.',
    expires: 'End of Month',
    code: 'COMMUTE15',
    badge: 'Best Value',
    image: ASSETS.foldingScooter,
    isPrimary: false
  },
  {
    id: 'offer-5',
    title: 'Eco-Friendly Bonus',
    category: 'seasonal',
    discountText: '15% Off',
    discountBadge: 'EXCLUSIVE OFFER',
    description: 'Ride over 50 miles in a week to unlock this sustainability reward for your next trip.',
    expires: 'Weekly Refresh',
    code: 'ECOSMART',
    image: ASSETS.ecoCity,
    isPrimary: false
  },
  {
    id: 'offer-6',
    title: 'Group Ride Discount',
    category: 'all',
    discountText: '25% Off',
    discountBadge: 'EXCLUSIVE OFFER',
    description: 'Book 3 or more scooters simultaneously and save on the total booking price.',
    expires: 'Ongoing',
    code: 'TEAMRIDE',
    image: ASSETS.performanceScooter,
    isPrimary: false
  }
];

// Exact FAQs from visily-offers.jpg
export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How do I apply a promo code?',
    answer: 'During the checkout process for your ride, you will see a field labeled "Promo Code" or "Voucher". Simply enter your code there and click apply before confirming your payment. The discount will be reflected in your final total.'
  },
  {
    id: 'faq-2',
    question: 'Can I use multiple codes at once?',
    answer: 'Only one promotional code or coupon can be active per ride session. If you enter multiple codes, the highest value discount will be automatically selected for maximum savings.'
  },
  {
    id: 'faq-3',
    question: 'What happens if my code doesn’t work?',
    answer: 'Please verify that the promo code has not expired, that you meet any qualifying conditions (such as student verification or first-time rider), and that the code was typed correctly. Our 24/7 support is ready to assist if you need manual credit.'
  },
  {
    id: 'faq-4',
    question: 'How do I get my referral link?',
    answer: 'Open your Account profile in the SwiftRide app or click "Invite Friends" in the Referral section. You will get a personalized referral link and promo code to share with friends and earn $20 ride credit per activation.'
  }
];

export const SWIFTRIDE_PERKS = [
  {
    id: 'perk-1',
    title: 'Priority Access',
    description: 'Members get first dibs on our newest Pro models and long-range scooters.',
    icon: 'star'
  },
  {
    id: 'perk-2',
    title: 'Community Events',
    description: 'Join exclusive urban exploration tours and eco-mobility meetups in your city.',
    icon: 'users'
  },
  {
    id: 'perk-3',
    title: 'Birthday Credits',
    description: 'Enjoy a full day of free riding on your birthday, every year you are with us.',
    icon: 'gift'
  },
  {
    id: 'perk-4',
    title: 'Premium Support',
    description: '24/7 dedicated assistance for all your booking and technical inquiries.',
    icon: 'info'
  }
];

// About Us Page Data
export const ABOUT_CORE_VALUES = [
  {
    id: 'value-community',
    title: 'Community First',
    description: 'We design our services to benefit everyone, working closely with city planners to integrate seamlessly into public transit.',
    icon: 'users'
  },
  {
    id: 'value-innovation',
    title: 'Innovation',
    description: 'Our proprietary battery tech and IoT hardware are engineered for maximum reliability and safety in all urban conditions.',
    icon: 'zap'
  },
  {
    id: 'value-safety',
    title: 'Safety Always',
    description: 'From automatic speed limiting to integrated helmets, we prioritize rider and pedestrian safety above all else.',
    icon: 'shield'
  },
  {
    id: 'value-reliability',
    title: 'Reliability',
    description: 'A ride you can count on. Our 24/7 maintenance teams keep our fleet in showroom condition year-round.',
    icon: 'award'
  }
];

export const ABOUT_GREEN_INITIATIVES = [
  {
    id: 'green-zero',
    title: 'Zero Emissions',
    description: 'Our 100% electric fleet ensures zero tailpipe emissions, contributing to cleaner air in your neighborhood.',
    icon: 'leaf'
  },
  {
    id: 'green-charging',
    title: 'Renewable Charging',
    description: 'We partner with local energy providers to power our docking stations with renewable wind and solar energy.',
    icon: 'zap'
  },
  {
    id: 'green-renewal',
    title: 'Urban Renewal',
    description: 'We contribute 2% of every ride fare to urban green space initiatives in the cities where we operate.',
    icon: 'globe'
  },
  {
    id: 'green-circular',
    title: 'Circular Lifecycle',
    description: 'All scooter components are serialized and tracked, ensuring 95% recyclability at the end of their service life.',
    icon: 'recycle'
  }
];

export const ABOUT_STATS = [
  { value: '2.4M+', label: 'ACTIVE USERS' },
  { value: '45+', label: 'CITIES SERVED' },
  { value: '12k', label: 'CO2 SAVED (TONS)' },
  { value: '4.9/5', label: 'SAFETY RATING' }
];

export const GLOBAL_REGIONS = [
  { region: 'AMERICAS', cities: '24 Cities', status: 'Expanding', highlight: true },
  { region: 'EUROPE', cities: '18 Cities', status: 'Market Leader', highlight: false },
  { region: 'ASIA-PACIFIC', cities: '12 Cities', status: 'Launch Phase', highlight: false },
  { region: 'MIDDLE EAST', cities: '6 Cities', status: 'Planned 2024', highlight: false }
];

export const CONTACT_FAQS: FaqItem[] = [
  {
    id: 'contact-faq-1',
    question: 'How do I report a damaged scooter?',
    answer: 'You can report damage directly through the SwiftRide app by selecting the vehicle and tapping \'Report Issue\'. Alternatively, use the contact form on this page with the vehicle ID located near the handlebars.'
  },
  {
    id: 'contact-faq-2',
    question: 'What are the support hours?',
    answer: 'Our automated dispatch and safety emergency support operates 24/7/365. Live phone and chat support representatives are available Monday through Sunday from 6:00 AM to 11:00 PM PST.'
  },
  {
    id: 'contact-faq-3',
    question: 'Are there corporate partnership opportunities?',
    answer: 'Yes! We offer corporate commuter pass programs, university campus integration packages, and dedicated enterprise parking hubs for business campuses.'
  },
  {
    id: 'contact-faq-4',
    question: 'Where can I find lost items?',
    answer: 'If you left a personal item on or near a SwiftRide scooter, please submit a lost & found report with the scooter ID, location, and time of ride. Our field operations team inspects docking stations hourly.'
  }
];

export interface FaqKnowledgeItem {
  id: string;
  category: 'getting-started' | 'rentals-rides' | 'payments-pricing' | 'safety-insurance' | 'account-support';
  question: string;
  answer: string;
  helpfulCount?: { yes: number; no: number };
}

export const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions', icon: 'help-circle' },
  { id: 'getting-started', label: 'Getting Started', icon: 'zap' },
  { id: 'rentals-rides', label: 'Rentals & Rides', icon: 'layers' },
  { id: 'payments-pricing', label: 'Payments & Pricing', icon: 'credit-card' },
  { id: 'safety-insurance', label: 'Safety & Insurance', icon: 'shield-check' },
  { id: 'account-support', label: 'Account & Support', icon: 'headphones' },
];

export const KNOWLEDGE_BASE_FAQS: FaqKnowledgeItem[] = [
  {
    id: 'faq-kb-1',
    category: 'getting-started',
    question: 'How do I start my first SwiftRide?',
    answer: 'Download the SwiftRide app, create an account, and add a valid payment method. Once you\'re ready, locate a scooter on the map, scan the QR code on the handlebars, and kick off to start moving. Press the throttle to accelerate!'
  },
  {
    id: 'faq-kb-2',
    category: 'getting-started',
    question: 'Do I need a driver\'s license to ride?',
    answer: 'A valid driver\'s license or government-issued ID is required in most jurisdictions to verify that you are at least 18 years old.'
  },
  {
    id: 'faq-kb-3',
    category: 'rentals-rides',
    question: 'Where can I park the scooter?',
    answer: 'Park in designated SwiftRide parking bays or at public bike racks. Ensure you do not block pedestrian walkways, accessibility ramps, fire hydrants, or building entrances.'
  },
  {
    id: 'faq-kb-4',
    category: 'rentals-rides',
    question: 'What is the range of a fully charged SwiftRide scooter?',
    answer: 'Our flagship fleet models offer an estimated range of 35 to 45 miles (55-72 km) on a full charge under standard riding conditions.'
  },
  {
    id: 'faq-kb-5',
    category: 'payments-pricing',
    question: 'How much does a ride cost?',
    answer: 'Standard pricing starts at $1.00 to unlock, plus $0.25-$0.35 per minute depending on the city. We also offer Day Passes and monthly SwiftPass subscriptions with discounted rates.'
  },
  {
    id: 'faq-kb-6',
    category: 'payments-pricing',
    question: 'What payment methods are accepted?',
    answer: 'We accept all major credit/debit cards (Visa, Mastercard, Amex, Discover), Apple Pay, Google Pay, and SwiftRide Wallet balance.'
  },
  {
    id: 'faq-kb-7',
    category: 'safety-insurance',
    question: 'Do I have to wear a helmet?',
    answer: 'Helmets are strongly recommended for all riders and legally mandatory for riders in certain cities. Many of our docking hubs provide sanitized integrated smart helmets.'
  },
  {
    id: 'faq-kb-8',
    category: 'account-support',
    question: 'What should I do if the scooter has a technical issue?',
    answer: 'If you experience any mechanical or battery issues during your ride, safely pull over, end the ride in the app, and select \'Report Maintenance Issue\'. You will not be charged for trips ended due to technical faults.'
  }
];

export const FAQ_COMMUNITY_PARTNERS = [
  { name: 'UrbanDaily', icon: 'zap' },
  { name: 'SecureFlow', icon: 'shield' },
  { name: 'TechMove', icon: 'book-open' },
  { name: 'CityConnect', icon: 'headphones' }
];

