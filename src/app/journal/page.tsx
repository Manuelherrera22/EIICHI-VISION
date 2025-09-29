'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Calendar, User, ArrowRight, Tag, Search, Filter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Journal() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useLanguage();

  // Actualizar el título y metadatos de la página
  useEffect(() => {
    // Usar un pequeño delay para asegurar que se ejecute después de DynamicMetadata
    const timer = setTimeout(() => {
      // Actualizar título
        document.title = 'Journal - Tabiji House | Historias y Conocimiento de Japón';
      
      // Actualizar meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Descubre historias fascinantes sobre cultura japonesa, artesanía tradicional, arquitectura y vida en Gunma. Artículos sobre inversión inmobiliaria y renovación de propiedades.');
      }
      
      // Actualizar meta keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', 'journal, cultura japonesa, arquitectura tradicional, artesanía, Gunma, Kusatsu, inversión inmobiliaria, propiedades japonesas');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 'all', name: 'Todos', count: 24 },
    { id: 'legacy', name: 'Legado', count: 6 },
    { id: 'craftsmanship', name: 'Artesanía', count: 8 },
    { id: 'lifestyle', name: 'Vida', count: 10 }
  ];

  const articles = [
    {
      id: 1,
      title: t('journal.philosophyGapponshugi'),
      excerpt: t('journal.philosophyExcerpt'),
      category: "legacy",
      author: t('journal.philosophyAuthor'),
      date: "2024-01-15",
      readTime: "8 min",
      image: "/article-1.jpg",
      featured: true
    },
    {
      id: 2,
      title: t('journal.artisansGunma'),
      excerpt: t('journal.artisansExcerpt'),
      category: "craftsmanship",
      author: t('journal.artisansAuthor'),
      date: "2024-01-12",
      readTime: "6 min",
      image: "/article-2.jpg",
      featured: false
    },
    {
      id: 3,
      title: t('journal.livingKusatsu'),
      excerpt: t('journal.livingExcerpt'),
      category: "lifestyle",
      author: t('journal.livingAuthor'),
      date: "2024-01-10",
      readTime: "12 min",
      image: "/article-3.jpg",
      featured: false
    },
    {
      id: 4,
      title: t('journal.japaneseDesign'),
      excerpt: t('journal.japaneseDesignExcerpt'),
      category: "craftsmanship",
      author: t('journal.japaneseDesignAuthor'),
      date: "2024-01-08",
      readTime: "10 min",
      image: "/article-4.jpg",
      featured: false
    },
    {
      id: 5,
      title: t('journal.rongoSoroban'),
      excerpt: t('journal.rongoSorobanExcerpt'),
      category: "legacy",
      author: t('journal.rongoSorobanAuthor'),
      date: "2024-01-05",
      readTime: "9 min",
      image: "/article-5.jpg",
      featured: false
    },
    {
      id: 6,
      title: t('journal.fourSeasons'),
      excerpt: t('journal.fourSeasonsExcerpt'),
      category: "lifestyle",
      author: t('journal.fourSeasonsAuthor'),
      date: "2024-01-03",
      readTime: "7 min",
      image: "/article-6.jpg",
      featured: false
    },
    {
      id: 7,
      title: t('journal.traditionalConstruction'),
      excerpt: t('journal.traditionalConstructionExcerpt'),
      category: "craftsmanship",
      author: t('journal.traditionalConstructionAuthor'),
      date: "2024-01-01",
      readTime: "11 min",
      image: "/article-7.jpg",
      featured: false
    },
    {
      id: 8,
      title: t('journal.culturalIntegration'),
      excerpt: t('journal.culturalIntegrationExcerpt'),
      category: "lifestyle",
      author: t('journal.culturalIntegrationAuthor'),
      date: "2023-12-28",
      readTime: "8 min",
      image: "/article-8.jpg",
      featured: false
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'legacy': return 'bg-primary/10 text-primary';
      case 'craftsmanship': return 'bg-accent/10 text-accent';
      case 'lifestyle': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'legacy': return 'Legado';
      case 'craftsmanship': return 'Artesanía';
      case 'lifestyle': return 'Vida';
      default: return 'General';
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-sm text-accent font-mono tracking-wider uppercase mb-4">
              Historias y Conocimiento
            </div>
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 leading-tight">
              Journal
            </h1>
            <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
              Contenidos que aportan valor y refuerzan la marca: legado, artesanía, 
              vida y cultura japonesa.
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
                placeholder={t('journal.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-muted text-foreground hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && selectedCategory === 'all' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <div className="text-sm text-accent font-mono tracking-wider uppercase mb-2">
                Artículo Destacado
              </div>
              <h2 className="text-3xl font-serif font-bold text-primary">
                En Portada
              </h2>
            </div>

            <div className="bg-muted rounded-2xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-96">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-no-repeat opacity-80"></div>
                </div>
                
                <div className="p-8 lg:p-12">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(featuredArticle.category)}`}>
                      {getCategoryName(featuredArticle.category)}
                    </span>
                    <span className="text-sm text-secondary">Artículo destacado</span>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-serif font-bold text-primary mb-4 leading-tight">
                    {featuredArticle.title}
                  </h3>
                  
                  <p className="text-foreground mb-6 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-secondary">
                      <div className="flex items-center space-x-2">
                        <User size={16} />
                        <span>{featuredArticle.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>{formatDate(featuredArticle.date)}</span>
                      </div>
                      <span>{featuredArticle.readTime}</span>
                    </div>
                    
                    <button className="flex items-center space-x-2 text-primary hover:text-accent transition-colors duration-200 font-semibold">
                      <span>Leer más</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-primary mb-2">
              {filteredArticles.length} Artículos Encontrados
            </h2>
            <p className="text-foreground">
              {selectedCategory === 'all' ? 'Todos los artículos' : `Categoría: ${categories.find(c => c.id === selectedCategory)?.name}`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article) => (
              <article
                key={article.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')] bg-cover bg-center bg-no-repeat opacity-80"></div>
                  
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(article.category)}`}>
                      {getCategoryName(article.category)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-primary mb-3 leading-tight group-hover:text-accent transition-colors duration-200">
                    {article.title}
                  </h3>
                  
                  <p className="text-foreground text-sm leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-secondary">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User size={14} />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{formatDate(article.date)}</span>
                      </div>
                    </div>
                    <span>{article.readTime}</span>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <button className="flex items-center space-x-2 text-primary hover:text-accent transition-colors duration-200 font-semibold text-sm">
                      <span>Leer artículo</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                No se encontraron artículos
              </h3>
              <p className="text-foreground mb-8">
                Intenta ajustar tus filtros de búsqueda para encontrar más contenido.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors duration-300 font-semibold"
              >
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-primary mb-6">
            Mantente Actualizado
          </h2>
          <p className="text-xl text-foreground mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestro boletín para recibir los últimos artículos sobre 
            cultura japonesa, artesanía y vida en Gunma directamente en tu correo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('journal.emailPlaceholder')}
              className="flex-1 px-6 py-3 border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <button className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-colors duration-300 font-semibold">
              Suscribirse
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
