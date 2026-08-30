import { useEffect, useRef } from "react";

const SPACING = 32;
const BASE_RADIUS = 2;
const MAX_RADIUS = 5;
const BASE_ALPHA = 0.16;
const MAX_ALPHA = 0.55;
const INTERACT_RADIUS = 150;
const INTERACT_RADIUS_SQ = INTERACT_RADIUS * INTERACT_RADIUS;
const DOT_COLOR = "rgb(60, 6, 122)";

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const cols: number[] = [];
    const rows: number[] = [];
    const mouse = { x: -9999, y: -9999 };
    let frame = 0;

    function render() {
      frame = 0;
      ctx!.clearRect(0, 0, width, height);
      ctx!.fillStyle = DOT_COLOR;
      const mx = mouse.x;
      const my = mouse.y;

      for (let i = 0; i < cols.length; i++) {
        const x = cols[i];
        const dxSq = (x - mx) * (x - mx);
        for (let j = 0; j < rows.length; j++) {
          const y = rows[j];
          const dy = y - my;
          const distSq = dxSq + dy * dy;

          let r = BASE_RADIUS;
          let a = BASE_ALPHA;
          if (distSq < INTERACT_RADIUS_SQ) {
            const ease = 1 - Math.sqrt(distSq) / INTERACT_RADIUS;
            const e = ease * ease;
            r = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * e;
            a = BASE_ALPHA + (MAX_ALPHA - BASE_ALPHA) * e;
          }

          ctx!.globalAlpha = a;
          ctx!.beginPath();
          ctx!.arc(x, y, r, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
      ctx!.globalAlpha = 1;
    }

    function scheduleRender() {
      if (!frame) frame = requestAnimationFrame(render);
    }

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

      cols.length = 0;
      rows.length = 0;
      for (let x = SPACING / 2; x < width; x += SPACING) cols.push(x);
      for (let y = SPACING / 2; y < height; y += SPACING) rows.push(y);
      render();
    }

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      scheduleRender();
    }

    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
      scheduleRender();
    }

    build();
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", build);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", build);
      document.removeEventListener("mouseleave", onLeave);
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
