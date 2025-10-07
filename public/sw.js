// Service Worker for Tabiji House PWA
const CACHE_NAME = 'tabiji-house-v2';
const STATIC_CACHE = 'tabiji-house-static-v2';
const DYNAMIC_CACHE = 'tabiji-house-dynamic-v2';

// Files to cache for offline functionality
const STATIC_FILES = [
  '/',
  '/dashboard',
  '/projects',
  '/about',
  '/manifest.json',
  '/eiitico.ico'
];

// Skip these paths from caching
const SKIP_PATHS = [
  '/favicon.ico',
  '/blueprint',
  '/_next/',
  '/api/',
  '/test/'
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /\/api\/ai\/chat/,
  /\/api\/properties/,
  /\/api\/market/,
  /\/api\/analytics/
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static files...');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Static files cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Error caching static files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Skip certain paths that cause issues
  if (shouldSkipRequest(url)) {
    return;
  }

  event.respondWith(
    handleRequest(request).catch((error) => {
      console.warn('Service Worker fetch failed:', url.pathname, error);
      // Don't throw, just let the browser handle it
      return fetch(request);
    })
  );
});

function shouldSkipRequest(url) {
  return SKIP_PATHS.some(path => url.pathname.startsWith(path));
}

async function handleRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Skip favicon and other problematic requests
    if (shouldSkipRequest(url)) {
      return fetch(request);
    }

    // Try network first for API requests
    if (url.pathname.startsWith('/api/')) {
      return await networkFirst(request);
    }
    
    // Try cache first for static assets
    if (isStaticAsset(request)) {
      return await cacheFirst(request);
    }
    
    // For pages, try network first with cache fallback
    return await networkFirst(request);
    
  } catch (error) {
    console.error('Error handling request:', error);
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return await caches.match('/offline.html') || 
             new Response('Offline - Please check your connection', {
               status: 503,
               statusText: 'Service Unavailable'
             });
    }
    
    // For other requests, try to fetch directly
    try {
      return await fetch(request);
    } catch (fetchError) {
      console.error('Direct fetch also failed:', fetchError);
      throw error;
    }
  }
}

async function networkFirst(request) {
  try {
    // Try network first with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const networkResponse = await fetch(request, { 
      signal: controller.signal 
    });
    
    clearTimeout(timeoutId);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
    
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline response for API requests
    if (request.url.includes('/api/')) {
      return new Response(JSON.stringify({
        error: 'Offline',
        message: 'Please check your internet connection'
      }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Don't throw, let the browser handle the error
    console.warn('Network first failed, no cache available:', request.url);
    return new Response('Network error', { status: 503 });
  }
}

async function cacheFirst(request) {
  // Try cache first
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Cache miss, try network with timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const networkResponse = await fetch(request, { 
      signal: controller.signal 
    });
    
    clearTimeout(timeoutId);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
    
  } catch (error) {
    // Don't throw, return a basic response
    console.warn('Cache first failed:', request.url, error);
    return new Response('Resource not available', { status: 404 });
  }
}

function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/);
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Get pending actions from IndexedDB
    const pendingActions = await getPendingActions();
    
    for (const action of pendingActions) {
      try {
        await syncAction(action);
        await removePendingAction(action.id);
      } catch (error) {
        console.error('Failed to sync action:', action, error);
      }
    }
    
    console.log('Background sync completed');
    
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

async function getPendingActions() {
  // This would typically use IndexedDB
  // For now, return empty array
  return [];
}

async function syncAction(action) {
  // Sync individual action to server
  const response = await fetch(action.url, {
    method: action.method,
    headers: action.headers,
    body: action.body
  });
  
  if (!response.ok) {
    throw new Error(`Sync failed: ${response.status}`);
  }
  
  return response;
}

async function removePendingAction(actionId) {
  // Remove action from IndexedDB
  console.log('Removing pending action:', actionId);
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'New notification from Tabiji House',
    icon: '/tabijihouse-removebg-preview.png',
    badge: '/tabijihouse-removebg-preview.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/dashboard'
    },
    actions: [
      {
        action: 'open',
        title: 'Open Dashboard',
        icon: '/tabijihouse-removebg-preview.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/tabijihouse-removebg-preview.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Tabiji House', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/dashboard')
    );
  }
});

// Message handling from main thread
self.addEventListener('message', (event) => {
  console.log('Message received in service worker:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
  console.log('Periodic sync triggered:', event.tag);
  
  if (event.tag === 'content-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Error handling
self.addEventListener('error', (event) => {
  console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('Service Worker unhandled rejection:', event.reason);
});

console.log('Service Worker loaded successfully');