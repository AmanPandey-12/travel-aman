import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for bookings (in production, use database)
const bookings: any[] = [];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bookingId = searchParams.get('id');
    const userId = searchParams.get('userId');

    let filteredBookings = bookings;

    if (bookingId) {
      filteredBookings = filteredBookings.filter(
        (booking) => booking.id === parseInt(bookingId)
      );
    }

    if (userId) {
      filteredBookings = filteredBookings.filter(
        (booking) => booking.userId === userId
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: filteredBookings,
        count: filteredBookings.length,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching bookings',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    if (
      !body.userId ||
      !body.packageId ||
      !body.travelers ||
      !body.checkIn ||
      !body.checkOut
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Missing required fields: userId, packageId, travelers, checkIn, checkOut',
        },
        { status: 400 }
      );
    }

    // Create booking object
    const newBooking = {
      id: bookings.length + 1,
      bookingId: `TRVL-${Date.now()}`,
      userId: body.userId,
      packageId: body.packageId,
      travelers: body.travelers,
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      totalPrice: body.totalPrice || 0,
      specialRequests: body.specialRequests || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    bookings.push(newBooking);

    return NextResponse.json(
      {
        success: true,
        message: 'Booking created successfully',
        data: newBooking,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error creating booking',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Booking ID is required',
        },
        { status: 400 }
      );
    }

    // Find and update booking
    const bookingIndex = bookings.findIndex((b) => b.id === body.id);

    if (bookingIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: 'Booking not found',
        },
        { status: 404 }
      );
    }

    // Update booking
    bookings[bookingIndex] = {
      ...bookings[bookingIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Booking updated successfully',
        data: bookings[bookingIndex],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error updating booking',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bookingId = searchParams.get('id');

    if (!bookingId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Booking ID is required',
        },
        { status: 400 }
      );
    }

    const bookingIndex = bookings.findIndex(
      (b) => b.id === parseInt(bookingId)
    );

    if (bookingIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: 'Booking not found',
        },
        { status: 404 }
      );
    }

    // Remove booking
    const deletedBooking = bookings.splice(bookingIndex, 1);

    return NextResponse.json(
      {
        success: true,
        message: 'Booking deleted successfully',
        data: deletedBooking[0],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error deleting booking',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
