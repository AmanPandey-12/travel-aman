import { NextRequest, NextResponse } from 'next/server';

// Indian cities data
const indianCities = [
  {
    id: 1,
    name: 'Delhi',
    state: 'Delhi',
    population: 32900000,
    description: 'Capital city of India, hub of culture, history, and politics.',
    attractions: ['Red Fort', 'India Gate', 'Jama Masjid', 'Chandni Chowk'],
    image: 'delhi.jpg',
  },
  {
    id: 2,
    name: 'Mumbai',
    state: 'Maharashtra',
    population: 20961472,
    description: 'Financial capital of India, Bollywood city, with modern skyline and colonial architecture.',
    attractions: ['Gateway of India', 'Marine Drive', 'Taj Hotel', 'Juhu Beach'],
    image: 'mumbai.jpg',
  },
  {
    id: 3,
    name: 'Bangalore',
    state: 'Karnataka',
    population: 8533547,
    description: 'IT capital of India, known for technology, startups, and pleasant weather.',
    attractions: ['Vidhana Soudha', 'Bangalore Palace', 'Cubbon Park', 'Lal Bagh'],
    image: 'bangalore.jpg',
  },
  {
    id: 4,
    name: 'Jaipur',
    state: 'Rajasthan',
    population: 3046163,
    description: 'The Pink City of India, known for its pink architecture and royal heritage.',
    attractions: ['City Palace', 'Jantar Mantar', 'Hawa Mahal', 'Albert Hall Museum'],
    image: 'jaipur.jpg',
  },
  {
    id: 5,
    name: 'Kolkata',
    state: 'West Bengal',
    population: 14681900,
    description: 'Cultural capital of India, city of palaces, literature, and art.',
    attractions: ['Victoria Memorial', 'Howrah Bridge', 'Darjeeling Tea', 'Indian Museum'],
    image: 'kolkata.jpg',
  },
  {
    id: 6,
    name: 'Chennai',
    state: 'Tamil Nadu',
    population: 7088000,
    description: 'Gateway to South India, known for its temples, beaches, and classical arts.',
    attractions: ['Kapaleeshwarar Temple', 'Marina Beach', 'Government Museum', 'Fort St. George'],
    image: 'chennai.jpg',
  },
  {
    id: 7,
    name: 'Agra',
    state: 'Uttar Pradesh',
    population: 1704168,
    description: 'Home to the Taj Mahal, one of the seven wonders of the world.',
    attractions: ['Taj Mahal', 'Agra Fort', 'Mehtab Bagh', 'Itimad-ud-Daulah'],
    image: 'agra.jpg',
  },
  {
    id: 8,
    name: 'Kochi',
    state: 'Kerala',
    population: 2293998,
    description: 'Spice trading hub, known for backwaters, beaches, and historic trade route connections.',
    attractions: ['Chinese Fishing Nets', 'Fort Kochi', 'Backwaters', 'Spice Markets'],
    image: 'kochi.jpg',
  },
  {
    id: 9,
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    population: 1198491,
    description: 'Holiest city for Hindus, city of spirituality with ancient temples and ghats.',
    attractions: ['Ganges Ghats', 'Kashi Vishwanath Temple', 'Sarnath', 'Manikarnika Ghat'],
    image: 'varanasi.jpg',
  },
  {
    id: 10,
    name: 'Goa',
    state: 'Goa',
    population: 1458545,
    description: 'Tropical paradise with beaches, Portuguese heritage, and vibrant nightlife.',
    attractions: ['Bom Jesus Basilica', 'Colva Beach', 'Fort Aguada', 'Dudhsagar Waterfall'],
    image: 'goa.jpg',
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const state = searchParams.get('state');
    const id = searchParams.get('id');

    let filteredCities = indianCities;

    if (state) {
      filteredCities = filteredCities.filter(
        (city) => city.state.toLowerCase() === state.toLowerCase()
      );
    }

    if (id) {
      filteredCities = filteredCities.filter((city) => city.id === parseInt(id));
    }

    return NextResponse.json(
      {
        success: true,
        data: filteredCities,
        count: filteredCities.length,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching cities',
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
    if (!body.name || !body.state || !body.description) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: name, state, description',
        },
        { status: 400 }
      );
    }

    // Create new city object
    const newCity = {
      id: indianCities.length + 1,
      name: body.name,
      state: body.state,
      population: body.population || 0,
      description: body.description,
      attractions: body.attractions || [],
      image: body.image || 'placeholder.jpg',
    };

    // Add to cities array
    indianCities.push(newCity);

    return NextResponse.json(
      {
        success: true,
        message: 'City added successfully',
        data: newCity,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error creating city',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
