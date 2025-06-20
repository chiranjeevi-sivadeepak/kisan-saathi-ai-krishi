
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Home, Bot, Store, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cartStore';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { items } = useCartStore();
  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-green-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-white hover:text-green-200 transition-colors">
              🌾 AgriPlatform
            </Link>
            
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="flex items-center space-x-1 hover:text-green-200 transition-colors">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link to="/ai-assistant" className="flex items-center space-x-1 hover:text-green-200 transition-colors">
                <Bot className="w-4 h-4" />
                <span>AI Assistant</span>
              </Link>
              <Link to="/fertilizer-shop" className="flex items-center space-x-1 hover:text-green-200 transition-colors">
                <Store className="w-4 h-4" />
                <span>Fertilizer Shop</span>
              </Link>
              <Link to="/news" className="hover:text-green-200 transition-colors">
                News
              </Link>
              <Link to="/podcasts" className="hover:text-green-200 transition-colors">
                Podcasts
              </Link>
              <Link to="/contact" className="hover:text-green-200 transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
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
                    <span className="ml-1">Profile</span>
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="text-white hover:text-green-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="ml-1">Sign Out</span>
                </Button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="text-green-600 border-white hover:bg-white">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button size="sm" className="bg-white text-green-600 hover:bg-green-50">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
