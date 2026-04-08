import { useState, useCallback, useEffect } from "react";
import CloudFraming from "@/components/CloudFraming";
import IntroScreen from "@/components/IntroScreen";
import SplashScreen from "@/components/SplashScreen";
import AuthScreen from "@/components/AuthScreen";
import HomeScreen from "@/components/HomeScreen";
import { supabase } from "@/lib/supabase";

type ThemeMode = "light" | "dark" | "ultra";

interface IndexProps {
  urlId?: string;
}

const Index = ({ urlId }: IndexProps) => {
  const [authed, setAuthed] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [theme, setTheme] = useState<ThemeMode>((localStorage.getItem("theme") as ThemeMode) || "ultra");
  const [isSplashComplete, setIsSplashComplete] = useState(false);
  const [isArtifactActive, setIsArtifactActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check initial session — must resolve before rendering protected content
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthed(!!session);
      setAuthLoading(false);
    });

    // Listen for auth changes (login / logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(!!session);
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Persist and apply theme
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = document.documentElement;
    root.classList.remove("light", "dark", "ultra");
    root.classList.add(theme);
  }, [theme]);

  const [showAuthGate, setShowAuthGate] = useState(false);

  // Determine what to render in the main slot
  const renderMain = () => {
    if (authLoading) return null;
    
    // If not authed, always force AuthScreen after splash
    // Authenticated manifest or Guest mode
    return (
      <HomeScreen 
        onCloudBurst={() => {}} 
        setIsArtifactActive={setIsArtifactActive}
        setIsSubmittingGlobal={setIsSubmitting}
        theme={theme}
        setTheme={setTheme}
        isGuest={!authed}
        urlId={urlId}
      />
    );
  };

  // Mode-based backgrounds for the main container
  const getBgClass = () => {
    if (!isSplashComplete) return "bg-black";
    return "bg-background"; // Themes (light/dark/ultra) are controlled via CSS variables in root
  };

  return (
    <div className={`min-h-screen ${getBgClass()} overflow-hidden relative transition-colors duration-1000`}>
      {/* Elegant SVG Splash Screen with K-R-E-O animation */}
      {!isSplashComplete && <SplashScreen onComplete={() => setIsSplashComplete(true)} />}

      {/* Signature Atmospheric Framing — only active in 'Ultra' mode */}
      <CloudFraming visible={isSplashComplete && !isArtifactActive && !isSubmitting && theme === "ultra"} />


      {/* Main App Logic — visible after splash */}
      <div className={`transition-opacity duration-1000 ${isSplashComplete ? "opacity-100" : "opacity-0"}`}>
        {renderMain()}
      </div>
    </div>
  );
};

export default Index;
