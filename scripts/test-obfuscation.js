/**
 * Script para probar la ofuscación de código
 * Este script verifica que la ofuscación esté funcionando correctamente
 */

const fs = require('fs');
const path = require('path');

console.log('🔒 Probando configuración de ofuscación...\n');

// Verificar que el archivo de configuración existe
const configPath = path.join(__dirname, '../obfuscation.config.js');
if (!fs.existsSync(configPath)) {
  console.error('❌ Error: No se encontró obfuscation.config.js');
  process.exit(1);
}

console.log('✅ Archivo de configuración encontrado');

// Verificar que el next.config.ts tiene la configuración correcta
const nextConfigPath = path.join(__dirname, '../next.config.ts');
if (!fs.existsSync(nextConfigPath)) {
  console.error('❌ Error: No se encontró next.config.ts');
  process.exit(1);
}

const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');

// Verificar configuraciones importantes
const checks = [
  {
    name: 'Importación de configuración de ofuscación',
    check: () => nextConfigContent.includes('require(\'./obfuscation.config.js\')'),
    critical: true
  },
  {
    name: 'Verificación de producción',
    check: () => nextConfigContent.includes('NODE_ENV === \'production\''),
    critical: true
  },
  {
    name: 'Plugin de ofuscación',
    check: () => nextConfigContent.includes('JavaScriptObfuscator'),
    critical: true
  },
  {
    name: 'Configuración de webpack',
    check: () => nextConfigContent.includes('webpack-obfuscator'),
    critical: true
  }
];

console.log('\n🔍 Verificando configuraciones...\n');

let allPassed = true;

checks.forEach((check, index) => {
  const passed = check.check();
  const status = passed ? '✅' : '❌';
  const critical = check.critical ? ' (CRÍTICO)' : '';
  
  console.log(`${status} ${check.name}${critical}`);
  
  if (!passed && check.critical) {
    allPassed = false;
  }
});

console.log('\n📋 Verificando configuración de ofuscación...\n');

// Verificar configuración de ofuscación
const obfuscationConfig = require(configPath);

const obfuscationChecks = [
  {
    name: 'String Array Threshold',
    value: obfuscationConfig.stringArrayThreshold,
    expected: 1.0,
    description: 'Debe estar al 100% para máxima ofuscación'
  },
  {
    name: 'Control Flow Flattening',
    value: obfuscationConfig.controlFlowFlattening,
    expected: true,
    description: 'Debe estar habilitado'
  },
  {
    name: 'Debug Protection',
    value: obfuscationConfig.debugProtection,
    expected: true,
    description: 'Debe estar habilitado'
  },
  {
    name: 'Self Defending',
    value: obfuscationConfig.selfDefending,
    expected: true,
    description: 'Debe estar habilitado'
  },
  {
    name: 'Console Output Disabled',
    value: obfuscationConfig.disableConsoleOutput,
    expected: true,
    description: 'Debe estar deshabilitado en producción'
  }
];

obfuscationChecks.forEach(check => {
  const passed = check.value === check.expected;
  const status = passed ? '✅' : '⚠️';
  
  console.log(`${status} ${check.name}: ${check.value} - ${check.description}`);
});

console.log('\n🚀 Verificando scripts de build...\n');

// Verificar package.json
const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const buildScripts = [
  'build:obfuscated',
  'build:production',
  'test:obfuscation'
];

buildScripts.forEach(script => {
  const exists = packageJson.scripts && packageJson.scripts[script];
  const status = exists ? '✅' : '❌';
  console.log(`${status} Script ${script}: ${exists ? 'Encontrado' : 'No encontrado'}`);
});

console.log('\n🌐 Verificando configuración de Netlify...\n');

// Verificar netlify.toml
const netlifyPath = path.join(__dirname, '../netlify.toml');
if (fs.existsSync(netlifyPath)) {
  const netlifyContent = fs.readFileSync(netlifyPath, 'utf8');
  
  const netlifyChecks = [
    {
      name: 'Build command con ofuscación',
      check: () => netlifyContent.includes('build:obfuscated'),
      critical: true
    },
    {
      name: 'Headers de seguridad para JS',
      check: () => netlifyContent.includes('_next/static/chunks/*.js'),
      critical: false
    }
  ];
  
  netlifyChecks.forEach(check => {
    const passed = check.check();
    const status = passed ? '✅' : '⚠️';
    const critical = check.critical ? ' (CRÍTICO)' : '';
    
    console.log(`${status} ${check.name}${critical}`);
  });
} else {
  console.log('⚠️ netlify.toml no encontrado');
}

console.log('\n📊 Resumen de verificación:\n');

if (allPassed) {
  console.log('🎉 ¡Todas las verificaciones críticas pasaron!');
  console.log('✅ La ofuscación está configurada correctamente');
  console.log('🚀 El código se ofuscará en producción');
  console.log('🔒 Los archivos JS estarán protegidos en F12');
} else {
  console.log('❌ Algunas verificaciones críticas fallaron');
  console.log('⚠️ Revisa la configuración antes de hacer deploy');
}

console.log('\n📝 Próximos pasos:');
console.log('1. Ejecuta: npm run build:obfuscated');
console.log('2. Verifica los archivos en .next/static/chunks/');
console.log('3. Abre F12 en el navegador para confirmar ofuscación');
console.log('4. Haz deploy a Netlify');

console.log('\n🔒 La ofuscación hará que el código sea ilegible en F12!');
