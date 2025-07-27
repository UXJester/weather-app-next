import { useState, useEffect, useCallback, FormEvent } from 'react';
import { getCurrentWeather, getForecast } from '@/services';
import type { WeatherData, ForecastResponse } from '@/types';

// Constants for localStorage and debounce
const LAST_CITY_KEY = 'lastSearchedCity';
const DEBOUNCE_DELAY = 500; // 500ms delay

export function useWeather() {
  // Initialize city from localStorage if available (only in browser)
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedCity, setDebouncedCity] = useState('');

  // Initialize from localStorage when in browser
  useEffect(() => {
    const savedCity =
      typeof window !== 'undefined'
        ? localStorage.getItem(LAST_CITY_KEY)
        : null;

    if (savedCity) {
      setCity(savedCity);
      setDebouncedCity(savedCity);
    }
  }, []);

  // Handle city input changes with debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCity(city);
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [city]);

  // Save city to localStorage whenever it changes (browser only)
  useEffect(() => {
    if (typeof window !== 'undefined' && city.trim()) {
      localStorage.setItem(LAST_CITY_KEY, city);
    }
  }, [city]);

  const searchWeather = useCallback(
    async (e?: FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      if (!city.trim()) return;

      setLoading(true);
      setError(null);

      try {
        // Get both current weather and forecast data
        const weatherData = await getCurrentWeather(city);
        const forecastData = await getForecast(city);

        setWeather(weatherData);
        setForecast(forecastData);
      } catch (err) {
        // More specific error handling
        const errorMessage =
          err instanceof Error
            ? err.message === 'City not found'
              ? 'City not found. Please check spelling and try again.'
              : err.message
            : 'Failed to fetch weather data';
        setError(errorMessage);
        setWeather(null);
        setForecast(null);
      } finally {
        setLoading(false);
      }
    },
    [city]
  );

  // Search weather with debounced city value
  useEffect(() => {
    if (debouncedCity.trim()) {
      searchWeather();
    }
  }, [debouncedCity, searchWeather]);

  return {
    city,
    setCity,
    weather,
    forecast,
    loading,
    error,
    searchWeather,
  };
}
