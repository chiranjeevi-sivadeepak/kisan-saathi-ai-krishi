
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf, MapPin, Thermometer, Droplets, Calendar } from 'lucide-react';

interface CropRecommendationProps {
  language: string;
}

const CropRecommendation: React.FC<CropRecommendationProps> = ({ language }) => {
  const [soilType, setSoilType] = useState('');
  const [season, setSeason] = useState('');
  const [region, setRegion] = useState('');
  const [waterAvailability, setWaterAvailability] = useState('');
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const translations = {
    english: {
      title: "Crop Recommendation System",
      subtitle: "Get AI-powered crop suggestions based on your conditions",
      soilType: "Soil Type",
      season: "Season",
      region: "Region",
      waterAvailability: "Water Availability",
      getRecommendations: "Get Recommendations",
      recommendedCrops: "Recommended Crops",
      expectedYield: "Expected Yield",
      profitMargin: "Profit Margin",
      growthPeriod: "Growth Period",
      highWater: "High",
      moderateWater: "Moderate", 
      lowWater: "Low",
      kharif: "Kharif (Monsoon)",
      rabi: "Rabi (Winter)",
      summer: "Summer",
      allYear: "All Year"
    },
    hindi: {
      title: "फसल सिफारिश प्रणाली",
      subtitle: "अपनी स्थितियों के आधार पर AI-संचालित फसल सुझाव प्राप्त करें",
      soilType: "मिट्टी का प्रकार",
      season: "मौसम",
      region: "क्षेत्र",
      waterAvailability: "पानी की उपलब्धता",
      getRecommendations: "सिफारिशें प्राप्त करें",
      recommendedCrops: "सुझाई गई फसलें",
      expectedYield: "अपेक्षित उत्पादन",
      profitMargin: "लाभ मार्जिन",
      growthPeriod: "वृद्धि अवधि",
      highWater: "उच्च",
      moderateWater: "मध्यम",
      lowWater: "कम",
      kharif: "खरीफ (मानसून)",
      rabi: "रबी (सर्दी)",
      summer: "गर्मी",
      allYear: "पूरे साल"
    },
    telugu: {
      title: "పంట సిఫార్సు వ్యవస్థ",
      subtitle: "మీ పరిస్థితుల ఆధారంగా AI-ఆధారిత పంట సూచనలను పొందండి",
      soilType: "నేల రకం",
      season: "కాలం",
      region: "ప్రాంతం",
      waterAvailability: "నీటి లభ్యత",
      getRecommendations: "సిఫార్సులు పొందండి",
      recommendedCrops: "సిఫార్సు చేయబడిన పంటలు",
      expectedYield: "ఆశించిన దిగుబడి",
      profitMargin: "లాభ మార్జిన్",
      growthPeriod: "వృద్ధి కాలం",
      highWater: "అధిక",
      moderateWater: "మధ్యస్థ",
      lowWater: "తక్కువ",
      kharif: "ఖరీఫ్ (వర్షాకాలం)",
      rabi: "రబీ (చల్లకాలం)",
      summer: "వేసవి",
      allYear: "ఏడాది పొడవునా"
    }
  };

  const currentLang = translations[language];

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

  const generateRecommendations = () => {
    // Mock AI recommendation logic
    const cropDatabase = {
      'Clay': {
        'kharif': [
          { name: 'Rice', yield: '6-8 tons/hectare', profit: 'High', period: '120-150 days', icon: '🌾' },
          { name: 'Sugarcane', yield: '80-100 tons/hectare', profit: 'Very High', period: '12-18 months', icon: '🎋' }
        ],
        'rabi': [
          { name: 'Wheat', yield: '4-6 tons/hectare', profit: 'High', period: '120-140 days', icon: '🌾' },
          { name: 'Chickpea', yield: '1.5-2 tons/hectare', profit: 'Medium', period: '90-120 days', icon: '🫘' }
        ]
      },
      'Sandy': {
        'kharif': [
          { name: 'Pearl Millet', yield: '2-3 tons/hectare', profit: 'Medium', period: '75-90 days', icon: '🌾' },
          { name: 'Groundnut', yield: '2-3 tons/hectare', profit: 'High', period: '120-140 days', icon: '🥜' }
        ],
        'rabi': [
          { name: 'Mustard', yield: '1.5-2 tons/hectare', profit: 'Medium', period: '90-110 days', icon: '🌻' },
          { name: 'Barley', yield: '3-4 tons/hectare', profit: 'Medium', period: '110-130 days', icon: '🌾' }
        ]
      },
      'Loamy': {
        'kharif': [
          { name: 'Maize', yield: '8-10 tons/hectare', profit: 'High', period: '90-120 days', icon: '🌽' },
          { name: 'Cotton', yield: '500-700 kg/hectare', profit: 'Very High', period: '180-200 days', icon: '🌿' }
        ],
        'rabi': [
          { name: 'Potato', yield: '25-30 tons/hectare', profit: 'High', period: '90-120 days', icon: '🥔' },
          { name: 'Onion', yield: '20-25 tons/hectare', profit: 'High', period: '120-150 days', icon: '🧅' }
        ]
      }
    };

    const soilCrops = cropDatabase[soilType] || cropDatabase['Loamy'];
    const seasonCrops = soilCrops[season] || soilCrops['kharif'];
    
    setRecommendations(seasonCrops || []);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <Leaf className="h-6 w-6" />
            {currentLang.title}
          </CardTitle>
          <p className="text-gray-600">{currentLang.subtitle}</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {currentLang.soilType}
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
                {currentLang.season}
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
                {currentLang.region}
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
                {currentLang.waterAvailability}
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
          </div>

          <Button 
            onClick={generateRecommendations}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            disabled={!soilType || !season}
          >
            <Leaf className="h-4 w-4 mr-2" />
            {currentLang.getRecommendations}
          </Button>
        </CardContent>
      </Card>

      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Leaf className="h-5 w-5" />
              {currentLang.recommendedCrops}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {recommendations.map((crop, index) => (
                <Card key={index} className="border-green-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{crop.icon}</span>
                      <h3 className="text-lg font-semibold text-gray-800">{crop.name}</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{currentLang.expectedYield}:</span>
                        <span className="font-medium">{crop.yield}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{currentLang.profitMargin}:</span>
                        <span className={`font-medium ${
                          crop.profit === 'Very High' ? 'text-green-600' :
                          crop.profit === 'High' ? 'text-green-500' : 'text-yellow-500'
                        }`}>{crop.profit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{currentLang.growthPeriod}:</span>
                        <span className="font-medium">{crop.period}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CropRecommendation;
