
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useCartStore } from '@/store/cartStore';
import { toast } from '@/components/ui/use-toast';
import { Search, ShoppingCart, Tag, Leaf, AlertCircle, CheckCircle } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type Fertilizer = Tables<'fertilizers'>;

const FertilizerShop = () => {
  const [fertilizers, setFertilizers] = useState<Fertilizer[]>([]);
  const [filteredFertilizers, setFilteredFertilizers] = useState<Fertilizer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const { addItem } = useCartStore();

  useEffect(() => {
    fetchFertilizers();
  }, []);

  useEffect(() => {
    filterFertilizers();
  }, [fertilizers, searchTerm, selectedCategory, selectedSeason]);

  const fetchFertilizers = async () => {
    try {
      const { data, error } = await supabase
        .from('fertilizers')
        .select('*')
        .order('name');

      if (error) throw error;
      setFertilizers(data || []);
    } catch (error) {
      console.error('Error fetching fertilizers:', error);
      toast({
        title: "Error",
        description: "Failed to load fertilizers",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterFertilizers = () => {
    let filtered = fertilizers;

    if (searchTerm) {
      filtered = filtered.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.suitable_crops?.some(crop => crop.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(f => f.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedSeason !== 'all') {
      filtered = filtered.filter(f => f.season?.toLowerCase() === selectedSeason.toLowerCase());
    }

    setFilteredFertilizers(filtered);
  };

  const handleAddToCart = (fertilizer: Fertilizer) => {
    addItem({
      id: fertilizer.id,
      name: fertilizer.name,
      price: fertilizer.price,
      image_url: fertilizer.image_url,
      category: fertilizer.category
    });

    toast({
      title: "Added to Cart!",
      description: `${fertilizer.name} has been added to your cart.`
    });
  };

  const getDiscountedPrice = (price: number, discount: number | null) => {
    if (!discount) return price;
    return price - (price * discount / 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading fertilizers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <Store className="inline-block mr-2 h-10 w-10" />
            Fertilizer Shop
          </h1>
          <p className="text-xl text-gray-600">Quality fertilizers for better crop yields</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search fertilizers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="nitrogen">Nitrogen</SelectItem>
                <SelectItem value="phosphorus">Phosphorus</SelectItem>
                <SelectItem value="potassium">Potassium</SelectItem>
                <SelectItem value="organic">Organic</SelectItem>
                <SelectItem value="compound">Compound</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedSeason} onValueChange={setSelectedSeason}>
              <SelectTrigger>
                <SelectValue placeholder="Season" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Seasons</SelectItem>
                <SelectItem value="kharif">Kharif</SelectItem>
                <SelectItem value="rabi">Rabi</SelectItem>
                <SelectItem value="summer">Summer</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-sm text-gray-600 flex items-center">
              <Leaf className="mr-2 h-4 w-4" />
              {filteredFertilizers.length} products found
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFertilizers.map((fertilizer) => (
            <Card key={fertilizer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{fertilizer.name}</CardTitle>
                    <CardDescription className="mt-1">
                      <Badge variant="outline" className="mr-2">
                        {fertilizer.category}
                      </Badge>
                      {fertilizer.season && (
                        <Badge variant="secondary">
                          {fertilizer.season}
                        </Badge>
                      )}
                    </CardDescription>
                  </div>
                  {fertilizer.discount_percentage && fertilizer.discount_percentage > 0 && (
                    <Badge className="bg-red-500">
                      -{fertilizer.discount_percentage}%
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">{fertilizer.description}</p>

                {/* Suitable Crops */}
                {fertilizer.suitable_crops && fertilizer.suitable_crops.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Suitable for:</h4>
                    <div className="flex flex-wrap gap-1">
                      {fertilizer.suitable_crops.map((crop, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Do's */}
                {fertilizer.dos && fertilizer.dos.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-green-600 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Do's:
                    </h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {fertilizer.dos.slice(0, 2).map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Don'ts */}
                {fertilizer.donts && fertilizer.donts.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      Don'ts:
                    </h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {fertilizer.donts.slice(0, 2).map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-500 mr-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Price and Add to Cart */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    {fertilizer.discount_percentage && fertilizer.discount_percentage > 0 ? (
                      <div>
                        <span className="text-2xl font-bold text-green-600">
                          ₹{getDiscountedPrice(fertilizer.price, fertilizer.discount_percentage).toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ₹{fertilizer.price}
                        </span>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-green-600">
                        ₹{fertilizer.price}
                      </span>
                    )}
                  </div>
                  
                  <Button 
                    onClick={() => handleAddToCart(fertilizer)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFertilizers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No fertilizers found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FertilizerShop;
