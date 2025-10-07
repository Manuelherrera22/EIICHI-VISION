// Tipos para el sistema de analytics de Tabiji House

export interface PropertyAnalytics {
  propertyId: string;
  title: string;
  location: string;
  metrics: {
    purchasePrice: number;
    renovationCost: {
      basic: number;
      premium: number;
      luxury: number;
    };
    marketValue: {
      current: number;
      projected: number;
      appreciationRate: number; // % anual
    };
    rentalIncome: {
      monthly: number;
      annual: number;
      occupancyRate: number; // %
    };
    expenses: {
      annual: number;
      maintenance: number;
      taxes: number;
      insurance: number;
      management: number;
    };
    roi: {
      cashOnCash: number; // %
      capRate: number; // %
      totalReturn: number; // %
      paybackPeriod: number; // años
    };
    riskFactors: {
      marketRisk: 'low' | 'medium' | 'high';
      liquidityRisk: 'low' | 'medium' | 'high';
      currencyRisk: 'low' | 'medium' | 'high';
      regulatoryRisk: 'low' | 'medium' | 'high';
    };
  };
  comparableProperties: Array<{
    id: string;
    title: string;
    price: number;
    pricePerSqm: number;
    soldDate: Date;
    distance: number; // km
  }>;
  marketTrends: {
    priceGrowth: Array<{
      period: string;
      growth: number;
    }>;
    rentalDemand: Array<{
      period: string;
      demand: number;
    }>;
    newListings: Array<{
      period: string;
      count: number;
    }>;
  };
  recommendations: Array<{
    type: 'investment' | 'renovation' | 'rental' | 'timing';
    priority: 'low' | 'medium' | 'high';
    description: string;
    impact: string;
    cost?: number;
    timeframe?: string;
  }>;
  lastUpdated: Date;
}

export interface InvestmentAnalysis {
  analysisId: string;
  propertyId: string;
  clientId: string;
  analysisDate: Date;
  scenario: 'conservative' | 'moderate' | 'aggressive';
  assumptions: {
    holdingPeriod: number; // años
    rentalIncreaseRate: number; // % anual
    expenseIncreaseRate: number; // % anual
    vacancyRate: number; // %
    managementFeeRate: number; // %
    financingRate?: number; // % si hay financiamiento
    downPayment?: number; // % del precio de compra
  };
  projections: {
    year1: InvestmentYearProjection;
    year3: InvestmentYearProjection;
    year5: InvestmentYearProjection;
    year10: InvestmentYearProjection;
  };
  summary: {
    totalInvestment: number;
    totalReturn: number;
    netPresentValue: number;
    internalRateOfReturn: number; // %
    profitIndex: number;
    breakEvenYear: number;
  };
  sensitivityAnalysis: {
    priceSensitivity: Array<{
      priceChange: number; // %
      npv: number;
      irr: number;
    }>;
    rentalSensitivity: Array<{
      rentalChange: number; // %
      npv: number;
      irr: number;
    }>;
    expenseSensitivity: Array<{
      expenseChange: number; // %
      npv: number;
      irr: number;
    }>;
  };
}

export interface InvestmentYearProjection {
  year: number;
  revenue: {
    rentalIncome: number;
    otherIncome: number;
    totalRevenue: number;
  };
  expenses: {
    operatingExpenses: number;
    managementFees: number;
    taxes: number;
    insurance: number;
    maintenance: number;
    totalExpenses: number;
  };
  cashFlow: {
    grossIncome: number;
    netOperatingIncome: number;
    debtService?: number;
    netCashFlow: number;
    cumulativeCashFlow: number;
  };
  propertyValue: {
    beginningValue: number;
    appreciation: number;
    endingValue: number;
  };
  returns: {
    cashOnCashReturn: number; // %
    totalReturn: number; // %
    capRate: number; // %
  };
}

export interface MarketAnalytics {
  region: string;
  analysisDate: Date;
  overview: {
    totalProperties: number;
    averagePrice: number;
    averagePricePerSqm: number;
    medianDaysOnMarket: number;
    priceChangeYoY: number; // %
    inventoryLevel: 'low' | 'medium' | 'high';
  };
  priceAnalysis: {
    distribution: Array<{
      priceRange: string;
      count: number;
      percentage: number;
    }>;
    trends: Array<{
      period: string;
      averagePrice: number;
      medianPrice: number;
      pricePerSqm: number;
    }>;
    seasonalPatterns: Array<{
      month: string;
      averagePrice: number;
      listingCount: number;
    }>;
  };
  demandAnalysis: {
    buyerDemographics: {
      byNationality: Record<string, number>;
      byAgeGroup: Record<string, number>;
      byBudget: Record<string, number>;
    };
    searchTrends: Array<{
      keyword: string;
      searchVolume: number;
      trend: 'up' | 'down' | 'stable';
    }>;
    inquiryPatterns: Array<{
      period: string;
      inquiries: number;
      conversions: number;
    }>;
  };
  competitiveAnalysis: {
    topPerformingAreas: Array<{
      area: string;
      averagePrice: number;
      priceGrowth: number;
      demandScore: number;
    }>;
    marketSegments: Array<{
      segment: string;
      averagePrice: number;
      marketShare: number;
      growthPotential: number;
    }>;
  };
  forecasts: {
    priceForecast: Array<{
      period: string;
      predictedPrice: number;
      confidence: number; // %
    }>;
    demandForecast: Array<{
      period: string;
      predictedDemand: number;
      confidence: number; // %
    }>;
  };
}

export interface ClientPortfolioAnalytics {
  clientId: string;
  analysisDate: Date;
  portfolio: {
    totalProperties: number;
    totalInvestment: number;
    totalValue: number;
    totalDebt?: number;
    netWorth: number;
    currency: string;
  };
  performance: {
    totalReturn: number; // %
    annualizedReturn: number; // %
    averageCapRate: number; // %
    totalCashFlow: number;
    appreciationGain: number;
  };
  diversification: {
    byLocation: Record<string, number>;
    byPropertyType: Record<string, number>;
    byInvestmentSize: Record<string, number>;
    riskScore: number; // 1-10
  };
  recommendations: Array<{
    type: 'buy' | 'sell' | 'hold' | 'renovate';
    priority: 'low' | 'medium' | 'high';
    propertyId?: string;
    description: string;
    expectedImpact: string;
    timeline: string;
  }>;
}

export interface BusinessIntelligence {
  overview: {
    totalClients: number;
    totalProperties: number;
    totalRevenue: number;
    totalCommissions: number;
    averageDealSize: number;
    conversionRate: number; // %
    clientSatisfaction: number; // 1-5
  };
  revenue: {
    monthly: Array<{
      month: string;
      revenue: number;
      commissions: number;
      expenses: number;
      netProfit: number;
    }>;
    byService: Record<string, number>;
    byClientType: Record<string, number>;
    byRegion: Record<string, number>;
  };
  operations: {
    averageDealTime: number; // días
    clientAcquisitionCost: number;
    clientLifetimeValue: number;
    referralRate: number; // %
    repeatClientRate: number; // %
  };
  marketShare: {
    totalMarketSize: number;
    ourMarketShare: number; // %
    competitorAnalysis: Array<{
      competitor: string;
      marketShare: number;
      strengths: string[];
      weaknesses: string[];
    }>;
  };
  trends: {
    clientGrowth: Array<{
      period: string;
      newClients: number;
      totalClients: number;
    }>;
    revenueGrowth: Array<{
      period: string;
      revenue: number;
      growth: number;
    }>;
    marketTrends: Array<{
      period: string;
      trend: string;
      impact: 'positive' | 'negative' | 'neutral';
    }>;
  };
}

export interface AnalyticsDashboard {
  propertyAnalytics: PropertyAnalytics[];
  marketAnalytics: MarketAnalytics;
  businessIntelligence: BusinessIntelligence;
  clientPortfolios: ClientPortfolioAnalytics[];
  lastUpdated: Date;
}

export default {
  PropertyAnalytics,
  InvestmentAnalysis,
  MarketAnalytics,
  ClientPortfolioAnalytics,
  BusinessIntelligence,
  AnalyticsDashboard,
};

