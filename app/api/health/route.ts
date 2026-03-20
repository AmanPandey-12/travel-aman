import { NextRequest, NextResponse } from 'next/server';

// Health check endpoint
export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: 'TravelAman API is running',
      status: 'healthy',
      version: '1.0.0',
      endpoints: {
        destinations: '/api/destinations',
        cities: '/api/cities',
        packages: '/api/packages',
        bookings: '/api/bookings',
      },
    },
    { status: 200 }
  );
}
