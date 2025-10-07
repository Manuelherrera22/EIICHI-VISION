import { NextRequest, NextResponse } from 'next/server';
import { TabijiPaymentService } from '@/lib/payments/payment-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Verificar el pago
    const verification = await TabijiPaymentService.verifyPayment(sessionId);

    return NextResponse.json({
      success: true,
      ...verification,
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to verify payment',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

