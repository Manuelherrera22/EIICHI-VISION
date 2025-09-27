# 🚀 Guía de Despliegue en Netlify

## Configuración Automática

### 1. Conectar con GitHub
1. Ve a [Netlify](https://netlify.com)
2. Conecta tu cuenta de GitHub
3. Selecciona el repositorio `EIICHI-VISION`
4. Netlify detectará automáticamente la configuración

### 2. Configuración de Build
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: `18`

### 3. Variables de Entorno
Configura estas variables en Netlify Dashboard > Site settings > Environment variables:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_api_key_de_google_maps
NEXT_PUBLIC_SITE_URL=https://tu-sitio.netlify.app
NODE_ENV=production
```

### 4. Dominio Personalizado (Opcional)
1. Ve a Site settings > Domain management
2. Agrega tu dominio personalizado
3. Configura los DNS según las instrucciones de Netlify

## Configuración Manual

### Opción 1: Drag & Drop
1. Ejecuta `npm run build` localmente
2. Arrastra la carpeta `.next` a Netlify

### Opción 2: Netlify CLI
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=.next
```

## Optimizaciones Incluidas

### ✅ Performance
- Compresión automática de assets
- Cache headers optimizados
- Imágenes optimizadas
- Bundle splitting

### ✅ SEO
- Meta tags optimizados
- Sitemap automático
- Robots.txt incluido
- Open Graph tags

### ✅ Seguridad
- Headers de seguridad configurados
- HTTPS automático
- CSP headers básicos

### ✅ Monitoreo
- Build notifications
- Deploy previews
- Analytics integrado

## Troubleshooting

### Error: "Module not found"
- Verifica que todas las dependencias estén en `package.json`
- Ejecuta `npm install` antes del build

### Error: "Build timeout"
- Optimiza el tamaño de los assets
- Considera usar lazy loading para componentes pesados

### Error: "Three.js not loading"
- Verifica que los modelos GLB estén en `/public/models/`
- Confirma que las rutas sean correctas

## Comandos Útiles

```bash
# Build local para testing
npm run build

# Limpiar cache
npm run clean

# Verificar tipos
npm run type-check

# Lint y fix
npm run lint:fix
```

## URLs Importantes

- **Sitio principal**: `https://tu-sitio.netlify.app`
- **Admin panel**: `https://tu-sitio.netlify.app/admin`
- **3D Viewer**: `https://tu-sitio.netlify.app/3d-viewer`
- **Proyectos**: `https://tu-sitio.netlify.app/projects`

## Soporte

Para problemas específicos de Netlify:
- [Documentación oficial](https://docs.netlify.com)
- [Community Forum](https://community.netlify.com)
- [Status Page](https://www.netlifystatus.com)
