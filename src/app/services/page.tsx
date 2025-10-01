'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Globe, 
  Heart,
  Zap,
  Home,
  Shield,
  Utensils,
  Palette,
  ShoppingCart,
  Shirt,
  Car,
  Bike,
  Navigation,
  Package,
  Activity,
  AlertTriangle,
  MessageCircle,
  Phone,
  User,
  GraduationCap,
  Users,
  Tent,
  Baby,
  ChefHat,
  Truck,
  Fish,
  Flower,
  Target,
  Anchor,
  Wine,
  TreePine,
  MapPin,
  Waves,
  Route,
  Sparkles,
  Dumbbell,
  Cookie,
  Map,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { gunmaServices, serviceCategories, getServicesByCategory } from '@/data/gunmaServices';

const iconMap: { [key: string]: any } = {
  Zap,
  Home,
  Shield,
  Utensils,
  Palette,
  ShoppingCart,
  Shirt,
  Car,
  Bike,
  Navigation,
  Package,
  Heart,
  Activity,
  AlertTriangle,
  MessageCircle,
  Phone,
  User,
  GraduationCap,
  Users,
  Tent,
  Baby,
  ChefHat,
  Truck,
  Fish,
  Flower,
  Target,
  Star,
  Anchor,
  Wine,
  TreePine,
  MapPin,
  Waves,
  Route,
  Sparkles,
  Dumbbell,
  Cookie,
  Map
};

export default function Services() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedServices, setExpandedServices] = useState<Set<number>>(new Set());
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      document.title = 'Services - Tabiji House | Premium Lifestyle Services in Gunma';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Discover our comprehensive lifestyle services in Gunma. From daily living support to cultural experiences, we provide everything you need for your Japanese property lifestyle.');
      }
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', 'Gunma services, lifestyle services, Japanese property services, onsen tours, cultural experiences, home care, transportation');
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Get services for selected category or all services
  const currentServices = selectedCategory 
    ? gunmaServices.filter(service => service.category === selectedCategory)
    : gunmaServices;

  // Filter by search term if provided
  const filteredServices = searchTerm
    ? currentServices.filter(service => 
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : currentServices;

  // Get category statistics
  const getCategoryStats = (category: string) => {
    const services = gunmaServices.filter(service => service.category === category);
    return {
      count: services.length,
      alwaysAvailable: services.filter(s => s.availability === 'always').length,
      seasonal: services.filter(s => s.availability === 'seasonal').length,
      byRequest: services.filter(s => s.availability === 'by_request').length
    };
  };

  const toggleServiceExpansion = (serviceId: number) => {
    const newExpanded = new Set(expandedServices);
    if (newExpanded.has(serviceId)) {
      newExpanded.delete(serviceId);
    } else {
      newExpanded.add(serviceId);
    }
    setExpandedServices(newExpanded);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'always': return 'text-green-600 bg-green-100';
      case 'seasonal': return 'text-orange-600 bg-orange-100';
      case 'by_request': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'always': return 'Always Available';
      case 'seasonal': return 'Seasonal';
      case 'by_request': return 'By Request';
      default: return availability;
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-sm text-accent font-mono tracking-wider uppercase mb-4">
              Premium Lifestyle Services
            </div>
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 leading-tight">
              Complete Support for Your
              <br />
              <span className="text-accent">Gunma Lifestyle</span>
            </h1>
            <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              From daily living support to cultural experiences, we provide everything you need 
              to fully enjoy your Japanese property investment.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" size={20} />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                activeTab === 'overview'
                  ? 'bg-primary text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              Overview
            </button>
            {serviceCategories.map((category) => {
              const stats = getCategoryStats(category);
              return (
                <button
                  key={category}
                  onClick={() => {
                    setActiveTab('category');
                    setSelectedCategory(category);
                  }}
                  className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                    activeTab === 'category' && selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {category.split(' ')[0]} ({stats.count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'overview' ? (
            <>
              {/* Overview Content */}
              <div className="text-center mb-16">
                <h2 className="text-4xl font-serif font-bold text-primary mb-4">
                  {gunmaServices.length} Premium Services
                </h2>
                <p className="text-lg text-foreground">
                  Comprehensive lifestyle support organized into {serviceCategories.length} specialized categories
                </p>
              </div>

              {/* Category Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {serviceCategories.map((category) => {
                  const stats = getCategoryStats(category);
                  const categoryIcon = category.includes('Daily') ? 'Home' :
                                     category.includes('Transportation') ? 'Car' :
                                     category.includes('Safety') ? 'Shield' :
                                     category.includes('Pets') ? 'Heart' :
                                     category.includes('Children') ? 'Users' :
                                     category.includes('Food') ? 'ChefHat' :
                                     category.includes('Cultural') ? 'Flower' :
                                     'Sparkles';
                  const IconComponent = iconMap[categoryIcon];

                  return (
                    <div
                      key={category}
                      onClick={() => {
                        setActiveTab('category');
                        setSelectedCategory(category);
                      }}
                      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    >
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                        <IconComponent size={32} className="text-primary" />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-primary mb-2 text-center">
                        {category.split(' ')[0]}
                      </h3>
                      <p className="text-sm text-secondary text-center mb-4">
                        {category}
                      </p>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent mb-1">{stats.count}</div>
                        <div className="text-sm text-secondary">Services</div>
                      </div>
                      <div className="mt-4 flex justify-center space-x-4 text-xs text-secondary">
                        <span>Always: {stats.alwaysAvailable}</span>
                        <span>Seasonal: {stats.seasonal}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              {/* Category Detail Content */}
              {selectedCategory && (
                <>
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold text-primary mb-4">
                      {selectedCategory}
                    </h2>
                    <p className="text-lg text-foreground">
                      {filteredServices.length} services in this category
                    </p>
                  </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredServices.map((service) => {
              const IconComponent = iconMap[service.icon || 'Heart'];
              const isExpanded = expandedServices.has(service.id);

              return (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <IconComponent size={24} className="text-primary" />
                        </div>
                        <div>
                          <span className="text-sm text-accent font-mono">
                            #{service.id.toString().padStart(2, '0')}
                          </span>
                          <div className="text-xs text-secondary">
                            {service.category}
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(service.availability)}`}>
                        {getAvailabilityText(service.availability)}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-primary mb-3 leading-tight">
                      {service.title}
                    </h3>

                    <p className="text-foreground leading-relaxed mb-4 line-clamp-3">
                      {service.description}
                    </p>

                    {service.priceRange && (
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-sm font-medium text-accent">Price:</span>
                        <span className="text-sm text-foreground">{service.priceRange}</span>
                      </div>
                    )}

                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-1">
                        <Globe size={16} className="text-secondary" />
                        <span className="text-sm text-secondary">
                          {service.languages.join(', ')}
                        </span>
                      </div>
                      {service.availability === 'always' && (
                        <div className="flex items-center space-x-1">
                          <Clock size={16} className="text-green-600" />
                          <span className="text-sm text-green-600">24/7</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => toggleServiceExpansion(service.id)}
                      className="w-full flex items-center justify-center space-x-2 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-200"
                    >
                      <span>{isExpanded ? 'Show Less' : 'View Details'}</span>
                      {isExpanded ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-border">
                        {service.features && service.features.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-semibold text-primary mb-2">Features:</h4>
                            <ul className="space-y-1">
                              {service.features.map((feature, index) => (
                                <li key={index} className="flex items-center space-x-2 text-sm text-foreground">
                                  <Star size={12} className="text-accent flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex space-x-3">
                          <button className="flex-1 py-2 px-4 bg-accent text-white rounded-full hover:bg-accent/90 transition-colors duration-200 text-sm font-medium">
                            Request Service
                          </button>
                          <button className="flex-1 py-2 px-4 border border-primary text-primary rounded-full hover:bg-primary/5 transition-colors duration-200 text-sm font-medium">
                            Learn More
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

                  {filteredServices.length === 0 && (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search size={32} className="text-secondary" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                        No Services Found
                      </h3>
                      <p className="text-foreground mb-8">
                        Try adjusting your search criteria or browse all available services.
                      </p>
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setActiveTab('overview');
                          setSelectedCategory(null);
                        }}
                        className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-colors duration-200"
                      >
                        View All Services
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-primary mb-6">
            Ready to Experience Premium Gunma Lifestyle?
          </h2>
          <p className="text-xl text-foreground mb-8 leading-relaxed">
            Let us help you create the perfect lifestyle experience in your Japanese property. 
            Contact us to discuss your specific needs and preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-white px-8 py-4 rounded-full hover:bg-primary/90 transition-colors duration-300 font-semibold text-lg">
              Contact Our Service Team
            </button>
            <button className="border border-primary text-primary px-8 py-4 rounded-full hover:bg-primary/5 transition-colors duration-300 font-semibold text-lg">
              View Property Portfolio
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
