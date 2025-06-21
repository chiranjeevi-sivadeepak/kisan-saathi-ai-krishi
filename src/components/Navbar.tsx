
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
      aiAssistant: "AI Chat", 
      cropRecommendation: "Crops",
      pestDetection: "Pest ID",
      fertilizerShop: "Shop",
      contact: "Contact",
      profile: "Profile",
      signOut: "Sign Out",
      signIn: "Sign In",
      signUp: "Sign Up"
    },
    hindi: {
      home: "होम",
      aiAssistant: "AI चैट",
      cropRecommendation: "फसल",
      pestDetection: "कीट",
      fertilizerShop: "दुकान",
      contact: "संपर्क",
      profile: "प्रोफाइल",
      signOut: "साइन आउट",
      signIn: "साइन इन",
      signUp: "साइन अप"
    },
    telugu: {
      home: "హోమ్",
      aiAssistant: "AI చాట్",
      cropRecommendation: "పంటలు",
      pestDetection: "కీటకాలు",
      fertilizerShop: "దుకాణం",
      contact: "సంప్రదించు",
      profile: "ప్రొఫైల్",
      signOut: "సైన్ అవుట్",
      signIn: "సైన్ ఇన్",
      signUp: "సైన్ అప్"
    }
  };

  const currentLang = translations[language as keyof typeof translations] || translations.english;

  return (
    <nav className="bg-black/90 backdrop-blur-md text-white shadow-xl sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2 text-lg sm:text-xl font-bold text-white hover:text-yellow-400 transition-colors">
              <div className="bg-white p-1.5 sm:p-2 rounded-full">
                <Leaf className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-600" />
              </div>
              <span className="hidden sm:block">AgriPlatform</span>
              <span className="sm:hidden text-sm">Agri</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <Link to="/" className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors font-medium text-sm">
              <Home className="w-4 h-4" />
              <span>{currentLang.home}</span>
            </Link>
            <Link to="/ai-assistant" className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors font-medium text-sm">
              <Bot className="w-4 h-4" />
              <span>{currentLang.aiAssistant}</span>
            </Link>
            <Link to="/crop-recommendations" className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors font-medium text-sm">
              <Leaf className="w-4 h-4" />
              <span>{currentLang.cropRecommendation}</span>
            </Link>
            <Link to="/pest-detection" className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors font-medium text-sm">
              <span>🔍</span>
              <span>{currentLang.pestDetection}</span>
            </Link>
            <Link to="/fertilizer-shop" className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors font-medium text-sm">
              <Store className="w-4 h-4" />
              <span>{currentLang.fertilizerShop}</span>
            </Link>
            <Link to="/contact" className="text-white hover:text-yellow-400 transition-colors font-medium text-sm">
              {currentLang.contact}
            </Link>
          </div>

          {/* Right side items */}
          <div className="hidden lg:flex items-center space-x-3">
            <LanguageSwitcher />
            
            {user ? (
              <>
                <Link to="/cart" className="relative">
                  <Button variant="ghost" size="sm" className="text-white hover:text-yellow-400 hover:bg-white/20 border border-white/30">
                    <ShoppingCart className="w-4 h-4" />
                    {cartItemsCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full">
                        {cartItemsCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="text-white hover:text-yellow-400 hover:bg-white/20 border border-white/30">
                    <User className="w-4 h-4" />
                    <span className="ml-1 text-sm">{currentLang.profile}</span>
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="text-white hover:text-yellow-400 hover:bg-white/20 border border-white/30"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="ml-1 text-sm">{currentLang.signOut}</span>
                </Button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="text-white border-white/50 hover:bg-white hover:text-black text-sm px-3 py-1.5">
                    {currentLang.signIn}
                  </Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button size="sm" className="bg-yellow-600 text-black hover:bg-yellow-500 text-sm px-3 py-1.5">
                    {currentLang.signUp}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button and cart icon */}
          <div className="lg:hidden flex items-center space-x-2">
            {user && (
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="sm" className="text-white hover:text-yellow-400 hover:bg-white/20 border border-white/30 p-2">
                  <ShoppingCart className="w-4 h-4" />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 min-w-[1rem] h-4 flex items-center justify-center rounded-full">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-white hover:text-yellow-400 hover:bg-white/20 border border-white/30 p-2"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-md py-4 space-y-3 border-t border-white/20 rounded-b-lg">
            <div className="flex flex-col space-y-3 px-4">
              <div className="pb-2">
                <LanguageSwitcher />
              </div>
              
              <Link 
                to="/" 
                className="flex items-center space-x-3 text-white hover:text-yellow-400 transition-colors py-2 font-medium border-b border-white/10 pb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="w-5 h-5" />
                <span>{currentLang.home}</span>
              </Link>
              
              <Link 
                to="/ai-assistant" 
                className="flex items-center space-x-3 text-white hover:text-yellow-400 transition-colors py-2 font-medium border-b border-white/10 pb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Bot className="w-5 h-5" />
                <span>{currentLang.aiAssistant}</span>
              </Link>
              
              <Link 
                to="/crop-recommendations" 
                className="flex items-center space-x-3 text-white hover:text-yellow-400 transition-colors py-2 font-medium border-b border-white/10 pb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Leaf className="w-5 h-5" />
                <span>{currentLang.cropRecommendation}</span>
              </Link>
              
              <Link 
                to="/pest-detection" 
                className="flex items-center space-x-3 text-white hover:text-yellow-400 transition-colors py-2 font-medium border-b border-white/10 pb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-lg">🔍</span>
                <span>{currentLang.pestDetection}</span>
              </Link>
              
              <Link 
                to="/fertilizer-shop" 
                className="flex items-center space-x-3 text-white hover:text-yellow-400 transition-colors py-2 font-medium border-b border-white/10 pb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Store className="w-5 h-5" />
                <span>{currentLang.fertilizerShop}</span>
              </Link>
              
              <Link 
                to="/contact" 
                className="text-white hover:text-yellow-400 transition-colors py-2 font-medium border-b border-white/10 pb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {currentLang.contact}
              </Link>

              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-3 text-white hover:text-yellow-400 transition-colors py-2 font-medium border-b border-white/10 pb-2"
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
                    className="text-white hover:text-yellow-400 hover:bg-white/20 justify-start p-0 font-medium border-b border-white/10 pb-2"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    <span>{currentLang.signOut}</span>
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-3 pt-2">
                  <Link 
                    to="/auth"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="outline" size="sm" className="w-full text-white border-white/50 hover:bg-white hover:text-black">
                      {currentLang.signIn}
                    </Button>
                  </Link>
                  <Link 
                    to="/auth?mode=signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button size="sm" className="w-full bg-yellow-600 text-black hover:bg-yellow-500">
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
