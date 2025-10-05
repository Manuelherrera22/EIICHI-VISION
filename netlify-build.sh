#!/bin/bash

# Script de build para Netlify con configuración estable
echo "🚀 Iniciando build para Netlify..."

# Establecer variables de entorno
export NODE_ENV=production
export NEXT_PUBLIC_SUPABASE_URL=https://kbqxdsqklqdsvfrwawjj.supabase.co
export NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImticXhkc3FrbHFkc3Zmcndhd2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMTYyNTUsImV4cCI6MjA3NDY5MjI1NX0.XheHxxVayJukawFGR6iUoCh2W_03kguWU973rZT--Ao
export NEXT_PUBLIC_SUPABASE_PROJECT_ID=kbqxdsqklqdsvfrwawjj

echo "📦 Variables de entorno configuradas"

# Instalar dependencias
echo "📥 Instalando dependencias..."
npm install

# Build estándar (sin ofuscación agresiva)
echo "🔨 Ejecutando build estándar..."
npm run build

echo "✅ Build completado exitosamente!"
