
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, MicOff, Send, Volume2, VolumeX, MessageCircle, Leaf } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIAssistantProps {
  language: string;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ language }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const translations = {
    english: {
      title: "AI Farming Assistant",
      subtitle: "Ask me anything about farming, crops, irrigation, or pest control",
      placeholder: "Type your farming question here...",
      listening: "Listening...",
      startListening: "Start Voice Input",
      stopListening: "Stop Listening",
      speak: "Speak Response",
      stopSpeaking: "Stop Speaking",
      send: "Send",
      thinking: "AI is thinking...",
      welcomeMessage: "Hello! I'm your AI farming assistant. I can help you with crop recommendations, pest control, irrigation tips, and more. What would you like to know?",
      voiceNotSupported: "Voice recognition is not supported in your browser.",
      speakingError: "Text-to-speech is not supported in your browser."
    },
    hindi: {
      title: "AI कृषि सहायक",
      subtitle: "खेती, फसल, सिंचाई या कीट नियंत्रण के बारे में कुछ भी पूछें",
      placeholder: "यहाँ अपना कृषि प्रश्न टाइप करें...",
      listening: "सुन रहा हूँ...",
      startListening: "आवाज़ इनपुट शुरू करें",
      stopListening: "सुनना बंद करें",
      speak: "उत्तर बोलें",
      stopSpeaking: "बोलना बंद करें",
      send: "भेजें",
      thinking: "AI सोच रहा है...",
      welcomeMessage: "नमस्ते! मैं आपका AI कृषि सहायक हूँ। मैं आपकी फसल सिफारिशों, कीट नियंत्रण, सिंचाई युक्तियों और अधिक में मदद कर सकता हूँ। आप क्या जानना चाहते हैं?",
      voiceNotSupported: "आपके ब्राउज़र में आवाज़ पहचान समर्थित नहीं है।",
      speakingError: "आपके ब्राউज़र में टेक्स्ट-टू-स्पीच समर्थित नहीं है।"
    },
    telugu: {
      title: "AI వ్యవసాయ సహాయకుడు",
      subtitle: "వ్యవసాయం, పంటలు, నీటిపారుదల లేదా కీటకాల నియంత్రణ గురించి ఏదైనా అడగండి",
      placeholder: "మీ వ్యవసాయ ప్రశ్నను ఇక్కడ టైప్ చేయండి...",
      listening: "వింటున్నాను...",
      startListening: "వాయిస్ ఇన్‌పుట్ ప్రారంభించండి",
      stopListening: "వినడం ఆపండి",
      speak: "సమాధానం చెప్పండి",
      stopSpeaking: "మాట్లాడడం ఆపండి",
      send: "పంపండి",
      thinking: "AI ఆలోచిస్తోంది...",
      welcomeMessage: "నమస్కారం! నేను మీ AI వ్యవసాయ సహాయకుడిని. పంట సిఫార్సులు, కీటకాల నియంత్రణ, నీటిపారుదల చిట్కాలు మరియు మరిన్నింటిలో నేను మీకు సహాయం చేయగలను. మీరు ఏమి తెలుసుకోవాలని అనుకుంటున్నారు?",
      voiceNotSupported: "మీ ब्राउজర్‌లో వాయిస్ రికగ్నిషన్ మద్దతు లేదు.",
      speakingError: "మీ ब्राउजर్‌లో టెక్స్ట్-టు-స్పీచ్ మద్దతు లేదు."
    }
  };

  const currentLang = translations[language];

  useEffect(() => {
    // Add welcome message
    const welcomeMessage: Message = {
      id: 'welcome',
      text: currentLang.welcomeMessage,
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice Recognition",
        description: currentLang.voiceNotSupported,
        variant: "destructive"
      });
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = language === 'hindi' ? 'hi-IN' : language === 'telugu' ? 'te-IN' : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: "Voice Error",
        description: "Could not recognize speech. Please try again.",
        variant: "destructive"
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hindi' ? 'hi-IN' : language === 'telugu' ? 'te-IN' : 'en-US';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Speech Error",
        description: currentLang.speakingError,
        variant: "destructive"
      });
    }
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const generateResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI response with farming knowledge
    const responses = {
      english: {
        crop: "For your region, I recommend rice cultivation during monsoon season. Ensure proper water management and use disease-resistant varieties. Would you like specific variety recommendations?",
        pest: "Based on your description, this appears to be a common pest issue. Try neem oil spray or introduce beneficial insects like ladybugs. Maintain proper crop rotation to prevent future infestations.",
        weather: "Current weather shows high humidity which is good for rice but watch for potential fungal diseases. Consider applying preventive fungicides if needed.",
        irrigation: "For efficient water use, try drip irrigation or alternate wetting and drying method. This can save 30-40% water while maintaining yield.",
        default: "I understand your concern about farming. Let me help you with the best practices based on current agricultural research and traditional knowledge."
      },
      hindi: {
        crop: "आपके क्षेत्र के लिए, मैं मानसून के मौसम में धान की खेती की सिफारिश करता हूं। उचित जल प्रबंधन सुनिश्चित करें और रोग प्रतिरोधी किस्मों का उपयोग करें।",
        pest: "आपके विवरण के आधार पर, यह एक सामान्य कीट समस्या लगती है। नीम के तेल का छिड़काव करें या लेडीबग जैसे लाभकारी कीड़े डालें।",
        weather: "वर्तमान मौसम में उच्च आर्द्रता है जो चावल के लिए अच्छी है लेकिन फंगल रोगों के लिए सावधान रहें।",
        irrigation: "कुशल पानी के उपयोग के लिए, ड्रिप सिंचाई या वैकल्पिक गीला और सुखाने की विधि का प्रयास करें।",
        default: "मैं खेती के बारे में आपकी चिंता को समझता हूं। वर्तमान कृषि अनुसंधान और पारंपरिक ज्ञान के आधार पर मैं आपकी सहायता करूंगा।"
      },
      telugu: {
        crop: "మీ ప్రాంతానికి, వర్షాకాలంలో వరి సాగును సిఫార్సు చేస్తున్నాను. సరైన నీటి నిర్వహణను నిర్ధారించండి మరియు వ్యాధి నిరోధక రకాలను ఉపయోగించండి.",
        pest: "మీ వివరణ బట్టి, ఇది సాధారణ కీటక సమస్యగా అనిపిస్తుంది. వేప నూనె స్ప్రే చేయండి లేదా లేడీబగ్స్ వంటి మేలైన కీటకాలను ప్రవేశపెట్టండి.",
        weather: "ప్రస్తుత వాతావరణంలో అధిక తేమ ఉంది, ఇది వరికి మంచిది కానీ ఫంగల్ వ్యాధుల కోసం జాగ్రత్తగా ఉండండి.",
        irrigation: "సమర్థవంతమైన నీటి వినియోగం కోసం, డ్రిప్ ఇరిగేషన్ లేదా ప్రత్యామ్నాయ తడిపి ఎండబెట్టే పద్ధతిని ప్రయత్నించండి.",
        default: "వ్యవసాయం గురించి మీ ఆందోళనను నేను అర్థం చేసుకుంటున్నాను. ప్రస్తుత వ్యవసాయ పరిశోధన మరియు సాంప్రదాయ జ్ఞానం ఆధారంగా నేను మీకు సహాయం చేస్తాను."
      }
    };

    const langResponses = responses[language] || responses.english;
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('crop') || lowerMessage.includes('పంట') || lowerMessage.includes('फसल')) {
      return langResponses.crop;
    } else if (lowerMessage.includes('pest') || lowerMessage.includes('कीट') || lowerMessage.includes('కీటక')) {
      return langResponses.pest;
    } else if (lowerMessage.includes('weather') || lowerMessage.includes('मौसम') || lowerMessage.includes('వాతావరణ')) {
      return langResponses.weather;
    } else if (lowerMessage.includes('water') || lowerMessage.includes('irrigation') || lowerMessage.includes('पानी') || lowerMessage.includes('నీరు')) {
      return langResponses.irrigation;
    }
    
    return langResponses.default;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await generateResponse(inputText);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Auto-speak the response
      setTimeout(() => speakText(response), 500);
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-[600px] flex flex-col bg-gradient-to-b from-green-50 to-blue-50">
      <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          {currentLang.title}
        </CardTitle>
        <p className="text-green-100 text-sm">{currentLang.subtitle}</p>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isUser
                    ? 'bg-green-500 text-white'
                    : 'bg-white border border-green-200 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                  {!message.isUser && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => speakText(message.text)}
                      className="h-6 w-6 p-1"
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-green-200 text-gray-800 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Leaf className="h-4 w-4 animate-pulse text-green-500" />
                  <span className="text-sm">{currentLang.thinking}</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t pt-4">
          <div className="flex gap-2 mb-2">
            <Button
              variant={isListening ? "destructive" : "outline"}
              size="sm"
              onClick={isListening ? () => setIsListening(false) : startListening}
              className="flex items-center gap-1"
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              <span className="hidden sm:block">
                {isListening ? currentLang.stopListening : currentLang.startListening}
              </span>
            </Button>
            
            <Button
              variant={isSpeaking ? "destructive" : "outline"}
              size="sm"
              onClick={isSpeaking ? stopSpeaking : () => {}}
              disabled={!isSpeaking}
              className="flex items-center gap-1"
            >
              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              <span className="hidden sm:block">
                {isSpeaking ? currentLang.stopSpeaking : currentLang.speak}
              </span>
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={currentLang.placeholder}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputText.trim() || isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;
