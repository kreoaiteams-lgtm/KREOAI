import { useEffect, useRef, useCallback } from "react";

interface CloudBackgroundProps {
  speed?: number;
}

interface Cloud {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number;
  blobs: { dx: number; dy: number; r: number }[];
}

const CloudBackground = ({ speed = 1 }: CloudBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cloudsRef = useRef<Cloud[]>([]);
  const speedRef = useRef(speed);
  const animRef = useRef<number>(0);

  speedRef.current = speed;

  const createCloud = useCallback((w: number, h: number, startX?: number): Cloud => {
    const radius = 60 + Math.random() * 120;
    const blobCount = 4 + Math.floor(Math.random() * 4);
    const blobs = Array.from({ length: blobCount }, () => ({
      dx: (Math.random() - 0.5) * radius * 1.8,
      dy: (Math.random() - 0.5) * radius * 0.6,
      r: radius * (0.4 + Math.random() * 0.5),
    }));

    // Position clouds in biased zones: right and left sides half
    const side = Math.random() > 0.5 ? "left" : "right";
    let x: number, y: number;

    if (startX !== undefined) {
      x = startX;
      y = Math.random() * h;
    } else {
      if (side === "left") {
        // Left side half: x from -w*0.1 to w*0.4
        x = (Math.random() * 0.5 - 0.1) * w;
        y = Math.random() * h;
      } else {
        // Right side half: x from w*0.6 to w*1.1
        x = (Math.random() * 0.5 + 0.6) * w;
        y = Math.random() * h;
      }
    }

    return {
      x,
      y,
      radius: 150 + Math.random() * 350, // significantly larger clouds for full atmospheric immersion
      opacity: 0.03 + Math.random() * 0.07, // slightly lower opacity since they are larger
      speed: 0.05 + Math.random() * 0.12, // slightly slower for better parallax feel at large scale
      blobs,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    if (cloudsRef.current.length === 0) {
      cloudsRef.current = Array.from({ length: 28 }, () =>
        createCloud(canvas.width, canvas.height)
      );
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const mx = (mouseRef.current.x / w - 0.5) * 2;
      const my = (mouseRef.current.y / h - 0.5) * 2;
      const s = speedRef.current;

      cloudsRef.current.forEach((cloud) => {
        const parallaxX = mx * cloud.radius * 0.08;
        const parallaxY = my * cloud.radius * 0.04;

        ctx.save();
        ctx.globalAlpha = cloud.opacity;
        ctx.fillStyle = "#ffffff";

        cloud.blobs.forEach((blob) => {
          ctx.beginPath();
          ctx.arc(
            cloud.x + blob.dx + parallaxX,
            cloud.y + blob.dy + parallaxY,
            blob.r,
            0,
            Math.PI * 2
          );
          ctx.fill();
        });

        ctx.restore();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [createCloud]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default CloudBackground;
