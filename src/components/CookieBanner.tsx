'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

const CookieBanner: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(cookieConsent);
        setCookiePreferences(savedPreferences.preferences || cookiePreferences);
      } catch (error) {
        console.error('Error loading cookie preferences:', error);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const preferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    saveCookiePreferences(preferences);
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const preferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    saveCookiePreferences(preferences);
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleSavePreferences = () => {
    saveCookiePreferences(cookiePreferences);
    setIsVisible(false);
    setShowSettings(false);
  };

  const saveCookiePreferences = (preferences: typeof cookiePreferences) => {
    const consentData = {
      consent: true,
      preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    setCookiePreferences(preferences);
    
    // Trigger custom event for analytics initialization
    if (preferences.analytics || preferences.marketing) {
      window.dispatchEvent(new CustomEvent('cookieConsentGiven', { 
        detail: preferences 
      }));
    }
  };

  const togglePreference = (key: keyof typeof cookiePreferences) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    setCookiePreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-[200] p-4 md:p-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 md:p-8">
            {!showSettings ? (
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                    <Cookie className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t('cookies.title') || 'We use cookies'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {t('cookies.description') || 'We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies.'}
                    </p>
                    <Link 
                      href="/privacy" 
                      className="text-sm text-primary hover:underline"
                    >
                      {t('cookies.privacyPolicy') || 'Privacy Policy'}
                    </Link>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    {t('cookies.settings') || 'Settings'}
                  </button>
                  <button
                    onClick={handleRejectAll}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {t('cookies.rejectAll') || 'Reject All'}
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-6 py-2 text-sm font-bold text-black bg-primary hover:bg-primary/90 rounded-lg transition-colors shadow-md"
                  >
                    {t('cookies.acceptAll') || 'Accept All'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {t('cookies.preferences') || 'Cookie Preferences'}
                  </h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Necessary Cookies */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">
                            {t('cookies.necessary.title') || 'Necessary Cookies'}
                          </h4>
                          <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">
                            {t('cookies.required') || 'Required'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {t('cookies.necessary.description') || 'These cookies are essential for the website to function properly and cannot be disabled.'}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {t('cookies.analytics.title') || 'Analytics Cookies'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {t('cookies.analytics.description') || 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.'}
                        </p>
                      </div>
                      <button
                        onClick={() => togglePreference('analytics')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          cookiePreferences.analytics ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            cookiePreferences.analytics ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {t('cookies.marketing.title') || 'Marketing Cookies'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {t('cookies.marketing.description') || 'These cookies are used to deliver personalized advertisements and track campaign performance.'}
                        </p>
                      </div>
                      <button
                        onClick={() => togglePreference('marketing')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          cookiePreferences.marketing ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            cookiePreferences.marketing ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleRejectAll}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {t('cookies.rejectAll') || 'Reject All'}
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="px-6 py-2 text-sm font-bold text-black bg-primary hover:bg-primary/90 rounded-lg transition-colors flex-1 sm:flex-initial shadow-md"
                  >
                    {t('cookies.savePreferences') || 'Save Preferences'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieBanner;

