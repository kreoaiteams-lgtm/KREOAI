import { useEffect, useRef, useState } from "react";

/**
 * MouseFlare — Premium cursor enhancement.
 * Renders two layers:
 *  1. A small precise dot (instant)
 *  2. A soft bloom radial that trails behind with spring-like lag
 */
export const MouseFlare = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const bloom = useRef({ x: -200, y: -200 });
  const rafId = useRef<number>(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Dot — instant
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }

      // Update CSS variables for reveal masks
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    // Bloom — smooth lagged follow
    const animate = () => {
      const dx = pos.current.x - bloom.current.x;
      const dy = pos.current.y - bloom.current.y;
      bloom.current.x += dx * 0.085; // slightly faster follow
      bloom.current.y += dy * 0.085;

      if (bloomRef.current) {
        bloomRef.current.style.transform = `translate(${bloom.current.x - 200}px, ${bloom.current.y - 200}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId.current);
    };
  }, [visible]);

  return (
    <>
      {/* Bloom glow — lagged radial */}
      <div
        ref={bloomRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 400,
          height: 400,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease",
          background:
            "radial-gradient(circle, rgba(201,193,240,0.18) 0%, rgba(242,196,160,0.08) 45%, transparent 70%)",
          willChange: "transform",
        }}
      />

      {/* Crisp dot with reveal highlight */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.4s ease",
          background: "rgba(44, 36, 21, 0.8)",
          backdropFilter: "blur(4px)",
          boxShadow: "0 0 0 2px rgba(255,255,255,0.6), 0 0 20px rgba(201,193,240,0.4)",
          willChange: "transform",
        }}
      />
    </>
  );
};
