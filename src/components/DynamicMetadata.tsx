'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect } from 'react';

export default function DynamicMetadata() {
  const { t, language } = useLanguage();

  useEffect(() => {
    // Solo actualizar el título si no se ha establecido uno específico
    if (!document.title || document.title === 'layout.title' || document.title === '') {
      document.title = t('layout.title');
    }
    
    // Actualizar meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('layout.description'));
    }
    
    // Actualizar meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', t('layout.keywords'));
    }
    
    // Actualizar Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', t('layout.title'));
    }
    
    // Actualizar Open Graph description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', t('layout.description'));
    }
    
    // Actualizar Twitter title
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', t('layout.title'));
    }
    
    // Actualizar Twitter description
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', t('layout.description'));
    }
    
    // Actualizar el atributo lang del html
    document.documentElement.lang = language === 'ja' ? 'ja' : language === 'ar' ? 'ar' : 'en';
    
    // Actualizar la dirección del texto para árabe
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [t, language]);

  return null;
}
