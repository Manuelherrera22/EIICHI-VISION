'use client';

import React, { useState } from 'react';
import { TabijiBookingService } from '@/lib/booking/booking-service';
import { ExperienceType, ServiceLevel } from '@/lib/booking/booking-types';

const BookingTestingPage: React.FC = () => {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addTestResult = (testName: string, success: boolean, details: any) => {
    setTestResults(prev => [...prev, {
      testName,
      success,
      details,
      timestamp: new Date().toISOString()
    }]);
  };

  // Test 1: Obtener experiencias disponibles
  const testGetAvailableExperiences = async () => {
    setIsLoading(true);
    try {
      const experiences = await TabijiBookingService.getAvailableExperiences();
      
      const success = Array.isArray(experiences) && experiences.length > 0;
      
      addTestResult('Get Available Experiences', success, {
        experienceCount: experiences.length,
        experiences: experiences.map(exp => ({
          id: exp.id,
          name: exp.name,
          type: exp.type,
          duration: exp.duration,
          maxParticipants: exp.maxParticipants,
          basePrice: exp.basePrice,
          currency: exp.currency
        }))
      });
      
      return experiences;
    } catch (error) {
      addTestResult('Get Available Experiences', false, { error: error.message });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Test 2: Obtener experiencia específica
  const testGetExperienceById = async () => {
    setIsLoading(true);
    try {
      const experience = await TabijiBookingService.getExperienceById('exp_001');
      
      const success = !!experience && !!experience.id;
      
      addTestResult('Get Experience by ID', success, {
        experienceId: experience?.id,
        name: experience?.name,
        type: experience?.type,
        duration: experience?.duration,
        maxParticipants: experience?.maxParticipants,
        basePrice: experience?.basePrice,
        currency: experience?.currency,
        inclusions: experience?.inclusions?.length || 0
      });
      
      return experience;
    } catch (error) {
      addTestResult('Get Experience by ID', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 3: Verificar disponibilidad
  const testCheckAvailability = async () => {
    setIsLoading(true);
    try {
      const startDate = new Date('2025-03-01');
      const endDate = new Date('2025-03-03');
      
      const availability = await TabijiBookingService.checkAvailability(
        'exp_001',
        startDate,
        endDate,
        2
      );
      
      const success = Array.isArray(availability) && availability.length > 0;
      
      addTestResult('Check Availability', success, {
        experienceId: 'exp_001',
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        participants: 2,
        availableSlots: availability.length,
        slots: availability.map(slot => ({
          date: slot.date.toISOString(),
          availableCapacity: slot.availableCapacity,
          isAvailable: slot.isAvailable,
          price: slot.price,
          currency: slot.currency
        }))
      });
      
      return availability;
    } catch (error) {
      addTestResult('Check Availability', false, { error: error.message });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Test 4: Crear reserva
  const testCreateBooking = async () => {
    setIsLoading(true);
    try {
      const bookingRequest = {
        experienceId: 'exp_001',
        participants: [
          {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '+1-555-0123',
            nationality: 'United States',
            dietaryRestrictions: ['Vegetarian'],
            specialRequests: 'Prefer ground floor accommodation'
          },
          {
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@example.com',
            phone: '+1-555-0124',
            nationality: 'United States',
            dietaryRestrictions: [],
            specialRequests: ''
          }
        ],
        preferredDates: [new Date('2025-03-01')],
        serviceLevel: ServiceLevel.PREMIUM,
        specialRequests: 'Please arrange airport pickup',
        budget: 1000000,
        currency: 'JPY'
      };

      const booking = await TabijiBookingService.createBooking(bookingRequest);
      
      const success = !!booking.id && !!booking.bookingNumber;
      
      addTestResult('Create Booking', success, {
        bookingId: booking.id,
        bookingNumber: booking.bookingNumber,
        experienceId: booking.experienceId,
        participantCount: booking.participants.length,
        serviceLevel: booking.serviceLevel,
        totalAmount: booking.pricing.total,
        currency: booking.pricing.currency,
        status: booking.status,
        dates: {
          start: booking.dates.start.toISOString(),
          end: booking.dates.end.toISOString(),
          duration: booking.dates.duration
        }
      });
      
      return booking;
    } catch (error) {
      addTestResult('Create Booking', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 5: Obtener servicios de conserjería
  const testGetConciergeServices = async () => {
    setIsLoading(true);
    try {
      const services = await TabijiBookingService.getConciergeServices();
      
      const success = Array.isArray(services) && services.length > 0;
      
      addTestResult('Get Concierge Services', success, {
        serviceCount: services.length,
        services: services.map(service => ({
          id: service.id,
          name: service.name,
          category: service.category,
          price: service.price,
          currency: service.currency,
          duration: service.duration,
          maxParticipants: service.maxParticipants,
          isAvailable: service.isAvailable
        }))
      });
      
      return services;
    } catch (error) {
      addTestResult('Get Concierge Services', false, { error: error.message });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Test 6: Obtener analytics de reservas
  const testGetBookingAnalytics = async () => {
    setIsLoading(true);
    try {
      const analytics = await TabijiBookingService.getBookingAnalytics();
      
      const success = !!analytics && typeof analytics.totalBookings === 'number';
      
      addTestResult('Get Booking Analytics', success, {
        totalBookings: analytics.totalBookings,
        totalRevenue: analytics.totalRevenue,
        averageRating: analytics.averageRating,
        occupancyRate: analytics.occupancyRate,
        popularExperiences: analytics.popularExperiences.length,
        seasonalTrends: analytics.seasonalTrends.length,
        guestDemographics: {
          byNationality: Object.keys(analytics.guestDemographics.byNationality).length,
          byServiceLevel: Object.keys(analytics.guestDemographics.byServiceLevel).length,
          averageGroupSize: analytics.guestDemographics.averageGroupSize
        }
      });
      
      return analytics;
    } catch (error) {
      addTestResult('Get Booking Analytics', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 7: Actualizar estado de reserva
  const testUpdateBookingStatus = async () => {
    setIsLoading(true);
    try {
      // Primero crear una reserva
      const booking = await testCreateBooking();
      if (!booking) {
        addTestResult('Update Booking Status', false, { error: 'Failed to create booking first' });
        return null;
      }

      const updatedBooking = await TabijiBookingService.updateBookingStatus(
        booking.id,
        'confirmed',
        'Booking confirmed and payment received'
      );
      
      const success = !!updatedBooking && updatedBooking.status === 'confirmed';
      
      addTestResult('Update Booking Status', success, {
        bookingId: booking.id,
        oldStatus: booking.status,
        newStatus: updatedBooking.status,
        notes: updatedBooking.notes
      });
      
      return updatedBooking;
    } catch (error) {
      addTestResult('Update Booking Status', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 8: Confirmar pago
  const testConfirmPayment = async () => {
    setIsLoading(true);
    try {
      // Primero crear una reserva
      const booking = await testCreateBooking();
      if (!booking) {
        addTestResult('Confirm Payment', false, { error: 'Failed to create booking first' });
        return null;
      }

      const paymentData = {
        amount: booking.pricing.total,
        currency: booking.pricing.currency,
        paymentMethod: 'card',
        paymentId: 'pi_test_1234567890'
      };

      const updatedBooking = await TabijiBookingService.confirmPayment(booking.id, paymentData);
      
      const success = !!updatedBooking && updatedBooking.payment.status === 'paid';
      
      addTestResult('Confirm Payment', success, {
        bookingId: booking.id,
        paymentStatus: updatedBooking.payment.status,
        paymentMethod: updatedBooking.payment.paymentMethod,
        paymentId: updatedBooking.payment.paymentId,
        paidAt: updatedBooking.payment.paidAt,
        bookingStatus: updatedBooking.status
      });
      
      return updatedBooking;
    } catch (error) {
      addTestResult('Confirm Payment', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Ejecutar todos los tests
  const runAllTests = async () => {
    setTestResults([]);
    await testGetAvailableExperiences();
    await testGetExperienceById();
    await testCheckAvailability();
    await testCreateBooking();
    await testGetConciergeServices();
    await testGetBookingAnalytics();
    await testUpdateBookingStatus();
    await testConfirmPayment();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Booking System Testing</h1>
      
      {/* Información sobre el sistema de reservas */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-indigo-900 mb-2">About Kusatsu Project Booking System</h2>
        <p className="text-indigo-800 mb-2">
          <strong>Experience Types:</strong> Luxury 3-Day, Premium 2-Day, Cultural 1-Day, Custom
        </p>
        <p className="text-indigo-800 mb-2">
          <strong>Service Levels:</strong> Basic, Premium, Luxury, VIP
        </p>
        <p className="text-indigo-800">
          <strong>Features:</strong> AR Visualization, Investment Analysis, Cultural Immersion, Concierge Services
        </p>
      </div>
      
      {/* Controles de testing */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Controls</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={runAllTests}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Running Tests...' : 'Run All Tests'}
          </button>
          
          <button
            onClick={testGetAvailableExperiences}
            disabled={isLoading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            Test Get Experiences
          </button>
          
          <button
            onClick={testCheckAvailability}
            disabled={isLoading}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
          >
            Test Check Availability
          </button>
          
          <button
            onClick={testCreateBooking}
            disabled={isLoading}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors"
          >
            Test Create Booking
          </button>
          
          <button
            onClick={testGetBookingAnalytics}
            disabled={isLoading}
            className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50 transition-colors"
          >
            Test Analytics
          </button>
          
          <button
            onClick={() => setTestResults([])}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Clear Results
          </button>
        </div>
      </div>

      {/* Resultados de testing */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Results</h2>
        
        {testResults.length === 0 ? (
          <p className="text-gray-600">No tests run yet. Click "Run All Tests" to start.</p>
        ) : (
          <div className="space-y-4">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  result.success 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-semibold ${
                    result.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.testName}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    result.success 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {result.success ? 'PASS' : 'FAIL'}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  {new Date(result.timestamp).toLocaleString()}
                </div>
                
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                    View Details
                  </summary>
                  <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                </details>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingTestingPage;

