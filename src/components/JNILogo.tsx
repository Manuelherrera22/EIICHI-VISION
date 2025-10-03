'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface JNILogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

const JNILogo: React.FC<JNILogoProps> = ({ 
  size = 'md', 
  showTagline = false, 
  className = '' 
}) => {
  const { t, language } = useLanguage();

  // Tamaños del logo
  const logoSizeClasses = {
    sm: { width: 64, height: 64 },
    md: { width: 96, height: 96 }, 
    lg: { width: 128, height: 128 },
    xl: { width: 160, height: 160 }
  };

  // Tamaños del texto
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg', 
    xl: 'text-xl'
  };

  const taglineSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-sm',
    xl: 'text-base'
  };

  const logoSize = logoSizeClasses[size];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Logo real de JNI */}
      <div className="relative">
        <Image
          src="/logo02.png"
          alt="JNI Properties Logo"
          width={logoSize.width}
          height={logoSize.height}
          className="object-contain"
          priority
        />
      </div>

      {/* Texto del logo (opcional, ya que el logo PNG ya incluye el texto) */}
      {showTagline && (
        <div className="text-left">
          <div className={`text-gray-600 ${taglineSizeClasses[size]}`}>
            {language === 'ja' ? 'JNI プロパティーズ 株式会社' : 
             language === 'es' ? 'JNI Properties Co., Ltd.' :
             language === 'ar' ? 'شركة JNI Properties المحدودة' :
             'JNI Properties Co., Ltd.'}
          </div>
        </div>
      )}
    </div>
  );
};

export default JNILogo;
