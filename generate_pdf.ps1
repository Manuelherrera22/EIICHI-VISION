# Script para generar PDF desde Markdown
$markdownFile = "PLAN_NEGOCIOS_TABIJI_HOUSE.md"
$htmlFile = "temp_plan.html"
$pdfFile = "PLAN_NEGOCIOS_TABIJI_HOUSE_FINAL_CLEAN.pdf"

# Leer el contenido del markdown
$content = Get-Content $markdownFile -Raw -Encoding UTF8

# Convertir markdown básico a HTML
$html = @"
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
        }
        h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
        h2 { color: #34495e; border-bottom: 2px solid #ecf0f1; padding-bottom: 5px; margin-top: 30px; }
        h3 { color: #2c3e50; margin-top: 25px; }
        .header { text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; }
        .confidential { background: #e74c3c; color: white; padding: 10px; text-align: center; font-weight: bold; border-radius: 5px; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background: #3498db; color: white; }
        @media print { body { margin: 0; } }
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
    <div style="white-space: pre-line;">$content</div>
</body>
</html>
"@

# Guardar HTML temporal
$html | Out-File -FilePath $htmlFile -Encoding UTF8

# Usar Edge para convertir a PDF
$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (Test-Path $edgePath) {
    Start-Process -FilePath $edgePath -ArgumentList "--headless --disable-gpu --print-to-pdf=`"$pdfFile`" `"$htmlFile`"" -Wait
    Write-Host "PDF generado: $pdfFile"
} else {
    Write-Host "Edge no encontrado, abriendo HTML para conversión manual"
    Start-Process $htmlFile
}

# Limpiar archivo temporal
Remove-Item $htmlFile -ErrorAction SilentlyContinue
