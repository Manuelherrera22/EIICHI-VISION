'use client';

import React from 'react';

const IntegrationsTestingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Integrations Testing Page
          </h1>
          <p className="text-lg text-gray-600">
            This page is currently disabled in production
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <p className="text-lg">Integration testing is only available in development mode</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsTestingPage;
