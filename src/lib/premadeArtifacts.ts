export const PREMADE_ARTIFACTS: Record<string, string> = {
  "Dieter Rams Rhyming Clock": `
import React, { useState, useEffect } from 'https://esm.sh/react';

const RhymingClock = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center p-12 font-serif select-none">
      <div className="w-full max-w-2xl bg-white border border-[#e0e0e0] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] p-20 rounded-sm text-[#1a1a1a] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-black/5" />
        <div className="flex justify-between items-start mb-32 opacity-20">
          <div className="text-[9px] font-black tracking-[0.5em] uppercase">SYSTEM.01 / DIETER RAMS</div>
          <div className="text-[9px] font-black tracking-[0.5em] uppercase">{time.toLocaleTimeString([], { hour12: false })}</div>
        </div>
        
        <div className="space-y-10 min-h-[160px]">
           <h2 className="text-6xl font-light leading-[1.1] tracking-tight text-[#111] animate-in fade-in slide-in-from-bottom-6 duration-1000">
             The light of day begins to fade,
           </h2>
           <h2 className="text-6xl font-light leading-[1.1] tracking-tight text-[#111] opacity-40 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500">
             In shadows where the dreams are laid.
           </h2>
        </div>

        <div className="mt-40 flex items-center gap-6">
           <div className="w-16 h-[2px] bg-black opacity-10" />
           <div className="text-[9px] font-black uppercase tracking-[0.3em] opacity-10">Neural Precision</div>
        </div>
      </div>
    </div>
  );
};
export default RhymingClock;
  `,

  "Cinematic Video Protocol": `
import React, { useEffect, useState } from 'https://esm.sh/react';

const CinematicVideo = () => {
  const [active, setActive] = useState(false);
  useEffect(() => { setTimeout(() => setActive(true), 500); }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-20 overflow-hidden font-serif">
       <div className="absolute inset-0 bg-black z-0" />
       
       {/* Background Element - Blurred Circle */}
       <div className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] transition-all duration-[3000ms] " + (active ? 'scale-110 opacity-40' : 'scale-50 opacity-0')} />

       <div className="relative z-10 flex flex-col items-center gap-12 text-center">
          <div className="overflow-hidden">
             <div className={"text-[10px] font-black tracking-[1em] uppercase opacity-40 transition-all duration-[1500ms] " + (active ? 'translate-y-0 opacity-40' : 'translate-y-full opacity-0')}>
                Established Manifest / 2026
             </div>
          </div>

          <div className="overflow-hidden py-4">
             <h1 className={"text-9xl font-light italic leading-none transition-all duration-[2000ms] delay-500 ease-out " + (active ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0')}>
                The <span className="font-bold not-italic font-sans tracking-tighter">Manifesto</span>
             </h1>
          </div>

          <div className="overflow-hidden">
             <p className={"text-xl font-light text-white/30 max-w-lg leading-relaxed transition-all duration-[1500ms] delay-1000 " + (active ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0')}>
                Orchestrating visual perception through sequential neural timing and architectural motion.
             </p>
          </div>

          <div className={"mt-12 flex gap-8 transition-all duration-[2000ms] delay-[1500ms] " + (active ? 'scale-100 opacity-100' : 'scale-90 opacity-0')}>
             <button className="px-12 py-6 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-white/80 transition-all ring-offset-4 ring-offset-black hover:ring-2 ring-white">Enter Dimension</button>
             <button className="px-12 py-6 bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">Details</button>
          </div>
       </div>

       <style>{\`
          .ease-out { transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1); }
       \`}</style>
    </div>
  );
};
export default CinematicVideo;
  `,
  "Neural Flowchart Manifest": `
import React from 'https://esm.sh/react';

const Flowchart = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-12 font-sans overflow-hidden">
       <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-30" />
       
       <div className="relative space-y-24 w-full max-w-4xl">
          <div className="text-center space-y-4 mb-20 animate-in fade-in slide-in-from-top-8 duration-1000">
             <div className="inline-block px-4 py-1 bg-black text-white text-[10px] font-bold tracking-[0.3em] uppercase rounded-full mb-4">Neural Architecture</div>
             <h1 className="text-6xl font-black tracking-tighter uppercase leading-none">Decision Flow</h1>
          </div>

          <div className="relative flex flex-col items-center gap-12">
             <div className="w-64 p-8 bg-white border-2 border-black rounded-3xl shadow-[8px_8px_0_0_rgba(0,0,0,1)] text-center font-bold animate-in zoom-in-95 duration-500">
                INITIATE TASK
             </div>
             <div className="w-[2px] h-12 bg-black animate-in fade-in duration-1000 delay-500" />
             <div className="relative w-48 h-48 border-2 border-black rotate-45 flex items-center justify-center bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] animate-in zoom-in-95 duration-500 delay-700">
                <div className="-rotate-45 text-center font-bold px-4 uppercase tracking-tighter">Validate Input?</div>
             </div>
             <div className="w-[2px] h-12 bg-black animate-in fade-in duration-1000 delay-1000" />
             <div className="w-64 p-8 bg-blue-600 text-white rounded-3xl shadow-[8px_8px_0_0_rgba(0,0,0,1)] text-center font-bold animate-in zoom-in-95 duration-500 delay-1200">
                EXECUTE LOGIC
             </div>
          </div>
       </div>
    </div>
  );
};
export default Flowchart;
  `,

  "Cinematic Motion Protocol": `
import React, { useEffect, useState } from 'https://esm.sh/react';

const CinematicMotion = () => {
  const [active, setActive] = useState(false);
  useEffect(() => { setTimeout(() => setActive(true), 500); }, []);

  return (
    <div className="min-h-screen bg-black text-white p-20 flex flex-col justify-end gap-12 overflow-hidden">
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2672" 
            className="w-full h-full object-cover scale-110 animate-pulse duration-[10s]" 
          />
       </div>

       <div className="relative z-20 space-y-12">
          <div className="space-y-4">
             <div className={"h-[2px] bg-white transition-all duration-[2000ms] " + (active ? 'w-32' : 'w-0')} style={{ transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)' }} />
             <span className="text-xs font-bold tracking-[1em] uppercase opacity-40">Active Manifest / 001</span>
          </div>

          <div className="space-y-4">
             <h1 className={"text-9xl font-black tracking-tighter leading-[0.85] transition-all duration-[1500ms] delay-500 " + (active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20')}>
                DELAYED<br/>MOTION
             </h1>
             <p className={"text-xl font-light italic text-white/40 max-w-md transition-all duration-[1500ms] delay-1000 " + (active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
                Establishing the threshold of visual perception through orchestrated neural timing.
             </p>
          </div>
          
          <div className={"mt-10 flex gap-4 transition-all duration-[1500ms] delay-[1500] " + (active ? 'opacity-100 scale-100' : 'opacity-0 scale-95')}>
             <button className="px-10 py-5 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-white/90 transition-all">Engage Protocol</button>
             <button className="px-10 py-5 bg-white/5 border border-white/20 text-white font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">Details</button>
          </div>
       </div>
    </div>
  );
};
export default CinematicMotion;
  `,

  "Bedtime Story Weaver": `
import React, { useState } from 'https://esm.sh/react';

const BedtimeStories = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState("");

  const generate = () => {
     setLoading(true);
     setTimeout(() => {
       setStory("The forest hummed with a silver light, and the wind carried the scent of ancient whispers...");
       setLoading(false);
       setStep(3);
     }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-8 font-serif">
       <div className="w-full max-w-2xl bg-white p-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-black/5 rounded-[3.5rem] relative">
          {step === 1 && (
            <div className="space-y-14 animate-in fade-in zoom-in-95 duration-700">
               <div className="space-y-4">
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-30">Nadia.ai / Narrative Core</span>
                  <h1 className="text-7xl font-light italic tracking-tighter text-[#111]">Story Weaver</h1>
               </div>
               <div className="space-y-8">
                  <input placeholder="Enter Child's Age" className="w-full border-b border-black/10 pb-4 text-3xl outline-none focus:border-black transition-all font-light" />
                  <input placeholder="Interest (e.g. Space, Magic)" className="w-full border-b border-black/10 pb-4 text-3xl outline-none focus:border-black transition-all font-light" />
               </div>
               <button onClick={() => setStep(2)} className="w-full bg-[#111] text-white py-8 rounded-[2rem] text-xl font-medium hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl">Begin Manifestation</button>
            </div>
          )}
          {step === 2 && (
             <div className="flex flex-col items-center gap-10 py-32 text-center animate-in fade-in">
                <div className="w-24 h-24 border-[3px] border-black/5 border-t-black rounded-full animate-spin" />
                <h2 className="text-4xl italic tracking-tight">Gathering moonbeams...</h2>
                <button onClick={generate} className="text-xs uppercase opacity-20 hover:opacity-100 mt-10">Neural Skip</button>
             </div>
          )}
          {step === 3 && (
             <div className="space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                <p className="text-4xl leading-[1.4] font-light italic text-[#111]">{story}</p>
                <button onClick={() => setStep(1)} className="text-xs font-black uppercase border-b-2 border-black pb-2">Record New Tale</button>
             </div>
          )}
       </div>
    </div>
  );
};
export default BedtimeStories;
  `,

  "Molecule Studio 3D": `
import React, { useState } from 'https://esm.sh/react';

const MoleculeStudio = () => {
  const [molecule, setMolecule] = useState("");
  
  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center p-16 gap-16 font-sans overflow-hidden">
       <div className="flex-1 w-full relative flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1.2px,transparent_1.2px)] [background-size:40px_40px] opacity-20" />
          <div className="relative space-y-16 flex flex-col items-center animate-in fade-in zoom-in-95 duration-1000">
             <div className="flex items-center justify-center gap-10">
                <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center text-white text-3xl font-black border-8 border-white shadow-2xl">H</div>
                <div className="w-20 h-[3px] bg-black/10 rounded-full" />
                <div className="w-32 h-32 rounded-full bg-black/5 flex items-center justify-center text-black/20 text-4xl font-black border-8 border-white shadow-2xl">O</div>
                <div className="w-20 h-[3px] bg-black/10 rounded-full" />
                <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center text-white text-3xl font-black border-8 border-white shadow-2xl">H</div>
             </div>
             <div className="text-center space-y-4">
                <h1 className="text-8xl font-black tracking-tighter uppercase leading-[0.85] text-[#111]">Neural Atomic</h1>
                <p className="text-[11px] opacity-40 font-black tracking-[0.4em] uppercase">Resolving {molecule || 'Carbon'}</p>
             </div>
          </div>
       </div>
       <div className="w-full max-w-2xl">
          <input 
             value={molecule} 
             onChange={(e) => setMolecule(e.target.value)}
             placeholder="Invoke Atomic Manifest..." 
             className="w-full bg-white border-2 border-black rounded-[2.5rem] p-8 text-2xl outline-none transition-all text-center font-bold" 
          />
       </div>
    </div>
  );
};
export default MoleculeStudio;
  `,
  "Visual Orchestrator": `
import React, { useState } from 'https://esm.sh/react';

const VisualOrchestrator = () => {
  const [selected, setSelected] = useState(null);
  const options = [
    { id: 'cinematic', title: 'Cinematic & Dark', description: 'Editorial focus with atmospheric depth.' },
    { id: 'minimal', title: 'Clean & Minimalist', description: 'Professional clarity and refined white-space.' },
    { id: 'vibrant', title: 'Vibrant & Energetic', description: 'Impact-driven motion and bold gradients.' },
    { id: 'technical', title: 'Technical & Schematic', description: 'Detail-oriented architectural precision.' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-12 font-serif overflow-hidden">
       {/* Background Depth */}
       <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10" />
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full" />
       
       <div className="relative w-full max-w-4xl glass-panel p-20 rounded-[4rem] border border-white/5 space-y-16 animate-in fade-in zoom-in-95 duration-1000">
          <div className="space-y-6">
             <span className="text-[10px] font-black tracking-[0.6em] uppercase text-primary animate-pulse">Neural Clarification Protocol</span>
             <h1 className="text-7xl font-light italic text-white tracking-tighter leading-none">Establishing Manifest Parameters</h1>
             <p className="text-white/30 text-xl font-light leading-relaxed max-w-2xl font-serif italic">Choose a design trajectory to align the orchestrator's visual weighting before manifestation begins.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {options.map((opt) => (
               <button 
                 key={opt.id}
                 onClick={() => setSelected(opt.id)}
                 className={"group p-10 rounded-[2.5rem] border transition-all text-left space-y-4 " + 
                   (selected === opt.id ? 'bg-primary/20 border-primary shadow-[0_0_40px_rgba(37,99,235,0.2)]' : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10')}
               >
                  <h3 className="text-2xl font-light text-white tracking-tight leading-none transition-all group-hover:translate-x-2">{opt.title}</h3>
                  <p className="text-white/30 text-sm italic font-light font-serif leading-relaxed">{opt.description}</p>
               </button>
             ))}
          </div>

          <div className="pt-10 flex items-center justify-between">
             <button className={"px-12 py-6 rounded-full font-black uppercase text-[11px] tracking-widest transition-all " + 
               (selected ? 'bg-primary text-white shadow-xl hover:scale-[1.02] active:scale-[0.98]' : 'bg-white/5 text-white/20 cursor-not-allowed')}>
                Resume Manifestation
             </button>
             <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-white/10" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 italic">Aesthetic Calibration Active</span>
             </div>
          </div>
       </div>
    </div>
  );
};
export default VisualOrchestrator;
  `,

  "QR Code Vision Engine": `
import React, { useState } from 'https://esm.sh/react';

const QRCodeVision = () => {
  const [url, setUrl] = useState("https://kreo.ai");
  
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-12 font-sans overflow-hidden">
       <div className="absolute inset-0 bg-[#f8f9fa] opacity-60" />
       
       <div className="relative w-full max-w-2xl space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="text-center space-y-4">
             <span className="text-[10px] font-black tracking-[0.5em] uppercase text-black opacity-30">Vector Manifest / 042</span>
             <h1 className="text-8xl font-black tracking-tighter uppercase leading-none">QR VISION</h1>
          </div>

          <div className="relative group bg-white shadow-[0_80px_160px_-40px_rgba(0,0,0,0.15)] rounded-[4rem] p-16 border border-black/5 flex flex-col items-center gap-12 overflow-hidden transition-all hover:scale-[1.01]">
             <div className="absolute top-0 right-0 w-32 h-32 bg-black opacity-[0.02] rounded-full -translate-y-1/2 translate-x-1/2" />
             
             <div className="w-64 h-64 bg-[#f0f0f0] rounded-[2rem] flex items-center justify-center p-4 border border-black/10 overflow-hidden">
                {/* Mock QR Representation */}
                <div className="w-full h-full bg-black rounded-lg opacity-40 grid grid-cols-8 grid-rows-8 gap-0.5">
                   {[...Array(64)].map((_, i) => (
                     <div key={i} className={"rounded-sm " + (Math.random() > 0.5 ? 'bg-white' : 'bg-transparent')} />
                   ))}
                </div>
             </div>

             <div className="w-full space-y-8">
                <input 
                  value={url} 
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full text-center text-2xl font-light italic outline-none border-b border-black/10 pb-4 focus:border-black transition-all" 
                />
                <button className="w-full bg-black text-white py-8 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                   Establish Vector
                </button>
             </div>
          </div>

          <div className="flex justify-center items-center gap-4 opacity-20">
             <div className="h-[1px] w-8 bg-black" />
             <span className="text-[9px] font-black tracking-[0.4em] uppercase uppercase">Precision Generative</span>
             <div className="h-[1px] w-8 bg-black" />
          </div>
       </div>
    </div>
  );
};
export default QRCodeVision;
  `
};
