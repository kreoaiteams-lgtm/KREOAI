import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, X, Sparkles, Zap, Shield, Crown, ArrowRight, CreditCard, 
  Globe, Cpu, Layers, Lock, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PricingPage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
      id: 'essential',
      name: 'Essential',
      price: '$0',
      period: '/month',
      description: 'Perfect for exploring the possibilities of imagination.',
      features: ['10 Alpha Manifestations', 'Standard Logic Engine', 'Community Access', 'Basic Export'],
      icon: Zap,
      color: 'blue'
    },
    {
      id: 'pro',
      name: 'Architect',
      price: '$29',
      period: '/month',
      description: 'The definitive choice for visionaries and professional creators.',
      features: ['Unlimited Manifestations', 'Neural Logic v2', 'Priority Rendering', 'High-Fidelity Exports', 'Private History'],
      icon: Crown,
      color: 'yellow',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Sovereign',
      price: 'Custom',
      period: '',
      description: 'Custom infrastructure for teams and massive orchestration.',
      features: ['Dedicated Neural Nodes', 'SLA Guarantees', 'White-label Manifest', 'Custom API Access', '24/7 Intel Support'],
      icon: Shield,
      color: 'white'
    }
  ];

  const handlePayment = (planId: string) => {
    setSelectedPlan(planId);
    // Mimic transition to payment details
  };

  const processPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/home'); // Redirect back home after "payment"
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0020C2] text-white selection:bg-white selection:text-[#0020C2] overflow-x-hidden font-satoshi relative">
      {/* Cinematic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-400/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-yellow-400/5 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-10 py-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
            <X size={18} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">Return</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Operational Intel Secured</span>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!selectedPlan ? (
            <motion.div 
              key="pricing"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="w-full flex flex-col items-center"
            >
              <div className="text-center space-y-6 mb-24">
                <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4"
                >
                  <Sparkles size={12} className="text-yellow-400" /> Choose Your Scale
                </motion.div>
                <h1 className="text-6xl md:text-8xl font-serif italic tracking-tighter leading-none">
                  Investing in <span className="text-yellow-400 not-italic">Intent</span>
                </h1>
                <p className="max-w-2xl mx-auto text-xl font-light opacity-60 font-serif italic">
                  Unlock the full potential of high-fidelity manifestion. Every tier is engineered for absolute clarity.
                </p>
              </div>

              {/* Plans Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                {plans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    whileHover={{ y: -10 }}
                    className={`relative p-12 bg-white/5 border ${plan.popular ? 'border-yellow-400/30' : 'border-white/10'} rounded-[3rem] backdrop-blur-xl flex flex-col gap-10 hover:bg-white/[0.07] transition-all`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-yellow-400 text-black text-[9px] font-black uppercase tracking-widest rounded-full shadow-xl">
                        Architect Peak
                      </div>
                    )}

                    <div className="space-y-6">
                      <div className={`w-16 h-16 rounded-2xl ${plan.color === 'yellow' ? 'bg-yellow-400 text-black' : 'bg-white/10 text-white'} flex items-center justify-center`}>
                        <plan.icon size={30} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-serif italic leading-none mb-2">{plan.name}</h3>
                        <p className="text-sm opacity-50 font-light">{plan.description}</p>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black">{plan.price}</span>
                      <span className="text-sm opacity-40 uppercase font-black tracking-widest">{plan.period}</span>
                    </div>

                    <div className="space-y-4 flex-grow">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Check size={16} className={plan.color === 'yellow' ? 'text-yellow-400' : 'text-blue-400'} />
                          <span className="text-sm opacity-70 font-light">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => handlePayment(plan.id)}
                      className={`w-full py-6 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 ${
                        plan.color === 'yellow' 
                        ? 'bg-yellow-400 text-black hover:scale-105 active:scale-95' 
                        : 'bg-white/10 text-white hover:bg-white/20 active:scale-95 border border-white/10'
                      }`}
                    >
                      Manifest {plan.name} <ArrowRight size={14} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="payment"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-white text-black p-12 rounded-[4rem] shadow-2xl space-y-12"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif italic text-[#0020C2]">Payment Authority</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-black/40">Secure Transaction Flow</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0020C2]">
                  <Lock size={20} />
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-8 bg-blue-50 rounded-3xl space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium opacity-60">Selected Manifest</span>
                  <span className="text-lg font-serif italic text-[#0020C2]">{plans.find(p => p.id === selectedPlan)?.name} Tier</span>
                </div>
                <div className="h-px bg-blue-100" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium opacity-60">Total to Manifest</span>
                  <span className="text-3xl font-black text-[#0020C2]">{plans.find(p => p.id === selectedPlan)?.price}</span>
                </div>
              </div>

              {/* Credit Card Mockup */}
              <div className="space-y-6">
                 <div className="space-y-4">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30 ml-2">Card Credentials</label>
                    <div className="relative">
                       <input 
                         type="text" 
                         disabled 
                         value="4242 4242 4242 4242" 
                         className="w-full p-6 bg-white border-2 border-blue-50 rounded-3xl text-lg font-medium tracking-widest"
                       />
                       <CreditCard className="absolute right-6 top-1/2 -translate-y-1/2 text-blue-200" size={24} />
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30 ml-2">Expiry</label>
                      <input type="text" disabled value="12/28" className="w-full p-6 bg-white border-2 border-blue-50 rounded-3xl text-lg font-medium" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30 ml-2">CVV</label>
                      <input type="text" disabled value="***" className="w-full p-6 bg-white border-2 border-blue-50 rounded-3xl text-lg font-medium" />
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-6">
                <button 
                  onClick={processPayment}
                  disabled={isProcessing}
                  className="w-full py-7 bg-[#0020C2] text-white text-[12px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl relative flex items-center justify-center"
                >
                  {isProcessing ? (
                     <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-3"
                     >
                        <LoaderIcon className="animate-spin" /> Orchestrating...
                     </motion.div>
                  ) : (
                    <>Authorize $29.00 <ChevronRight size={16} /></>
                  )}
                </button>
                <button 
                  onClick={() => setSelectedPlan(null)}
                  disabled={isProcessing}
                  className="w-full py-4 text-[9px] font-black uppercase tracking-widest text-black/30 hover:text-black/60 transition-colors"
                >
                  Choose Different Tier
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 opacity-20 filter grayscale">
                 <Globe size={16} />
                 <Shield size={16} />
                 <Lock size={16} />
                 <Cpu size={16} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Decorative Brand Text */}
      <div className="fixed bottom-10 left-10 pointer-events-none opacity-5">
        <h2 className="text-[12rem] font-serif italic leading-none select-none tracking-tighter">DIARCHE</h2>
      </div>
    </div>
  );
};

const LoaderIcon = ({ className }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-20" />
    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.0434 16.4527" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export default PricingPage;
