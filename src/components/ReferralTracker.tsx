import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export const ReferralTracker = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      console.log("[KREO] Referral link detected. Storing pending referrer:", ref);
      localStorage.setItem("kreo_pending_ref", ref);
    }
  }, [searchParams]);

  useEffect(() => {
    const syncReferral = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const pendingRef = localStorage.getItem("kreo_pending_ref");
      if (!pendingRef) return;

      // Prevent self-referrals
      if (pendingRef === user.id) {
        localStorage.removeItem("kreo_pending_ref");
        return;
      }

      console.log("[KREO] Linking referral: Referrer =", pendingRef, "Referee =", user.id);

      try {
        // Try Supabase first
        const { error } = await supabase
          .from("referrals")
          .insert({
            referrer_id: pendingRef,
            referred_id: user.id,
            status: "joined"
          });

        if (error) throw error;
        
        console.log("[KREO] Referral linked successfully in Supabase!");
      } catch (err: any) {
        console.warn("[KREO] Supabase referral sync failed or table missing. Falling back to local buffer.", err);

        // Fallback to LocalStorage referral list
        const localReferrals = JSON.parse(localStorage.getItem("kreo_local_referrals") || "[]");
        const exists = localReferrals.some((r: any) => r.referred_id === user.id);
        if (!exists) {
          localReferrals.push({
            id: crypto.randomUUID(),
            referrer_id: pendingRef,
            referred_id: user.id,
            created_at: new Date().toISOString(),
            status: "joined",
            referee_email: user.email || "referred_user@kreo.ai"
          });
          localStorage.setItem("kreo_local_referrals", JSON.stringify(localReferrals));
        }
      } finally {
        localStorage.removeItem("kreo_pending_ref");
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      syncReferral();
    });

    syncReferral();

    return () => subscription.unsubscribe();
  }, []);

  return null;
};
