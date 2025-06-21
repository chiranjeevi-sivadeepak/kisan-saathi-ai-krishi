
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Camera, Bug, AlertTriangle, CheckCircle, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface PestDetectionPageProps {
  language: string;
}

const PestDetectionPage: React.FC<PestDetectionPageProps> = ({ language }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const translations = {
    english: {
      title: "AI Pest & Disease Detection System",
      subtitle: "Upload plant images for instant AI-powered pest and disease identification",
      uploadImage: "Upload Plant Image",
      takePhoto: "Take Photo",
      analyzing: "AI is analyzing your image...",
      detectionResult: "AI Detection Result",
      confidence: "Confidence",
      treatment: "Recommended Treatment",
      prevention: "Prevention Tips",
      severity: "Severity Level",
      noImageSelected: "Please select an image first",
      analysisComplete: "AI Analysis complete!",
      recommendedFertilizers: "Recommended Fertilizers",
      dosAndDonts: "Dos and Don'ts",
      buyFertilizer: "Buy Fertilizer",
      dos: "✅ DOs",
      donts: "❌ DON'Ts",
      applicationMethod: "Application Method",
      safetyPrecautions: "Safety Precautions"
    },
    hindi: {
      title: "AI कीट और रोग पहचान प्रणाली",
      subtitle: "तत्काल AI-संचालित कीट और रोग पहचान के लिए पौधे की छवियां अपलोड करें",
      uploadImage: "पौधे की छवि अपलोड करें",
      takePhoto: "फोटो लें",
      analyzing: "AI आपकी छवि का विश्लेषण कर रहा है...",
      detectionResult: "AI पहचान परिणाम",
      confidence: "विश्वास",
      treatment: "सुझावित उपचार",
      prevention: "रोकथाम युक्तियाँ",
      severity: "गंभीरता स्तर",
      noImageSelected: "कृपया पहले एक छवि चुनें",
      analysisComplete: "AI विश्लेषण पूर्ण!",
      recommendedFertilizers: "सुझावित उर्वरक",
      dosAndDonts: "क्या करें और क्या न करें",
      buyFertilizer: "उर्वरक खरीदें",
      dos: "✅ करने योग्य",
      donts: "❌ न करें",
      applicationMethod: "उपयोग विधि",
      safetyPrecautions: "सुरक्षा सावधानियां"
    },
    telugu: {
      title: "AI కీటకాలు & వ్యాధుల గుర్తింపు వ్యవస్థ",
      subtitle: "తక్షణ AI-ఆధారిత కీటకాలు మరియు వ్యాధుల గుర్తింపు కోసం మొక్కల చిత్రాలను అప్‌లోడ్ చేయండి",
      uploadImage: "మొక్క చిత్రాన్ని అప్‌లోడ్ చేయండి",
      takePhoto: "ఫోటో తీయండి",
      analyzing: "AI మీ చిత్రాన్ని విశ్లేషిస్తోంది...",
      detectionResult: "AI గుర్తింపు ఫలితం",
      confidence: "నమ్మకం",
      treatment: "సూచించిన చికిత్స",
      prevention: "నివారణ చిట్కాలు",
      severity: "తీవ్రత స్థాయి",
      noImageSelected: "దయచేసి మొదట చిత్రాన్ని ఎంచుకోండి",
      analysisComplete: "AI విశ్లేషణ పూర్తయింది!",
      recommendedFertilizers: "సిఫార్సు చేయబడిన ఎరువులు",
      dosAndDonts: "చేయవలసినవి మరియు చేయకూడనివి",
      buyFertilizer: "ఎరువులు కొనండి",
      dos: "✅ చేయవలసినవి",
      donts: "❌ చేయకూడనివి",
      applicationMethod: "వినియోగ పద్ధతి",
      safetyPrecautions: "భద్రతా జాగ్రత్తలు"
    }
  };

  const currentLang = translations[language as keyof typeof translations] || translations.english;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast({
        title: "No Image",
        description: currentLang.noImageSelected,
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate advanced AI analysis
    setTimeout(() => {
      const mockResults = [
        {
          pest: "Late Blight (Phytophthora infestans)",
          confidence: 92,
          severity: "High",
          treatment: "Apply copper-based fungicide (Copper Oxychloride 50% WP) at 2g/L water. Repeat every 7-10 days. Remove affected leaves immediately.",
          prevention: "Avoid overhead watering, maintain proper spacing between plants, apply preventive fungicide during humid conditions, and ensure good air circulation.",
          icon: "🍃",
          fertilizers: [
            {
              name: "Copper Oxychloride 50% WP",
              price: "₹180/kg",
              dosage: "2g/L water",
              application: "Foliar spray every 7-10 days"
            },
            {
              name: "Mancozeb 75% WP",
              price: "₹220/kg", 
              dosage: "2.5g/L water",
              application: "Protective spray before disease onset"
            }
          ],
          dos: [
            "Apply in early morning or evening",
            "Cover both upper and lower leaf surfaces",
            "Use protective equipment while spraying",
            "Follow 7-10 day spray interval",
            "Remove infected plant debris"
          ],
          donts: [
            "Don't spray during peak sunlight",
            "Don't exceed recommended dosage",
            "Don't spray when wind speed is high",
            "Don't reuse spray solution after 24 hours",
            "Don't harvest within 7 days of spray"
          ]
        },
        {
          pest: "Aphid Infestation",
          confidence: 88,
          severity: "Medium",
          treatment: "Spray neem oil solution (5ml/L) or use Imidacloprid 17.8% SL at 0.5ml/L water. Introduce beneficial insects like ladybugs.",
          prevention: "Regular monitoring, companion planting with marigolds, maintaining beneficial insect populations, and avoiding excessive nitrogen fertilization.",
          icon: "🐛",
          fertilizers: [
            {
              name: "Neem Oil (Azadirachtin 0.03%)",
              price: "₹150/500ml",
              dosage: "5ml/L water",
              application: "Foliar spray every 5-7 days"
            },
            {
              name: "Imidacloprid 17.8% SL",
              price: "₹280/100ml",
              dosage: "0.5ml/L water", 
              application: "Targeted spray on affected areas"
            }
          ],
          dos: [
            "Spray during cool hours of the day",
            "Focus on undersides of leaves",
            "Use sticker for better adhesion",
            "Monitor beneficial insects",
            "Maintain proper plant nutrition"
          ],
          donts: [
            "Don't spray beneficial insects",
            "Don't use excessive nitrogen fertilizer",
            "Don't ignore natural predators",
            "Don't spray during flowering if bees are present",
            "Don't use expired pesticides"
          ]
        }
      ];

      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setAnalysisResult(randomResult);
      setIsAnalyzing(false);
      
      toast({
        title: "AI Analysis Complete",
        description: currentLang.analysisComplete,
      });
    }, 4000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <Bug className="inline-block mr-2 h-10 w-10 text-orange-600" />
            {currentLang.title}
          </h1>
          <p className="text-xl text-gray-600">{currentLang.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-white shadow-xl border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <Camera className="h-6 w-6" />
                Upload Image for AI Analysis
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-orange-200 rounded-lg p-8 text-center bg-orange-50">
                {selectedImage ? (
                  <div className="space-y-4">
                    <img 
                      src={selectedImage} 
                      alt="Selected plant" 
                      className="max-w-full max-h-80 mx-auto rounded-lg shadow-lg"
                    />
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="border-orange-300 text-orange-700"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Select Different Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Bug className="h-20 w-20 mx-auto text-orange-300" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Upload Plant Image
                      </h3>
                      <p className="text-gray-600 text-sm mb-6">
                        Take a clear, well-lit photo of the affected plant part for accurate AI detection
                      </p>
                      <div className="flex gap-4 justify-center">
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3"
                        >
                          <Upload className="h-5 w-5 mr-2" />
                          {currentLang.uploadImage}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="border-orange-300 text-orange-700 px-6 py-3"
                        >
                          <Camera className="h-5 w-5 mr-2" />
                          {currentLang.takePhoto}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              <Button
                onClick={handleAnalyze}
                disabled={!selectedImage || isAnalyzing}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg py-6"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {currentLang.analyzing}
                  </>
                ) : (
                  <>
                    <Bug className="h-5 w-5 mr-2" />
                    Start AI Analysis
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {analysisResult && (
            <div className="space-y-6">
              <Card className="border-green-200 bg-white shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-6 w-6" />
                    {currentLang.detectionResult}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{analysisResult.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {analysisResult.pest}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {currentLang.confidence}: {analysisResult.confidence}%
                      </p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg border ${getSeverityColor(analysisResult.severity)}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5" />
                      <span className="font-semibold">{currentLang.severity}: {analysisResult.severity}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      🔬 {currentLang.treatment}
                    </h4>
                    <p className="text-sm text-gray-700 bg-blue-50 p-4 rounded-lg">
                      {analysisResult.treatment}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      🛡️ {currentLang.prevention}
                    </h4>
                    <p className="text-sm text-gray-700 bg-green-50 p-4 rounded-lg">
                      {analysisResult.prevention}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-white shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <ShoppingCart className="h-6 w-6" />
                    {currentLang.recommendedFertilizers}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisResult.fertilizers.map((fertilizer, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h5 className="font-semibold text-gray-800">{fertilizer.name}</h5>
                            <p className="text-lg font-bold text-green-600">{fertilizer.price}</p>
                          </div>
                          <Button size="sm" className="bg-green-500 hover:bg-green-600">
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            {currentLang.buyFertilizer}
                          </Button>
                        </div>
                        <div className="text-sm space-y-1">
                          <p><span className="font-medium">Dosage:</span> {fertilizer.dosage}</p>
                          <p><span className="font-medium">Application:</span> {fertilizer.application}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-white shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-700">
                    📋 {currentLang.dosAndDonts}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h5 className="font-semibold text-green-700 text-lg">{currentLang.dos}</h5>
                      <ul className="space-y-2">
                        {analysisResult.dos.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="font-semibold text-red-700 text-lg">{currentLang.donts}</h5>
                      <ul className="space-y-2">
                        {analysisResult.donts.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-red-500 mt-1 flex-shrink-0">✗</span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PestDetectionPage;
