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
const GLOW_COLOR = "rgb(0, 95, 106)";
const FONT_FAMILY = '"Noto Sans Bengali", "Kalpurush", "Bangla MN", sans-serif';

// Organic drift — letters float free of the rigid grid via slow value noise.
const NOISE_SCALE = 0.5;
const NOISE_TIME_SCALE = 0.00012;
const NOISE_AMPLITUDE = 5;
const POS_SMOOTH = 0.06;

// Cursor ripple waves — signals propagating through the network.
const RIPPLE_SPEED = 150; // px/sec
const RIPPLE_WIDTH = 30; // wavefront thickness, px
const RIPPLE_LIFE = 2000; // ms
const RIPPLE_SPAWN_INTERVAL = 80; // ms between move-spawned ripples
const RIPPLE_BOOST = 0.3;
const MAX_RIPPLES = 12;

const CLICK_RIPPLE_SPEED = 250;
const CLICK_RIPPLE_WIDTH = 50;
const CLICK_RIPPLE_LIFE = 2500;
const CLICK_RIPPLE_BOOST = 0.6;

// Neural connection lines between bright, active letters.
const CONNECTION_ALPHA_THRESHOLD = 0.3;
const CONNECTION_LINE_ALPHA_SCALE = 0.45;
const CONNECTION_LINE_WIDTH = 0.5;
const LINE_BUCKETS = 5;

// 60% brand letters ("উপমা"), 40% distinctive consonants.
const BRAND_CHARS = ["উ", "প", "ম", "া"];
const ACCENT_CHARS = ["ক", "খ", "গ", "ত", "ধ", "ন", "ব", "র", "শ", "স"];
const CHAR_POOL = [...BRAND_CHARS, ...BRAND_CHARS, ...BRAND_CHARS, ...ACCENT_CHARS, ...ACCENT_CHARS];

const ATLAS_MIN_SIZE = 12;
const ATLAS_MAX_SIZE = 22;

// Deterministic integer hash -> smooth 2D value noise in [0, 1]. No library.
function hash(x: number, y: number): number {
  let h = x * 374761393 + y * 668265263;
  h = (h ^ (h >> 13)) * 1274126177;
  return ((h ^ (h >> 16)) & 0x7fffffff) / 0x7fffffff;
}

function noise2d(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const n00 = hash(ix, iy);
  const n10 = hash(ix + 1, iy);
  const n01 = hash(ix, iy + 1);
  const n11 = hash(ix + 1, iy + 1);
  return n00 + (n10 - n00) * sx + (n01 - n00) * sy + (n00 - n10 - n01 + n11) * sx * sy;
}

type Ripple = { x: number; y: number; birth: number; strong: boolean };

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
    let curX = new Float32Array(0);
    let curY = new Float32Array(0);
    let charIndex = new Uint8Array(0);
    const mouse = { x: -9999, y: -9999 };

    const ripples: Ripple[] = [];
    let lastRippleTime = 0;

    let frame = 0;
    let running = false;
    let onScreen = true;
    let dpr = window.devicePixelRatio || 1;

    // Atlas: one detached canvas per character, containing every integer
    // font size stamped side by side. drawImage() is far cheaper per-frame
    // than repeated fillText() calls at varying sizes. A second "glow" atlas
    // set is used to overlay a deeper teal near the cursor.
    type Atlas = { canvas: HTMLCanvasElement; cellW: number; cellH: number };
    let atlases: Atlas[] = [];
    let glowAtlases: Atlas[] = [];

    function buildAtlasSet(color: string): Atlas[] {
      const sizeSteps = ATLAS_MAX_SIZE - ATLAS_MIN_SIZE + 1;
      return CHAR_POOL.map((ch) => {
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
        actx.fillStyle = color;
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
      curX = new Float32Array(count);
      curY = new Float32Array(count);
      charIndex = new Uint8Array(count);
      for (let i = 0; i < cols.length; i++) {
        for (let j = 0; j < rows.length; j++) {
          const idx = i * rows.length + j;
          curX[idx] = cols[i];
          curY[idx] = rows[j];
          charIndex[idx] = Math.floor(Math.random() * CHAR_POOL.length);
        }
      }

      atlases = buildAtlasSet(DOT_COLOR);
      glowAtlases = buildAtlasSet(GLOW_COLOR);

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

      // Prune dead ripples.
      for (let r = ripples.length - 1; r >= 0; r--) {
        const life = ripples[r].strong ? CLICK_RIPPLE_LIFE : RIPPLE_LIFE;
        if (t - ripples[r].birth > life) ripples.splice(r, 1);
      }

      // Bucketed connection-line segments, grouped by alpha for batched strokes.
      const buckets: number[][] = Array.from({ length: LINE_BUCKETS }, () => []);

      for (let i = 0; i < cols.length; i++) {
        const gx = cols[i];
        const base = i * rows.length;

        for (let j = 0; j < rows.length; j++) {
          const gy = rows[j];
          const idx = base + j;

          // Organic drift target via slow-evolving value noise.
          const nx = (noise2d(i * NOISE_SCALE + t * NOISE_TIME_SCALE, j * NOISE_SCALE) - 0.5) * 2;
          const ny = (noise2d(i * NOISE_SCALE, j * NOISE_SCALE + t * NOISE_TIME_SCALE + 100) - 0.5) * 2;
          const targetX = gx + nx * NOISE_AMPLITUDE;
          const targetY = gy + ny * NOISE_AMPLITUDE;
          curX[idx] += (targetX - curX[idx]) * POS_SMOOTH;
          curY[idx] += (targetY - curY[idx]) * POS_SMOOTH;

          const x = curX[idx];
          const y = curY[idx];

          // Ambient breathing wave (diagonal).
          const wave = Math.sin(gx * 0.02 + gy * 0.02 + t * 0.0012);
          let targetS = BASE_SIZE + AMBIENT_SIZE * wave;
          let targetA = BASE_ALPHA + AMBIENT_ALPHA * (wave * 0.5 + 0.5);

          // Cursor boost.
          const dx = x - mx;
          const dy = y - my;
          const distSq = dx * dx + dy * dy;
          let cursorEase = 0;
          if (distSq < INTERACT_RADIUS_SQ) {
            const e = 1 - Math.sqrt(distSq) / INTERACT_RADIUS;
            cursorEase = e * e;
            targetS += (MAX_SIZE - BASE_SIZE) * cursorEase;
            targetA += (MAX_ALPHA - BASE_ALPHA) * cursorEase;
          }

          // Ripple wave boost — expanding signal rings.
          let rippleBoost = 0;
          for (const rp of ripples) {
            const age = t - rp.birth;
            const life = rp.strong ? CLICK_RIPPLE_LIFE : RIPPLE_LIFE;
            const speed = rp.strong ? CLICK_RIPPLE_SPEED : RIPPLE_SPEED;
            const rippleWidth = rp.strong ? CLICK_RIPPLE_WIDTH : RIPPLE_WIDTH;
            if (age < 0 || age > life) continue;

            const radius = (age / 1000) * speed;
            const dist = Math.sqrt((x - rp.x) ** 2 + (y - rp.y) ** 2);
            const waveDist = Math.abs(dist - radius);
            if (waveDist < rippleWidth) {
              const waveStrength = 1 - waveDist / rippleWidth;
              const decay = 1 - age / life;
              rippleBoost += waveStrength * decay * (rp.strong ? CLICK_RIPPLE_BOOST : RIPPLE_BOOST);
            }
          }
          if (rippleBoost > 0) {
            const b = Math.min(rippleBoost, 1);
            targetS += (MAX_SIZE - BASE_SIZE) * b;
            targetA += (MAX_ALPHA - BASE_ALPHA) * b;
          }
          targetS = Math.max(MIN_SIZE, targetS);

          // Spring toward target.
          const s = curS[idx] + (targetS - curS[idx]) * SMOOTH;
          const a = curA[idx] + (targetA - curA[idx]) * SMOOTH;
          curS[idx] = s;
          curA[idx] = a;

          const atlas = atlases[charIndex[idx]];
          if (atlas) drawGlyph(atlas, s, x, y, a);

          // Deep-teal glow overlay near the cursor.
          if (cursorEase > 0.01) {
            const glowAtlas = glowAtlases[charIndex[idx]];
            if (glowAtlas) drawGlyph(glowAtlas, s, x, y, cursorEase * 0.7 * a);
          }

          // Queue connection lines to bright neighbors (4 half-directions
          // avoids drawing each edge twice).
          if (a > CONNECTION_ALPHA_THRESHOLD) {
            const neighbors: Array<[number, number]> = [
              [i + 1, j],
              [i, j + 1],
              [i + 1, j + 1],
              [i + 1, j - 1],
            ];
            for (const [ni, nj] of neighbors) {
              if (ni < 0 || ni >= cols.length || nj < 0 || nj >= rows.length) continue;
              const nIdx = ni * rows.length + nj;
              const nA = curA[nIdx];
              if (nA <= CONNECTION_ALPHA_THRESHOLD) continue;
              const bucket = Math.min(
                LINE_BUCKETS - 1,
                Math.floor((Math.min(a, nA) / MAX_ALPHA) * LINE_BUCKETS)
              );
              buckets[bucket].push(x, y, curX[nIdx], curY[nIdx]);
            }
          }
        }
      }
      ctx!.globalAlpha = 1;

      // Draw connection lines in batched strokes, one per alpha bucket.
      ctx!.lineWidth = CONNECTION_LINE_WIDTH;
      for (let b = 0; b < LINE_BUCKETS; b++) {
        const segs = buckets[b];
        if (segs.length === 0) continue;
        const alpha = ((b + 1) / LINE_BUCKETS) * CONNECTION_LINE_ALPHA_SCALE;
        ctx!.strokeStyle = `rgba(45, 212, 191, ${alpha})`;
        ctx!.beginPath();
        for (let s = 0; s < segs.length; s += 4) {
          ctx!.moveTo(segs[s], segs[s + 1]);
          ctx!.lineTo(segs[s + 2], segs[s + 3]);
        }
        ctx!.stroke();
      }

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

      const now = performance.now();
      if (now - lastRippleTime > RIPPLE_SPAWN_INTERVAL) {
        ripples.push({ x: mouse.x, y: mouse.y, birth: now, strong: false });
        if (ripples.length > MAX_RIPPLES) ripples.shift();
        lastRippleTime = now;
      }
    }

    function onClick(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        birth: performance.now(),
        strong: true,
      });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
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
        canvas!.parentElement?.addEventListener("click", onClick);
        start();

        cleanup = () => {
          stop();
          io.disconnect();
          window.removeEventListener("mousemove", onMove);
          window.removeEventListener("resize", build);
          document.removeEventListener("mouseleave", onLeave);
          document.removeEventListener("visibilitychange", onVisibility);
          canvas!.parentElement?.removeEventListener("click", onClick);
          ripples.length = 0;
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
