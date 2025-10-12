'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Home, 
  Briefcase, 
  DollarSign, 
  Building,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { useState } from 'react';

const QASection = () => {
  const { t } = useLanguage();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const qaItems = [
    {
      icon: Home,
      title: t('qa.visaRequired.title'),
      answer: t('qa.visaRequired.answer'),
      description: t('qa.visaRequired.description'),
      details: [t('qa.visaRequired.note')]
    },
    {
      icon: Briefcase,
      title: t('qa.visaByProperty.title'),
      answer: t('qa.visaByProperty.answer'),
      description: t('qa.visaByProperty.description'),
      details: [t('qa.visaByProperty.note')]
    },
    {
      icon: DollarSign,
      title: t('qa.taxes.title'),
      answer: '',
      description: t('qa.taxes.description'),
      details: [
        t('qa.taxes.rentalIncome'),
        t('qa.taxes.capitalGains'),
        t('qa.taxes.expenses'),
        t('qa.taxes.representative')
      ]
    },
    {
      icon: Building,
      title: t('qa.taxRepresentative.title'),
      answer: '',
      description: t('qa.taxRepresentative.description'),
      details: [
        t('qa.taxRepresentative.submit'),
        t('qa.taxRepresentative.designate'),
        t('qa.taxRepresentative.procedures'),
        t('qa.taxRepresentative.partner')
      ]
    },
    {
      icon: Building,
      title: t('qa.rental.title'),
      answer: '',
      description: t('qa.rental.description'),
      details: [
        t('qa.rental.longTerm'),
        t('qa.rental.shortTerm'),
        t('qa.rental.limit'),
        t('qa.rental.localRegs')
      ]
    },
    {
      icon: Info,
      title: t('qa.ldk.title'),
      answer: '',
      description: t('qa.ldk.description'),
      details: [
        t('qa.ldk.living'),
        t('qa.ldk.dining'),
        t('qa.ldk.kitchen'),
        t('qa.ldk.example')
      ]
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <HelpCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">{t('qa.title')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            {t('qa.title')}
          </h2>
          <p className="text-lg sm:text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            {t('qa.subtitle')}
          </p>
        </div>

        {/* Q&A Items */}
        <div className="space-y-4">
          {qaItems.map((item, index) => {
            const Icon = item.icon;
            const isOpen = openItems.includes(index);
            
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between hover:bg-muted/30 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4 sm:space-x-6">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-primary mb-1">
                        {item.title}
                      </h3>
                      {item.answer && (
                        <p className={`text-base font-medium ${
                          item.answer === 'No.' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {item.answer}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-secondary" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-secondary" />
                    )}
                  </div>
                </button>

                {/* Expandable Content */}
                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-border">
                    <div className="pt-4 sm:pt-6">
                      {item.description && (
                        <p className="text-secondary mb-4 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                      
                      {item.details && (
                        <div className="bg-muted/50 rounded-xl p-4 sm:p-6">
                          <ul className="space-y-2 sm:space-y-3">
                            {item.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start">
                                <span className="text-primary mr-3 mt-1 text-sm">•</span>
                                <span className="text-secondary text-sm sm:text-base">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border shadow-sm max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-primary mb-4">
              Still have questions?
            </h3>
            <p className="text-secondary mb-6 leading-relaxed">
              Our expert team is here to help you with any questions about investing in Japanese real estate.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-primary text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-primary/90 transition-colors duration-300 font-semibold text-base sm:text-lg flex items-center space-x-2 justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>Contact Our Experts</span>
              </a>
              <a 
                href="/properties" 
                className="border-2 border-primary text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-primary hover:text-black transition-colors duration-300 font-semibold text-base sm:text-lg flex items-center space-x-2 justify-center"
              >
                <span>Browse Properties</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QASection;
