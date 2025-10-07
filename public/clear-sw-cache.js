// Script to clear Service Worker cache and force update
// Run this in browser console if Service Worker issues persist

console.log('Clearing Service Worker cache...');

// Clear all caches
caches.keys().then((cacheNames) => {
  console.log('Found caches:', cacheNames);
  
  return Promise.all(
    cacheNames.map((cacheName) => {
      console.log('Deleting cache:', cacheName);
      return caches.delete(cacheName);
    })
  );
}).then(() => {
  console.log('All caches cleared');
  
  // Unregister service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        console.log('Unregistering service worker:', registration.scope);
        registration.unregister();
      });
      
      // Reload page to re-register
      console.log('Reloading page...');
      window.location.reload();
    });
  }
}).catch((error) => {
  console.error('Error clearing caches:', error);
});

console.log('Cache clearing script executed');

