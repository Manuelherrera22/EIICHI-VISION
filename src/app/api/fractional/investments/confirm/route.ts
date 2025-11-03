/**
 * API Route para Confirmar Inversión
 * POST /api/fractional/investments/confirm
 */

import { NextRequest, NextResponse } from 'next/server';
import { FractionalService } from '@/lib/fractional/fractional-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { investmentId, transactionId } = body;

    if (!investmentId) {
      return NextResponse.json(
        { success: false, error: 'investmentId is required' },
        { status: 400 }
      );
    }

    await FractionalService.confirmInvestment(investmentId, transactionId);

    return NextResponse.json({
      success: true,
      message: 'Investment confirmed successfully'
    });
  } catch (error: any) {
    console.error('Error in POST /api/fractional/investments/confirm:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to confirm investment' 
      },
      { status: 500 }
    );
  }
}

