import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://dataservice.accuweather.com';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    if (!city) {
      return NextResponse.json(
        { error: 'City parameter is required' },
        { status: 400 }
      );
    }

    if (!API_KEY) {
      return NextResponse.json(
        { error: 'Weather API key not configured' },
        { status: 500 }
      );
    }

    // Step 1: Get location key
    const locationKey = await getLocationKey(city);

    // Step 2: Get forecast data
    const response = await fetch(
      `${BASE_URL}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&metric=false`
    );

    if (!response.ok) {
      throw new Error('Forecast data not available');
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('API route error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch forecast data';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

async function getLocationKey(city: string): Promise<string> {
  const response = await fetch(
    `${BASE_URL}/locations/v1/cities/search?apikey=${API_KEY}&q=${encodeURIComponent(
      city
    )}`
  );

  if (!response.ok) {
    throw new Error('Location search failed');
  }

  const locations = await response.json();

  if (!locations || locations.length === 0) {
    throw new Error('City not found');
  }

  return locations[0].Key;
}
