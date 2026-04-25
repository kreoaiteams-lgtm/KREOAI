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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md p-10 rounded-[3rem] bg-white border border-black/5 shadow-[0_40px_100px_rgba(0,0,0,0.2)] flex flex-col gap-8 max-h-[90vh]"
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-3 bg-black/5 hover:bg-black/10 rounded-full text-black transition-all group"
          title="Dismiss"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform" />
        </button>

        <div className="overflow-y-auto custom-scrollbar pr-2 space-y-8">
          <div className="space-y-1">
            <h2 className="text-3xl font-serif italic text-black">Brand Kit Setup</h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#1B3FBF]">Configure your design system</p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1 space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-black">Primary Color</label>
                <div className="flex items-center gap-3 p-4 bg-[#f8faff] rounded-2xl border border-black/5">
                  <input type="color" value={formData.primaryColor} onChange={e => setFormData({...formData, primaryColor: e.target.value})} className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none" />
                  <span className="text-xs font-mono font-bold text-black">{formData.primaryColor}</span>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-black">Secondary</label>
                <div className="flex items-center gap-3 p-4 bg-[#f8faff] rounded-2xl border border-black/5">
                  <input type="color" value={formData.secondaryColor} onChange={e => setFormData({...formData, secondaryColor: e.target.value})} className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none" />
                  <span className="text-xs font-mono font-bold text-black">{formData.secondaryColor}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-black">Font Family</label>
              <select 
                value={formData.fontFamily} 
                onChange={e => setFormData({...formData, fontFamily: e.target.value})}
                className="w-full p-5 bg-[#f8faff] rounded-2xl text-sm outline-none border border-black/5 focus:border-[#1B3FBF]/20 font-medium text-black appearance-none"
              >
                <option value="Satoshi">Satoshi (Standard)</option>
                <option value="Instrument Serif">Instrument Serif</option>
                <option value="Inter">Inter</option>
                <option value="Outfit">Outfit</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-black">Border Radius (px)</label>
              <input 
                type="text" 
                value={formData.borderRadius} 
                onChange={e => setFormData({...formData, borderRadius: e.target.value})}
                className="w-full p-5 bg-[#f8faff] rounded-2xl text-sm outline-none border border-black/5 focus:border-[#1B3FBF]/20 font-medium text-black"
                placeholder="e.g. 12px or 2rem"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-black">Logo URL</label>
              <div className="flex items-center gap-4 p-5 bg-[#f8faff] rounded-2xl group focus-within:border-[#1B3FBF]/20 border border-black/5 transition-all">
                <LinkIcon size={16} className="text-black/40" />
                <input 
                  type="text" 
                  value={formData.logoUrl} 
                  onChange={e => setFormData({...formData, logoUrl: e.target.value})}
                  className="flex-1 bg-transparent text-sm outline-none font-medium text-black"
                  placeholder="https://brand.com/logo.png"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={() => { onSave(formData); onClose(); }}
            className="w-full py-6 bg-[#1B3FBF] text-white text-[10px] font-black uppercase tracking-widest rounded-[1.8rem] shadow-2xl shadow-[#1B3FBF]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <Save size={16} /> Manifest Design System
          </button>

          <button 
            onClick={onClose}
            className="w-full text-center mt-4 text-[9px] font-black uppercase tracking-widest text-black/20 hover:text-black transition-colors"
          >
            Dismiss Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
};
