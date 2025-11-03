# Sistema de Fracciones - Configuración

Este documento explica cómo configurar el sistema de fracciones de Tabiji House con datos reales.

## 📋 Requisitos Previos

1. Supabase configurado y funcionando
2. Base de datos accesible
3. Variables de entorno configuradas

## 🗄️ Configuración de Base de Datos

### Paso 1: Ejecutar el Esquema de Base de Datos

Ejecuta el archivo SQL en tu base de datos Supabase:

```sql
-- Ejecutar en el SQL Editor de Supabase
-- Archivo: supabase_fractional_schema.sql
```

Este esquema creará:
- Tabla `fractional_properties` - Propiedades fraccionadas
- Tabla `fractional_investments` - Inversiones de usuarios
- Tabla `fractional_payments` - Pagos realizados
- Triggers automáticos para actualizar progreso de financiamiento
- Políticas de seguridad (RLS)
- Datos iniciales de las 2 propiedades reales

### Paso 2: Verificar las Tablas

Verifica que las tablas se crearon correctamente:

```sql
SELECT * FROM fractional_properties;
SELECT * FROM fractional_investments;
SELECT * FROM fractional_payments;
```

### Paso 3: Verificar Datos Iniciales

Deberías ver 2 propiedades:
- Villa Japonesa Tradicional (property-a-traditional-villa)
- Retiro Montañoso Moderno (property-b-modern-retreat)

## 🔧 Arquitectura del Sistema

### Servicios

- **`src/lib/fractional/fractional-service.ts`** - Servicio principal para operaciones con BD
  - `getProperties()` - Obtener todas las propiedades
  - `getPropertyById()` - Obtener propiedad específica
  - `createInvestment()` - Crear nueva inversión
  - `confirmInvestment()` - Confirmar inversión después del pago
  - `getInvestorInvestments()` - Obtener inversiones de un usuario
  - `getInvestorDashboard()` - Dashboard completo del inversor
  - `getPlatformMetrics()` - Métricas generales de la plataforma

### APIs

- **`GET /api/fractional/properties`** - Listar propiedades
- **`GET /api/fractional/properties?id=xxx`** - Obtener propiedad específica
- **`POST /api/fractional/investments`** - Crear inversión
- **`GET /api/fractional/investments?investorId=xxx`** - Obtener inversiones
- **`POST /api/fractional/investments/confirm`** - Confirmar inversión
- **`GET /api/fractional/dashboard?investorId=xxx`** - Dashboard del inversor
- **`GET /api/fractional/metrics`** - Métricas de plataforma

### Componentes

- **`FractionalPropertyCard`** - Tarjeta de propiedad
- **`FractionalInvestmentCalculator`** - Calculadora de inversión
- **`FractionalPaymentFlow`** - Flujo de pago
- **`FractionalInvestorDashboard`** - Dashboard del inversor
- **`FractionalMetrics`** - Métricas de la plataforma

## 🚀 Flujo de Inversión

1. **Usuario selecciona propiedad** → `FractionalPropertyCard`
2. **Usuario hace clic en "Invertir"** → Abre `FractionalInvestmentCalculator`
3. **Usuario selecciona cantidad de acciones** → Calcula total y proyecciones
4. **Usuario confirma** → Abre `FractionalPaymentFlow`
5. **Usuario selecciona método de pago** → Crea inversión en BD (status: pending)
6. **Usuario completa el pago** → Confirma inversión (status: completed)
7. **Trigger automático** → Actualiza progreso de financiamiento de la propiedad

## 🔐 Seguridad

- **Row Level Security (RLS)** habilitado en todas las tablas
- Solo usuarios autenticados pueden crear inversiones
- Solo pueden ver sus propias inversiones
- Propiedades son visibles públicamente (lectura)

## 📊 Actualización Automática

El trigger `update_funding_progress()` actualiza automáticamente:
- `current_funding` - Suma total recaudada
- `sold_shares` - Acciones vendidas
- `available_shares` - Acciones disponibles
- `funding_progress` - Porcentaje de financiamiento
- `status` - Cambia a 'funded' cuando se alcanza el objetivo

## 🧪 Testing

Para probar el sistema:

1. **Ver propiedades**:
   ```bash
   curl http://localhost:3000/api/fractional/properties
   ```

2. **Crear inversión** (requiere autenticación):
   ```bash
   curl -X POST http://localhost:3000/api/fractional/investments \
     -H "Content-Type: application/json" \
     -d '{
       "propertyId": "property-a-traditional-villa",
       "investorId": "user-id",
       "sharesPurchased": 2,
       "totalAmount": 3000000,
       "paymentMethod": "stripe"
     }'
   ```

3. **Ver métricas**:
   ```bash
   curl http://localhost:3000/api/fractional/metrics
   ```

## 📝 Notas Importantes

- Las imágenes deben estar en `/public/property-a/` y `/public/property-b/`
- Los IDs de propiedades deben coincidir con los del esquema SQL
- El usuario debe estar autenticado para crear inversiones
- Los pagos se manejan externamente (Stripe, transferencia bancaria, etc.)

## 🔄 Sincronización de Datos

Si cambias datos en la base de datos:
- Los cambios se reflejan automáticamente en la UI
- El trigger actualiza el progreso en tiempo real
- Las métricas se calculan dinámicamente

## 🐛 Troubleshooting

**Error: "Failed to fetch properties"**
- Verifica que Supabase esté configurado
- Verifica que las tablas existan
- Revisa las políticas RLS

**Error: "Investment not created"**
- Verifica que el usuario esté autenticado
- Verifica que haya acciones disponibles
- Revisa los logs de la consola

**Imágenes no se muestran**
- Verifica que las rutas en BD coincidan con las carpetas en `/public`
- Verifica permisos de archivos

