'use client';

// Función utilitaria para formatear números de manera consistente
// Evita problemas de hidratación con diferentes locales
export function formatNumber(
  value: number, 
  options: {
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    style?: 'decimal' | 'currency' | 'percent';
    currency?: string;
  } = {}
): string {
  const {
    locale = 'en-US',
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
    style = 'decimal',
    currency = 'USD'
  } = options;

  try {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits,
      maximumFractionDigits,
      style,
      currency: style === 'currency' ? currency : undefined
    }).format(value);
  } catch (error) {
    // Fallback en caso de error
    return value.toString();
  }
}

// Función específica para precios en USD
export function formatPrice(value: number): string {
  return formatNumber(value, {
    locale: 'en-US',
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

// Función específica para números grandes (como valores de propiedades)
export function formatLargeNumber(value: number): string {
  return formatNumber(value, {
    locale: 'en-US',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}
