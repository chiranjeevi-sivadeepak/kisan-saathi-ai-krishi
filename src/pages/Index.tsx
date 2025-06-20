
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mic, MessageCircle, Leaf, Umbrella, Sun, Phone, WifiOff, Users, TrendingUp, Droplets, Bug, Map, Calendar, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AIAssistant from '@/components/AIAssistant';
import CropRecommendation from '@/components/CropRecommendation';
import WeatherCard from '@/components/WeatherCard';
import MarketPrices from '@/components/MarketPrices';
import PestDetection from '@/components/PestDetection';
import WaterManagement from '@/components/WaterManagement';
import CommunityForum from '@/components/CommunityForum';
import FarmingRoadmap from '@/components/FarmingRoadmap';

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [activeView, setActiveView] = useState('dashboard');
  const [isOffline, setIsOffline] = useState(false);
  const { toast } = useToast();

  const languages = {
    english: { code: 'en', name: 'English', flag: '🇺🇸' },
    hindi: { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    telugu: { code: 'te', name: 'తెలుగు', flag: '🇮🇳' }
  };

  const translations = {
    english: {
      title: "Smart Farming Companion",
      subtitle: "AI-powered agriculture & water management",
      dashboard: "Dashboard",
      aiAssistant: "AI Assistant",
      cropRecommendation: "Crop Recommendation",
      waterManagement: "Water Management",
      pestDetection: "Pest Detection",
      weather: "Weather",
      marketPrices: "Market Prices",
      community: "Community",
      roadmap: "Farming Roadmap",
      offlineMode: "Offline Mode Active",
      greeting: "Welcome, farmer! How can I help you today?",
      quickActions: "Quick Actions"
    },
    hindi: {
      title: "स्मार्ट फार्मिंग साथी",
      subtitle: "AI-संचालित कृषि और जल प्रबंधन",
      dashboard: "डैशबोर्ड",
      aiAssistant: "AI सहायक",
      cropRecommendation: "फसल सिफारिश",
      waterManagement: "जल प्रबंधन",
      pestDetection: "कीट पहचान",
      weather: "मौसम",
      marketPrices: "बाजार मूल्य",
      community: "समुदाय",
      roadmap: "खेती रोडमैप",
      offlineMode: "ऑफलाइन मोड सक्रिय",
      greeting: "स्वागत है, किसान! आज मैं आपकी कैसे मदद कर सकता हूं?",
      quickActions: "त्वरित कार्य"
    },
    telugu: {
      title: "స్మార్ట్ ఫార్మింగ్ కంపానియన్",
      subtitle: "AI-ఆధారిత వ్యవసాయం & నీటి నిర్వహణ",
      dashboard: "డాష్‌బోర్డ్",
      aiAssistant: "AI అసిస్టెంట్",
      cropRecommendation: "పంట సిఫార్సు",
      waterManagement: "నీటి నిర్వహణ",
      pestDetection: "కీటకాల గుర్తింపు",
      weather: "వాతావరణం",
      marketPrices: "మార్కెట్ ధరలు",
      community: "కమ్యూనిటీ",
      roadmap: "వ్యవసాయ రోడ్‌మ్యాప్",
      offlineMode: "ఆఫ్‌లైన్ మోడ్ యాక్టివ్",
      greeting: "స్వాగతం, రైతు గారూ! ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?",
      quickActions: "త్వరిత చర్యలు"
    }
  };

  const currentLang = translations[selectedLanguage];

  useEffect(() => {
    const handleOnlineStatus = () => setIsOffline(!navigator.onLine);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    handleOnlineStatus();
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const quickActionItems = [
    { key: 'aiAssistant', icon: MessageCircle, label: currentLang.aiAssistant, color: 'bg-green-500' },
    { key: 'cropRecommendation', icon: Leaf, label: currentLang.cropRecommendation, color: 'bg-emerald-500' },
    { key: 'waterManagement', icon: Droplets, label: currentLang.waterManagement, color: 'bg-blue-500' },
    { key: 'pestDetection', icon: Bug, label: currentLang.pestDetection, color: 'bg-orange-500' },
    { key: 'weather', icon: Sun, label: currentLang.weather, color: 'bg-yellow-500' },
    { key: 'marketPrices', icon: TrendingUp, label: currentLang.marketPrices, color: 'bg-purple-500' },
    { key: 'community', icon: Users, label: currentLang.community, color: 'bg-indigo-500' },
    { key: 'roadmap', icon: Map, label: currentLang.roadmap, color: 'bg-teal-500' }
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'aiAssistant':
        return <AIAssistant language={selectedLanguage} />;
      case 'cropRecommendation':
        return <CropRecommendation language={selectedLanguage} />;
      case 'waterManagement':
        return <WaterManagement language={selectedLanguage} />;
      case 'pestDetection':
        return <PestDetection language={selectedLanguage} />;
      case 'weather':
        return <WeatherCard language={selectedLanguage} />;
      case 'marketPrices':
        return <MarketPrices language={selectedLanguage} />;
      case 'community':
        return <CommunityForum language={selectedLanguage} />;
      case 'roadmap':
        return <FarmingRoadmap language={selectedLanguage} />;
      default:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentLang.greeting}</h2>
              <p className="text-gray-600">🌱 {currentLang.subtitle} 🌱</p>
            </div>

            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-700 flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  {currentLang.quickActions}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActionItems.map((item) => (
                    <Button
                      key={item.key}
                      variant="outline"
                      className="h-20 flex-col gap-2 hover:scale-105 transition-all duration-200 border-2 hover:border-green-300"
                      onClick={() => setActiveView(item.key)}
                    >
                      <item.icon className={`h-6 w-6 text-white p-1 rounded ${item.color}`} />
                      <span className="text-xs text-center">{item.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <WeatherCard language={selectedLanguage} compact />
              <MarketPrices language={selectedLanguage} compact />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">{currentLang.title}</h1>
                  <p className="text-xs text-gray-500">🌾 Smart Agriculture AI</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {isOffline && (
                <div className="flex items-center gap-1 text-orange-600 text-sm">
                  <WifiOff className="h-4 w-4" />
                  <span className="hidden sm:block">{currentLang.offlineMode}</span>
                </div>
              )}
              
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue>
                    <span className="flex items-center gap-2">
                      {languages[selectedLanguage].flag}
                      <span className="hidden sm:block">{languages[selectedLanguage].name}</span>
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(languages).map(([key, lang]) => (
                    <SelectItem key={key} value={key}>
                      <span className="flex items-center gap-2">
                        {lang.flag} {lang.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto space-x-1 py-2">
            <Button
              variant={activeView === 'dashboard' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('dashboard')}
              className="whitespace-nowrap"
            >
              {currentLang.dashboard}
            </Button>
            {quickActionItems.map((item) => (
              <Button
                key={item.key}
                variant={activeView === item.key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView(item.key)}
                className="whitespace-nowrap flex items-center gap-1"
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:block">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </main>

      {/* Floating Voice Assistant Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="h-14 w-14 rounded-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          onClick={() => setActiveView('aiAssistant')}
        >
          <Mic className="h-6 w-6 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
