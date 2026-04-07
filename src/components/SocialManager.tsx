
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, Linkedin, Plus, 
  Clock, Calendar, Zap, 
  CheckCircle2, ArrowRight,
  TrendingUp, Image as ImageIcon,
  Video, FileText, Settings,
  X as XIcon, RefreshCcw
} from 'lucide-react';
import { sarvamAI } from '../lib/sarvam';

const LINKEDIN_CLIENT_ID = "86p2fmpxjzcc41";
const LINKEDIN_API_BASE = "https://api.linkedin.com/rest";

interface Post {
    id: string;
    content: string;
    time: string;
    status: 'scheduled' | 'posted' | 'generating';
    mediaType: 'image' | 'video' | 'text';
    sarvamScore: number;
}

const SocialManager: React.FC<{ isOpen: boolean; onClose: () => void; theme: string }> = ({ isOpen, onClose, theme }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    // Initial 8-post daily schedule
    useEffect(() => {
        const schedule = Array.from({ length: 8 }).map((_, i) => ({
            id: `post-${i}`,
            content: "Waiting for KREO x Sarvam manifestation...",
            time: `${9 + i}:00 AM`, 
            status: 'scheduled' as const,
            mediaType: i % 3 === 0 ? 'image' : i % 3 === 1 ? 'video' : 'text' as any,
            sarvamScore: 0.9 + (Math.random() * 0.1)
        }));
        setPosts(schedule);
    }, []);

    const generateAllPosts = async () => {
        setIsGenerating(true);
        const updatedPosts = await Promise.all(posts.map(async (post) => {
            const manifestation = await sarvamAI.generateIrresistiblePost("Cloud Computing & AI", "irresistible-engagement");
            return {
                ...post,
                content: manifestation.content,
                status: 'scheduled' as const
            };
        }));
        setPosts(updatedPosts);
        setIsGenerating(false);
    };

    const connectLinkedIn = () => {
        // LinkedIn OAuth sequence (simulated redirect)
        const scope = "w_member_social r_liteprofile";
        const redirect = window.location.origin;
        console.log(`Connecting to LinkedIn with Client ID: ${LINKEDIN_CLIENT_ID}`);
        setIsConnected(true);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[1000] flex items-center justify-center bg-white/40 backdrop-blur-3xl p-6"
            >
                <div className="bg-white w-full max-w-6xl h-[85vh] border border-black/5 rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden flex custom-scrollbar">
                    
                    {/* Sidebar Navigation */}
                    <div className="w-80 border-r border-black/5 flex flex-col p-10 bg-[#FAFAFA]">
                        <div className="flex items-center gap-3 mb-16">
                            <div className="w-10 h-10 bg-[#1B3FBF] rounded-2xl flex items-center justify-center">
                                <Share2 size={20} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-serif italic text-black leading-none">Social Manager</h2>
                                <p className="text-[9px] font-black uppercase tracking-widest text-black/20 mt-1">KREO Orchestrate</p>
                            </div>
                        </div>

                        <nav className="space-y-4">
                            {[
                                { icon: Calendar, label: "Daily Schedule", active: true },
                                { icon: TrendingUp, label: "Manifestation Insights" },
                                { icon: Settings, label: "API Configuration" }
                            ].map((item, i) => (
                                <button key={i} className={`w-full flex items-center gap-4 px-6 py-4 rounded-3xl transition-all ${item.active ? 'bg-white shadow-xl text-[#1B3FBF] border border-black/[0.03]' : 'text-black/40 hover:text-black hover:bg-black/[0.02]'}`}>
                                    <item.icon size={18} />
                                    <span className="text-sm font-medium tracking-tight">{item.label}</span>
                                </button>
                            ))}
                        </nav>

                        <div className="mt-auto">
                            <div className={`p-8 rounded-[2.5rem] border ${isConnected ? 'bg-[#1B3FBF]/5 border-[#1B3FBF]/20' : 'bg-black/5 border-transparent'} transition-all`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-black/20'}`} />
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{isConnected ? 'LinkedIn Connected' : 'Disconnected'}</span>
                                </div>
                                <button 
                                    onClick={connectLinkedIn}
                                    className="w-full py-4 rounded-2xl bg-black text-white text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-95"
                                >
                                    {isConnected ? 'Manage OAuth' : 'Connect Account'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col p-12 overflow-hidden overflow-y-auto custom-scrollbar">
                        <div className="flex items-center justify-between mb-16">
                            <div>
                                <h1 className="text-4xl font-serif italic text-black leading-tight mb-2">Manifesting Content</h1>
                                <p className="text-sm text-black/40 tracking-tight">KREO x Sarvam AI generating 8 irresistible posts for LinkedIn today.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={generateAllPosts}
                                    disabled={isGenerating}
                                    className="px-8 py-5 rounded-3xl border border-black text-[11px] font-black uppercase tracking-[0.4em] flex items-center gap-3 transition-all hover:bg-black hover:text-white disabled:opacity-50"
                                >
                                    {isGenerating ? <RefreshCcw className="animate-spin" size={14} /> : <Zap size={14} />}
                                    Generate Daily posts
                                </button>
                                <button onClick={onClose} className="p-5 rounded-3xl bg-black/5 hover:bg-black/10 transition-all">
                                    <XIcon size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Grid Dashboard */}
                        <div className="grid grid-cols-2 gap-8">
                            {posts.map((post, i) => (
                                <motion.div 
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group relative overflow-hidden bg-[#FAFAFA] border border-black/5 rounded-[3rem] p-10 hover:shadow-2xl transition-all duration-700"
                                >
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 bg-white shadow-lg rounded-2xl">
                                                <Clock size={16} className="text-[#1B3FBF]" />
                                            </div>
                                            <span className="text-sm font-medium text-black/60">{post.time}</span>
                                        </div>
                                        <div className="px-4 py-1.5 rounded-full bg-white border border-black/[0.03] text-[9px] font-black uppercase tracking-widest text-green-500 flex items-center gap-2">
                                            <CheckCircle2 size={10} />
                                            {post.status}
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#1B3FBF] mb-4">
                                            {post.mediaType === 'video' ? <Video size={12} /> : post.mediaType === 'image' ? <ImageIcon size={12} /> : <FileText size={12} />}
                                            {post.mediaType} Manifestation
                                        </div>
                                        <p className="text-xl font-light text-black/80 leading-snug italic line-clamp-4 group-hover:line-clamp-none transition-all duration-500 whitespace-pre-wrap">
                                            "{post.content}"
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-8 border-t border-black/5">
                                        <div className="flex items-center gap-8">
                                            <div>
                                                <div className="text-[9px] font-black uppercase tracking-widest opacity-20 mb-1">Sarvam Score</div>
                                                <div className="text-sm font-medium text-[#1B3FBF]">{(post.sarvamScore * 100).toFixed(0)}%</div>
                                            </div>
                                            <div>
                                                <div className="text-[9px] font-black uppercase tracking-widest opacity-20 mb-1">Target</div>
                                                <div className="text-sm font-medium">LinkedIn</div>
                                            </div>
                                        </div>
                                        <button className="p-3 rounded-full bg-black/5 group-hover:bg-[#1B3FBF] group-hover:text-white transition-all transform group-hover:translate-x-2">
                                            <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SocialManager;
