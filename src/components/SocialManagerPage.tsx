import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Linkedin, Zap, Clock, 
  CheckCircle2, RefreshCcw, 
  Activity, Shield, Lock,
  Plus, Check
} from 'lucide-react';
import { sarvamAI } from '../lib/sarvam';
import { supabase } from '../lib/supabase';

const LINKEDIN_CLIENT_ID = "86xmiww1fqytmq";

/**
 * High-Fidelity Social Orchestrator
 * Hidden full-sized portal for eternal automated LinkedIn manifestation
 */
const SocialManagerPage: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [isAutoManifesting, setIsAutoManifesting] = useState(false);
    const [expandedPost, setExpandedPost] = useState<any | null>(null);
    const [isDiagnosing, setIsDiagnosing] = useState(false);
    // Initial 8-post batch manifestation (Sync with Supabase for 'Always On')
    const initializeDailyBatch = async () => {
        setIsAutoManifesting(true);
        console.log("KREO x Sarvam 00:00 AM Sync: Orchestrating Eternal Batch...");
        
        const neuralTopics = [
            'Cinematic PPT Manifestation', 'Financial Excel Orchestration', 'Interactive PDF Structure', 
            '24/8 Social Manifestation', 'Dither & Neural Waves', 'Rich Minimalist Design', 
            'Editorial Typography', 'Architectural AI Logic'
        ];

        try {
            const batch = await Promise.all(
                Array.from({ length: 8 }).map(async (_, i) => {
                    const manifest = await sarvamAI.generateIrresistiblePost(neuralTopics[i % neuralTopics.length], "high-visibility");
                    const waitMs = (i + 1) * 10800000;
                    const postAt = new Date(Date.now() + waitMs).toISOString();

                    return {
                        topic: neuralTopics[i % neuralTopics.length],
                        content: manifest.content,
                        post_at: postAt,
                        status: 'scheduled' as const
                    };
                })
            );

            // Persist to Cloud for Eternal Orchestration
            const { error: insertError } = await supabase.from('social_manifest_queue').insert(batch);
            if (insertError) throw insertError;

            // Refresh UI from Cloud
            fetchManifestQueue();

        } catch (err) {
            console.error("Batch Orchestration Failed:", err);
            setIsAutoManifesting(false);
        }
    };

    const fetchManifestQueue = async () => {
        const { data, error } = await supabase
            .from('social_manifest_queue')
            .select('*')
            .order('post_at', { ascending: true })
            .limit(16);
        
        if (!error && data) {
            setPosts(data.map(p => ({
                ...p,
                time: new Date(p.post_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            })));
            if (data.length > 0) setIsAutoManifesting(true);
        }
    };

    // Load state on mount
    useEffect(() => {
        fetchManifestQueue();
        
        // Check Auth Status
        supabase.from('social_manifest_auth').select('*').limit(1).then(({ data }) => {
            if (data && data.length > 0) setIsConnected(true);
        });

        // Handle OAuth Callback (Neural Handshake)
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            console.log("Orchestrating Neural Handshake...");
            const origin = window.location.origin;
            const redirect_uri = origin + "/social-manifest";
            
            fetch('/api/social-auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, redirect_uri })
            }).then(async res => {
                if (res.ok) {
                    setIsConnected(true);
                    window.history.replaceState({}, document.title, "/social-manifest");
                } else {
                    const err = await res.json();
                    console.error("Neural Handshake Failed:", err);
                }
            });
        }
    }, []);

    const connectLinkedIn = () => {
        const origin = window.location.origin;
        const redirectPath = "/social-manifest";
        const redirect = encodeURIComponent(origin + redirectPath);
        const scope = encodeURIComponent('w_member_social');
        const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${redirect}&scope=${scope}`;
        window.location.href = authUrl;
    };

    const diagnoseNeuralLink = async () => {
        setIsDiagnosing(true);
        console.log("Diagnosing Neural Link Architecture...");
        try {
            const res = await fetch('/api/social-orchestrate?test=true');
            const data = await res.json();
            if (res.ok) {
                console.log("Neural Manifestation Successful: Check your LinkedIn feed.");
                fetchManifestQueue();
            } else {
                console.error("Neural Link Collapse:", data);
            }
        } catch (err) {
            console.error("Diagnostic Pulse Failed:", err);
        }
        setIsDiagnosing(false);
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-[#1B3FBF] selection:text-white flex flex-col p-8 md:p-16 relative">
            <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
                
                {/* Minimal Header */}
                <header className="flex items-center justify-between mb-24 anim-in-up">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center -rotate-12 hover:rotate-0 transition-transform duration-500">
                           <Zap size={20} className="text-white" />
                        </div>
                        <div>
                           <h1 className="text-2xl font-bold tracking-tighter leading-none">Social Manifest</h1>
                           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 mt-1">Neural Orchestration Layer</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        {isConnected && isAutoManifesting && (
                            <button 
                                onClick={diagnoseNeuralLink}
                                disabled={isDiagnosing}
                                className={`flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full border border-black transition-all ${isDiagnosing ? 'opacity-50 animate-pulse' : 'hover:scale-[1.05] active:scale-95 shadow-lg shadow-black/10'}`}
                            >
                               <Activity size={10} />
                               <span className="text-[9px] font-black uppercase tracking-widest">{isDiagnosing ? 'Diagnosing...' : 'Diagnose Neural Link'}</span>
                            </button>
                        )}
                        <div className="flex items-center gap-3">
                           <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-[#1B3FBF]' : 'bg-black/10'}`} />
                           <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{isConnected ? 'NEURAL LINK ESTABLISHED' : 'OFFLINE'}</span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 flex flex-col items-center justify-center text-center max-w-[90rem] mx-auto w-full">
                    <AnimatePresence mode="wait">
                        {!isConnected ? (
                            <motion.div 
                                key="connect"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                className="space-y-12"
                            >
                                <div className="space-y-6">
                                    <h2 className="text-6xl md:text-8xl font-serif italic leading-[1.05] tracking-tighter">Manifest KREO daily.</h2>
                                    <p className="text-xl text-black/40 font-light max-w-2xl mx-auto leading-relaxed">
                                        Our neural engine will orchestrate high-fidelity LinkedIn presence every 3 hours using Sarvam AI. No noise, just irresistible logic.
                                    </p>
                                </div>
                                <button 
                                    onClick={connectLinkedIn}
                                    className="px-16 py-8 bg-[#1B3FBF] text-white rounded-[3rem] text-sm font-black uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-4 mx-auto"
                                >
                                    <Linkedin size={18} />
                                    Launch LinkedIn Manifest
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="dashboard"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full space-y-20"
                            >
                                <div className="flex flex-col items-center gap-8">
                                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none px-6">24/8 Daily Manifest</h2>
                                    
                                    {!isAutoManifesting ? (
                                        <button 
                                            onClick={initializeDailyBatch}
                                            className="px-12 py-6 border-2 border-[#1B3FBF] text-[#1B3FBF] rounded-full text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#1B3FBF] hover:text-white transition-all flex items-center gap-3"
                                        >
                                            <Zap size={14} /> Start Daily Manifestation Layer
                                        </button>
                                    ) : (
                                        <div className="px-12 py-6 bg-black text-white rounded-full text-[11px] font-black uppercase tracking-[0.4em] flex items-center gap-3 animate-pulse">
                                            <Activity size={14} /> Global Manifestation Active
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
                                    {posts.map((post, i) => (
                                        <div 
                                          key={post.id} 
                                          onClick={() => setExpandedPost(post)}
                                          className={`p-12 rounded-[3.5rem] border-2 transition-all duration-700 text-left flex flex-col justify-between h-[360px] group cursor-pointer ${post.status === 'posted' ? 'bg-black text-white border-transparent shadow-[0_40px_100px_-20px_rgba(27,63,191,0.3)] scale-[1.02]' : 'bg-white border-black/5 hover:border-[#1B3FBF]/20 shadow-xl shadow-black/5'}`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex flex-col gap-1">
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${post.status === 'posted' ? 'text-[#1B3FBF]' : 'text-black/40'}`}>{post.time}</span>
                                                    <span className={`text-xl font-bold ${post.status === 'posted' ? 'text-white' : 'text-black'}`}>{post.status === 'posted' ? 'MANIFESTED' : 'SCHEDULED'}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    {post.status === 'scheduled' && (
                                                        <button 
                                                            onClick={async (e) => {
                                                                e.stopPropagation();
                                                                const manifest = await sarvamAI.generateIrresistiblePost(post.topic, "regenerated-manifest");
                                                                setPosts(prev => prev.map(p => p.id === post.id ? { ...p, content: manifest.content } : p));
                                                            }}
                                                            className="p-3 rounded-full bg-black/5 hover:bg-[#1B3FBF] hover:text-white transition-all text-black/20"
                                                        >
                                                            <RefreshCcw size={14} />
                                                        </button>
                                                    )}
                                                    {post.status === 'posted' ? <CheckCircle2 size={24} className="text-[#1B3FBF]" /> : <Clock size={20} className="text-black/10" />}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className={`text-[10px] font-black uppercase tracking-widest ${post.status === 'posted' ? 'text-[#1B3FBF]' : 'text-[#1B3FBF]'}`}>• {post.topic}</div>
                                                <p className={`text-[15px] font-medium leading-relaxed italic line-clamp-4 ${post.status === 'posted' ? 'text-white/80' : 'text-black/60'}`}>
                                                    "{post.content}"
                                                </p>
                                                <div className="text-[9px] font-black uppercase tracking-widest opacity-20">Click to expand</div>
                                            </div>

                                            <div className={`pt-8 border-t ${post.status === 'posted' ? 'border-white/10' : 'border-black/5'} flex items-center justify-between`}>
                                                <span className={`text-[9px] font-black uppercase tracking-[0.4em] ${post.status === 'posted' ? 'text-white/20' : 'text-black/20'}`}>Sarvam Bulbul:v3</span>
                                                <div className={`w-2 h-2 rounded-full ${post.status === 'posted' ? 'bg-[#1B3FBF]' : 'bg-[#1B3FBF]/40'}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>

                <footer className="py-12 border-t border-black/5 mt-auto flex justify-between items-center opacity-30 text-[9px] font-black uppercase tracking-[0.6em]">
                    <span>KREO — High-Fidelity Private Layer</span>
                    <div className="flex items-center gap-12">
                        <span>Sarvam sk_pd0jziip... ACTIVE</span>
                        <span>LinkedIn 86xmiww1f... ACTIVE</span>
                    </div>
                </footer>
            </div>

            {/* Post Expansion Overlay */}
            <AnimatePresence>
                {expandedPost && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setExpandedPost(null)}
                        className="fixed inset-0 z-[1000] bg-white/90 backdrop-blur-3xl p-12 flex items-center justify-center"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="max-w-3xl w-full bg-white p-16 rounded-[4rem] border shadow-2xl space-y-12"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <span className="text-xs font-black uppercase tracking-widest text-[#1B3FBF]">{expandedPost.time}</span>
                                    <h3 className="text-6xl font-serif italic">{expandedPost.status === 'posted' ? 'Manifested' : 'Scheduled'}</h3>
                                    <div className="text-sm font-black uppercase tracking-[0.4em] text-black/20 mt-4">• {expandedPost.topic}</div>
                                </div>
                                <button onClick={() => setExpandedPost(null)} className="p-4 rounded-full bg-black/5 hover:bg-black hover:text-white transition-all">
                                    <Plus className="rotate-45" />
                                </button>
                            </div>
                            
                            <p className="text-3xl font-light italic leading-relaxed text-black/70">
                                "{expandedPost.content}"
                            </p>

                            <div className="pt-12 border-t border-black/5 flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Orchestration Layer</span>
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1B3FBF]">Sarvam Logic Active</span>
                                </div>
                                <div className="w-12 h-12 bg-[#1B3FBF] rounded-full flex items-center justify-center text-white">
                                    <Linkedin />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SocialManagerPage;
