# Generar PDF usando método directo
$markdownContent = Get-Content "PLAN_NEGOCIOS_TABIJI_HOUSE.md" -Raw -Encoding UTF8

# Crear HTML completo
$htmlContent = @"
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plan de Negocios Tabiji House - Versión Final</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
            background: white;
        }
        h1 { 
            color: #2c3e50; 
            border-bottom: 3px solid #3498db; 
            padding-bottom: 10px; 
            page-break-before: always;
        }
        h1:first-child { page-break-before: avoid; }
        h2 { 
            color: #34495e; 
            border-bottom: 2px solid #ecf0f1; 
            padding-bottom: 5px; 
            margin-top: 30px; 
        }
        h3 { 
            color: #2c3e50; 
            margin-top: 25px; 
        }
        .header { 
            text-align: center; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 30px; 
            border-radius: 10px; 
            margin-bottom: 30px; 
        }
        .confidential { 
            background: #e74c3c; 
            color: white; 
            padding: 10px; 
            text-align: center; 
            font-weight: bold; 
            border-radius: 5px; 
            margin-bottom: 20px; 
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0; 
            page-break-inside: avoid;
        }
        th, td { 
            border: 1px solid #ddd; 
            padding: 12px; 
            text-align: left; 
        }
        th { 
            background: #3498db; 
            color: white; 
        }
        ul, ol { 
            margin: 15px 0; 
            padding-left: 30px; 
        }
        li { 
            margin: 5px 0; 
        }
        strong { 
            color: #2c3e50; 
        }
        @media print {
            body { margin: 0; }
            .header { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏯 TABIJI HOUSE</h1>
        <h2>Plan de Negocios - Versión Final</h2>
        <p><strong>Arquitecto de Oportunidades para Ciudadanos Globales en Japón</strong></p>
        <p>Documento Confidencial - Propuesta de Inversión</p>
        <p>Versión 3.0 - Enero 2025</p>
    </div>
    
    <div class="confidential">
        ⚠️ CLASIFICACIÓN: CONFIDENCIAL - Solo para Inversores Acreditados
    </div>
    
    <div style="white-space: pre-line; font-family: inherit;">$markdownContent</div>
</body>
</html>
"@

# Guardar HTML
$htmlContent | Out-File -FilePath "PLAN_NEGOCIOS_TABIJI_HOUSE_FINAL_CLEAN.html" -Encoding UTF8

Write-Host "HTML generado: PLAN_NEGOCIOS_TABIJI_HOUSE_FINAL_CLEAN.html"
Write-Host "Abre el archivo HTML en tu navegador y usa Ctrl+P para guardar como PDF"
