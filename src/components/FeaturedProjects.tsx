import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Home, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturedProjects = () => {
  const { t } = useLanguage();

  const projects = [
    {
      id: 1,
      name: t('projects.calligrapherRetreat'),
      location: t('projects.location'),
      price: "¥8,500,000",
      size: "120 m²",
      year: "1925",
      status: t('projects.available'),
      image: "/project-1.jpg",
      description: t('projects.calligrapherDescription'),
      renovation: `${t('projects.basicRenovation')}: ¥2,500,000`
    },
    {
      id: 2,
      name: t('projects.onsenViewHouse'),
      location: t('projects.location'),
      price: "¥12,000,000",
      size: "180 m²",
      year: "1918",
      status: t('projects.underRenovation'),
      image: "/project-2.jpg",
      description: t('projects.onsenDescription'),
      renovation: `${t('projects.premiumRenovation')}: ¥4,200,000`
    },
    {
      id: 3,
      name: t('projects.cherryGarden'),
      location: t('projects.location'),
      price: "¥6,800,000",
      size: "95 m²",
      year: "1932",
      status: t('projects.available'),
      image: "/project-3.jpg",
      description: t('projects.cherryDescription'),
      renovation: `${t('projects.basicRenovation')}: ¥1,800,000`
    },
    {
      id: 4,
      name: t('projects.artisanResidence'),
      location: t('projects.location'),
      price: "¥15,500,000",
      size: "220 m²",
      year: "1905",
      status: t('projects.sold'),
      image: "/project-4.jpg",
      description: t('projects.artisanDescription'),
      renovation: `${t('projects.luxuryRenovation')}: ¥6,500,000`
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-sm text-accent font-mono tracking-wider uppercase mb-4">
            {t('projects.visionaryPortfolio')}
          </div>
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">
            {t('projects.featuredProjects')}
          </h2>
          <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
            {t('projects.description')}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')] bg-cover bg-center bg-no-repeat opacity-80"></div>
                
                {/* Status Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                  project.status === t('projects.available')
                    ? 'bg-green-100 text-green-800' 
                    : project.status === t('projects.underRenovation')
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link
                    href={`/projects/${project.id}`}
                    className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-accent hover:text-white transition-colors duration-300 flex items-center space-x-2"
                  >
                    <span>{t('projects.viewDetails')}</span>
                    <ArrowRight size={16} />
                  </Link>
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
                </div>

                {/* Price */}
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg font-bold text-primary">
                        {project.price}
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
