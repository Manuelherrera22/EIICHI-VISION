# Service Worker Debug Guide

## 🚨 Current Issues Fixed

The Service Worker errors you were seeing have been resolved:

### Issues Addressed:
- ❌ `TypeError: Failed to fetch` errors
- ❌ `favicon.ico` fetch failures  
- ❌ `/blueprint` route fetch failures
- ❌ Unhandled promise rejections
- ❌ Cache-first strategy failures

### Solutions Implemented:

1. **Improved Error Handling**
   - Added timeout mechanisms (5 seconds)
   - Better error catching and fallbacks
   - Graceful degradation for failed requests

2. **Skip Problematic Paths**
   - Added skip list for paths that cause issues
   - `/favicon.ico`, `/blueprint`, `/_next/`, `/api/`, `/test/`

3. **Enhanced Cache Management**
   - Updated cache version to v2
   - Better cache cleanup on activation
   - Improved cache-first and network-first strategies

4. **Auto-Cleanup System**
   - Automatic detection of old caches
   - Development mode auto-cleanup
   - Manual cleanup tools

## 🛠️ Debugging Tools

### 1. Service Worker Admin Page
```
http://localhost:3000/admin/service-worker
```
- Real-time Service Worker status
- Cache management
- Manual cleanup actions
- Activity logs

### 2. Browser Console Commands

#### Clear All Caches:
```javascript
caches.keys().then(names => Promise.all(names.map(name => caches.delete(name))));
```

#### Unregister Service Workers:
```javascript
navigator.serviceWorker.getRegistrations().then(regs => Promise.all(regs.map(reg => reg.unregister())));
```

#### Complete Cleanup:
```javascript
// Load the cleanup utility
import('/lib/sw-cleanup.js').then(module => {
  module.swCleanup.completeCleanup();
});
```

### 3. Manual Script
Run the batch file for guided cleanup:
```bash
./clear-sw.bat
```

## 🔧 Service Worker Configuration

### Cache Strategy:
- **Static Assets**: Cache First
- **API Requests**: Network First
- **Pages**: Network First with Cache Fallback

### Timeout Settings:
- Network requests: 5 seconds
- Cache operations: Immediate

### Skip Patterns:
- `/favicon.ico` - Browser default
- `/blueprint` - Non-existent route
- `/_next/` - Next.js internal
- `/api/` - API routes (handled separately)
- `/test/` - Testing routes

## 🚀 Quick Fixes

### If Service Worker Still Has Issues:

1. **Hard Refresh Browser**:
   - Chrome/Edge: `Ctrl+Shift+R`
   - Firefox: `Ctrl+F5`
   - Safari: `Cmd+Option+R`

2. **Clear Browser Data**:
   - Go to DevTools (F12)
   - Application tab → Storage → Clear site data

3. **Disable Service Worker Temporarily**:
   - DevTools → Application → Service Workers
   - Click "Unregister"

4. **Use Admin Page**:
   - Visit `/admin/service-worker`
   - Click "Clear Caches" and "Unregister SW"

## 📊 Monitoring

### Check Service Worker Status:
```javascript
navigator.serviceWorker.getRegistration().then(reg => {
  console.log('SW Status:', reg?.active?.state);
  console.log('SW Scope:', reg?.scope);
  console.log('Update Available:', !!reg?.waiting);
});
```

### Check Cache Status:
```javascript
caches.keys().then(names => {
  console.log('Active Caches:', names);
});
```

## 🎯 Best Practices

1. **Development Mode**:
   - Auto-cleanup is enabled
   - Old caches are automatically removed
   - Service Worker updates are forced

2. **Production Mode**:
   - Caching is optimized
   - Error handling is robust
   - Offline functionality is preserved

3. **Testing**:
   - Use `/test` routes for system testing
   - Service Worker issues won't affect testing
   - Admin page available for debugging

## 🆘 Emergency Recovery

If Service Worker is completely broken:

1. **Disable Service Worker**:
   ```javascript
   navigator.serviceWorker.getRegistrations().then(registrations => {
     registrations.forEach(registration => registration.unregister());
     window.location.reload();
   });
   ```

2. **Clear Everything**:
   ```javascript
   caches.keys().then(names => Promise.all(names.map(name => caches.delete(name))));
   localStorage.clear();
   sessionStorage.clear();
   window.location.reload();
   ```

3. **Use Incognito Mode**:
   - Open site in incognito/private window
   - No Service Worker or cache interference

## ✅ Verification

After fixes, you should see:
- ✅ No `TypeError: Failed to fetch` errors
- ✅ No unhandled promise rejections
- ✅ Service Worker loads successfully
- ✅ Cache operations work properly
- ✅ Network requests complete successfully

The Service Worker is now much more robust and should handle edge cases gracefully without throwing errors.

