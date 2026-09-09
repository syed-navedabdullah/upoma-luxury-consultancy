import { useEffect, useRef } from "react";

const SPACING = 40;
const BASE_SIZE = 14;
const MAX_SIZE = 22;
const MIN_SIZE = 12;
const BASE_ALPHA = 0.16;
const MAX_ALPHA = 0.55;
const INTERACT_RADIUS = 150;
const INTERACT_RADIUS_SQ = INTERACT_RADIUS * INTERACT_RADIUS;
const SMOOTH = 0.12;
const AMBIENT_SIZE = 2.4;
const AMBIENT_ALPHA = 0.06;
const DOT_COLOR = "rgb(45, 212, 191)";
const FONT_FAMILY = '"Noto Sans Bengali", "Kalpurush", "Bangla MN", sans-serif';

// 60% brand letters ("উপমা"), 40% distinctive consonants.
const BRAND_CHARS = ["উ", "প", "ম", "া"];
const ACCENT_CHARS = ["ক", "খ", "গ", "ত", "ধ", "ন", "ব", "র", "শ", "স"];
const CHAR_POOL = [...BRAND_CHARS, ...BRAND_CHARS, ...BRAND_CHARS, ...ACCENT_CHARS, ...ACCENT_CHARS];

const ATLAS_MIN_SIZE = 12;
const ATLAS_MAX_SIZE = 22;

export function BanglaGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;

    let width = 0;
    let height = 0;
    let cols: number[] = [];
    let rows: number[] = [];
    let curS = new Float32Array(0);
    let curA = new Float32Array(0);
    let charIndex = new Uint8Array(0);
    const mouse = { x: -9999, y: -9999 };

    let frame = 0;
    let running = false;
    let onScreen = true;
    let dpr = window.devicePixelRatio || 1;

    // Atlas: one detached canvas per character, containing every integer
    // font size stamped side by side. drawImage() is far cheaper per-frame
    // than repeated fillText() calls at varying sizes.
    type Atlas = { canvas: HTMLCanvasElement; cellW: number; cellH: number };
    let atlases: Atlas[] = [];

    function buildAtlases() {
      const sizeSteps = ATLAS_MAX_SIZE - ATLAS_MIN_SIZE + 1;
      atlases = CHAR_POOL.map((ch) => {
        const measureCanvas = document.createElement("canvas");
        const mctx = measureCanvas.getContext("2d")!;
        mctx.font = `${ATLAS_MAX_SIZE}px ${FONT_FAMILY}`;
        const metrics = mctx.measureText(ch);
        const cellW = Math.ceil(metrics.width + 6);
        const cellH = Math.ceil(ATLAS_MAX_SIZE * 1.4);

        const atlasCanvas = document.createElement("canvas");
        atlasCanvas.width = cellW * sizeSteps * dpr;
        atlasCanvas.height = cellH * dpr;
        const actx = atlasCanvas.getContext("2d")!;
        actx.setTransform(dpr, 0, 0, dpr, 0, 0);
        actx.fillStyle = DOT_COLOR;
        actx.textAlign = "center";
        actx.textBaseline = "middle";

        for (let s = 0; s < sizeSteps; s++) {
          const size = ATLAS_MIN_SIZE + s;
          actx.font = `${size}px ${FONT_FAMILY}`;
          actx.fillText(ch, s * cellW + cellW / 2, cellH / 2);
        }

        return { canvas: atlasCanvas, cellW, cellH };
      });
    }

    function build() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      dpr = window.devicePixelRatio || 1;
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

      const count = cols.length * rows.length;
      curS = new Float32Array(count).fill(BASE_SIZE);
      curA = new Float32Array(count).fill(BASE_ALPHA);
      charIndex = new Uint8Array(count);
      for (let i = 0; i < count; i++) {
        charIndex[i] = Math.floor(Math.random() * CHAR_POOL.length);
      }

      buildAtlases();

      if (reduceMotion) drawStatic();
    }

    function drawGlyph(atlas: Atlas, size: number, x: number, y: number, alpha: number) {
      const sizeSteps = ATLAS_MAX_SIZE - ATLAS_MIN_SIZE + 1;
      const clamped = Math.max(ATLAS_MIN_SIZE, Math.min(ATLAS_MAX_SIZE, Math.round(size)));
      const step = clamped - ATLAS_MIN_SIZE;
      if (step < 0 || step >= sizeSteps) return;
      ctx!.globalAlpha = alpha;
      ctx!.drawImage(
        atlas.canvas,
        step * atlas.cellW * dpr,
        0,
        atlas.cellW * dpr,
        atlas.cellH * dpr,
        x - atlas.cellW / 2,
        y - atlas.cellH / 2,
        atlas.cellW,
        atlas.cellH
      );
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, width, height);
      let idx = 0;
      for (let i = 0; i < cols.length; i++) {
        for (let j = 0; j < rows.length; j++) {
          const atlas = atlases[charIndex[idx]];
          if (atlas) drawGlyph(atlas, BASE_SIZE, cols[i], rows[j], BASE_ALPHA);
          idx++;
        }
      }
      ctx!.globalAlpha = 1;
    }

    function tick(t: number) {
      ctx!.clearRect(0, 0, width, height);
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
          let targetS = BASE_SIZE + AMBIENT_SIZE * wave;
          let targetA = BASE_ALPHA + AMBIENT_ALPHA * (wave * 0.5 + 0.5);

          // Cursor boost.
          const dy = y - my;
          const distSq = dxSq + dy * dy;
          if (distSq < INTERACT_RADIUS_SQ) {
            const e = 1 - Math.sqrt(distSq) / INTERACT_RADIUS;
            const ease = e * e;
            targetS += (MAX_SIZE - BASE_SIZE) * ease;
            targetA += (MAX_ALPHA - BASE_ALPHA) * ease;
          }
          targetS = Math.max(MIN_SIZE, targetS);

          // Spring toward target.
          const idx = base + j;
          const s = curS[idx] + (targetS - curS[idx]) * SMOOTH;
          const a = curA[idx] + (targetA - curA[idx]) * SMOOTH;
          curS[idx] = s;
          curA[idx] = a;

          const atlas = atlases[charIndex[idx]];
          if (atlas) drawGlyph(atlas, s, x, y, a);
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

    const fontSpec = `${ATLAS_MAX_SIZE}px "Noto Sans Bengali"`;
    document.fonts
      .load(fontSpec)
      .catch(() => {})
      .finally(() => {
        if (cancelled) return;
        build();

        const io = new IntersectionObserver(
          ([entry]) => {
            onScreen = entry.isIntersecting;
            if (onScreen) start();
            else stop();
          },
          { threshold: 0 }
        );
        if (canvas!.parentElement) io.observe(canvas!.parentElement);

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("resize", build);
        document.addEventListener("mouseleave", onLeave);
        document.addEventListener("visibilitychange", onVisibility);
        start();

        cleanup = () => {
          stop();
          io.disconnect();
          window.removeEventListener("mousemove", onMove);
          window.removeEventListener("resize", build);
          document.removeEventListener("mouseleave", onLeave);
          document.removeEventListener("visibilitychange", onVisibility);
        };
      });

    let cleanup = () => {};

    return () => {
      cancelled = true;
      cleanup();
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
