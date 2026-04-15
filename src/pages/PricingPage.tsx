import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, X, Sparkles, Zap, Shield, Crown, ArrowRight, CreditCard, 
  Globe, Cpu, Layers, Lock, ChevronRight, User, MapPin, ReceiptText, 
  Wallet, Landmark
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

declare global {
  interface Window {
    paypal: any;
  }
}

const Pricing = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'ultra' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Editable Form States - Retaining only the primary identifier
  const [ownerName, setOwnerName] = useState('Dhruv Gautam');

  const paypalButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedPlan === 'ultra' && window.paypal && paypalButtonRef.current && !paypalButtonRef.current.innerHTML) {
      window.paypal.Buttons({
        style: {
          shape: 'pill',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe'
        },
        createSubscription: function(data: any, actions: any) {
          // IMPORTANT: You must replace 'YOUR_PLAN_ID' with a real Plan ID created in your PayPal dashboard.
          // Failure to do so results in 'RESOURCE_NOT_FOUND'.
          return actions.subscription.create({
            'plan_id': 'P-5ML4271244454362MC62MV7I' 
          });
        },
        onApprove: function(data: any, actions: any) {
          setIsProcessing(true);
          localStorage.setItem('is_kreo_pro', 'true');
          setTimeout(() => {
            setIsProcessing(false);
            navigate('/');
          }, 2000);
        },
        onError: function(err: any) {
          console.error("PayPal Neural Link Failed:", err);
        }
      }).render(paypalButtonRef.current);
    }
  }, [selectedPlan, navigate]);

  const processManualBypass = () => {
    setIsProcessing(true);
    localStorage.setItem('is_kreo_pro', 'true');
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/'); 
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-[#0020C2] selection:text-white overflow-x-hidden font-satoshi relative">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-50/50 blur-[200px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-yellow-50/50 blur-[180px] rounded-full" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-10 py-5 border-b border-black/[0.03]">
        <button onClick={() => navigate(-1)} className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-black/5 transition-all text-black">
            <X size={18} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">Return</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#0020C2] animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-widest opacity-30">Neural Auth Protocol Active</span>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex flex-col items-center">
        {!selectedPlan ? (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-5xl space-y-20"
          >
            <div className="text-center space-y-6">
              <span className="text-[10px] font-black tracking-[0.6em] uppercase text-[#0020C2]">Tier Strategy</span>
              <h1 className="text-6xl md:text-8xl font-serif italic tracking-tighter leading-none text-black">
                Simple <span className="text-[#0020C2] not-italic">Scaling</span>
              </h1>
              <p className="max-w-xl mx-auto text-xl font-light text-black/40 font-serif italic">
                Choose the foundation for your neural manifestations. Professional tools, accessible reality.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="p-12 bg-[#f8faff] border border-black/[0.03] rounded-[3.5rem] space-y-10 flex flex-col justify-between hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-700">
                <div className="space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-3xl font-serif italic text-black">Foundation</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-black/30">Essential Access</p>
                    </div>
                    <div className="text-4xl font-serif italic text-black">$0</div>
                  </div>
                  <div className="space-y-5">
                    {["3 Generations per week", "Standard Manifest Logic", "Community Access"].map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-black/40 font-light italic font-serif">
                        <Check size={14} className="text-black/20" /> {f}
                      </div>
                    ))}
                  </div>
                </div>
                <button className="w-full py-5 rounded-2xl border border-black/10 text-[10px] font-black uppercase tracking-widest bg-black text-white">Current Manifest</button>
              </div>

              <div className="relative p-12 bg-white border border-[#0020C2]/10 rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,32,194,0.08)] space-y-10 flex flex-col justify-between hover:scale-[1.02] transition-all duration-700 overflow-hidden">
                <div className="absolute top-0 right-0 px-8 py-3 bg-[#0020C2] text-white text-[9px] font-black uppercase tracking-widest rounded-bl-3xl">Peak Architecture</div>
                <div className="space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-3xl font-serif italic text-[#0020C2]">Ultra</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#0020C2]/30">Professional Tier</p>
                    </div>
                    <div className="text-4xl font-serif italic text-[#0020C2]">$1 <span className="text-sm font-sans not-italic text-black/20 font-bold ml-1">/ month</span></div>
                  </div>
                  <div className="space-y-5">
                    {["Unlimited Manifestations", "High-Fidelity Assets", "Private Manifest Vault", "Priority Neural Link"].map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-black/70 font-medium italic font-serif">
                        <Check size={16} className="text-[#0020C2]" /> {f}
                      </div>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedPlan('ultra')}
                  className="w-full py-6 bg-[#0020C2] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] shadow-xl shadow-[#0020C2]/20 hover:scale-105 active:scale-95 transition-all"
                >
                  Upgrade to Ultra
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Left Side: Manifest Summary */}
            <div className="flex flex-col gap-10">
              <div className="bg-[#f8faff] border border-black/5 rounded-[4rem] p-12 space-y-12 h-full">
                 <div className="space-y-2">
                    <ReceiptText className="text-[#0020C2]" size={32} />
                    <h3 className="text-3xl font-serif italic text-black">Manifest Summary</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 italic">Architectural Overview</p>
                 </div>

                 <div className="space-y-8">
                    <div className="flex justify-between items-end border-b border-black/[0.05] pb-6">
                       <div className="space-y-1">
                          <span className="text-[9px] font-black uppercase tracking-widest text-black/40">Active Provision</span>
                          <div className="text-2xl font-serif italic text-[#0020C2]">KREO Ultra Tier</div>
                       </div>
                       <div className="text-3xl font-black text-black leading-none">$1.00</div>
                    </div>

                    <div className="flex justify-between items-end border-b border-black/[0.05] pb-6">
                       <div className="space-y-1">
                          <span className="text-[9px] font-black uppercase tracking-widest text-black/40">Duration Horizon</span>
                          <div className="text-xl font-serif italic text-black/60">30 Days Neural Access</div>
                       </div>
                       <div className="text-[10px] font-black uppercase tracking-widest text-black/20">Recurring Alpha</div>
                    </div>

                    <p className="text-sm font-light italic font-serif text-black/40 leading-relaxed">
                       You will be on this manifest plan for <span className="text-black font-semibold">1 month</span>. Your neural capabilities will be upgraded instantly upon authority confirmation.
                    </p>
                 </div>

                 <div className="p-8 bg-white border border-black/5 rounded-3xl space-y-4">
                    <div className="flex justify-between items-center text-xs">
                       <span className="font-bold uppercase tracking-widest opacity-20">Total Manifest Weight</span>
                       <span className="text-2xl font-black text-[#0020C2]">$1.00</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Right Side: Authority Entry (CLEANED) */}
            <div className="bg-white border border-black/5 rounded-[4rem] p-10 md:p-14 shadow-2xl space-y-12 h-max">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif italic text-black">Authority Manifest</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-black/20">Secure Neural Transition</p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-3xl text-[#0020C2]">
                  <Lock size={22} />
                </div>
              </div>

              <div className="space-y-10">
                {/* Account Owner */}
                <div className="space-y-4">
                  <label className="text-[9px] font-black uppercase tracking-[0.5em] text-black/30 ml-2 italic">Account Owner</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="Architect Name" 
                      className="w-full p-6 bg-[#f8faff] border border-black/5 rounded-3xl text-lg font-medium outline-none focus:border-[#0020C2]/20 transition-all font-serif italic" 
                    />
                    <User className="absolute right-6 top-1/2 -translate-y-1/2 text-black/10" size={20} />
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-black/30 text-center opacity-60">Credentials and Address are managed securely via PayPal Authority</p>
                </div>

                <div className="space-y-6 pt-6 flex flex-col items-center">
                  <div className="w-full max-w-sm">
                    <div ref={paypalButtonRef} className="w-full relative z-50" />
                  </div>
                  
                  <div className="flex items-center gap-6 w-full opacity-20">
                     <div className="h-px flex-1 bg-black" />
                     <span className="text-[8px] font-black uppercase tracking-widest">or</span>
                     <div className="h-px flex-1 bg-black" />
                  </div>

                  <button 
                    onClick={processManualBypass}
                    disabled={isProcessing}
                    className="w-full py-7 border border-black text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:bg-black hover:text-white active:scale-95 transition-all shadow-xl font-satoshi"
                  >
                    {isProcessing ? "Syncing Portal..." : "Authorize Transition Directly"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 opacity-30 pt-4">
                 <div className="flex flex-col items-center gap-2">
                    <Shield size={20} />
                    <span className="text-[8px] font-black uppercase tracking-[0.3em]">Encrypted</span>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <Globe size={20} />
                    <span className="text-[8px] font-black uppercase tracking-[0.3em]">Global</span>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <Cpu size={20} />
                    <span className="text-[8px] font-black uppercase tracking-[0.3em]">Neural</span>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
