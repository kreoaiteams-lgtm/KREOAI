import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SCENE_DURATION = [6500, 7000, 7500];
const TOTAL_SCENES = 3;

// --- Royal Cobalt Cinematic Background ---
const NeuralAestheticBG = () => (
    <div className="fixed inset-0 -z-10 bg-[#021330] overflow-hidden">
        {/* Cinematic Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")` }}
        />
        {/* Ambient Neural Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_55%,rgba(201,168,76,0.08)_0%,transparent_70%)]" />
    </div>
);

// --- Individual Scenes ---

// Scene 1: The 2-minute Meeting Panic
const Scene1 = () => (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-8 px-4">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-[#c9a84c] uppercase tracking-[0.4em] text-[10px] font-black">
            10:58 AM
        </motion.p>
        <h1 className="text-5xl md:text-8xl font-serif text-[#e8eaf0] tracking-tighter leading-tight max-w-4xl mx-auto">
            <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.2 }}>Your investor meeting </motion.span>
            <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 1.2 }} className="text-white/40 italic">starts in </motion.span>
            <motion.span initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.8, duration: 1 }} className="text-[#c9a84c]">two minutes.</motion.span>
        </h1>
        <div className="h-4" />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.2, duration: 1.5 }} className="text-white/30 text-lg md:text-2xl font-light italic max-w-2xl mx-auto">
            "We need a live working prototype to close this deal."
        </motion.p>
    </div>
);

// Scene 2: The Instant Urge / Problem Solution
const Scene2 = () => (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-10 px-4">
        <h1 className="text-5xl md:text-8xl font-serif text-[#e8eaf0] tracking-tighter leading-tight max-w-5xl mx-auto">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }}>You don't have time </motion.span>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1 }} className="text-[#c9a84c] italic">to code it.</motion.span>
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1.5 }} className="text-white/40 text-lg md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
            You just need the solution. You need an interface that manifests your exact thoughts into production reality, the second you think them.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4, duration: 1.5 }}
            className="w-[min(500px,92vw)] border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02] shadow-2xl mt-8">
            <div className="p-6 text-left border-l-2 border-[#c9a84c]">
                <p className="text-[#c9a84c] font-black uppercase tracking-[0.3em] text-[9px] mb-3">Manifest Request</p>
                <div className="text-xl italic text-white whitespace-nowrap overflow-hidden animate-[typeIn_1.5s_steps(40,end)_4.5s_forwards] w-0">
                    "Build the dashboard for them right now."
                </div>
            </div>
        </motion.div>
    </div>
);

// Scene 3: KREO The Ultimate Answer
const Scene3 = () => (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-10 px-4">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="text-white/20 uppercase tracking-[0.4em] text-[10px] font-black">
           The Catalyst
        </motion.p>
        
        <div className="space-y-2">
            <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1.5 }}
                className="text-[14vw] md:text-[10vw] font-serif leading-none tracking-tighter text-[#e8eaf0]">
                KRE<span className="text-[#c9a84c] italic">O</span>
            </motion.h1>
            <motion.div initial={{ width: 0 }} animate={{ width: "200px" }} transition={{ delay: 1.8, duration: 1.5 }} className="h-[1px] bg-[#c9a84c]/30 mx-auto" />
        </div>

        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.8, duration: 1.5 }} className="text-white/60 text-xl md:text-3xl font-light max-w-2xl mx-auto italic">
            Describe it. See it. Ship it.
        </motion.p>
        
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5, duration: 1.5 }} className="text-[#c9a84c] text-xs font-black tracking-[0.3em] uppercase border border-[#c9a84c]/20 rounded-full px-6 py-3 bg-[#c9a84c]/5">
            Never miss the moment again.
        </motion.p>
    </div>
);

// --- Main Application ---
export default function KreoPromo() {
    const [scene, setScene] = useState(0);
    const [progress, setProgress] = useState(0);
    const progressInterval = useRef<any>(null);

    useEffect(() => {
        const duration = SCENE_DURATION[scene];
        let elapsed = 0;
        const tick = 50;

        progressInterval.current = setInterval(() => {
            elapsed += tick;
            setProgress((elapsed / duration) * 100);
            if (elapsed >= duration) {
                clearInterval(progressInterval.current);
                setScene((prev) => (prev + 1) % TOTAL_SCENES);
                setProgress(0);
            }
        }, tick);

        return () => clearInterval(progressInterval.current);
    }, [scene]);

    const scenes = [<Scene1 />, <Scene2 />, <Scene3 />];

    return (
        <div className="relative w-full h-screen overflow-hidden cursor-default select-none bg-[#021330]">
            <NeuralAestheticBG />

            {/* Corner Logo */}
            <div className="fixed top-10 left-12 z-50 text-white/20 text-[10px] font-black uppercase tracking-[0.5em]">KREO</div>

            {/* Stage */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={scene}
                    initial={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
                    animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                >
                    {scenes[scene]}
                </motion.div>
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="fixed bottom-0 left-0 h-1 bg-gradient-to-r from-[#c9a84c] to-[#c9a84c]/30 z-[60] transition-all duration-[50ms]" style={{ width: `${progress}%` }} />

            {/* Global Type Animation Style */}
            <style>{`
              @keyframes typeIn { to { width: 100%; } }
            `}</style>
        </div>
    );
}
