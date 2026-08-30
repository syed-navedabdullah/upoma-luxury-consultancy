import { useEffect, useRef } from "react";

const SPACING = 32;
const BASE_RADIUS = 2;
const MAX_RADIUS = 5;
const BASE_ALPHA = 0.16;
const MAX_ALPHA = 0.55;
const INTERACT_RADIUS = 150;
const INTERACT_RADIUS_SQ = INTERACT_RADIUS * INTERACT_RADIUS;
const SMOOTH = 0.12;
const AMBIENT_RADIUS = 0.6;
const AMBIENT_ALPHA = 0.06;
const DOT_COLOR = "rgb(60, 6, 122)";

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let cols: number[] = [];
    let rows: number[] = [];
    let curR = new Float32Array(0);
    let curA = new Float32Array(0);
    const mouse = { x: -9999, y: -9999 };

    let frame = 0;
    let running = false;
    let onScreen = true;

    function build() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = [];
      rows = [];
      for (let x = SPACING / 2; x < width; x += SPACING) cols.push(x);
      for (let y = SPACING / 2; y < height; y += SPACING) rows.push(y);

      curR = new Float32Array(cols.length * rows.length).fill(BASE_RADIUS);
      curA = new Float32Array(cols.length * rows.length).fill(BASE_ALPHA);

      if (reduceMotion) drawStatic();
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, width, height);
      ctx!.fillStyle = DOT_COLOR;
      ctx!.globalAlpha = BASE_ALPHA;
      for (let i = 0; i < cols.length; i++) {
        for (let j = 0; j < rows.length; j++) {
          ctx!.beginPath();
          ctx!.arc(cols[i], rows[j], BASE_RADIUS, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
      ctx!.globalAlpha = 1;
    }

    function tick(t: number) {
      ctx!.clearRect(0, 0, width, height);
      ctx!.fillStyle = DOT_COLOR;
      const mx = mouse.x;
      const my = mouse.y;

      for (let i = 0; i < cols.length; i++) {
        const x = cols[i];
        const dx = x - mx;
        const dxSq = dx * dx;
        const base = i * rows.length;

        for (let j = 0; j < rows.length; j++) {
          const y = rows[j];

          // Ambient breathing wave (diagonal).
          const wave = Math.sin(x * 0.02 + y * 0.02 + t * 0.0012);
          let targetR = BASE_RADIUS + AMBIENT_RADIUS * wave;
          let targetA = BASE_ALPHA + AMBIENT_ALPHA * (wave * 0.5 + 0.5);

          // Cursor boost.
          const dy = y - my;
          const distSq = dxSq + dy * dy;
          if (distSq < INTERACT_RADIUS_SQ) {
            const e = 1 - Math.sqrt(distSq) / INTERACT_RADIUS;
            const ease = e * e;
            targetR += (MAX_RADIUS - BASE_RADIUS) * ease;
            targetA += (MAX_ALPHA - BASE_ALPHA) * ease;
          }

          // Spring toward target.
          const idx = base + j;
          const r = curR[idx] + (targetR - curR[idx]) * SMOOTH;
          const a = curA[idx] + (targetA - curA[idx]) * SMOOTH;
          curR[idx] = r;
          curA[idx] = a;

          ctx!.globalAlpha = a;
          ctx!.beginPath();
          ctx!.arc(x, y, r, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
      ctx!.globalAlpha = 1;
      frame = requestAnimationFrame(tick);
    }

    function start() {
      if (running || reduceMotion || !onScreen || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(tick);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    build();

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) start();
        else stop();
      },
      { threshold: 0 }
    );
    if (canvas.parentElement) io.observe(canvas.parentElement);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", build);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", build);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    />
  );
}
