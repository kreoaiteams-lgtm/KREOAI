import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IdentityScreen from "@/components/IdentityScreen";
import { supabase } from "@/lib/supabase";

const CardPage = ({ onboarding = false }: { onboarding?: boolean }) => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [residentBio, setResidentBio] = useState("");
  const [residentInterest, setResidentInterest] = useState<any>("tech");
  const [residentCardNumber, setResidentCardNumber] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      // Don't navigate if session is still being determined or if we're already checking
      if (!session) {
        // Subtle wait to ensure it's not a transient 'null' session during refresh
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/login");
          return;
        }
      }

      const { data: { session: activeSession } } = await supabase.auth.getSession();
      if (activeSession) {
        setUserEmail(activeSession.user.email || "");
        setUserName(activeSession.user.user_metadata?.full_name || "");

        // Fetch Profile from DB
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', activeSession.user.id)
          .single();

        if (!error && profile) {
          setResidentBio(profile.bio || "");
          setResidentInterest(profile.interest || "tech");
          setResidentCardNumber(String(profile.card_number).padStart(4, '0'));
        } else {
          // Fallback to localStorage
          setResidentBio(localStorage.getItem('kreo_resident_bio') || "");
          setResidentCardNumber(localStorage.getItem('kreo_card_number') || "");
        }
      }
      
      setLoading(false);
    });
  }, [navigate]);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-white relative">
      {!onboarding && (
        <button 
          onClick={() => navigate("/")}
          className="fixed top-12 right-12 z-[4000] group flex items-center gap-3 bg-black/5 hover:bg-black/10 px-6 py-3 rounded-full transition-all"
        >
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 group-hover:text-black">Dismiss</div>
          <div className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover:bg-[#1B3FBF] transition-colors" />
        </button>
      )}
      <IdentityScreen 
        userEmail={userEmail}
        userName={userName}
        initialBio={residentBio}
        initialInterest={residentInterest}
        initialPhase={onboarding ? 'pref' : 'reveal'}
        onPhaseChange={(newPhase) => {
          if (onboarding && newPhase === 'reveal') {
            // Once we hit reveal in onboarding, move to the permanent /card path
            navigate('/card');
          }
        }}
        onClose={() => navigate("/")}
        onBioGenerated={async (bio, interest) => {
          setResidentBio(bio);
          setResidentInterest(interest);
          
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            const { data: updatedProfile } = await supabase
              .from('profiles')
              .upsert({
                user_id: session.user.id,
                full_name: userName,
                bio,
                interest
              })
              .select()
              .single();
              
            if (updatedProfile) {
              setResidentCardNumber(String(updatedProfile.card_number).padStart(4, '0'));
              localStorage.setItem('kreo_resident_bio', bio);
              localStorage.setItem('kreo_card_number', String(updatedProfile.card_number).padStart(4, '0'));
            }
          }
        }}
      />
    </div>
  );
};

export default CardPage;
