# 📋 Documentación Técnica - Komorebi House

## 🏠 Descripción General

**Komorebi House** es una plataforma web avanzada especializada en la comercialización y gestión de propiedades tradicionales japonesas (akiya) en la prefectura de Gunma. La aplicación combina tecnologías modernas de desarrollo web con funcionalidades 3D interactivas para ofrecer una experiencia inmersiva en la búsqueda y visualización de propiedades.

---

## 🛠️ Stack Tecnológico

### **Frontend Framework**
- **Next.js 15.5.4** - Framework React con App Router
- **React 19.1.0** - Biblioteca de interfaz de usuario
- **TypeScript 5** - Tipado estático para JavaScript

### **Estilos y UI**
- **Tailwind CSS 4** - Framework de utilidades CSS
- **Framer Motion 12.23.21** - Animaciones y transiciones
- **Lucide React 0.544.0** - Iconografía moderna
- **Radix UI** - Componentes accesibles (Dialog, Navigation, Select, Tabs)

### **Visualización 3D**
- **Three.js 0.180.0** - Biblioteca 3D WebGL
- **@react-three/fiber 9.3.0** - Renderer React para Three.js
- **@react-three/drei 10.7.6** - Helpers y utilidades 3D

### **Mapas y Ge localización**
- **Google Maps API** - Integración con Google Maps
- **Mapbox GL 3.15.0** - Mapas interactivos alternativos

### **Herramientas de Desarrollo**
- **ESLint 9** - Linter para código JavaScript/TypeScript
- **Turbopack** - Bundler ultra-rápido de Next.js

---

## 📁 Estructura del Proyecto

```
src/
├── app/                          # App Router de Next.js
│   ├── (páginas principales)
│   │   ├── page.tsx             # Página de inicio
│   │   ├── about/page.tsx       # Sobre nosotros
│   │   ├── contact/page.tsx     # Contacto
│   │   ├── projects/page.tsx    # Lista de proyectos
│   │   ├── process/page.tsx     # Proceso de compra
│   │   └── journal/page.tsx     # Blog/Journal
│   ├── (páginas dinámicas)
│   │   ├── projects/[id]/page.tsx        # Detalle de proyecto
│   │   ├── property/[id]/page.tsx        # Detalle de propiedad
│   │   └── journal/category/[category]/page.tsx  # Categorías del blog
│   ├── (páginas especializadas)
│   │   ├── blueprint/page.tsx           # Ecosistema Blueprint
│   │   ├── 3d-viewer/page.tsx          # Visor 3D
│   │   ├── model-viewer/page.tsx       # Visor de modelos
│   │   ├── admin/page.tsx              # Panel administrativo
│   │   ├── guide/page.tsx              # Guía del proceso
│   │   ├── privacy/page.tsx            # Política de privacidad
│   │   └── terms/page.tsx              # Términos y condiciones
│   ├── api/                            # API Routes
│   │   └── placeholder/[...params]/route.ts
│   ├── globals.css                     # Estilos globales
│   ├── layout.tsx                      # Layout principal
│   └── icon.svg                        # Icono de la aplicación
├── components/                         # Componentes reutilizables
│   ├── (navegación)
│   │   ├── Navigation.tsx              # Barra de navegación
│   │   └── Footer.tsx                  # Pie de página
│   ├── (3D y visualización)
│   │   ├── InteractiveDesignTable.tsx  # Mesa de diseño interactiva
│   │   ├── Real3DViewer.tsx           # Visor 3D principal
│   │   ├── JapaneseHouse3D.tsx        # Modelo 3D de casa japonesa
│   │   ├── ARPropertyViewer.tsx       # Visor de realidad aumentada
│   │   └── ProjectControlCenter.tsx   # Centro de control de proyectos
│   ├── (formularios y UI)
│   │   ├── ContactForm.tsx            # Formulario de contacto
│   │   ├── BookingSystem.tsx          # Sistema de reservas
│   │   ├── ROICalculator.tsx          # Calculadora de ROI
│   │   └── AIChat.tsx                 # Chat con IA
│   ├── (mapas y ubicación)
│   │   ├── GoogleMap.tsx              # Integración Google Maps
│   │   ├── SmartMap.tsx               # Mapa inteligente
│   │   └── AestheticMapSection.tsx    # Sección de mapa estética
│   └── (otros componentes)
│       ├── HeroSection.tsx            # Sección hero
│       ├── FeaturedProjects.tsx       # Proyectos destacados
│       └── VideoBackground.tsx        # Fondo de video
├── config/
│   └── maps.ts                        # Configuración de mapas
└── lib/
    └── crm.ts                         # Integración CRM
```

---

## 🎯 Funcionalidades Principales

### **1. Página de Inicio (`/`)**
- **Hero Section**: Video de fondo con mensaje principal
- **Sección de Proyectos Destacados**: Grid responsive de propiedades
- **Blueprint Digital**: Enlaces a herramientas de diseño interactivo
- **Secciones informativas**: Filosofía, legado, turismo

### **2. Sistema de Proyectos**
- **Lista de Proyectos** (`/projects`): Grid de propiedades disponibles
- **Detalle de Proyecto** (`/projects/[id]`): Página individual con:
  - Galería de imágenes
  - Información detallada de la propiedad
  - Características y servicios cercanos
  - Botones de acción (información, visita)
  - Diseño completamente responsive

### **3. Ecosistema Blueprint (`/blueprint`)**
- **Portal Blueprint**: Navegación a herramientas especializadas
- **Mesa de Diseño Interactiva**: Herramienta de diseño 3D en tiempo real
- **Visor AR**: Visualización de realidad aumentada
- **Centro de Control de Proyectos**: Panel de gestión avanzada

### **4. Mesa de Diseño Interactiva**
- **Canvas 2D/3D**: Área de trabajo para diseño
- **Sidebar de Herramientas**: Elementos, estilos y habitaciones
- **Controles de Transformación**: Rotación, escala, posición
- **Sistema de Historial**: Deshacer/rehacer acciones
- **Exportación**: Guardar y descargar diseños
- **Completamente Responsive**: Adaptado para móvil, tablet y desktop

### **5. Visualización 3D**
- **Visor 3D Principal** (`/3d-viewer`): Modelos 3D interactivos
- **Modelos de Casas Japonesas**: Representaciones realistas
- **Controles de Cámara**: Orbit, zoom, pan
- **Iluminación Realista**: Sistema de luces avanzado
- **Optimización de Rendimiento**: Carga lazy y optimización de assets

### **6. Sistema de Mapas**
- **Integración Google Maps**: Visualización de ubicaciones
- **Mapas Inteligentes**: Marcadores interactivos
- **Geolocalización**: Búsqueda por ubicación
- **Información Contextual**: Datos de propiedades en el mapa

### **7. Blog y Contenido (`/journal`)**
- **Página Principal**: Lista de artículos
- **Categorías Dinámicas**: 
  - Diseño y Arquitectura (`/journal/category/design`)
  - Cultura Japonesa (`/journal/category/culture`)
  - Estilo de Vida (`/journal/category/lifestyle`)
- **Artículos Responsive**: Diseño adaptativo para todos los dispositivos

### **8. Sistema de Contacto**
- **Formulario de Contacto** (`/contact`): Formulario completo con validación
- **Sistema de Reservas**: Booking system integrado
- **Chat con IA**: Asistente virtual para consultas
- **Múltiples Canales**: Email, teléfono, chat

### **9. Panel Administrativo (`/admin`)**
- **Gestión de Leads**: Seguimiento de prospectos
- **Análisis de Rendimiento**: Métricas y estadísticas
- **Gestión de Proyectos**: Control centralizado
- **Dashboard Responsive**: Interfaz adaptativa

---

## 📱 Características de Responsive Design

### **Breakpoints Implementados**
- **Móvil**: `< 640px` - Layout vertical optimizado
- **Tablet**: `640px - 1024px` - Transición suave
- **Desktop**: `> 1024px` - Layout horizontal completo

### **Componentes Responsive**
- **Navegación**: Menú hamburguesa en móvil, horizontal en desktop
- **Footer**: Layout adaptativo con información reorganizada
- **Mesa de Diseño**: Sidebars que se convierten en paneles deslizables
- **Formularios**: Campos y botones optimizados para touch
- **Mapas**: Controles adaptativos según el dispositivo

### **Optimizaciones Móviles**
- **Touch-friendly**: Botones y controles optimizados para dedos
- **Scroll optimizado**: Navegación fluida con scrollbars ocultos
- **Carga rápida**: Lazy loading y optimización de imágenes
- **Performance**: Componentes optimizados para dispositivos móviles

---

## 🔧 Configuración y Deployment

### **Scripts Disponibles**
```json
{
  "dev": "next dev --turbopack",           // Desarrollo con Turbopack
  "build": "next build",                   // Build de producción
  "start": "next start",                   // Servidor de producción
  "lint": "eslint",                        // Verificación de código
  "type-check": "tsc --noEmit"             // Verificación de tipos
}
```

### **Variables de Entorno**
- **Google Maps API Key**: Para integración de mapas
- **Mapbox Token**: Para mapas alternativos
- **API Endpoints**: URLs de servicios externos

### **Deployment**
- **Netlify**: Configurado con `netlify.toml`
- **Vercel**: Compatible con Next.js
- **Build optimizado**: Configuración para producción

---

## 🎨 Sistema de Diseño

### **Paleta de Colores**
- **Primary**: Azul corporativo para elementos principales
- **Accent**: Amarillo dorado para destacados
- **Background**: Grises neutros para fondos
- **Text**: Escala de grises para tipografía

### **Tipografía**
- **Serif**: Para títulos y elementos destacados
- **Sans-serif**: Para texto de cuerpo
- **Mono**: Para elementos técnicos

### **Componentes UI**
- **Botones**: Variantes primary, secondary, outline
- **Formularios**: Inputs con validación visual
- **Cards**: Contenedores con sombras y bordes redondeados
- **Modales**: Overlays con animaciones suaves

---

## 🚀 Funcionalidades Avanzadas

### **Realidad Aumentada (AR)**
- **ARPropertyViewer**: Visualización de propiedades en AR
- **Múltiples opciones de renderizado**: Original, renovado, lujo
- **Controles interactivos**: Navegación entre vistas

### **Inteligencia Artificial**
- **Chat con IA**: Asistente virtual para consultas
- **Respuestas contextuales**: Información específica sobre propiedades
- **Integración CRM**: Seguimiento de conversaciones

### **Análisis y Métricas**
- **Google Analytics**: Tracking de usuarios
- **Heatmaps**: Análisis de comportamiento
- **Conversiones**: Seguimiento de leads y ventas

### **Optimización SEO**
- **Meta tags**: Optimización para motores de búsqueda
- **Sitemap**: Mapa del sitio generado automáticamente
- **Structured data**: Datos estructurados para propiedades

---

## 🔒 Seguridad y Privacidad

### **Política de Privacidad**
- **Recopilación de datos**: Transparente y específica
- **Uso de información**: Claramente definido
- **Protección de datos**: Medidas de seguridad implementadas
- **Derechos del usuario**: Acceso, corrección, eliminación

### **Términos y Condiciones**
- **Servicios ofrecidos**: Descripción detallada
- **Responsabilidades**: Clientes y empresa
- **Limitaciones**: Claramente establecidas
- **Resolución de disputas**: Procedimientos definidos

---

## 📊 Performance y Optimización

### **Core Web Vitals**
- **LCP (Largest Contentful Paint)**: Optimizado con lazy loading
- **FID (First Input Delay)**: Interactividad mejorada
- **CLS (Cumulative Layout Shift)**: Layout estable

### **Optimizaciones Implementadas**
- **Image optimization**: Next.js Image component
- **Code splitting**: Carga lazy de componentes
- **Bundle optimization**: Minimización y compresión
- **Caching**: Headers de caché apropiados

---

## 🛠️ Mantenimiento y Soporte

### **Monitoreo**
- **Error tracking**: Captura de errores en producción
- **Performance monitoring**: Métricas de rendimiento
- **User analytics**: Comportamiento de usuarios

### **Actualizaciones**
- **Dependencias**: Actualización regular de paquetes
- **Security patches**: Parches de seguridad
- **Feature updates**: Nuevas funcionalidades

---

## 📞 Información de Contacto

### **Desarrollo**
- **Tecnologías**: Next.js, React, TypeScript, Three.js
- **Arquitectura**: App Router, Component-based
- **Deployment**: Netlify/Vercel compatible

### **Soporte Técnico**
- **Documentación**: Completa y actualizada
- **Código**: Comentado y documentado
- **Estructura**: Organizada y escalable

---

*Este documento técnico proporciona una visión completa de la plataforma Komorebi House, sus funcionalidades, arquitectura y capacidades técnicas. La aplicación está diseñada para ser escalable, mantenible y ofrecer una experiencia de usuario excepcional en todos los dispositivos.*
