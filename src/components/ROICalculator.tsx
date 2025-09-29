'use client';

import React, { useState } from 'react';
import { Calculator, TrendingUp, Home, DollarSign } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ROICalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState(8500000);
  const [renovationCost, setRenovationCost] = useState(2500000);
  const [rentalIncome, setRentalIncome] = useState(150000);
  const [appreciationRate, setAppreciationRate] = useState(3);
  const [years, setYears] = useState(5);
  const { t } = useLanguage();

  const totalInvestment = purchasePrice + renovationCost;
  const annualRentalYield = (rentalIncome * 12) / totalInvestment * 100;
  const totalRentalIncome = rentalIncome * 12 * years;
  const propertyValue = totalInvestment * Math.pow(1 + appreciationRate / 100, years);
  const totalReturn = totalRentalIncome + (propertyValue - totalInvestment);
  const roiPercentage = (totalReturn / totalInvestment) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-border p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <Calculator size={24} className="text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-serif font-bold text-primary">{t('roi.title')}</h3>
          <p className="text-secondary">{t('roi.subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              {t('roi.purchasePrice')}
            </label>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(Number(e.target.value))}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              {t('roi.renovationCost')}
            </label>
            <input
              type="number"
              value={renovationCost}
              onChange={(e) => setRenovationCost(Number(e.target.value))}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              {t('roi.monthlyRentalIncome')}
            </label>
            <input
              type="number"
              value={rentalIncome}
              onChange={(e) => setRentalIncome(Number(e.target.value))}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              {t('roi.annualAppreciationRate')}
            </label>
            <input
              type="number"
              value={appreciationRate}
              onChange={(e) => setAppreciationRate(Number(e.target.value))}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              {t('roi.investmentPeriod')}
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="bg-muted p-6 rounded-xl">
            <h4 className="text-lg font-serif font-bold text-primary mb-4">{t('roi.analysisResults')}</h4>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-secondary">{t('roi.totalInvestment')}</span>
                <span className="font-semibold text-primary">¥{(totalInvestment / 1000000).toFixed(1)}M</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-secondary">{t('roi.annualYield')}</span>
                <span className="font-semibold text-green-600">{annualRentalYield.toFixed(1)}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-secondary">{t('roi.rentalIncome')} ({years} años):</span>
                <span className="font-semibold text-primary">¥{(totalRentalIncome / 1000000).toFixed(1)}M</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-secondary">{t('roi.propertyValue')} ({years} años):</span>
                <span className="font-semibold text-primary">¥{(propertyValue / 1000000).toFixed(1)}M</span>
              </div>
              
              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-primary">{t('roi.totalROI')}</span>
                  <span className="text-2xl font-bold text-accent">{roiPercentage.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Chart */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 rounded-xl">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp size={20} className="text-primary" />
              <span className="font-semibold text-primary">{t('roi.valueProjection')}</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t('roi.initialInvestment')}</span>
                <span>¥{(totalInvestment / 1000000).toFixed(1)}M</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>{t('roi.projectedValue')}</span>
                <span>¥{(propertyValue / 1000000).toFixed(1)}M</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: `${Math.min(100, (propertyValue / totalInvestment) * 100)}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
