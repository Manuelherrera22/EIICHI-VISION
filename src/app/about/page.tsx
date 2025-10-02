'use client';

import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { ArrowRight, Users, Target, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
        document.title = 'About - Tabiji House | Our Story and Mission';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Discover the story of Tabiji House and our mission to connect cultures through Japanese real estate heritage. A new generation continues the tradition of community revitalization.');
      }
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', 'Tabiji House, Japanese real estate, family legacy, cultural heritage, real estate investment, Japan');
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-sm text-accent font-mono tracking-wider uppercase mb-4">
              {t('about.heroSubtitle')}
            </div>
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 leading-tight">
              {t('about.heroTitle')}
              <br />
              <span className="text-accent">{t('about.heroTitleAccent')}</span>
            </h1>
            <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
              {t('about.heroDescription')}
            </p>
          </div>
        </div>
      </section>


      {/* The New Generation Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-sm text-accent font-mono tracking-wider uppercase mb-4">
              {t('about.newGenerationPart')}
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">
              {t('about.newGenerationTitle')}
            </h2>
            <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
              {t('about.newGenerationDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={40} className="text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-2">
                  {t('about.familyConnection')}
                </h3>
                <div className="text-accent font-mono text-sm">
                  {t('about.directDescendants')}
                </div>
              </div>
              <p className="text-foreground leading-relaxed mb-6">
                {t('about.familyDescription')}
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm text-foreground">{t('about.heritageValues')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm text-foreground">{t('about.communityCommitment')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm text-foreground">{t('about.longTermVision')}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target size={40} className="text-accent" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-2">
                  {t('about.sharedMission')}
                </h3>
                <div className="text-accent font-mono text-sm">
                  {t('about.commonPurpose')}
                </div>
              </div>
              <p className="text-foreground leading-relaxed mb-6">
                {t('about.missionDescription')}
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-foreground">{t('about.sustainableRevitalization')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-foreground">{t('about.globalCulturalConnection')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-foreground">{t('about.communityDevelopment')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Alliance Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-sm text-accent font-mono tracking-wider uppercase mb-4">
              {t('about.strategicAllianceSubtitle')}
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">
              {t('about.strategicAllianceTitle')}
            </h2>
            <p className="text-xl text-foreground max-w-4xl mx-auto leading-relaxed">
              {t('about.strategicAllianceDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                  {t('about.toshinoriName')}
                </h3>
                <div className="text-accent font-mono text-sm mb-6">
                  {t('about.toshinoriTitle')}
                </div>
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    {t('about.alliancePhilosophy')}
                  </p>
                  <p>
                    {t('about.leadershipVision')}
                  </p>
                  <p className="font-semibold text-primary">
                    {t('about.guaranteeMessage')}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/澁澤写真.jpg" 
                  alt={`${t('about.toshinoriName')} - ${t('about.toshinoriTitle')}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-sm text-accent font-mono tracking-wider uppercase mb-4">
              {t('about.promisePart')}
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">
              {t('about.promiseTitle')}
              <br />
              <span className="text-accent">{t('about.promiseTitleAccent')}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-primary mb-4">
                {t('about.absoluteTransparency')}
              </h3>
              <p className="text-foreground leading-relaxed">
                {t('about.transparencyDescription')}
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-serif font-bold text-primary mb-4">
                {t('about.integralSupport')}
              </h3>
              <p className="text-foreground leading-relaxed">
                {t('about.supportDescription')}
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-primary mb-4">
                {t('about.ethicalService')}
              </h3>
              <p className="text-foreground leading-relaxed">
                {t('about.ethicalDescription')}
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center bg-muted p-12 rounded-2xl">
            <h3 className="text-3xl font-serif font-bold text-primary mb-4">
              {t('about.ctaTitle')}
            </h3>
            <p className="text-lg text-foreground mb-8 max-w-2xl mx-auto">
              {t('about.ctaDescription')}
            </p>
            <button className="bg-primary text-white px-8 py-4 rounded-full hover:bg-primary/90 transition-colors duration-300 font-semibold text-lg flex items-center space-x-2 mx-auto">
              <span>{t('about.ctaButton')}</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
