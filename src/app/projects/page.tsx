'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Search, Filter, MapPin, Home, Calendar, ArrowRight, Eye } from 'lucide-react';

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

  const projects = [
    {
      id: 1,
      name: "El Retiro del Calígrafo",
      location: "Kusatsu, Gunma",
      price: 8500000,
      size: "120 m²",
      year: "1925",
      status: "Disponible",
      image: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
      description: "Una casa tradicional con vistas espectaculares a las montañas. Perfecta para un estudio de arte o retiro creativo.",
      renovation: "Básico: ¥2,500,000",
      bedrooms: 3,
      bathrooms: 1,
      features: ["Vista a montañas", "Jardín tradicional", "Cerca de onsen"]
    },
    {
      id: 2,
      name: "La Casa con Vistas al Onsen",
      location: "Kusatsu, Gunma",
      price: 12000000,
      size: "180 m²",
      year: "1918",
      status: "En Renovación",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Ubicada cerca de los famosos baños termales, esta propiedad ofrece acceso directo a la cultura onsen local.",
      renovation: "Premium: ¥4,200,000",
      bedrooms: 4,
      bathrooms: 2,
      features: ["Acceso a onsen", "Jardín privado", "Cerca del centro"]
    },
    {
      id: 3,
      name: "El Jardín de los Cerezos",
      location: "Kusatsu, Gunma",
      price: 6800000,
      size: "95 m²",
      year: "1932",
      status: "Disponible",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Una casa compacta rodeada de cerezos centenarios. Ideal para una segunda residencia o inversión.",
      renovation: "Básico: ¥1,800,000",
      bedrooms: 2,
      bathrooms: 1,
      features: ["Cerezos centenarios", "Jardín zen", "Tranquilidad"]
    },
    {
      id: 4,
      name: "La Residencia del Artesano",
      location: "Kusatsu, Gunma",
      price: 15500000,
      size: "220 m²",
      year: "1905",
      status: "Vendida",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Una casa histórica completamente restaurada que combina tradición japonesa con comodidades modernas.",
      renovation: "De Lujo: ¥6,500,000",
      bedrooms: 5,
      bathrooms: 3,
      features: ["Restauración completa", "Arquitectura tradicional", "Jardín paisajístico"]
    },
    {
      id: 5,
      name: "La Casa del Té",
      location: "Kusatsu, Gunma",
      price: 7200000,
      size: "110 m²",
      year: "1928",
      status: "Disponible",
      image: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
      description: "Una casa tradicional con una sala de té original. Perfecta para quienes buscan autenticidad cultural.",
      renovation: "Básico: ¥2,200,000",
      bedrooms: 3,
      bathrooms: 1,
      features: ["Sala de té original", "Arquitectura tradicional", "Jardín zen"]
    },
    {
      id: 6,
      name: "El Refugio de Montaña",
      location: "Kusatsu, Gunma",
      price: 9800000,
      size: "150 m²",
      year: "1915",
      status: "Disponible",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Ubicada en las montañas, esta casa ofrece privacidad total y vistas panorámicas espectaculares.",
      renovation: "Premium: ¥3,500,000",
      bedrooms: 4,
      bathrooms: 2,
      features: ["Vista panorámica", "Privacidad total", "Acceso a senderos"]
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    
    const matchesPrice = selectedPriceRange === 'all' || 
      (selectedPriceRange === 'low' && project.price < 8000000) ||
      (selectedPriceRange === 'medium' && project.price >= 8000000 && project.price < 12000000) ||
      (selectedPriceRange === 'high' && project.price >= 12000000);
    
    return matchesSearch && matchesStatus && matchesPrice;
  });

  const formatPrice = (price: number) => {
    return `¥${(price / 1000000).toFixed(1)}M`;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-sm text-accent font-mono tracking-wider uppercase mb-4">
              El Portafolio Visionario
            </div>
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 leading-tight">
              Proyectos
              <br />
              <span className="text-accent">Disponibles</span>
            </h1>
            <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
              Descubre propiedades únicas con historia, cada una con potencial extraordinario 
              para convertirse en tu hogar de ensueño en Japón.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
              <input
                type="text"
                placeholder="Buscar propiedades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
              >
                <option value="all">Todos los Estados</option>
                <option value="Disponible">Disponible</option>
                <option value="En Renovación">En Renovación</option>
                <option value="Vendida">Vendida</option>
              </select>

              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="px-4 py-3 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
              >
                <option value="all">Todos los Precios</option>
                <option value="low">Menos de ¥8M</option>
                <option value="medium">¥8M - ¥12M</option>
                <option value="high">Más de ¥12M</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-primary mb-2">
              {filteredProjects.length} Propiedades Encontradas
            </h2>
            <p className="text-foreground">
              Resultados filtrados según tus criterios de búsqueda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
                    style={{ backgroundImage: `url(${project.image})` }}
                  ></div>
                  
                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'Disponible' 
                      ? 'bg-green-100 text-green-800' 
                      : project.status === 'En Renovación'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status}
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-accent hover:text-white transition-colors duration-300 flex items-center space-x-2">
                      <Eye size={16} />
                      <span>Ver Detalles</span>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-serif font-bold text-primary mb-2">
                      {project.name}
                    </h3>
                    <div className="flex items-center text-secondary text-sm mb-2">
                      <MapPin size={16} className="mr-1" />
                      {project.location}
                    </div>
                  </div>

                  <p className="text-foreground text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center text-secondary">
                      <Home size={16} className="mr-2" />
                      {project.size}
                    </div>
                    <div className="flex items-center text-secondary">
                      <Calendar size={16} className="mr-2" />
                      {project.year}
                    </div>
                    <div className="flex items-center text-secondary">
                      <span className="mr-2">🛏️</span>
                      {project.bedrooms} dormitorios
                    </div>
                    <div className="flex items-center text-secondary">
                      <span className="mr-2">🚿</span>
                      {project.bathrooms} baños
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="text-xs text-secondary mb-2">Características destacadas:</div>
                    <div className="flex flex-wrap gap-1">
                      {project.features.slice(0, 2).map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-muted text-xs text-primary rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {project.features.length > 2 && (
                        <span className="px-2 py-1 bg-muted text-xs text-secondary rounded-full">
                          +{project.features.length - 2} más
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-lg font-bold text-primary">
                          {formatPrice(project.price)}
                        </div>
                        <div className="text-xs text-secondary">
                          Precio de compra
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-accent">
                          {project.renovation}
                        </div>
                        <div className="text-xs text-secondary">
                          Renovación estimada
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                No se encontraron propiedades
              </h3>
              <p className="text-foreground mb-8">
                Intenta ajustar tus filtros de búsqueda para encontrar más opciones.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedStatus('all');
                  setSelectedPriceRange('all');
                }}
                className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors duration-300 font-semibold"
              >
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-primary mb-6">
            ¿No Encuentras lo que Buscas?
          </h2>
          <p className="text-xl text-foreground mb-8 max-w-2xl mx-auto">
            Contáctanos para conocer propiedades adicionales que podrían no estar 
            listadas públicamente o para discutir proyectos personalizados.
          </p>
          <button className="bg-primary text-white px-8 py-4 rounded-full hover:bg-primary/90 transition-colors duration-300 font-semibold text-lg flex items-center space-x-2 mx-auto">
            <span>Contactar Asesor</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </Layout>
  );
}
