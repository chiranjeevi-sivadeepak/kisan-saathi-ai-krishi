import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Home, Bot, Store, LogOut, Menu, X, Leaf } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cartStore';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { items } = useCartStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const translations = {
    english: {
      home: "Home",
      aiAssistant: "AI Assistant", 
      cropRecommendation: "Crop Recommendations",
      pestDetection: "Pest Detection",
      fertilizerShop: "Fertilizer Shop",
      contact: "Contact",
      profile: "Profile",
      signOut: "Sign Out",
      signIn: "Sign In",
      signUp: "Sign Up"
    },
    hindi: {
      home: "होम",
      aiAssistant: "AI सहायक",
      cropRecommendation: "फसल सिफारिशें",
      pestDetection: "कीट पहचान",
      fertilizerShop: "उर्वरक दुकान",
      contact: "संपर्क",
      profile: "प्रोफाइल",
      signOut: "साइन आउट",
      signIn: "साइन इन",
      signUp: "साइन अप"
    },
    telugu: {
      home: "హోమ్",
      aiAssistant: "AI అసిస్టెంట్",
      cropRecommendation: "పంట సిఫార్సులు",
      pestDetection: "కీటకాల గుర్తింపు",
      fertilizerShop: "ఎరువుల దుకాణం",
      contact: "సంప్రదించండి",
      profile: "ప్రొఫైల్",
      signOut: "సైన్ అవుట్",
      signIn: "సైన్ ఇన్",
      signUp: "సైన్ అప్"
    }
  };

  const currentLang = translations[language as keyof typeof translations] || translations.english;

  return (
    <nav className="bg-transparent backdrop-blur-md text-white shadow-xl sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-white hover:text-green-200 transition-colors">
              <div className="bg-white p-2 rounded-full">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <span>AgriPlatform</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-1 hover:text-green-200 transition-colors">
              <Home className="w-4 h-4" />
              <span>{currentLang.home}</span>
            </Link>
            <Link to="/ai-assistant" className="flex items-center space-x-1 hover:text-green-200 transition-colors">
              <Bot className="w-4 h-4" />
              <span>{currentLang.aiAssistant}</span>
            </Link>
            <Link to="/crop-recommendations" className="flex items-center space-x-1 hover:text-green-200 transition-colors">
              <Leaf className="w-4 h-4" />
              <span>{currentLang.cropRecommendation}</span>
            </Link>
            <Link to="/pest-detection" className="flex items-center space-x-1 hover:text-green-200 transition-colors">
              <span>🔍</span>
              <span>{currentLang.pestDetection}</span>
            </Link>
            <Link to="/fertilizer-shop" className="flex items-center space-x-1 hover:text-green-200 transition-colors">
              <Store className="w-4 h-4" />
              <span>{currentLang.fertilizerShop}</span>
            </Link>
            <Link to="/contact" className="hover:text-green-200 transition-colors">
              {currentLang.contact}
            </Link>
          </div>

          {/* Right side items */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            
            {user ? (
              <>
                <Link to="/cart" className="relative">
                  <Button variant="ghost" size="sm" className="text-white hover:text-green-200">
                    <ShoppingCart className="w-5 h-5" />
                    {cartItemsCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full">
                        {cartItemsCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="text-white hover:text-green-200">
                    <User className="w-5 h-5" />
                    <span className="ml-1">{currentLang.profile}</span>
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="text-white hover:text-green-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="ml-1">{currentLang.signOut}</span>
                </Button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-green-600">
                    {currentLang.signIn}
                  </Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button size="sm" className="bg-white text-green-600 hover:bg-green-50">
                    {currentLang.signUp}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-white hover:text-green-200"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-black/80 backdrop-blur-md py-4 space-y-4 border-t border-white/10">
            <div className="flex flex-col space-y-4 px-4">
              <LanguageSwitcher />
              
              <Link 
                to="/" 
                className="flex items-center space-x-2 hover:text-green-200 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="w-4 h-4" />
                <span>{currentLang.home}</span>
              </Link>
              
              <Link 
                to="/ai-assistant" 
                className="flex items-center space-x-2 hover:text-green-200 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Bot className="w-4 h-4" />
                <span>{currentLang.aiAssistant}</span>
              </Link>
              
              <Link 
                to="/crop-recommendations" 
                className="flex items-center space-x-2 hover:text-green-200 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Leaf className="w-4 h-4" />
                <span>{currentLang.cropRecommendation}</span>
              </Link>
              
              <Link 
                to="/pest-detection" 
                className="flex items-center space-x-2 hover:text-green-200 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>🔍</span>
                <span>{currentLang.pestDetection}</span>
              </Link>
              
              <Link 
                to="/fertilizer-shop" 
                className="flex items-center space-x-2 hover:text-green-200 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Store className="w-4 h-4" />
                <span>{currentLang.fertilizerShop}</span>
              </Link>
              
              <Link 
                to="/contact" 
                className="hover:text-green-200 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {currentLang.contact}
              </Link>

              {user ? (
                <>
                  <Link 
                    to="/cart" 
                    className="flex items-center space-x-2 hover:text-green-200 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Cart</span>
                    {cartItemsCount > 0 && (
                      <Badge className="bg-red-500 text-white text-xs">
                        {cartItemsCount}
                      </Badge>
                    )}
                  </Link>
                  
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 hover:text-green-200 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>{currentLang.profile}</span>
                  </Link>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-white hover:text-green-200 justify-start p-0"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>{currentLang.signOut}</span>
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link 
                    to="/auth"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="outline" size="sm" className="w-full text-white border-white hover:bg-white hover:text-green-600">
                      {currentLang.signIn}
                    </Button>
                  </Link>
                  <Link 
                    to="/auth?mode=signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button size="sm" className="w-full bg-white text-green-600 hover:bg-green-50">
                      {currentLang.signUp}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
