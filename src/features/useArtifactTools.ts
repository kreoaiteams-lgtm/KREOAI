import { RefObject } from 'react';

export const useArtifactTools = (iframeRef: RefObject<HTMLIFrameElement>) => {
  
  const rulesMap: Record<string, string> = {};

  const applyKnobChange = (variable: string, value: string) => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (!doc) return;

    let styleTag = doc.getElementById('kreo-dynamic-knobs') as HTMLStyleElement;
    if (!styleTag) {
      styleTag = doc.createElement('style');
      styleTag.id = 'kreo-dynamic-knobs';
      doc.head.appendChild(styleTag);
    }

    const templates: Record<string, string> = {
      'primary-color': `--primary: ${value} !important;`,
      'border-radius': `--radius: ${value} !important;`,
      'font-size': `body { font-size: ${value} !important; }`,
      'spacing': `:root { --spacing-scale: ${value} !important; }`
    };

    if (templates[variable]) {
      rulesMap[variable] = templates[variable];
      
      // Update entire style tag with current state of all knobs
      const css = `
        :root {
          ${rulesMap['primary-color'] || ''}
          ${rulesMap['border-radius'] || ''}
          ${rulesMap['spacing'] || ''}
        }
        ${rulesMap['font-size'] || ''}
      `;
      styleTag.innerHTML = css;
    }
  };

  const setupLiveEdit = (onElementClick: (html: string, element: HTMLElement) => void) => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (!doc) return;

    const scriptId = 'kreo-live-edit-runtime';
    if (doc.getElementById(scriptId)) return;

    const script = doc.createElement('script');
    script.id = scriptId;
    script.textContent = `
      (function() {
        let lastHovered = null;
        document.addEventListener('mouseover', (e) => {
          if (lastHovered) lastHovered.style.outline = '';
          e.target.style.outline = '2px dashed #1B3FBF';
          e.target.style.outlineOffset = '2px';
          lastHovered = e.target;
        });
        document.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.parent.postMessage({
            type: 'KREO_LIVE_EDIT_CLICK',
            outerHTML: e.target.outerHTML,
            selector: getSelector(e.target)
          }, '*');
        });

        function getSelector(el) {
          if (el.id) return '#' + el.id;
          let path = [];
          while (el.nodeType === Node.ELEMENT_NODE) {
            let selector = el.nodeName.toLowerCase();
            let sibling = el, nth = 1;
            while (sibling = sibling.previousElementSibling) if (sibling.nodeName === el.nodeName) nth++;
            selector += ":nth-of-type("+nth+")";
            path.unshift(selector);
            el = el.parentNode;
          }
          return path.join(" > ");
        }
      })();
    `;
    doc.body.appendChild(script);
  };

  return { applyKnobChange, setupLiveEdit };
};
