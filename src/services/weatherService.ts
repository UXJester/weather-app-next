import { WeatherData, WeatherResponse, ForecastResponse } from '@/types';

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
 * Get the current weather for a city using our API route
 */
export async function getCurrentWeather(city: string): Promise<WeatherData> {
  try {
    // Check cache first
    const cacheKey = `weather_${city}`;
    const cachedData = getFromCache<WeatherData>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    // Call our API route
    const response = await fetch(
      `/api/weather/current?city=${encodeURIComponent(city)}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Weather data not available');
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

    // Call our API route
    const response = await fetch(
      `/api/weather/forecast?city=${encodeURIComponent(city)}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Forecast data not available');
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
