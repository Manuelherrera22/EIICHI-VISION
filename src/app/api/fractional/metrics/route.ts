/**
 * API Route para Métricas de Plataforma
 * GET /api/fractional/metrics
 */

import { NextRequest, NextResponse } from 'next/server';
import { FractionalService } from '@/lib/fractional/fractional-service';

export async function GET(request: NextRequest) {
  try {
    const metrics = await FractionalService.getPlatformMetrics();

    return NextResponse.json({
      success: true,
      data: metrics
    });
  } catch (error: any) {
    console.error('Error in GET /api/fractional/metrics:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch metrics' 
      },
      { status: 500 }
    );
  }
}

