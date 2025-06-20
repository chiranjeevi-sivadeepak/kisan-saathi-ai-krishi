
-- Create user profiles table with farming details
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  aadhar_number TEXT,
  aadhar_verified BOOLEAN DEFAULT FALSE,
  total_land DECIMAL(10,2),
  budget DECIMAL(12,2),
  current_crop TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create fertilizers table
CREATE TABLE public.fertilizers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  suitable_crops TEXT[],
  dos TEXT[],
  donts TEXT[],
  image_url TEXT,
  discount_percentage INTEGER DEFAULT 0,
  season TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cart table
CREATE TABLE public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  fertilizer_id UUID REFERENCES public.fertilizers(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, fertilizer_id)
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total_amount DECIMAL(12,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  order_items JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create crop history table for profit/loss tracking
CREATE TABLE public.crop_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  crop_name TEXT NOT NULL,
  land_area DECIMAL(10,2),
  investment DECIMAL(12,2),
  yield_amount DECIMAL(10,2),
  market_price DECIMAL(10,2),
  profit_loss DECIMAL(12,2),
  season TEXT,
  year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create news table
CREATE TABLE public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  location TEXT,
  language TEXT DEFAULT 'english',
  image_url TEXT,
  source TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create podcasts table
CREATE TABLE public.podcasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  audio_url TEXT NOT NULL,
  transcript TEXT,
  guest_name TEXT,
  guest_role TEXT,
  duration INTEGER,
  language TEXT DEFAULT 'english',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fertilizers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crop_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.podcasts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Fertilizers policies (public read, admin write)
CREATE POLICY "Anyone can view fertilizers" ON public.fertilizers
  FOR SELECT TO public USING (true);

-- Cart policies
CREATE POLICY "Users can manage their own cart" ON public.cart_items
  FOR ALL USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Crop history policies
CREATE POLICY "Users can manage their own crop history" ON public.crop_history
  FOR ALL USING (auth.uid() = user_id);

-- News policies (public read)
CREATE POLICY "Anyone can view news" ON public.news
  FOR SELECT TO public USING (true);

-- Podcasts policies (public read)
CREATE POLICY "Anyone can view podcasts" ON public.podcasts
  FOR SELECT TO public USING (true);

-- Create trigger for updating profiles updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample fertilizers
INSERT INTO public.fertilizers (name, category, price, description, suitable_crops, dos, donts, season) VALUES
('Urea', 'Nitrogen', 250.00, 'High nitrogen fertilizer for leafy growth', ARRAY['Rice', 'Wheat', 'Corn'], 
 ARRAY['Apply during vegetative growth', 'Mix with soil properly', 'Use recommended dosage'], 
 ARRAY['Do not use during flowering', 'Avoid over-application', 'Do not mix with alkaline fertilizers'], 'Kharif'),
('DAP', 'Phosphorus', 1200.00, 'Diammonium Phosphate for root development', ARRAY['Cotton', 'Sugarcane', 'Vegetables'],
 ARRAY['Apply at planting time', 'Place near root zone', 'Water immediately after application'],
 ARRAY['Avoid surface application', 'Do not use with high pH soil', 'Avoid during drought'], 'Rabi'),
('Potash', 'Potassium', 800.00, 'Muriate of Potash for fruit development', ARRAY['Tomato', 'Potato', 'Fruits'],
 ARRAY['Apply during fruit development', 'Mix with compost', 'Use in divided doses'],
 ARRAY['Avoid chloride sensitive crops', 'Do not use in saline soil', 'Avoid over-application'], 'Summer');

-- Insert sample news
INSERT INTO public.news (title, content, category, location, language) VALUES
('New Crop Insurance Scheme Launched', 'Government announces comprehensive crop insurance coverage for farmers...', 'Government', 'Telangana', 'english'),
('Advanced Farming Techniques Workshop', 'Free workshop on modern farming methods scheduled for next month...', 'Education', 'Hyderabad', 'english'),
('మార్కెట్ ధరలు పెరుగుట', 'వ్యవసాయ ఉత్పత్తుల మార్కెట్ ధరలు గణనీయంగా పెరిగాయి...', 'Market', 'Telangana', 'telugu');
