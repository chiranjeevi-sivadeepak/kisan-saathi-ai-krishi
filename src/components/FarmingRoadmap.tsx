
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, MapPin, Clock, CheckCircle, Circle, AlertCircle } from 'lucide-react';

interface FarmingRoadmapProps {
  language: string;
}

const FarmingRoadmap: React.FC<FarmingRoadmapProps> = ({ language }) => {
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const [currentSeason, setCurrentSeason] = useState('kharif');

  const translations = {
    english: {
      title: "Farming Roadmap Generator",
      subtitle: "Your step-by-step guide from seed to harvest",
      selectCrop: "Select Crop",
      selectSeason: "Select Season",
      roadmapFor: "Farming Roadmap for",
      duration: "Duration",
      currentPhase: "Current Phase",
      nextAction: "Next Action",
      completed: "Completed",
      inProgress: "In Progress",
      upcoming: "Upcoming",
      urgent: "Urgent",
      days: "days",
      weeks: "weeks"
    },
    hindi: {
      title: "कृषि रोडमैप जेनरेटर",
      subtitle: "बीज से फसल तक आपका चरणबद्ध गाइड",
      selectCrop: "फसल चुनें",
      selectSeason: "सीजन चुनें",
      roadmapFor: "के लिए कृषि रोडमैप",
      duration: "अवधि",
      currentPhase: "वर्तमान चरण",
      nextAction: "अगली कार्रवाई",
      completed: "पूर्ण",
      inProgress: "प्रगति में",
      upcoming: "आगामी",
      urgent: "तत्काल",
      days: "दिन",
      weeks: "सप्ताह"
    },
    telugu: {
      title: "వ్యవసాయ రోడ్‌మ్యాప్ జెనరేటర్",
      subtitle: "విత్తనం నుండి పంట వరకు మీ దశల వారీ గైడ్",
      selectCrop: "పంట ఎంచుకోండి",
      selectSeason: "సీజన్ ఎంచుకోండి",
      roadmapFor: "కోసం వ్యవసాయ రోడ్‌మ్యాప్",
      duration: "వ్యవధి",
      currentPhase: "ప్రస్తుత దశ",
      nextAction: "తదుపరి చర్య",
      completed: "పూర్తయింది",
      inProgress: "ప్రగతిలో",
      upcoming: "రాబోయే",
      urgent: "అత్యవసరం",
      days: "రోజులు",
      weeks: "వారాలు"
    }
  };

  const currentLang = translations[language];

  const crops = {
    rice: { name: language === 'hindi' ? 'धान' : language === 'telugu' ? 'వరి' : 'Rice' },
    wheat: { name: language === 'hindi' ? 'गेहूं' : language === 'telugu' ? 'గోధుమ' : 'Wheat' },
    cotton: { name: language === 'hindi' ? 'कपास' : language === 'telugu' ? 'పత్తి' : 'Cotton' },
    sugarcane: { name: language === 'hindi' ? 'गन्ना' : language === 'telugu' ? 'చెరకు' : 'Sugarcane' }
  };

  const seasons = {
    kharif: { name: language === 'hindi' ? 'खरीफ' : language === 'telugu' ? 'ఖరీఫ్' : 'Kharif' },
    rabi: { name: language === 'hindi' ? 'रबी' : language === 'telugu' ? 'రబీ' : 'Rabi' },
    zaid: { name: language === 'hindi' ? 'जायद' : language === 'telugu' ? 'జాయిద్' : 'Zaid' }
  };

  const getRoadmapSteps = () => {
    const steps = {
      rice: [
        {
          phase: language === 'hindi' ? 'भूमि तैयारी' : language === 'telugu' ? 'భూమి తయారీ' : 'Land Preparation',
          duration: `7-10 ${currentLang.days}`,
          status: 'completed',
          tasks: [
            language === 'hindi' ? 'खेत की जुताई' : language === 'telugu' ? 'పొలం దున్నడం' : 'Plowing the field',
            language === 'hindi' ? 'पानी भरना' : language === 'telugu' ? 'నీరు నింపడం' : 'Flooding the field'
          ]
        },
        {
          phase: language === 'hindi' ? 'बीज बोना' : language === 'telugu' ? 'విత్తనాలు విత్తడం' : 'Sowing Seeds',
          duration: `2-3 ${currentLang.days}`,
          status: 'inProgress',
          tasks: [
            language === 'hindi' ? 'बीज का चयन' : language === 'telugu' ? 'విత్తనాల ఎంపిక' : 'Seed selection',
            language === 'hindi' ? 'रोपाई' : language === 'telugu' ? 'నాట్లు వేయడం' : 'Transplanting'
          ]
        },
        {
          phase: language === 'hindi' ? 'वृद्धि और देखभाल' : language === 'telugu' ? 'పెరుగుదల మరియు సంరక్షణ' : 'Growth & Care',
          duration: `60-70 ${currentLang.days}`,
          status: 'upcoming',
          tasks: [
            language === 'hindi' ? 'सिंचाई' : language === 'telugu' ? 'నీటిపారుదల' : 'Irrigation',
            language === 'hindi' ? 'उर्वरक' : language === 'telugu' ? 'ఎరువులు' : 'Fertilization'
          ]
        },
        {
          phase: language === 'hindi' ? 'कटाई' : language === 'telugu' ? 'కోత' : 'Harvesting',
          duration: `7-10 ${currentLang.days}`,
          status: 'upcoming',
          tasks: [
            language === 'hindi' ? 'फसल काटना' : language === 'telugu' ? 'పంట కోత' : 'Crop cutting',
            language === 'hindi' ? 'सुखाना' : language === 'telugu' ? 'ఆరబెట్టడం' : 'Drying'
          ]
        }
      ]
    };
    
    return steps[selectedCrop] || steps.rice;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'inProgress':
        return <Circle className="h-5 w-5 text-blue-500 animate-pulse" />;
      case 'urgent':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-500">{currentLang.completed}</Badge>;
      case 'inProgress':
        return <Badge variant="default" className="bg-blue-500">{currentLang.inProgress}</Badge>;
      case 'urgent':
        return <Badge variant="destructive">{currentLang.urgent}</Badge>;
      default:
        return <Badge variant="outline">{currentLang.upcoming}</Badge>;
    }
  };

  const calculateProgress = () => {
    const steps = getRoadmapSteps();
    const completed = steps.filter(step => step.status === 'completed').length;
    return (completed / steps.length) * 100;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <MapPin className="h-6 w-6" />
            {currentLang.title}
          </CardTitle>
          <p className="text-gray-600">{currentLang.subtitle}</p>
        </CardHeader>
        
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">{currentLang.selectCrop}</label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {Object.entries(crops).map(([key, crop]) => (
                  <option key={key} value={key}>{crop.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">{currentLang.selectSeason}</label>
              <select
                value={currentSeason}
                onChange={(e) => setCurrentSeason(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {Object.entries(seasons).map(([key, season]) => (
                  <option key={key} value={key}>{season.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-green-200">
            <h3 className="text-lg font-semibold mb-4">
              {currentLang.roadmapFor} {crops[selectedCrop].name} - {seasons[currentSeason].name}
            </h3>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-gray-600">{Math.round(calculateProgress())}%</span>
              </div>
              <Progress value={calculateProgress()} className="h-2" />
            </div>

            <div className="space-y-4">
              {getRoadmapSteps().map((step, index) => (
                <Card key={index} className={`border-l-4 ${
                  step.status === 'completed' ? 'border-l-green-500' :
                  step.status === 'inProgress' ? 'border-l-blue-500' :
                  step.status === 'urgent' ? 'border-l-red-500' : 'border-l-gray-300'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(step.status)}
                        <div>
                          <h4 className="font-semibold text-gray-800">{step.phase}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>{currentLang.duration}: {step.duration}</span>
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(step.status)}
                    </div>
                    
                    <div className="ml-8">
                      <ul className="text-sm text-gray-600 space-y-1">
                        {step.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 bg-gray-400 rounded-full"></div>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-800">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">{currentLang.nextAction}</span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                {language === 'hindi' ? 'अगले 2-3 दिनों में रोपाई का काम पूरा करें' :
                 language === 'telugu' ? 'రాబోయే 2-3 రోజుల్లో నాట్లు వేసే పని పూర్తి చేయండి' :
                 'Complete transplanting work in the next 2-3 days'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmingRoadmap;
