# 🏠 Modelos Personalizados - EIICHI VISION

## 📁 Carpeta para tu Modelo GLB

Esta carpeta está diseñada específicamente para tu modelo de casa japonesa personalizado.

### 🎯 Cómo Usar:

#### **Opción 1: Copiar tu archivo aquí**
1. Descarga tu modelo GLB desde Google Drive
2. Renómbralo a `japanese-house.glb`
3. Cópialo en esta carpeta: `public/models/custom/japanese-house.glb`
4. El sitio lo detectará automáticamente

#### **Opción 2: Subir desde la interfaz**
1. Ve a la sección "Navegación 3D Interactiva"
2. Haz clic en "Subir Archivo"
3. Selecciona tu archivo GLB
4. Se cargará automáticamente

### ✨ Características del Visualizador Premium:

- **🎨 Iluminación realista** - Múltiples fuentes de luz
- **🌟 Efectos de partículas** - Partículas doradas al hacer hover
- **🎮 Controles avanzados** - Rotación, zoom, pan
- **📱 Pantalla completa** - Modo inmersivo
- **🌅 Ambiente dinámico** - Cielo y ambiente realista
- **💫 Sombras suaves** - ContactShadows para realismo
- **🎯 Interactividad** - Click para seleccionar elementos
- **⚡ Performance optimizada** - 60fps suave

### 🔧 Especificaciones Técnicas:

- **Formato:** GLB (GL Transmission Format Binary)
- **Renderizado:** WebGL 2.0 con Three.js
- **Sombras:** Soft shadows con mapas de 4096x4096
- **Anti-aliasing:** MSAA 4x
- **Tone Mapping:** ACES Filmic
- **Iluminación:** Ambient + Directional + Point + Spot lights

### 📱 Compatibilidad:

- ✅ **Desktop** - Experiencia completa
- ✅ **Mobile** - Optimizado para touch
- ✅ **Tablet** - Controles adaptados
- ✅ **VR Ready** - Preparado para realidad virtual

### 🎪 Efectos Visuales:

1. **Rotación automática** - Movimiento suave y elegante
2. **Efectos hover** - Escalado y partículas al pasar el mouse
3. **Selección interactiva** - Click para seleccionar elementos
4. **Flotación sutil** - Movimiento vertical suave
5. **Partículas doradas** - Efectos visuales al interactuar
6. **Sombras de contacto** - Realismo en el suelo
7. **Cielo dinámico** - Ambiente cambiante
8. **Controles premium** - Panel de controles avanzado

### 🚀 Para Desarrolladores:

El sistema detecta automáticamente si hay un archivo `japanese-house.glb` en esta carpeta y lo carga directamente. Si no encuentra el archivo, muestra las opciones de carga.

```typescript
// Detección automática
const response = await fetch('/models/custom/japanese-house.glb');
if (response.ok) {
  setModelUrl('/models/custom/japanese-house.glb');
  setShowPremium(true);
}
```

### 📞 Soporte:

Si tienes problemas:
1. Verifica que el archivo sea GLB/GLTF
2. Confirma que esté en la ubicación correcta
3. Revisa la consola del navegador
4. Contacta al equipo de desarrollo

---

**¡Sube tu modelo y disfruta de la experiencia 3D premium!** 🚀✨
