const fs = require('fs');

// Leer el archivo
const content = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');

// Dividir el archivo en secciones
const lines = content.split('\n');
const result = [];
const seenKeys = new Set();
let currentLanguage = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Detectar inicio de idioma
  if (line.trim().match(/^(en|ja|ar|es):\s*\{$/)) {
    currentLanguage = line.trim().match(/^(en|ja|ar|es)/)[1];
    seenKeys.clear(); // Limpiar para cada idioma
    result.push(line);
    continue;
  }
  
  // Detectar fin de idioma
  if (line.trim() === '},' || line.trim() === '}') {
    result.push(line);
    continue;
  }
  
  // Procesar líneas de traducción
  const trimmedLine = line.trim();
  
  // Si es una línea de traducción (contiene ':')
  if (trimmedLine.includes("':") && trimmedLine.startsWith("'")) {
    const keyMatch = trimmedLine.match(/^'([^']+)':/);
    if (keyMatch) {
      const key = keyMatch[1];
      
      if (seenKeys.has(key)) {
        console.log(`Eliminando duplicado en ${currentLanguage}: ${key}`);
        continue; // Saltar esta línea duplicada
      } else {
        seenKeys.add(key);
      }
    }
  }
  
  result.push(line);
}

// Escribir el archivo corregido
fs.writeFileSync('src/contexts/LanguageContext.tsx', result.join('\n'));

console.log('✅ Duplicados eliminados de manera segura');
