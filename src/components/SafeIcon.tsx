// src/components/SafeIcon.tsx

'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { getIconColor } from '@/utils/iconStyles';

interface SafeIconProps {
  icon: LucideIcon;
  size?: number | string;
  className?: string;
  backgroundColor?: 'light' | 'dark' | 'colored';
  colorVariant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  specificColor?: string;
  fallbackColor?: string;
}

const SafeIcon: React.FC<SafeIconProps> = ({
  icon: Icon,
  size = 20,
  className = '',
  backgroundColor = 'light',
  colorVariant = 'primary',
  specificColor,
  fallbackColor = 'text-gray-900'
}) => {
  const iconColor = getIconColor(backgroundColor, colorVariant, specificColor);
  
  return (
    <Icon 
      size={size} 
      className={`${iconColor} ${className}`}
      style={{ 
        color: fallbackColor.includes('text-') ? undefined : fallbackColor 
      }}
    />
  );
};

export default SafeIcon;
