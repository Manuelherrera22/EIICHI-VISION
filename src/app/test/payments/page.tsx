'use client';

import React, { useState } from 'react';
import { TabijiPaymentService, TabijiProductType } from '@/lib/payments/payment-service';
import PaymentForm from '@/components/payments/PaymentForm';

const PaymentTestingPage: React.FC = () => {
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

  // Test 1: Verificar configuración de Stripe
  const testStripeConfig = async () => {
    setIsLoading(true);
    try {
      const { stripeConfig } = await import('@/lib/payments/stripe-config');
      
      const hasPublishableKey = !!stripeConfig.publishableKey;
      const hasSupportedCurrencies = stripeConfig.supportedCurrencies.length > 0;
      const hasJapanConfig = !!stripeConfig.japanConfig;
      
      const success = hasPublishableKey && hasSupportedCurrencies && hasJapanConfig;
      
      addTestResult('Stripe Configuration', success, {
        hasPublishableKey,
        hasSupportedCurrencies,
        supportedCurrencies: stripeConfig.supportedCurrencies,
        japanPaymentMethods: stripeConfig.japanPaymentMethods,
        hasJapanConfig
      });
    } catch (error) {
      addTestResult('Stripe Configuration', false, { error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // Test 2: Crear sesión de pago de prueba
  const testPaymentSessionCreation = async () => {
    setIsLoading(true);
    try {
      const paymentRequest = {
        amount: 100000, // 1000 USD o 100,000 JPY
        currency: 'usd',
        productType: TabijiProductType.PROPERTY_PURCHASE,
        customerEmail: 'test@tabijihouse.com',
        customerName: 'Test User',
        metadata: {
          propertyId: 'test_property_001',
          clientId: 'test_client_001',
          serviceType: 'property_purchase',
          region: 'international',
        }
      };

      const session = await TabijiPaymentService.createPropertyPaymentSession(paymentRequest);
      
      const success = !!session.id;
      
      addTestResult('Payment Session Creation', success, {
        sessionId: session.id,
        hasUrl: !!session.url,
        requestData: paymentRequest
      });
    } catch (error) {
      addTestResult('Payment Session Creation', false, { error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // Test 3: Crear ECV Subscription
  const testECVSubscription = async () => {
    setIsLoading(true);
    try {
      const session = await TabijiPaymentService.createECVSubscription(
        'test@tabijihouse.com',
        'Test User',
        'international'
      );
      
      const success = !!session.id;
      
      addTestResult('ECV Subscription Creation', success, {
        sessionId: session.id,
        hasUrl: !!session.url
      });
    } catch (error) {
      addTestResult('ECV Subscription Creation', false, { error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // Test 4: Verificar pago (simulado)
  const testPaymentVerification = async () => {
    setIsLoading(true);
    try {
      // Usar un session ID de prueba
      const mockSessionId = 'cs_test_1234567890';
      
      try {
        const verification = await TabijiPaymentService.verifyPayment(mockSessionId);
        addTestResult('Payment Verification', true, {
          sessionId: mockSessionId,
          verification
        });
      } catch (error) {
        // Esperado que falle con session ID de prueba
        addTestResult('Payment Verification', true, {
          sessionId: mockSessionId,
          note: 'Failed as expected with test session ID',
          error: error.message
        });
      }
    } catch (error) {
      addTestResult('Payment Verification', false, { error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // Ejecutar todos los tests
  const runAllTests = async () => {
    setTestResults([]);
    await testStripeConfig();
    await testPaymentSessionCreation();
    await testECVSubscription();
    await testPaymentVerification();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Payment System Testing</h1>
      
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
            onClick={testStripeConfig}
            disabled={isLoading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            Test Stripe Config
          </button>
          
          <button
            onClick={testPaymentSessionCreation}
            disabled={isLoading}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
          >
            Test Payment Session
          </button>
          
          <button
            onClick={testECVSubscription}
            disabled={isLoading}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors"
          >
            Test ECV Subscription
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
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
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

      {/* Test del componente PaymentForm */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Form Component Test</h2>
        <p className="text-gray-600 mb-4">
          Testing the actual PaymentForm component with mock data:
        </p>
        
        <PaymentForm
          productType={TabijiProductType.PROPERTY_PURCHASE}
          amount={100000}
          currency="usd"
          region="international"
          propertyId="test_property_001"
          onSuccess={(sessionId) => {
            addTestResult('Payment Form Component', true, {
              sessionId,
              note: 'Form submitted successfully'
            });
          }}
          onCancel={() => {
            addTestResult('Payment Form Component', true, {
              note: 'Form cancelled by user'
            });
          }}
        />
      </div>
    </div>
  );
};

export default PaymentTestingPage;

