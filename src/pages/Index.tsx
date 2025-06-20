
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Bot, Store, Newspaper, Headphones, MapPin, TrendingUp } from 'lucide-react';
import WeatherCard from '@/components/WeatherCard';
import MarketPrices from '@/components/MarketPrices';
import CropRecommendation from '@/components/CropRecommendation';
import IndiaMapDashboard from '@/components/IndiaMapDashboard';
import PestDetection from '@/components/PestDetection';
import WaterManagement from '@/components/WaterManagement';
import FarmingRoadmap from '@/components/FarmingRoadmap';
import CommunityForum from '@/components/CommunityForum';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            🌾 Welcome to AgriPlatform
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Your Complete Digital Farming Companion
          </p>
          <p className="text-lg mb-8 opacity-80 max-w-3xl mx-auto">
            Empowering Indian farmers with AI-driven insights, smart crop recommendations, 
            weather forecasting, an integrated fertilizer marketplace, and comprehensive farm management tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ai-assistant">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
                <Bot className="mr-2 h-5 w-5" />
                Try AI Assistant
              </Button>
            </Link>
            <Link to="/fertilizer-shop">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3">
                <Store className="mr-2 h-5 w-5" />
                Shop Fertilizers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Everything You Need for Smart Farming
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Link to="/ai-assistant">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardHeader className="text-center">
                  <Bot className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                  <CardTitle className="text-blue-800">AI Assistant</CardTitle>
                  <CardDescription>Get personalized farming advice and crop guidance</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/fertilizer-shop">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 bg-gradient-to-br from-green-50 to-green-100">
                <CardHeader className="text-center">
                  <Store className="w-12 h-12 mx-auto text-green-600 mb-4" />
                  <CardTitle className="text-green-800">Fertilizer Shop</CardTitle>
                  <CardDescription>Browse and buy quality fertilizers for your crops</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/news">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 bg-gradient-to-br from-orange-50 to-orange-100">
                <CardHeader className="text-center">
                  <Newspaper className="w-12 h-12 mx-auto text-orange-600 mb-4" />
                  <CardTitle className="text-orange-800">Agriculture News</CardTitle>
                  <CardDescription>Stay updated with latest farming news and trends</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/podcasts">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                <CardHeader className="text-center">
                  <Headphones className="w-12 h-12 mx-auto text-purple-600 mb-4" />
                  <CardTitle className="text-purple-800">Podcasts</CardTitle>
                  <CardDescription>Listen to expert farmers and agricultural scientists</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive India Map */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            <MapPin className="inline-block mr-2 h-8 w-8" />
            Explore Farming Across India
          </h2>
          <IndiaMapDashboard />
        </div>
      </section>

      {/* Dashboard Components Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <WeatherCard language="english" />
            <MarketPrices language="english" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <CropRecommendation language="english" />
            <PestDetection language="english" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <WaterManagement language="english" />
            <FarmingRoadmap language="english" />
          </div>
          
          <CommunityForum language="english" />
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Farming?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of farmers who are already using AgriPlatform to increase their yields and profits.
          </p>
          <Link to="/auth?mode=signup">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
