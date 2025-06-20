
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Droplets, Calendar, Thermometer, Cloud, TrendingDown } from 'lucide-react';

interface WaterManagementProps {
  language: string;
}

const WaterManagement: React.FC<WaterManagementProps> = ({ language }) => {
  const [cropType, setCropType] = useState('');
  const [fieldSize, setFieldSize] = useState('');
  const [soilType, setSoilType] = useState('');
  const [irrigationPlan, setIrrigationPlan] = useState<any>(null);

  const translations = {
    english: {
      title: "Smart Water Management",
      subtitle: "Optimize irrigation and conserve water with AI recommendations",
      cropType: "Crop Type",
      fieldSize: "Field Size (acres)",
      soilType: "Soil Type",
      generatePlan: "Generate Irrigation Plan",
      irrigationSchedule: "Irrigation Schedule",
      waterRequirement: "Water Requirement",
      conservationTips: "Water Conservation Tips",
      rainwaterHarvesting: "Rainwater Harvesting",
      dailyWater: "Daily Water Needs",
      irrigationMethod: "Recommended Method",
      scheduleTime: "Best Irrigation Time",
      efficiency: "Water Use Efficiency"
    },
    hindi: {
      title: "स्मार्ट जल प्रबंधन",
      subtitle: "AI सुझावों के साथ सिंचाई को अनुकूलित करें और पानी बचाएं",
      cropType: "फसल का प्रकार",
      fieldSize: "खेत का आकार (एकड़)",
      soilType: "मिट्टी का प्रकार",
      generatePlan: "सिंचाई योजना बनाएं",
      irrigationSchedule: "सिंचाई अनुसूची",
      waterRequirement: "पानी की आवश्यकता",
      conservationTips: "जल संरक्षण युक्तियाँ",
      rainwaterHarvesting: "बारिश का पानी संचयन",
      dailyWater: "दैनिक पानी की जरूरत",
      irrigationMethod: "सुझावित विधि",
      scheduleTime: "सर्वोत्तम सिंचाई समय",
      efficiency: "जल उपयोग दक्षता"
    },
    telugu: {
      title: "స्మार्ట్ వాటర్ మేనేజ్‌మెంట్",
      subtitle: "AI సిఫార్సులతో నీటిపారుదలను అనుకూలీకరించండి మరియు నీటిని ఆదా చేయండి",
      cropType: "పంట రకం",
      fieldSize: "పొలం పరిమాణం (ఎకరాలు)",
      soilType: "మట్టి రకం",
      generatePlan: "నీటిపారుదల ప్రణాళికను రూపొందించండి",
      irrigationSchedule: "నీటిపారుదల షెడ్యూల్",
      waterRequirement: "నీటి అవసరం",
      conservationTips: "నీటి ఆదా చిట్కాలు",
      rainwaterHarvesting: "వర్షపు నీటి సేకరణ",
      dailyWater: "రోజువారీ నీటి అవసరాలు",
      irrigationMethod: "సిఫార్సు చేయబడిన పద్ధతి",
      scheduleTime: "ఉత్తమమైన నీటిపారుదల సమయం",
      efficiency: "నీటి వినియోగ సామర్థ్యం"
    }
  };

  const currentLang = translations[language];

  const crops = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 'Potato', 'Tomato', 'Onion'];
  const soilTypes = ['Clay', 'Sandy', 'Loamy', 'Black Cotton', 'Red', 'Alluvial'];

  const generateIrrigationPlan = () => {
    if (!cropType || !fieldSize || !soilType) return;

    // Mock irrigation plan generation
    const waterRequirements = {
      'Rice': { daily: 5, method: 'Flood Irrigation', efficiency: '60%' },
      'Wheat': { daily: 2, method: 'Sprinkler', efficiency: '75%' },
      'Maize': { daily: 3, method: 'Drip Irrigation', efficiency: '90%' },
      'Cotton': { daily: 4, method: 'Drip Irrigation', efficiency: '85%' },
      'Sugarcane': { daily: 8, method: 'Furrow Irrigation', efficiency: '65%' },
      'Potato': { daily: 3.5, method: 'Sprinkler', efficiency: '80%' },
      'Tomato': { daily: 4.5, method: 'Drip Irrigation', efficiency: '88%' },
      'Onion': { daily: 2.5, method: 'Drip Irrigation', efficiency: '85%' }
    };

    const cropData = waterRequirements[cropType] || waterRequirements['Wheat'];
    const totalWater = cropData.daily * parseFloat(fieldSize);

    const mockPlan = {
      crop: cropType,
      fieldSize: parseFloat(fieldSize),
      dailyWater: cropData.daily,
      totalDaily: totalWater,
      method: cropData.method,
      efficiency: cropData.efficiency,
      schedule: [
        { time: '6:00 AM', duration: '30 min', amount: totalWater * 0.4 },
        { time: '6:00 PM', duration: '20 min', amount: totalWater * 0.6 }
      ],
      conservationTips: [
        'Use drip irrigation to reduce water waste by 30-50%',
        'Mulch around plants to retain soil moisture',
        'Install soil moisture sensors for precise watering',
        'Collect rainwater during monsoon season',
        'Schedule irrigation during cooler hours (early morning/evening)'
      ],
      harvesting: {
        potential: '75%',
        methods: ['Roof water collection', 'Surface runoff capture', 'Check dams'],
        storage: 'Store in tanks or ponds for dry season use'
      }
    };

    setIrrigationPlan(mockPlan);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Droplets className="h-6 w-6" />
            {currentLang.title}
          </CardTitle>
          <p className="text-gray-600">{currentLang.subtitle}</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>{currentLang.cropType}</Label>
              <Select value={cropType} onValueChange={setCropType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map(crop => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
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
              <Label>{currentLang.soilType}</Label>
              <Select value={soilType} onValueChange={setSoilType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map(soil => (
                    <SelectItem key={soil} value={soil}>{soil}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={generateIrrigationPlan}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            disabled={!cropType || !fieldSize || !soilType}
          >
            <Droplets className="h-4 w-4 mr-2" />
            {currentLang.generatePlan}
          </Button>
        </CardContent>
      </Card>

      {irrigationPlan && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Calendar className="h-5 w-5" />
                {currentLang.irrigationSchedule}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-blue-600 font-medium">{currentLang.dailyWater}</p>
                  <p className="text-xl font-bold text-blue-800">
                    {irrigationPlan.totalDaily.toFixed(1)} L
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-green-600 font-medium">{currentLang.efficiency}</p>
                  <p className="text-xl font-bold text-green-800">
                    {irrigationPlan.efficiency}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-medium text-gray-700 flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />
                  {currentLang.irrigationMethod}: {irrigationPlan.method}
                </p>
                
                <div className="space-y-2">
                  <p className="font-medium text-gray-700">{currentLang.scheduleTime}:</p>
                  {irrigationPlan.schedule.map((slot, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                      <span className="font-medium">{slot.time}</span>
                      <span className="text-sm text-gray-600">
                        {slot.duration} ({slot.amount.toFixed(1)}L)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <TrendingDown className="h-5 w-5" />
                  {currentLang.conservationTips}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {irrigationPlan.conservationTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500 mt-1">💡</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-cyan-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-700">
                  <Cloud className="h-5 w-5" />
                  {currentLang.rainwaterHarvesting}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-cyan-50 p-3 rounded-lg">
                  <p className="text-cyan-600 text-sm font-medium">Harvesting Potential</p>
                  <p className="text-xl font-bold text-cyan-800">
                    {irrigationPlan.harvesting.potential}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium text-gray-700">Methods:</p>
                  <ul className="space-y-1">
                    {irrigationPlan.harvesting.methods.map((method, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <span className="text-cyan-500">🌧️</span>
                        <span className="text-gray-700">{method}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <p className="text-sm text-gray-600 bg-cyan-50 p-3 rounded-lg">
                  💾 {irrigationPlan.harvesting.storage}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaterManagement;
