// Service Worker cleanup utilities
export class ServiceWorkerCleanup {
  private static instance: ServiceWorkerCleanup;
  
  public static getInstance(): ServiceWorkerCleanup {
    if (!ServiceWorkerCleanup.instance) {
      ServiceWorkerCleanup.instance = new ServiceWorkerCleanup();
    }
    return ServiceWorkerCleanup.instance;
  }

  /**
   * Clear all caches and reset Service Worker
   */
  async clearAllCaches(): Promise<void> {
    try {
      console.log('🧹 Clearing all caches...');
      
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        console.log(`Found ${cacheNames.length} caches to clear:`, cacheNames);
        
        await Promise.all(
          cacheNames.map(async (cacheName) => {
            const deleted = await caches.delete(cacheName);
            console.log(`Cache ${cacheName}: ${deleted ? 'deleted' : 'not found'}`);
          })
        );
        
        console.log('✅ All caches cleared successfully');
      } else {
        console.log('❌ Cache API not supported');
      }
    } catch (error) {
      console.error('❌ Error clearing caches:', error);
    }
  }

  /**
   * Unregister all Service Workers
   */
  async unregisterAllServiceWorkers(): Promise<void> {
    try {
      console.log('🔄 Unregistering Service Workers...');
      
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        console.log(`Found ${registrations.length} Service Worker registrations`);
        
        await Promise.all(
          registrations.map(async (registration) => {
            const unregistered = await registration.unregister();
            console.log(`Service Worker ${registration.scope}: ${unregistered ? 'unregistered' : 'failed to unregister'}`);
          })
        );
        
        console.log('✅ All Service Workers unregistered successfully');
      } else {
        console.log('❌ Service Worker API not supported');
      }
    } catch (error) {
      console.error('❌ Error unregistering Service Workers:', error);
    }
  }

  /**
   * Complete cleanup: clear caches and unregister Service Workers
   */
  async completeCleanup(): Promise<void> {
    console.log('🚀 Starting complete Service Worker cleanup...');
    
    await this.clearAllCaches();
    await this.unregisterAllServiceWorkers();
    
    console.log('🎉 Complete cleanup finished');
    
    // Optionally reload the page after cleanup
    if (confirm('Service Worker cleanup completed. Reload the page to re-register?')) {
      window.location.reload();
    }
  }

  /**
   * Check for problematic Service Worker patterns
   */
  async diagnoseIssues(): Promise<{
    hasServiceWorker: boolean;
    hasCaches: boolean;
    cacheCount: number;
    issues: string[];
  }> {
    const issues: string[] = [];
    let hasServiceWorker = false;
    let hasCaches = false;
    let cacheCount = 0;

    try {
      // Check Service Worker
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        hasServiceWorker = registrations.length > 0;
        
        if (registrations.length > 1) {
          issues.push('Multiple Service Workers registered');
        }
        
        for (const registration of registrations) {
          if (registration.waiting) {
            issues.push('Service Worker update available but not activated');
          }
        }
      }

      // Check caches
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        hasCaches = cacheNames.length > 0;
        cacheCount = cacheNames.length;
        
        if (cacheNames.length > 10) {
          issues.push('Too many caches (potential memory leak)');
        }
        
        // Check for old cache versions
        const oldCaches = cacheNames.filter(name => 
          name.includes('v1') || 
          name.includes('tabiji-house-v1') ||
          name.includes('static-v1') ||
          name.includes('dynamic-v1')
        );
        
        if (oldCaches.length > 0) {
          issues.push(`Found ${oldCaches.length} old cache versions`);
        }
      }

    } catch (error) {
      issues.push(`Diagnostic error: ${error}`);
    }

    return {
      hasServiceWorker,
      hasCaches,
      cacheCount,
      issues
    };
  }

  /**
   * Auto-cleanup on page load if issues detected
   */
  async autoCleanupIfNeeded(): Promise<void> {
    const diagnosis = await this.diagnoseIssues();
    
    if (diagnosis.issues.length > 0) {
      console.warn('⚠️ Service Worker issues detected:', diagnosis.issues);
      
      // Auto-cleanup for certain issues
      const shouldAutoCleanup = diagnosis.issues.some(issue => 
        issue.includes('old cache versions') ||
        issue.includes('Multiple Service Workers')
      );
      
      if (shouldAutoCleanup) {
        console.log('🔧 Auto-cleanup triggered due to detected issues');
        await this.completeCleanup();
      }
    } else {
      console.log('✅ No Service Worker issues detected');
    }
  }
}

// Global instance for easy access
export const swCleanup = ServiceWorkerCleanup.getInstance();

// Auto-cleanup on import (for development)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Run auto-cleanup after a short delay to let the page load
  setTimeout(() => {
    swCleanup.autoCleanupIfNeeded();
  }, 2000);
}

