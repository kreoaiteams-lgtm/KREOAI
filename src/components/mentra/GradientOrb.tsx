import { CSSProperties } from "react";

type Hue = "peach" | "lavender" | "rose" | "sage" | "sky" | "peach-lavender" | "rose-sky" | "sage-peach";

const gradients: Record<Hue, string> = {
  peach: "radial-gradient(circle, #F2C4A0 0%, #F0A882 70%)",
  lavender: "radial-gradient(circle, #C9C1F0 0%, #AFA9EC 70%)",
  rose: "radial-gradient(circle, #F0C4C8 0%, #E8A4B0 70%)",
  sage: "radial-gradient(circle, #B8D4C0 0%, #9EC4A8 70%)",
  sky: "radial-gradient(circle, #C4D8F0 0%, #A8C8EC 70%)",
  "peach-lavender": "radial-gradient(circle, #F2C4A0 0%, #C9C1F0 75%)",
  "rose-sky": "radial-gradient(circle, #F0C4C8 0%, #A8C8EC 75%)",
  "sage-peach": "radial-gradient(circle, #B8D4C0 0%, #F2C4A0 75%)",
};

interface GradientOrbProps {
  hue: Hue;
  size?: number;
  blur?: number;
  opacity?: number;
  className?: string;
  style?: CSSProperties;
  duration?: number;
  bloom?: boolean;
  parallax?: { x: number; y: number; factor?: number };
}

export const GradientOrb = ({
  hue,
  size = 420,
  blur = 90,
  opacity = 0.28,
  className = "",
  style,
  duration = 10,
  bloom = false,
  parallax,
}: GradientOrbProps) => {
  const px = parallax ? parallax.x * (parallax.factor ?? 0.4) : 0;
  const py = parallax ? parallax.y * (parallax.factor ?? 0.4) : 0;

  return (
    <div
      className={`orb ${bloom ? "orb-bloom" : ""} ${className}`}
      style={{
        width: size,
        height: size,
        background: gradients[hue],
        filter: `blur(${blur}px)`,
        opacity,
        ["--o-from" as string]: opacity,
        ["--o-to" as string]: Math.min(opacity + 0.06, 0.55),
        ["--px" as string]: `${px}px`,
        ["--py" as string]: `${py}px`,
        animation: `breathe ${duration}s ease-in-out infinite alternate`,
        ...style,
      }}
    />
  );
};
