# 🗄️ CONFIGURACIÓN AUTOMÁTICA DE SUPABASE

## 📋 **PASO 1: Obtener Credenciales de Supabase**

1. Ve a https://supabase.com/
2. Inicia sesión o crea una cuenta
3. Crea un nuevo proyecto o usa uno existente
4. Ve a Settings > API
5. Copia las siguientes credenciales:
   - **Project URL**
   - **anon public key**
   - **service_role key**

## 📋 **PASO 2: Configurar Variables de Entorno**

Agrega estas credenciales a tu archivo `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui
```

## 📋 **PASO 3: Ejecutar Script de Base de Datos**

1. Ve a Supabase Dashboard
2. Ve a SQL Editor
3. Copia y pega el contenido de `database_schema_complete.sql`
4. Ejecuta el script
5. Verifica que se crearon todas las tablas

## 📋 **PASO 4: Verificar Configuración**

Ejecuta este script para verificar que Supabase funciona:

```bash
node test-supabase.js
```

## 📋 **PASO 5: Probar Sistema Completo**

Una vez configurado Supabase:

```bash
# Reiniciar servidor
npm run dev

# Probar dashboard
# Ve a http://localhost:3000/dashboard
```

---

## 🔧 **SCRIPT DE VERIFICACIÓN DE SUPABASE**

Crea un archivo `test-supabase.js`:

```javascript
const { createClient } = require('@supabase/supabase-js');

// Configuración
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tu-proyecto.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'tu_anon_key_aqui';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabase() {
  console.log('🧪 Probando conexión a Supabase...');
  
  try {
    // Test de conexión básica
    const { data, error } = await supabase
      .from('user_profiles')
      .select('count')
      .limit(1);
    
    if (error && error.code === 'PGRST116') {
      console.log('⚠️ Tabla user_profiles no existe');
      console.log('💡 Necesitas ejecutar el script de base de datos');
      return false;
    } else if (error) {
      console.log('❌ Error de Supabase:', error.message);
      return false;
    } else {
      console.log('✅ Supabase conectado correctamente');
      return true;
    }
  } catch (error) {
    console.log('❌ Error de conexión:', error.message);
    return false;
  }
}

testSupabase();
```

---

## 🎯 **TABLAS QUE SE CREARÁN**

El script `database_schema_complete.sql` creará:

1. **analysis_results** - Resultados de análisis IA
2. **ai_predictions** - Predicciones de IA
3. **properties** - Catálogo de propiedades
4. **market_data** - Datos de mercado
5. **ai_responses** - Respuestas de IA
6. **ai_chat_history** - Historial de chat
7. **recommendations** - Recomendaciones
8. **recommendation_feedback** - Feedback de recomendaciones
9. **property_recommendations** - Recomendaciones de propiedades
10. **market_analyses** - Análisis de mercado
11. **market_insights** - Insights de mercado
12. **user_interactions** - Interacciones de usuario
13. **scoring_history** - Historial de scores
14. **system_config** - Configuración del sistema

---

## 🚀 **PRÓXIMOS PASOS DESPUÉS DE SUPABASE**

1. **Probar APIs de IA** con datos reales
2. **Configurar Google Maps** para ubicaciones
3. **Configurar Claude** agregando créditos
4. **Configurar Gemini** habilitando API
5. **Probar sistema completo** end-to-end

---

## 💡 **CONSEJOS**

- **Backup:** Siempre haz backup antes de ejecutar scripts SQL
- **Testing:** Prueba cada componente por separado
- **Logs:** Revisa los logs de Supabase para errores
- **Seguridad:** Nunca commitees claves reales
- **Monitoreo:** Usa el dashboard de Supabase para monitorear uso

¿Necesitas ayuda con algún paso específico de la configuración de Supabase?
