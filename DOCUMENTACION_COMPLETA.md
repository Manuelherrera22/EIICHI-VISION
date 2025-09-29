# 🏠 Komorebi House - Documentación Técnica Completa

## 📋 Resumen Ejecutivo

**Komorebi House** es una plataforma web avanzada de inversión inmobiliaria japonesa que combina tecnologías de vanguardia (3D, AR, IA) con un enfoque cultural auténtico. La plataforma facilita la compra, renovación y gestión de propiedades tradicionales japonesas (akiya) en la prefectura de Gunma, ofreciendo una experiencia completa desde la exploración hasta la integración comunitaria.

---

## 🎯 Propósito del Proyecto

### **Misión**
Conectar inversores internacionales con el patrimonio arquitectónico japonés, preservando la cultura tradicional mientras se genera valor económico sostenible.

### **Visión**
Ser la plataforma líder mundial para la inversión en propiedades tradicionales japonesas, combinando tecnología avanzada con respeto cultural.

### **Filosofía**
- **Rongo to Soroban** (論語と算盤): Ética y eficiencia empresarial
- **Komorebi** (木漏れ日): Luz del sol filtrándose entre las hojas - belleza en los detalles
- **Wabi-Sabi**: Belleza en la imperfección y temporalidad

---

## 🏗️ Arquitectura del Sistema

### **Stack Tecnológico Principal**
- **Frontend**: Next.js 15.5.4 con App Router
- **Lenguaje**: TypeScript 5
- **Estilos**: Tailwind CSS 4
- **Animaciones**: Framer Motion 12.23.21
- **3D/WebGL**: Three.js 0.180.0 + React Three Fiber 9.3.0
- **UI Components**: Radix UI primitives
- **Mapas**: Google Maps JavaScript API + Mapbox GL
- **Icons**: Lucide React 0.544.0

### **Estructura de Directorios**
```
src/
├── app/                    # Next.js App Router
│   ├── (routes)/          # Páginas principales
│   ├── api/               # API endpoints
│   └── globals.css        # Estilos globales
├── components/            # Componentes reutilizables
│   ├── 3D/               # Componentes 3D y AR
│   ├── UI/               # Componentes de interfaz
│   └── Business/         # Componentes de negocio
├── lib/                  # Utilidades y servicios
└── config/               # Configuraciones
```

---

## 🚀 Funcionalidades Principales

### **1. Sistema de Visualización 3D**

#### **Componentes 3D Disponibles:**
- **`Basic3DViewer`**: Visor básico con controles de órbita
- **`Simple3DViewer`**: Versión simplificada para dispositivos móviles
- **`Real3DViewer`**: Visor avanzado con iluminación realista
- **`SimplePremiumViewer`**: Visor premium con efectos avanzados
- **`JapaneseHouse3D`**: Modelo específico de casa tradicional
- **`GLBModelViewer`**: Cargador de modelos GLB/GLTF
- **`Advanced3DNavigation`**: Navegación avanzada 3D
- **`DebugModelViewer`**: Herramientas de depuración 3D

#### **Características 3D:**
- **Modelos Procedurales**: Casas japonesas generadas proceduralmente
- **Iluminación Realista**: Sistema de luces ambientales y direccionales
- **Controles Intuitivos**: OrbitControls con damping y auto-rotación
- **Optimización**: Lazy loading y Suspense para rendimiento
- **Responsive**: Adaptación automática a diferentes pantallas

### **2. Sistema de Realidad Aumentada (AR)**

#### **`ARPropertyViewer` Component:**
- **Cámara AR**: Acceso a cámara del dispositivo
- **Overlay de Diseño**: Superposición de elementos de diseño
- **Múltiples Vistas**: Estado actual vs. renders propuestos
- **Controles AR**: Zoom, rotación, captura de pantalla
- **Diseño Interactivo**: Cambio de estilos en tiempo real

#### **Funcionalidades AR:**
- **Detección de Superficies**: Colocación virtual de elementos
- **Renderizado en Tiempo Real**: Visualización instantánea de cambios
- **Captura y Compartir**: Screenshots y exportación
- **Múltiples Estilos**: Minimalista, Wabi-Sabi, Tradicional, Moderno

### **3. Mesa de Diseño Interactiva**

#### **`InteractiveDesignTable` Component:**
- **Canvas Interactivo**: Diseño en tiempo real
- **Elementos Arquitectónicos**: Paredes, puertas, ventanas, muebles
- **Herramientas de Diseño**: Rotar, escalar, mover, colorear
- **Historial de Cambios**: Undo/Redo con gestión de estado
- **Exportación**: Descarga de diseños como imágenes

#### **Características del Diseño:**
- **Drag & Drop**: Interfaz intuitiva de arrastrar y soltar
- **Presets de Estilo**: Estilos predefinidos (Minimalista, Tradicional, etc.)
- **Gestión de Capas**: Organización de elementos por capas
- **Colaboración**: Diseño compartido en tiempo real
- **Responsive Design**: Funciona en desktop, tablet y móvil

### **4. Sistema de Control de Proyectos**

#### **`ProjectControlCenter` Component:**
- **Dashboard en Tiempo Real**: Monitoreo de proyectos activos
- **Gestión de Tareas**: Lista de tareas con estados
- **Presupuesto y Cronograma**: Seguimiento de costos y tiempos
- **Comunicación**: Chat integrado con el equipo
- **Reportes**: Generación automática de reportes

#### **Funcionalidades del Control:**
- **Estados de Proyecto**: Nuevo, En Progreso, Completado, En Pausa
- **Asignación de Recursos**: Gestión de equipos y materiales
- **Notificaciones**: Alertas automáticas por cambios de estado
- **Integración CRM**: Sincronización con sistema de gestión de clientes

### **5. Calculadora de ROI Avanzada**

#### **`ROICalculator` Component:**
- **Cálculos Automáticos**: ROI, rendimiento anual, valorización
- **Escenarios Múltiples**: Comparación de diferentes inversiones
- **Factores Variables**: Precio de compra, costos de renovación, ingresos por alquiler
- **Proyecciones**: Cálculos a 5, 10, 15 años
- **Exportación**: Descarga de reportes financieros

#### **Métricas Calculadas:**
- **ROI Total**: Retorno sobre inversión completo
- **Rendimiento Anual**: Porcentaje anual de retorno
- **Valorización de Propiedad**: Crecimiento del valor en el tiempo
- **Flujo de Caja**: Ingresos vs. gastos mensuales
- **Punto de Equilibrio**: Tiempo para recuperar inversión

### **6. Sistema de Reservas y Booking**

#### **`BookingSystem` Component:**
- **Calendario Inteligente**: Disponibilidad en tiempo real
- **Zonas Horarias**: Soporte para múltiples zonas horarias
- **Tipos de Consulta**: General, Inversión, Residencia, Vacaciones
- **Confirmación Automática**: Emails de confirmación
- **Integración CRM**: Creación automática de leads

#### **Funcionalidades de Booking:**
- **Slots de Tiempo**: Horarios predefinidos de 9 AM a 5 PM
- **Validación**: Verificación de disponibilidad
- **Recordatorios**: Notificaciones automáticas
- **Rescheduling**: Cambio de citas
- **Cancelación**: Política de cancelación clara

### **7. Portal de Blueprint Digital**

#### **`BlueprintPortal` Component:**
- **Ecosistema Integrado**: Portal central de todas las herramientas
- **Navegación por Fases**: Portal → AR → Diseño → Control
- **Estado Persistente**: Mantenimiento del estado entre fases
- **Sincronización**: Datos compartidos entre componentes
- **Experiencia Fluida**: Transiciones suaves entre herramientas

#### **Fases del Portal:**
1. **Portal**: Punto de entrada y selección de propiedades
2. **AR**: Visualización con realidad aumentada
3. **Diseño**: Mesa de diseño interactiva
4. **Control**: Centro de control de proyectos

### **8. Sistema de Chat con IA**

#### **`AIChat` Component:**
- **Asistente Virtual**: Chat bot integrado
- **Respuestas Contextuales**: Información específica sobre propiedades
- **Soporte Multilingüe**: Español, inglés, japonés
- **Integración CRM**: Creación automática de leads
- **Historial**: Mantenimiento del historial de conversaciones

#### **Capacidades del Chat IA:**
- **Información de Propiedades**: Detalles, precios, ubicaciones
- **Asesoramiento**: Recomendaciones basadas en perfil
- **Agendamiento**: Integración con sistema de booking
- **Soporte Técnico**: Ayuda con herramientas 3D/AR
- **Educación**: Información sobre cultura japonesa

---

## 🏘️ Páginas y Rutas

### **Páginas Principales:**

#### **1. Homepage (`/`)**
- **Hero Section**: Video background inmersivo
- **Legacy Section**: Historia de Shibusawa Eiichi
- **Featured Projects**: Propiedades destacadas
- **Blueprint Digital**: Acceso a herramientas avanzadas
- **Tourism Section**: Información sobre Gunma
- **Philosophy Section**: Filosofía de la empresa

#### **2. About (`/about`)**
- **Historia de la Empresa**: Tres generaciones de visión
- **Filosofía**: Rongo to Soroban aplicado
- **Equipo**: Perfiles del equipo
- **Valores**: Compromiso cultural y ético

#### **3. Projects (`/projects`)**
- **Portfolio Interactivo**: Grid de propiedades
- **Filtros Avanzados**: Por precio, ubicación, estilo
- **Detalles de Propiedad**: Información completa
- **Calculadora ROI**: Integrada en cada propiedad

#### **4. Process (`/process`)**
- **El Camino (道)**: Proceso paso a paso
- **4 Fases**: Descubrimiento, Adquisición, Creación, Comunidad
- **Timeline Visual**: Cronograma detallado
- **Soporte Integral**: Recursos en cada etapa

#### **5. Journal (`/journal`)**
- **Blog Cultural**: Artículos sobre arquitectura japonesa
- **Categorías**: Diseño, Cultura, Estilo de Vida
- **Newsletter**: Suscripción a contenido
- **Búsqueda**: Filtrado por categorías

#### **6. Contact (`/contact`)**
- **Formulario Completo**: Múltiples campos de información
- **Sistema de Booking**: Agendamiento integrado
- **Información de Contacto**: Múltiples canales
- **Mapa Interactivo**: Ubicación de oficinas

### **Páginas Especializadas:**

#### **7. Blueprint Digital (`/blueprint`)**
- **Portal Central**: Acceso a todas las herramientas
- **Navegación por Fases**: Flujo de trabajo estructurado
- **Estado Persistente**: Datos compartidos
- **Herramientas Integradas**: 3D, AR, Diseño, Control

#### **8. Kusatsu Project (`/kusatsu-project`)**
- **Taller Inmersivo**: Experiencia de 3 días
- **Cronograma Detallado**: Actividades por día
- **Sistema de Reservas**: Booking integrado
- **Información de Alojamiento**: Ryokan tradicional

#### **9. 3D Viewer (`/3d-viewer`)**
- **Visor Dedicado**: Experiencia 3D completa
- **Múltiples Modelos**: Diferentes casas japonesas
- **Controles Avanzados**: Navegación profesional
- **Información Contextual**: Detalles de propiedades

#### **10. Model Viewer (`/model-viewer`)**
- **Cargador de Modelos**: GLB/GLTF files
- **Optimización**: Lazy loading y caching
- **Múltiples Formatos**: Soporte amplio de archivos
- **Debug Tools**: Herramientas de desarrollo

### **Páginas Dinámicas:**

#### **11. Property Details (`/property/[id]`)**
- **Información Completa**: Detalles de cada propiedad
- **Galería de Imágenes**: Múltiples fotos
- **Calculadora ROI**: Específica para la propiedad
- **Sistema de Contacto**: Formulario directo
- **Modal de Compra**: Proceso de intención de compra

#### **12. Project Details (`/projects/[id]`)**
- **Detalles del Proyecto**: Información específica
- **Galería Visual**: Imágenes y videos
- **Características**: Lista detallada de features
- **Lugares Cercanos**: Información del vecindario
- **Call to Action**: Botones de contacto

#### **13. Journal Categories (`/journal/category/[category]`)**
- **Filtrado por Categoría**: Diseño, Cultura, Estilo de Vida
- **Grid de Artículos**: Layout responsive
- **Búsqueda**: Filtrado adicional
- **Navegación**: Breadcrumbs y enlaces

### **Páginas de Soporte:**

#### **14. Guide (`/guide`)**
- **Guía Completa**: Proceso de inversión
- **FAQ**: Preguntas frecuentes
- **Casos de Éxito**: Testimonios
- **Recursos**: Enlaces útiles

#### **15. Privacy (`/privacy`)**
- **Política de Privacidad**: GDPR compliant
- **Términos de Uso**: Condiciones legales
- **Cookies**: Política de cookies
- **Contacto Legal**: Información de contacto

#### **16. Terms (`/terms`)**
- **Términos y Condiciones**: Marco legal
- **Límites de Responsabilidad**: Protecciones legales
- **Propiedad Intelectual**: Derechos de autor
- **Ley Aplicable**: Jurisdicción japonesa

---

## 🎨 Sistema de Diseño

### **Paleta de Colores:**
- **Primary**: `#1a365d` (Indigo profundo)
- **Secondary**: `#4a5568` (Gris medio)
- **Accent**: `#d69e2e` (Madera natural)
- **Background**: `#fefefe` (Hueso blanco)
- **Muted**: `#f7fafc` (Gris claro)

### **Tipografía:**
- **Sans**: Inter (texto del cuerpo)
- **Serif**: Playfair Display (encabezados)
- **Mono**: Geist Mono (código/accesos)

### **Componentes Base:**
- **Navigation**: Header fijo con scroll suave
- **Cards**: Elevadas con efectos hover
- **Forms**: Inputs limpios y accesibles
- **Buttons**: Redondeados con transiciones suaves
- **Modals**: Overlays con backdrop blur

### **Principios de Diseño:**
- **Minimalismo Japonés**: Espacios limpios siguiendo "Ma" (間)
- **Materiales Naturales**: Paleta inspirada en madera, piedra e índigo
- **Fotografía Cinematográfica**: Visuales de alta calidad
- **Diseño Responsivo**: Optimizado para todos los dispositivos

---

## 🔧 Configuración Técnica

### **Variables de Entorno:**
```env
# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here

# Mapbox
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token_here

# CRM Integration
CRM_API_URL=your_crm_url
CRM_API_KEY=your_crm_key

# Email Service
EMAIL_SERVICE_API_KEY=your_email_key

# Analytics
NEXT_PUBLIC_GA_ID=your_ga_id
```

### **Configuración de Next.js:**
- **App Router**: Estructura moderna de rutas
- **Turbopack**: Compilación rápida en desarrollo
- **Image Optimization**: Optimización automática de imágenes
- **Font Optimization**: Carga optimizada de fuentes
- **Bundle Analysis**: Análisis de tamaño de bundles

### **Configuración de Tailwind:**
- **Design Tokens**: Variables CSS personalizadas
- **Responsive Design**: Breakpoints móvil-first
- **Dark Mode**: Soporte para tema oscuro
- **Custom Utilities**: Clases personalizadas

---

## 📱 Responsive Design

### **Breakpoints:**
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: 1440px+

### **Adaptaciones por Dispositivo:**

#### **Mobile (< 768px):**
- **Navigation**: Menú hamburguesa
- **3D Viewers**: Versiones simplificadas
- **AR**: Optimizado para cámara móvil
- **Forms**: Campos apilados verticalmente
- **Typography**: Tamaños de fuente reducidos

#### **Tablet (768px - 1024px):**
- **Navigation**: Menú expandido
- **3D Viewers**: Versiones intermedias
- **Grid Layouts**: 2 columnas
- **Touch Controls**: Optimizados para touch
- **Sidebar**: Navegación lateral

#### **Desktop (> 1024px):**
- **Navigation**: Menú completo horizontal
- **3D Viewers**: Versiones completas
- **Grid Layouts**: 3-4 columnas
- **Hover Effects**: Interacciones avanzadas
- **Keyboard Shortcuts**: Atajos de teclado

---

## 🚀 Rendimiento y Optimización

### **Optimizaciones Implementadas:**
- **Lazy Loading**: Componentes cargados bajo demanda
- **Image Optimization**: WebP, AVIF, responsive images
- **Bundle Splitting**: Código dividido por rutas
- **Tree Shaking**: Eliminación de código no usado
- **Caching**: Estrategias de caché optimizadas

### **Core Web Vitals:**
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### **SEO Optimizations:**
- **Meta Tags**: Optimización completa
- **Structured Data**: Schema markup
- **Sitemap**: Generación automática
- **Robots.txt**: Configuración de crawlers
- **Open Graph**: Social media optimization

---

## 🔒 Seguridad

### **Medidas de Seguridad:**
- **HTTPS**: Certificado SSL
- **CSP**: Content Security Policy
- **Input Validation**: Validación de formularios
- **XSS Protection**: Protección contra XSS
- **CSRF Protection**: Tokens CSRF

### **Privacidad:**
- **GDPR Compliance**: Cumplimiento europeo
- **Data Encryption**: Cifrado de datos sensibles
- **Cookie Consent**: Gestión de cookies
- **Privacy Policy**: Política de privacidad clara

---

## 📊 Analytics y Monitoreo

### **Métricas Implementadas:**
- **Google Analytics**: Tracking de usuarios
- **Hotjar**: Heatmaps y grabaciones
- **Sentry**: Error tracking
- **Performance Monitoring**: Core Web Vitals
- **Custom Events**: Eventos de negocio específicos

### **KPIs del Negocio:**
- **Conversión**: Visitas → Leads → Ventas
- **Engagement**: Tiempo en sitio, páginas por sesión
- **Herramientas 3D**: Uso de visualizadores
- **Booking**: Tasa de reservas
- **ROI Calculator**: Uso de calculadora

---

## 🔄 Integraciones

### **APIs Externas:**
- **Google Maps**: Mapas interactivos
- **Mapbox**: Mapas avanzados
- **Unsplash**: Imágenes de alta calidad
- **Email Service**: Envío de emails
- **CRM System**: Gestión de leads

### **Servicios de Terceros:**
- **Payment Gateway**: Procesamiento de pagos
- **Cloud Storage**: Almacenamiento de archivos
- **CDN**: Distribución de contenido
- **Monitoring**: Monitoreo de servicios

---

## 🧪 Testing

### **Estrategia de Testing:**
- **Unit Tests**: Componentes individuales
- **Integration Tests**: Flujos completos
- **E2E Tests**: Experiencia de usuario
- **Performance Tests**: Carga y rendimiento
- **Accessibility Tests**: Cumplimiento WCAG

### **Herramientas de Testing:**
- **Jest**: Framework de testing
- **React Testing Library**: Testing de componentes
- **Cypress**: E2E testing
- **Lighthouse**: Performance auditing
- **axe-core**: Accessibility testing

---

## 🚀 Deployment

### **Plataformas de Deployment:**
- **Vercel**: Deployment principal
- **Netlify**: Deployment alternativo
- **GitHub Pages**: Documentación
- **Docker**: Containerización

### **CI/CD Pipeline:**
- **GitHub Actions**: Automatización
- **Build Process**: Compilación automática
- **Testing**: Tests automáticos
- **Deployment**: Despliegue automático

---

## 📈 Roadmap Futuro

### **Fase 1 (Q1 2024):**
- **VR Integration**: Soporte para realidad virtual
- **AI Recommendations**: Recomendaciones inteligentes
- **Mobile App**: Aplicación móvil nativa
- **Blockchain**: Contratos inteligentes

### **Fase 2 (Q2 2024):**
- **IoT Integration**: Sensores en propiedades
- **Advanced Analytics**: Analytics predictivos
- **Multi-language**: Soporte multiidioma completo
- **API Public**: API pública para desarrolladores

### **Fase 3 (Q3-Q4 2024):**
- **Marketplace**: Plataforma de servicios
- **Community Features**: Red social de inversores
- **Advanced AR**: AR más sofisticado
- **Global Expansion**: Expansión a otras regiones

---

## 👥 Equipo y Roles

### **Equipo de Desarrollo:**
- **Frontend Developer**: React/Next.js
- **3D Developer**: Three.js/WebGL
- **UI/UX Designer**: Diseño de interfaz
- **Backend Developer**: APIs y servicios
- **DevOps Engineer**: Infraestructura

### **Equipo de Negocio:**
- **Product Manager**: Gestión de producto
- **Business Analyst**: Análisis de negocio
- **Marketing Manager**: Marketing digital
- **Customer Success**: Soporte al cliente

---

## 📞 Soporte y Mantenimiento

### **Soporte Técnico:**
- **Documentación**: Wiki completa
- **Video Tutorials**: Guías en video
- **Chat Support**: Soporte en vivo
- **Email Support**: Soporte por email

### **Mantenimiento:**
- **Updates**: Actualizaciones regulares
- **Security Patches**: Parches de seguridad
- **Performance Monitoring**: Monitoreo continuo
- **Backup Strategy**: Estrategia de respaldo

---

## 📋 Conclusión

**Komorebi House** representa una fusión única entre tecnología avanzada y respeto por la cultura tradicional japonesa. La plataforma no es solo un sitio web, sino un ecosistema completo que facilita la inversión en propiedades japonesas a través de herramientas innovadoras como visualización 3D, realidad aumentada, diseño interactivo y gestión de proyectos.

### **Puntos Clave:**
- **Tecnología de Vanguardia**: 3D, AR, IA integrados
- **Experiencia Completa**: Desde exploración hasta integración
- **Respeto Cultural**: Preservación del patrimonio japonés
- **Sostenibilidad**: Modelo de negocio sostenible
- **Escalabilidad**: Arquitectura preparada para crecimiento

### **Impacto Esperado:**
- **Para Inversores**: Proceso más transparente y eficiente
- **Para la Comunidad**: Preservación y revitalización del patrimonio
- **Para el Mercado**: Innovación en el sector inmobiliario
- **Para Japón**: Atracción de inversión extranjera responsable

La plataforma está diseñada para ser no solo funcional, sino también educativa y culturalmente enriquecedora, creando un puente entre el mundo moderno y la tradición japonesa.

---

*Documentación actualizada: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}*
