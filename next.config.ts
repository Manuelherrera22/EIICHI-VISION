import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración para producción
  // output: 'export', // Comentado para desarrollo
  // trailingSlash: true,
  // skipTrailingSlashRedirect: true,
  
  // Deshabilitar overlay de desarrollo
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  
  // Deshabilitar ESLint durante el build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Deshabilitar TypeScript durante el build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Optimizaciones para Netlify
  experimental: {
    optimizePackageImports: ['mapbox-gl', 'three', '@react-three/fiber', '@react-three/drei']
  },
  
  // Configuración de imágenes optimizada
  images: {
    // unoptimized: true, // Necesario para export estático
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
      }
    ],
  },
  
  // Configuración de webpack optimizada
  webpack: (config, { isServer }) => {
    // Optimizaciones para Three.js
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    
    return config;
  },
  
  // Configuración de compilación
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
};

export default nextConfig;
