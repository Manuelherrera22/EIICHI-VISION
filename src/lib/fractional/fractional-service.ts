/**
 * Servicio para Propiedades Fraccionadas
 * Conecta con Supabase para datos reales
 */

import { supabase } from '@/lib/supabase';
import { FractionalProperty, FractionalInvestment, FractionalDashboard, FractionalMetrics } from '@/types/fractional';

export class FractionalService {
  // ============================================
  // OBTENER PROPIEDADES FRACCIONADAS
  // ============================================
  
  /**
   * Obtener todas las propiedades fraccionadas disponibles
   */
  static async getProperties(status?: 'available' | 'funding' | 'funded' | 'renovating' | 'completed'): Promise<FractionalProperty[]> {
    try {
      let query = supabase
        .from('fractional_properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching fractional properties:', error);
        throw new Error('Failed to fetch fractional properties');
      }

      if (!data || data.length === 0) {
        return [];
      }

      // Mapear datos de BD a FractionalProperty
      return data.map(prop => this.mapToFractionalProperty(prop));
    } catch (error) {
      console.error('Error in getProperties:', error);
      throw error;
    }
  }

  /**
   * Obtener una propiedad fraccionada por ID
   */
  static async getPropertyById(id: string): Promise<FractionalProperty | null> {
    try {
      const { data, error } = await supabase
        .from('fractional_properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching fractional property:', error);
        return null;
      }

      if (!data) {
        return null;
      }

      return this.mapToFractionalProperty(data);
    } catch (error) {
      console.error('Error in getPropertyById:', error);
      return null;
    }
  }

  // ============================================
  // INVERSIONES
  // ============================================

  /**
   * Crear una nueva inversión fraccionada
   */
  static async createInvestment(
    propertyId: string,
    investorId: string,
    sharesPurchased: number,
    totalAmount: number,
    paymentMethod: 'stripe' | 'bank_transfer' | 'crypto'
  ): Promise<FractionalInvestment> {
    try {
      const { data, error } = await supabase
        .from('fractional_investments')
        .insert({
          property_id: propertyId,
          investor_id: investorId,
          shares_purchased: sharesPurchased,
          total_amount: totalAmount,
          payment_method: paymentMethod,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating investment:', error);
        throw new Error('Failed to create investment');
      }

      return this.mapToFractionalInvestment(data);
    } catch (error) {
      console.error('Error in createInvestment:', error);
      throw error;
    }
  }

  /**
   * Confirmar una inversión (después del pago exitoso)
   */
  static async confirmInvestment(investmentId: string, transactionId?: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('fractional_investments')
        .update({
          status: 'completed',
          transaction_id: transactionId,
          updated_at: new Date().toISOString()
        })
        .eq('id', investmentId);

      if (error) {
        console.error('Error confirming investment:', error);
        throw new Error('Failed to confirm investment');
      }
    } catch (error) {
      console.error('Error in confirmInvestment:', error);
      throw error;
    }
  }

  /**
   * Obtener inversiones de un inversor
   */
  static async getInvestorInvestments(investorId: string): Promise<FractionalInvestment[]> {
    try {
      const { data, error } = await supabase
        .from('fractional_investments')
        .select('*')
        .eq('investor_id', investorId)
        .eq('status', 'completed')
        .order('purchase_date', { ascending: false });

      if (error) {
        console.error('Error fetching investor investments:', error);
        return [];
      }

      return data.map(inv => this.mapToFractionalInvestment(inv));
    } catch (error) {
      console.error('Error in getInvestorInvestments:', error);
      return [];
    }
  }

  // ============================================
  // DASHBOARD
  // ============================================

  /**
   * Obtener dashboard completo para un inversor
   */
  static async getInvestorDashboard(investorId: string): Promise<FractionalDashboard> {
    try {
      // Obtener inversiones del inversor
      const investments = await this.getInvestorInvestments(investorId);

      // Obtener todas las propiedades en las que ha invertido
      const propertyIds = [...new Set(investments.map(inv => inv.propertyId))];
      const properties: FractionalProperty[] = [];

      for (const propertyId of propertyIds) {
        const property = await this.getPropertyById(propertyId);
        if (property) {
          properties.push(property);
        }
      }

      // Calcular métricas
      const totalInvestments = investments.length;
      const totalValue = investments.reduce((sum, inv) => sum + inv.totalAmount, 0);
      const totalShares = investments.reduce((sum, inv) => sum + inv.sharesPurchased, 0);
      
      // Calcular ROI promedio ponderado
      let totalROI = 0;
      let totalWeight = 0;
      for (const property of properties) {
        const propertyInvestments = investments.filter(inv => inv.propertyId === property.id);
        const propertyWeight = propertyInvestments.reduce((sum, inv) => sum + inv.totalAmount, 0);
        totalROI += property.estimatedROI * propertyWeight;
        totalWeight += propertyWeight;
      }
      const averageROI = totalWeight > 0 ? totalROI / totalWeight : 0;

      // Calcular ingresos mensuales
      let monthlyIncome = 0;
      for (const property of properties) {
        const propertyInvestments = investments.filter(inv => inv.propertyId === property.id);
        const totalPropertyShares = propertyInvestments.reduce((sum, inv) => sum + inv.sharesPurchased, 0);
        const sharePercentage = totalPropertyShares / property.totalShares;
        monthlyIncome += property.monthlyRentalIncome * sharePercentage;
      }

      // Calcular métricas de rendimiento
      const totalReturn = averageROI * 1.2; // Estimación
      const annualizedReturn = averageROI;
      const dividendYield = (monthlyIncome * 12) / totalValue * 100;
      const capitalGains = totalReturn - dividendYield;

      return {
        totalInvestments,
        totalValue,
        totalShares,
        averageROI,
        monthlyIncome,
        properties,
        recentInvestments: investments.slice(0, 5),
        performanceMetrics: {
          totalReturn,
          annualizedReturn,
          dividendYield,
          capitalGains
        }
      };
    } catch (error) {
      console.error('Error in getInvestorDashboard:', error);
      throw error;
    }
  }

  // ============================================
  // MÉTRICAS DE PLATAFORMA
  // ============================================

  /**
   * Obtener métricas generales de la plataforma
   */
  static async getPlatformMetrics(): Promise<FractionalMetrics> {
    try {
      // Obtener todas las propiedades
      const properties = await this.getProperties();
      
      // Obtener todas las inversiones completadas
      const { data: investmentsData, error: investmentsError } = await supabase
        .from('fractional_investments')
        .select('*')
        .eq('status', 'completed');

      if (investmentsError) {
        console.error('Error fetching investments for metrics:', investmentsError);
      }

      const investments = investmentsData || [];
      
      // Calcular métricas
      const totalProperties = properties.length;
      const totalInvestors = new Set(investments.map(inv => inv.investor_id)).size;
      const totalCapitalRaised = investments.reduce((sum, inv: any) => sum + (inv.total_amount || 0), 0);
      const averageInvestmentSize = investments.length > 0 
        ? totalCapitalRaised / investments.length 
        : 0;

      // Calcular ROI promedio
      const averageROI = properties.length > 0
        ? properties.reduce((sum, prop) => sum + prop.estimatedROI, 0) / properties.length
        : 0;

      // Calcular tasa de éxito de financiamiento
      const fundedProperties = properties.filter(p => p.status === 'funded' || p.status === 'completed').length;
      const fundingSuccessRate = properties.length > 0
        ? (fundedProperties / properties.length) * 100
        : 0;

      // Calcular tasa de retención (inversores con múltiples inversiones)
      const investorsWithMultiple = Array.from(new Set(investments.map(inv => inv.investor_id)))
        .filter(invId => {
          const invCount = investments.filter(inv => inv.investor_id === invId).length;
          return invCount > 1;
        }).length;
      const investorRetentionRate = totalInvestors > 0
        ? (investorsWithMultiple / totalInvestors) * 100
        : 0;

      return {
        totalProperties,
        totalInvestors,
        totalCapitalRaised,
        averageInvestmentSize,
        averageROI,
        fundingSuccessRate,
        investorRetentionRate
      };
    } catch (error) {
      console.error('Error in getPlatformMetrics:', error);
      throw error;
    }
  }

  // ============================================
  // HELPERS - MAPEO DE DATOS
  // ============================================

  /**
   * Mapear datos de BD a FractionalProperty
   */
  private static mapToFractionalProperty(data: any): FractionalProperty {
    return {
      id: data.slug || data.id, // Usar slug como identificador principal si existe, sino UUID
      name: data.name,
      description: data.description,
      location: data.location,
      prefecture: data.prefecture,
      totalValue: data.total_value,
      totalShares: data.total_shares,
      pricePerShare: data.price_per_share,
      availableShares: data.available_shares,
      soldShares: data.sold_shares || 0,
      images: data.images || [],
      features: data.features || [],
      renovationStatus: data.renovation_status,
      estimatedROI: parseFloat(data.estimated_roi),
      monthlyRentalIncome: data.monthly_rental_income,
      propertyType: data.property_type,
      yearBuilt: data.year_built,
      landSize: parseFloat(data.land_size),
      buildingSize: parseFloat(data.building_size),
      status: data.status,
      fundingGoal: data.funding_goal,
      currentFunding: data.current_funding || 0,
      fundingProgress: parseFloat(data.funding_progress || 0),
      expectedCompletionDate: data.expected_completion_date,
      legalStructure: data.legal_structure,
      minimumInvestment: data.minimum_investment,
      maximumInvestment: data.maximum_investment,
      fees: {
        managementFee: parseFloat(data.management_fee || 1.5),
        performanceFee: parseFloat(data.performance_fee || 10),
        exitFee: parseFloat(data.exit_fee || 2)
      },
      documents: {
        prospectus: data.prospectus_url || '',
        legalAgreement: data.legal_agreement_url || '',
        financialProjections: data.financial_projections_url || ''
      },
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }

  /**
   * Mapear datos de BD a FractionalInvestment
   */
  private static mapToFractionalInvestment(data: any): FractionalInvestment {
    return {
      id: data.id,
      propertyId: data.property_id,
      investorId: data.investor_id,
      sharesPurchased: data.shares_purchased,
      totalAmount: data.total_amount,
      purchaseDate: data.purchase_date,
      status: data.status,
      paymentMethod: data.payment_method,
      transactionId: data.transaction_id,
      documents: {
        investmentAgreement: data.investment_agreement_url || '',
        shareCertificate: data.share_certificate_url || ''
      }
    };
  }
}

