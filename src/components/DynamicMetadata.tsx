'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect } from 'react';

export default function DynamicMetadata() {
  const { t, language } = useLanguage();

  useEffect(() => {
    // Forzar la actualización del título inmediatamente
    const updateTitle = () => {
      const title = t('layout.title');
      if (title && title !== 'layout.title') {
        document.title = title;
      } else {
        // Fallback si la traducción no está lista
        document.title = "Tabiji House | Construye tu Futuro. Honra el Pasado.";
      }
    };

    // Actualizar inmediatamente
    updateTitle();

    // Actualizar con múltiples delays para asegurar que se establezca
    const timers = [
      setTimeout(updateTitle, 50),
      setTimeout(updateTitle, 100),
      setTimeout(updateTitle, 200),
      setTimeout(updateTitle, 500)
    ];

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [t, language]);

  useEffect(() => {
    // Actualizar meta tags con un pequeño delay
    const timer = setTimeout(() => {
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
    }, 100);

    return () => clearTimeout(timer);
  }, [t]);

  useEffect(() => {
    // Actualizar atributos del HTML
    const timer = setTimeout(() => {
      // Actualizar el atributo lang del html
      document.documentElement.lang = language === 'ja' ? 'ja' : language === 'ar' ? 'ar' : 'en';
      
      // Actualizar la dirección del texto para árabe
      if (language === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [language]);

  return null;
}
