
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translateText } from '@/lib/ai';
import { LANGUAGES, LangCode } from '@/lib/i18n';
import { useLang } from '@/context/LanguageContext';
import { Loader2, Languages, X, Copy, Check, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const NeuralTranslate = () => {
  const { lang: currentAppLang } = useLang();
  const [selection, setSelection] = useState<{ text: string; x: number; y: number } | null>(null);
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [targetLang, setTargetLanguage] = useState<LangCode>(() => {
    return (localStorage.getItem('kreo_last_translate_lang') as LangCode) || 'hi';
  });
  const [copied, setCopied] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelection = () => {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;
      
      const text = sel.toString().trim();
      if (text.length < 1 || text.length > 1000) {
        if (!isTranslating) setSelection(null);
        return;
      }

      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      // Don't trigger if clicking inside the popup
      if (popupRef.current?.contains(document.activeElement)) return;

      setSelection({
        text,
        x: rect.left + rect.width / 2,
        y: rect.top + window.scrollY - 10
      });
      
      // Reset state for new selection
      setTranslatedText('');
      setCopied(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
            const sel = window.getSelection();
            if (!sel || sel.toString().trim().length === 0) {
                setSelection(null);
            }
        }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTranslating]);

  const handleTranslate = async (langOverride?: LangCode) => {
    if (!selection) return;
    
    const lang = langOverride || targetLang;
    setIsTranslating(true);
    setTranslatedText('');
    
    try {
      const result = await translateText(selection.text, LANGUAGES.find(l => l.code === lang)?.label || lang);
      setTranslatedText(result);
      if (langOverride) {
          setTargetLanguage(langOverride);
          localStorage.setItem('kreo_last_translate_lang', langOverride);
      }
    } catch (err) {
      toast.error("Neural Translation Failed");
    } finally {
      setIsTranslating(false);
    }
  };

  const copyToClipboard = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    toast.success("Copied to neural clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {selection && (
        <motion.div
          ref={popupRef}
          initial={{ opacity: 0, y: 10, scale: 0.95, x: '-50%' }}
          animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
          exit={{ opacity: 0, y: 10, scale: 0.95, x: '-50%' }}
          style={{ 
            position: 'absolute', 
            left: selection.x, 
            top: selection.y,
            zIndex: 9999,
            transform: 'translateX(-50%)'
          }}
          className="w-72 bg-white/80 backdrop-blur-2xl border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[1.5rem] overflow-hidden p-1 pointer-events-auto select-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-black/[0.03]">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#1B3FBF]/10 flex items-center justify-center">
                <Languages className="w-3 h-3 text-[#1B3FBF]" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Auto Translate</span>
            </div>
            <button 
              onClick={() => setSelection(null)}
              className="p-1 hover:bg-black/5 rounded-full transition-colors"
            >
              <X className="w-3 h-3 opacity-20" />
            </button>
          </div>

          <div className="p-3 space-y-3">
            {/* Source Preview */}
            <div className="text-[11px] text-black/40 italic line-clamp-1 px-1">
              "{selection.text}"
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => handleTranslate(l.code)}
                  className={`px-2 py-1 rounded-full text-[10px] font-medium transition-all whitespace-nowrap ${
                    targetLang === l.code 
                      ? 'bg-[#1B3FBF] text-white' 
                      : 'bg-black/5 text-black/60 hover:bg-black/10'
                  }`}
                >
                  {l.nativeLabel}
                </button>
              ))}
            </div>

            {/* Result Area */}
            <div className="min-h-[60px] bg-black/[0.02] rounded-xl p-3 relative group">
              {isTranslating ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-[#1B3FBF] animate-spin" />
                </div>
              ) : translatedText ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm leading-relaxed text-black/80 pr-6"
                >
                  {translatedText}
                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center">
                   <button 
                    onClick={() => handleTranslate()}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#1B3FBF] hover:opacity-70 transition-opacity"
                   >
                     Initialize <ChevronRight className="w-3 h-3" />
                   </button>
                </div>
              )}

              {translatedText && !isTranslating && (
                <button 
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 p-1.5 bg-white shadow-sm border border-black/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 opacity-30" />}
                </button>
              )}
            </div>
          </div>

          {/* Footer Decoration */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#1B3FBF]/10 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NeuralTranslate;
