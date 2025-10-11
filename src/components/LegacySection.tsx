import React from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

const LegacySection = () => {
  const { t } = useLanguage();

  return (
    <section id="legacy-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/cal-gao-UKKDT1od3uw-unsplash.jpg"
                alt="Beautiful Japanese tradition and heritage"
                fill
                className="object-cover opacity-80"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-sm font-mono opacity-80">Japanese Heritage</div>
              </div>
            </div>
            
            {/* Floating Quote */}
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-lg border border-border max-w-xs">
              <div className="text-primary font-serif text-lg leading-relaxed">
                "{t('legacy.quote')}"
              </div>
              <div className="text-secondary text-sm mt-2 font-mono">
                {t('legacy.japaneseText')}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <div className="text-sm text-accent font-mono tracking-wider uppercase mb-4">
                {t('legacy.discoverHeritage')}
              </div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                {t('legacy.japaneseTradition')}
                <br />
                <span className="text-accent">{t('legacy.inHeartOfGunma')}</span>
              </h2>
            </div>

            <div className="space-y-6 text-foreground leading-relaxed">
              <p className="text-lg">
                {t('legacy.description1')}
              </p>
              
              <p>
                {t('legacy.description2')}
              </p>

              <div className="bg-muted p-6 rounded-xl border-l-4 border-accent">
                <div className="text-primary font-serif text-lg mb-2">
                  "{t('legacy.quote')}"
                </div>
                <div className="text-secondary text-sm font-mono">
                  {t('legacy.quoteAuthor')}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                <div className="text-sm text-secondary">{t('legacy.naturalHotSprings')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2000+</div>
                <div className="text-sm text-secondary">{t('legacy.yearsOfHistory')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">∞</div>
                <div className="text-sm text-secondary">{t('legacy.naturalBeauty')}</div>
              </div>
            </div>

            <div className="pt-4">
              <button className="text-primary hover:text-accent transition-colors duration-200 font-semibold flex items-center space-x-2">
                <span>{t('legacy.discoverMore')}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegacySection;
