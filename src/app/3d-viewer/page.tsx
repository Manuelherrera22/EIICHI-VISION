'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Advanced3DNavigation from '@/components/Advanced3DNavigation';
import { ArrowLeft, Share2, Download, Heart, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Viewer3DPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(0);
  const { t } = useLanguage();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Komorebi House - Casa Tradicional Japonesa',
        text: 'Explora esta increíble casa tradicional japonesa en 3D',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  const handleDownload = () => {
    // Simular descarga de información de la propiedad
    const propertyInfo = {
      nombre: 'Casa Tradicional Kusatsu',
      ubicacion: 'Kusatsu, Gunma, Japón',
      area: '120 m²',
      precio: '¥8,500,000',
      año: '1925',
      habitaciones: 4,
      pisos: 2
    };
    
    const blob = new Blob([JSON.stringify(propertyInfo, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'casa-tradicional-kusatsu.json';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-muted via-white to-muted pt-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.history.back()}
                className="flex items-center space-x-2 text-primary hover:text-accent transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Volver</span>
              </button>
              <div>
                <h1 className="text-3xl font-serif font-bold text-primary">
                  Casa Tradicional Kusatsu
                </h1>
                <p className="text-secondary">
                  {t('3dViewer.interactiveExperience')}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Rating */}
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="text-yellow-400 hover:text-yellow-500 transition-colors"
                  >
                    <Star 
                      size={20} 
                      fill={star <= rating ? 'currentColor' : 'none'} 
                    />
                  </button>
                ))}
                <span className="text-sm text-secondary ml-2">({rating}/5)</span>
              </div>

              {/* Actions */}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-lg transition-colors ${
                  isFavorite 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                }`}
                title={t('viewer3d.addToFavorites')}
              >
                <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>

              <button
                onClick={handleShare}
                className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                title={t('viewer3d.share')}
              >
                <Share2 size={20} />
              </button>

              <button
                onClick={handleDownload}
                className="p-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                title={t('viewer3d.downloadInfo')}
              >
                <Download size={20} />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-lg border border-border text-center">
              <div className="text-2xl font-bold text-primary">120</div>
              <div className="text-sm text-secondary">m²</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg border border-border text-center">
              <div className="text-2xl font-bold text-primary">4</div>
              <div className="text-sm text-secondary">Habitaciones</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg border border-border text-center">
              <div className="text-2xl font-bold text-primary">1925</div>
              <div className="text-sm text-secondary">Año</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg border border-border text-center">
              <div className="text-2xl font-bold text-primary">¥8.5M</div>
              <div className="text-sm text-secondary">Precio</div>
            </div>
          </div>
        </div>

        {/* 3D Viewer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Advanced3DNavigation />
        </div>

        {/* {t('3dViewer.additionalInfo')} */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Características */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-border">
              <h3 className="text-xl font-serif font-bold text-primary mb-4">
                Características Principales
              </h3>
              <ul className="space-y-3 text-secondary">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Arquitectura tradicional japonesa</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Jardín zen con bonsai</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Lámparas tradicionales</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Balcón del segundo piso</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Puente sobre el jardín</span>
                </li>
              </ul>
            </div>

            {/* Ubicación */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-border">
              <h3 className="text-xl font-serif font-bold text-primary mb-4">
                Ubicación Privilegiada
              </h3>
              <div className="space-y-3 text-secondary">
                <p><strong>Kusatsu, Gunma</strong></p>
                <p>Famoso por sus aguas termales naturales y arquitectura tradicional preservada.</p>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between">
                    <span>Distancia a Tokio:</span>
                    <span className="font-semibold">3 horas</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estación más cercana:</span>
                    <span className="font-semibold">5 min caminando</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Aguas termales:</span>
                    <span className="font-semibold">2 min caminando</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-border">
              <h3 className="text-xl font-serif font-bold text-primary mb-4">
                Próximos Pasos
              </h3>
              <div className="space-y-4">
                <button className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors font-semibold">
                  Agendar Visita Presencial
                </button>
                <button className="w-full bg-accent text-white py-3 px-4 rounded-lg hover:bg-accent/90 transition-colors font-semibold">
                  Consulta Virtual Gratuita
                </button>
                <button className="w-full border border-primary text-primary py-3 px-4 rounded-lg hover:bg-primary/10 transition-colors font-semibold">
                  Solicitar Información
                </button>
              </div>
              
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-secondary">
                  <strong>Nota:</strong> Esta propiedad está disponible para inversión o residencia. 
                  Contacta con nuestro equipo para más detalles sobre financiamiento y proceso de compra.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
