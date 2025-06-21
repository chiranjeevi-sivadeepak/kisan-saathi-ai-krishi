
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/hooks/useLanguage";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import FertilizerShop from "./pages/FertilizerShop";
import Cart from "./pages/Cart";
import CropRecommendationPage from "./pages/CropRecommendationPage";
import PestDetectionPage from "./pages/PestDetectionPage";
import Contact from "./pages/Contact";
import AIAssistantPage from "./pages/AIAssistantPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen w-full">
                <Navbar />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/ai-assistant" element={<AIAssistantPage />} />
                  <Route path="/fertilizer-shop" element={<FertilizerShop />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/crop-recommendations" element={<CropRecommendationPage language="english" />} />
                  <Route path="/pest-detection" element={<PestDetectionPage language="english" />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </BrowserRouter>
          </AuthProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
