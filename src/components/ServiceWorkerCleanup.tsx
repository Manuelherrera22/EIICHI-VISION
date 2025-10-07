'use client';

import { useEffect } from 'react';
import { swCleanup } from '@/lib/sw-cleanup';

const ServiceWorkerCleanup: React.FC = () => {
  useEffect(() => {
    // Only run cleanup in development or when explicitly needed
    if (process.env.NODE_ENV === 'development') {
      // Delay to let the page load first
      const timer = setTimeout(() => {
        swCleanup.autoCleanupIfNeeded().catch(console.error);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  // This component doesn't render anything
  return null;
};

export default ServiceWorkerCleanup;

