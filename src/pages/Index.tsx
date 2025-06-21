
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Bot, Store, Leaf, Search, MapPin, TrendingUp, Droplets, Calendar } from 'lucide-react';
import WeatherCard from '@/components/WeatherCard';
import MarketPrices from '@/components/MarketPrices';
import CropRecommendation from '@/components/CropRecommendation';
import IndiaMapDashboard from '@/components/IndiaMapDashboard';
import PestDetection from '@/components/PestDetection';
import WaterManagement from '@/components/WaterManagement';
import FarmingRoadmap from '@/components/FarmingRoadmap';
import Community

Forum from '@/components/CommunityForum';
import { useLanguage } from '@/hooks/useLanguage';

const Index = () => {
  const { language } = useLanguage();

  const translations = {
    english: {
      getStarted: "Get Started Today",
      getStartedDesc: "Join thousands of farmers who are already using AgriPlatform to increase their yields and profits.",
      hero: "Welcome to AgriPlatform",
      heroDesc: "Your Complete Digital Farming Companion",
      heroSubDesc: "Empowering Indian farmers with AI-driven insights, smart crop recommendations, weather forecasting, an integrated fertilizer marketplace, and comprehensive farm management tools.",
      tryAI: "Try AI Assistant",
      shopFertilizers: "Shop Fertilizers",
      smartFarming: "Everything You Need for Smart Farming",
      aiAssistant: "AI Assistant",
      aiDesc: "Get personalized farming advice and crop guidance",
      cropRecommendations: "Crop Recommendations", 
      cropDesc: "AI-powered crop suggestions based on your conditions",
      pestDetection: "Pest Detection",
      pestDesc: "Upload plant images for instant pest identification",
      fertilizerShop: "Fertilizer Shop",
      fertilizerDesc: "Browse and buy quality fertilizers for your crops",
      exploreIndia: "Explore Farming Across India",
      readyToTransform: "Ready to Transform Your Farming?"
    },
    hindi: {
      getStarted: "आज ही शुरू करें",
      getStartedDesc: "हजारों किसानों के साथ जुड़ें जो पहले से ही AgriPlatform का उपयोग करके अपनी उपज और मुनाफे में वृद्धि कर रहे हैं।",
      hero: "AgriPlatform में आपका स्वागत है",
      heroDesc: "आपका संपूर्ण डिजिटल कृषि साथी",
      heroSubDesc: "भारतीय किसानों को AI-संचालित अंतर्दृष्टि, स्मार्ट फसल सिफारिशों, मौसम पूर्वानुमान, एक एकीकृत उर्वरक बाज़ार और व्यापक कृषि प्रबंधन उपकरणों के साथ सशक्त बनाना।",
      tryAI: "AI सहायक आज़माएं",
      shopFertilizers: "उर्वरक खरीदें",
      smartFarming: "स्मार्ट फार्मिंग के लिए सब कुछ",
      aiAssistant: "AI सहायक",
      aiDesc: "व्यक्तिगत कृषि सलाह और फसल मार्गदर्शन प्राप्त करें",
      cropRecommendations: "फसल सिफारिशें",
      cropDesc: "आपकी स्थितियों के आधार पर AI-संचालित फसल सुझाव",
      pestDetection: "कीट पहचान",
      pestDesc: "तत्काल कीट पहचान के लिए पौधे की छवियां अपलोड करें",
      fertilizerShop: "उर्वरक दुकान",
      fertilizerDesc: "अपनी फसलों के लिए गुणवत्तापूर्ण उर्वरक ब्राउज़ करें और खरीदें",
      exploreIndia: "पूरे भारत में कृषि की खोज करें",
      readyToTransform: "अपनी खेती को बदलने के लिए तैयार हैं?"
    },
    telugu: {
      getStarted: "ఈరోజే ప్రారంభించండి",
      getStartedDesc: "AgriPlatform ఉపయోగించి వారి దిగుబడులు మరియు లాభాలను పెంచుకుంటున్న వేలాది మంది రైతులతో చేరండి।",
      hero: "AgriPlatform కు స్వాగతం",
      heroDesc: "మీ పూర్తి డిజిటల్ వ్యవసాయ సహచరుడు",
      heroSubDesc: "భారతీయ రైతులను AI-ఆధారిత అంతర్దృష్టులు, స్మార్ట్ పంట సిఫార్సులు, వాతావరణ అంచనాలు, ఏకీకృత ఎరువుల మార్కెట్‌ప్లేస్ మరియు సమగ్ర వ్యవసాయ నిర్వహణ సాధనాలతో శక్తివంతం చేయడం।",
      tryAI: "AI అసిస్టెంట్‌ను ప్రయత్నించండి",
      shopFertilizers: "ఎరువులు కొనుక్కోండి",
      smartFarming: "స్మార్ట్ వ్యవసాయానికి అవసరమైనవన్నీ",
      aiAssistant: "AI అసిస్టెంట్",
      aiDesc: "వ్యక్తిగతీకరించిన వ్యవసాయ సలహాలు మరియు పంట మార్గదర్శకత్వం పొందండి",
      cropRecommendations: "పంట సిఫార్సులు",
      cropDesc: "మీ పరిస్థితుల ఆధారంగా AI-ఆధారిత పంట సూచనలు",
      pestDetection: "కీటకాల గుర్తింపు",
      pestDesc: "తక్షణ కీటకాల గుర్తింపు కోసం మొక్కల చిత్రాలను అప్‌లోడ్ చేయండి",
      fertilizerShop: "ఎరువుల దుకాణం",
      fertilizerDesc: "మీ పంటలకు నాణ్యమైన ఎరువులను బ్రౌజ్ చేసి కొనుక్కోండి",
      exploreIndia: "భారతదేశంలో వ్యవసాయాన్ని అన్వేషించండి",
      readyToTransform: "మీ వ్యవసాయాన్ని మార్చడానికి సిద్ధంగా ఉన్నారా?"
    }
  };

  const currentLang = translations[language as keyof typeof translations] || translations.english;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Get Started Section - Moved to Top */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">{currentLang.getStarted}</h2>
          <p className="text-xl mb-8 opacity-90">
            {currentLang.getStartedDesc}
          </p>
          <Link to="/auth?mode=signup">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg">
              {currentLang.getStarted}
            </Button>
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            🌾 {currentLang.hero}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {currentLang.heroDesc}
          </p>
          <p className="text-lg mb-8 opacity-80 max-w-3xl mx-auto">
            {currentLang.heroSubDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ai-assistant">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
                <Bot className="mr-2 h-5 w-5" />
                {currentLang.tryAI}
              </Button>
            </Link>
            <Link to="/fertilizer-shop">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3">
                <Store className="mr-2 h-5 w-5" />
                {currentLang.shopFertilizers}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            {currentLang.smartFarming}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Link to="/ai-assistant">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 bg-gradient-to-br from-blue-50 to-blue-100 h-full">
                <CardHeader className="text-center">
                  <Bot className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                  <CardTitle className="text-blue-800">{currentLang.aiAssistant}</CardTitle>
                  <CardDescription>{currentLang.aiDesc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/crop-recommendations">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 bg-gradient-to-br from-green-50 to-green-100 h-full">
                <CardHeader className="text-center">
                  <Leaf className="w-12 h-12 mx-auto text-green-600 mb-4" />
                  <CardTitle className="text-green-800">{currentLang.cropRecommendations}</CardTitle>
                  <CardDescription>{currentLang.cropDesc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/pest-detection">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 bg-gradient-to-br from-orange-50 to-orange-100 h-full">
                <CardHeader className="text-center">
                  <Search className="w-12 h-12 mx-auto text-orange-600 mb-4" />
                  <CardTitle className="text-orange-800">{currentLang.pestDetection}</CardTitle>
                  <CardDescription>{currentLang.pestDesc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/fertilizer-shop">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 bg-gradient-to-br from-purple-50 to-purple-100 h-full">
                <CardHeader className="text-center">
                  <Store className="w-12 h-12 mx-auto text-purple-600 mb-4" />
                  <CardTitle className="text-purple-800">{currentLang.fertilizerShop}</CardTitle>
                  <CardDescription>{currentLang.fertilizerDesc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive India Map */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            <MapPin className="inline-block mr-2 h-8 w-8" />
            {currentLang.exploreIndia}
          </h2>
          <IndiaMapDashboard />
        </div>
      </section>

      {/* Dashboard Components Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <WeatherCard language={language} />
            <MarketPrices language={language} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <CropRecommendation language={language} />
            <PestDetection language={language} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <WaterManagement language={language} />
            <FarmingRoadmap language={language} />
          </div>
          
          <CommunityForum language={language} />
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">{currentLang.readyToTransform}</h2>
          <p className="text-xl mb-8 opacity-90">
            {currentLang.getStartedDesc}
          </p>
          <Link to="/auth?mode=signup">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
              {currentLang.getStarted}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
