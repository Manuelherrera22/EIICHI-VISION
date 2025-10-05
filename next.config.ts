import type { NextConfig } from "next";

// Importar configuración de ofuscación
const obfuscationConfig = require('./obfuscation.config.js');

const nextConfig: NextConfig = {
  // Configuración para producción
  // output: 'export', // Comentado para desarrollo
  // trailingSlash: true,
  // skipTrailingSlashRedirect: true,
  
  // Deshabilitar overlay de desarrollo
  devIndicators: {
    position: 'bottom-right',
  },
  
  // Deshabilitar ESLint durante el build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Deshabilitar TypeScript durante el build
  typescript: {
    ignoreBuildErrors: true,
    tsconfigPath: './tsconfig.build.json',
  },
  
  // Configuración de webpack unificada
  webpack: (config, { dev, isServer }) => {
    // Ignorar errores de TypeScript
    config.ignoreWarnings = [
      /Module not found/,
      /Critical dependency/,
      /Can't resolve/,
      /Type error/,
      /An object literal cannot have multiple properties/,
    ];
    
    // Optimizaciones para Three.js
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    
    // Ofuscación solo en producción y para archivos del cliente
    if (!dev && !isServer && process.env.NODE_ENV === 'production') {
      const JavaScriptObfuscator = require('webpack-obfuscator');
      
      config.plugins.push(
        new JavaScriptObfuscator(obfuscationConfig, {
          // Solo ofuscar archivos JavaScript específicos
          include: [
            /\.js$/,
            /\.tsx?$/
          ],
          // Excluir archivos críticos
          exclude: [
            /node_modules/,
            /\.min\./,
            /vendor/,
            /chunk/
          ]
        })
      );
    }
    
    // Deshabilitar Fast Refresh en desarrollo
    if (dev && !isServer) {
      config.optimization = config.optimization || {};
      config.optimization.splitChunks = false;
    }
    
    return config;
  },
  
  // Optimizaciones para Netlify y configuración experimental
  experimental: {
    optimizePackageImports: ['mapbox-gl', 'three', '@react-three/fiber', '@react-three/drei'],
  },
  
  // Mover typedRoutes fuera de experimental (nueva ubicación en Next.js 15)
  typedRoutes: false,
  
  // Configuración de imágenes optimizada para Netlify
  images: {
    // Deshabilitar optimización para evitar errores 500 en Netlify
    unoptimized: true,
    // Configurar dominios remotos permitidos
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tabijihouse.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.netlify.app',
        port: '',
        pathname: '/**',
      }
    ],
    // Configuración de formatos de imagen
    formats: ['image/webp', 'image/avif'],
    // Tamaños de dispositivo para optimización
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Tamaños de imagen
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // TTL mínimo de caché
    minimumCacheTTL: 60,
    // Permitir SVG
    dangerouslyAllowSVG: true,
    // Política de seguridad de contenido
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Configurar calidades para evitar warnings
    qualities: [25, 50, 75, 85, 100],
  },
  
  
  // Configuración de compilación
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Configuración de Turbopack (deshabilitado)
  // turbopack: {
  //   // Deshabilitar Fast Refresh completamente
  //   fastRefresh: false,
  //   // Configurar directorio raíz
  //   root: process.cwd(),
  // },
  
  // Configuración de desarrollo
  onDemandEntries: {
    // Deshabilitar hot reload
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  
  // Deshabilitar Fast Refresh completamente
  reactStrictMode: false,
  
  
};

export default nextConfig;
