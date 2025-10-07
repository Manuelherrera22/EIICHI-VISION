import Stripe from 'stripe';

// Stripe configuration
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_...', {
  apiVersion: '2024-06-20',
});

export const stripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_...',
  secretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_...',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_...',
};

// Product types for Tabiji House
export enum TabijiProductType {
  PROPERTY_INVESTMENT = 'property_investment',
  MIGRATION_SERVICE = 'migration_service',
  LIFESTYLE_CONSULTING = 'lifestyle_consulting',
  ECV_SUBSCRIPTION = 'ecv_subscription',
}

// Product configuration
export const productConfig = {
  [TabijiProductType.PROPERTY_INVESTMENT]: {
    name: 'Property Investment Analysis',
    description: 'Comprehensive property investment analysis and recommendations',
    price: 50000, // $500 in cents
    currency: 'usd',
  },
  [TabijiProductType.MIGRATION_SERVICE]: {
    name: 'Migration Service Package',
    description: 'Complete migration support and guidance',
    price: 250000, // $2,500 in cents
    currency: 'usd',
  },
  [TabijiProductType.LIFESTYLE_CONSULTING]: {
    name: 'Lifestyle Consulting',
    description: 'Personalized lifestyle and cultural integration consulting',
    price: 150000, // $1,500 in cents
    currency: 'usd',
  },
  [TabijiProductType.ECV_SUBSCRIPTION]: {
    name: 'ECV Monthly Subscription',
    description: 'Monthly subscription to ECV services',
    price: 9900, // $99 in cents
    currency: 'usd',
  },
};
