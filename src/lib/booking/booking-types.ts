// Tipos para el sistema de reservas del Proyecto Kusatsu

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PAID = 'paid',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
}

export enum ExperienceType {
  LUXURY_3_DAY = 'luxury_3_day',
  PREMIUM_2_DAY = 'premium_2_day',
  CULTURAL_1_DAY = 'cultural_1_day',
  CUSTOM = 'custom',
}

export enum ServiceLevel {
  BASIC = 'basic',
  PREMIUM = 'premium',
  LUXURY = 'luxury',
  VIP = 'vip',
}

export interface KusatsuExperience {
  id: string;
  type: ExperienceType;
  name: string;
  description: string;
  duration: number; // days
  maxParticipants: number;
  basePrice: number;
  currency: string;
  services: {
    accommodation: string[];
    dining: string[];
    activities: string[];
    transportation: string[];
    concierge: string[];
  };
  inclusions: string[];
  exclusions: string[];
  requirements: string[];
  availableDates: Date[];
  images: string[];
  testimonials: Array<{
    name: string;
    rating: number;
    comment: string;
    date: Date;
  }>;
}

export interface BookingRequest {
  experienceId: string;
  participants: Array<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    nationality: string;
    dietaryRestrictions?: string[];
    specialRequests?: string;
  }>;
  preferredDates: Date[];
  serviceLevel: ServiceLevel;
  specialRequests?: string;
  budget?: number;
  currency?: string;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  experienceId: string;
  experience: KusatsuExperience;
  participants: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    nationality: string;
    dietaryRestrictions?: string[];
    specialRequests?: string;
  }>;
  dates: {
    start: Date;
    end: Date;
    duration: number;
  };
  serviceLevel: ServiceLevel;
  pricing: {
    basePrice: number;
    serviceLevelMultiplier: number;
    totalParticipants: number;
    subtotal: number;
    taxes: number;
    fees: number;
    total: number;
    currency: string;
  };
  status: BookingStatus;
  payment: {
    status: 'pending' | 'paid' | 'refunded' | 'failed';
    amount: number;
    currency: string;
    paymentMethod?: string;
    paymentId?: string;
    paidAt?: Date;
  };
  specialRequests?: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // user ID
  assignedTo?: string; // staff ID
  confirmationSentAt?: Date;
  reminderSentAt?: Date;
}

export interface AvailabilitySlot {
  date: Date;
  experienceId: string;
  maxCapacity: number;
  bookedCapacity: number;
  availableCapacity: number;
  price: number;
  currency: string;
  isAvailable: boolean;
  restrictions?: string[];
}

export interface ConciergeService {
  id: string;
  name: string;
  description: string;
  category: 'transportation' | 'dining' | 'activities' | 'shopping' | 'personal';
  price: number;
  currency: string;
  duration?: number; // hours
  maxParticipants?: number;
  isAvailable: boolean;
  requiresAdvanceBooking: boolean;
  advanceBookingHours: number;
}

export interface ItineraryItem {
  id: string;
  bookingId: string;
  date: Date;
  time: string;
  activity: string;
  location: string;
  duration: number; // minutes
  description: string;
  participants: string[]; // participant IDs
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
  assignedStaff?: string;
}

export interface GuestFeedback {
  id: string;
  bookingId: string;
  participantId: string;
  rating: number; // 1-5
  categories: {
    accommodation: number;
    dining: number;
    activities: number;
    service: number;
    overall: number;
  };
  comments: string;
  suggestions?: string;
  wouldRecommend: boolean;
  submittedAt: Date;
}

export interface BookingAnalytics {
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  occupancyRate: number;
  popularExperiences: Array<{
    experienceId: string;
    name: string;
    bookings: number;
    revenue: number;
  }>;
  seasonalTrends: Array<{
    month: string;
    bookings: number;
    revenue: number;
  }>;
  guestDemographics: {
    byNationality: Record<string, number>;
    byServiceLevel: Record<ServiceLevel, number>;
    averageGroupSize: number;
  };
}

export default {
  BookingStatus,
  ExperienceType,
  ServiceLevel,
};

