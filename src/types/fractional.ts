export interface FractionalProperty {
  id: string;
  name: string;
  description: string;
  location: string;
  prefecture: string;
  totalValue: number;
  totalShares: number;
  pricePerShare: number;
  availableShares: number;
  soldShares: number;
  images: string[];
  features: string[];
  renovationStatus: 'original' | 'renovated' | 'luxury';
  estimatedROI: number;
  monthlyRentalIncome: number;
  propertyType: 'akiya' | 'modern' | 'traditional';
  yearBuilt?: number;
  landSize: number;
  buildingSize: number;
  status: 'available' | 'funding' | 'funded' | 'renovating' | 'completed';
  fundingGoal: number;
  currentFunding: number;
  fundingProgress: number;
  expectedCompletionDate?: string;
  legalStructure: 'spv' | 'trust' | 'llc';
  minimumInvestment: number;
  maximumInvestment: number;
  fees: {
    managementFee: number;
    performanceFee: number;
    exitFee: number;
  };
  documents: {
    prospectus: string;
    legalAgreement: string;
    financialProjections: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface FractionalInvestment {
  id: string;
  propertyId: string;
  investorId: string;
  sharesPurchased: number;
  totalAmount: number;
  purchaseDate: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentMethod: 'stripe' | 'bank_transfer' | 'crypto';
  transactionId?: string;
  documents: {
    investmentAgreement: string;
    shareCertificate: string;
  };
}

export interface Investor {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  phone?: string;
  dateOfBirth?: string;
  kycStatus: 'pending' | 'verified' | 'rejected';
  totalInvested: number;
  totalShares: number;
  portfolio: FractionalInvestment[];
  createdAt: string;
  updatedAt: string;
}

export interface FractionalDashboard {
  totalInvestments: number;
  totalValue: number;
  totalShares: number;
  averageROI: number;
  monthlyIncome: number;
  properties: FractionalProperty[];
  recentInvestments: FractionalInvestment[];
  performanceMetrics: {
    totalReturn: number;
    annualizedReturn: number;
    dividendYield: number;
    capitalGains: number;
  };
}

export interface InvestmentCalculation {
  sharesToPurchase: number;
  totalCost: number;
  estimatedMonthlyIncome: number;
  estimatedAnnualIncome: number;
  estimatedROI: number;
  fees: {
    managementFee: number;
    totalFees: number;
  };
  netInvestment: number;
}

export interface FractionalPayment {
  id: string;
  investmentId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  paymentMethod: string;
  stripePaymentIntentId?: string;
  createdAt: string;
  completedAt?: string;
}

export interface FractionalMetrics {
  totalProperties: number;
  totalInvestors: number;
  totalCapitalRaised: number;
  averageInvestmentSize: number;
  averageROI: number;
  fundingSuccessRate: number;
  investorRetentionRate: number;
}
