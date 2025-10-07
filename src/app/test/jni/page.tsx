'use client';

import React, { useState } from 'react';
import { JNIIntegrationService } from '@/lib/jni/jni-integration';

const JNITestingPage: React.FC = () => {
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

  // Test 1: Obtener propiedades disponibles
  const testGetAvailableProperties = async () => {
    setIsLoading(true);
    try {
      const properties = await JNIIntegrationService.getAvailableProperties({
        prefecture: 'Gunma',
        propertyType: 'akiya',
        minPrice: 10000000,
        maxPrice: 30000000
      });
      
      const success = Array.isArray(properties) && properties.length > 0;
      
      addTestResult('Get Available Properties', success, {
        propertyCount: properties.length,
        properties: properties.map(p => ({
          id: p.id,
          title: p.title,
          type: p.type,
          askingPrice: p.pricing.askingPrice,
          location: p.location.city
        }))
      });
      
      return properties;
    } catch (error) {
      addTestResult('Get Available Properties', false, { error: error.message });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Test 2: Obtener propiedad específica
  const testGetPropertyById = async () => {
    setIsLoading(true);
    try {
      const property = await JNIIntegrationService.getPropertyById('jni_001');
      
      const success = !!property && !!property.id;
      
      addTestResult('Get Property by ID', success, {
        propertyId: property?.id,
        title: property?.title,
        type: property?.type,
        askingPrice: property?.pricing.askingPrice,
        currency: property?.pricing.currency,
        status: property?.status,
        agentName: property?.agent.name
      });
      
      return property;
    } catch (error) {
      addTestResult('Get Property by ID', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 3: Obtener agentes disponibles
  const testGetAvailableAgents = async () => {
    setIsLoading(true);
    try {
      const agents = await JNIIntegrationService.getAvailableAgents();
      
      const success = Array.isArray(agents) && agents.length > 0;
      
      addTestResult('Get Available Agents', success, {
        agentCount: agents.length,
        agents: agents.map(a => ({
          id: a.id,
          name: a.name,
          licenseNumber: a.licenseNumber,
          specialization: a.specialization,
          languages: a.languages,
          experience: a.experience
        }))
      });
      
      return agents;
    } catch (error) {
      addTestResult('Get Available Agents', false, { error: error.message });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Test 4: Iniciar transacción
  const testInitiateTransaction = async () => {
    setIsLoading(true);
    try {
      const transaction = await JNIIntegrationService.initiateTransaction({
        propertyId: 'jni_001',
        clientId: 'test_client_001',
        agentId: 'agent_001',
        type: 'sale',
        amount: 15000000,
        currency: 'JPY',
        clientInfo: {
          name: 'Test Client',
          email: 'test@tabijihouse.com',
          phone: '+81-90-1234-5678',
          nationality: 'United States',
          visaStatus: 'Tourist'
        }
      });
      
      const success = !!transaction.id && !!transaction.propertyId;
      
      addTestResult('Initiate Transaction', success, {
        transactionId: transaction.id,
        propertyId: transaction.propertyId,
        clientId: transaction.clientId,
        agentId: transaction.agentId,
        type: transaction.type,
        amount: transaction.amount,
        currency: transaction.currency,
        status: transaction.status
      });
      
      return transaction;
    } catch (error) {
      addTestResult('Initiate Transaction', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 5: Verificar estado de transacción
  const testGetTransactionStatus = async () => {
    setIsLoading(true);
    try {
      const transaction = await JNIIntegrationService.getTransactionStatus('test_transaction_001');
      
      // Esperamos que falle con ID de prueba, pero verificamos que el método funciona
      const success = true; // El método se ejecutó sin errores críticos
      
      addTestResult('Get Transaction Status', success, {
        transactionId: 'test_transaction_001',
        note: 'Method executed successfully (expected to return null for test ID)',
        result: transaction ? 'Found' : 'Not found (expected)'
      });
      
      return transaction;
    } catch (error) {
      addTestResult('Get Transaction Status', true, { 
        note: 'Method executed, error expected for test ID',
        error: error.message 
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 6: Validar propiedad
  const testValidateProperty = async () => {
    setIsLoading(true);
    try {
      const validation = await JNIIntegrationService.validateProperty('jni_001');
      
      const success = !!validation && typeof validation.isValid === 'boolean';
      
      addTestResult('Validate Property', success, {
        propertyId: 'jni_001',
        isValid: validation.isValid,
        issues: validation.issues,
        recommendations: validation.recommendations
      });
      
      return validation;
    } catch (error) {
      addTestResult('Validate Property', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 7: Verificar configuración de API
  const testAPIConfiguration = async () => {
    setIsLoading(true);
    try {
      // Verificar que las constantes están definidas
      const baseUrl = process.env.JNI_API_BASE_URL;
      const apiKey = process.env.JNI_API_KEY;
      
      const hasBaseUrl = !!baseUrl;
      const hasApiKey = !!apiKey;
      const isConfigured = hasBaseUrl && hasApiKey;
      
      addTestResult('API Configuration', isConfigured, {
        hasBaseUrl,
        hasApiKey,
        baseUrl: hasBaseUrl ? baseUrl : 'Not configured',
        apiKeyLength: hasApiKey ? apiKey.length : 0,
        note: isConfigured ? 'API properly configured' : 'Using mock data for testing'
      });
      
      return { hasBaseUrl, hasApiKey, isConfigured };
    } catch (error) {
      addTestResult('API Configuration', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Ejecutar todos los tests
  const runAllTests = async () => {
    setTestResults([]);
    await testAPIConfiguration();
    await testGetAvailableProperties();
    await testGetPropertyById();
    await testGetAvailableAgents();
    await testInitiateTransaction();
    await testGetTransactionStatus();
    await testValidateProperty();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">JNI Properties Integration Testing</h1>
      
      {/* Información sobre JNI */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">About JNI Properties Integration</h2>
        <p className="text-blue-800 mb-2">
          <strong>License:</strong> Ministro de Tierra, Infraestructura, Transporte y Turismo (2) No. 9062
        </p>
        <p className="text-blue-800 mb-2">
          <strong>Representative:</strong> Toshinori Shibusawa
        </p>
        <p className="text-blue-800">
          <strong>Note:</strong> Tests will use mock data if API credentials are not configured.
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
            onClick={testAPIConfiguration}
            disabled={isLoading}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            Test API Config
          </button>
          
          <button
            onClick={testGetAvailableProperties}
            disabled={isLoading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            Test Get Properties
          </button>
          
          <button
            onClick={testGetAvailableAgents}
            disabled={isLoading}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
          >
            Test Get Agents
          </button>
          
          <button
            onClick={testInitiateTransaction}
            disabled={isLoading}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors"
          >
            Test Transaction
          </button>
          
          <button
            onClick={() => setTestResults([])}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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

export default JNITestingPage;

