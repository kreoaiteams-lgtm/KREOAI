import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Award, Sparkles, Copy, CheckCircle2, Share2, 
  ArrowLeft, RefreshCw, Send, Shield, Zap, Flame,
  HelpCircle, Link2
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

  // Simplified and easy-to-understand Reward tiers
  const rewardTiers = [
    { name: "Starter Curator", count: 0, perk: "Standard AI Pipeline", color: "bg-blue-50 text-blue-600 border-blue-100", icon: Shield },
    { name: "Silver Architect", count: 1, perk: "Double Code Limit (8K tokens)", color: "bg-slate-100 text-slate-700 border-slate-200", icon: Zap },
    { name: "Gold Visionary", count: 3, perk: "Unlimited CoWork Steps", color: "bg-amber-50 text-amber-700 border-amber-200", icon: Sparkles },
    { name: "Elite Sovereign", count: 5, perk: "Custom Cinematic CSS & Brand Kits", color: "bg-purple-50 text-purple-700 border-purple-200", icon: Flame },
  ];

  const fetchReferrals = async (currentUser: any) => {
    if (!currentUser) return;
    try {
      // Try fetching from Supabase
      const { data, error } = await supabase
        .from("referrals")
        .select("id, created_at, status, referred_id")
        .eq("referrer_id", currentUser.id);

      if (error) throw error;

      const formatted: ReferredUser[] = data.map((r: any) => ({
        id: r.id,
        created_at: r.created_at,
        status: r.status,
        referee_email: `user_${r.referred_id.slice(0, 5)}@kreo.ai`
      }));

      // Merge local storage referrals
      const localReferrals = JSON.parse(localStorage.getItem("kreo_local_referrals") || "[]");
      const matchedLocal = localReferrals
        .filter((r: any) => r.referrer_id === currentUser.id)
        .map((r: any) => ({
          id: r.id,
          created_at: r.created_at,
          status: r.status,
          referee_email: r.referee_email || "referred_user@kreo.ai"
        }));

      const merged = [...formatted];
      matchedLocal.forEach((l: any) => {
        if (!merged.some(m => m.id === l.id)) {
          merged.push(l);
        }
      });

      setReferrals(merged);
    } catch (err: any) {
      console.warn("[KREO] Database referral sync failed. Using local storage buffer.", err);
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
      toast.success("Synchronized successfully!");
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
    toast.success("Invitation link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

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

    setReferrals(prev => [mockRef, ...prev]);
    toast.success(`Demo referral added: ${randomEmail}`);
  };

  const totalReferrals = referrals.length;
  const currentTierIndex = [...rewardTiers].reverse().findIndex(tier => totalReferrals >= tier.count);
  const currentTier = currentTierIndex !== -1 ? [...rewardTiers].reverse()[currentTierIndex] : rewardTiers[0];

  const nextTierIndex = rewardTiers.findIndex(tier => tier.count > totalReferrals);
  const nextTier = nextTierIndex !== -1 ? rewardTiers[nextTierIndex] : null;

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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-[#0020C2] animate-spin opacity-40" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FF] text-slate-800 relative overflow-x-hidden selection:bg-[#0020C2] selection:text-white font-sans">
      {/* Soft atmospheric gradients */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <header className="relative z-30 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate("/")}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors border border-slate-200 text-slate-600"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="scale-90"><KreoLogo /></div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleRefresh}
            className="p-3 rounded-full hover:bg-slate-100 transition-all border border-slate-200 text-slate-600"
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      <main className="relative z-20 max-w-4xl mx-auto px-6 py-12 space-y-10">
        
        {/* Simple & Clean Header */}
        <section className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0020C2]/5 border border-[#0020C2]/10 text-[#0020C2] text-[10px] font-black uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            Invite & Earn
          </div>
          <h1 className="text-4xl md:text-5xl font-serif italic tracking-tight text-[#0020C2] leading-tight">
            Invite Friends to <span style={{ fontFamily: "'TAN-NIMBUS', sans-serif" }} className="not-italic font-sans font-bold uppercase tracking-normal">KREO</span>
          </h1>
          <p className="text-slate-500 text-sm font-light max-w-md mx-auto leading-relaxed">
            Share KREO with fellow designers, developers, and creators. Help them build visual apps in seconds while unlocking premium tools for yourself.
          </p>
        </section>

        {/* Simplified 3-Step Guide */}
        <section className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="w-10 h-10 rounded-full bg-[#0020C2]/5 text-[#0020C2] flex items-center justify-center text-sm font-bold mx-auto md:mx-0">1</div>
            <h4 className="font-semibold text-slate-800 text-sm">Copy & Share Link</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">Copy your unique invite link and send it to your friends or post it online.</p>
          </div>
          <div className="space-y-2 text-center md:text-left">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold mx-auto md:mx-0">2</div>
            <h4 className="font-semibold text-slate-800 text-sm">Friends Join Free</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">They get immediate standard preview access to design beautiful dashboards.</p>
          </div>
          <div className="space-y-2 text-center md:text-left">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-bold mx-auto md:mx-0">3</div>
            <h4 className="font-semibold text-slate-800 text-sm">Unlock Power-ups</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">Get double token limits, unlimited steps, and premium cinematic themes!</p>
          </div>
        </section>

        {/* Invitation & Stats Panel */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Link Box */}
          <div className="md:col-span-2 bg-white border border-slate-100 shadow-sm rounded-3xl p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-serif italic text-slate-800">Your Invitation Link</h3>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Share this link to credit your account</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 items-stretch">
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 flex items-center justify-between text-xs font-mono text-slate-600 overflow-x-auto whitespace-nowrap">
                {getReferralLink()}
              </div>
              <button 
                onClick={copyToClipboard}
                className="bg-[#0020C2] text-white font-semibold text-xs rounded-2xl px-6 py-4 flex items-center justify-center gap-2 hover:bg-[#0020C2]/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm shadow-[#0020C2]/15"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Quick share:</span>
              <div className="flex gap-2">
                <a 
                  href={`https://api.whatsapp.com/send?text=${getShareText()}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold flex items-center gap-2 transition-colors border border-emerald-100"
                >
                  <Send className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?text=${getShareText()}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-semibold flex items-center gap-2 transition-colors border border-sky-100"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Twitter
                </a>
              </div>
            </div>
          </div>

          {/* Status Box */}
          <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Current Level</p>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl border ${currentTier.color}`}>
                  <currentTier.icon className="w-4 h-4" />
                </div>
                <h3 className="text-md font-semibold text-slate-800">{currentTier.name}</h3>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Active Perk</p>
              <p className="text-xs font-light text-slate-500 leading-relaxed">{currentTier.perk}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-3xl font-serif text-slate-800">{totalReferrals}</p>
                <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">Friends Joined</p>
              </div>
              <button 
                onClick={handleGenerateDemoReferral}
                className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 hover:scale-105 active:scale-95 transition-all text-[9px] font-black uppercase tracking-wider text-slate-600"
              >
                + Add Demo Friend
              </button>
            </div>
          </div>
        </section>

        {/* Upgrade Target & Progress */}
        {nextTier && (
          <section className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-md font-semibold text-slate-800">Next Milestone Progress</h3>
                <p className="text-xs font-light text-slate-500">
                  Invite <span className="font-semibold text-[#0020C2]">{nextTier.count - totalReferrals}</span> more friend(s) to unlock <span className="font-semibold text-slate-800">{nextTier.name}</span>
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl text-slate-600">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Unlocks:</span>
                <span className="font-medium text-slate-700">{nextTier.perk}</span>
              </div>
            </div>

            {/* Light Colored Progress Bar */}
            <div className="space-y-1.5">
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200 relative">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-600 to-[#0020C2]"
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgressPercent()}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between text-[9px] font-black uppercase tracking-wider text-slate-400">
                <span>{currentTier.name} ({currentTier.count})</span>
                <span>{nextTier.name} ({nextTier.count})</span>
              </div>
            </div>
          </section>
        )}

        {/* Simplified Milestones */}
        <section className="space-y-4">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-serif italic text-slate-800">Available Milestone Rewards</h3>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Perks unlock instantly upon friend signup</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {rewardTiers.map((tier, idx) => {
              const isUnlocked = totalReferrals >= tier.count;
              const Icon = tier.icon;
              return (
                <div 
                  key={idx} 
                  className={`bg-white border rounded-2xl p-5 flex flex-col justify-between space-y-5 transition-all duration-300 ${
                    isUnlocked 
                      ? 'border-[#0020C2]/20 shadow-sm bg-gradient-to-b from-[#0020C2]/[0.01] to-transparent' 
                      : 'border-slate-100 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg border ${
                      isUnlocked 
                        ? 'bg-[#0020C2]/5 border-[#0020C2]/10 text-[#0020C2]' 
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isUnlocked 
                        ? 'bg-[#0020C2]/5 text-[#0020C2] border border-[#0020C2]/10' 
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}>
                      {isUnlocked ? "Unlocked" : `Need ${tier.count}`}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-semibold text-slate-800 text-xs">{tier.name}</h4>
                    <p className="text-[10px] font-light text-slate-400 leading-relaxed">{tier.perk}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Simplified History Log */}
        <section className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-serif italic text-slate-800">Your Invite History</h3>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-sans">List of friends connected to your invite link</p>
            </div>
            <span className="text-[10px] bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl font-mono text-slate-500">
              Invited: {referrals.length}
            </span>
          </div>

          <AnimatePresence mode="popLayout">
            {referrals.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto text-slate-300">
                  <Users className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-light text-slate-400">No friends have joined using your link yet.</p>
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
                    <tr className="border-b border-slate-100 text-[9px] font-black uppercase tracking-wider text-slate-400">
                      <th className="py-3">Email Address</th>
                      <th className="py-3">Joined Date</th>
                      <th className="py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.map((ref, idx) => (
                      <motion.tr 
                        key={ref.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors text-xs text-slate-600"
                      >
                        <td className="py-3.5 font-mono font-medium text-slate-700">{ref.referee_email}</td>
                        <td className="py-3.5 text-slate-400">{new Date(ref.created_at).toLocaleDateString()}</td>
                        <td className="py-3.5">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[9px] font-black uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Joined
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
      <footer className="py-12 text-center border-t border-slate-100 relative z-30">
        <div className="scale-75 opacity-15 mx-auto mb-3"><KreoLogo /></div>
        <p className="text-[9px] font-black uppercase tracking-wider text-slate-300">
          KREO Invite Portal © 2026 ARCHITECTURAL ENGINE.
        </p>
      </footer>
    </div>
  );
};

export default ReferralPage;
