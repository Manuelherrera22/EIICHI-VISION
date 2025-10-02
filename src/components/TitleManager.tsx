'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TitleManagerProps {
  fallbackTitle?: string;
}

export default function TitleManager({ fallbackTitle = "Tabiji House | Construye tu Futuro. Honra el Pasado." }: TitleManagerProps) {
  const { t } = useLanguage();

  useEffect(() => {
    // Función para actualizar el título
    const updateTitle = () => {
      const title = t('layout.title');
      if (title && title !== 'layout.title') {
        document.title = title;
      } else {
        document.title = fallbackTitle;
      }
    };

    // Actualizar inmediatamente
    updateTitle();

    // Crear un observer para detectar cambios en el DOM y forzar actualización
    const observer = new MutationObserver(() => {
      if (document.title === 'localhost' || document.title === '' || document.title === 'layout.title') {
        updateTitle();
      }
    });

    // Observar cambios en el head
    const head = document.head;
    if (head) {
      observer.observe(head, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    // También observar cambios en el título directamente
    const titleElement = document.querySelector('title');
    if (titleElement) {
      observer.observe(titleElement, {
        childList: true,
        characterData: true
      });
    }

    // Actualizar periódicamente por si acaso
    const interval = setInterval(updateTitle, 1000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [t, fallbackTitle]);

  return null;
}




