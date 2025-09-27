'use client';

import React from 'react';
import Layout from '@/components/Layout';
import AutoModelLoader from '@/components/AutoModelLoader';
import Link from 'next/link';
import { ArrowLeft, Download, Share2, Info } from 'lucide-react';

export default function ModelViewerPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-muted to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <Link href="/" className="inline-flex items-center space-x-2 text-primary hover:text-accent transition-colors duration-200 mb-6">
              <ArrowLeft size={20} />
              <span className="font-semibold">Volver al Inicio</span>
            </Link>
            
            <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium text-primary">🏠 Modelo 3D Personalizado</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 leading-tight">
              Visualizador de Modelos 3D
            </h1>
            <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
              Explora tu casa japonesa personalizada con tecnología Three.js de última generación
            </p>
          </div>

          {/* Modelo 3D */}
          <AutoModelLoader />

          {/* Información adicional */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Download size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-primary mb-2">Descarga Directa</h3>
              <p className="text-secondary text-sm">
                Tu modelo GLB está disponible para descarga directa desde Google Drive
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Share2 size={24} className="text-accent" />
              </div>
              <h3 className="text-xl font-serif font-bold text-primary mb-2">Compartir Modelo</h3>
              <p className="text-secondary text-sm">
                Comparte tu modelo 3D con otros desarrolladores o clientes
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-border">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                <Info size={24} className="text-green-500" />
              </div>
              <h3 className="text-xl font-serif font-bold text-primary mb-2">Información Técnica</h3>
              <p className="text-secondary text-sm">
                Formato GLB optimizado para web con materiales PBR y sombras
              </p>
            </div>
          </div>

          {/* Especificaciones técnicas */}
          <div className="mt-16 bg-white p-8 rounded-2xl shadow-lg border border-border">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6 text-center">
              Especificaciones Técnicas
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-serif font-bold text-primary mb-4">🎯 Formato del Modelo</h3>
                <ul className="space-y-2 text-sm text-secondary">
                  <li>• <strong>Formato:</strong> GLB (GL Transmission Format Binary)</li>
                  <li>• <strong>Compresión:</strong> Optimizado para web</li>
                  <li>• <strong>Materiales:</strong> PBR (Physically Based Rendering)</li>
                  <li>• <strong>Texturas:</strong> Incluidas en el archivo</li>
                  <li>• <strong>Animaciones:</strong> Soporte completo</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-primary mb-4">⚡ Rendimiento</h3>
                <ul className="space-y-2 text-sm text-secondary">
                  <li>• <strong>Renderizado:</strong> WebGL 2.0</li>
                  <li>• <strong>Sombras:</strong> Soft shadows habilitadas</li>
                  <li>• <strong>Anti-aliasing:</strong> MSAA 4x</li>
                  <li>• <strong>FPS:</strong> 60fps suave</li>
                  <li>• <strong>Compatibilidad:</strong> Desktop y móvil</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
