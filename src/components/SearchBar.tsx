'use client';

import type { SearchBarProps } from '@/types';

export const SearchBar = (props: SearchBarProps) => {
  const { city, setCity, searchWeather } = props;

  return (
    <form onSubmit={searchWeather} className="flex w-full max-w-md gap-2">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        aria-label="City name"
      />
      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Search weather"
      >
        Search
      </button>
    </form>
  );
};
