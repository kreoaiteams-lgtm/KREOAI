import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SCENE_DURATION = [6000, 6500, 5500];
const TOTAL_SCENES = 3;

const NeuralAestheticBG = () => (
    <div className="fixed inset-0 -z-10 bg-[#1B3FBF] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_60%,rgba(241,208,111,0.06)_0%,transparent_70%)]" />
    </div>
);

const Scene1 = () => (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-8 px-4">
        <h1 className="text-4xl md:text-7xl font-serif text-[#e8eaf0] tracking-tighter leading-tight max-w-4xl mx-auto">
            <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1 }}>You hit a bottleneck </motion.span>
            <motion.span initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.8, duration: 1 }} className="text-[#F1D06F] italic">that requires a specific tool.</motion.span>
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5, duration: 1.5 }} className="text-white/60 text-lg md:text-2xl font-light mx-auto">
            But out-of-the-box software doesn't fit.
        </motion.p>
    </div>
);

const Scene2 = () => (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-12 px-4">
        <h1 className="text-3xl md:text-6xl font-serif text-[#e8eaf0] tracking-tighter leading-tight max-w-4xl mx-auto">
            <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}>Normally, you'd hack something </motion.span>
            <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1 }} className="text-[#F1D06F] italic">together in Excel.</motion.span>
        </h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.8, duration: 1 }} className="px-8 py-4 border border-[#F1D06F]/20 bg-[#F1D06F]/10 rounded-2xl">
           <p className="text-white/80 text-sm italic">Or spend hours searching for plugins.</p>
        </motion.div>
    </div>
);

const Scene3 = () => (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-10 px-4">
        <h1 className="text-5xl md:text-8xl font-serif text-[#e8eaf0] tracking-tighter leading-tight max-w-5xl">
            <motion.span initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1.2 }}>Build it in <span className="text-[#F1D06F] italic">that exact moment.</span></motion.span>
        </h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 1.2 }} className="text-white/80 text-xl font-light">
            KREO: Instant utility. Real-time solutions.
        </motion.p>
        <motion.div initial={{ width: 0 }} animate={{ width: "80px" }} transition={{ delay: 3, duration: 1.5 }} className="h-[2px] bg-[#F1D06F]/40" />
    </div>
);

export default function KreoPromo2() {
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
                <motion.div key={scene} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.8 }} className="w-full h-full">
                    {scenes[scene]}
                </motion.div>
            </AnimatePresence>

            <div className="fixed bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#F1D06F] to-[#F1D06F]/20 z-[60] transition-all duration-[50ms]" style={{ width: `${progress}%` }} />
        </div>
    );
}
