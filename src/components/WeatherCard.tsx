
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, Cloud, Droplets, Wind, Thermometer, Umbrella, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WeatherCardProps {
  language: string;
  compact?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ language, compact = false }) => {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);

  const translations = {
    english: {
      title: "Weather Forecast",
      subtitle: "Real-time weather updates for smart farming",
      current: "Current Weather",
      forecast: "7-Day Forecast",
      temperature: "Temperature",
      humidity: "Humidity",
      windSpeed: "Wind Speed",
      rainfall: "Rainfall",
      visibility: "Visibility",
      alerts: "Weather Alerts",
      goodForFarming: "Good conditions for farming today!",
      rainExpected: "Rain expected - Good for crops",
      highHumidity: "High humidity - Watch for fungal diseases"
    },
    hindi: {
      title: "मौसम पूर्वानुमान",
      subtitle: "स्मार्ट खेती के लिए वास्तविक समय मौसम अपडेट",
      current: "वर्तमान मौसम",
      forecast: "7-दिन का पूर्वानुमान",
      temperature: "तापमान",
      humidity: "आर्द्रता",
      windSpeed: "हवा की गति",
      rainfall: "बारिश",
      visibility: "दृश्यता",
      alerts: "मौसम चेतावनी",
      goodForFarming: "आज खेती के लिए अच्छी स्थिति!",
      rainExpected: "बारिश की उम्मीद - फसलों के लिए अच्छा",
      highHumidity: "उच्च आर्द्रता - फंगल रोगों के लिए सावधान"
    },
    telugu: {
      title: "వాతావరణ సూచన",
      subtitle: "స్మార్ట్ వ్యవసాయం కోసం రియల్ టైమ్ వాతావరణ అప్‌డేట్‌లు",
      current: "ప్రస్తుత వాతావరణం",
      forecast: "7-రోజుల సూచన",
      temperature: "ఉష్ణోగ్రత",
      humidity: "తేమ",
      windSpeed: "గాలి వేగం",
      rainfall: "వర్షపాతం",
      visibility: "దృశ్యమానత",
      alerts: "వాతావరణ హెచ్చరికలు",
      goodForFarming: "ఈరోజు వ్యవసాయానికి మంచి పరిస్థితులు!",
      rainExpected: "వర్షం అంచనా - పంటలకు మంచిది",
      highHumidity: "అధిక తేమ - ఫంగల్ వ్యాధుల కోసం జాగ్రత్త"
    }
  };

  const currentLang = translations[language];

  useEffect(() => {
    // Mock weather data
    const mockWeather = {
      temperature: 28,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12,
      rainfall: 0,
      visibility: 10,
      icon: '⛅'
    };

    const mockForecast = [
      { day: 'Today', temp: 28, condition: 'Partly Cloudy', icon: '⛅', rain: 20 },
      { day: 'Tomorrow', temp: 30, condition: 'Sunny', icon: '☀️', rain: 0 },
      { day: 'Day 3', temp: 26, condition: 'Rainy', icon: '🌧️', rain: 80 },
      { day: 'Day 4', temp: 25, condition: 'Cloudy', icon: '☁️', rain: 40 },
      { day: 'Day 5', temp: 29, condition: 'Sunny', icon: '☀️', rain: 10 },
      { day: 'Day 6', temp: 27, condition: 'Partly Cloudy', icon: '⛅', rain: 30 },
      { day: 'Day 7', temp: 31, condition: 'Hot', icon: '🌞', rain: 5 }
    ];

    setCurrentWeather(mockWeather);
    setForecast(mockForecast);
  }, []);

  if (compact) {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-yellow-50 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-blue-700 text-lg">
            <Sun className="h-5 w-5" />
            {currentLang.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentWeather && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{currentWeather.icon}</span>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{currentWeather.temperature}°C</p>
                  <p className="text-sm text-gray-600">{currentWeather.condition}</p>
                </div>
              </div>
              <div className="text-right text-sm text-gray-600">
                <p className="flex items-center gap-1">
                  <Droplets className="h-3 w-3" />
                  {currentWeather.humidity}%
                </p>
                <p className="flex items-center gap-1">
                  <Wind className="h-3 w-3" />
                  {currentWeather.windSpeed} km/h
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-yellow-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Sun className="h-6 w-6" />
            {currentLang.title}
          </CardTitle>
          <p className="text-gray-600">{currentLang.subtitle}</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {currentWeather && (
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-blue-600" />
                {currentLang.current}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{currentWeather.icon}</span>
                  <div>
                    <p className="text-3xl font-bold text-gray-800">{currentWeather.temperature}°C</p>
                    <p className="text-gray-600">{currentWeather.condition}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-gray-600">{currentLang.humidity}</p>
                      <p className="font-semibold">{currentWeather.humidity}%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-gray-600">{currentLang.windSpeed}</p>
                      <p className="font-semibold">{currentWeather.windSpeed} km/h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Umbrella className="h-4 w-4 text-purple-500" />
                    <div>
                      <p className="text-gray-600">{currentLang.rainfall}</p>
                      <p className="font-semibold">{currentWeather.rainfall} mm</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-orange-500" />
                    <div>
                      <p className="text-gray-600">{currentLang.visibility}</p>
                      <p className="font-semibold">{currentWeather.visibility} km</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <h3 className="text-lg font-semibold mb-4">{currentLang.forecast}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {forecast.map((day, index) => (
                <div key={index} className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs font-medium text-gray-600 mb-1">{day.day}</p>
                  <span className="text-2xl block mb-1">{day.icon}</span>
                  <p className="text-sm font-bold text-gray-800">{day.temp}°C</p>
                  <p className="text-xs text-blue-600">{day.rain}%</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-green-700 flex items-center gap-2">
              <Sun className="h-5 w-5" />
              {currentLang.alerts}
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-green-600">✓ {currentLang.goodForFarming}</p>
              <p className="text-blue-600">💧 {currentLang.rainExpected}</p>
              <p className="text-orange-600">⚠️ {currentLang.highHumidity}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherCard;
