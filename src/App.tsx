import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Landing from "./pages/Landing.tsx";
import KreoPromo from "./components/KreoPromo.tsx";
import KreoPromo1 from "./components/KreoPromo1.tsx";
import KreoPromo2 from "./components/KreoPromo2.tsx";
import KreoPromo3 from "./components/KreoPromo3.tsx";
import KreoPromo4 from "./components/KreoPromo4.tsx";
import KreoPromo5 from "./components/KreoPromo5.tsx";
import SocialManagerPage from "./components/SocialManagerPage.tsx";
import ShareView from "./components/ShareView.tsx";
import ProjectRouter from "./components/ProjectRouter.tsx";
import AuthScreen from "./components/AuthScreen.tsx";
import CampaignPage from "./pages/CampaignPage.tsx";
import CardPage from "./pages/CardPage.tsx";
import PricingPage from "./pages/PricingPage.tsx";
import NeuralMouse from "@/components/NeuralMouse";

import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NeuralMouse />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<AuthScreen />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/promo1" element={<KreoPromo1 />} />
          <Route path="/promo2" element={<KreoPromo2 />} />
          <Route path="/promo3" element={<KreoPromo3 />} />
          <Route path="/promo4" element={<KreoPromo4 />} />
          <Route path="/promo5" element={<KreoPromo5 />} />
          <Route path="/share/:id" element={<ShareView />} />
          <Route path="/link/:id" element={<ShareView />} />
          <Route path="/social-manifest" element={<SocialManagerPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/build" element={<CampaignPage />} />
          <Route path="/card" element={<CardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
