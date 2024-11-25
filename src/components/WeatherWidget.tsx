import React from 'react';
import { useSelector } from 'react-redux';
import { Cloud, Sun, CloudRain } from 'lucide-react';
import { RootState } from '../store';

const WeatherWidget: React.FC = () => {
  const { data, loading, error } = useSelector((state: RootState) => state.weather);

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg p-4">
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
        Failed to load weather data
      </div>
    );
  }

  if (!data) return null;

  const getWeatherIcon = () => {
    switch (data.condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'rainy':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      default:
        return <Cloud className="w-8 h-8 text-gray-500 dark:text-gray-400" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        {getWeatherIcon()}
        <div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{data.temperature}°C</p>
          <p className="text-gray-600 dark:text-gray-300">{data.condition}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;