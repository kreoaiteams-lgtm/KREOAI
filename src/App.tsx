import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import KreoPromo from "./components/KreoPromo";
import CleanPromo1 from "./components/CleanPromo1";
import CleanPromo2 from "./components/CleanPromo2";
import CleanPromo3 from "./components/CleanPromo3";
import CleanPromo4 from "./components/CleanPromo4";
import CleanPromo5 from "./components/CleanPromo5";
import KreoPromo6 from "./components/KreoPromo6";
import Promo8 from "./components/Promo8";
import KreoVsClaudePromo from "./components/KreoVsClaudePromo";
import MentraPromo from "./components/MentraPromo";
import DikshaPromo from "./components/DikshaPromo";
import KreoShowcasePromo from "./components/KreoShowcasePromo";
import SocialManagerPage from "./components/SocialManagerPage";
import KreoMasterPromo from "./components/KreoMasterPromo";
import ShareView from "./components/ShareView";
import ProjectRouter from "./components/ProjectRouter";
import AuthScreen from "./components/AuthScreen";
import CampaignPage from "./pages/CampaignPage";
import CardPage from "./pages/CardPage";
import Pricing from "./pages/PricingPage";
import NeuralMouse from "@/components/NeuralMouse";
import WebResearch from "./pages/WebResearch";

import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from "@/context/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NeuralMouse />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<AuthScreen />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/promo1" element={<CleanPromo1 />} />
          <Route path="/promo2" element={<CleanPromo2 />} />
          <Route path="/promo3" element={<CleanPromo3 />} />
          <Route path="/promo4" element={<CleanPromo4 />} />
          <Route path="/promo5" element={<CleanPromo5 />} />
          <Route path="/promo6" element={<KreoPromo6 />} />
          <Route path="/promo8" element={<Promo8 />} />
          <Route path="/share/:id" element={<ShareView />} />
          <Route path="/link/:id" element={<ShareView />} />
          <Route path="/versus" element={<KreoVsClaudePromo />} />
          <Route path="/social-manifest" element={<SocialManagerPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/build" element={<CampaignPage />} />
          <Route path="/onboarding" element={<CardPage onboarding={true} />} />
          <Route path="/card" element={<CardPage />} />
          <Route path="/webresearch" element={<WebResearch />} />
          <Route path="/webreasearch" element={<WebResearch />} />
          <Route path="/promo-mentra" element={<MentraPromo />} />
          <Route path="/bday-diksha" element={<DikshaPromo />} />
          <Route path="/promo-showcase" element={<KreoShowcasePromo />} />
          <Route path="/promo" element={<KreoMasterPromo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </LanguageProvider>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
