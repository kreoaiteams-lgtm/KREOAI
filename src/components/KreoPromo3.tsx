import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SCENE_DURATION = [6000, 6500, 5500];
const TOTAL_SCENES = 3;

const NeuralAestheticBG = () => (
    <div className="fixed inset-0 -z-10 bg-[#1B3FBF] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(241,208,111,0.06)_0%,transparent_70%)]" />
    </div>
);

const Scene1 = () => (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-8 px-4">
        <h1 className="text-4xl md:text-7xl font-serif text-[#e8eaf0] tracking-tighter leading-tight max-w-4xl mx-auto">
            <motion.span initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1.2 }}>A stakeholder asks for a </motion.span>
            <motion.span initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5, duration: 1.2 }} className="text-[#F1D06F] italic">dashboard mockup.</motion.span>
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 1.5 }} className="text-white/60 text-lg md:text-2xl font-light italic mt-6">
            You weren't prepared for this request.
        </motion.p>
    </div>
);

const Scene2 = () => (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-12 px-4">
        <h1 className="text-4xl md:text-7xl font-serif text-[#e8eaf0] tracking-tighter leading-tight max-w-4xl mx-auto">
            <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }}>And they need to </motion.span>
            <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1 }} className="text-white/80 italic">see it in two minutes.</motion.span>
        </h1>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.5, duration: 1.2 }} className="px-6 py-3 border border-[#F1D06F]/20 bg-[#F1D06F]/10 rounded-full">
            <p className="text-[#F1D06F] font-black uppercase tracking-[0.2em] text-[10px]">No problem.</p>
        </motion.div>
    </div>
);

const Scene3 = () => (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-8 px-4">
        <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 1.5 }}
            className="text-5xl md:text-8xl font-serif leading-none tracking-tighter text-[#e8eaf0]">
            Manifest it <span className="text-[#F1D06F] italic">live.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1.5 }} className="text-white/80 text-xl font-light italic">
            No waiting. Instant real-time artifacts.
        </motion.p>
    </div>
);

export default function KreoPromo3() {
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
        <div className="relative w-full h-screen overflow-hidden cursor-default select-none bg-[#1B3FBF]">
            <NeuralAestheticBG />
            <div className="fixed top-10 left-12 z-50 text-white/40 text-[10px] font-black uppercase tracking-[0.5em]">KREO</div>
            
            <AnimatePresence mode="wait">
                <motion.div key={scene} initial={{ opacity: 0, filter: "blur(5px)", scale: 1.05 }} animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }} exit={{ opacity: 0, filter: "blur(5px)", scale: 0.95 }} transition={{ duration: 1.2 }} className="w-full h-full">
                    {scenes[scene]}
                </motion.div>
            </AnimatePresence>

            <div className="fixed bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#F1D06F] to-[#F1D06F]/20 z-[60] transition-all duration-[50ms]" style={{ width: `${progress}%` }} />
        </div>
    );
}
