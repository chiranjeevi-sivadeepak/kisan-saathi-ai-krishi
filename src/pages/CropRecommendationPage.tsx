
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf, MapPin, Thermometer, Droplets, Calendar, TrendingUp, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface CropRecommendationPageProps {
  language: string;
}

const CropRecommendationPage: React.FC<CropRecommendationPageProps> = ({ language }) => {
  const [soilType, setSoilType] = useState('');
  const [season, setSeason] = useState('');
  const [region, setRegion] = useState('');
  const [waterAvailability, setWaterAvailability] = useState('');
  const [fieldSize, setFieldSize] = useState('');
  const [budget, setBudget] = useState('');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const translations = {
    english: {
      title: "AI-Powered Crop Recommendation System",
      subtitle: "Get personalized crop suggestions using advanced AI algorithms",
      soilType: "Soil Type",
      season: "Season",
      region: "Region",
      waterAvailability: "Water Availability",
      fieldSize: "Field Size (acres)",
      budget: "Investment Budget (₹)",
      getRecommendations: "Get AI Recommendations",
      recommendedCrops: "AI Recommended Crops",
      expectedYield: "Expected Yield",
      profitMargin: "Profit Potential",
      growthPeriod: "Growth Period",
      riskLevel: "Risk Level",
      marketDemand: "Market Demand",
      fertilizers: "Recommended Fertilizers",
      highWater: "High",
      moderateWater: "Moderate", 
      lowWater: "Low",
      kharif: "Kharif (Monsoon)",
      rabi: "Rabi (Winter)",
      summer: "Summer",
      allYear: "All Year",
      analyzing: "Analyzing soil and climate data...",
      high: "High",
      medium: "Medium",
      low: "Low"
    },
    hindi: {
      title: "AI-संचालित फसल सिफारिश प्रणाली",
      subtitle: "उन्नत AI एल्गोरिदम का उपयोग करके व्यक्तिगत फसल सुझाव प्राप्त करें",
      soilType: "मिट्टी का प्रकार",
      season: "मौसम",
      region: "क्षेत्र",
      waterAvailability: "पानी की उपलब्धता",
      fieldSize: "खेत का आकार (एकड़)",
      budget: "निवेश बजट (₹)",
      getRecommendations: "AI सिफारिशें प्राप्त करें",
      recommendedCrops: "AI अनुशंसित फसलें",
      expectedYield: "अपेक्षित उत्पादन",
      profitMargin: "लाभ की संभावना",
      growthPeriod: "वृद्धि अवधि",
      riskLevel: "जोखिम स्तर",
      marketDemand: "बाजार मांग",
      fertilizers: "अनुशंसित उर्वरक",
      highWater: "उच्च",
      moderateWater: "मध्यम",
      lowWater: "कम",
      kharif: "खरीफ (मानसून)",
      rabi: "रबी (सर्दी)",
      summer: "गर्मी",
      allYear: "पूरे साल",
      analyzing: "मिट्टी और जलवायु डेटा का विश्लेषण कर रहे हैं...",
      high: "उच्च",
      medium: "मध्यम",
      low: "कम"
    },
    telugu: {
      title: "AI-ఆధారిత పంట సిఫార్సు వ్యవస్థ",
      subtitle: "అధునాతన AI అల్గోరిదంలను ఉపయోగించి వ్యక్తిగత పంట సూచనలను పొందండి",
      soilType: "నేల రకం",
      season: "కాలం",
      region: "ప్రాంతం",
      waterAvailability: "నీటి లభ్యత",
      fieldSize: "పొలం పరిమాణం (ఎకరాలు)",
      budget: "పెట్టుబడి బడ్జెట్ (₹)",
      getRecommendations: "AI సిఫార్సులు పొందండి",
      recommendedCrops: "AI సిఫార్సు చేయబడిన పంటలు",
      expectedYield: "ఆశించిన దిగుబడి",
      profitMargin: "లాభ సంభావ్యత",
      growthPeriod: "వృద్ధి కాలం",
      riskLevel: "రిస్క్ స్థాయి",
      marketDemand: "మార్కెట్ డిమాండ్",
      fertilizers: "సిఫార్సు చేయబడిన ఎరువులు",
      highWater: "అధిక",
      moderateWater: "మధ్యస్థ",
      lowWater: "తక్కువ",
      kharif: "ఖరీఫ్ (వర్షాకాలం)",
      rabi: "రబీ (చల్లకాలం)",
      summer: "వేసవి",
      allYear: "ఏడాది పొడవునా",
      analyzing: "మట్టి మరియు వాతావరణ డేటాను విశ్లేషిస్తోంది...",
      high: "అధిక",
      medium: "మధ్యస్థ",
      low: "తక్కువ"
    }
  };

  const currentLang = translations[language as keyof typeof translations] || translations.english;

  const soilTypes = ['Clay', 'Sandy', 'Loamy', 'Black Cotton', 'Red', 'Alluvial'];
  const seasons = [
    { value: 'kharif', label: currentLang.kharif },
    { value: 'rabi', label: currentLang.rabi },
    { value: 'summer', label: currentLang.summer },
    { value: 'all-year', label: currentLang.allYear }
  ];
  const regions = ['North India', 'South India', 'East India', 'West India', 'Central India'];
  const waterLevels = [
    { value: 'high', label: currentLang.highWater },
    { value: 'moderate', label: currentLang.moderateWater },
    { value: 'low', label: currentLang.lowWater }
  ];

  const generateAIRecommendations = async () => {
    if (!soilType || !season || !region || !waterAvailability) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const aiRecommendations = [
        {
          name: 'Rice (Basmati)',
          yield: '8-10 tons/hectare',
          profit: 'Very High',
          period: '120-150 days',
          icon: '🌾',
          risk: 'Low',
          demand: 'High',
          fertilizers: ['Urea', 'DAP', 'Potash'],
          aiScore: 95,
          marketPrice: '₹3200/quintal',
          tips: ['Use certified seeds', 'Maintain water level 2-3 cm', 'Apply fertilizer in 3 splits']
        },
        {
          name: 'Wheat (HD-3086)',
          yield: '6-8 tons/hectare',
          profit: 'High',
          period: '120-140 days',
          icon: '🌾',
          risk: 'Medium',
          demand: 'High',
          fertilizers: ['NPK', 'Zinc Sulphate'],
          aiScore: 88,
          marketPrice: '₹2800/quintal',
          tips: ['Sow by mid-November', 'Use drip irrigation', 'Apply fungicide for rust prevention']
        },
        {
          name: 'Maize (Hybrid)',
          yield: '12-15 tons/hectare',
          profit: 'Very High',
          period: '90-120 days',
          icon: '🌽',
          risk: 'Medium',
          demand: 'Very High',
          fertilizers: ['Urea', 'Single Super Phosphate'],
          aiScore: 92,
          marketPrice: '₹2200/quintal',
          tips: ['Plant spacing 60x20 cm', 'Side dress with nitrogen', 'Control stem borer']
        }
      ];

      setRecommendations(aiRecommendations);
      setIsLoading(false);
      
      toast({
        title: "AI Analysis Complete",
        description: `Found ${aiRecommendations.length} optimal crop recommendations`,
      });
    }, 3000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <Leaf className="inline-block mr-2 h-10 w-10 text-green-600" />
            {currentLang.title}
          </h1>
          <p className="text-xl text-gray-600">{currentLang.subtitle}</p>
        </div>

        <Card className="bg-white shadow-xl border-green-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <TrendingUp className="h-6 w-6" />
              Input Parameters for AI Analysis
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {currentLang.soilType} *
                </Label>
                <Select value={soilType} onValueChange={setSoilType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    {soilTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {currentLang.season} *
                </Label>
                <Select value={season} onValueChange={setSeason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    {seasons.map(s => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {currentLang.region} *
                </Label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map(r => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  {currentLang.waterAvailability} *
                </Label>
                <Select value={waterAvailability} onValueChange={setWaterAvailability}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select water availability" />
                  </SelectTrigger>
                  <SelectContent>
                    {waterLevels.map(w => (
                      <SelectItem key={w.value} value={w.value}>{w.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{currentLang.fieldSize}</Label>
                <Input
                  type="number"
                  value={fieldSize}
                  onChange={(e) => setFieldSize(e.target.value)}
                  placeholder="Enter field size"
                />
              </div>

              <div className="space-y-2">
                <Label>{currentLang.budget}</Label>
                <Input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Enter budget"
                />
              </div>
            </div>

            <Button 
              onClick={generateAIRecommendations}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-lg py-6"
              disabled={!soilType || !season || !region || !waterAvailability || isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {currentLang.analyzing}
                </>
              ) : (
                <>
                  <Leaf className="h-5 w-5 mr-2" />
                  {currentLang.getRecommendations}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {recommendations.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" />
              {currentLang.recommendedCrops}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((crop, index) => (
                <Card key={index} className="border-green-200 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{crop.icon}</span>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{crop.name}</h3>
                          <Badge className="bg-green-500 text-white">
                            AI Score: {crop.aiScore}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{currentLang.expectedYield}:</span>
                        <span className="font-semibold text-green-600">{crop.yield}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{currentLang.profitMargin}:</span>
                        <span className={`font-semibold ${
                          crop.profit === 'Very High' ? 'text-green-600' :
                          crop.profit === 'High' ? 'text-green-500' : 'text-yellow-500'
                        }`}>{crop.profit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{currentLang.growthPeriod}:</span>
                        <span className="font-semibold">{crop.period}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{currentLang.riskLevel}:</span>
                        <Badge className={getRiskColor(crop.risk)}>{crop.risk}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Market Price:</span>
                        <span className="font-bold text-blue-600">{crop.marketPrice}</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">{currentLang.fertilizers}:</h4>
                      <div className="flex flex-wrap gap-1">
                        {crop.fertilizers.map((fert, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {fert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">AI Tips:</h4>
                      <ul className="text-xs space-y-1">
                        {crop.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <span className="text-green-500 mt-0.5">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropRecommendationPage;
