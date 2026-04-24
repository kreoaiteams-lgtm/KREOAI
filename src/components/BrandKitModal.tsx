import { motion, AnimatePresence } from "framer-motion";
import { X, Palette, Link as LinkIcon, Save } from "lucide-react";
import { useState } from "react";
import { BrandKit } from "@/features/useBrandKit";

interface BrandKitModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandKit: BrandKit | null;
  onSave: (kit: BrandKit) => void;
}

export const BrandKitModal = ({ isOpen, onClose, brandKit, onSave }: BrandKitModalProps) => {
  const [formData, setFormData] = useState<BrandKit>(brandKit || {
    primaryColor: "#1B3FBF",
    secondaryColor: "#050a1f",
    fontFamily: "Satoshi",
    borderRadius: "0.5rem",
    logoUrl: ""
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md p-10 rounded-[3rem] bg-white border border-black/5 shadow-2xl space-y-8"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-serif italic text-black">Brand Kit Setup</h2>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full"><X size={18} /></button>
        </div>

        <div className="space-y-5">
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Primary Color</label>
              <div className="flex items-center gap-2 p-3 bg-black/5 rounded-2xl">
                <input type="color" value={formData.primaryColor} onChange={e => setFormData({...formData, primaryColor: e.target.value})} className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none" />
                <span className="text-xs font-mono">{formData.primaryColor}</span>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Secondary</label>
              <div className="flex items-center gap-2 p-3 bg-black/5 rounded-2xl">
                <input type="color" value={formData.secondaryColor} onChange={e => setFormData({...formData, secondaryColor: e.target.value})} className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none" />
                <span className="text-xs font-mono">{formData.secondaryColor}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Font Family</label>
            <select 
              value={formData.fontFamily} 
              onChange={e => setFormData({...formData, fontFamily: e.target.value})}
              className="w-full p-4 bg-black/5 rounded-2xl text-sm outline-none border border-transparent focus:border-[#1B3FBF]/20"
            >
              <option value="Satoshi">Satoshi (Standard)</option>
              <option value="Instrument Serif">Instrument Serif</option>
              <option value="Inter">Inter</option>
              <option value="Outfit">Outfit</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Border Radius (px)</label>
            <input 
              type="text" 
              value={formData.borderRadius} 
              onChange={e => setFormData({...formData, borderRadius: e.target.value})}
              className="w-full p-4 bg-black/5 rounded-2xl text-sm outline-none"
              placeholder="e.g. 12px or 2rem"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Logo URL</label>
            <div className="flex items-center gap-3 p-4 bg-black/5 rounded-2xl group focus-within:border-[#1B3FBF]/20 border border-transparent transition-all">
              <LinkIcon size={14} className="text-black/20" />
              <input 
                type="text" 
                value={formData.logoUrl} 
                onChange={e => setFormData({...formData, logoUrl: e.target.value})}
                className="flex-1 bg-transparent text-sm outline-none"
                placeholder="https://brand.com/logo.png"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={() => { onSave(formData); onClose(); }}
          className="w-full py-5 bg-[#1B3FBF] text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl shadow-xl shadow-[#1B3FBF]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <Save size={14} /> Manifest Design System
        </button>
      </motion.div>
    </div>
  );
};
