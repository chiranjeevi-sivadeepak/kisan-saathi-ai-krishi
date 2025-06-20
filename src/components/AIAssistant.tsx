
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mic, Send, Volume2, MessageCircle, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Declare speech recognition types
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface AIAssistantProps {
  language: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ language }) => {
  const [messages, setMessages] = useState<Array<{id: string, text: string, isUser: boolean, timestamp: Date}>>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);

  const translations = {
    english: {
      title: "AI Farming Assistant",
      subtitle: "Your smart farming companion - Ask anything about crops, weather, or farming!",
      placeholder: "Ask me about farming, crops, weather, or any agricultural question...",
      send: "Send",
      listening: "Listening...",
      askMeAnything: "Ask me anything about:",
      cropAdvice: "🌱 Crop recommendations",
      weatherInfo: "🌤️ Weather & climate",
      pestControl: "🐛 Pest control solutions",
      irrigation: "💧 Irrigation tips",
      marketPrices: "💰 Market prices",
      soilHealth: "🌱 Soil health"
    },
    hindi: {
      title: "AI कृषि सहायक",
      subtitle: "आपका स्मार्ट खेती साथी - फसल, मौसम या खेती के बारे में कुछ भी पूछें!",
      placeholder: "मुझसे खेती, फसल, मौसम या कृषि संबंधी कोई भी सवाल पूछें...",
      send: "भेजें",
      listening: "सुन रहा हूं...",
      askMeAnything: "मुझसे इनके बारे में पूछें:",
      cropAdvice: "🌱 फसल सिफारिशें",
      weatherInfo: "🌤️ मौसम और जलवायु",
      pestControl: "🐛 कीट नियंत्रण समाधान",
      irrigation: "💧 सिंचाई के तरीके",
      marketPrices: "💰 बाजार मूल्य",
      soilHealth: "🌱 मिट्टी की सेहत"
    },
    telugu: {
      title: "AI వ్యవసాయ అసిస్టెంట్",
      subtitle: "మీ స్మార్ట్ వ్యవసాయ సహచరుడు - పంటలు, వాతావరణం లేదా వ్యవసాయం గురించి ఏదైనా అడగండి!",
      placeholder: "వ్యవసాయం, పంటలు, వాతావరణం లేదా వ్యవసాయ సంబంధిత ప్రశ్న అడగండి...",
      send: "పంపు",
      listening: "వింటున్నాను...",
      askMeAnything: "ఇవి గురించి నన్ను అడగండి:",
      cropAdvice: "🌱 పంట సిఫార్సులు",
      weatherInfo: "🌤️ వాతావరణం & వాతావరణం",
      pestControl: "🐛 కీటకాల నియంత్రణ పరిష్కారాలు",
      irrigation: "💧 నీటిపారుదల చిట్కాలు",
      marketPrices: "💰 మార్కెట్ ధరలు",
      soilHealth: "🌱 నేల ఆరోగ్యం"
    }
  };

  // Add fallback to ensure currentLang is never undefined
  const currentLang = translations[language as keyof typeof translations] || translations.english;

  useEffect(() => {
    // Initialize with a welcome message
    const welcomeMessage = {
      id: '1',
      text: language === 'hindi' ? 
        "नमस्ते! मैं आपका AI कृषि सहायक हूं। मैं फसल की सिफारिश, मौसम की जानकारी, कीट नियंत्रण और खेती से जुड़े सभी सवालों में आपकी मदद कर सकता हूं।" :
        language === 'telugu' ?
        "నమస్కారం! నేను మీ AI వ్యవసాయ అసిస్టెంట్‌ని. పంట సిఫార్సులు, వాతావరణ సమాచారం, కీటకాల నియంత్రణ మరియు వ్యవసాయ సంబంధిత అన్ని ప్రశ్నలలో నేను మీకు సహాయం చేయగలను." :
        "Hello! I'm your AI farming assistant. I can help you with crop recommendations, weather information, pest control, and all farming-related questions.",
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [language]);

  const initializeSpeechRecognition = () => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = language === 'hindi' ? 'hi-IN' : language === 'telugu' ? 'te-IN' : 'en-IN';
        
        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputText(transcript);
          handleSendMessage(transcript);
        };
        
        recognition.onerror = () => {
          setIsListening(false);
          toast({
            title: "Speech Recognition Error",
            description: "Could not recognize speech. Please try again.",
            variant: "destructive"
          });
        };
        
        return recognition;
      }
    }
    return null;
  };

  const startListening = () => {
    const recognition = initializeSpeechRecognition();
    if (recognition) {
      recognitionRef.current = recognition;
      recognition.start();
    } else {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in this browser.",
        variant: "destructive"
      });
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hindi' ? 'hi-IN' : language === 'telugu' ? 'te-IN' : 'en-IN';
      utterance.rate = 0.8;
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const generateResponse = (userMessage: string) => {
    // Mock AI responses based on language
    const responses = {
      english: [
        "Based on your location and current weather conditions, I recommend growing rice this season. The monsoon is favorable for rice cultivation.",
        "For pest control, try neem oil spray early morning. It's organic and effective against most common pests.",
        "Current market prices for wheat are ₹2,200 per quintal. Prices are expected to rise next month.",
        "Your soil seems nitrogen-deficient. I recommend using urea fertilizer or organic compost.",
        "Weather forecast shows moderate rainfall this week. Perfect time for sowing seeds!"
      ],
      hindi: [
        "आपके स्थान और मौजूदा मौसम की स्थिति के आधार पर, मैं इस सीजन में धान उगाने की सलाह देता हूं। मानसून धान की खेती के लिए अनुकूल है।",
        "कीट नियंत्रण के लिए, सुबह जल्दी नीम का तेल स्प्रे करें। यह जैविक है और अधिकांश सामान्य कीटों के खिलाफ प्रभावी है।",
        "गेहूं की वर्तमान बाजार कीमत ₹2,200 प्रति क्विंटल है। अगले महीने कीमतों में वृद्धि की उम्मीद है।",
        "आपकी मिट्टी में नाइट्रोजन की कमी लगती है। मैं यूरिया उर्वरक या जैविक खाद का उपयोग करने की सलाह देता हूं।",
        "मौसम पूर्वानुमान इस सप्ताह मध्यम बारिश दिखाता है। बीज बोने का सही समय!"
      ],
      telugu: [
        "మీ స్థానం మరియు ప్రస్తుత వాతావరణ పరిస్థితుల ఆధారంగా, ఈ సీజన్‌లో వరిని పెంచమని నేను సిఫార్సు చేస్తున్నాను. వర్షాకాలం వరి సాగుకు అనుకూలంగా ఉంది.",
        "కీటకాల నియంత్రణ కోసం, ఉదయం వేగనే వేప నూనె స్ప్రే చేయండి. ఇది సేంద్రియమైనది మరియు చాలా సాధారణ కీటకాలకు వ్యతిరేకంగా ప్రభావవంతమైనది.",
        "గోధుమల ప్రస్తుత మార్కెట్ ధరలు క్వింటాల్‌కు ₹2,200. వచ్చే నెలలో ధరలు పెరుగుతాయని అంచనా.",
        "మీ మట్టిలో నత్రజని లోపం ఉన్నట్లు అనిపిస్తుంది. యూరియా ఎరువులు లేదా సేంద్రీయ కంపోస్ట్ ఉపయోగించమని నేను సిఫార్సు చేస్తున్నాను.",
        "వాతావరణ సూచన ఈ వారం మధ్యస్థ వర్షాలను చూపిస్తుంది. విత్తనాలు విత్తడానికి సరైన సమయం!"
      ]
    };

    const langResponses = responses[language as keyof typeof responses] || responses.english;
    return langResponses[Math.floor(Math.random() * langResponses.length)];
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    const userMessage = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    const aiResponse = {
      id: (Date.now() + 1).toString(),
      text: generateResponse(messageText),
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setInputText('');

    // Speak the AI response
    setTimeout(() => speakText(aiResponse.text), 500);
  };

  const quickQuestions = [
    currentLang.cropAdvice,
    currentLang.weatherInfo,
    currentLang.pestControl,
    currentLang.irrigation,
    currentLang.marketPrices,
    currentLang.soilHealth
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <Bot className="h-6 w-6" />
            {currentLang.title}
          </CardTitle>
          <p className="text-gray-600">{currentLang.subtitle}</p>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageCircle className="h-5 w-5" />
                Chat with AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50 space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isUser
                            ? 'bg-green-500 text-white'
                            : 'bg-white border border-gray-200 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        {!message.isUser && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 mt-1"
                            onClick={() => speakText(message.text)}
                            disabled={isSpeaking}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Textarea
                    placeholder={currentLang.placeholder}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    rows={2}
                    className="flex-1"
                  />
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => handleSendMessage()}
                      disabled={!inputText.trim()}
                      size="sm"
                    >
                      <Send className="h-4 w-4" />
                      <span className="ml-1 hidden sm:block">{currentLang.send}</span>
                    </Button>
                    <Button
                      onClick={startListening}
                      disabled={isListening}
                      variant="outline"
                      size="sm"
                      className={isListening ? 'bg-red-100' : ''}
                    >
                      <Mic className={`h-4 w-4 ${isListening ? 'text-red-500' : ''}`} />
                      {isListening && <span className="ml-1 text-xs">{currentLang.listening}</span>}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{currentLang.askMeAnything}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto py-2 px-3"
                    onClick={() => {
                      setInputText(question);
                      handleSendMessage(question);
                    }}
                  >
                    <span className="text-xs">{question}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
