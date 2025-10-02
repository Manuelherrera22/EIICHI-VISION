'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { category } = await params;

  const categoryData = {
    design: {
      title: 'Diseño y Arquitectura',
      description: 'Explora el arte del diseño japonés tradicional y moderno, desde la arquitectura de casas akiya hasta las últimas tendencias en renovación.',
      color: 'from-blue-500 to-indigo-600'
    },
    culture: {
      title: 'Cultura Japonesa',
      description: 'Sumérgete en la rica cultura japonesa, tradiciones, festivales y el estilo de vida que hace único vivir en Japón.',
      color: 'from-red-500 to-pink-600'
    },
    lifestyle: {
      title: 'Estilo de Vida',
      description: 'Descubre cómo es vivir en Japón, consejos prácticos, experiencias de expatriados y guías para adaptarse al estilo de vida japonés.',
      color: 'from-green-500 to-emerald-600'
    }
  };

  const currentCategory = categoryData[category as keyof typeof categoryData] || categoryData.design;

  // Mock articles data
  const articles = [
    {
      id: 1,
      title: category === 'design' ? 'Renovando una Casa Akiya: Guía Completa' : 
             category === 'culture' ? 'Festivales Tradicionales de Gunma' : 
             'Cómo Adaptarse a la Vida Rural en Japón',
      excerpt: category === 'design' ? 'Descubre los secretos para transformar una casa abandonada en un hogar moderno manteniendo la esencia tradicional japonesa.' :
               category === 'culture' ? 'Explora las celebraciones más importantes de la prefectura de Gunma y su significado cultural.' :
               'Consejos prácticos para expatriados que deciden vivir en el campo japonés.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Equipo Komorebi House',
      date: '2024-03-15',
      readTime: '8 min',
      featured: true
    },
    {
      id: 2,
      title: category === 'design' ? 'Materiales Tradicionales vs Modernos' :
             category === 'culture' ? 'El Arte del Wabi-Sabi en la Vida Cotidiana' :
             'Gestión de Residuos en Comunidades Rurales',
      excerpt: category === 'design' ? 'Comparativa detallada entre materiales tradicionales japoneses y alternativas modernas para renovación.' :
               category === 'culture' ? 'Cómo aplicar los principios del wabi-sabi en tu hogar y estilo de vida.' :
               'Sistema de reciclaje y gestión de residuos en las comunidades rurales japonesas.',
      image: 'https://images.unsplash.com/photo-1542640244-a3d2c4b0a0a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'María Tanaka',
      date: '2024-03-10',
      readTime: '6 min',
      featured: false
    },
    {
      id: 3,
      title: category === 'design' ? 'Jardines Zen: Principios de Diseño' :
             category === 'culture' ? 'Ceremonias del Té en Casa' :
             'Transporte Público en Áreas Rurales',
      excerpt: category === 'design' ? 'Aprende los principios fundamentales para crear un jardín zen auténtico en tu propiedad.' :
               category === 'culture' ? 'Guía para realizar ceremonias del té tradicionales en tu hogar.' :
               'Cómo moverse eficientemente por las zonas rurales de Japón usando transporte público.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Yuki Sato',
      date: '2024-03-05',
      readTime: '5 min',
      featured: false
    },
    {
      id: 4,
      title: category === 'design' ? 'Iluminación Natural en Arquitectura Japonesa' :
             category === 'culture' ? 'Gastronomía Local de Gunma' :
             'Conectividad Internet en Zonas Rurales',
      excerpt: category === 'design' ? 'Cómo maximizar la iluminación natural respetando la arquitectura tradicional japonesa.' :
               category === 'culture' ? 'Descubre los platos típicos y restaurantes locales de la prefectura de Gunma.' :
               'Opciones de internet y telecomunicaciones para trabajar remotamente desde el campo.',
      image: 'https://images.unsplash.com/photo-1542640244-a3d2c4b0a0a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Takashi Yamamoto',
      date: '2024-02-28',
      readTime: '7 min',
      featured: false
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center space-x-4 mb-4">
              <Link 
                href="/journal" 
                className="flex items-center space-x-2 text-secondary hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Volver al Journal</span>
              </Link>
            </div>
            
            <div className={`bg-gradient-to-r ${currentCategory.color} rounded-2xl p-8 text-white`}>
              <h1 className="text-3xl font-serif font-bold mb-4">
                {currentCategory.title}
              </h1>
              <p className="text-white/90 text-lg leading-relaxed">
                {currentCategory.description}
              </p>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                  {article.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                        Destacado
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-secondary mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(article.date).toLocaleDateString('es-ES')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <span>{article.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-primary mb-3 line-clamp-2">
                    {article.title}
                  </h2>
                  
                  <p className="text-secondary mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <Link
                    href={`/journal/article/${article.id}`}
                    className="inline-flex items-center text-accent hover:text-accent/80 transition-colors font-medium"
                  >
                    Leer más
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Categories Navigation */}
        <div className="bg-muted">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h3 className="text-xl font-semibold text-primary mb-6">Explorar Otras Categorías</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(categoryData).map(([key, data]) => (
                <Link
                  key={key}
                  href={`/journal/category/${key}`}
                  className={`bg-gradient-to-r ${data.color} rounded-xl p-6 text-white hover:scale-105 transition-transform ${
                    key === category ? 'ring-2 ring-accent' : ''
                  }`}
                >
                  <h4 className="font-semibold mb-2">{data.title}</h4>
                  <p className="text-white/90 text-sm">{data.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
