'use client';

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message,
  className = ""
}) => {
  const { t } = useLanguage();
  
  // Use provided message or fallback to translated message
  const whatsappMessage = message || t('whatsapp.message');
  const handleWhatsAppClick = () => {
    // Clean phone number (remove spaces, dashes, parentheses)
    const cleanNumber = phoneNumber.replace(/[\s\-\(\)]/g, '');
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`
        fixed bottom-20 right-6 z-40
        bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700
        text-white p-4 rounded-full shadow-lg border-2 border-white/20
        transition-all duration-300 ease-in-out
        hover:scale-110 hover:shadow-2xl hover:shadow-green-500/25
        animate-bounce hover:animate-none
        group backdrop-blur-sm
        ${className}
      `}
      aria-label={t('whatsapp.tooltip')}
      title={t('whatsapp.tooltip')}
    >
      <FaWhatsapp 
        size={24} 
        className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" 
      />
      
      {/* Tooltip */}
      <div className="
        absolute bottom-full right-0 mb-2 px-4 py-2
        bg-gradient-to-r from-gray-800 to-gray-900 text-white text-sm rounded-lg
        opacity-0 group-hover:opacity-100
        transition-all duration-300 transform translate-y-1 group-hover:translate-y-0
        whitespace-nowrap
        pointer-events-none
        shadow-xl border border-gray-700/50
      ">
        <span className="flex items-center gap-2">
          <FaWhatsapp size={14} className="text-green-400" />
          {t('whatsapp.tooltip')}
        </span>
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      </div>
    </button>
  );
};

export default WhatsAppButton;
