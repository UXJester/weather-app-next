'use client';

import { useWeather } from '@/hooks/useWeather';
import { SearchBar, WeatherCard, Forecast } from '@/components';

export default function Home() {
  const { city, setCity, weather, forecast, loading, error, searchWeather } =
    useWeather();

  return (
    <main className="weather-app">
      <h1 className="text-3xl font-bold underline mb-4">
        What&apos;s the Weather Willis?!?
      </h1>

      <SearchBar city={city} setCity={setCity} searchWeather={searchWeather} />

      {loading && <p role="status">Loading...</p>}
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      {weather && (
        <WeatherCard
          location={weather.location}
          icon={weather.icon}
          description={weather.description}
          temperature={weather.temperature}
          humidity={weather.humidity}
          windSpeed={weather.windSpeed}
        />
      )}

      {forecast && <Forecast dailyForecasts={forecast.DailyForecasts} />}
    </main>
  );
}
