"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function SnowLayer({ enabled }: { enabled: boolean }) {
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const config = useMemo(() => {
    return {
      count: isMobile ? 22 : 60,
      speed: isMobile ? [0.8,.9] : [0.8, 0.8],
      wind: isMobile ? [0, 0.25] : [0, 0.18],
      radius: isMobile ? [1.5, 3.5] : [1.6, 3.8],
    };
  }, [isMobile]);

  useEffect(() => {
    if (!enabled) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    type Flake = { x: number; y: number; r: number; vy: number; vx: number; phase: number };

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      w = Math.floor(window.innerWidth);
      h = Math.floor(window.innerHeight);

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const flakes: Flake[] = Array.from({ length: config.count }, () => {
      const r = rand(config.radius[0], config.radius[1]);
      return {
        x: rand(0, w),
        y: rand(0, h),
        r,
        vy: rand(config.speed[0], config.speed[1]),
        vx: rand(config.wind[0], config.wind[1]) * (Math.random() < 0.5 ? -1 : 1),
        phase: rand(0, Math.PI * 2),
      };
    });

    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(34, now - last) / 16.67;
      last = now;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255, 245, 250, 0.94)";
      ctx.strokeStyle = "rgba(255, 170, 205, 0.22)";
      ctx.lineWidth = 0.75;
      ctx.shadowColor = "rgba(255, 130, 190, 0.28)";
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      for (const f of flakes) {
        f.phase += 0.02 * dt;
        f.x += (f.vx + Math.sin(f.phase) * 0.2) * dt;
        f.y += f.vy * dt;

        if (f.y - f.r > h) {
          f.y = -f.r;
          f.x = rand(0, w);
          f.vy = rand(config.speed[0], config.speed[1]);
          f.vx = rand(config.wind[0], config.wind[1]) * (Math.random() < 0.5 ? -1 : 1);
          f.r = rand(config.radius[0], config.radius[1]);
        }

        if (f.x + f.r < 0) f.x = w + f.r;
        if (f.x - f.r > w) f.x = -f.r;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [enabled, config.count, config.radius, config.speed, config.wind]);

  if (!enabled) return null;

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 50 }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
