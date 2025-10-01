'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Search, Filter, MapPin, Home, Calendar, ArrowRight, Eye, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { realProperties, getAvailableProperties, formatPrice } from '@/data/realProperties';
import RealPropertyCard from '@/components/RealPropertyCard';

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [showRealProperties, setShowRealProperties] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
        document.title = 'Projects - Tabiji House | Available Properties in Japan';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Discover unique properties with history in Japan. Browse our portfolio of traditional houses, tea houses, and mountain retreats available for investment and renovation.');
      }
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', 'Japanese properties, traditional houses, investment, akiya, renovation, Kusatsu, Gunma, tea house, mountain retreat');
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      id: 1,
      name: t('projects.calliographerRetreat'),
      location: t('projects.kusatsuGunma'),
      price: 8500000,
      size: "120 m²",
      year: "1925",
      status: t('projects.available'),
      image: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
      description: t('projects.traditionalHouseMountainViews'),
      renovation: t('projects.basicRenovation') + ": ¥2,500,000",
      bedrooms: 3,
      bathrooms: 1,
      features: [t('projects.mountainViews'), t('projects.traditionalGarden'), t('projects.nearOnsen')]
    },
    {
      id: 2,
      name: t('projects.onsenViewHouse'),
      location: t('projects.kusatsuGunma'),
      price: 12000000,
      size: "180 m²",
      year: "1918",
      status: t('projects.inRenovation'),
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: t('projects.onsenCultureAccess'),
      renovation: t('projects.premiumRenovation') + ": ¥4,200,000",
      bedrooms: 4,
      bathrooms: 2,
      features: [t('projects.onsenAccess'), t('projects.privateGarden'), t('projects.nearCenter')]
    },
    {
      id: 3,
      name: t('projects.cherryGarden'),
      location: t('projects.kusatsuGunma'),
      price: 6800000,
      size: "95 m²",
      year: "1932",
      status: t('projects.available'),
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: t('projects.compactCherryHouse'),
      renovation: t('projects.basicRenovation') + ": ¥1,800,000",
      bedrooms: 2,
      bathrooms: 1,
      features: [t('projects.centuryCherries'), t('projects.zenGarden'), t('projects.tranquility')]
    },
    {
      id: 4,
      name: t('projects.artisanResidence'),
      location: t('projects.kusatsuGunma'),
      price: 15500000,
      size: "220 m²",
      year: "1905",
      status: t('projects.sold'),
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: t('projects.historicRestoredHouse'),
      renovation: t('projects.luxuryRenovation') + ": ¥6,500,000",
      bedrooms: 5,
      bathrooms: 3,
      features: [t('projects.completeRestoration'), t('projects.traditionalArchitecture'), t('projects.landscapedGarden')]
    },
    {
      id: 5,
      name: t('projects.teaHouse'),
      location: t('projects.kusatsuGunma'),
      price: 7200000,
      size: "110 m²",
      year: "1928",
      status: t('projects.available'),
      image: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
      description: t('projects.traditionalTeaHouse'),
      renovation: t('projects.basicRenovation') + ": ¥2,200,000",
      bedrooms: 3,
      bathrooms: 1,
      features: [t('projects.originalTeaRoom'), t('projects.traditionalArchitecture'), t('projects.zenGarden')]
    },
    {
      id: 6,
      name: t('projects.mountainRefuge'),
      location: t('projects.kusatsuGunma'),
      price: 9800000,
      size: "150 m²",
      year: "1915",
      status: t('projects.available'),
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: t('projects.mountainPrivacyHouse'),
      renovation: t('projects.premiumRenovation') + ": ¥3,500,000",
      bedrooms: 4,
      bathrooms: 2,
      features: [t('projects.panoramicView'), t('projects.totalPrivacy'), t('projects.trailAccess')]
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
              {t('projects.heroSubtitle')}
            </div>
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 leading-tight">
              {t('projects.heroTitle')}
              <br />
              <span className="text-accent">{t('projects.heroTitleAccent')}</span>
            </h1>
            <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
              {t('projects.heroDescription')}
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
                placeholder={t('projects.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* Property Type Toggle */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowRealProperties(true)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  showRealProperties
                    ? 'bg-primary text-white'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                <Star size={16} className="inline mr-2" />
                Real Properties ({realProperties.length})
              </button>
              <button
                onClick={() => setShowRealProperties(false)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  !showRealProperties
                    ? 'bg-primary text-white'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                <Home size={16} className="inline mr-2" />
                Concept Properties
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
              >
                <option value="all">{t('projects.allStatuses')}</option>
                <option value={t('projects.available')}>{t('projects.available')}</option>
                <option value={t('projects.inRenovation')}>{t('projects.inRenovation')}</option>
                <option value={t('projects.sold')}>{t('projects.sold')}</option>
              </select>

              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="px-4 py-3 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
              >
                <option value="all">{t('projects.allPrices')}</option>
                <option value="low">{t('projects.priceLow')}</option>
                <option value="medium">{t('projects.priceMedium')}</option>
                <option value="high">{t('projects.priceHigh')}</option>
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
              {showRealProperties ? realProperties.length : filteredProjects.length} {t('projects.propertiesFound')}
            </h2>
            <p className="text-foreground">
              {t('projects.filteredResults')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showRealProperties ? (
              // Real Properties
              realProperties.map((property) => (
                <RealPropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={(property) => {
                    // TODO: Navigate to property detail page
                    console.log('View details for:', property.name);
                  }}
                />
              ))
            ) : (
              // Concept Properties
              filteredProjects.map((project) => (
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
                    project.status === t('projects.available') 
                      ? 'bg-green-100 text-green-800' 
                      : project.status === t('projects.inRenovation')
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status}
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-accent hover:text-white transition-colors duration-300 flex items-center space-x-2">
                      <Eye size={16} />
                      <span>{t('projects.viewDetails')}</span>
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
                      {project.bedrooms} {t('projects.bedrooms')}
                    </div>
                    <div className="flex items-center text-secondary">
                      <span className="mr-2">🚿</span>
                      {project.bathrooms} {t('projects.bathrooms')}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="text-xs text-secondary mb-2">{t('projects.highlightedFeatures')}</div>
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
                          +{project.features.length - 2} {t('projects.moreFeatures')}
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
                          {t('projects.purchasePrice')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-accent">
                          {project.renovation}
                        </div>
                        <div className="text-xs text-secondary">
                          {t('projects.estimatedRenovation')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              ))
            )}
          </div>

          {((showRealProperties && realProperties.length === 0) || (!showRealProperties && filteredProjects.length === 0)) && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                {t('projects.noPropertiesFound')}
              </h3>
              <p className="text-foreground mb-8">
                {t('projects.noPropertiesDescription')}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedStatus('all');
                  setSelectedPriceRange('all');
                }}
                className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors duration-300 font-semibold"
              >
                {t('projects.clearFilters')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-primary mb-6">
            {t('projects.ctaTitle')}
          </h2>
          <p className="text-xl text-foreground mb-8 max-w-2xl mx-auto">
            {t('projects.ctaDescription')}
          </p>
          <button className="bg-primary text-white px-8 py-4 rounded-full hover:bg-primary/90 transition-colors duration-300 font-semibold text-lg flex items-center space-x-2 mx-auto">
            <span>{t('projects.contactAdvisor')}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </Layout>
  );
}
