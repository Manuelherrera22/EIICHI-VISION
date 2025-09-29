import React from 'react';
import { BookOpen, Calculator, Heart, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const PhilosophySection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-sm text-accent font-mono tracking-wider uppercase mb-4">
            {t('philosophy.ourPhilosophyInAction')}
          </div>
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">
            {t('philosophy.analectsAndAbacus')}
          </h2>
          <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
            <span className="font-serif text-2xl text-primary">論語と算盤</span> - 
            {t('philosophy.philosophyDescription')}
          </p>
        </div>

        {/* Philosophy Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Analectas (Ethics) */}
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen size={40} className="text-primary" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-primary mb-4">
                {t('philosophy.analects')}
              </h3>
              <div className="text-lg text-accent font-mono mb-4">
                {t('philosophy.analectsSubtitle')}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
                <div className="flex items-start space-x-4">
                  <Heart size={24} className="text-accent mt-1" />
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-primary mb-2">
                      {t('philosophy.absoluteTransparency')}
                    </h4>
                    <p className="text-foreground text-sm leading-relaxed">
                      {t('philosophy.transparencyDescription')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
                <div className="flex items-start space-x-4">
                  <BookOpen size={24} className="text-accent mt-1" />
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-primary mb-2">
                      {t('philosophy.culturalRespect')}
                    </h4>
                    <p className="text-foreground text-sm leading-relaxed">
                      {t('philosophy.culturalRespectDescription')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
                <div className="flex items-start space-x-4">
                  <Heart size={24} className="text-accent mt-1" />
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-primary mb-2">
                      {t('philosophy.communityPurpose')}
                    </h4>
                    <p className="text-foreground text-sm leading-relaxed">
                      {t('philosophy.communityPurposeDescription')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Abacus (Business) */}
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calculator size={40} className="text-accent" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-primary mb-4">
                {t('philosophy.abacus')}
              </h3>
              <div className="text-lg text-accent font-mono mb-4">
                {t('philosophy.abacusSubtitle')}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
                <div className="flex items-start space-x-4">
                  <TrendingUp size={24} className="text-accent mt-1" />
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-primary mb-2">
                      {t('philosophy.tangibleOpportunity')}
                    </h4>
                    <p className="text-foreground text-sm leading-relaxed">
                      {t('philosophy.tangibleOpportunityDescription')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
                <div className="flex items-start space-x-4">
                  <Calculator size={24} className="text-accent mt-1" />
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-primary mb-2">
                      {t('philosophy.valueTransformation')}
                    </h4>
                    <p className="text-foreground text-sm leading-relaxed">
                      {t('philosophy.valueTransformationDescription')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
                <div className="flex items-start space-x-4">
                  <TrendingUp size={24} className="text-accent mt-1" />
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-primary mb-2">
                      {t('philosophy.profitableSustainability')}
                    </h4>
                    <p className="text-foreground text-sm leading-relaxed">
                      {t('philosophy.profitableSustainabilityDescription')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white p-12 rounded-2xl shadow-lg border border-border">
          <h3 className="text-3xl font-serif font-bold text-primary mb-4">
            {t('philosophy.joinVision')}
          </h3>
          <p className="text-lg text-foreground mb-8 max-w-2xl mx-auto">
            {t('philosophy.joinVisionDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input
              type="email"
              placeholder={t('philosophy.emailPlaceholder')}
              className="px-6 py-3 border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-w-80"
            />
            <button className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-colors duration-300 font-semibold">
              {t('philosophy.subscribeNewsletter')}
            </button>
          </div>
          <p className="text-xs text-secondary mt-4">
            {t('philosophy.newsletterDescription')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
