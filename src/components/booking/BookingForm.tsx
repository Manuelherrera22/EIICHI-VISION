'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { TabijiBookingService } from '@/lib/booking/booking-service';
import { KusatsuExperience, BookingRequest, ServiceLevel, ExperienceType } from '@/lib/booking/booking-types';
import { 
  Calendar, 
  Users, 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Globe,
  Utensils,
  MessageSquare,
  CreditCard,
  Loader2
} from 'lucide-react';

interface BookingFormProps {
  experienceId: string;
  onBookingComplete?: (bookingId: string) => void;
  onCancel?: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  experienceId,
  onBookingComplete,
  onCancel
}) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<'experience' | 'participants' | 'dates' | 'services' | 'payment' | 'confirmation'>('experience');
  const [experience, setExperience] = useState<KusatsuExperience | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form data
  const [formData, setFormData] = useState<BookingRequest>({
    experienceId,
    participants: [],
    preferredDates: [],
    serviceLevel: ServiceLevel.PREMIUM,
    specialRequests: '',
    budget: undefined,
    currency: 'JPY',
  });

  // Load experience data
  useEffect(() => {
    loadExperience();
  }, [experienceId]);

  const loadExperience = async () => {
    setIsLoading(true);
    try {
      const exp = await TabijiBookingService.getExperienceById(experienceId);
      setExperience(exp);
    } catch (error) {
      setError('Failed to load experience details');
    } finally {
      setIsLoading(false);
    }
  };

  // Add participant
  const addParticipant = () => {
    setFormData({
      ...formData,
      participants: [
        ...formData.participants,
        {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          nationality: '',
          dietaryRestrictions: [],
          specialRequests: '',
        }
      ]
    });
  };

  // Remove participant
  const removeParticipant = (index: number) => {
    setFormData({
      ...formData,
      participants: formData.participants.filter((_, i) => i !== index)
    });
  };

  // Update participant
  const updateParticipant = (index: number, field: string, value: any) => {
    const updatedParticipants = [...formData.participants];
    updatedParticipants[index] = { ...updatedParticipants[index], [field]: value };
    setFormData({ ...formData, participants: updatedParticipants });
  };

  // Validate current step
  const validateStep = (): boolean => {
    switch (step) {
      case 'participants':
        return formData.participants.length > 0 && 
               formData.participants.every(p => p.firstName && p.lastName && p.email);
      case 'dates':
        return formData.preferredDates.length > 0;
      case 'services':
        return true; // Always valid
      default:
        return true;
    }
  };

  // Next step
  const nextStep = () => {
    if (validateStep()) {
      const steps = ['experience', 'participants', 'dates', 'services', 'payment', 'confirmation'];
      const currentIndex = steps.indexOf(step);
      if (currentIndex < steps.length - 1) {
        setStep(steps[currentIndex + 1] as any);
      }
    }
  };

  // Previous step
  const prevStep = () => {
    const steps = ['experience', 'participants', 'dates', 'services', 'payment', 'confirmation'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1] as any);
    }
  };

  // Submit booking
  const submitBooking = async () => {
    setIsLoading(true);
    try {
      const booking = await TabijiBookingService.createBooking(formData);
      setStep('confirmation');
      if (onBookingComplete) {
        onBookingComplete(booking.id);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create booking');
    } finally {
      setIsLoading(false);
    }
  };

  // Format price
  const formatPrice = (price: number, currency: string) => {
    if (currency === 'JPY') {
      return `¥${(price / 10000).toFixed(0)}万円`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  if (isLoading && !experience) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading experience details...</p>
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Experience Not Found</h3>
        <p className="text-gray-600">The requested experience could not be found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {['experience', 'participants', 'dates', 'services', 'payment', 'confirmation'].map((s, index) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === s ? 'bg-blue-600 text-white' :
                ['experience', 'participants', 'dates', 'services', 'payment', 'confirmation'].indexOf(step) > index ? 'bg-green-600 text-white' :
                'bg-gray-200 text-gray-600'
              }`}>
                {['experience', 'participants', 'dates', 'services', 'payment', 'confirmation'].indexOf(step) > index ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
              {index < 5 && (
                <div className={`w-16 h-1 mx-2 ${
                  ['experience', 'participants', 'dates', 'services', 'payment', 'confirmation'].indexOf(step) > index ? 'bg-green-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center"
          >
            <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
            <span className="text-red-700">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step content */}
      <AnimatePresence mode="wait">
        {step === 'experience' && (
          <motion.div
            key="experience"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{experience.name}</h2>
            <p className="text-gray-600 mb-6">{experience.description}</p>

            {/* Experience details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                <span>{experience.duration} days</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                <span>Max {experience.maxParticipants} people</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Star className="w-5 h-5 mr-2 text-blue-600" />
                <span>From {formatPrice(experience.basePrice, experience.currency)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                <span>Kusatsu, Japan</span>
              </div>
            </div>

            {/* Inclusions */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {experience.inclusions.map((inclusion, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-600">{inclusion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            {experience.testimonials.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Guest Reviews</h3>
                {experience.testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 mb-3">
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">{testimonial.name}</span>
                    </div>
                    <p className="text-sm text-gray-600">{testimonial.comment}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={nextStep}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue to Participants
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 'participants' && (
          <motion.div
            key="participants"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Participants Information</h2>
            
            {formData.participants.map((participant, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Participant {index + 1}</h3>
                  {formData.participants.length > 1 && (
                    <button
                      onClick={() => removeParticipant(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={participant.firstName}
                      onChange={(e) => updateParticipant(index, 'firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter first name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={participant.lastName}
                      onChange={(e) => updateParticipant(index, 'lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter last name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={participant.email}
                      onChange={(e) => updateParticipant(index, 'email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={participant.phone}
                      onChange={(e) => updateParticipant(index, 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nationality *
                    </label>
                    <input
                      type="text"
                      value={participant.nationality}
                      onChange={(e) => updateParticipant(index, 'nationality', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter nationality"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dietary Restrictions
                    </label>
                    <input
                      type="text"
                      value={participant.dietaryRestrictions?.join(', ') || ''}
                      onChange={(e) => updateParticipant(index, 'dietaryRestrictions', e.target.value.split(', ').filter(Boolean))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Vegetarian, Gluten-free"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requests
                  </label>
                  <textarea
                    value={participant.specialRequests || ''}
                    onChange={(e) => updateParticipant(index, 'specialRequests', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any special requests or requirements"
                  />
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center">
              <button
                onClick={addParticipant}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Participant
              </button>

              <div className="flex space-x-4">
                <button
                  onClick={prevStep}
                  className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!validateStep()}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Continue to Dates
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* More steps would be implemented here... */}
      </AnimatePresence>
    </div>
  );
};

export default BookingForm;

