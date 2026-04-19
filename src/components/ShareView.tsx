
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
import SplashScreen from './SplashScreen';
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
    const [isSplashComplete, setIsSplashComplete] = useState(false);

    useEffect(() => {
        const fetchArtifact = async () => {
            if (!id) return;
            setLoading(true);
            
            try {
                // Determine if ID is a valid UUID to avoid Supabase 400 error
                const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                const isUuid = uuidRegex.test(id);

                let query = supabase.from('artifacts').select('id, prompt, code, created_at, user_id');
                
                if (isUuid) {
                    query = query.or(`id.eq.${id}`);
                } else {
                    query = query.eq('id', id);
                }

                let { data, error: fetchError } = await query.maybeSingle();

                // Advanced Recovery: Try share_token column if basic ID search fails
                if (fetchError || !data) {
                    const fallbackQuery = supabase.from('artifacts').select('id, prompt, code, created_at, user_id, share_token');
                    if (isUuid) {
                        fallbackQuery.or(`share_token.eq.${id}`);
                    } else {
                        fallbackQuery.eq('share_token', id);
                    }
                    const fallback = await fallbackQuery.maybeSingle();
                    if (fallback.data) {
                        data = fallback.data;
                        fetchError = null;
                    }
                }

                if (fetchError || !data) {
                    console.error("Fetch manifest error:", fetchError);
                    setError("Neural Manifestation Not Found. The protocol may be incorrect or the artifact was never synchronized.");
                } else {
                    setArtifact(data);
                }
            } catch (err) {
                console.error("Link sync failure:", err);
                setError("Neural Sync Failure.");
            } finally {
                setLoading(false);
            }
        };

        fetchArtifact();
    }, [id]);

    // Request Access logic removed as per user request to remove "access and stuff"

/* SplashScreen removed to ensure instantaneous share rendering */

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F0F2F9] flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-1000">
                <div className="w-16 h-16 bg-[#1B3FBF] rounded-full animate-pulse flex items-center justify-center shadow-2xl shadow-[#1B3FBF]/40">
                   <Zap size={24} className="text-white" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1B3FBF]">Syncing Manifestation...</p>
            </div>
        );
    }

    if (error || !artifact) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center space-y-12 animate-in fade-in duration-1000">
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
        <React.Fragment>
            <div className={`min-h-screen bg-[#F7F9FC] text-black font-sans flex flex-col selection:bg-[#1B3FBF] selection:text-white transition-opacity duration-1000 animate-in fade-in`}>
            
            {/* Minimal High-Fidelity Header */}
            <header className="px-8 py-6 flex items-center justify-between border-b border-black/[0.04] bg-white sticky top-0 z-50">
                <div className="flex items-center gap-6">
                    <Link to="/" className="w-10 h-10 bg-black rounded-full flex items-center justify-center -rotate-12 hover:rotate-0 transition-transform shadow-xl shadow-black/10">
                       <Zap size={18} className="text-white" />
                    </Link>
                    <div className="h-6 w-[1px] bg-black/5" />
                    <div className="space-y-0.5">
                        <h1 className="text-sm font-bold tracking-tight line-clamp-1">Shared with you by the user nMW</h1>
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#1B3FBF]">KREO High-Fidelity Read-Only Manifestation</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/" className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-[#1B3FBF] text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#1B3FBF]/90 transition-all shadow-lg shadow-[#1B3FBF]/20">
                         Continue to System <ArrowRight size={12} />
                    </Link>
                </div>
            </header>

            <main className="flex-1 flex flex-col p-4 md:p-6 gap-6 w-full max-w-[1800px] mx-auto">
                
                {/* Artifact Area - High-Fidelity Read-Only - Expanded for impact */}
                <div className="flex-1 min-h-[85vh] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#1B3FBF]/10 border border-black/[0.04] bg-white">
                   <ArtifactPanel code={artifact.code} prompt={artifact.prompt} readOnly={true} />
                </div>

            </main>
        </div>
        </React.Fragment>
    );
};

export default ShareView;
