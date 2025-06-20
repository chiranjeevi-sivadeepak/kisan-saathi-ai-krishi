
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Map, Calendar, CheckCircle, Clock, ArrowRight, Leaf, Droplets, Bug } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface FarmingRoadmapProps {
  language: string;
}

const FarmingRoadmap: React.FC<FarmingRoadmapProps> = ({ language }) => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [fieldSize, setFieldSize] = useState('');
  const [startDate, setStartDate] = useState('');
  const [roadmap, setRoadmap] = useState<any>(null);

  const translations = {
    english: {
      title: "Farming Roadmap Generator",
      subtitle: "Get a step-by-step cultivation plan from sowing to selling",
      cropType: "Crop Type",
      fieldSize: "Field Size (acres)",
      plantingDate: "Planned Planting Date",
      generateRoadmap: "Generate Roadmap",
      cultivationPlan: "Cultivation Plan",
      phase: "Phase",
      activity: "Activity",
      duration: "Duration",
      status: "Status",
      week: "Week",
      day: "Day",
      completed: "Completed",
      inProgress: "In Progress",
      upcoming: "Upcoming",
      totalDuration: "Total Duration",
      estimatedYield: "Estimated Yield",
      expectedRevenue: "Expected Revenue"
    },
    hindi: {
      title: "कृषि रोडमैप जेनरेटर",
      subtitle: "बुवाई से बिक्री तक चरणबद्ध खेती योजना प्राप्त करें",
      cropType: "फसल का प्रकार",
      fieldSize: "खेत का आकार (एकड़)",
      plantingDate: "नियोजित रोपण तिथि",
      generateRoadmap: "रोडमैप बनाएं",
      cultivationPlan: "खेती योजना",
      phase: "चरण",
      activity: "गतिविधि",
      duration: "अवधि",
      status: "स्थिति",
      week: "सप्ताह",
      day: "दिन",
      completed: "पूर्ण",
      inProgress: "प्रगति में",
      upcoming: "आगामी",
      totalDuration: "कुल अवधि",
      estimatedYield: "अनुमानित उत्पादन",
      expectedRevenue: "अपेक्षित आय"
    },
    telugu: {
      title: "వ్యవసాయ రోడ్‌మ్యాప్ జెనరేటర్",
      subtitle: "విత్తనం నుండి అమ్మకం వరకు దశల వారీ సాగు ప్రణాళిక పొందండి",
      cropType: "పంట రకం",
      fieldSize: "పొలం పరిమాణం (ఎకరాలు)",
      plantingDate: "ప్రణాళికాబద్ధమైన నాటడం తేదీ",
      generateRoadmap: "రోడ్‌మ్యాప్ రూపొందించండి",
      cultivationPlan: "సాగు ప్రణాళిక",
      phase: "దశ",
      activity: "కార్యకలాపం",
      duration: "వ్యవధి",
      status: "స్థితి",
      week: "వారం",
      day: "రోజు",
      completed: "పూర్తయింది",
      inProgress: "కొనసాగుతోంది",
      upcoming: "రాబోయే",
      totalDuration: "మొత్తం వ్యవధి",
      estimatedYield: "అంచనా దిగుబడి",
      expectedRevenue: "ఆశించిన ఆదాయం"
    }
  };

  const currentLang = translations[language];

  const crops = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 'Potato', 'Tomato', 'Onion'];

  const generateRoadmap = () => {
    if (!selectedCrop || !fieldSize || !startDate) return;

    // Mock roadmap data
    const cropRoadmaps = {
      'Rice': {
        totalDuration: '120 days',
        estimatedYield: '6-8 tons/hectare',
        expectedRevenue: '₹80,000-1,00,000 per acre',
        phases: [
          {
            name: 'Land Preparation',
            icon: '🚜',
            activities: [
              { task: 'Plowing and leveling', duration: '3-5 days', status: 'upcoming' },
              { task: 'Apply organic manure', duration: '1 day', status: 'upcoming' },
              { task: 'Prepare nursery beds', duration: '2 days', status: 'upcoming' }
            ]
          },
          {
            name: 'Sowing & Transplanting',
            icon: '🌱',
            activities: [
              { task: 'Seed treatment', duration: '1 day', status: 'upcoming' },
              { task: 'Nursery sowing', duration: '1 day', status: 'upcoming' },
              { task: 'Transplanting (21-25 days old)', duration: '5-7 days', status: 'upcoming' }
            ]
          },
          {
            name: 'Growth Management',
            icon: '🌿',
            activities: [
              { task: 'First fertilizer application', duration: '1 day', status: 'upcoming' },
              { task: 'Weed management', duration: '3-5 days', status: 'upcoming' },
              { task: 'Pest monitoring', duration: 'Ongoing', status: 'upcoming' },
              { task: 'Water management', duration: 'Daily', status: 'upcoming' }
            ]
          },
          {
            name: 'Maturity & Harvest',
            icon: '🌾',
            activities: [
              { task: 'Pre-harvest assessment', duration: '2 days', status: 'upcoming' },
              { task: 'Harvesting', duration: '5-7 days', status: 'upcoming' },
              { task: 'Threshing and cleaning', duration: '3-5 days', status: 'upcoming' },
              { task: 'Marketing/Storage', duration: '2-3 days', status: 'upcoming' }
            ]
          }
        ]
      },
      'Wheat': {
        totalDuration: '120-140 days',
        estimatedYield: '4-6 tons/hectare',
        expectedRevenue: '₹60,000-80,000 per acre',
        phases: [
          {
            name: 'Land Preparation',
            icon: '🚜',
            activities: [
              { task: 'Deep plowing', duration: '2-3 days', status: 'upcoming' },
              { task: 'Disc harrowing', duration: '1 day', status: 'upcoming' },
              { task: 'Apply basal fertilizer', duration: '1 day', status: 'upcoming' }
            ]
          },
          {
            name: 'Sowing',
            icon: '🌱',
            activities: [
              { task: 'Seed treatment', duration: '1 day', status: 'upcoming' },
              { task: 'Line sowing', duration: '2-3 days', status: 'upcoming' },
              { task: 'Light irrigation', duration: '1 day', status: 'upcoming' }
            ]
          },
          {
            name: 'Growth Management',
            icon: '🌿',
            activities: [
              { task: 'First irrigation (21 days)', duration: '1 day', status: 'upcoming' },
              { task: 'Top dressing fertilizer', duration: '1 day', status: 'upcoming' },
              { task: 'Weed control', duration: '2-3 days', status: 'upcoming' },
              { task: 'Disease monitoring', duration: 'Weekly', status: 'upcoming' }
            ]
          },
          {
            name: 'Maturity & Harvest',
            icon: '🌾',
            activities: [
              { task: 'Physiological maturity check', duration: '1 day', status: 'upcoming' },
              { task: 'Harvesting', duration: '3-5 days', status: 'upcoming' },
              { task: 'Threshing', duration: '2-3 days', status: 'upcoming' },
              { task: 'Storage/Marketing', duration: '1-2 days', status: 'upcoming' }
            ]
          }
        ]
      }
    };

    const selectedRoadmap = cropRoadmaps[selectedCrop] || cropRoadmaps['Rice'];
    setRoadmap({ ...selectedRoadmap, crop: selectedCrop, fieldSize, startDate });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'inProgress': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'upcoming': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'inProgress': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'upcoming': return <ArrowRight className="h-4 w-4 text-gray-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-teal-50 to-green-50 border-teal-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-teal-700">
            <Map className="h-6 w-6" />
            {currentLang.title}
          </CardTitle>
          <p className="text-gray-600">{currentLang.subtitle}</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>{currentLang.cropType}</Label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
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
              <Label>{currentLang.plantingDate}</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>

          <Button 
            onClick={generateRoadmap}
            className="w-full bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600"
            disabled={!selectedCrop || !fieldSize || !startDate}
          >
            <Map className="h-4 w-4 mr-2" />
            {currentLang.generateRoadmap}
          </Button>
        </CardContent>
      </Card>

      {roadmap && (
        <div className="space-y-6">
          <Card className="border-teal-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-teal-700">
                <Calendar className="h-5 w-5" />
                {currentLang.cultivationPlan} - {roadmap.crop}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                  <p className="text-teal-600 font-medium">{currentLang.totalDuration}</p>
                  <p className="text-xl font-bold text-teal-800">{roadmap.totalDuration}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-green-600 font-medium">{currentLang.estimatedYield}</p>
                  <p className="text-lg font-bold text-green-800">{roadmap.estimatedYield}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-blue-600 font-medium">{currentLang.expectedRevenue}</p>
                  <p className="text-lg font-bold text-blue-800">{roadmap.expectedRevenue}</p>
                </div>
              </div>

              <div className="space-y-6">
                {roadmap.phases.map((phase, phaseIndex) => (
                  <Card key={phaseIndex} className="border-gray-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <span className="text-2xl">{phase.icon}</span>
                        <span className="text-gray-800">{phase.name}</span>
                        <Badge variant="outline" className="ml-auto">
                          {currentLang.phase} {phaseIndex + 1}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {phase.activities.map((activity, actIndex) => (
                          <div key={actIndex} className={`p-3 rounded-lg border ${getStatusColor(activity.status)}`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {getStatusIcon(activity.status)}
                                <div>
                                  <p className="font-medium">{activity.task}</p>
                                  <p className="text-sm opacity-80">{currentLang.duration}: {activity.duration}</p>
                                </div>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {activity.status === 'completed' ? currentLang.completed :
                                 activity.status === 'inProgress' ? currentLang.inProgress :
                                 currentLang.upcoming}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FarmingRoadmap;
