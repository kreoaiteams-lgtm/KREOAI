import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translateText } from '@/lib/ai';
import { LANGUAGES, LangCode } from '@/lib/i18n';
import { useLang } from '@/context/LanguageContext';
import { Loader2, Languages, X, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

const LANG_FLAGS: Record<string, string> = {
  en: '🇺🇸',
  hi: '🇮🇳',
  es: '🇪🇸',
  fr: '🇫🇷',
  ja: '🇯🇵',
  ar: '🇸🇦',
};

const NeuralTranslate = () => {
  const { lang: currentAppLang } = useLang();
  const [selection, setSelection] = useState<{ text: string; x: number; y: number } | null>(null);
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [targetLang, setTargetLanguage] = useState<LangCode>(() => {
    return (localStorage.getItem('kreo_last_translate_lang') as LangCode) || 'hi';
  });
  const [copied, setCopied] = useState(false);
  const [hasTranslated, setHasTranslated] = useState(false);
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
      if (popupRef.current?.contains(document.activeElement)) return;
      setSelection({ text, x: rect.left + rect.width / 2, y: rect.top + window.scrollY - 16 });
      setTranslatedText('');
      setHasTranslated(false);
      setCopied(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        const sel = window.getSelection();
        if (!sel || sel.toString().trim().length === 0) setSelection(null);
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
    if (langOverride) {
      setTargetLanguage(langOverride);
      localStorage.setItem('kreo_last_translate_lang', langOverride);
    }
    setIsTranslating(true);
    setTranslatedText('');
    setHasTranslated(false);
    try {
      const result = await translateText(selection.text, lang);
      setTranslatedText(result);
      setHasTranslated(true);
    } catch (err) {
      toast.error('Translation failed');
    } finally {
      setIsTranslating(false);
    }
  };

  const copyToClipboard = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {selection && (
        <motion.div
          ref={popupRef}
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          style={{
            position: 'fixed',
            left: selection.x,
            top: selection.y,
            zIndex: 99999,
            transform: 'translateX(-50%) translateY(-100%)',
          }}
          className="pointer-events-auto"
        >
          {/* Main Card */}
          <div
            style={{
              background: 'rgba(10, 10, 14, 0.92)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 0 0 0.5px rgba(255,255,255,0.1), 0 32px 80px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.3)',
              width: 400,
              borderRadius: 24,
              overflow: 'hidden',
            }}
          >
            {/* Top gradient accent */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.2)' }}>
                  <Languages className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">Translate</span>
              </div>
              <button
                onClick={() => setSelection(null)}
                className="w-6 h-6 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
              >
                <X className="w-3 h-3 text-white/30" />
              </button>
            </div>

            {/* Source text preview */}
            <div className="px-5 pb-3">
              <p className="text-[13px] text-white/30 italic truncate">
                &ldquo;{selection.text}&rdquo;
              </p>
            </div>

            {/* Divider */}
            <div className="h-px mx-5 bg-white/5" />

            {/* Language pills */}
            <div className="px-4 py-3 flex items-center gap-1.5 flex-wrap">
              {LANGUAGES.map((l) => {
                const isActive = targetLang === l.code;
                return (
                  <button
                    key={l.code}
                    onClick={() => handleTranslate(l.code as LangCode)}
                    style={{
                      background: isActive ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.06)',
                      border: `1px solid ${isActive ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.08)'}`,
                      color: isActive ? 'rgb(165,180,252)' : 'rgba(255,255,255,0.5)',
                      transition: 'all 0.15s ease',
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold"
                  >
                    <span>{LANG_FLAGS[l.code] || ''}</span>
                    <span>{l.nativeLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="h-px mx-5 bg-white/5" />

            {/* Translation result area */}
            <div className="px-5 py-4 min-h-[80px] flex items-center relative">
              {isTranslating ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                  <span className="text-[12px] text-white/30 font-medium">Translating…</span>
                </div>
              ) : hasTranslated ? (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full"
                >
                  <p
                    className="text-[32px] font-bold text-white leading-tight tracking-tight pr-8"
                    dir="auto"
                  >
                    {translatedText}
                  </p>
                </motion.div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTranslate()}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold text-indigo-300 uppercase tracking-widest transition-all hover:bg-indigo-500/10"
                    style={{ border: '1px solid rgba(99,102,241,0.3)' }}
                  >
                    ⚡ Translate
                  </button>
                </div>
              )}

              {/* Copy button */}
              {hasTranslated && !isTranslating && (
                <button
                  onClick={copyToClipboard}
                  className="absolute top-4 right-4 w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-white/10"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {copied
                    ? <Check className="w-3.5 h-3.5 text-emerald-400" />
                    : <Copy className="w-3.5 h-3.5 text-white/30" />
                  }
                </button>
              )}
            </div>

            {/* Bottom gradient accent */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </div>

          {/* Caret pointing down */}
          <div className="flex justify-center mt-1.5">
            <div
              className="w-2.5 h-2.5 rotate-45"
              style={{
                background: 'rgba(10,10,14,0.92)',
                boxShadow: '1px 1px 0 0 rgba(255,255,255,0.08)',
                borderRadius: 2,
                marginTop: -6,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NeuralTranslate;
