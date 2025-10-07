import { stripe, stripeConfig, TabijiProductType, productConfig } from './stripe-config';
import Stripe from 'stripe';

export interface PaymentRequest {
  amount: number;
  currency: string;
  productType: TabijiProductType;
  customerEmail: string;
  customerName: string;
  metadata: {
    propertyId?: string;
    projectId?: string;
    clientId: string;
    serviceType: string;
    region: 'japan' | 'international';
  };
}

export interface PaymentSession {
  id: string;
  url: string;
  clientSecret?: string;
}

export class TabijiPaymentService {
  
  /**
   * Crea una sesión de pago para propiedades inmobiliarias
   */
  static async createPropertyPaymentSession(request: PaymentRequest): Promise<PaymentSession> {
    try {
      // Configurar métodos de pago según la región
      const paymentMethods = request.metadata.region === 'japan' 
        ? stripeConfig.japanPaymentMethods 
        : stripeConfig.internationalPaymentMethods;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: paymentMethods,
        line_items: [
          {
            price_data: {
              currency: request.currency.toLowerCase(),
              product_data: {
                name: productConfig[request.productType].name,
                description: productConfig[request.productType].description,
                metadata: {
                  property_id: request.metadata.propertyId || '',
                  service_type: request.metadata.serviceType,
                },
              },
              unit_amount: request.amount, // Monto en centavos
            },
            quantity: 1,
          },
        ],
        mode: productConfig[request.productType].type === 'recurring' ? 'subscription' : 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
        customer_email: request.customerEmail,
        metadata: request.metadata,
        // Configuración específica para Japón
        ...(request.metadata.region === 'japan' && {
          payment_method_options: {
            konbini: {
              product_description: 'Tabiji House Property Purchase',
            },
          },
        }),
      });

      return {
        id: session.id,
        url: session.url || '',
      };
    } catch (error) {
      console.error('Error creating payment session:', error);
      throw new Error('Failed to create payment session');
    }
  }

  /**
   * Crea un intent de pago para pagos directos (sin checkout)
   */
  static async createPaymentIntent(request: PaymentRequest): Promise<PaymentSession> {
    try {
      const intent = await stripe.paymentIntents.create({
        amount: request.amount,
        currency: request.currency.toLowerCase(),
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: request.metadata,
        description: `${productConfig[request.productType].name} - ${request.customerEmail}`,
      });

      return {
        id: intent.id,
        clientSecret: intent.client_secret || undefined,
      };
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error('Failed to create payment intent');
    }
  }

  /**
   * Crea una suscripción para ECV Membership
   */
  static async createECVSubscription(
    customerEmail: string,
    customerName: string,
    region: 'japan' | 'international'
  ): Promise<PaymentSession> {
    try {
      // Crear o buscar cliente
      const customers = await stripe.customers.list({
        email: customerEmail,
        limit: 1,
      });

      let customer;
      if (customers.data.length > 0) {
        customer = customers.data[0];
      } else {
        customer = await stripe.customers.create({
          email: customerEmail,
          name: customerName,
          metadata: {
            region,
            service_type: 'ecv_membership',
          },
        });
      }

      // Crear precio para suscripción
      const price = await stripe.prices.create({
        unit_amount: region === 'japan' ? 50000 : 500, // 500 JPY o 5 USD
        currency: region === 'japan' ? 'jpy' : 'usd',
        recurring: {
          interval: 'month',
        },
        product_data: {
          name: 'ECV Membership',
          description: 'Ecosystem of Value Creation - Monthly Membership',
        },
      });

      const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        payment_method_types: region === 'japan' 
          ? stripeConfig.japanPaymentMethods 
          : stripeConfig.internationalPaymentMethods,
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/ecv/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/ecv/cancel`,
        metadata: {
          client_id: customer.id,
          service_type: 'ecv_membership',
          region,
        },
      });

      return {
        id: session.id,
        url: session.url || '',
      };
    } catch (error) {
      console.error('Error creating ECV subscription:', error);
      throw new Error('Failed to create ECV subscription');
    }
  }

  /**
   * Verifica el estado de un pago
   */
  static async verifyPayment(sessionId: string): Promise<{
    status: 'success' | 'pending' | 'failed';
    amount: number;
    currency: string;
    metadata: any;
  }> {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      
      return {
        status: session.payment_status === 'paid' ? 'success' : 
               session.payment_status === 'unpaid' ? 'pending' : 'failed',
        amount: session.amount_total || 0,
        currency: session.currency || 'usd',
        metadata: session.metadata,
      };
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw new Error('Failed to verify payment');
    }
  }

  /**
   * Obtiene el historial de pagos de un cliente
   */
  static async getCustomerPayments(customerEmail: string): Promise<Stripe.PaymentIntent[]> {
    try {
      const payments = await stripe.paymentIntents.list({
        limit: 100,
      });

      return payments.data.filter(payment => 
        payment.metadata.customer_email === customerEmail
      );
    } catch (error) {
      console.error('Error fetching customer payments:', error);
      throw new Error('Failed to fetch customer payments');
    }
  }

  /**
   * Cancela una suscripción ECV
   */
  static async cancelECVSubscription(subscriptionId: string): Promise<boolean> {
    try {
      await stripe.subscriptions.cancel(subscriptionId);
      return true;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      return false;
    }
  }
}

export default TabijiPaymentService;

