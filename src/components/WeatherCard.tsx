'use client';

import type { WeatherCardProps } from '@/types';
import { WeatherIcon } from '@/components';

// Conversion factor from mph to m/s
const MPH_TO_MS = 0.44704;

export const WeatherCard = (props: WeatherCardProps) => {
  const { location, icon, description, temperature, humidity, windSpeed } =
    props;

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto"
      role="region"
      aria-label="Current weather information"
    >
      <h2
        id="location-heading"
        className="text-2xl font-bold mb-4 text-gray-800"
      >
        {location}
      </h2>
      <div className="space-y-4">
        <WeatherIcon
          iconCode={icon}
          description={description}
          className="w-20 h-20 mx-auto"
        />
        <div
          className="text-4xl font-bold text-center text-gray-900"
          aria-label={`Temperature: ${temperature} degrees Fahrenheit`}
        >
          {temperature}°F
        </div>
        <div
          className="text-xl text-center text-gray-600"
          aria-label={`Weather condition: ${description}`}
        >
          {description}
        </div>
        <div className="border-t pt-4 mt-4 space-y-2">
          <p
            className="text-gray-600 flex justify-between items-center"
            aria-label={`Humidity: ${humidity} percent`}
          >
            <span>Humidity:</span>{' '}
            <span className="font-medium">{humidity}%</span>
          </p>
          <p
            className="text-gray-600 flex justify-between items-center"
            aria-label={`Wind speed: ${(windSpeed * MPH_TO_MS).toFixed(
              2
            )} meters per second`}
          >
            <span>Wind:</span>{' '}
            <span className="font-medium">
              {(windSpeed * MPH_TO_MS).toFixed(2)} m/s
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
