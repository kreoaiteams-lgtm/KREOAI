import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Award, Sparkles, Copy, CheckCircle2, Share2, 
  ArrowLeft, RefreshCw, Send, Shield, Zap, Flame 
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import KreoLogo from "@/components/KreoLogo";

interface ReferredUser {
  id: string;
  created_at: string;
  status: string;
  referee_email: string;
}

const ReferralPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [referrals, setReferrals] = useState<ReferredUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Rewards configuration
  const rewardTiers = [
    { name: "Bronze Curator", count: 0, perk: "Standard AI Pipeline", color: "from-amber-700 to-amber-900", icon: Shield },
    { name: "Silver Architect", count: 1, perk: "Double Code Limit (8K tokens)", color: "from-slate-400 to-slate-600", icon: Zap },
    { name: "Gold Visionary", count: 3, perk: "Unlimited CoWork Manifestation Steps", color: "from-yellow-400 to-amber-600", icon: Sparkles },
    { name: "Platinum Sovereign", count: 5, perk: "Custom Cinematic CSS Palettes & Brand Kits", color: "from-cyan-400 to-blue-600", icon: Flame },
  ];

  const fetchReferrals = async (currentUser: any) => {
    if (!currentUser) return;
    try {
      // 1. Try fetching from Supabase
      const { data, error } = await supabase
        .from("referrals")
        .select("id, created_at, status, referred_id")
        .eq("referrer_id", currentUser.id);

      if (error) throw error;

      // Map Supabase referrals
      const formatted: ReferredUser[] = data.map((r: any) => ({
        id: r.id,
        created_at: r.created_at,
        status: r.status,
        referee_email: `user_${r.referred_id.slice(0, 5)}@kreo.ai`
      }));

      // 2. Fetch and merge local storage referrals
      const localReferrals = JSON.parse(localStorage.getItem("kreo_local_referrals") || "[]");
      const matchedLocal = localReferrals
        .filter((r: any) => r.referrer_id === currentUser.id)
        .map((r: any) => ({
          id: r.id,
          created_at: r.created_at,
          status: r.status,
          referee_email: r.referee_email || "referred_user@kreo.ai"
        }));

      // Deduplicate by ID
      const merged = [...formatted];
      matchedLocal.forEach((l: any) => {
        if (!merged.some(m => m.id === l.id)) {
          merged.push(l);
        }
      });

      setReferrals(merged);
    } catch (err: any) {
      console.warn("[KREO] Database referral sync failed or table missing. Using local storage buffer.", err);
      // Fallback entirely to local storage
      const localReferrals = JSON.parse(localStorage.getItem("kreo_local_referrals") || "[]");
      const matchedLocal = localReferrals
        .filter((r: any) => r.referrer_id === currentUser.id)
        .map((r: any) => ({
          id: r.id,
          created_at: r.created_at,
          status: r.status,
          referee_email: r.referee_email || "referred_user@kreo.ai"
        }));
      setReferrals(matchedLocal);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchReferrals(session.user);
      } else {
        // Direct local storage user simulation if not logged in
        const simulatedUser = { id: "local-architect", email: "architect@kreo.ai" };
        setUser(simulatedUser);
        fetchReferrals(simulatedUser);
      }
      setLoading(false);
    });
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchReferrals(user);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Referrals synchronized successfully!");
    }, 600);
  };

  const getReferralLink = () => {
    const origin = window.location.origin;
    const uid = user?.id || "local-architect";
    return `${origin}/login?ref=${uid}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getReferralLink());
    setCopied(true);
    toast.success("Referral invitation link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate a mock referral to showcase UI immediately
  const handleGenerateDemoReferral = () => {
    if (!user) return;
    const randomEmails = [
      "sarah_architect@design.co",
      "rahul.visionary@net.in",
      "elena_neural@curator.io",
      "james.dash@build.com",
      "zara_minimalist@space.org"
    ];
    const randomEmail = randomEmails[Math.floor(Math.random() * randomEmails.length)];
    const mockRef: ReferredUser = {
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      status: "active",
      referee_email: randomEmail
    };

    // Save to local storage list
    const localReferrals = JSON.parse(localStorage.getItem("kreo_local_referrals") || "[]");
    localReferrals.push({
      id: mockRef.id,
      referrer_id: user.id,
      referred_id: crypto.randomUUID(),
      created_at: mockRef.created_at,
      status: mockRef.status,
      referee_email: mockRef.referee_email
    });
    localStorage.setItem("kreo_local_referrals", JSON.stringify(localReferrals));

    // Update state
    setReferrals(prev => [mockRef, ...prev]);
    toast.success(`Simulated referral created for ${randomEmail}!`);
  };

  // Calculate current tier
  const totalReferrals = referrals.length;
  const currentTierIndex = [...rewardTiers].reverse().findIndex(tier => totalReferrals >= tier.count);
  const currentTier = currentTierIndex !== -1 ? [...rewardTiers].reverse()[currentTierIndex] : rewardTiers[0];

  const nextTierIndex = rewardTiers.findIndex(tier => tier.count > totalReferrals);
  const nextTier = nextTierIndex !== -1 ? rewardTiers[nextTierIndex] : null;

  // Calculate progress percent to next tier
  const getProgressPercent = () => {
    if (!nextTier) return 100;
    const prevRequired = rewardTiers[nextTierIndex - 1]?.count || 0;
    const currentProgress = totalReferrals - prevRequired;
    const targetSpan = nextTier.count - prevRequired;
    return Math.min(100, Math.max(0, (currentProgress / targetSpan) * 100));
  };

  const getShareText = () => {
    return encodeURIComponent(`Design & manifest beautiful visual interfaces, slides, and Bento dashboards in seconds using KREO. Join with my invitation link: ${getReferralLink()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0020C2] flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-white animate-spin opacity-50" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-x-hidden selection:bg-yellow-400 selection:text-black">
      {/* Dynamic atmospheric radial glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Navigation */}
      <header className="relative z-30 max-w-7xl mx-auto px-6 py-8 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate("/")}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="scale-90"><KreoLogo /></div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleRefresh}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10"
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      <main className="relative z-20 max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/25 text-yellow-400 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <Award className="w-3.5 h-3.5" />
            Curator Referral Network
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif italic tracking-tighter leading-tight"
          >
            Expand the <span style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }} className="not-italic text-yellow-400 uppercase tracking-normal">Net</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/40 text-sm font-light leading-relaxed max-w-lg mx-auto"
          >
            Invite friends to curate stunning dashboard systems. Earn advanced tokens, high-fidelity brand kits, and unlock exclusive sovereign pipeline upgrades.
          </motion.p>
        </section>

        {/* Bento Grid Referral Layout */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Unique Invitation Link (Span 2 cols) */}
          <div className="md:col-span-2 glass-card p-8 flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-2">
              <h2 className="text-2xl font-serif italic text-white/90">Curator Referral Code</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Your Unique Portal Connection</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              <div className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between text-xs font-mono text-white/70 overflow-x-auto whitespace-nowrap">
                {getReferralLink()}
              </div>
              <button 
                onClick={copyToClipboard}
                className="bg-white text-black font-semibold text-xs rounded-xl px-6 py-4 flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.97] transition-all"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {copied ? "Link Copied!" : "Copy Portal Link"}
              </button>
            </div>

            <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Share link instantly:</span>
              <div className="flex gap-2">
                <a 
                  href={`https://api.whatsapp.com/send?text=${getShareText()}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold flex items-center gap-2 transition-colors border border-white/5"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-400" />
                  WhatsApp
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?text=${getShareText()}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold flex items-center gap-2 transition-colors border border-white/5"
                >
                  <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                  Twitter
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Current Status & Rewards (Span 1 col) */}
          <div className="glass-card p-8 flex flex-col justify-between space-y-6 relative overflow-hidden bg-gradient-to-br from-indigo-950/20 to-slate-950">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${currentTier.color} opacity-20 rounded-full blur-2xl`} />

            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Current Status</p>
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${currentTier.color} text-white`}>
                  <currentTier.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif italic text-yellow-400">{currentTier.name}</h3>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Perk Unlocked</p>
              <p className="text-xs font-light text-white/70 leading-relaxed">{currentTier.perk}</p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div>
                <p className="text-3xl font-serif text-white">{totalReferrals}</p>
                <p className="text-[9px] font-black uppercase tracking-[0.1em] text-white/30">Total Referrals</p>
              </div>
              <button 
                onClick={handleGenerateDemoReferral}
                className="px-4 py-2 rounded-xl bg-yellow-400/10 border border-yellow-400/20 hover:bg-yellow-400 hover:text-black hover:scale-105 active:scale-95 transition-all text-[9px] font-black uppercase tracking-[0.2em] text-yellow-400"
              >
                + Mock Ref
              </button>
            </div>
          </div>
        </section>

        {/* Tier Upgrade Progress */}
        {nextTier && (
          <section className="glass-card p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xl font-serif italic text-white/90">Tier Progress</h3>
                <p className="text-xs font-light text-white/40">
                  Refer <span className="font-semibold text-yellow-400">{nextTier.count - totalReferrals}</span> more users to unlock <span className="font-semibold text-white">{nextTier.name}</span>
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl">
                <Award className="w-3.5 h-3.5 text-yellow-400" />
                <span className="text-white/40 font-black uppercase tracking-wider text-[9px]">Target Perk:</span>
                <span className="text-white/90">{nextTier.perk}</span>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="space-y-2">
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-yellow-400 shadow-[0_0_8px_#3b82f6]"
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgressPercent()}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-white/20">
                <span>{currentTier.name} ({currentTier.count})</span>
                <span>{nextTier.name} ({nextTier.count})</span>
              </div>
            </div>
          </section>
        )}

        {/* How It Works Flow (Bento layout) */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-serif italic text-white/90">Architect Reward Milestones</h3>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Referral Level Up Roadmap</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {rewardTiers.map((tier, idx) => {
              const isUnlocked = totalReferrals >= tier.count;
              const Icon = tier.icon;
              return (
                <div 
                  key={idx} 
                  className={`glass-card p-6 flex flex-col justify-between space-y-6 border transition-all duration-300 relative ${
                    isUnlocked 
                      ? 'border-yellow-400/20 bg-gradient-to-b from-yellow-400/[0.02] to-transparent shadow-[0_8px_30px_rgba(250,204,21,0.02)]' 
                      : 'border-white/5 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${isUnlocked ? 'text-yellow-400 border-yellow-400/25 bg-yellow-400/5' : 'text-white/40'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      isUnlocked 
                        ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/25' 
                        : 'bg-white/5 text-white/20'
                    }`}>
                      {isUnlocked ? "Unlocked" : `Requires ${tier.count}`}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-serif italic text-lg text-white/95">{tier.name}</h4>
                    <p className="text-[10px] font-light text-white/50 leading-relaxed">{tier.perk}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Referred Curators List */}
        <section className="glass-card p-8 space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-2xl font-serif italic text-white/90">Referral Log</h3>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Your Manifested Network Connections</p>
            </div>
            <span className="text-[10px] bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl font-mono text-white/60">
              Total Count: {referrals.length}
            </span>
          </div>

          <AnimatePresence mode="popLayout">
            {referrals.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-white/20">
                  <Users className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-light text-white/50">No architects connected to your portal link yet.</p>
                  <p className="text-xs font-light text-white/30">Share your portal invitation link at the top to start building your network!</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="overflow-x-auto"
              >
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-white/30">
                      <th className="py-4">Referee Identity</th>
                      <th className="py-4">Portal Joined</th>
                      <th className="py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.map((ref, idx) => (
                      <motion.tr 
                        key={ref.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="border-b border-white/5 hover:bg-white/[0.01] transition-colors text-xs"
                      >
                        <td className="py-4 font-mono text-white/80">{ref.referee_email}</td>
                        <td className="py-4 text-white/40">{new Date(ref.created_at).toLocaleDateString()}</td>
                        <td className="py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[9px] font-black uppercase tracking-[0.1em]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            {ref.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 text-center border-t border-white/5 relative z-30">
        <div className="scale-75 opacity-20 mx-auto mb-4"><KreoLogo /></div>
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/10 italic">
          Neural Curator Network © 2026 KREO ARCHITECTURAL ENGINE.
        </p>
      </footer>
    </div>
  );
};

export default ReferralPage;
