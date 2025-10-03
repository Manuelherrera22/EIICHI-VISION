import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Home, Calendar, Star, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { realProperties, formatPrice } from '@/data/realProperties';

const FeaturedProjects = () => {
  const { t } = useLanguage();

  // Use real properties from Gunma
  const featuredProperties = realProperties.slice(0, 2); // Show only the first 2 properties

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Star className="w-5 h-5 text-primary" />
            <span className="text-sm text-primary font-mono tracking-wider uppercase">
              Real Properties Available
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">
            Featured Properties in Gunma
          </h2>
          <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
            Discover authentic Japanese properties in the heart of Gunma Prefecture. 
            These real estates offer unique investment opportunities with proven rental potential and cultural heritage.
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {featuredProperties.map((property, index) => (
            <div
              key={property.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                <img
                  src={property.images?.[0] || 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                  alt={property.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                
                {/* Status Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                  property.status === 'available'
                    ? 'bg-green-100 text-green-800' 
                    : property.status === 'under_negotiation'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {property.status.charAt(0).toUpperCase() + property.status.slice(1).replace('_', ' ')}
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-primary/90 text-white flex items-center space-x-1">
                  {property.category === 'renovated' ? <Zap size={12} /> : <Home size={12} />}
                  <span>{property.category.charAt(0).toUpperCase() + property.category.slice(1)}</span>
                </div>

                {/* ROI Badge */}
                {property.investment.roi && (
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white">
                    {property.investment.roi}% ROI
                  </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link
                    href={`/properties/${property.id}`}
                    className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-accent hover:text-white transition-colors duration-300 flex items-center space-x-2"
                  >
                    <span>View Details</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-serif font-bold text-primary mb-2">
                    {property.name}
                  </h3>
                  <div className="flex items-center text-secondary text-sm mb-2">
                    <MapPin size={16} className="mr-1" />
                    {property.location.area}, {property.location.village}
                  </div>
                </div>

                <p className="text-foreground text-sm leading-relaxed mb-4">
                  {property.layout} • {property.landArea}m² ({property.landAreaTsubo}坪) • Built {property.completion.year}
                </p>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center text-secondary">
                    <Home size={16} className="mr-2" />
                    {property.floorArea}m² ({property.floorAreaTsubo}坪)
                  </div>
                  <div className="flex items-center text-secondary">
                    <Calendar size={16} className="mr-2" />
                    {property.age} years old
                  </div>
                </div>

                {/* Access Info */}
                <div className="mb-4 text-xs text-secondary">
                  <div className="flex items-center mb-1">
                    <span className="mr-2">🚊</span>
                    <span>{property.access.stations[0]?.name}</span>
                  </div>
                  <div className="text-xs">
                    {property.access.stations[0]?.distance}, {property.access.stations[0]?.timeByCar}
                  </div>
                </div>

                {/* Price */}
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg font-bold text-primary">
                        {formatPrice(property.price)}
                      </div>
                      <div className="text-xs text-secondary">
                        Purchase Price
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">
                        {property.investment.roi}% ROI
                      </div>
                      <div className="text-xs text-secondary">
                        Projected Return
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-4 rounded-full hover:bg-primary/90 transition-colors duration-300 font-semibold text-lg"
          >
            <span>{t('projects.viewAllProjects')}</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
