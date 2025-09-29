'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

interface LanguageSwitcherProps {
  isScrolled?: boolean;
}

export default function LanguageSwitcher({ isScrolled = false }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    setLanguage(newLocale as 'en' | 'ja' | 'ar' | 'es');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
          isScrolled
            ? 'bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700'
            : 'bg-white/90 backdrop-blur-sm border border-border hover:bg-white text-primary shadow-sm'
        }`}
        aria-label={isClient ? t('common.changeLanguage') : 'Change Language'}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{isClient ? currentLanguage.flag : '🇺🇸'}</span>
        <span className="text-sm font-medium hidden sm:block">{isClient ? currentLanguage.name : 'English'}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-40 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
                  lang.code === language ? 'bg-primary/10 text-primary' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{isClient ? lang.flag : '🇺🇸'}</span>
                <span className="font-medium">{isClient ? lang.name : 'English'}</span>
                {lang.code === language && (
                  <span className="ml-auto text-primary text-sm">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
