
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Headphones, Play, Pause, User, Clock } from 'lucide-react';

interface Podcast {
  id: string;
  title: string;
  description: string;
  audio_url: string;
  transcript?: string;
  guest_name?: string;
  guest_role?: string;
  duration?: number;
  language: string;
  created_at: string;
}

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  useEffect(() => {
    fetchPodcasts();
  }, [selectedLanguage]);

  const fetchPodcasts = async () => {
    try {
      const { data, error } = await supabase
        .from('podcasts')
        .select('*')
        .eq('language', selectedLanguage)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPodcasts(data || []);
    } catch (error) {
      console.error('Error fetching podcasts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const togglePlayback = (podcastId: string) => {
    if (currentlyPlaying === podcastId) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(podcastId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading podcasts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <Headphones className="inline-block mr-2 h-10 w-10" />
            Agriculture Podcasts
          </h1>
          <p className="text-xl text-gray-600">Listen to expert farmers and agricultural scientists</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {podcasts.map((podcast) => (
            <Card key={podcast.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{podcast.title}</CardTitle>
                <CardDescription>{podcast.description}</CardDescription>
                
                {podcast.guest_name && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{podcast.guest_name}</span>
                    {podcast.guest_role && (
                      <>
                        <span>•</span>
                        <span>{podcast.guest_role}</span>
                      </>
                    )}
                  </div>
                )}
                
                {podcast.duration && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(podcast.duration)}</span>
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => togglePlayback(podcast.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {currentlyPlaying === podcast.id ? (
                      <Pause className="w-4 h-4 mr-2" />
                    ) : (
                      <Play className="w-4 h-4 mr-2" />
                    )}
                    {currentlyPlaying === podcast.id ? 'Pause' : 'Play'}
                  </Button>
                  
                  <Badge variant="outline">{podcast.language}</Badge>
                </div>
                
                {currentlyPlaying === podcast.id && (
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <audio 
                      controls 
                      className="w-full"
                      src={podcast.audio_url}
                      onEnded={() => setCurrentlyPlaying(null)}
                    >
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
                
                {podcast.transcript && (
                  <details className="bg-gray-50 p-4 rounded-lg">
                    <summary className="cursor-pointer font-medium">Show Transcript</summary>
                    <p className="mt-2 text-sm text-gray-600">{podcast.transcript}</p>
                  </details>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {podcasts.length === 0 && (
          <div className="text-center py-12">
            <Headphones className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No podcasts available</h3>
            <p className="text-gray-500">Check back later for new episodes</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Podcasts;
