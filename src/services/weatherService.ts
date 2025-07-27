import {
  WeatherData,
  WeatherResponse,
  LocationResponse,
  ForecastResponse,
} from '@/types';

if (!process.env.NEXT_PUBLIC_WEATHER_API_KEY) {
  console.error('Missing NEXT_PUBLIC_WEATHER_API_KEY environment variable');
}

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://dataservice.accuweather.com';

// Cache configuration
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes in milliseconds
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// Simple in-memory cache
const cache = new Map<string, CacheEntry<unknown>>();

/**
 * Get data from cache or return undefined if not found or expired
 */
function getFromCache<T>(key: string): T | undefined {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data as T;
  }
  return undefined;
}

/**
 * Save data to cache
 */
function saveToCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

/**
 * Get the current weather for a city using AccuWeather API
 */
export async function getCurrentWeather(city: string): Promise<WeatherData> {
  try {
    // Check cache first
    const cacheKey = `weather_${city}`;
    const cachedData = getFromCache<WeatherData>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    // Step 1: Get the location key for the city
    const locationKey = await getLocationKey(city);

    // Step 2: Get the current conditions using the location key
    const response = await fetch(
      `${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${API_KEY}&details=true`
    );

    if (!response.ok) {
      throw new Error('Weather data not available');
    }

    const data = (await response.json()) as WeatherResponse[];
    const result = transformWeatherData(data[0], city);

    // Save to cache
    saveToCache(cacheKey, result);
    return result;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
}

/**
 * Get the location key for a city name
 */
async function getLocationKey(city: string): Promise<string> {
  // Check cache first
  const cacheKey = `location_${city}`;
  const cachedLocation = getFromCache<string>(cacheKey);
  if (cachedLocation) {
    return cachedLocation;
  }

  const response = await fetch(
    `${BASE_URL}/locations/v1/cities/search?apikey=${API_KEY}&q=${encodeURIComponent(
      city
    )}`
  );

  if (!response.ok) {
    throw new Error('Location search failed');
  }

  const locations = (await response.json()) as LocationResponse[];

  if (!locations || locations.length === 0) {
    throw new Error('City not found');
  }

  // Get the key of the first (most relevant) location
  const locationKey = locations[0].Key;

  // Save to cache
  saveToCache(cacheKey, locationKey);

  return locationKey;
}

/**
 * Transform AccuWeather API response to the app's data format
 */
function transformWeatherData(
  data: WeatherResponse,
  locationName: string
): WeatherData {
  return {
    location: locationName,
    temperature: data.Temperature.Imperial.Value,
    description: data.WeatherText,
    humidity: data.RelativeHumidity,
    windSpeed: data.Wind.Speed.Imperial.Value,
    icon: data.WeatherIcon.toString().padStart(2, '0'), // AccuWeather uses icon codes
  };
}

/**
 * Get 5-day forecast for a location
 */
export async function getForecast(city: string): Promise<ForecastResponse> {
  try {
    // Check cache first
    const cacheKey = `forecast_${city}`;
    const cachedData = getFromCache<ForecastResponse>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const locationKey = await getLocationKey(city);

    const response = await fetch(
      `${BASE_URL}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&metric=false`
    );

    if (!response.ok) {
      throw new Error('Forecast data not available');
    }

    const result = (await response.json()) as ForecastResponse;

    // Save to cache
    saveToCache(cacheKey, result);
    return result;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
}
