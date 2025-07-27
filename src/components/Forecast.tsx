'use client';

import type { ForecastProps } from '@/types';
import { WeatherIcon } from '@/components';

export const Forecast = (props: ForecastProps) => {
  const { dailyForecasts } = props;

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-6"
      role="region"
      aria-label="5-Day Weather Forecast"
    >
      <h3
        id="forecast-heading"
        className="text-xl font-bold mb-4 text-gray-800"
      >
        5-Day Forecast
      </h3>
      <div
        className="grid grid-cols-1 sm:grid-cols-5 gap-4"
        aria-labelledby="forecast-heading"
      >
        {dailyForecasts.map((day) => (
          <div
            key={day.Date}
            className="flex flex-col items-center p-3 border rounded-lg bg-gray-50"
            role="article"
          >
            <div className="text-lg font-medium text-gray-700 mb-2">
              {new Date(day.Date).toLocaleDateString('en-US', {
                weekday: 'short',
              })}
            </div>
            <WeatherIcon
              iconCode={day.Day.Icon}
              description={day.Day.IconPhrase}
              className="w-12 h-12 my-2"
            />
            <div
              className="flex gap-2 text-lg font-semibold"
              aria-label="Temperature range"
            >
              <span
                className="text-red-600"
                aria-label={`High: ${Math.round(
                  day.Temperature.Maximum.Value
                )} degrees`}
              >
                {Math.round(day.Temperature.Maximum.Value)}°
              </span>
              <span
                className="text-blue-600"
                aria-label={`Low: ${Math.round(
                  day.Temperature.Minimum.Value
                )} degrees`}
              >
                {Math.round(day.Temperature.Minimum.Value)}°
              </span>
            </div>
            <div className="text-sm text-gray-600 text-center mt-2">
              {day.Day.IconPhrase}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
