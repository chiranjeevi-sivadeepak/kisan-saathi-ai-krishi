
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Newspaper, Clock, MapPin } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  location: string;
  language: string;
  image_url?: string;
  source?: string;
  published_at: string;
}

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  useEffect(() => {
    fetchNews();
  }, [selectedLanguage]);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('language', selectedLanguage)
        .order('published_at', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading latest news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <Newspaper className="inline-block mr-2 h-10 w-10" />
            Agriculture News
          </h1>
          <p className="text-xl text-gray-600">Stay updated with the latest farming news</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedLanguage('english')}
              className={`px-4 py-2 rounded-lg ${
                selectedLanguage === 'english'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setSelectedLanguage('telugu')}
              className={`px-4 py-2 rounded-lg ${
                selectedLanguage === 'telugu'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              తెలుగు
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="outline">{item.category}</Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(item.published_at).toLocaleDateString()}
                  </div>
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                {item.location && (
                  <CardDescription className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {item.location}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-3">{item.content}</p>
                {item.source && (
                  <p className="text-sm text-gray-500 mt-2">Source: {item.source}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {news.length === 0 && (
          <div className="text-center py-12">
            <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No news available</h3>
            <p className="text-gray-500">Check back later for the latest updates</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
