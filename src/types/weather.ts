/**
 * Types for the weather application
 */

/**
 * Common types used across the application
 */

/**
 * AccuWeather icon code values
 * @see https://developer.accuweather.com/weather-icons
 */
export type IconCode =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44;

/**
 * Measurement unit with value and unit string
 * @property Value - The numerical value of the measurement
 * @property Unit - The unit of measurement (e.g., "F", "C", "mi", "km")
 */
export interface Measurement {
  Value: number;
  Unit: string;
}

/**
 * Temperature data with imperial and metric units
 * @property Metric - Temperature in metric units (Celsius)
 * @property Imperial - Temperature in imperial units (Fahrenheit)
 */
export interface TemperatureData {
  Metric: Measurement;
  Imperial: Measurement;
}

/**
 * Weather condition information
 * @property Icon - The AccuWeather icon code representing the weather condition
 * @property IconPhrase - Text description of the weather condition
 * @property HasPrecipitation - Whether precipitation is occurring
 * @property PrecipitationType - Type of precipitation (rain, snow, etc.) if applicable
 * @property PrecipitationIntensity - Intensity of precipitation if applicable
 */
export interface WeatherCondition {
  Icon: IconCode;
  IconPhrase: string;
  HasPrecipitation: boolean;
  PrecipitationType?: string;
  PrecipitationIntensity?: string;
}

/**
 * Weather data returned by our service
 */
export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

/**
 * AccuWeather location response
 */
export interface LocationResponse {
  Key: string;
  LocalizedName: string;
  Country: {
    ID: string;
    LocalizedName: string;
  };
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
  };
}

/**
 * AccuWeather current conditions response
 * @property WeatherText - Text description of current weather conditions
 * @property WeatherIcon - Icon code representing current weather
 * @property Temperature - Current temperature information
 * @property RelativeHumidity - Current humidity percentage
 * @property Wind - Wind direction and speed information
 * @property UVIndex - Ultraviolet radiation index
 * @property Visibility - Current visibility distance
 */
export interface WeatherResponse {
  WeatherText: string;
  WeatherIcon: IconCode;
  Temperature: TemperatureData;
  RelativeHumidity: number;
  Wind: {
    Direction: {
      Degrees: number;
      Localized: string;
    };
    Speed: TemperatureData;
  };
  UVIndex: number;
  Visibility: TemperatureData;
}

/**
 * AccuWeather forecast response
 */
export interface ForecastResponse {
  DailyForecasts: DailyForecast[];
  Headline: {
    Text: string;
    Category: string;
    EffectiveDate: string;
    EndDate: string;
  };
}

/**
 * Daily forecast data
 */
export interface DailyForecast {
  Date: string;
  Temperature: {
    Minimum: Measurement;
    Maximum: Measurement;
  };
  Day: WeatherCondition;
  Night: WeatherCondition;
}

/**
 * Component types
 */

/**
 * Simplified forecast day data for the UI component
 */
export type ForecastDay = Pick<DailyForecast, 'Date'> & {
  Day: Pick<WeatherCondition, 'Icon' | 'IconPhrase'>;
  Temperature: {
    Maximum: Pick<Measurement, 'Value'>;
    Minimum: Pick<Measurement, 'Value'>;
  };
};

/**
 * Props for the Forecast component
 */
export interface ForecastProps {
  dailyForecasts: ForecastDay[];
}

/**
 * Props for the WeatherCard component
 */
export interface WeatherCardProps {
  location: string;
  icon: string;
  description: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
}

/**
 * Props for the SearchBar component
 * @property city - The current city input value
 * @property setCity - Function to update the city value
 * @property searchWeather - Form submission handler to trigger weather search
 */
export interface SearchBarProps {
  city: string;
  setCity: (city: string) => void;
  searchWeather: (e: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * Props for the WeatherIcon component
 * @property iconCode - The AccuWeather icon code to display
 * @property description - Accessible description of the weather icon
 * @property className - Optional CSS class name for styling
 */
export interface WeatherIconProps {
  iconCode: IconCode | string;
  description: string;
  className?: string;
}
