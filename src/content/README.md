# Contenido Generado para Tabiji House

Este directorio contiene todo el contenido generado para la plataforma Tabiji House, incluyendo propiedades fraccionadas, contenido de marketing, FAQs, y recursos educativos.

## 📁 Archivos Disponibles

### 1. `tabiji-house-content.ts`
Archivo TypeScript principal con todo el contenido estructurado:

- **Propiedades Fraccionadas**: 4 propiedades completas con descripciones detalladas
- **Contenido de Marketing**: Headlines, value propositions, beneficios
- **FAQs**: Preguntas frecuentes organizadas por categorías
- **Contenido Educativo**: Guías sobre inversión fraccionada, mercado japonés, región de Gunma
- **Testimonios**: Casos de éxito de inversores
- **Templates de Email**: Plantillas para comunicación con usuarios
- **Contenido para Redes Sociales**: Posts para LinkedIn, Twitter, Instagram

### 2. `marketing-copy.md`
Copy de marketing para diferentes plataformas y usos:

- Headlines y CTAs
- Descripciones de servicios
- Copy para landing pages
- Templates de emails
- Copy para redes sociales
- Copy para páginas de propiedad
- FAQs cortas
- Títulos de blog
- Meta descriptions para SEO
- Copy para anuncios

## 🚀 Cómo Usar Este Contenido

### Importar Propiedades Fraccionadas

```typescript
import { fractionalPropertiesContent } from '@/content/tabiji-house-content';

// Usar en componentes
const properties = fractionalPropertiesContent.map(prop => ({
  ...prop,
  id: generateId(), // Generar IDs únicos
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}));
```

### Usar Contenido de Marketing

```typescript
import { marketingContent } from '@/content/tabiji-house-content';

// En tu componente
<h1>{marketingContent.hero.title}</h1>
<p>{marketingContent.hero.subtitle}</p>
<button>{marketingContent.hero.cta}</button>
```

### Mostrar FAQs

```typescript
import { faqContent } from '@/content/tabiji-house-content';

// Renderizar FAQs por categoría
{faqContent.general.map((faq, index) => (
  <div key={index}>
    <h3>{faq.question}</h3>
    <p>{faq.answer}</p>
  </div>
))}
```

### Usar Contenido Educativo

```typescript
import { educationalContent } from '@/content/tabiji-house-content';

// Mostrar secciones educativas
{educationalContent.whyJapan.sections.map((section, index) => (
  <div key={index}>
    <h2>{section.title}</h2>
    <p>{section.content}</p>
  </div>
))}
```

### Integrar con Sistema de Traducciones

Si quieres agregar este contenido al sistema de traducciones existente:

```typescript
// En LanguageContext.tsx, puedes agregar:
'fractional.properties.caligrafo.description': fractionalPropertiesContent[0].description,
'fractional.properties.caligrafo.name': fractionalPropertiesContent[0].name,
// etc.
```

## 📝 Propiedades Disponibles

### 1. Villa Tradicional del Calígrafo
- **Ubicación**: Kusatsu, Gunma
- **ROI Estimado**: 12.5%
- **Inversión Mínima**: ¥642,500 (aprox. $6,425 USD)
- **Características**: Arquitectura tradicional, jardín zen, proximidad a onsen

### 2. Residencia del Artesano con Vista al Monte
- **Ubicación**: Tsumagoi, Gunma
- **ROI Estimado**: 11.2%
- **Inversión Mínima**: ¥1,000,000 (aprox. $10,000 USD)
- **Características**: Vistas panorámicas, arquitectura renovada, 2LDK

### 3. Casa Moderna con Jardín de Cerezos
- **Ubicación**: Kusatsu, Gunma
- **ROI Estimado**: 10.8%
- **Inversión Mínima**: ¥1,000,000 (aprox. $10,000 USD)
- **Características**: Jardín de sakura, renovación de lujo 2024, eficiencia energética

### 4. Retiro Tradicional en el Bosque
- **Ubicación**: Agatsuma, Gunma
- **ROI Estimado**: 9.5%
- **Inversión Mínima**: ¥791,667 (aprox. $7,917 USD)
- **Características**: Ubicación en bosque, irori funcional, privacidad total

## 📊 Estructura de Contenido

```
tabiji-house-content.ts
├── fractionalPropertiesContent (4 propiedades)
├── marketingContent
│   ├── hero
│   ├── valueProposition
│   ├── howItWorks
│   └── benefits
├── faqContent
│   ├── general
│   ├── financial
│   ├── legal
│   └── process
├── educationalContent
│   ├── whyJapan
│   ├── fractionalInvestment
│   └── gunmaRegion
├── testimonials
├── emailTemplates
└── socialMediaContent
```

## 🔄 Actualización y Mantenimiento

### Agregar Nuevas Propiedades

1. Agregar objeto a `fractionalPropertiesContent` array
2. Incluir todas las propiedades requeridas según `FractionalProperty` type
3. Agregar imágenes en `/public/images/properties/`
4. Crear documentos PDF en `/public/documents/`

### Actualizar Contenido de Marketing

1. Editar secciones específicas en `marketingContent`
2. Mantener consistencia de tono y mensaje
3. Actualizar números y estadísticas regularmente

### Agregar FAQs

1. Agregar a la categoría apropiada en `faqContent`
2. Mantener respuestas claras y concisas
3. Actualizar cuando cambien políticas o procesos

## 📧 Uso de Templates de Email

```typescript
import { emailTemplates } from '@/content/tabiji-house-content';

// Reemplazar variables en templates
const welcomeEmail = emailTemplates.welcome.body
  .replace('{{name}}', user.name)
  .replace('{{country}}', user.country);
```

## 📱 Uso de Contenido para Redes Sociales

```typescript
import { socialMediaContent } from '@/content/tabiji-house-content';

// Post para LinkedIn
const linkedInPost = socialMediaContent.posts.find(p => p.platform === 'linkedin');

// Story para Instagram
const instagramStory = socialMediaContent.stories[0];
```

## 🎨 Personalización

Todo el contenido está diseñado para ser fácilmente personalizable:

- **Números y precios**: Actualizar según valores reales
- **Fechas**: Actualizar según timeline real
- **Ubicaciones**: Agregar más propiedades según disponibilidad
- **Testimonios**: Reemplazar con testimonios reales cuando estén disponibles

## 📚 Recursos Adicionales

- Ver `marketing-copy.md` para copy específico de marketing
- Consultar documentación de tipos en `src/types/fractional.ts`
- Integrar con sistema de traducciones en `src/contexts/LanguageContext.tsx`

## ⚠️ Notas Importantes

1. **Números y Precios**: Todos los precios y ROI son estimados. Actualizar con valores reales antes de usar en producción.

2. **Imágenes**: Las rutas de imágenes son placeholders. Reemplazar con imágenes reales de las propiedades.

3. **Documentos**: Los PDFs referenciados deben ser creados antes de usar en producción.

4. **Testimonios**: Los testimonios son ejemplos. Reemplazar con testimonios reales de clientes verificados.

5. **Legal**: Asegurarse de que todo el contenido cumpla con regulaciones de marketing financiero en jurisdicciones relevantes.

## 🤝 Contribuciones

Para agregar o mejorar contenido:

1. Actualizar el archivo TypeScript correspondiente
2. Mantener consistencia de formato y estilo
3. Verificar que todo el contenido sea preciso y actualizado
4. Considerar implicaciones legales y regulatorias

---

**Última actualización**: Enero 2025
**Versión**: 1.0

