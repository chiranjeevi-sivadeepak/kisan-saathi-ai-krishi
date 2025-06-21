
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Bot, Store, Leaf, Search, MapPin, TrendingUp, Droplets, Calendar, Users, Award, Shield } from 'lucide-react';
import WeatherCard from '@/components/WeatherCard';
import MarketPrices from '@/components/MarketPrices';
import CropRecommendation from '@/components/CropRecommendation';
import IndiaMapDashboard from '@/components/IndiaMapDashboard';
import PestDetection from '@/components/PestDetection';
import WaterManagement from '@/components/WaterManagement';
import FarmingRoadmap from '@/components/FarmingRoadmap';
import CommunityForum from '@/components/CommunityForum';
import { useLanguage } from '@/hooks/useLanguage';

const Index = () => {
  const { language } = useLanguage();

  const translations = {
    english: {
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
      aboutUs: "About AgriPlatform",
      aboutDesc: "Transforming Indian Agriculture Through Technology",
      missionTitle: "Our Mission",
      missionDesc: "To empower farmers with cutting-edge technology, making agriculture more sustainable, profitable, and efficient across India.",
      visionTitle: "Our Vision",
      visionDesc: "Creating a digitally connected farming ecosystem where every farmer has access to smart agricultural solutions.",
      whyChooseTitle: "Why Choose AgriPlatform?",
      aiPowered: "AI-Powered Solutions",
      aiPoweredDesc: "Advanced machine learning algorithms provide personalized recommendations",
      trusted: "Trusted by Thousands",
      trustedDesc: "Over 10,000+ farmers trust our platform for their agricultural needs",
      support: "24/7 Expert Support",
      supportDesc: "Round-the-clock assistance from agricultural experts and technicians"
    },
    hindi: {
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
      aboutUs: "AgriPlatform के बारे में",
      aboutDesc: "प्रौद्योगिकी के माध्यम से भारतीय कृषि का रूपांतरण",
      missionTitle: "हमारा मिशन",
      missionDesc: "किसानों को अत्याधुनिक प्रौद्योगिकी से सशक्त बनाना, कृषि को अधिक टिकाऊ, लाभदायक और कुशल बनाना।",
      visionTitle: "हमारी दृष्टि",
      visionDesc: "एक डिजिटल रूप से जुड़ा कृषि पारिस्थितिकी तंत्र बनाना जहां हर किसान के पास स्मार्ट कृषि समाधान तक पहुंच हो।",
      whyChooseTitle: "AgriPlatform क्यों चुनें?",
      aiPowered: "AI-संचालित समाधान",
      aiPoweredDesc: "उन्नत मशीन लर्निंग एल्गोरिदम व्यक्तिगत सिफारिशें प्रदान करते हैं",
      trusted: "हजारों द्वारा भरोसेमंद",
      trustedDesc: "10,000+ से अधिक किसान अपनी कृषि आवश्यकताओं के लिए हमारे प्लेटफॉर्म पर भरोसा करते हैं",
      support: "24/7 विशेषज्ञ सहायता",
      supportDesc: "कृषि विशेषज्ञों और तकनीशियनों से चौबीसों घंटे सहायता"
    },
    telugu: {
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
      aboutUs: "AgriPlatform గురించి",
      aboutDesc: "సాంకేతికత ద్వారా భారతీయ వ్యవసాయాన్ని మార్చడం",
      missionTitle: "మా లక్ష్యం",
      missionDesc: "రైతులను అత్యాధునిక సాంకేతికతతో శక్తివంతం చేయడం, వ్యవసాయాన్ని మరింత స్థిరమైన, లాభదాయకమైన మరియు సమర్థవంతంగా చేయడం।",
      visionTitle: "మా దృష్టి",
      visionDesc: "ప్రతి రైతుకు స్మార్ట్ వ్యవసాయ పరిష్కారాలకు అందుబాటు ఉండే డిజిటల్‌గా అనుసంధానించబడిన వ్యవసాయ పర్యావరణ వ్యవస్థను సృష్టించడం।",
      whyChooseTitle: "AgriPlatform ను ఎందుకు ఎంచుకోవాలి?",
      aiPowered: "AI-ఆధారిత పరిష్కారాలు",
      aiPoweredDesc: "అధునాతన మెషిన్ లెర్నింగ్ అల్గోరిథమ్‌లు వ్యక్తిగతీకరించిన సిఫార్సులను అందిస్తాయి",
      trusted: "వేలాది మంది విశ్వసించారు",
      trustedDesc: "10,000+ మంది రైతులు తమ వ్యవసాయ అవసరాలకు మా ప్లాట్‌ఫారమ్‌ను విశ్వసిస్తున్నారు",
      support: "24/7 నిపుణుల మద్దతు",
      supportDesc: "వ్యవసాయ నిపుణులు మరియు సాంకేతిక నిపుణుల నుండి గుట్టగుట్టిన సహాయం"
    }
  };

  const currentLang = translations[language as keyof typeof translations] || translations.english;

  return (
    <div className="min-h-screen">
      {/* Background Image with Dark Overlay */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat animate-fade-in"
        style={{
          backgroundImage: `url('/lovable-uploads/2c4812fd-9034-4c57-a61e-b00898b3edcd.png')`
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Hero Section */}
      <section className="bg-black/40 backdrop-blur-sm text-white py-16 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-scale-in">
            🌾 {currentLang.hero}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
            {currentLang.heroDesc}
          </p>
          <p className="text-lg mb-8 opacity-80 max-w-3xl mx-auto animate-fade-in">
            {currentLang.heroSubDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Link to="/ai-assistant">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-3 transform hover:scale-105 transition-all duration-300">
                <Bot className="mr-2 h-5 w-5" />
                {currentLang.tryAI}
              </Button>
            </Link>
            <Link to="/fertilizer-shop">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-3 transform hover:scale-105 transition-all duration-300">
                <Store className="mr-2 h-5 w-5" />
                {currentLang.shopFertilizers}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-12 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white animate-fade-in">
            {currentLang.smartFarming}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Link to="/ai-assistant" className="animate-scale-in">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-blue-50/90 to-blue-100/90 backdrop-blur-sm h-full transform hover:scale-105">
                <CardHeader className="text-center">
                  <Bot className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                  <CardTitle className="text-blue-800">{currentLang.aiAssistant}</CardTitle>
                  <CardDescription>{currentLang.aiDesc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/crop-recommendations" className="animate-scale-in">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-orange-50/90 to-orange-100/90 backdrop-blur-sm h-full transform hover:scale-105">
                <CardHeader className="text-center">
                  <Leaf className="w-12 h-12 mx-auto text-orange-600 mb-4" />
                  <CardTitle className="text-orange-800">{currentLang.cropRecommendations}</CardTitle>
                  <CardDescription>{currentLang.cropDesc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/pest-detection" className="animate-scale-in">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-red-50/90 to-red-100/90 backdrop-blur-sm h-full transform hover:scale-105">
                <CardHeader className="text-center">
                  <Search className="w-12 h-12 mx-auto text-red-600 mb-4" />
                  <CardTitle className="text-red-800">{currentLang.pestDetection}</CardTitle>
                  <CardDescription>{currentLang.pestDesc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/fertilizer-shop" className="animate-scale-in">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-purple-50/90 to-purple-100/90 backdrop-blur-sm h-full transform hover:scale-105">
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
      <section className="py-12 bg-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-white animate-fade-in">
            <MapPin className="inline-block mr-2 h-8 w-8" />
            {currentLang.exploreIndia}
          </h2>
          <div className="animate-scale-in">
            <IndiaMapDashboard />
          </div>
        </div>
      </section>

      {/* Dashboard Components Grid */}
      <section className="py-12 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 animate-fade-in">
            <WeatherCard language={language} />
            <MarketPrices language={language} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 animate-fade-in">
            <CropRecommendation language={language} />
            <PestDetection language={language} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 animate-fade-in">
            <WaterManagement language={language} />
            <FarmingRoadmap language={language} />
          </div>
          
          <div className="animate-fade-in">
            <CommunityForum language={language} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-white mb-4">
              {currentLang.aboutUs}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {currentLang.aboutDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="animate-scale-in">
              <Card className="bg-white/10 backdrop-blur-sm border-0 text-white h-full">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <TrendingUp className="mr-3 h-8 w-8 text-blue-400" />
                    {currentLang.missionTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 text-lg">
                    {currentLang.missionDesc}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="animate-scale-in">
              <Card className="bg-white/10 backdrop-blur-sm border-0 text-white h-full">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Leaf className="mr-3 h-8 w-8 text-yellow-400" />
                    {currentLang.visionTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 text-lg">
                    {currentLang.visionDesc}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center mb-8 animate-fade-in">
            <h3 className="text-3xl font-bold text-white mb-8">
              {currentLang.whyChooseTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-scale-in">
            <Card className="bg-white/10 backdrop-blur-sm border-0 text-white text-center">
              <CardHeader>
                <Bot className="w-16 h-16 mx-auto text-blue-400 mb-4" />
                <CardTitle className="text-xl">{currentLang.aiPowered}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/90">{currentLang.aiPoweredDesc}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-0 text-white text-center">
              <CardHeader>
                <Users className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
                <CardTitle className="text-xl">{currentLang.trusted}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/90">{currentLang.trustedDesc}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-0 text-white text-center">
              <CardHeader>
                <Shield className="w-16 h-16 mx-auto text-orange-400 mb-4" />
                <CardTitle className="text-xl">{currentLang.support}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/90">{currentLang.supportDesc}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
