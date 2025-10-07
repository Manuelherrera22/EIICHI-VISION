'use client';

import React, { useState } from 'react';
import { TabijiAnalyticsService } from '@/lib/analytics/analytics-service';
import { MetricType, TimeRange } from '@/lib/analytics/analytics-types';

const AnalyticsTestingPage: React.FC = () => {
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

  // Test 1: Obtener métricas de conversión
  const testGetConversionMetrics = async () => {
    setIsLoading(true);
    try {
      const metrics = await TabijiAnalyticsService.getConversionMetrics(TimeRange.MONTH);
      
      const success = !!metrics && typeof metrics.overallConversionRate === 'number';
      
      addTestResult('Get Conversion Metrics', success, {
        overallConversionRate: metrics.overallConversionRate,
        qualifiedConversionRate: metrics.qualifiedConversionRate,
        clientConversionRate: metrics.clientConversionRate,
        ecvActivationRate: metrics.ecvActivationRate,
        timeRange: metrics.timeRange,
        totalLeads: metrics.totalLeads,
        totalQualified: metrics.totalQualified,
        totalClients: metrics.totalClients,
        totalECVActivations: metrics.totalECVActivations
      });
      
      return metrics;
    } catch (error) {
      addTestResult('Get Conversion Metrics', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 2: Obtener métricas de engagement
  const testGetEngagementMetrics = async () => {
    setIsLoading(true);
    try {
      const metrics = await TabijiAnalyticsService.getEngagementMetrics(TimeRange.MONTH);
      
      const success = !!metrics && typeof metrics.averageSessionDuration === 'number';
      
      addTestResult('Get Engagement Metrics', success, {
        averageSessionDuration: metrics.averageSessionDuration,
        averagePageViews: metrics.averagePageViews,
        bounceRate: metrics.bounceRate,
        returnVisitorRate: metrics.returnVisitorRate,
        timeRange: metrics.timeRange,
        totalSessions: metrics.totalSessions,
        totalPageViews: metrics.totalPageViews,
        totalUniqueVisitors: metrics.totalUniqueVisitors
      });
      
      return metrics;
    } catch (error) {
      addTestResult('Get Engagement Metrics', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 3: Obtener métricas de ingresos
  const testGetRevenueMetrics = async () => {
    setIsLoading(true);
    try {
      const metrics = await TabijiAnalyticsService.getRevenueMetrics(TimeRange.MONTH);
      
      const success = !!metrics && typeof metrics.totalRevenue === 'number';
      
      addTestResult('Get Revenue Metrics', success, {
        totalRevenue: metrics.totalRevenue,
        averageDealSize: metrics.averageDealSize,
        revenueGrowthRate: metrics.revenueGrowthRate,
        timeRange: metrics.timeRange,
        currency: metrics.currency,
        revenueBySource: metrics.revenueBySource,
        revenueByClientType: metrics.revenueByClientType,
        monthlyRecurringRevenue: metrics.monthlyRecurringRevenue,
        annualRecurringRevenue: metrics.annualRecurringRevenue
      });
      
      return metrics;
    } catch (error) {
      addTestResult('Get Revenue Metrics', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 4: Obtener métricas de propiedades
  const testGetPropertyMetrics = async () => {
    setIsLoading(true);
    try {
      const metrics = await TabijiAnalyticsService.getPropertyMetrics(TimeRange.MONTH);
      
      const success = !!metrics && typeof metrics.totalProperties === 'number';
      
      addTestResult('Get Property Metrics', success, {
        totalProperties: metrics.totalProperties,
        availableProperties: metrics.availableProperties,
        soldProperties: metrics.soldProperties,
        averagePrice: metrics.averagePrice,
        priceGrowthRate: metrics.priceGrowthRate,
        timeRange: metrics.timeRange,
        currency: metrics.currency,
        propertiesByType: metrics.propertiesByType,
        propertiesByLocation: metrics.propertiesByLocation,
        averageDaysOnMarket: metrics.averageDaysOnMarket
      });
      
      return metrics;
    } catch (error) {
      addTestResult('Get Property Metrics', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 5: Obtener métricas de clientes
  const testGetClientMetrics = async () => {
    setIsLoading(true);
    try {
      const metrics = await TabijiAnalyticsService.getClientMetrics(TimeRange.MONTH);
      
      const success = !!metrics && typeof metrics.totalClients === 'number';
      
      addTestResult('Get Client Metrics', success, {
        totalClients: metrics.totalClients,
        activeClients: metrics.activeClients,
        newClients: metrics.newClients,
        clientRetentionRate: metrics.clientRetentionRate,
        averageClientValue: metrics.averageClientValue,
        timeRange: metrics.timeRange,
        clientsByType: metrics.clientsByType,
        clientsByRegion: metrics.clientsByRegion,
        averageClientLifetime: metrics.averageClientLifetime
      });
      
      return metrics;
    } catch (error) {
      addTestResult('Get Client Metrics', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 6: Obtener métricas de servicios
  const testGetServiceMetrics = async () => {
    setIsLoading(true);
    try {
      const metrics = await TabijiAnalyticsService.getServiceMetrics(TimeRange.MONTH);
      
      const success = !!metrics && typeof metrics.totalServices === 'number';
      
      addTestResult('Get Service Metrics', success, {
        totalServices: metrics.totalServices,
        activeServices: metrics.activeServices,
        newServices: metrics.newServices,
        serviceUtilizationRate: metrics.serviceUtilizationRate,
        averageServiceRating: metrics.averageServiceRating,
        timeRange: metrics.timeRange,
        servicesByType: metrics.servicesByType,
        servicesByCategory: metrics.servicesByCategory,
        averageServiceDuration: metrics.averageServiceDuration
      });
      
      return metrics;
    } catch (error) {
      addTestResult('Get Service Metrics', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 7: Obtener métricas de performance
  const testGetPerformanceMetrics = async () => {
    setIsLoading(true);
    try {
      const metrics = await TabijiAnalyticsService.getPerformanceMetrics(TimeRange.MONTH);
      
      const success = !!metrics && typeof metrics.averageResponseTime === 'number';
      
      addTestResult('Get Performance Metrics', success, {
        averageResponseTime: metrics.averageResponseTime,
        uptime: metrics.uptime,
        errorRate: metrics.errorRate,
        timeRange: metrics.timeRange,
        totalRequests: metrics.totalRequests,
        totalErrors: metrics.totalErrors,
        averageLoadTime: metrics.averageLoadTime,
        peakConcurrentUsers: metrics.peakConcurrentUsers,
        averageConcurrentUsers: metrics.averageConcurrentUsers
      });
      
      return metrics;
    } catch (error) {
      addTestResult('Get Performance Metrics', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 8: Obtener métricas de marketing
  const testGetMarketingMetrics = async () => {
    setIsLoading(true);
    try {
      const metrics = await TabijiAnalyticsService.getMarketingMetrics(TimeRange.MONTH);
      
      const success = !!metrics && typeof metrics.totalCampaigns === 'number';
      
      addTestResult('Get Marketing Metrics', success, {
        totalCampaigns: metrics.totalCampaigns,
        activeCampaigns: metrics.activeCampaigns,
        campaignROI: metrics.campaignROI,
        costPerLead: metrics.costPerLead,
        costPerAcquisition: metrics.costPerAcquisition,
        timeRange: metrics.timeRange,
        campaignsByChannel: metrics.campaignsByChannel,
        campaignsByStatus: metrics.campaignsByStatus,
        averageCampaignDuration: metrics.averageCampaignDuration
      });
      
      return metrics;
    } catch (error) {
      addTestResult('Get Marketing Metrics', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 9: Obtener métricas de satisfacción
  const testGetSatisfactionMetrics = async () => {
    setIsLoading(true);
    try {
      const metrics = await TabijiAnalyticsService.getSatisfactionMetrics(TimeRange.MONTH);
      
      const success = !!metrics && typeof metrics.overallSatisfaction === 'number';
      
      addTestResult('Get Satisfaction Metrics', success, {
        overallSatisfaction: metrics.overallSatisfaction,
        serviceSatisfaction: metrics.serviceSatisfaction,
        propertySatisfaction: metrics.propertySatisfaction,
        communicationSatisfaction: metrics.communicationSatisfaction,
        timeRange: metrics.timeRange,
        totalResponses: metrics.totalResponses,
        satisfactionByClientType: metrics.satisfactionByClientType,
        satisfactionByService: metrics.satisfactionByService,
        averageResponseTime: metrics.averageResponseTime
      });
      
      return metrics;
    } catch (error) {
      addTestResult('Get Satisfaction Metrics', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 10: Obtener métricas personalizadas
  const testGetCustomMetrics = async () => {
    setIsLoading(true);
    try {
      const metrics = await TabijiAnalyticsService.getCustomMetrics(
        [MetricType.CONVERSION, MetricType.REVENUE],
        TimeRange.MONTH
      );
      
      const success = !!metrics && Array.isArray(metrics);
      
      addTestResult('Get Custom Metrics', success, {
        metricsCount: metrics.length,
        metrics: metrics.map(metric => ({
          type: metric.type,
          value: metric.value,
          unit: metric.unit,
          timeRange: metric.timeRange,
          timestamp: metric.timestamp
        }))
      });
      
      return metrics;
    } catch (error) {
      addTestResult('Get Custom Metrics', false, { error: error.message });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Ejecutar todos los tests
  const runAllTests = async () => {
    setTestResults([]);
    await testGetConversionMetrics();
    await testGetEngagementMetrics();
    await testGetRevenueMetrics();
    await testGetPropertyMetrics();
    await testGetClientMetrics();
    await testGetServiceMetrics();
    await testGetPerformanceMetrics();
    await testGetMarketingMetrics();
    await testGetSatisfactionMetrics();
    await testGetCustomMetrics();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics System Testing</h1>
      
      {/* Información sobre Analytics */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-indigo-900 mb-2">About Analytics System</h2>
        <p className="text-indigo-800 mb-2">
          <strong>Metrics Types:</strong> Conversion, Engagement, Revenue, Property, Client, Service, Performance, Marketing, Satisfaction
        </p>
        <p className="text-indigo-800 mb-2">
          <strong>Time Ranges:</strong> Day, Week, Month, Quarter, Year
        </p>
        <p className="text-indigo-800 mb-2">
          <strong>Features:</strong> Real-time tracking, Custom metrics, Performance monitoring, ROI analysis
        </p>
        <p className="text-indigo-800">
          <strong>Note:</strong> Tests use mock data for demonstration purposes.
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
            onClick={testGetConversionMetrics}
            disabled={isLoading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            Test Conversion Metrics
          </button>
          
          <button
            onClick={testGetRevenueMetrics}
            disabled={isLoading}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
          >
            Test Revenue Metrics
          </button>
          
          <button
            onClick={testGetPropertyMetrics}
            disabled={isLoading}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors"
          >
            Test Property Metrics
          </button>
          
          <button
            onClick={testGetPerformanceMetrics}
            disabled={isLoading}
            className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50 transition-colors"
          >
            Test Performance Metrics
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

export default AnalyticsTestingPage;

