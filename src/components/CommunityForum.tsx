
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, MessageCircle, ThumbsUp, Share, Plus, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CommunityForumProps {
  language: string;
}

const CommunityForum: React.FC<CommunityForumProps> = ({ language }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Rajesh Kumar',
      location: 'Punjab',
      title: 'Best wheat varieties for this season?',
      content: 'Looking for recommendations on high-yield wheat varieties suitable for Punjab climate. Any suggestions from fellow farmers?',
      likes: 12,
      replies: 8,
      timestamp: '2 hours ago',
      tags: ['wheat', 'varieties', 'punjab'],
      expert: false
    },
    {
      id: 2,
      author: 'Dr. Priya Sharma',
      location: 'Agricultural Expert',
      title: 'Organic pest control methods for cotton',
      content: 'Here are some effective organic methods to control pests in cotton: 1) Neem oil spray 2) Beneficial insects 3) Crop rotation...',
      likes: 25,
      replies: 15,
      timestamp: '4 hours ago',
      tags: ['cotton', 'organic', 'pest-control'],
      expert: true
    },
    {
      id: 3,
      author: 'Sunita Devi',
      location: 'Haryana',
      title: 'Water conservation techniques working well',
      content: 'Sharing my success with drip irrigation. Reduced water usage by 40% and increased yield by 15%. Happy to share details!',
      likes: 18,
      replies: 12,
      timestamp: '6 hours ago',
      tags: ['water-conservation', 'drip-irrigation', 'success-story'],
      expert: false
    }
  ]);

  const [newPost, setNewPost] = useState({ title: '', content: '', tags: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const translations = {
    english: {
      title: "Farmer Community Forum",
      subtitle: "Connect with fellow farmers and agricultural experts",
      askQuestion: "Ask a Question",
      searchPlaceholder: "Search discussions...",
      postTitle: "Question Title",
      postContent: "Describe your question or share your experience",
      tags: "Tags (comma separated)",
      submitPost: "Post Question",
      expert: "Expert",
      farmer: "Farmer",
      likes: "likes",
      replies: "replies",
      popularTopics: "Popular Topics",
      recentDiscussions: "Recent Discussions"
    },
    hindi: {
      title: "किसान समुदाय मंच",
      subtitle: "साथी किसानों और कृषि विशेषज्ञों से जुड़ें",
      askQuestion: "प्रश्न पूछें",
      searchPlaceholder: "चर्चा खोजें...",
      postTitle: "प्रश्न शीर्षक",
      postContent: "अपना प्रश्न या अनुभव साझा करें",
      tags: "टैग (कॉमा से अलग करें)",
      submitPost: "प्रश्न पोस्ट करें",
      expert: "विशेषज्ञ",
      farmer: "किसान",
      likes: "पसंद",
      replies: "उत्तर",
      popularTopics: "लोकप्रिय विषय",
      recentDiscussions: "हाल की चर्चाएं"
    },
    telugu: {
      title: "రైతు కమ్యూనిటీ ఫోరమ్",
      subtitle: "తోటి రైతులు మరియు వ్యవసాయ నిపుణులతో అనుసంధానం",
      askQuestion: "ప్రశ్న అడగండి",
      searchPlaceholder: "చర్చలను వెతకండి...",
      postTitle: "ప్రశ్న శీర్షిక",
      postContent: "మీ ప్రశ్న లేదా అనుభవాన్ని పంచుకోండి",
      tags: "ట్యాగ్‌లు (కామాతో వేరు చేయండి)",
      submitPost: "ప్రశ్న పోస్ట్ చేయండి",
      expert: "నిపుణుడు",
      farmer: "రైతు",
      likes: "ఇష్టాలు",
      replies: "సమాధానాలు",
      popularTopics: "ప్రముఖ అంశాలు",
      recentDiscussions: "ఇటీవలి చర్చలు"
    }
  };

  const currentLang = translations[language];

  const popularTopics = [
    'crop-rotation', 'organic-farming', 'pest-control', 'water-management', 
    'soil-health', 'market-prices', 'government-schemes', 'seeds-varieties'
  ];

  const handleSubmitPost = () => {
    if (!newPost.title || !newPost.content) return;

    const post = {
      id: posts.length + 1,
      author: 'You',
      location: 'Your Location',
      title: newPost.title,
      content: newPost.content,
      likes: 0,
      replies: 0,
      timestamp: 'Just now',
      tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      expert: false
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', tags: '' });
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-700">
            <Users className="h-6 w-6" />
            {currentLang.title}
          </CardTitle>
          <p className="text-gray-600">{currentLang.subtitle}</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder={currentLang.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="bg-white rounded-lg p-4 border border-indigo-200">
            <h3 className="font-semibold mb-3 flex items-center gap-2 text-indigo-700">
              <Plus className="h-4 w-4" />
              {currentLang.askQuestion}
            </h3>
            <div className="space-y-3">
              <Input
                placeholder={currentLang.postTitle}
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
              <Textarea
                placeholder={currentLang.postContent}
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                rows={3}
              />
              <Input
                placeholder={currentLang.tags}
                value={newPost.tags}
                onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
              />
              <Button 
                onClick={handleSubmitPost}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                disabled={!newPost.title || !newPost.content}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {currentLang.submitPost}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-3 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            {currentLang.recentDiscussions}
          </h2>
          
          {filteredPosts.map((post) => (
            <Card key={post.id} className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-indigo-100 text-indigo-600">
                      {post.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-800">{post.author}</h3>
                      <Badge variant={post.expert ? "default" : "secondary"} className="text-xs">
                        {post.expert ? currentLang.expert : currentLang.farmer}
                      </Badge>
                      <span className="text-xs text-gray-500">{post.location}</span>
                      <span className="text-xs text-gray-400">• {post.timestamp}</span>
                    </div>
                    
                    <h4 className="text-lg font-medium text-gray-900">{post.title}</h4>
                    <p className="text-gray-700 text-sm">{post.content}</p>
                    
                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 pt-2 text-sm text-gray-500">
                      <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                        <ThumbsUp className="h-4 w-4" />
                        {post.likes} {currentLang.likes}
                      </button>
                      <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        {post.replies} {currentLang.replies}
                      </button>
                      <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                        <Share className="h-4 w-4" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-700 text-lg">
                {currentLang.popularTopics}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {popularTopics.map((topic, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-colors"
                    onClick={() => setSearchTerm(topic)}
                  >
                    #{topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-green-700 mb-2">💡 Expert Tip</h3>
              <p className="text-sm text-green-600">
                Join our community discussions to learn from experienced farmers and agricultural experts across India!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;
