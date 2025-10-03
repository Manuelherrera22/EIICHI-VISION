const fs = require('fs');

// Leer el archivo
const content = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');

// Dividir por idiomas
const sections = content.split(/(en:|ja:|ar:|es:)/);

let fixedContent = '';
const seenKeys = new Set();

for (let i = 0; i < sections.length; i++) {
  const section = sections[i];
  
  if (section.match(/^(en|ja|ar|es):$/)) {
    fixedContent += section + '\n';
    seenKeys.clear(); // Limpiar para cada idioma
  } else if (section.trim()) {
    // Procesar las líneas de traducción
    const lines = section.split('\n');
    let processedLines = [];
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Si es una línea de traducción (contiene ':')
      if (trimmedLine.includes("':") && trimmedLine.startsWith("'")) {
        const keyMatch = trimmedLine.match(/^'([^']+)':/);
        if (keyMatch) {
          const key = keyMatch[1];
          
          if (seenKeys.has(key)) {
            console.log(`Eliminando duplicado: ${key}`);
            continue; // Saltar esta línea duplicada
          } else {
            seenKeys.add(key);
          }
        }
      }
      
      processedLines.push(line);
    }
    
    fixedContent += processedLines.join('\n');
  }
}

// Escribir el archivo corregido
fs.writeFileSync('src/contexts/LanguageContext.tsx', fixedContent);

console.log('✅ Duplicados eliminados exitosamente');
