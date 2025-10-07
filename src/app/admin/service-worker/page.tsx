'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCw, 
  Trash2, 
  Download, 
  Upload, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Info,
  Settings
} from 'lucide-react';

interface ServiceWorkerInfo {
  registered: boolean;
  scope: string;
  state: string;
  updateAvailable: boolean;
  version?: string;
}

interface CacheInfo {
  name: string;
  size: number;
  entries: number;
}

const ServiceWorkerAdminPage: React.FC = () => {
  const [swInfo, setSwInfo] = useState<ServiceWorkerInfo | null>(null);
  const [caches, setCaches] = useState<CacheInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    checkServiceWorker();
    checkCaches();
    checkOnlineStatus();
    
    // Listen for online/offline events
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));
    
    return () => {
      window.removeEventListener('online', () => setIsOnline(true));
      window.removeEventListener('offline', () => setIsOnline(false));
    };
  }, []);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 49)]);
  };

  const checkServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          setSwInfo({
            registered: true,
            scope: registration.scope,
            state: registration.active?.state || 'unknown',
            updateAvailable: !!registration.waiting,
            version: 'v2'
          });
          addLog('Service Worker is registered');
        } else {
          setSwInfo({
            registered: false,
            scope: '',
            state: 'not registered',
            updateAvailable: false
          });
          addLog('Service Worker is not registered');
        }
      } catch (error) {
        addLog(`Error checking Service Worker: ${error}`);
      }
    } else {
      addLog('Service Worker not supported');
    }
  };

  const checkCaches = async () => {
    try {
      const cacheNames = await caches.keys();
      const cacheInfo: CacheInfo[] = [];
      
      for (const name of cacheNames) {
        const cache = await caches.open(name);
        const keys = await cache.keys();
        const size = keys.length;
        
        cacheInfo.push({
          name,
          size: 0, // We can't easily calculate actual size
          entries: size
        });
      }
      
      setCaches(cacheInfo);
      addLog(`Found ${cacheInfo.length} caches`);
    } catch (error) {
      addLog(`Error checking caches: ${error}`);
    }
  };

  const checkOnlineStatus = () => {
    setIsOnline(navigator.onLine);
  };

  const registerServiceWorker = async () => {
    setIsLoading(true);
    try {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register('/sw.js');
        addLog('Service Worker registered successfully');
        await checkServiceWorker();
      }
    } catch (error) {
      addLog(`Error registering Service Worker: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const unregisterServiceWorker = async () => {
    setIsLoading(true);
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.unregister();
        addLog('Service Worker unregistered');
        setSwInfo(null);
      }
    } catch (error) {
      addLog(`Error unregistering Service Worker: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearAllCaches = async () => {
    setIsLoading(true);
    try {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
      addLog('All caches cleared');
      await checkCaches();
    } catch (error) {
      addLog(`Error clearing caches: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSpecificCache = async (cacheName: string) => {
    setIsLoading(true);
    try {
      await caches.delete(cacheName);
      addLog(`Cache ${cacheName} cleared`);
      await checkCaches();
    } catch (error) {
      addLog(`Error clearing cache ${cacheName}: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const updateServiceWorker = async () => {
    setIsLoading(true);
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration && registration.waiting) {
        // Tell the waiting service worker to skip waiting
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        addLog('Service Worker update triggered');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      addLog(`Error updating Service Worker: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testServiceWorker = async () => {
    setIsLoading(true);
    try {
      // Test cache functionality
      const testUrl = '/';
      const cache = await caches.open('test-cache');
      await cache.add(testUrl);
      const response = await cache.match(testUrl);
      
      if (response) {
        addLog('Cache test: PASSED');
        await caches.delete('test-cache');
      } else {
        addLog('Cache test: FAILED');
      }
      
      // Test fetch functionality
      try {
        const fetchResponse = await fetch('/');
        if (fetchResponse.ok) {
          addLog('Fetch test: PASSED');
        } else {
          addLog('Fetch test: FAILED');
        }
      } catch (error) {
        addLog(`Fetch test: FAILED - ${error}`);
      }
      
    } catch (error) {
      addLog(`Service Worker test failed: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (state: string) => {
    switch (state) {
      case 'activated':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'activating':
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'installing':
        return <Download className="h-5 w-5 text-yellow-500" />;
      case 'redundant':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Service Worker Administration
          </h1>
          <p className="text-gray-600">
            Manage and debug the Tabiji House Service Worker
          </p>
        </motion.div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Service Worker Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Service Worker</h2>
              {swInfo && getStatusIcon(swInfo.state)}
            </div>
            
            {swInfo ? (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${
                    swInfo.registered ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {swInfo.registered ? 'Registered' : 'Not Registered'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">State:</span>
                  <span className="font-medium">{swInfo.state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Version:</span>
                  <span className="font-medium">{swInfo.version || 'Unknown'}</span>
                </div>
                {swInfo.updateAvailable && (
                  <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-sm text-yellow-800">Update available</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">No Service Worker information</p>
            )}
          </motion.div>

          {/* Cache Status */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Cache Storage</h2>
              <Info className="h-5 w-5 text-blue-500" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Caches:</span>
                <span className="font-medium">{caches.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Entries:</span>
                <span className="font-medium">
                  {caches.reduce((sum, cache) => sum + cache.entries, 0)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Network Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Network</h2>
              {isOnline ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium ${
                  isOnline ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={registerServiceWorker}
              disabled={isLoading}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Upload className="h-4 w-4 mr-2" />
              Register SW
            </button>
            
            <button
              onClick={unregisterServiceWorker}
              disabled={isLoading}
              className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Unregister SW
            </button>
            
            <button
              onClick={updateServiceWorker}
              disabled={isLoading || !swInfo?.updateAvailable}
              className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Update SW
            </button>
            
            <button
              onClick={clearAllCaches}
              disabled={isLoading}
              className="flex items-center justify-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Caches
            </button>
            
            <button
              onClick={testServiceWorker}
              disabled={isLoading}
              className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
            >
              <Settings className="h-4 w-4 mr-2" />
              Test SW
            </button>
            
            <button
              onClick={checkServiceWorker}
              disabled={isLoading}
              className="flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Info
            </button>
          </div>
        </motion.div>

        {/* Cache Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Cache Details</h2>
          
          {caches.length > 0 ? (
            <div className="space-y-3">
              {caches.map((cache, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{cache.name}</h3>
                    <p className="text-sm text-gray-600">{cache.entries} entries</p>
                  </div>
                  <button
                    onClick={() => clearSpecificCache(cache.name)}
                    disabled={isLoading}
                    className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 disabled:opacity-50 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No caches found</p>
          )}
        </motion.div>

        {/* Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Activity Log</h2>
            <button
              onClick={() => setLogs([])}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
            >
              Clear Logs
            </button>
          </div>
          
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-64 overflow-y-auto font-mono text-sm">
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <div key={index} className="mb-1">{log}</div>
              ))
            ) : (
              <div className="text-gray-500">No logs yet. Perform some actions to see activity.</div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceWorkerAdminPage;

