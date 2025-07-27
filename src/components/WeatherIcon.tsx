'use client';

import { WeatherIconProps } from '@/types';

export const WeatherIcon = (props: WeatherIconProps) => {
  const { iconCode, description, className = 'w-16 h-16' } = props;

  // Map icon codes to categories
  const iconMap = {
    sunny: [1, 2, 30, 33, 34],
    partlyCloudy: [3, 4, 5, 35, 36],
    cloudy: [6, 7, 8, 38],
    foggy: [11, 12, 37, 38],
    rainy: [13, 14, 18, 39, 40],
    thunderstorm: [15, 16, 17, 41, 42],
    snow: [19, 20, 21, 22, 23, 24, 43, 44],
    sleet: [25, 26, 29],
    hot: [31],
    cold: [32],
  };

  // Map icon codes to SVG icons
  const renderIcon = () => {
    // Convert icon code to a number
    const code =
      typeof iconCode === 'string' ? parseInt(iconCode, 10) : iconCode;

    // Define SVG components map for each weather type
    const iconComponents = {
      sunny: (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="8" fill="#FFD700" />
          <line
            x1="16"
            y1="2"
            x2="16"
            y2="6"
            stroke="#FFD700"
            strokeWidth="2"
          />
          <line
            x1="16"
            y1="26"
            x2="16"
            y2="30"
            stroke="#FFD700"
            strokeWidth="2"
          />
          <line
            x1="2"
            y1="16"
            x2="6"
            y2="16"
            stroke="#FFD700"
            strokeWidth="2"
          />
          <line
            x1="26"
            y1="16"
            x2="30"
            y2="16"
            stroke="#FFD700"
            strokeWidth="2"
          />
          <line
            x1="5.17"
            y1="5.17"
            x2="8"
            y2="8"
            stroke="#FFD700"
            strokeWidth="2"
          />
          <line
            x1="24"
            y1="24"
            x2="26.83"
            y2="26.83"
            stroke="#FFD700"
            strokeWidth="2"
          />
          <line
            x1="5.17"
            y1="26.83"
            x2="8"
            y2="24"
            stroke="#FFD700"
            strokeWidth="2"
          />
          <line
            x1="24"
            y1="8"
            x2="26.83"
            y2="5.17"
            stroke="#FFD700"
            strokeWidth="2"
          />
        </svg>
      ),

      partlyCloudy: (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="5" fill="#FFD700" />
          <path
            d="M8 16C3.58172 16 0 19.5817 0 24C0 28.4183 3.58172 32 8 32H24C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16C23.9876 16 23.9751 16.0001 23.9627 16.0002C23.2968 12.0326 19.8418 9 15.7273 9C11.3854 9 7.80807 12.3485 7.31516 16.6487C7.21077 16.6163 7.10583 16.5857 7 16.5571"
            fill="white"
          />
        </svg>
      ),

      cloudy: (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 12C3.58172 12 0 15.5817 0 20C0 24.4183 3.58172 28 8 28H24C28.4183 28 32 24.4183 32 20C32 15.5817 28.4183 12 24 12C23.9876 12 23.9751 12.0001 23.9627 12.0002C23.2968 8.03258 19.8418 5 15.7273 5C11.3854 5 7.80807 8.34853 7.31516 12.6487C7.21077 12.6163 7.10583 12.5857 7 12.5571"
            fill="#E5E7EB"
            stroke="#9CA3AF"
            strokeWidth="1"
          />
        </svg>
      ),

      foggy: (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 10H28"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 16H28"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 22H28"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="16" cy="16" r="12" fill="#E5E7EB" fillOpacity="0.5" />
        </svg>
      ),

      rainy: (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 8C3.58172 8 0 11.5817 0 16C0 20.4183 3.58172 24 8 24H24C28.4183 24 32 20.4183 32 16C32 11.5817 28.4183 8 24 8C23.9876 8 23.9751 8.00006 23.9627 8.00018C23.2968 4.03258 19.8418 1 15.7273 1C11.3854 1 7.80807 4.34853 7.31516 8.64866C7.21077 8.6163 7.10583 8.58573 7 8.55709"
            fill="#E5E7EB"
            stroke="#9CA3AF"
            strokeWidth="1"
          />
          <path
            d="M8 24L6 31"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M16 24L14 31"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M24 24L22 31"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),

      thunderstorm: (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 8C3.58172 8 0 11.5817 0 16C0 20.4183 3.58172 24 8 24H24C28.4183 24 32 20.4183 32 16C32 11.5817 28.4183 8 24 8C23.9876 8 23.9751 8.00006 23.9627 8.00018C23.2968 4.03258 19.8418 1 15.7273 1C11.3854 1 7.80807 4.34853 7.31516 8.64866C7.21077 8.6163 7.10583 8.58573 7 8.55709"
            fill="#6B7280"
            stroke="#4B5563"
            strokeWidth="1"
          />
          <path
            d="M12 24L14 18H10L12 12"
            stroke="#FFD700"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 24L22 18H18L20 12"
            stroke="#FFD700"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),

      snow: (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 8C3.58172 8 0 11.5817 0 16C0 20.4183 3.58172 24 8 24H24C28.4183 24 32 20.4183 32 16C32 11.5817 28.4183 8 24 8C23.9876 8 23.9751 8.00006 23.9627 8.00018C23.2968 4.03258 19.8418 1 15.7273 1C11.3854 1 7.80807 4.34853 7.31516 8.64866C7.21077 8.6163 7.10583 8.58573 7 8.55709"
            fill="#E5E7EB"
            stroke="#9CA3AF"
            strokeWidth="1"
          />
          <circle cx="8" cy="28" r="1" fill="white" />
          <circle cx="16" cy="28" r="1" fill="white" />
          <circle cx="24" cy="28" r="1" fill="white" />
          <circle cx="12" cy="26" r="1" fill="white" />
          <circle cx="20" cy="26" r="1" fill="white" />
        </svg>
      ),

      sleet: (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 8C3.58172 8 0 11.5817 0 16C0 20.4183 3.58172 24 8 24H24C28.4183 24 32 20.4183 32 16C32 11.5817 28.4183 8 24 8C23.9876 8 23.9751 8.00006 23.9627 8.00018C23.2968 4.03258 19.8418 1 15.7273 1C11.3854 1 7.80807 4.34853 7.31516 8.64866C7.21077 8.6163 7.10583 8.58573 7 8.55709"
            fill="#E5E7EB"
            stroke="#9CA3AF"
            strokeWidth="1"
          />
          <path
            d="M10 24L8 32"
            stroke="#A5F3FC"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M16 24L14 32"
            stroke="#A5F3FC"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M22 24L20 32"
            stroke="#A5F3FC"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),

      hot: (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="8" fill="#EF4444" />
          <line
            x1="16"
            y1="2"
            x2="16"
            y2="6"
            stroke="#EF4444"
            strokeWidth="2"
          />
          <line
            x1="16"
            y1="26"
            x2="16"
            y2="30"
            stroke="#EF4444"
            strokeWidth="2"
          />
          <line
            x1="2"
            y1="16"
            x2="6"
            y2="16"
            stroke="#EF4444"
            strokeWidth="2"
          />
          <line
            x1="26"
            y1="16"
            x2="30"
            y2="16"
            stroke="#EF4444"
            strokeWidth="2"
          />
          <line
            x1="5.17"
            y1="5.17"
            x2="8"
            y2="8"
            stroke="#EF4444"
            strokeWidth="2"
          />
          <line
            x1="24"
            y1="24"
            x2="26.83"
            y2="26.83"
            stroke="#EF4444"
            strokeWidth="2"
          />
          <line
            x1="5.17"
            y1="26.83"
            x2="8"
            y2="24"
            stroke="#EF4444"
            strokeWidth="2"
          />
          <line
            x1="24"
            y1="8"
            x2="26.83"
            y2="5.17"
            stroke="#EF4444"
            strokeWidth="2"
          />
        </svg>
      ),

      cold: (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="8" fill="#3B82F6" />
          <line
            x1="16"
            y1="2"
            x2="16"
            y2="6"
            stroke="#3B82F6"
            strokeWidth="2"
          />
          <line
            x1="16"
            y1="26"
            x2="16"
            y2="30"
            stroke="#3B82F6"
            strokeWidth="2"
          />
          <line
            x1="2"
            y1="16"
            x2="6"
            y2="16"
            stroke="#3B82F6"
            strokeWidth="2"
          />
          <line
            x1="26"
            y1="16"
            x2="30"
            y2="16"
            stroke="#3B82F6"
            strokeWidth="2"
          />
          <line
            x1="5.17"
            y1="5.17"
            x2="8"
            y2="8"
            stroke="#3B82F6"
            strokeWidth="2"
          />
          <line
            x1="24"
            y1="24"
            x2="26.83"
            y2="26.83"
            stroke="#3B82F6"
            strokeWidth="2"
          />
          <line
            x1="5.17"
            y1="26.83"
            x2="8"
            y2="24"
            stroke="#3B82F6"
            strokeWidth="2"
          />
          <line
            x1="24"
            y1="8"
            x2="26.83"
            y2="5.17"
            stroke="#3B82F6"
            strokeWidth="2"
          />
        </svg>
      ),

      default: (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 8H20"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 16H28"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 24H24"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    };

    // Find which category this code belongs to
    let iconType = 'default';
    for (const [type, codes] of Object.entries(iconMap)) {
      if (codes.includes(code)) {
        iconType = type;
        break;
      }
    }

    // Return the appropriate icon component
    return (
      iconComponents[iconType as keyof typeof iconComponents] ||
      iconComponents.default
    );
  };

  return (
    <div
      className={className}
      role="img"
      aria-label={`Weather condition: ${description}`}
    >
      {renderIcon()}
    </div>
  );
};
