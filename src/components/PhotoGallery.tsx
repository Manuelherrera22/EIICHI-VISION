'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, Share2, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PhotoGalleryProps {
  property: {
    id: string;
    name: string;
    images: string[];
  };
  isOpen: boolean;
  onClose: () => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ property, isOpen, onClose }) => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 text-white">
              <div>
                <h3 className="text-2xl font-bold">{t('photoGallery.title')}</h3>
                <p className="text-gray-300">
                  {currentImageIndex + 1} {t('photoGallery.of')} {property.images.length}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Image */}
            <div className="flex-1 flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative max-w-4xl max-h-full mx-4"
                >
                  <Image
                    src={property.images[currentImageIndex]}
                    alt={`${property.name} - Image ${currentImageIndex + 1}`}
                    width={1200}
                    height={800}
                    className="object-contain max-h-[70vh] rounded-lg"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="p-6 bg-black/50">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                      index === currentImageIndex
                        ? 'ring-2 ring-white scale-110'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PhotoGallery;
