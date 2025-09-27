# Maps Configuration Guide

## 🗺️ Configuración de Mapas - EIICHI VISION

### ✅ **Solución Implementada: SmartMap**

El proyecto ahora incluye un componente **SmartMap** que permite alternar entre:
- **Mapbox** (Gratuito - 50,000 cargas/mes)
- **Google Maps** (Requiere API key)

### 🚀 **Mapbox (Recomendado - Ya Funcionando)**

**Ventajas:**
- ✅ **Completamente gratuito** hasta 50,000 cargas por mes
- ✅ **Mejor rendimiento** y velocidad de carga
- ✅ **Estilos personalizables** más avanzados
- ✅ **Ya configurado** y funcionando

**No requiere configuración adicional.**

### 🔧 **Google Maps (Opcional)**

Si prefieres usar Google Maps:

#### Paso 1: Obtener API Key
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Maps JavaScript API**
4. Ve a **Credenciales** → **Crear credenciales** → **Clave de API**
5. Copia tu API key

#### Paso 2: Configurar en el Proyecto
1. Crea un archivo `.env.local` en la raíz del proyecto:
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_api_key_aqui
```

2. Actualiza `src/config/maps.ts`:
```typescript
export const MAPS_CONFIG = {
  GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'tu_api_key_aqui',
  // ... resto de la configuración
};
```

#### Costos Google Maps
- **Gratis**: Hasta 28,000 cargas de mapa por mes
- **Pago**: $7 por cada 1,000 cargas adicionales

### 🎛️ **Cómo Usar el SmartMap**

El componente SmartMap incluye un **toggle** en la esquina superior derecha que permite cambiar entre:
- **Mapbox** (por defecto)
- **Google Maps** (si tienes API key)

### 📍 **Ubicaciones Configuradas**

- **Kusatsu Onsen**: Centro del mapa
- **Tokio**: Marcador con información de distancia
- **Nagano**: Marcador con información de distancia

### 🎨 **Estilos Personalizados**

- **Mapbox**: Estilo "Light" minimalista
- **Google Maps**: Estilo personalizado japonés
- **Marcadores**: Diseño coherente con la marca EIICHI VISION
