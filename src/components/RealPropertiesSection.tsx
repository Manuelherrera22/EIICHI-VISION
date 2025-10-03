'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import PropertyAnalysis from './PropertyAnalysis';
import PhotoGallery from './PhotoGallery';
import { useLanguage } from '@/contexts/LanguageContext';

const RealPropertiesSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const properties = [
    {
      id: 'property-a',
      name: t('featuredProperties.propertyA.name'),
      price: 15000000,
      location: t('featuredProperties.location'),
      area: 74.14,
      landArea: 471,
      age: 36,
      layout: '2LDK',
      images: [
        '/property-a/33239_1.jpg',
        '/property-a/33239_2.gif',
        '/property-a/33239_3.jpg',
        '/property-a/33239_4.jpg',
        '/property-a/33239_5.jpg',
        '/property-a/33239_6.jpg',
        '/property-a/33239_7.jpg',
        '/property-a/33239_8.jpg',
        '/property-a/33239_9.jpg',
        '/property-a/33239_10.jpg'
      ],
      features: [
        t('property.features.traditionalArchitecture'),
        t('property.features.mountainViews'),
        t('property.features.privateGarden'),
        t('property.features.renovated') + ' 2025',
        t('property.features.tennisCourtsAccess')
      ],
      access: [
        '▶ Shinano Railway "Naka-Karuizawa Station" - 23km, 36min ' + t('property.access.byCar'),
        '▶ JR Agatsuma Line "Omae Station" - 8km, 15min ' + t('property.access.byCar')
      ]
    },
    {
      id: 'property-b',
      name: t('featuredProperties.propertyB.name'),
      price: 10000000,
      location: t('featuredProperties.location'),
      area: 55.48,
      landArea: 307,
      age: 36,
      layout: '2LDK',
      images: [
        '/property-b/33250_1.jpg',
        '/property-b/33250_2.gif',
        '/property-b/33250_3.jpg',
        '/property-b/33250_4.jpg',
        '/property-b/33250_5.jpg',
        '/property-b/33250_6.jpg',
        '/property-b/33250_7.jpg',
        '/property-b/33250_9.jpg',
        '/property-b/33250_10.jpg'
      ],
      features: [
        t('property.features.modernDesign'),
        t('property.features.mountainViews'),
        t('property.features.largeWindows'),
        t('property.features.energyEfficient'),
        t('property.features.villaDistrict')
      ],
      access: [
        '▶ Shinano Railway "Naka-Karuizawa Station" - 20km, 50min ' + t('property.access.byCar')
      ]
    }
  ];

  const handleAnalysisClick = (propertyId: string) => {
    setSelectedProperty(propertyId);
    setAnalysisOpen(true);
  };

  const handleGalleryClick = (propertyId: string) => {
    setSelectedProperty(propertyId);
    setGalleryOpen(true);
  };

  const selectedPropertyData = properties.find(p => p.id === selectedProperty);

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t('featuredProperties.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('featuredProperties.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {properties.map((property) => (
              <div key={property.id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                {/* Image with Gallery Button */}
                <div className="relative h-80 overflow-hidden group">
                  <Image
                    src={property.images[0]}
                    alt={property.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {t('featuredProperties.aiAnalyzed')}
                    </div>
                  </div>
                  
                  {/* Gallery Button */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => handleGalleryClick(property.id)}
                      className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-white transition-colors flex items-center gap-2"
                    >
                      <span>{t('featuredProperties.viewAllPhotos')} ({property.images.length})</span>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {property.name}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-3">
                        <span>📍 {property.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-700">
                        ¥{(property.price / 1000000).toFixed(0)}M
                      </div>
                      <div className="text-sm text-gray-500">
                        {property.area}m²
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
                    <div>
                      <span className="font-semibold">{t('featuredProperties.layout')}:</span> {property.layout}
                    </div>
                    <div>
                      <span className="font-semibold">{t('featuredProperties.landArea')}:</span> {property.landArea}m²
                    </div>
                    <div>
                      <span className="font-semibold">{t('featuredProperties.floorArea')}:</span> {property.area}m²
                    </div>
                    <div>
                      <span className="font-semibold">{t('featuredProperties.age')}:</span> {property.age} {t('featuredProperties.years')}
                    </div>
                    <div>
                      <span className="font-semibold">{t('featuredProperties.built')}:</span> {t('property.builtDate')}
                    </div>
                    <div>
                      <span className="font-semibold">{t('featuredProperties.parking')}:</span> {property.id === 'property-a' ? '1' : '2'} {property.id === 'property-b' ? t('featuredProperties.vehicles') : t('featuredProperties.vehicle')}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">{t('featuredProperties.access')}</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      {property.access.map((access, index) => (
                        <div key={index}>{access}</div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">{t('featuredProperties.keyFeatures')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {property.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAnalysisClick(property.id)}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <span>{t('featuredProperties.viewAIAnalysis')}</span>
                    </button>
                    <button
                      onClick={() => handleGalleryClick(property.id)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-colors flex items-center gap-2"
                    >
                      <span>{t('featuredProperties.photos')}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Analysis Modal */}
      {selectedPropertyData && (
        <PropertyAnalysis
          property={selectedPropertyData}
          isOpen={analysisOpen}
          onClose={() => setAnalysisOpen(false)}
        />
      )}

      {/* Photo Gallery Modal */}
      {selectedPropertyData && (
        <PhotoGallery
          property={selectedPropertyData}
          isOpen={galleryOpen}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </>
  );
};

export default RealPropertiesSection;