import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { BanglaGrid } from "./BanglaGrid";

const STORAGE_KEY = "upoma-booted";
const VISIBLE_MS = 3400;
const EXIT_MS = 900;

// Procedural cloud bank — fractal-noise turbulence shaped into soft white
// clouds. Scales up and fades (via animate-boot-cloud) to read as the camera
// pushing forward through it, WB-intro style.
function CloudLayer({
  seed,
  freq,
  delay,
  blur,
}: {
  seed: number;
  freq: string;
  delay: number;
  blur: number;
}) {
  const id = `boot-cloud-${seed}`;
  return (
    <div
      className="animate-boot-cloud absolute inset-0"
      style={{ animationDelay: `${delay}ms`, filter: `blur(${blur}px)` }}
    >
      <svg
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={freq}
            numOctaves="4"
            seed={seed}
            stitchTiles="stitch"
          />
          {/* RGB -> white, alpha = luminance of the noise (bright noise = cloud) */}
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.33 0.33 0.33 0 0"
          />
          {/* gamma darkens the mid-alphas so clouds read as separated puffs */}
          <feComponentTransfer>
            <feFuncA type="gamma" amplitude="1" exponent="2.4" offset="0" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter={`url(#${id})`} />
      </svg>
    </div>
  );
}

// Deterministic PRNG so the streak field is stable between renders.
function lcg(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const STREAKS = (() => {
  const rand = lcg(20260917);
  return Array.from({ length: 16 }, (_, i) => ({
    angle: (i * 360) / 16 + (rand() * 24 - 12),
    length: 150 + rand() * 260,
    delay: 650 + rand() * 1600,
    duration: 650 + rand() * 500,
  }));
})();

// Thin light streaks stretching outward from the vanishing point — the
// air-rush crescendo as the wordmark arrives.
function WarpStreaks() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      {STREAKS.map((s, i) => (
        <span
          key={i}
          className="animate-boot-warp absolute left-1/2 top-1/2 h-px origin-left bg-gradient-to-r from-white/90 via-white/35 to-transparent"
          style={
            {
              width: `${s.length}px`,
              "--angle": `${s.angle}deg`,
              animationDelay: `${s.delay}ms`,
              animationDuration: `${s.duration}ms`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

// A one-time cinematic intro: the camera flies through teal sky and cloud banks
// toward the উপমা wordmark as it emerges from the distance. Pointer movement
// drifts the layers at different depths, and light streaks race outward as the
// wordmark lands. Runs once per session; skipped for prefers-reduced-motion.
export function BootIntro() {
  const [show, setShow] = useState(false);
  const [exiting, setExiting] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || sessionStorage.getItem(STORAGE_KEY)) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      return;
    }

    setShow(true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const exitTimer = window.setTimeout(() => setExiting(true), VISIBLE_MS);
    const doneTimer = window.setTimeout(() => {
      setShow(false);
      document.body.style.overflow = prevOverflow;
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, VISIBLE_MS + EXIT_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Pointer parallax: the root carries --mx/--my (a lerped pointer offset in
  // px); each .boot-parallax layer scales it by its own factor for depth.
  useEffect(() => {
    if (!show) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };
    const tick = () => {
      eased.x += (target.x - eased.x) * 0.07;
      eased.y += (target.y - eased.y) * 0.07;
      rootRef.current?.style.setProperty("--mx", `${(eased.x * 18).toFixed(2)}px`);
      rootRef.current?.style.setProperty("--my", `${(eased.y * 12).toFixed(2)}px`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`fixed inset-0 z-[100] overflow-hidden bg-surface transition-transform duration-[900ms] ease-[cubic-bezier(0.7,0,0.2,1)] ${
        exiting ? "pointer-events-none -translate-y-full" : "translate-y-0"
      }`}
      style={{ "--mx": "0px", "--my": "0px" } as CSSProperties}
    >
      {/* White neural-Bangla grid backdrop against the teal */}
      <div
        className="boot-parallax absolute inset-0 opacity-45"
        style={{ "--pf": 0.3 } as CSSProperties}
      >
        <BanglaGrid rgb={[255, 255, 255]} />
      </div>

      {/* Soft light bloom at the vanishing point where the logo arrives */}
      <div
        className="boot-parallax absolute inset-0"
        style={
          {
            "--pf": 0.2,
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 45%)",
          } as CSSProperties
        }
      />

      {/* Cloud banks — layered for parallax depth; the oversized wrappers keep
          the blurred edges covered while their layer shifts with the pointer */}
      <div className="boot-parallax absolute -inset-10" style={{ "--pf": 0.55 } as CSSProperties}>
        <CloudLayer seed={3} freq="0.006 0.010" delay={0} blur={9} />
      </div>
      <div className="boot-parallax absolute -inset-10" style={{ "--pf": 0.9 } as CSSProperties}>
        <CloudLayer seed={7} freq="0.011 0.017" delay={500} blur={4} />
      </div>
      <div className="boot-parallax absolute -inset-10" style={{ "--pf": 1.4 } as CSSProperties}>
        <CloudLayer seed={11} freq="0.020 0.030" delay={1000} blur={1} />
      </div>

      {/* Warp streaks radiating from the vanishing point */}
      <div className="boot-parallax absolute inset-0" style={{ "--pf": 0.7 } as CSSProperties}>
        <WarpStreaks />
      </div>

      {/* Wordmark — one massive flat form rolling in from the left; counter-shifts
          against the clouds so it reads as the fixed point the camera flies to */}
      <div
        className="boot-parallax absolute inset-0 flex items-center justify-center"
        style={{ "--pf": -0.25 } as CSSProperties}
      >
        <p className="animate-boot-logo whitespace-nowrap font-serif text-[38vw] leading-[1.05] tracking-[-0.02em] text-white">
          উপমা
        </p>
      </div>
    </div>
  );
}
