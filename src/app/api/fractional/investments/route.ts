/**
 * API Route para Inversiones Fraccionadas
 * POST /api/fractional/investments - Crear inversión
 * GET /api/fractional/investments?investorId=xxx - Obtener inversiones de un inversor
 */

import { NextRequest, NextResponse } from 'next/server';
import { FractionalService } from '@/lib/fractional/fractional-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const investorId = searchParams.get('investorId');

    if (!investorId) {
      return NextResponse.json(
        { success: false, error: 'investorId is required' },
        { status: 400 }
      );
    }

    const investments = await FractionalService.getInvestorInvestments(investorId);

    return NextResponse.json({
      success: true,
      data: investments,
      count: investments.length
    });
  } catch (error: any) {
    console.error('Error in GET /api/fractional/investments:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch investments' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      propertyId,
      investorId,
      sharesPurchased,
      totalAmount,
      paymentMethod
    } = body;

    // Validar campos requeridos
    if (!propertyId || !investorId || !sharesPurchased || !totalAmount || !paymentMethod) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: propertyId, investorId, sharesPurchased, totalAmount, paymentMethod' 
        },
        { status: 400 }
      );
    }

    const investment = await FractionalService.createInvestment(
      propertyId,
      investorId,
      sharesPurchased,
      totalAmount,
      paymentMethod
    );

    return NextResponse.json({
      success: true,
      data: investment
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/fractional/investments:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to create investment' 
      },
      { status: 500 }
    );
  }
}

