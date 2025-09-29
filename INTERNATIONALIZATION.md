# Sistema de Internacionalización - Komorebi House

## 🌍 Idiomas Soportados

- **Inglés (en)** - Idioma por defecto
- **Japonés (ja)** - 日本語
- **Árabe (ar)** - العربية

## 📁 Estructura de Archivos

```
src/
├── i18n.ts                    # Configuración de idiomas
├── middleware.ts              # Middleware de internacionalización
├── app/
│   ├── [locale]/             # Rutas internacionalizadas
│   │   ├── layout.tsx        # Layout con soporte i18n
│   │   └── page.tsx          # Página principal traducida
│   └── page.tsx              # Redirección a /en
└── components/
    ├── LanguageSwitcher.tsx   # Selector de idioma
    └── Navigation.tsx         # Navegación traducida

messages/
├── en.json                   # Traducciones en inglés
├── ja.json                   # Traducciones en japonés
└── ar.json                   # Traducciones en árabe
```

## 🚀 Cómo Usar

### 1. Acceder a diferentes idiomas

- **Inglés**: `http://localhost:3000/en`
- **Japonés**: `http://localhost:3000/ja`
- **Árabe**: `http://localhost:3000/ar`

### 2. Usar traducciones en componentes

```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('navigation');
  
  return (
    <div>
      <h1>{t('home')}</h1>
      <p>{t('about')}</p>
    </div>
  );
}
```

### 3. Agregar nuevas traducciones

1. Editar los archivos JSON en `messages/`
2. Agregar las claves correspondientes en los 3 idiomas
3. Usar `useTranslations()` en los componentes

## 🔧 Configuración Técnica

### Next.js Config
- Configurado con `next-intl` plugin
- Middleware para detección automática de idioma
- Rutas estáticas generadas para todos los idiomas

### Características
- ✅ Detección automática de idioma del navegador
- ✅ Soporte RTL para árabe
- ✅ Selector de idioma en la navegación
- ✅ URLs amigables con prefijo de idioma
- ✅ Fallback a inglés si el idioma no está soportado

## 📝 Agregar Nuevos Idiomas

1. Agregar el código del idioma en `src/i18n.ts`:
```typescript
export const locales = ['en', 'ja', 'ar', 'es'] as const;
```

2. Crear archivo de traducción en `messages/es.json`

3. El sistema automáticamente:
   - Generará rutas estáticas
   - Configurará el middleware
   - Agregará opciones al selector de idioma

## 🎨 Componentes Traducidos

- ✅ Navigation (Navegación principal)
- ✅ HeroSection (Sección hero)
- ✅ LanguageSwitcher (Selector de idioma)
- ✅ Página principal con secciones traducidas

## 🔄 Próximos Pasos

Para completar la traducción de toda la página:

1. **Actualizar componentes restantes**:
   - Footer
   - ContactForm
   - FeaturedProjects
   - PhilosophySection
   - TourismSection
   - AestheticMapSection

2. **Traducir páginas**:
   - About
   - Projects
   - Contact
   - Process
   - Journal

3. **Optimizaciones**:
   - Lazy loading de traducciones
   - Cache de traducciones
   - SEO optimizado por idioma

## 🌐 URLs de Ejemplo

- `/en` - Página principal en inglés
- `/ja` - Página principal en japonés  
- `/ar` - Página principal en árabe
- `/en/about` - Sobre nosotros en inglés
- `/ja/projects` - Proyectos en japonés
- `/ar/contact` - Contacto en árabe
