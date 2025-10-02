/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración básica
  reactStrictMode: true,
  
  // Configuración de imágenes
  images: {
    domains: [
      'images.unsplash.com',
      'cdn.tabijihouse.com',
      'api.tabijiexport.com',
      'maps.googleapis.com'
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Configuración de experimental features
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Configuración de headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'production' 
              ? 'https://tabijihouse.com' 
              : 'http://localhost:3000',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ]
  },

  // Configuración de redirects
  async redirects() {
    return []
  },

  // Configuración de rewrites
  async rewrites() {
    return [
      {
        source: '/api/ai/:path*',
        destination: '/api/ai/:path*',
      },
      {
        source: '/api/analysis/:path*',
        destination: '/api/analysis/:path*',
      },
      {
        source: '/api/predictions/:path*',
        destination: '/api/predictions/:path*',
      },
      {
        source: '/api/properties/:path*',
        destination: '/api/properties/:path*',
      },
      {
        source: '/api/market/:path*',
        destination: '/api/market/:path*',
      },
      {
        source: '/api/recommendations/:path*',
        destination: '/api/recommendations/:path*',
      },
    ]
  },

  // Configuración de webpack
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Configuración personalizada de webpack
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }

    // Optimizaciones para producción
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      }
    }

    return config
  },

  // Configuración de modularizeImports
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },

  // Configuración de logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Configuración de typescript
  typescript: {
    ignoreBuildErrors: false,
  },

  // Configuración de eslint
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Configuración de transpilePackages
  transpilePackages: [],

  // Configuración de output
  output: 'standalone',

  // Configuración de trailing slash
  trailingSlash: false,

  // Configuración de powered by header
  poweredByHeader: false,

  // Configuración de compress
  compress: true,

  // Configuración de generateEtags
  generateEtags: true,

  // Configuración de distDir
  distDir: '.next',

  // Configuración de assetPrefix
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://cdn.tabijihouse.com' : '',

  // Configuración de basePath
  basePath: '',

  // Configuración de devIndicators
  devIndicators: {
    position: 'bottom-right',
  },

  // Configuración de compiler
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig