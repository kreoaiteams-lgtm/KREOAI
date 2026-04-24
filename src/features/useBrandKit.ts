import { useState, useEffect } from 'react';

export interface BrandKit {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  borderRadius: string;
  logoUrl: string;
}

export const useBrandKit = () => {
  const [brandKit, setBrandKit] = useState<BrandKit | null>(() => {
    const saved = localStorage.getItem('kreo_brand_kit');
    return saved ? JSON.parse(saved) : null;
  });

  const saveBrandKit = (kit: BrandKit) => {
    setBrandKit(kit);
    localStorage.setItem('kreo_brand_kit', JSON.stringify(kit));
  };

  const getBrandKitPromptRule = () => {
    if (!brandKit) return "";
    return `Apply this exact design system to everything you generate: ${JSON.stringify(brandKit)}. Use these CSS variables and font styles consistently.`;
  };

  return { brandKit, saveBrandKit, getBrandKitPromptRule };
};
