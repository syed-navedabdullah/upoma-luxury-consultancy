import { useEffect, useRef } from "react";

const SPACING = 32;
const BASE_RADIUS = 1.5;
const MAX_RADIUS = 3.5;
const BASE_ALPHA = 0.06;
const MAX_ALPHA = 0.28;
const INTERACT_RADIUS = 120;
const DOT_COLOR = "60, 6, 122";

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const raf = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (let x = SPACING / 2; x < w; x += SPACING) {
        for (let y = SPACING / 2; y < h; y += SPACING) {
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const t = Math.max(0, 1 - dist / INTERACT_RADIUS);
          const ease = t * t;

          const r = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * ease;
          const a = BASE_ALPHA + (MAX_ALPHA - BASE_ALPHA) * ease;

          ctx!.beginPath();
          ctx!.arc(x, y, r, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${DOT_COLOR}, ${a})`;
          ctx!.fill();
        }
      }

      raf.current = requestAnimationFrame(draw);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    }

    function onMouseLeave() {
      mouse.current.x = -1000;
      mouse.current.y = -1000;
    }

    resize();
    draw();

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf.current);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-auto absolute inset-0 z-0"
    />
  );
}
