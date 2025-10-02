// src/utils/iconStyles.ts

/**
 * Utilidades para estilos de iconos con contraste adecuado
 * Soluciona problemas de visibilidad de iconos blancos sobre fondos claros
 */

export const iconStyles = {
  // Iconos sobre fondos claros - usar colores oscuros
  onLightBackground: {
    primary: 'text-gray-900',
    secondary: 'text-gray-700',
    accent: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
  },
  
  // Iconos sobre fondos oscuros - usar colores claros
  onDarkBackground: {
    primary: 'text-white',
    secondary: 'text-gray-300',
    accent: 'text-blue-300',
    success: 'text-green-300',
    warning: 'text-yellow-300',
    error: 'text-red-300',
  },
  
  // Iconos sobre fondos de colores específicos
  onColoredBackground: {
    blue: 'text-white',
    green: 'text-white',
    red: 'text-white',
    yellow: 'text-gray-900',
    purple: 'text-white',
    pink: 'text-white',
    cyan: 'text-white',
    violet: 'text-white',
  },
  
  // Estilos para botones con contraste adecuado
  button: {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    success: 'bg-green-600 text-white hover:bg-green-700',
    warning: 'bg-yellow-500 text-gray-900 hover:bg-yellow-600',
    error: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border-2 border-gray-300 text-gray-900 hover:bg-gray-50',
  },
  
  // Estilos para elementos flotantes
  floating: {
    light: 'bg-white/95 text-gray-900 shadow-lg border border-gray-200',
    dark: 'bg-gray-900/95 text-white shadow-lg border border-gray-700',
    glass: 'bg-white/20 backdrop-blur-md text-gray-900 border border-white/30',
  },
  
  // Estilos para elementos de navegación
  navigation: {
    active: 'bg-blue-600 text-white',
    inactive: 'text-gray-700 hover:bg-gray-100',
    hover: 'hover:text-blue-600 hover:bg-blue-50',
  },
  
  // Estilos para elementos de estado
  status: {
    online: 'text-green-600',
    offline: 'text-gray-400',
    loading: 'text-blue-600',
    error: 'text-red-600',
    warning: 'text-yellow-600',
  }
};

/**
 * Función para obtener el color de icono apropiado basado en el fondo
 */
export const getIconColor = (
  backgroundColor: 'light' | 'dark' | 'colored',
  colorVariant: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' = 'primary',
  specificColor?: string
): string => {
  switch (backgroundColor) {
    case 'light':
      return iconStyles.onLightBackground[colorVariant];
    case 'dark':
      return iconStyles.onDarkBackground[colorVariant];
    case 'colored':
      if (specificColor && specificColor in iconStyles.onColoredBackground) {
        return iconStyles.onColoredBackground[specificColor as keyof typeof iconStyles.onColoredBackground];
      }
      return iconStyles.onColoredBackground.blue; // fallback
    default:
      return iconStyles.onLightBackground.primary;
  }
};

/**
 * Función para obtener estilos de botón con contraste adecuado
 */
export const getButtonStyles = (
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline' = 'primary'
): string => {
  return iconStyles.button[variant];
};

/**
 * Función para obtener estilos de elemento flotante
 */
export const getFloatingStyles = (
  variant: 'light' | 'dark' | 'glass' = 'light'
): string => {
  return iconStyles.floating[variant];
};

/**
 * Función para obtener estilos de navegación
 */
export const getNavigationStyles = (
  state: 'active' | 'inactive' | 'hover' = 'inactive'
): string => {
  return iconStyles.navigation[state];
};

/**
 * Función para obtener estilos de estado
 */
export const getStatusStyles = (
  status: 'online' | 'offline' | 'loading' | 'error' | 'warning' = 'online'
): string => {
  return iconStyles.status[status];
};
