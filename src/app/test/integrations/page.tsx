'use client';

import React, { useState } from 'react';
import { TabijiPaymentService, TabijiProductType } from '@/lib/payments/payment-service';
import { TabijiCRMService } from '@/lib/crm/crm-service';
import { JNIIntegrationService } from '@/lib/jni/jni-integration';
import { TabijiBookingService } from '@/lib/booking/booking-service';
import { TabijiAnalyticsService } from '@/lib/analytics/analytics-service';

const IntegrationsTestingPage: React.FC = () => {
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

  // Test 1: Flujo completo de lead a cliente con pago
  const testCompleteLeadToClientFlow = async () => {
    setIsLoading(true);
    try {
      // Paso 1: Crear contacto
      const contact = await TabijiCRMService.createContact({
        firstName: 'Integration',
        lastName: 'Test',
        email: 'integration@tabijihouse.com',
        phone: '+1-555-0123',
        country: 'United States',
        timezone: 'America/New_York',
        preferredLanguage: 'en'
      });

      // Paso 2: Crear lead
      const lead = await TabijiCRMService.createLead({
        status: 'new',
        clientType: 'investor',
        source: 'website',
        budget: 500000,
        currency: 'USD',
        preferredProperties: ['property_001'],
        timeline: '3-6 months',
        notes: 'Integration test lead',
        assignedTo: 'agent_001'
      }, contact);

      // Paso 3: Crear sesión de pago
      const paymentSession = await TabijiPaymentService.createPropertyPaymentSession({
        amount: 500000,
        currency: 'usd',
        productType: TabijiProductType.PROPERTY_PURCHASE,
        customerEmail: contact.email,
        customerName: `${contact.firstName} ${contact.lastName}`,
        metadata: {
          leadId: lead.id,
          propertyId: 'property_001',
          clientId: 'test_client_001',
          serviceType: 'property_purchase',
          region: 'international'
        }
      });

      // Paso 4: Convertir lead a cliente
      const client = await TabijiCRMService.convertLeadToClient(lead.id, ['property_purchase']);

      const success = !!contact.id && !!lead.id && !!paymentSession.id && !!client.id;
      
      addTestResult('Complete Lead to Client Flow', success, {
        contactId: contact.id,
        leadId: lead.id,
        paymentSessionId: paymentSession.id,
        clientId: client.id,
        flowSteps: ['Create Contact', 'Create Lead', 'Create Payment Session', 'Convert to Client'],
        integrationPoints: ['CRM → Payment', 'Payment → CRM', 'Lead → Client']
      });
      
      return { contact, lead, paymentSession, client };
    } catch (error) {
      addTestResult('Complete Lead to Client Flow', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 2: Integración JNI con CRM
  const testJNIWithCRMIntegration = async () => {
    setIsLoading(true);
    try {
      // Paso 1: Obtener propiedades de JNI
      const properties = await JNIIntegrationService.getAvailableProperties({
        prefecture: 'Gunma',
        propertyType: 'akiya',
        minPrice: 10000000,
        maxPrice: 30000000
      });

      // Paso 2: Crear cliente en CRM
      const contact = await TabijiCRMService.createContact({
        firstName: 'JNI',
        lastName: 'Test',
        email: 'jni@tabijihouse.com',
        phone: '+81-90-1234-5678',
        country: 'Japan',
        timezone: 'Asia/Tokyo',
        preferredLanguage: 'ja'
      });

      const lead = await TabijiCRMService.createLead({
        status: 'qualified',
        clientType: 'investor',
        source: 'jni_partnership',
        budget: 20000000,
        currency: 'JPY',
        preferredProperties: properties.slice(0, 2).map(p => p.id),
        timeline: '1-3 months',
        notes: 'JNI integration test',
        assignedTo: 'agent_001'
      }, contact);

      // Paso 3: Iniciar transacción JNI
      const transaction = await JNIIntegrationService.initiateTransaction({
        propertyId: properties[0]?.id || 'jni_001',
        clientId: contact.id,
        agentId: 'agent_001',
        type: 'sale',
        amount: 15000000,
        currency: 'JPY',
        clientInfo: {
          name: `${contact.firstName} ${contact.lastName}`,
          email: contact.email,
          phone: contact.phone,
          nationality: contact.country,
          visaStatus: 'Tourist'
        }
      });

      const success = Array.isArray(properties) && !!contact.id && !!lead.id && !!transaction.id;
      
      addTestResult('JNI with CRM Integration', success, {
        propertiesCount: properties.length,
        contactId: contact.id,
        leadId: lead.id,
        transactionId: transaction.id,
        integrationPoints: ['JNI → CRM', 'CRM → JNI', 'Property Matching']
      });
      
      return { properties, contact, lead, transaction };
    } catch (error) {
      addTestResult('JNI with CRM Integration', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 3: Integración Booking con Payment
  const testBookingWithPaymentIntegration = async () => {
    setIsLoading(true);
    try {
      // Paso 1: Obtener experiencias disponibles
      const experiences = await TabijiBookingService.getAvailableExperiences();

      // Paso 2: Crear reserva
      const booking = await TabijiBookingService.createBooking({
        experienceId: experiences[0]?.id || 'exp_001',
        participants: [
          {
            firstName: 'Booking',
            lastName: 'Test',
            email: 'booking@tabijihouse.com',
            phone: '+1-555-0123',
            nationality: 'United States',
            dietaryRestrictions: [],
            specialRequests: 'Integration test booking'
          }
        ],
        preferredDates: [new Date('2025-03-01')],
        serviceLevel: 'premium',
        specialRequests: 'Integration test',
        budget: 500000,
        currency: 'JPY'
      });

      // Paso 3: Crear sesión de pago para la reserva
      const paymentSession = await TabijiPaymentService.createPropertyPaymentSession({
        amount: booking.pricing.total,
        currency: booking.pricing.currency,
        productType: TabijiProductType.EXPERIENCE_BOOKING,
        customerEmail: booking.participants[0].email,
        customerName: `${booking.participants[0].firstName} ${booking.participants[0].lastName}`,
        metadata: {
          bookingId: booking.id,
          experienceId: booking.experienceId,
          serviceLevel: booking.serviceLevel,
          region: 'japan'
        }
      });

      // Paso 4: Confirmar pago
      const paymentData = {
        amount: booking.pricing.total,
        currency: booking.pricing.currency,
        paymentMethod: 'card',
        paymentId: 'pi_test_integration_123'
      };

      const updatedBooking = await TabijiBookingService.confirmPayment(booking.id, paymentData);

      const success = !!booking.id && !!paymentSession.id && !!updatedBooking.payment.paymentId;
      
      addTestResult('Booking with Payment Integration', success, {
        bookingId: booking.id,
        paymentSessionId: paymentSession.id,
        paymentId: updatedBooking.payment.paymentId,
        totalAmount: booking.pricing.total,
        currency: booking.pricing.currency,
        integrationPoints: ['Booking → Payment', 'Payment → Booking', 'Payment Confirmation']
      });
      
      return { booking, paymentSession, updatedBooking };
    } catch (error) {
      addTestResult('Booking with Payment Integration', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 4: Integración Analytics con todos los sistemas
  const testAnalyticsIntegration = async () => {
    setIsLoading(true);
    try {
      // Obtener métricas de todos los sistemas
      const conversionMetrics = await TabijiAnalyticsService.getConversionMetrics('month');
      const revenueMetrics = await TabijiAnalyticsService.getRevenueMetrics('month');
      const propertyMetrics = await TabijiAnalyticsService.getPropertyMetrics('month');
      const clientMetrics = await TabijiAnalyticsService.getClientMetrics('month');
      const serviceMetrics = await TabijiAnalyticsService.getServiceMetrics('month');
      const bookingMetrics = await TabijiBookingService.getBookingAnalytics();

      const success = !!conversionMetrics && !!revenueMetrics && !!propertyMetrics && 
                     !!clientMetrics && !!serviceMetrics && !!bookingMetrics;
      
      addTestResult('Analytics Integration', success, {
        conversionMetrics: {
          overallConversionRate: conversionMetrics.overallConversionRate,
          totalLeads: conversionMetrics.totalLeads,
          totalClients: conversionMetrics.totalClients
        },
        revenueMetrics: {
          totalRevenue: revenueMetrics.totalRevenue,
          averageDealSize: revenueMetrics.averageDealSize,
          currency: revenueMetrics.currency
        },
        propertyMetrics: {
          totalProperties: propertyMetrics.totalProperties,
          averagePrice: propertyMetrics.averagePrice
        },
        clientMetrics: {
          totalClients: clientMetrics.totalClients,
          activeClients: clientMetrics.activeClients
        },
        serviceMetrics: {
          totalServices: serviceMetrics.totalServices,
          averageServiceRating: serviceMetrics.averageServiceRating
        },
        bookingMetrics: {
          totalBookings: bookingMetrics.totalBookings,
          totalRevenue: bookingMetrics.totalRevenue
        },
        integrationPoints: ['CRM → Analytics', 'Payment → Analytics', 'Booking → Analytics', 'JNI → Analytics']
      });
      
      return { conversionMetrics, revenueMetrics, propertyMetrics, clientMetrics, serviceMetrics, bookingMetrics };
    } catch (error) {
      addTestResult('Analytics Integration', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 5: Flujo completo de ECV con todos los sistemas
  const testECVCompleteFlow = async () => {
    setIsLoading(true);
    try {
      // Paso 1: Crear cliente
      const contact = await TabijiCRMService.createContact({
        firstName: 'ECV',
        lastName: 'Test',
        email: 'ecv@tabijihouse.com',
        phone: '+1-555-0123',
        country: 'United States',
        timezone: 'America/New_York',
        preferredLanguage: 'en'
      });

      const lead = await TabijiCRMService.createLead({
        status: 'qualified',
        clientType: 'investor',
        source: 'website',
        budget: 100000,
        currency: 'USD',
        preferredProperties: [],
        timeline: '1-2 months',
        notes: 'ECV integration test',
        assignedTo: 'agent_001'
      }, contact);

      const client = await TabijiCRMService.convertLeadToClient(lead.id, ['ecv_membership']);

      // Paso 2: Crear suscripción ECV
      const ecvSubscription = await TabijiPaymentService.createECVSubscription(
        contact.email,
        `${contact.firstName} ${contact.lastName}`,
        'international'
      );

      // Paso 3: Activar ECV en CRM
      const updatedClient = await TabijiCRMService.activateECVMembership(client.id);

      // Paso 4: Obtener métricas de ECV
      const ecvMetrics = await TabijiAnalyticsService.getConversionMetrics('month');

      const success = !!contact.id && !!client.id && !!ecvSubscription.id && 
                     !!updatedClient.ecvMembership?.active && !!ecvMetrics;
      
      addTestResult('ECV Complete Flow', success, {
        contactId: contact.id,
        clientId: client.id,
        ecvSubscriptionId: ecvSubscription.id,
        ecvActive: updatedClient.ecvMembership?.active,
        ecvActivationRate: ecvMetrics.ecvActivationRate,
        integrationPoints: ['CRM → Payment', 'Payment → CRM', 'ECV Activation', 'Analytics Tracking']
      });
      
      return { contact, client, ecvSubscription, updatedClient, ecvMetrics };
    } catch (error) {
      addTestResult('ECV Complete Flow', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 6: Verificar integridad de datos entre sistemas
  const testDataIntegrity = async () => {
    setIsLoading(true);
    try {
      // Crear datos en un sistema y verificar en otro
      const contact = await TabijiCRMService.createContact({
        firstName: 'Integrity',
        lastName: 'Test',
        email: 'integrity@tabijihouse.com',
        phone: '+1-555-0123',
        country: 'United States',
        timezone: 'America/New_York',
        preferredLanguage: 'en'
      });

      const lead = await TabijiCRMService.createLead({
        status: 'new',
        clientType: 'investor',
        source: 'website',
        budget: 300000,
        currency: 'USD',
        preferredProperties: ['property_001'],
        timeline: '2-4 months',
        notes: 'Data integrity test',
        assignedTo: 'agent_001'
      }, contact);

      // Verificar que los datos se mantienen consistentes
      const retrievedLead = await TabijiCRMService.getLead(lead.id);
      const retrievedContact = await TabijiCRMService.getContact(contact.id);

      // Verificar que el lead tiene la referencia correcta al contacto
      const dataConsistent = retrievedLead.contactId === retrievedContact.id &&
                           retrievedLead.budget === 300000 &&
                           retrievedContact.email === 'integrity@tabijihouse.com';

      const success = dataConsistent && !!retrievedLead && !!retrievedContact;
      
      addTestResult('Data Integrity', success, {
        contactId: contact.id,
        leadId: lead.id,
        dataConsistent,
        retrievedLeadContactId: retrievedLead.contactId,
        retrievedContactId: retrievedContact.id,
        leadBudget: retrievedLead.budget,
        contactEmail: retrievedContact.email,
        integrationPoints: ['CRM Data Consistency', 'Referential Integrity']
      });
      
      return { contact, lead, retrievedLead, retrievedContact };
    } catch (error) {
      addTestResult('Data Integrity', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Ejecutar todos los tests
  const runAllTests = async () => {
    setTestResults([]);
    await testCompleteLeadToClientFlow();
    await testJNIWithCRMIntegration();
    await testBookingWithPaymentIntegration();
    await testAnalyticsIntegration();
    await testECVCompleteFlow();
    await testDataIntegrity();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">System Integrations Testing</h1>
      
      {/* Información sobre integraciones */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">About System Integrations</h2>
        <p className="text-blue-800 mb-2">
          <strong>Payment System:</strong> Integrates with CRM, Booking, and Analytics
        </p>
        <p className="text-blue-800 mb-2">
          <strong>CRM System:</strong> Connects with JNI, Payment, and Analytics
        </p>
        <p className="text-blue-800 mb-2">
          <strong>JNI Integration:</strong> Syncs with CRM and Analytics
        </p>
        <p className="text-blue-800 mb-2">
          <strong>Booking System:</strong> Integrates with Payment and Analytics
        </p>
        <p className="text-blue-800">
          <strong>Analytics:</strong> Aggregates data from all systems
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
            {isLoading ? 'Running Tests...' : 'Run All Integration Tests'}
          </button>
          
          <button
            onClick={testCompleteLeadToClientFlow}
            disabled={isLoading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            Test Lead to Client Flow
          </button>
          
          <button
            onClick={testJNIWithCRMIntegration}
            disabled={isLoading}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
          >
            Test JNI + CRM
          </button>
          
          <button
            onClick={testBookingWithPaymentIntegration}
            disabled={isLoading}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors"
          >
            Test Booking + Payment
          </button>
          
          <button
            onClick={testAnalyticsIntegration}
            disabled={isLoading}
            className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50 transition-colors"
          >
            Test Analytics Integration
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
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Integration Test Results</h2>
        
        {testResults.length === 0 ? (
          <p className="text-gray-600">No tests run yet. Click "Run All Integration Tests" to start.</p>
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
                    View Integration Details
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

export default IntegrationsTestingPage;

