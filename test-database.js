#!/usr/bin/env node

// 🧪 SCRIPT DE PRUEBA DE BASE DE DATOS SUPABASE
// Ejecutar con: node test-database.js

const https = require('https');

// Configuración de Supabase
const SUPABASE_CONFIG = {
  url: 'https://kbqxdsqklqdsvfrwawjj.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImticXhkc3FrbHFkc3Zmcndhd2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMTYyNTUsImV4cCI6MjA3NDY5MjI1NX0.XheHxxVayJukawFGR6iUoCh2W_03kguWU973rZT--Ao',
  serviceKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImticXhkc3FrbHFkc3Zmcndhd2pqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTExNjI1NSwiZXhwIjoyMDc0NjkyMjU1fQ.2GzBXC_7u4yCwTVzMl7W4bbLXkH6r-JlkZ--EkYc1Bg'
};

// Función para hacer peticiones HTTPS
function makeRequest(url, options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve({ error: 'Invalid JSON response', body, statusCode: res.statusCode });
        }
      });
    });
    
    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Test tabla user_profiles
async function testUserProfiles() {
  console.log('🧪 Probando tabla user_profiles...');
  
  try {
    const response = await makeRequest(`${SUPABASE_CONFIG.url}/rest/v1/user_profiles?select=count`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.error && response.error.code === 'PGRST116') {
      console.log('❌ Tabla user_profiles no existe');
      return false;
    } else if (response.error) {
      console.log('❌ Error en user_profiles:', response.error.message);
      return false;
    } else {
      console.log('✅ Tabla user_profiles existe');
      return true;
    }
  } catch (error) {
    console.log('❌ Error conectando a user_profiles:', error.message);
    return false;
  }
}

// Test tabla analysis_results
async function testAnalysisResults() {
  console.log('🧪 Probando tabla analysis_results...');
  
  try {
    const response = await makeRequest(`${SUPABASE_CONFIG.url}/rest/v1/analysis_results?select=count`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.error && response.error.code === 'PGRST116') {
      console.log('❌ Tabla analysis_results no existe');
      return false;
    } else if (response.error) {
      console.log('❌ Error en analysis_results:', response.error.message);
      return false;
    } else {
      console.log('✅ Tabla analysis_results existe');
      return true;
    }
  } catch (error) {
    console.log('❌ Error conectando a analysis_results:', error.message);
    return false;
  }
}

// Test tabla ai_predictions
async function testAIPredictions() {
  console.log('🧪 Probando tabla ai_predictions...');
  
  try {
    const response = await makeRequest(`${SUPABASE_CONFIG.url}/rest/v1/ai_predictions?select=count`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.error && response.error.code === 'PGRST116') {
      console.log('❌ Tabla ai_predictions no existe');
      return false;
    } else if (response.error) {
      console.log('❌ Error en ai_predictions:', response.error.message);
      return false;
    } else {
      console.log('✅ Tabla ai_predictions existe');
      return true;
    }
  } catch (error) {
    console.log('❌ Error conectando a ai_predictions:', error.message);
    return false;
  }
}

// Test tabla properties
async function testProperties() {
  console.log('🧪 Probando tabla properties...');
  
  try {
    const response = await makeRequest(`${SUPABASE_CONFIG.url}/rest/v1/properties?select=count`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.error && response.error.code === 'PGRST116') {
      console.log('❌ Tabla properties no existe');
      return false;
    } else if (response.error) {
      console.log('❌ Error en properties:', response.error.message);
      return false;
    } else {
      console.log('✅ Tabla properties existe');
      return true;
    }
  } catch (error) {
    console.log('❌ Error conectando a properties:', error.message);
    return false;
  }
}

// Test tabla market_data
async function testMarketData() {
  console.log('🧪 Probando tabla market_data...');
  
  try {
    const response = await makeRequest(`${SUPABASE_CONFIG.url}/rest/v1/market_data?select=count`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.error && response.error.code === 'PGRST116') {
      console.log('❌ Tabla market_data no existe');
      return false;
    } else if (response.error) {
      console.log('❌ Error en market_data:', response.error.message);
      return false;
    } else {
      console.log('✅ Tabla market_data existe');
      return true;
    }
  } catch (error) {
    console.log('❌ Error conectando a market_data:', error.message);
    return false;
  }
}

// Test tabla recommendations
async function testRecommendations() {
  console.log('🧪 Probando tabla recommendations...');
  
  try {
    const response = await makeRequest(`${SUPABASE_CONFIG.url}/rest/v1/recommendations?select=count`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.error && response.error.code === 'PGRST116') {
      console.log('❌ Tabla recommendations no existe');
      return false;
    } else if (response.error) {
      console.log('❌ Error en recommendations:', response.error.message);
      return false;
    } else {
      console.log('✅ Tabla recommendations existe');
      return true;
    }
  } catch (error) {
    console.log('❌ Error conectando a recommendations:', error.message);
    return false;
  }
}

// Test tabla system_config
async function testSystemConfig() {
  console.log('🧪 Probando tabla system_config...');
  
  try {
    const response = await makeRequest(`${SUPABASE_CONFIG.url}/rest/v1/system_config?select=count`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.error && response.error.code === 'PGRST116') {
      console.log('❌ Tabla system_config no existe');
      return false;
    } else if (response.error) {
      console.log('❌ Error en system_config:', response.error.message);
      return false;
    } else {
      console.log('✅ Tabla system_config existe');
      return true;
    }
  } catch (error) {
    console.log('❌ Error conectando a system_config:', error.message);
    return false;
  }
}

// Función principal
async function runDatabaseTests() {
  console.log('🚀 Iniciando pruebas de base de datos Tabiji House...\n');
  
  const results = {
    userProfiles: await testUserProfiles(),
    analysisResults: await testAnalysisResults(),
    aiPredictions: await testAIPredictions(),
    properties: await testProperties(),
    marketData: await testMarketData(),
    recommendations: await testRecommendations(),
    systemConfig: await testSystemConfig()
  };
  
  console.log('\n📊 RESUMEN DE PRUEBAS DE BASE DE DATOS:');
  console.log('========================================');
  console.log('user_profiles:', results.userProfiles ? '✅' : '❌');
  console.log('analysis_results:', results.analysisResults ? '✅' : '❌');
  console.log('ai_predictions:', results.aiPredictions ? '✅' : '❌');
  console.log('properties:', results.properties ? '✅' : '❌');
  console.log('market_data:', results.marketData ? '✅' : '❌');
  console.log('recommendations:', results.recommendations ? '✅' : '❌');
  console.log('system_config:', results.systemConfig ? '✅' : '❌');
  
  const successCount = Object.values(results).filter(Boolean).length;
  const totalCount = Object.keys(results).length;
  
  console.log(`\n🎯 RESULTADO: ${successCount}/${totalCount} tablas configuradas`);
  
  if (successCount === totalCount) {
    console.log('🎉 ¡Base de datos completamente configurada!');
    console.log('✅ Todas las tablas están listas para usar');
    console.log('✅ Sistema Tabiji House completamente funcional');
  } else if (successCount >= 3) {
    console.log('⚠️ Base de datos parcialmente configurada');
    console.log('💡 Ejecuta el script database_schema_complete.sql para completar la configuración');
  } else {
    console.log('❌ Base de datos no configurada');
    console.log('💡 Necesitas ejecutar el script database_schema_complete.sql en Supabase');
  }
  
  return results;
}

// Ejecutar si se llama directamente
if (require.main === module) {
  runDatabaseTests().catch(console.error);
}

module.exports = { runDatabaseTests, testUserProfiles, testAnalysisResults, testAIPredictions, testProperties, testMarketData, testRecommendations, testSystemConfig };
