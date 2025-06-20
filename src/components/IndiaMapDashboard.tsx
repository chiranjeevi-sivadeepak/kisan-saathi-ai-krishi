
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MapPin, Thermometer, Droplets, Wind, Leaf, TrendingUp, Calendar, Sun } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  description: string;
}

interface CropSuggestion {
  name: string;
  suitability: number;
  season: 'current' | 'upcoming';
  reasons: string[];
}

const IndiaMapDashboard = () => {
  const [selectedState, setSelectedState] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [cropSuggestions, setCropSuggestions] = useState<CropSuggestion[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<'current' | 'upcoming'>('current');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Indian states with their coordinates
  const indianStates = [
    { name: 'Maharashtra', lat: 19.7515, lon: 75.7139, x: 450, y: 280 },
    { name: 'Karnataka', lat: 15.3173, lon: 75.7139, x: 450, y: 350 },
    { name: 'Tamil Nadu', lat: 11.1271, lon: 78.6569, x: 480, y: 400 },
    { name: 'Andhra Pradesh', lat: 15.9129, lon: 79.7400, x: 500, y: 340 },
    { name: 'Telangana', lat: 18.1124, lon: 79.0193, x: 490, y: 310 },
    { name: 'Kerala', lat: 10.8505, lon: 76.2711, x: 460, y: 420 },
    { name: 'Rajasthan', lat: 27.0238, lon: 74.2179, x: 420, y: 180 },
    { name: 'Gujarat', lat: 22.2587, lon: 71.1924, x: 380, y: 230 },
    { name: 'Madhya Pradesh', lat: 22.9734, lon: 78.6569, x: 460, y: 240 },
    { name: 'Uttar Pradesh', lat: 26.8467, lon: 80.9462, x: 520, y: 160 },
    { name: 'Bihar', lat: 25.0961, lon: 85.3131, x: 570, y: 170 },
    { name: 'West Bengal', lat: 22.9868, lon: 87.8550, x: 590, y: 200 },
    { name: 'Odisha', lat: 20.9517, lon: 85.0985, x: 570, y: 250 },
    { name: 'Punjab', lat: 31.1471, lon: 75.3412, x: 440, y: 120 },
    { name: 'Haryana', lat: 29.0588, lon: 76.0856, x: 460, y: 140 }
  ];

  // Mock weather data fetching (replace with actual OpenWeatherMap API)
  const fetchWeatherData = async (stateName: string) => {
    setLoading(true);
    try {
      // Mock API call - replace with actual OpenWeatherMap API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockWeatherData: WeatherData = {
        temperature: Math.round(25 + Math.random() * 15),
        humidity: Math.round(60 + Math.random() * 30),
        rainfall: Math.round(Math.random() * 100),
        windSpeed: Math.round(5 + Math.random() * 15),
        description: ['Clear Sky', 'Partly Cloudy', 'Rainy', 'Sunny'][Math.floor(Math.random() * 4)]
      };

      setWeatherData(mockWeatherData);
      generateCropSuggestions(mockWeatherData, stateName);
      
      toast({
        title: `Weather data loaded for ${stateName}`,
        description: `Temperature: ${mockWeatherData.temperature}°C, Humidity: ${mockWeatherData.humidity}%`
      });
    } catch (error) {
      toast({
        title: "Error fetching weather data",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateCropSuggestions = (weather: WeatherData, state: string) => {
    const cropDatabase = [
      {
        name: 'Rice',
        tempRange: [20, 35],
        humidityMin: 70,
        rainfallMin: 100,
        seasons: ['current', 'upcoming']
      },
      {
        name: 'Wheat',
        tempRange: [15, 25],
        humidityMin: 50,
        rainfallMin: 30,
        seasons: ['upcoming']
      },
      {
        name: 'Cotton',
        tempRange: [25, 35],
        humidityMin: 60,
        rainfallMin: 50,
        seasons: ['current']
      },
      {
        name: 'Sugarcane',
        tempRange: [20, 30],
        humidityMin: 75,
        rainfallMin: 120,
        seasons: ['current', 'upcoming']
      },
      {
        name: 'Maize',
        tempRange: [18, 32],
        humidityMin: 60,
        rainfallMin: 60,
        seasons: ['current', 'upcoming']
      },
      {
        name: 'Soybean',
        tempRange: [20, 30],
        humidityMin: 65,
        rainfallMin: 80,
        seasons: ['current']
      }
    ];

    const suggestions: CropSuggestion[] = [];

    cropDatabase.forEach(crop => {
      crop.seasons.forEach(season => {
        let suitability = 0;
        const reasons: string[] = [];

        // Temperature suitability
        if (weather.temperature >= crop.tempRange[0] && weather.temperature <= crop.tempRange[1]) {
          suitability += 40;
          reasons.push(`Ideal temperature (${weather.temperature}°C)`);
        } else {
          reasons.push(`Temperature ${weather.temperature < crop.tempRange[0] ? 'too low' : 'too high'}`);
        }

        // Humidity suitability
        if (weather.humidity >= crop.humidityMin) {
          suitability += 30;
          reasons.push(`Good humidity (${weather.humidity}%)`);
        } else {
          reasons.push(`Low humidity (${weather.humidity}%)`);
        }

        // Rainfall suitability
        if (weather.rainfall >= crop.rainfallMin) {
          suitability += 30;
          reasons.push(`Adequate rainfall (${weather.rainfall}mm)`);
        } else {
          reasons.push(`Low rainfall (${weather.rainfall}mm)`);
        }

        if (suitability > 0) {
          suggestions.push({
            name: crop.name,
            suitability,
            season: season as 'current' | 'upcoming',
            reasons
          });
        }
      });
    });

    // Sort by suitability
    suggestions.sort((a, b) => b.suitability - a.suitability);
    setCropSuggestions(suggestions);
  };

  const handleStateClick = (stateName: string) => {
    setSelectedState(stateName);
    fetchWeatherData(stateName);
  };

  const getFilteredCrops = () => {
    return cropSuggestions.filter(crop => crop.season === selectedSeason);
  };

  const getSuitabilityColor = (suitability: number) => {
    if (suitability >= 80) return 'bg-green-500';
    if (suitability >= 60) return 'bg-yellow-500';
    if (suitability >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const weatherChartData = weatherData ? [
    { name: 'Temperature', value: weatherData.temperature, unit: '°C', color: '#ff6b6b' },
    { name: 'Humidity', value: weatherData.humidity, unit: '%', color: '#4ecdc4' },
    { name: 'Rainfall', value: weatherData.rainfall, unit: 'mm', color: '#45b7d1' },
    { name: 'Wind Speed', value: weatherData.windSpeed, unit: 'km/h', color: '#96ceb4' }
  ] : [];

  const cropChartData = getFilteredCrops().slice(0, 6).map(crop => ({
    name: crop.name,
    suitability: crop.suitability,
    fill: crop.suitability >= 80 ? '#10b981' : crop.suitability >= 60 ? '#f59e0b' : '#ef4444'
  }));

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <MapPin className="h-6 w-6" />
            India Farming Dashboard
          </CardTitle>
          <p className="text-gray-600">Click on any state to get weather data and crop recommendations</p>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* India Map */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Select State
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-blue-50 rounded-lg p-4" style={{ height: '400px' }}>
              <svg viewBox="0 0 800 500" className="w-full h-full">
                {/* Simplified India outline */}
                <path
                  d="M200,100 L600,100 L650,150 L680,200 L650,250 L680,300 L650,350 L600,400 L400,450 L200,400 L150,350 L120,300 L150,250 L120,200 L150,150 Z"
                  fill="#e5f3ff"
                  stroke="#0ea5e9"
                  strokeWidth="2"
                />
                
                {/* State markers */}
                {indianStates.map((state, index) => (
                  <g key={index}>
                    <circle
                      cx={state.x}
                      cy={state.y}
                      r="8"
                      fill={selectedState === state.name ? "#ef4444" : "#10b981"}
                      stroke="white"
                      strokeWidth="2"
                      className="cursor-pointer hover:r-10 transition-all"
                      onClick={() => handleStateClick(state.name)}
                    />
                    <text
                      x={state.x}
                      y={state.y - 15}
                      textAnchor="middle"
                      fontSize="10"
                      fill="#374151"
                      className="pointer-events-none"
                    >
                      {state.name}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            {selectedState && (
              <div className="mt-4 text-center">
                <Badge variant="default" className="bg-green-500">
                  Selected: {selectedState}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Weather Data */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5" />
              Weather Data
              {selectedState && <Badge variant="outline">{selectedState}</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              </div>
            ) : weatherData ? (
              <div className="space-y-4">
                <ChartContainer
                  config={{
                    temperature: { label: "Temperature", color: "#ff6b6b" },
                    humidity: { label: "Humidity", color: "#4ecdc4" },
                    rainfall: { label: "Rainfall", color: "#45b7d1" },
                    windSpeed: { label: "Wind Speed", color: "#96ceb4" }
                  }}
                >
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={weatherChartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                    <Thermometer className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-sm text-gray-600">Temperature</p>
                      <p className="font-semibold">{weatherData.temperature}°C</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600">Humidity</p>
                      <p className="font-semibold">{weatherData.humidity}%</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                Select a state to view weather data
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Crop Suggestions */}
      {cropSuggestions.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5" />
                Crop Recommendations
                <Badge variant="outline">{selectedState}</Badge>
              </CardTitle>
              <ToggleGroup type="single" value={selectedSeason} onValueChange={(value) => value && setSelectedSeason(value as 'current' | 'upcoming')}>
                <ToggleGroupItem value="current">Current Season</ToggleGroupItem>
                <ToggleGroupItem value="upcoming">Upcoming Season</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Crop Cards */}
              <div className="space-y-4">
                {getFilteredCrops().slice(0, 4).map((crop, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-lg">{crop.name}</h4>
                        <Badge className={`${getSuitabilityColor(crop.suitability)} text-white`}>
                          {crop.suitability}% Suitable
                        </Badge>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {crop.reasons.map((reason, reasonIndex) => (
                          <li key={reasonIndex} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Suitability Chart */}
              <div>
                <h4 className="font-semibold mb-4">Crop Suitability Chart</h4>
                <ChartContainer
                  config={{
                    suitability: { label: "Suitability", color: "#10b981" }
                  }}
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={cropChartData} layout="horizontal">
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={80} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="suitability" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IndiaMapDashboard;
