// Service Worker para Tabiji House PWA
// Versión: 1.0.0
// Funcionalidades: Cache, Offline, Push Notifications, Background Sync

const CACHE_NAME = 'tabiji-house-v1.0.0';
const STATIC_CACHE_NAME = 'tabiji-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'tabiji-dynamic-v1.0.0';

// Archivos estáticos para cache
const STATIC_ASSETS = [
  '/',
  '/dashboard',
  '/projects',
  '/about',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/offline.html',
  // CSS y JS serán agregados dinámicamente
];

// URLs que siempre deben ir a la red
const NETWORK_FIRST_URLS = [
  '/api/',
  '/auth/',
  '/supabase/',
];

// URLs que pueden usar cache primero
const CACHE_FIRST_URLS = [
  '/static/',
  '/images/',
  '/icons/',
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker...');
  
  event.waitUntil(
    Promise.all([
      // Cache de archivos estáticos
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('[SW] Cacheando archivos estáticos...');
        return cache.addAll(STATIC_ASSETS);
      }),
      
      // Cache de recursos dinámicos
      caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
        console.log('[SW] Cache dinámico listo');
        return Promise.resolve();
      })
    ]).then(() => {
      console.log('[SW] Instalación completada');
      return self.skipWaiting();
    })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activando Service Worker...');
  
  event.waitUntil(
    Promise.all([
      // Limpiar caches antiguos
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('[SW] Eliminando cache antiguo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Tomar control de todas las páginas
      self.clients.claim()
    ]).then(() => {
      console.log('[SW] Activación completada');
    })
  );
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Solo interceptar requests HTTP/HTTPS
  if (!request.url.startsWith('http')) {
    return;
  }
  
  // Estrategia Network First para APIs
  if (NETWORK_FIRST_URLS.some(pattern => url.pathname.startsWith(pattern))) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }
  
  // Estrategia Cache First para recursos estáticos
  if (CACHE_FIRST_URLS.some(pattern => url.pathname.startsWith(pattern))) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }
  
  // Estrategia Stale While Revalidate para páginas
  if (request.method === 'GET') {
    event.respondWith(staleWhileRevalidateStrategy(request));
  }
});

// Estrategia: Network First
async function networkFirstStrategy(request) {
  try {
    // Intentar red primero
    const networkResponse = await fetch(request);
    
    // Si es exitoso, actualizar cache
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Red falló, intentando cache:', request.url);
    
    // Si falla la red, usar cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Si no hay cache, mostrar página offline
    if (request.destination === 'document') {
      return caches.match('/offline.html');
    }
    
    throw error;
  }
}

// Estrategia: Cache First
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Error en cache first:', error);
    throw error;
  }
}

// Estrategia: Stale While Revalidate
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  // Actualizar en background
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    // Si falla la red, mantener cache
    return cachedResponse;
  });
  
  // Devolver cache inmediatamente si existe
  return cachedResponse || fetchPromise;
}

// Manejar mensajes del cliente
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_VERSION':
      event.ports[0].postMessage({ version: CACHE_NAME });
      break;
      
    case 'CLEAR_CACHE':
      clearAllCaches().then(() => {
        event.ports[0].postMessage({ success: true });
      });
      break;
      
    case 'CACHE_URLS':
      cacheUrls(payload.urls).then(() => {
        event.ports[0].postMessage({ success: true });
      });
      break;
  }
});

// Limpiar todos los caches
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(cacheName => caches.delete(cacheName))
  );
}

// Cachear URLs específicas
async function cacheUrls(urls) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  await Promise.all(
    urls.map(url => cache.add(url))
  );
}

// Push Notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push recibido:', event);
  
  let notificationData = {
    title: 'Tabiji House',
    body: 'Tienes una nueva notificación',
    icon: '/icon-192x192.png',
    badge: '/icon-96x96.png',
    tag: 'tabiji-notification',
    data: {
      url: '/dashboard'
    },
    actions: [
      {
        action: 'open',
        title: 'Abrir Dashboard',
        icon: '/action-open.png'
      },
      {
        action: 'dismiss',
        title: 'Descartar',
        icon: '/action-dismiss.png'
      }
    ],
    requireInteraction: true,
    silent: false
  };
  
  // Si hay datos en el push
  if (event.data) {
    try {
      const pushData = event.data.json();
      notificationData = { ...notificationData, ...pushData };
    } catch (error) {
      console.log('[SW] Error parseando push data:', error);
    }
  }
  
  event.waitUntil(
    self.registration.showNotification(notificationData.title, notificationData)
  );
});

// Manejar clics en notificaciones
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Click en notificación:', event);
  
  event.notification.close();
  
  if (event.action === 'dismiss') {
    return;
  }
  
  const urlToOpen = event.notification.data?.url || '/dashboard';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Si ya hay una ventana abierta, enfocarla
      for (const client of clientList) {
        if (client.url.includes(urlToOpen) && 'focus' in client) {
          return client.focus();
        }
      }
      
      // Si no hay ventana abierta, abrir una nueva
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Background Sync
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  switch (event.tag) {
    case 'background-sync':
      event.waitUntil(doBackgroundSync());
      break;
      
    case 'analytics-sync':
      event.waitUntil(syncAnalytics());
      break;
      
    case 'favorites-sync':
      event.waitUntil(syncFavorites());
      break;
  }
});

// Sincronización en background
async function doBackgroundSync() {
  try {
    // Sincronizar datos pendientes
    console.log('[SW] Ejecutando sincronización en background...');
    
    // Aquí iría la lógica de sincronización
    // Por ejemplo, enviar datos offline al servidor
    
    return Promise.resolve();
  } catch (error) {
    console.log('[SW] Error en background sync:', error);
    throw error;
  }
}

// Sincronizar analytics
async function syncAnalytics() {
  try {
    // Enviar analytics offline al servidor
    console.log('[SW] Sincronizando analytics...');
    return Promise.resolve();
  } catch (error) {
    console.log('[SW] Error sincronizando analytics:', error);
    throw error;
  }
}

// Sincronizar favoritos
async function syncFavorites() {
  try {
    // Sincronizar favoritos con el servidor
    console.log('[SW] Sincronizando favoritos...');
    return Promise.resolve();
  } catch (error) {
    console.log('[SW] Error sincronizando favoritos:', error);
    throw error;
  }
}

// Manejar errores
self.addEventListener('error', (event) => {
  console.log('[SW] Error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.log('[SW] Unhandled rejection:', event.reason);
});

console.log('[SW] Service Worker cargado correctamente');
