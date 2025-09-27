# 📁 Modelos 3D para EIICHI VISION

## 🎯 Formatos Soportados

### **1. GLTF/GLB (Recomendado)**
- **GLTF** (.gltf) - Formato estándar web
- **GLB** (.glb) - Versión binaria de GLTF
- **Ventajas:**
  - Formato nativo de Three.js
  - Optimizado para web
  - Soporte completo de materiales, texturas, animaciones
  - Tamaño de archivo pequeño
  - Carga rápida

### **2. FBX (Compatible)**
- **FBX** (.fbx) - Formato de Autodesk
- **Ventajas:**
  - Ampliamente usado en la industria
  - Soporte completo de animaciones
  - Preserva jerarquías de objetos

### **3. OBJ (Básico)**
- **OBJ** (.obj) - Formato simple
- **Ventajas:**
  - Formato universal
  - Fácil de crear
  - Ligero

## 📂 Estructura de Archivos

```
public/models/
├── houses/
│   ├── japanese-house.gltf
│   ├── japanese-house.glb
│   ├── traditional-house.fbx
│   └── modern-house.obj
├── furniture/
│   ├── tatami-mat.gltf
│   ├── shoji-screen.glb
│   └── kotatsu-table.fbx
└── environment/
    ├── garden.gltf
    ├── trees.glb
    └── rocks.obj
```

## 🚀 Cómo Usar

### **1. Subir tu modelo:**
```bash
# Copia tu archivo 3D a la carpeta correspondiente
cp tu-modelo.gltf public/models/houses/
```

### **2. Usar en el código:**
```tsx
import ModelLoader from '@/components/ModelLoader';

// Para modelo GLTF/GLB
<ModelLoader 
  modelUrl="/models/houses/japanese-house.gltf" 
  modelType="gltf" 
/>

// Para modelo FBX
<ModelLoader 
  modelUrl="/models/houses/traditional-house.fbx" 
  modelType="fbx" 
/>

// Para modelo OBJ
<ModelLoader 
  modelUrl="/models/houses/modern-house.obj" 
  modelType="obj" 
/>
```

## 🎨 Recomendaciones de Modelado

### **Para Casas Japonesas:**
- **Escala:** 1 unidad = 1 metro
- **Materiales:** Texturas en formato JPG/PNG
- **LOD:** Múltiples niveles de detalle
- **Animaciones:** Puertas, ventanas, elementos móviles

### **Optimización:**
- **Polígonos:** Máximo 50,000 para web
- **Texturas:** Máximo 2048x2048 píxeles
- **Compresión:** Usar GLB para archivos binarios
- **LOD:** Crear versiones simplificadas

## 🔧 Herramientas Recomendadas

### **Modelado:**
- **Blender** (Gratuito) - Exporta a GLTF/GLB
- **Maya** - Exporta a FBX
- **3ds Max** - Exporta a FBX
- **SketchUp** - Exporta a OBJ

### **Conversión:**
- **glTF-Pipeline** - Optimiza modelos GLTF
- **FBX2glTF** - Convierte FBX a GLTF
- **OBJ2GLTF** - Convierte OBJ a GLTF

## 📱 Compatibilidad

- ✅ **Desktop** - Soporte completo
- ✅ **Mobile** - Optimizado para móviles
- ✅ **Tablet** - Funciona en tablets
- ✅ **VR/AR** - Preparado para realidad virtual

## 🎯 Ejemplos de Uso

### **Casa Tradicional:**
```tsx
<ModelLoader 
  modelUrl="/models/houses/traditional-japanese-house.glb" 
  modelType="gltf" 
/>
```

### **Muebles:**
```tsx
<ModelLoader 
  modelUrl="/models/furniture/tatami-mat.gltf" 
  modelType="gltf" 
/>
```

### **Jardín:**
```tsx
<ModelLoader 
  modelUrl="/models/environment/zen-garden.glb" 
  modelType="gltf" 
/>
```

## 🚨 Notas Importantes

1. **Tamaño de archivo:** Mantén los modelos bajo 10MB
2. **Texturas:** Incluye todas las texturas necesarias
3. **Materiales:** Usa materiales PBR cuando sea posible
4. **Animaciones:** Las animaciones se cargan automáticamente
5. **LOD:** Implementa niveles de detalle para mejor performance

## 📞 Soporte

Si tienes problemas con algún modelo:
1. Verifica el formato del archivo
2. Revisa el tamaño del archivo
3. Confirma que las texturas estén incluidas
4. Contacta al equipo de desarrollo

---

**¡Sube tu modelo 3D y disfruta de la experiencia Three.js!** 🚀
