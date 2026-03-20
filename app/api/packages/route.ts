import { NextRequest, NextResponse } from 'next/server';

// Travel packages data
const travelPackages = [
  {
    id: 1,
    name: 'Golden Triangle Tour',
    destinations: ['Delhi', 'Agra', 'Jaipur'],
    duration: '5 days',
    price: 15000,
    description: 'Experience the iconic triangle of India - explore Delhi, visit the Taj Mahal, and discover Jaipur.',
    inclusions: ['Hotel', 'Meals', 'Transport', 'Guide'],
    rating: 4.8,
    image: 'golden-triangle.jpg',
  },
  {
    id: 2,
    name: 'Kerala Backwaters Package',
    destinations: ['Kochi', 'Alleppey', 'Munnar'],
    duration: '4 days',
    price: 12000,
    description: 'Relax on Kerala backwaters with houseboat cruise and tea plantation visits.',
    inclusions: ['Houseboat', 'Meals', 'Plantation Tour', 'Guided Tour'],
    rating: 4.9,
    image: 'kerala-package.jpg',
  },
  {
    id: 3,
    name: 'Himalayan Adventure',
    destinations: ['Manali', 'Shimla', 'Kinnaur'],
    duration: '6 days',
    price: 18000,
    description: 'Trek through snow-capped mountains and experience mountain hospitality.',
    inclusions: ['Trekking', 'Accommodation', 'Meals', 'Expert Guide'],
    rating: 4.7,
    image: 'himalayan-adventure.jpg',
  },
  {
    id: 4,
    name: 'Spiritual Varanasi Journey',
    destinations: ['Varanasi', 'Sarnath', 'Bodhgaya'],
    duration: '3 days',
    price: 8000,
    description: 'Experience sacred India with spiritual tours and ancient temple visits.',
    inclusions: ['Accommodation', 'Meals', 'Temple Tours', 'Spiritual Guide'],
    rating: 4.6,
    image: 'spiritual-journey.jpg',
  },
  {
    id: 5,
    name: 'Goa Beach Getaway',
    destinations: ['Panaji', 'Baga', 'Colva'],
    duration: '4 days',
    price: 10000,
    description: 'Relax on pristine beaches with Portuguese heritage and water sports.',
    inclusions: ['Beach Resort', 'Meals', 'Water Sports', 'Leisure Activities'],
    rating: 4.5,
    image: 'goa-getaway.jpg',
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const destination = searchParams.get('destination');
    const maxPrice = searchParams.get('maxPrice');

    let filteredPackages = travelPackages;

    if (destination) {
      filteredPackages = filteredPackages.filter((pkg) =>
        pkg.destinations.some(
          (dest) => dest.toLowerCase().includes(destination.toLowerCase())
        )
      );
    }

    if (maxPrice) {
      const maxPriceNum = parseInt(maxPrice);
      filteredPackages = filteredPackages.filter(
        (pkg) => pkg.price <= maxPriceNum
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: filteredPackages,
        count: filteredPackages.length,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching packages',
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
    if (!body.name || !body.destinations || !body.duration || !body.price) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Missing required fields: name, destinations, duration, price',
        },
        { status: 400 }
      );
    }

    // Create new package object
    const newPackage = {
      id: travelPackages.length + 1,
      name: body.name,
      destinations: body.destinations,
      duration: body.duration,
      price: body.price,
      description: body.description || '',
      inclusions: body.inclusions || [],
      rating: body.rating || 4.0,
      image: body.image || 'placeholder.jpg',
    };

    // Add to packages array
    travelPackages.push(newPackage);

    return NextResponse.json(
      {
        success: true,
        message: 'Package added successfully',
        data: newPackage,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error creating package',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
