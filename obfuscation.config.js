/**
 * Configuración de Ofuscación para EIICHI VISION
 * 
 * Este archivo contiene la configuración de ofuscación que se aplica
 * solo en producción para proteger el código JavaScript del cliente.
 */

const obfuscationConfig = {
  // Configuración AGRESIVA de ofuscación para ocultar código en F12
  rotateStringArray: true,
  stringArray: true,
  stringArrayThreshold: 1.0, // 100% de strings ofuscados
  stringArrayEncoding: ['base64', 'rc4'],
  stringArrayIndexShift: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 10,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 10,
  
  // Transformaciones de código MÁS AGRESIVAS
  transformObjectKeys: true,
  unicodeEscapeSequence: true,
  compact: true,
  
  // Control de variables y funciones - MÁS AGRESIVO
  identifierNamesGenerator: 'mangled-shuffled',
  renameGlobals: true,
  renameProperties: true,
  
  // Configuración de debugging - DESHABILITADO COMPLETAMENTE
  sourceMap: false,
  sourceMapMode: 'separate',
  
  // Nombres reservados - NO ofuscar estos nombres importantes
  reservedNames: [
    // React hooks y funciones
    'useLanguage',
    'useAuth', 
    'useRouter',
    'useState',
    'useEffect',
    'useContext',
    'useCallback',
    'useMemo',
    'createContext',
    'React',
    'NextJS',
    
    // Supabase y autenticación
    'Supabase',
    'createClient',
    'signIn',
    'signOut',
    'signUp',
    
    // Next.js específico
    'next/router',
    'next/link',
    'next/image',
    'next/head',
    
    // Funciones críticas de la aplicación
    'handleWhatsAppClick',
    'handleSubmit',
    'handleLanguageChange',
    
    // Eventos DOM
    'addEventListener',
    'removeEventListener',
    'onClick',
    'onChange',
    'onSubmit',
    
    // APIs del navegador
    'window',
    'document',
    'localStorage',
    'sessionStorage',
    'fetch',
    'console'
  ],
  
  // Strings reservados - NO ofuscar estos strings importantes
  reservedStrings: [
    // Rutas de la aplicación
    '/',
    '/contact',
    '/projects', 
    '/about',
    '/dashboard',
    '/process',
    '/services',
    
    // Funcionalidades clave
    'whatsapp',
    'contact',
    'email',
    'phone',
    'message',
    
    // Claves de traducción importantes
    'whatsapp.message',
    'whatsapp.tooltip',
    'jni.cta.learnMore',
    'jni.cta.viewProperties',
    
    // URLs y dominios
    'wa.me',
    'eiichivision.com',
    'localhost',
    
    // Configuración de idiomas
    'en',
    'es', 
    'ja',
    'ar',
    
    // MIME types y headers
    'application/json',
    'text/html',
    'Content-Type',
    'Authorization'
  ],
  
  // Configuración de control de flujo - MÁS AGRESIVA
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 1.0, // 100% de control de flujo ofuscado
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.8, // 80% de código muerto inyectado
  
  // Configuración de números
  numbersToExpressions: true,
  simplify: true,
  
  // Configuración de strings
  stringArrayShuffle: true,
  stringArrayIndexShift: true,
  stringArrayWrappersCount: 5,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 5,
  
  // Configuración de debugging - MÁS AGRESIVA
  debugProtection: true,
  debugProtectionInterval: 1000, // Más frecuente
  disableConsoleOutput: true,
  debugProtection: true,
  debugProtectionInterval: 500, // Aún más frecuente para dificultar debugging
  
  // Configuración de rendimiento
  splitStrings: true,
  splitStringsChunkLength: 10,
  
  // Configuración de transformaciones adicionales
  transformObjectKeys: true,
  unicodeEscapeSequence: false,
  
  // Configuración de variables
  variableNamesGenerator: 'mangled-shuffled',
  
  // Configuración de self-defending - MÁS AGRESIVA
  selfDefending: true,
  selfDefending: true, // Doble protección
  
  // Configuración de dominio (opcional)
  domainLock: [], // Agregar dominios específicos si es necesario
  
  // Configuración de exclusión de archivos (simplificada)
  exclude: []
};

module.exports = obfuscationConfig;
