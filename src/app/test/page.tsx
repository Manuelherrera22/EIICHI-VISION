'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Users, 
  Building2, 
  Camera, 
  Calendar, 
  BarChart3, 
  Link as LinkIcon,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

const TestingPage: React.FC = () => {
  const testSuites = [
    {
      id: 'payments',
      title: 'Payment System',
      description: 'Test Stripe integration, payment sessions, and transaction handling',
      icon: CreditCard,
      color: 'bg-blue-500',
      href: '/test/payments',
      status: 'ready',
      features: [
        'Stripe Configuration',
        'Payment Session Creation',
        'ECV Subscription',
        'Payment Verification',
        'Multi-currency Support'
      ]
    },
    {
      id: 'crm',
      title: 'CRM System',
      description: 'Test customer relationship management, leads, and client workflows',
      icon: Users,
      color: 'bg-green-500',
      href: '/test/crm',
      status: 'ready',
      features: [
        'Contact Management',
        'Lead Creation & Conversion',
        'Client Management',
        'Communication Tracking',
        'Task Management',
        'ECV Membership Activation'
      ]
    },
    {
      id: 'jni',
      title: 'JNI Properties Integration',
      description: 'Test integration with JNI Properties for real estate listings',
      icon: Building2,
      color: 'bg-purple-500',
      href: '/test/jni',
      status: 'ready',
      features: [
        'Property Search & Filtering',
        'Agent Management',
        'Transaction Initiation',
        'Property Validation',
        'Commission Tracking'
      ]
    },
    {
      id: 'ar',
      title: 'AR Components',
      description: 'Test augmented reality features and 3D model handling',
      icon: Camera,
      color: 'bg-orange-500',
      href: '/test/ar',
      status: 'ready',
      features: [
        'Device Capabilities Check',
        '3D Model Loading',
        'AR Initialization',
        'Surface Detection',
        'Model Placement',
        'Screenshot & Export'
      ]
    },
    {
      id: 'booking',
      title: 'Booking System',
      description: 'Test Kusatsu Project booking and concierge services',
      icon: Calendar,
      color: 'bg-pink-500',
      href: '/test/booking',
      status: 'ready',
      features: [
        'Experience Management',
        'Availability Checking',
        'Booking Creation',
        'Payment Integration',
        'Concierge Services',
        'Analytics Tracking'
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics System',
      description: 'Test comprehensive analytics and performance metrics',
      icon: BarChart3,
      color: 'bg-indigo-500',
      href: '/test/analytics',
      status: 'ready',
      features: [
        'Conversion Metrics',
        'Revenue Analytics',
        'Property Metrics',
        'Client Analytics',
        'Performance Monitoring',
        'Custom Metrics'
      ]
    },
    {
      id: 'integrations',
      title: 'System Integrations',
      description: 'Test end-to-end workflows across all systems',
      icon: LinkIcon,
      color: 'bg-teal-500',
      href: '/test/integrations',
      status: 'ready',
      features: [
        'Lead to Client Flow',
        'JNI + CRM Integration',
        'Booking + Payment Flow',
        'ECV Complete Workflow',
        'Data Integrity Checks',
        'Cross-system Analytics'
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ready':
        return 'Ready for Testing';
      case 'warning':
        return 'Some Issues Detected';
      case 'error':
        return 'Critical Issues';
      default:
        return 'Unknown Status';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Tabiji House Testing Suite
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive testing platform for all Tabiji House systems including payments, 
            CRM, JNI integration, AR components, booking, analytics, and cross-system workflows.
          </p>
        </motion.div>

        {/* System Status Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">System Status Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                <span className="font-semibold text-green-800">All Systems Operational</span>
              </div>
              <p className="text-sm text-green-600 mt-1">Ready for comprehensive testing</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <LinkIcon className="h-6 w-6 text-blue-500 mr-2" />
                <span className="font-semibold text-blue-800">7 Test Suites Available</span>
              </div>
              <p className="text-sm text-blue-600 mt-1">Covering all major functionalities</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center">
                <BarChart3 className="h-6 w-6 text-purple-500 mr-2" />
                <span className="font-semibold text-purple-800">Real-time Monitoring</span>
              </div>
              <p className="text-sm text-purple-600 mt-1">Live test results and analytics</p>
            </div>
          </div>
        </motion.div>

        {/* Test Suites Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testSuites.map((suite, index) => {
            const IconComponent = suite.icon;
            return (
              <motion.div
                key={suite.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={suite.href} className="block">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${suite.color} p-3 rounded-lg`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      {getStatusIcon(suite.status)}
                    </div>

                    {/* Title and Description */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {suite.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {suite.description}
                    </p>

                    {/* Status */}
                    <div className="mb-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        suite.status === 'ready' 
                          ? 'bg-green-100 text-green-800' 
                          : suite.status === 'warning'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {getStatusText(suite.status)}
                      </span>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 text-sm">Key Features:</h4>
                      <ul className="space-y-1">
                        {suite.features.slice(0, 4).map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                        {suite.features.length > 4 && (
                          <li className="text-xs text-gray-500 ml-5">
                            +{suite.features.length - 4} more features
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className={`${suite.color} text-white text-center py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity`}>
                        Run Tests →
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Testing Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 mt-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Testing Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Before Testing</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Ensure all environment variables are configured
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Verify database connections are active
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Check API credentials for external services
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">During Testing</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Monitor test results for any failures
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Review integration points between systems
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Check data consistency across systems
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestingPage;

