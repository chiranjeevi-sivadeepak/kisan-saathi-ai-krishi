
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, MessageCircle, Lightbulb, MapPin } from 'lucide-react';
import AIAssistant from '@/components/AIAssistant';

const AIAssistantPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full">
              <Bot className="w-16 h-16" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            AI Farming Assistant
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Get personalized farming advice, crop recommendations, and expert guidance powered by artificial intelligence
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center border-0 bg-white shadow-lg">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <MessageCircle className="w-12 h-12 text-blue-600" />
                </div>
                <CardTitle className="text-blue-800">Smart Conversations</CardTitle>
                <CardDescription>
                  Chat naturally with our AI to get instant answers to your farming questions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-0 bg-white shadow-lg">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Lightbulb className="w-12 h-12 text-green-600" />
                </div>
                <CardTitle className="text-green-800">Expert Recommendations</CardTitle>
                <CardDescription>
                  Receive personalized crop and fertilizer suggestions based on your specific needs
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-0 bg-white shadow-lg">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <MapPin className="w-12 h-12 text-purple-600" />
                </div>
                <CardTitle className="text-purple-800">Location-Specific Advice</CardTitle>
                <CardDescription>
                  Get guidance tailored to your local climate, soil, and growing conditions
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Assistant Component */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
              <CardTitle className="text-2xl">Start Your Conversation</CardTitle>
              <CardDescription className="text-blue-100">
                Ask anything about farming, crops, fertilizers, or agricultural practices
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <AIAssistant language="english" />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            How to Get the Best Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Be Specific</h3>
              <p className="text-blue-700">
                Mention your location, crop type, and current growing conditions for more accurate advice.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Ask Follow-ups</h3>
              <p className="text-green-700">
                Don't hesitate to ask for clarification or additional details about any recommendation.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Share Your Goals</h3>
              <p className="text-purple-700">
                Tell us about your farming goals, budget, and timeline for better suggestions.
              </p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-2">Upload Images</h3>
              <p className="text-orange-700">
                Share photos of your crops or fields for visual analysis and specific guidance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIAssistantPage;
