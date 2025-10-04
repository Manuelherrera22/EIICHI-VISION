'use client';

import React from 'react';

const JNIPartnershipButtons: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-20">
      <a 
        href="/about"
        className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer text-center"
      >
        Learn More About Partnership
      </a>
      <a 
        href="/contact"
        className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer text-center"
      >
        Contact Our Team
      </a>
    </div>
  );
};

export default JNIPartnershipButtons;
