import { useState } from 'react';

export const useStyleMimic = () => {
  const [mimicUrl, setMimicUrl] = useState<string | null>(null);

  const getStyleMimicPromptRule = () => {
    if (!mimicUrl) return "";
    return `Extract and mimic the exact visual aesthetic, color palette, typography, spacing, and component style of this website: ${mimicUrl}. Apply it to the generated artifact.`;
  };

  const clearStyleMimic = () => setMimicUrl(null);

  return { mimicUrl, setMimicUrl, getStyleMimicPromptRule, clearStyleMimic };
};
