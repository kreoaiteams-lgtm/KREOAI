
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  Zap, Copy, Check, 
  ExternalLink, Ghost, 
  ShieldAlert, Send,
  ArrowRight, Sparkles
} from 'lucide-react';
import ArtifactPanel from './ArtifactPanel';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * KREO High-Fidelity Share Architecture
 * Public, read-only view for shared manifestations.
 */
const ShareView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [artifact, setArtifact] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [requestEmail, setRequestEmail] = useState("");
    const [requestSent, setRequestSent] = useState(false);
    const [isRequesting, setIsRequesting] = useState(false);

    useEffect(() => {
        const fetchArtifact = async () => {
            if (!id) return;
            setLoading(true);
            
            // Try fetching by share_token or ID
            const { data, error: fetchError } = await supabase
                .from('artifacts')
                .select('*')
                .or(`share_token.eq.${id},id.eq.${id}`)
                .eq('is_public', true)
                .single();

            if (fetchError || !data) {
                setError("Neural Manifestation Not Found or Private.");
            } else {
                setArtifact(data);
            }
            setLoading(false);
        };

        fetchArtifact();
    }, [id]);

    const handleRequestAccess = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!requestEmail || !artifact) return;

        setIsRequesting(true);
        const { error: reqError } = await supabase
            .from('artifact_access_requests')
            .insert({
                artifact_id: artifact.id,
                requester_email: requestEmail,
                message: "I'd like to collaborate on this manifestation."
            });

        if (!reqError) {
            setRequestSent(true);
        }
        setIsRequesting(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F0F2F9] flex flex-col items-center justify-center space-y-8">
                <div className="w-16 h-16 bg-[#1B3FBF] rounded-full animate-pulse flex items-center justify-center shadow-2xl shadow-[#1B3FBF]/40">
                   <Zap size={24} className="text-white" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]">Syncing Manifestation...</p>
            </div>
        );
    }

    if (error || !artifact) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center space-y-12">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center">
                    <ShieldAlert size={48} className="text-red-500" />
                </div>
                <div className="space-y-4">
                    <h1 className="text-6xl font-serif italic tracking-tighter">Manifestation is Cloud-Locked.</h1>
                    <p className="text-black/40 max-w-md mx-auto text-lg leading-relaxed">
                        This creation hasn't been shared publicly or the neural link has expired.
                    </p>
                </div>
                <Link to="/" className="px-12 py-6 bg-black text-white rounded-full text-xs font-black uppercase tracking-widest hover:scale-[1.05] transition-all">
                    Return to KREO System
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F7F9FC] text-black font-sans flex flex-col selection:bg-[#1B3FBF] selection:text-white">
            
            {/* Minimal High-Fidelity Header */}
            <header className="px-8 py-6 flex items-center justify-between border-b border-black/[0.04] bg-white sticky top-0 z-50">
                <div className="flex items-center gap-6">
                    <Link to="/" className="w-10 h-10 bg-black rounded-full flex items-center justify-center -rotate-12 hover:rotate-0 transition-transform shadow-xl shadow-black/10">
                       <Zap size={18} className="text-white" />
                    </Link>
                    <div className="h-6 w-[1px] bg-black/5" />
                    <div className="space-y-0.5">
                        <h1 className="text-sm font-bold tracking-tight line-clamp-1">{artifact.prompt}</h1>
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#1B3FBF]">KREO Collaborative Manifestation</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/" className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-[#1B3FBF] text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#1B3FBF]/90 transition-all shadow-lg shadow-[#1B3FBF]/20">
                         Continue to System <ArrowRight size={12} />
                    </Link>
                </div>
            </header>

            <main className="flex-1 flex flex-col p-4 md:p-12 gap-12 max-w-[1400px] mx-auto w-full">
                
                {/* Artifact Area - High-Fidelity Read-Only */}
                <div className="flex-1 min-h-[70vh] rounded-[3rem] overflow-hidden shadow-2xl shadow-[#1B3FBF]/5 border border-black/[0.04]">
                   <ArtifactPanel code={artifact.code} prompt={artifact.prompt} readOnly={true} />
                </div>

                {/* Collaborative Request Section - Google Docs Style */}
                <footer className="bg-white rounded-[2.5rem] border border-black/[0.04] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-sm mb-12">
                    <div className="max-w-xl space-y-6">
                        <div className="flex items-center gap-3">
                           <Sparkles size={16} className="text-[#1B3FBF]" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-[#1B3FBF]">Collaboration Layer</span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-serif italic tracking-tighter leading-none">Need to refine this vision?</h3>
                        <p className="text-black/40 text-lg leading-relaxed">
                            Request edit access from the manifest owner to collaborate in real-time or fork this project into your own KREO vault.
                        </p>
                    </div>

                    <div className="w-full md:w-auto min-w-[340px]">
                        <AnimatePresence mode="wait">
                            {!requestSent ? (
                                <motion.form 
                                    key="form"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    onSubmit={handleRequestAccess} 
                                    className="relative flex flex-col gap-4"
                                >
                                    <input 
                                        type="email" 
                                        required
                                        placeholder="Your professional email..."
                                        value={requestEmail}
                                        onChange={(e) => setRequestEmail(e.target.value)}
                                        className="w-full px-8 py-5 bg-black/[0.03] border border-black/[0.06] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3FBF]/20 transition-all font-medium"
                                    />
                                    <button 
                                        disabled={isRequesting}
                                        type="submit"
                                        className="w-full px-8 py-5 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                                    >
                                        {isRequesting ? 'Orchestrating...' : 'Request Edit Access'} <Send size={12} />
                                    </button>
                                </motion.form>
                            ) : (
                                <motion.div 
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center p-8 bg-[#1B3FBF]/5 border border-[#1B3FBF]/10 rounded-[2rem] space-y-4"
                                >
                                    <div className="w-12 h-12 bg-[#1B3FBF] rounded-full flex items-center justify-center mx-auto mb-2 shadow-xl shadow-[#1B3FBF]/20">
                                       <Check size={20} className="text-white" />
                                    </div>
                                    <p className="text-sm font-bold tracking-tight">Request Successfully Dispatched.</p>
                                    <p className="text-[10px] text-black/40 uppercase tracking-widest leading-relaxed">The owner will receive your neural handshake shortly.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default ShareView;
