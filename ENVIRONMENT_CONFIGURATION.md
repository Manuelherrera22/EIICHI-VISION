# 🔧 CONFIGURACIÓN DE VARIABLES DE ENTORNO PARA TABIJI HOUSE
# Archivo de ejemplo para configurar todas las variables necesarias

# ==============================================
# 1. CONFIGURACIÓN DE SUPABASE
# ==============================================
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# ==============================================
# 2. CONFIGURACIÓN DE APIS DE IA
# ==============================================

# Anthropic Claude 3.5 Sonnet
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# OpenAI GPT-4o
OPENAI_API_KEY=your_openai_api_key_here

# Google Gemini Pro
GOOGLE_API_KEY=your_google_api_key_here

# ==============================================
# 3. CONFIGURACIÓN DE GOOGLE MAPS
# ==============================================
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# ==============================================
# 4. CONFIGURACIÓN DE GOOGLE OAUTH
# ==============================================
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# ==============================================
# 5. CONFIGURACIÓN DE TABIJIEXPORT
# ==============================================
TABIJIEXPORT_API_KEY=your_tabijiexport_api_key_here
TABIJIEXPORT_API_URL=https://api.tabijiexport.com

# ==============================================
# 6. CONFIGURACIÓN DE APIS EXTERNAS
# ==============================================

# APIs de datos inmobiliarios
REAL_ESTATE_API_KEY=your_real_estate_api_key_here
REAL_ESTATE_API_URL=https://api.realestate.com

# APIs de datos de mercado
MARKET_DATA_API_KEY=your_market_data_api_key_here
MARKET_DATA_API_URL=https://api.marketdata.com

# APIs de datos culturales
CULTURAL_DATA_API_KEY=your_cultural_data_api_key_here
CULTURAL_DATA_API_URL=https://api.culturaldata.com

# ==============================================
# 7. CONFIGURACIÓN DE EMAIL
# ==============================================
EMAIL_SERVICE_API_KEY=your_email_service_api_key_here
EMAIL_FROM=noreply@tabijihouse.com
EMAIL_TO=support@tabijihouse.com

# ==============================================
# 8. CONFIGURACIÓN DE STORAGE
# ==============================================
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# ==============================================
# 9. CONFIGURACIÓN DE ANALYTICS
# ==============================================
GOOGLE_ANALYTICS_ID=your_google_analytics_id
MIXPANEL_TOKEN=your_mixpanel_token
HOTJAR_ID=your_hotjar_id

# ==============================================
# 10. CONFIGURACIÓN DE MONITOREO
# ==============================================
SENTRY_DSN=your_sentry_dsn
LOGFLARE_API_KEY=your_logflare_api_key
LOGFLARE_SOURCE_TOKEN=your_logflare_source_token

# ==============================================
# 11. CONFIGURACIÓN DE SEGURIDAD
# ==============================================
JWT_SECRET=your_jwt_secret_key_here
ENCRYPTION_KEY=your_encryption_key_here
API_RATE_LIMIT=1000

# ==============================================
# 12. CONFIGURACIÓN DE DESARROLLO
# ==============================================
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Tabiji House
NEXT_PUBLIC_APP_VERSION=1.0.0

# ==============================================
# 13. CONFIGURACIÓN DE PRODUCCIÓN
# ==============================================
# NODE_ENV=production
# NEXT_PUBLIC_APP_URL=https://tabijihouse.com
# NEXT_PUBLIC_APP_NAME=Tabiji House
# NEXT_PUBLIC_APP_VERSION=1.0.0

# ==============================================
# 14. CONFIGURACIÓN DE TESTING
# ==============================================
# NODE_ENV=test
# NEXT_PUBLIC_APP_URL=http://localhost:3000
# TEST_DATABASE_URL=your_test_database_url

# ==============================================
# 15. CONFIGURACIÓN DE CACHÉ
# ==============================================
REDIS_URL=your_redis_url
REDIS_PASSWORD=your_redis_password
CACHE_TTL=3600

# ==============================================
# 16. CONFIGURACIÓN DE WEBHOOKS
# ==============================================
WEBHOOK_SECRET=your_webhook_secret
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
PAYPAL_WEBHOOK_SECRET=your_paypal_webhook_secret

# ==============================================
# 17. CONFIGURACIÓN DE NOTIFICACIONES
# ==============================================
PUSH_NOTIFICATION_KEY=your_push_notification_key
SMS_API_KEY=your_sms_api_key
SMS_API_SECRET=your_sms_api_secret

# ==============================================
# 18. CONFIGURACIÓN DE BACKUP
# ==============================================
BACKUP_S3_BUCKET=your_backup_s3_bucket
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=us-east-1

# ==============================================
# 19. CONFIGURACIÓN DE CDN
# ==============================================
CDN_URL=https://cdn.tabijihouse.com
CDN_API_KEY=your_cdn_api_key

# ==============================================
# 20. CONFIGURACIÓN DE FEATURES FLAGS
# ==============================================
FEATURE_AI_ANALYSIS=true
FEATURE_MARKET_PREDICTIONS=true
FEATURE_PROPERTY_RECOMMENDATIONS=true
FEATURE_CHATBOT=true
FEATURE_EXPORT_REPORTS=true
FEATURE_MOBILE_APP=false
FEATURE_DARK_MODE=true
FEATURE_MULTI_LANGUAGE=true

# ==============================================
# INSTRUCCIONES DE CONFIGURACIÓN
# ==============================================

# 1. Copia este archivo como .env.local
# 2. Reemplaza todos los valores "your_*_here" con tus claves reales
# 3. Configura las variables según tu entorno (desarrollo/producción)
# 4. Nunca commitees este archivo con claves reales
# 5. Usa diferentes claves para desarrollo y producción

# ==============================================
# PRIORIDADES DE CONFIGURACIÓN
# ==============================================

# CRÍTICAS (requeridas para funcionamiento básico):
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY

# IMPORTANTES (requeridas para funcionalidades avanzadas):
# - ANTHROPIC_API_KEY
# - OPENAI_API_KEY
# - GOOGLE_API_KEY
# - NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

# OPCIONALES (para funcionalidades adicionales):
# - Todas las demás variables

# ==============================================
# COSTOS ESTIMADOS MENSUALES
# ==============================================

# Supabase: $25-100
# Claude API: $50-200
# GPT-4 API: $100-300
# Gemini API: $50-150
# Google Maps: $100-300
# Total estimado: $325-1,050/mes

# ==============================================
# SEGURIDAD
# ==============================================

# - Nunca expongas claves secretas en el frontend
# - Usa variables NEXT_PUBLIC_ solo para claves públicas
# - Rota las claves regularmente
# - Usa diferentes claves para diferentes entornos
# - Monitorea el uso de las APIs
# - Implementa rate limiting
# - Usa HTTPS en producción
# - Configura CORS correctamente
# - Implementa autenticación y autorización
# - Usa logging y monitoreo
# - Implementa backup y recovery
# - Usa encriptación para datos sensibles
