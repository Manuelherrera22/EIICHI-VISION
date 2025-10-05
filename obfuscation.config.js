/**
 * Configuración de Ofuscación para EIICHI VISION
 * 
 * Este archivo contiene la configuración de ofuscación que se aplica
 * solo en producción para proteger el código JavaScript del cliente.
 */

const obfuscationConfig = {
  // Configuración básica de ofuscación
  rotateStringArray: true,
  stringArray: true,
  stringArrayThreshold: 0.75,
  stringArrayEncoding: ['base64'],
  
  // Transformaciones de código
  transformObjectKeys: true,
  unicodeEscapeSequence: false,
  compact: true,
  
  // Control de variables y funciones
  identifierNamesGenerator: 'hexadecimal',
  renameGlobals: false,
  renameProperties: false,
  
  // Configuración de debugging
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
  
  // Configuración de control de flujo
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.4,
  
  // Configuración de números
  numbersToExpressions: true,
  simplify: true,
  
  // Configuración de strings
  stringArrayShuffle: true,
  stringArrayIndexShift: true,
  stringArrayWrappersCount: 5,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 5,
  
  // Configuración de debugging (deshabilitado en producción)
  debugProtection: true,
  debugProtectionInterval: 2000,
  disableConsoleOutput: true,
  
  // Configuración de rendimiento
  splitStrings: true,
  splitStringsChunkLength: 10,
  
  // Configuración de transformaciones adicionales
  transformObjectKeys: true,
  unicodeEscapeSequence: false,
  
  // Configuración de variables
  variableNamesGenerator: 'mangled-shuffled',
  
  // Configuración de self-defending
  selfDefending: true,
  
  // Configuración de dominio (opcional)
  domainLock: [], // Agregar dominios específicos si es necesario
  
  // Configuración de exclusión de archivos
  exclude: [
    'node_modules/**/*',
    '**/*.min.js',
    '**/vendor/**/*',
    '**/chunks/**/*'
  ]
};

module.exports = obfuscationConfig;
