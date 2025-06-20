
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Camera, Bug, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PestDetectionProps {
  language: string;
}

const PestDetection: React.FC<PestDetectionProps> = ({ language }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const translations = {
    english: {
      title: "AI Pest & Disease Detection",
      subtitle: "Upload plant images for instant pest and disease identification",
      uploadImage: "Upload Plant Image",
      takePhoto: "Take Photo",
      analyzing: "Analyzing image...",
      detectionResult: "Detection Result",
      confidence: "Confidence",
      treatment: "Recommended Treatment",
      prevention: "Prevention Tips",
      severity: "Severity Level",
      noImageSelected: "Please select an image first",
      analysisComplete: "Analysis complete!"
    },
    hindi: {
      title: "AI कीट और रोग पहचान",
      subtitle: "तत्काल कीट और रोग पहचान के लिए पौधे की छवियां अपलोड करें",
      uploadImage: "पौधे की छवि अपलोड करें",
      takePhoto: "फोटो लें",
      analyzing: "छवि का विश्लेषण कर रहे हैं...",
      detectionResult: "पहचान परिणाम",
      confidence: "विश्वास",
      treatment: "सुझावित उपचार",
      prevention: "रोकथाम युक्तियाँ",
      severity: "गंभीरता स्तर",
      noImageSelected: "कृपया पहले एक छवि चुनें",
      analysisComplete: "विश्लेषण पूर्ण!"
    },
    telugu: {
      title: "AI కీటకాలు & వ్యాధుల గుర్తింపు",
      subtitle: "తక్షణ కీటకాలు మరియు వ్యాధుల గుర్తింపు కోసం మొక్కల చిత్రాలను అప్‌లోడ్ చేయండి",
      uploadImage: "మొక్క చిత్రాన్ని అప్‌లోడ్ చేయండి",
      takePhoto: "ఫోటో తీయండి",
      analyzing: "చిత్రాన్ని విశ్లేషిస్తోంది...",
      detectionResult: "గుర్తింపు ఫలితం",
      confidence: "నమ్మకం",
      treatment: "సూచించిన చికిత్స",
      prevention: "నివారణ చిట్కాలు",
      severity: "తీవ్రత స్థాయి",
      noImageSelected: "దయచేసి మొదట చిత్రాన్ని ఎంచుకోండి",
      analysisComplete: "విశ్లేషణ పూర్తయింది!"
    }
  };

  const currentLang = translations[language];

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
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults = [
        {
          pest: "Leaf Blight",
          confidence: 87,
          severity: "Medium",
          treatment: "Apply copper-based fungicide every 7-10 days. Remove affected leaves and improve air circulation.",
          prevention: "Avoid overhead watering, maintain proper spacing between plants, and apply preventive fungicide during humid conditions.",
          icon: "🍃"
        },
        {
          pest: "Aphids",
          confidence: 92,
          severity: "Low",
          treatment: "Spray with neem oil solution or insecticidal soap. Introduce ladybugs as biological control.",
          prevention: "Regular monitoring, companion planting with marigolds, and maintaining beneficial insect populations.",
          icon: "🐛"
        },
        {
          pest: "Healthy Plant",
          confidence: 95,
          severity: "None",
          treatment: "No treatment needed. Continue current care routine.",
          prevention: "Maintain good hygiene, proper watering, and regular monitoring for early detection of issues.",
          icon: "✅"
        }
      ];

      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setAnalysisResult(randomResult);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: currentLang.analysisComplete,
      });
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'none': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <Bug className="h-6 w-6" />
            {currentLang.title}
          </CardTitle>
          <p className="text-gray-600">{currentLang.subtitle}</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-orange-200 rounded-lg p-6 text-center bg-white">
                {selectedImage ? (
                  <div className="space-y-4">
                    <img 
                      src={selectedImage} 
                      alt="Selected plant" 
                      className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
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
                    <Bug className="h-16 w-16 mx-auto text-orange-300" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Upload Plant Image
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Take a clear photo of the affected plant part
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="border-orange-300 text-orange-700"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {currentLang.uploadImage}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="border-orange-300 text-orange-700"
                        >
                          <Camera className="h-4 w-4 mr-2" />
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
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {currentLang.analyzing}
                  </>
                ) : (
                  <>
                    <Bug className="h-4 w-4 mr-2" />
                    Analyze Image
                  </>
                )}
              </Button>
            </div>

            {analysisResult && (
              <div className="space-y-4">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="h-5 w-5" />
                      {currentLang.detectionResult}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{analysisResult.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {analysisResult.pest}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {currentLang.confidence}: {analysisResult.confidence}%
                        </p>
                      </div>
                    </div>

                    <div className={`p-3 rounded-lg border ${getSeverityColor(analysisResult.severity)}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="font-medium">{currentLang.severity}: {analysisResult.severity}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                          🔬 {currentLang.treatment}
                        </h4>
                        <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                          {analysisResult.treatment}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                          🛡️ {currentLang.prevention}
                        </h4>
                        <p className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
                          {analysisResult.prevention}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PestDetection;
