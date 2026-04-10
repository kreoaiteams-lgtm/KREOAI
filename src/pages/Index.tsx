import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CloudFraming from "@/components/CloudFraming";
import SplashScreen from "@/components/SplashScreen";
import HomeScreen from "@/components/HomeScreen";
import { supabase } from "@/lib/supabase";
import WelcomeScreen from "@/components/WelcomeScreen";

type ThemeMode = "light" | "dark" | "ultra";

interface IndexProps {
  urlId?: string;
}

const Index = ({ urlId }: IndexProps) => {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [theme, setTheme] = useState<ThemeMode>((localStorage.getItem("theme") as ThemeMode) || "ultra");
  const [isSplashComplete, setIsSplashComplete] = useState(false);
  const [isArtifactActive, setIsArtifactActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Check initial session — must resolve before rendering protected content
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/login");
      } else {
        // Logged in session restored - check if already seen
        const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
        if (!hasSeenWelcome) {
          setShowWelcome(true);
        }
      }
      setAuthed(!!session);
      setAuthLoading(false);
    });

    // Listen for auth changes (login / logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const isNowAuthed = !!session;
      if (isNowAuthed && !authed) {
        // Just logged in or signed up - check if already seen
        const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
        if (!hasSeenWelcome) {
          setShowWelcome(true);
        }
      }
      if (!isNowAuthed && event === 'SIGNED_OUT') {
        navigate("/login");
      }
      setAuthed(isNowAuthed);
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [authed, navigate]);


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

      <WelcomeScreen 
        isVisible={showWelcome} 
        onClose={() => {
          setShowWelcome(false);
          localStorage.setItem("hasSeenWelcome", "true");
        }} 
      />

      {/* Main App Logic — visible after splash */}

      <div className={`transition-opacity duration-1000 ${isSplashComplete ? "opacity-100" : "opacity-0"}`}>
        {renderMain()}
      </div>
    </div>
  );
};

export default Index;
