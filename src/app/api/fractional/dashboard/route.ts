/**
 * API Route para Dashboard de Inversor
 * GET /api/fractional/dashboard?investorId=xxx
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

    const dashboard = await FractionalService.getInvestorDashboard(investorId);

    return NextResponse.json({
      success: true,
      data: dashboard
    });
  } catch (error: any) {
    console.error('Error in GET /api/fractional/dashboard:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch dashboard' 
      },
      { status: 500 }
    );
  }
}

