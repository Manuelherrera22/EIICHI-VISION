'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Square, 
  Bed, 
  Bath, 
  Car,
  ArrowLeft,
  Share,
  Heart,
  Download,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectDetailProps {
  params: Promise<{
    id: string;
  }>;
}

const ProjectDetail = async ({ params }: ProjectDetailProps) => {
  const { id: projectId } = await params;

  // Mock data - in a real app this would come from an API
  const project = {
    id: projectId,
    title: `Casa Tradicional Japonesa ${projectId}`,
    location: 'Kusatsu, Gunma',
    price: 85000,
    area: 120,
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    yearBuilt: 1985,
    status: 'Disponible',
    description: 'Una hermosa casa tradicional japonesa que combina la elegancia del diseño clásico con comodidades modernas. Ubicada en el corazón de Kusatsu, esta propiedad ofrece una oportunidad única de vivir la auténtica experiencia japonesa.',
    features: [
      'Estructura de madera tradicional',
      'Tatami en habitaciones principales',
      'Jardín zen privado',
      'Cocina moderna equipada',
      'Sistema de calefacción central',
      'Aislamiento renovado'
    ],
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542640244-a3d2c4b0a0a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    neighborhood: {
      name: 'Kusatsu Onsen',
      attractions: [
        'Termas naturales a 5 minutos',
        'Estación de tren JR a 10 minutos',
        'Supermercado a 3 minutos',
        'Hospital a 15 minutos'
      ]
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link 
                  href="/projects" 
                  className="flex items-center space-x-2 text-secondary hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Volver a Proyectos</span>
                </Link>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="p-2 border border-border rounded-full hover:bg-muted transition-colors">
                  <Heart className="w-5 h-5 text-secondary" />
                </button>
                <button className="p-2 border border-border rounded-full hover:bg-muted transition-colors">
                  <Share className="w-5 h-5 text-secondary" />
                </button>
                <button className="p-2 border border-border rounded-full hover:bg-muted transition-colors">
                  <Download className="w-5 h-5 text-secondary" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images and Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Image */}
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Image Gallery */}
              <div className="grid grid-cols-3 gap-4">
                {project.images.slice(1).map((image, index) => (
                  <div key={index} className="relative h-24 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${project.title} - Vista ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-6 border border-border">
                <h2 className="text-xl font-semibold text-primary mb-4">Descripción</h2>
                <p className="text-secondary leading-relaxed">{project.description}</p>
              </div>

              {/* Features */}
              <div className="bg-white rounded-2xl p-6 border border-border">
                <h2 className="text-xl font-semibold text-primary mb-4">Características</h2>
                <div className="grid grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-secondary text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Neighborhood */}
              <div className="bg-white rounded-2xl p-6 border border-border">
                <h2 className="text-xl font-semibold text-primary mb-4">Ubicación y Servicios</h2>
                <div className="space-y-3">
                  {project.neighborhood.attractions.map((attraction, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span className="text-secondary">{attraction}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Property Info */}
            <div className="space-y-6">
              {/* Property Info Card */}
              <div className="bg-white rounded-2xl p-6 border border-border sticky top-6">
                <div className="mb-6">
                  <h1 className="text-2xl font-serif font-bold text-primary mb-2">
                    {project.title}
                  </h1>
                  <div className="flex items-center space-x-2 text-secondary">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    ${project.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-secondary">Precio de compra</div>
                </div>

                {/* Property Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Square className="w-5 h-5 text-accent mx-auto mb-1" />
                    <div className="text-sm font-medium text-primary">{project.area}m²</div>
                    <div className="text-xs text-secondary">Área</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Calendar className="w-5 h-5 text-accent mx-auto mb-1" />
                    <div className="text-sm font-medium text-primary">{project.yearBuilt}</div>
                    <div className="text-xs text-secondary">Construida</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Bed className="w-5 h-5 text-accent mx-auto mb-1" />
                    <div className="text-sm font-medium text-primary">{project.bedrooms}</div>
                    <div className="text-xs text-secondary">Habitaciones</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Bath className="w-5 h-5 text-accent mx-auto mb-1" />
                    <div className="text-sm font-medium text-primary">{project.bathrooms}</div>
                    <div className="text-xs text-secondary">Baños</div>
                  </div>
                </div>

                {/* Status */}
                <div className="mb-6">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    project.status === 'Disponible' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">
                    Solicitar Información
                  </button>
                  <button className="w-full border border-border text-primary py-3 rounded-lg hover:bg-muted transition-colors font-medium">
                    Programar Visita
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
