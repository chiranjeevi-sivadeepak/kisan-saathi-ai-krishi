
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MarketPricesProps {
  language: string;
  compact?: boolean;
}

const MarketPrices: React.FC<MarketPricesProps> = ({ language, compact = false }) => {
  const [marketData, setMarketData] = useState<any[]>([]);
  const [priceAlerts, setPriceAlerts] = useState<any[]>([]);

  const translations = {
    english: {
      title: "Market Prices & Demand",
      subtitle: "Real-time crop prices and market predictions",
      currentPrices: "Current Market Prices",
      priceAlerts: "Price Alerts",
      demandForecast: "Demand Forecast",
      pricePerKg: "Price per kg",
      change: "24h Change",
      demand: "Demand",
      high: "High",
      medium: "Medium",
      low: "Low",
      rising: "Rising",
      falling: "Falling",
      stable: "Stable"
    },
    hindi: {
      title: "बाजार मूल्य और मांग",
      subtitle: "वास्तविक समय फसल की कीमतें और बाजार की भविष्यवाणी",
      currentPrices: "वर्तमान बाजार मूल्य",
      priceAlerts: "मूल्य अलर्ट",
      demandForecast: "मांग पूर्वानुमान",
      pricePerKg: "प्रति किलो मूल्य",
      change: "24 घंटे का बदलाव",
      demand: "मांग",
      high: "उच्च",
      medium: "मध्यम",
      low: "कम",
      rising: "बढ़ रहा",
      falling: "गिर रहा",
      stable: "स्थिर"
    },
    telugu: {
      title: "మార్కెట్ ధరలు & డిమాండ్",
      subtitle: "రియల్ టైమ్ పంట ధరలు మరియు మార్కెట్ అంచనాలు",
      currentPrices: "ప్రస్తుత మార్కెట్ ధరలు",
      priceAlerts: "ధర హెచ్చరికలు",
      demandForecast: "డిమాండ్ అంచనా",
      pricePerKg: "కిలోకు ధర",
      change: "24 గంటల మార్పు",
      demand: "డిమాండ్",
      high: "అధిక",
      medium: "మధ్యస్థ",
      low: "తక్కువ",
      rising: "పెరుగుతున్న",
      falling: "తగ్గుతున్న",
      stable: "స్థిరమైన"
    }
  };

  const currentLang = translations[language];

  useEffect(() => {
    // Mock market data
    const mockMarketData = [
      { 
        crop: 'Rice', 
        icon: '🌾', 
        price: 25, 
        change: +2.5, 
        demand: 'high',
        trend: 'rising',
        unit: 'kg'
      },
      { 
        crop: 'Wheat', 
        icon: '🌾', 
        price: 22, 
        change: -1.2, 
        demand: 'medium',
        trend: 'falling',
        unit: 'kg'
      },
      { 
        crop: 'Maize', 
        icon: '🌽', 
        price: 18, 
        change: +0.8, 
        demand: 'high',
        trend: 'stable',
        unit: 'kg'
      },
      { 
        crop: 'Potato', 
        icon: '🥔', 
        price: 12, 
        change: +3.2, 
        demand: 'medium',
        trend: 'rising',
        unit: 'kg'
      },
      { 
        crop: 'Onion', 
        icon: '🧅', 
        price: 35, 
        change: -5.1, 
        demand: 'low',
        trend: 'falling',
        unit: 'kg'
      },
      { 
        crop: 'Tomato', 
        icon: '🍅', 
        price: 28, 
        change: +1.5, 
        demand: 'high',
        trend: 'rising',
        unit: 'kg'
      }
    ];

    const mockAlerts = [
      { crop: 'Rice', message: 'Price expected to rise by 15% next week', type: 'positive' },
      { crop: 'Onion', message: 'Price dropping due to oversupply', type: 'negative' },
      { crop: 'Tomato', message: 'High demand in nearby markets', type: 'positive' }
    ];

    setMarketData(mockMarketData);
    setPriceAlerts(mockAlerts);
  }, []);

  const getDemandLabel = (demand: string) => {
    switch (demand) {
      case 'high': return currentLang.high;
      case 'medium': return currentLang.medium;
      case 'low': return currentLang.low;
      default: return demand;
    }
  };

  const getTrendLabel = (trend: string) => {
    switch (trend) {
      case 'rising': return currentLang.rising;
      case 'falling': return currentLang.falling;
      case 'stable': return currentLang.stable;
      default: return trend;
    }
  };

  if (compact) {
    return (
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-purple-700 text-lg">
            <TrendingUp className="h-5 w-5" />
            {currentLang.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {marketData.slice(0, 3).map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium text-gray-800">{item.crop}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">₹{item.price}</p>
                  <p className={`text-xs flex items-center gap-1 ${
                    item.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.change > 0 ? 
                      <TrendingUp className="h-3 w-3" /> : 
                      <TrendingDown className="h-3 w-3" />
                    }
                    {Math.abs(item.change)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <TrendingUp className="h-6 w-6" />
            {currentLang.title}
          </CardTitle>
          <p className="text-gray-600">{currentLang.subtitle}</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-purple-600" />
              {currentLang.currentPrices}
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {marketData.map((item, index) => (
                <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{item.icon}</span>
                        <h4 className="font-semibold text-gray-800">{item.crop}</h4>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-800">₹{item.price}</p>
                        <p className="text-xs text-gray-500">per {item.unit}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">{currentLang.change}:</span>
                        <span className={`font-medium flex items-center gap-1 ${
                          item.change > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.change > 0 ? 
                            <TrendingUp className="h-3 w-3" /> : 
                            <TrendingDown className="h-3 w-3" />
                          }
                          {Math.abs(item.change)}%
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">{currentLang.demand}:</span>
                        <span className={`font-medium ${
                          item.demand === 'high' ? 'text-green-600' :
                          item.demand === 'medium' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {getDemandLabel(item.demand)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Trend:</span>
                        <span className="font-medium text-blue-600">
                          {getTrendLabel(item.trend)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              {currentLang.priceAlerts}
            </h3>
            
            <div className="space-y-3">
              {priceAlerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'positive' ? 
                    'bg-green-50 border-green-400' : 
                    'bg-red-50 border-red-400'
                }`}>
                  <div className="flex items-start gap-3">
                    <span className={`text-sm font-medium ${
                      alert.type === 'positive' ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {alert.crop}
                    </span>
                    <p className={`text-sm ${
                      alert.type === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {alert.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketPrices;
