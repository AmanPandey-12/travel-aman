import { NextRequest, NextResponse } from 'next/server';

// Sample Indian destinations data
const indianDestinations = [
  {
    id: 1,
    name: 'Taj Mahal',
    city: 'Agra',
    state: 'Uttar Pradesh',
    description: 'An ivory-white marble mausoleum on the right bank of the Yamuna river, one of the seven wonders of the world.',
    rating: 4.8,
    visitors: 8000000,
    image: 'taj-mahal.jpg',
    bestTime: 'October to March',
    category: 'Heritage Site',
  },
  {
    id: 2,
    name: 'Himalayan Treks',
    city: 'Manali',
    state: 'Himachal Pradesh',
    description: 'Adventure trekking through snow-capped mountains and scenic valleys of the great Himalayas.',
    rating: 4.7,
    visitors: 500000,
    image: 'himalayas.jpg',
    bestTime: 'May to September',
    category: 'Adventure',
  },
  {
    id: 3,
    name: 'Backwaters of Kerala',
    city: 'Kochi',
    state: 'Kerala',
    description: 'Serene backwaters with houseboat cruises through coconut groves and fishing villages.',
    rating: 4.9,
    visitors: 2000000,
    image: 'kerala-backwaters.jpg',
    bestTime: 'August to March',
    category: 'Beach & Nature',
  },
  {
    id: 4,
    name: 'Varanasi - City of Spirituality',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    description: 'One of the oldest cities in the world, sacred to Hindus, with ancient temples and ghats.',
    rating: 4.6,
    visitors: 3000000,
    image: 'varanasi.jpg',
    bestTime: 'October to March',
    category: 'Spiritual',
  },
  {
    id: 5,
    name: 'Goa Beaches',
    city: 'Panaji',
    state: 'Goa',
    description: 'Tropical beaches, Portuguese architecture, and vibrant nightlife on the Arabian Sea coast.',
    rating: 4.5,
    visitors: 4000000,
    image: 'goa-beach.jpg',
    bestTime: 'November to February',
    category: 'Beach',
  },
  {
    id: 6,
    name: 'Jaipur City Palace',
    city: 'Jaipur',
    state: 'Rajasthan',
    description: 'The pink city of India with magnificent forts, palaces, and bustling bazaars.',
    rating: 4.4,
    visitors: 5000000,
    image: 'jaipur.jpg',
    bestTime: 'October to March',
    category: 'Heritage Site',
  },
  {
    id: 7,
    name: 'Dal Lake, Kashmir',
    city: 'Srinagar',
    state: 'Jammu & Kashmir',
    description: 'Heaven on earth - pristine alpine lake surrounded by mountains with traditional houseboats.',
    rating: 4.8,
    visitors: 1500000,
    image: 'dal-lake.jpg',
    bestTime: 'May to October',
    category: 'Nature & Adventure',
  },
  {
    id: 8,
    name: 'Red Fort - New Delhi',
    city: 'Delhi',
    state: 'Delhi',
    description: 'Historic red sandstone fort and UNESCO World Heritage site in the heart of Delhi.',
    rating: 4.3,
    visitors: 2500000,
    image: 'red-fort.jpg',
    bestTime: 'October to March',
    category: 'Heritage Site',
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const state = searchParams.get('state');

    let filteredDestinations = indianDestinations;

    if (category) {
      filteredDestinations = filteredDestinations.filter(
        (dest) => dest.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (state) {
      filteredDestinations = filteredDestinations.filter(
        (dest) => dest.state.toLowerCase() === state.toLowerCase()
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: filteredDestinations,
        count: filteredDestinations.length,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching destinations',
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
    if (!body.name || !body.city || !body.state || !body.description) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: name, city, state, description',
        },
        { status: 400 }
      );
    }

    // Create new destination object
    const newDestination = {
      id: indianDestinations.length + 1,
      name: body.name,
      city: body.city,
      state: body.state,
      description: body.description,
      rating: body.rating || 4.0,
      visitors: body.visitors || 0,
      image: body.image || 'placeholder.jpg',
      bestTime: body.bestTime || 'Year round',
      category: body.category || 'General',
    };

    // Add to destinations array
    indianDestinations.push(newDestination);

    return NextResponse.json(
      {
        success: true,
        message: 'Destination added successfully',
        data: newDestination,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error creating destination',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
