# 🏗️ El Arquitecto de Oportunidades - Sistema de Onboarding Inteligente

## **Concepto Principal**
"El Arquitecto de Oportunidades" - Un sistema que arquitecta la ruta personalizada del cliente en Japón en menos de 90 segundos.

## **Parte 1: El Onboarding Inteligente ("La Ruta Maestra")**

### **Paso 1: La Gran Bienvenida**
- Pantalla limpia y elegante
- Mensaje: "Bienvenido a Tabiji House. Estamos aquí para construir tu futuro en Japón. Empecemos a diseñar tu camino."

### **Paso 2: La Pregunta Clave (La Gran Bifurcación)**
**"¿Cuál es el principal motor de tu viaje hacia Japón?"**

#### **3 Opciones como tarjetas visuales:**

**🎯 INVERTIR**
- Icono: Gráfico de crecimiento o símbolo de Yen
- Subtexto: "Busco construir un portafolio, generar rendimiento y explorar oportunidades de negocio como franquicias o startups."
- Dirigido: Principalmente al perfil Latino

**🚪 MIGRAR**
- Icono: Pasaporte o puerta Torii
- Subtexto: "Mi objetivo es establecer una nueva vida en Japón, ya sea como profesional, emprendedor o para mi familia."
- Interés: General, pero clave para compromiso a largo plazo

**🏡 VIVIR**
- Icono: Casa dentro de círculo zen o símbolo de onsen
- Subtexto: "Deseo encontrar un segundo hogar, una casa de vacaciones o un refugio para disfrutar del estilo de vida, la cultura y la naturaleza."
- Dirigido: Principalmente a perfiles Europeo y Árabe

### **Paso 3: El Cuestionario Dinámico (La Ruta Inteligente)**

#### **Si eligió "INVERTIR":**
1. ¿Qué tipo de oportunidad de negocio te interesa más?
   - Franquicia
   - Inmuebles para alquilar
   - Startup tecnológica
   - Otros

2. ¿Cuál es tu rango de inversión inicial?
   - $50K - $100K
   - $100K - $500K
   - $500K - $1M
   - $1M+

3. ¿Cuál es tu principal objetivo?
   - Flujo de caja
   - Valorización a largo plazo
   - Diversificación de portafolio

#### **Si eligió "MIGRAR":**
1. ¿Cuál sería tu estatus principal en Japón?
   - Nómada digital
   - Inversionista con visa
   - Empleado de empresa
   - Emprendedor

2. ¿Planean migrar solos o con familia?
   - Solo
   - Con pareja
   - Con familia completa

3. ¿Cuál es tu campo profesional o de estudios?
   - Tecnología
   - Negocios
   - Arte/Cultura
   - Otros

#### **Si eligió "VIVIR":**
1. ¿Qué cualidad valoras más en un hogar?
   - Privacidad y lujo
   - Conexión con la naturaleza
   - Diseño y autenticidad
   - Ubicación estratégica

2. ¿Cuántas personas conformarían tu familia o grupo?
   - 1-2 personas
   - 3-4 personas
   - 5+ personas

3. ¿Uso principal de la propiedad?
   - Vacaciones de ski
   - Retiro de verano
   - Residencia a tiempo parcial
   - Residencia permanente

### **Paso 4: El Resultado Inmediato (Tu "Blueprint" Inicial)**
- Mensaje: "Perfecto. Hemos creado tu 'Blueprint' inicial. Tu dashboard ha sido personalizado para acelerar tu objetivo. Bienvenido a tu centro de mando en Japón."

## **Parte 2: El Dashboard Unificado ("Tu Centro de Mando en Japón")**

### **Diseño Modular**
El dashboard se compone de "Módulos" o "Widgets" que se activan según el perfil del usuario.

### **Módulos Disponibles:**

#### **🏠 Módulo de Propiedades (Para todos)**
- Visores 3D
- Mesa de Diseño
- Realidad Aumentada
- Centro de Control de Proyectos de renovación

#### **💰 Módulo de Inversión (Activado para perfil "INVERTIR")**
- Marketplace de Oportunidades
- Calculadora de ROI Avanzada
- Conexión Legal
- Lista de franquicias disponibles en Gunma

#### **🛂 Módulo Migratorio (Activado para perfil "MIGRAR")**
- Tracker de Visa
- Gestor de Documentos Seguro
- Chat Directo con Asesores Migratorios
- Barra de progreso de documentos

#### **🎌 Módulo de Estilo de Vida (Activado para perfil "VIVIR")**
- Concierge Digital
- Guías Personalizadas
- Red de Contactos Locales
- Reservas de experiencias curadas

## **Implementación Técnica**

### **Estructura de Datos del Usuario:**
```typescript
interface UserProfile {
  primaryGoal: 'invertir' | 'migrar' | 'vivir';
  investmentLevel?: 'alto' | 'medio' | 'bajo';
  migrationInterest?: 'si' | 'no';
  businessGoals?: 'negocio' | 'empleo' | 'estudio';
  // Campos específicos según el perfil
  investmentRange?: string;
  familySize?: string;
  propertyUse?: string;
  // ... más campos dinámicos
}
```

### **Sistema de Módulos:**
```typescript
interface DashboardModule {
  id: string;
  name: string;
  icon: React.ComponentType;
  component: React.ComponentType;
  enabledFor: ('invertir' | 'migrar' | 'vivir')[];
  priority: number;
}
```

## **Beneficios del Sistema:**
1. **Personalización Total**: Cada usuario ve solo lo que necesita
2. **Experiencia Fluida**: Menos de 90 segundos para configuración inicial
3. **Escalabilidad**: Fácil agregar nuevos módulos y perfiles
4. **Conversión Mejorada**: Usuario siente valor inmediato
5. **Datos Valiosos**: Información estructurada para ventas y marketing

## **Próximos Pasos:**
1. Implementar el sistema de onboarding inteligente
2. Crear los módulos dinámicos del dashboard
3. Desarrollar el sistema de persistencia de perfil
4. Integrar con el sistema de autenticación existente
5. Añadir analytics y tracking de conversión

