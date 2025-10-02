'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function useSafeLanguage() {
  const { language, setLanguage, t, isHydrated } = useLanguage();
  
  return {
    language: isHydrated ? language : 'en',
    setLanguage,
    t,
    isHydrated
  };
}
