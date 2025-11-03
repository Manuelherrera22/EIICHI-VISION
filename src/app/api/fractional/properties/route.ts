/**
 * API Route para Propiedades Fraccionadas
 * GET /api/fractional/properties
 */

import { NextRequest, NextResponse } from 'next/server';
import { FractionalService } from '@/lib/fractional/fractional-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'available' | 'funding' | 'funded' | 'renovating' | 'completed' | null;

    const properties = await FractionalService.getProperties(status || undefined);

    return NextResponse.json({
      success: true,
      data: properties,
      count: properties.length
    });
  } catch (error: any) {
    console.error('Error in GET /api/fractional/properties:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch fractional properties' 
      },
      { status: 500 }
    );
  }
}

