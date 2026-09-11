import { useLayoutEffect, useState } from "react";
import { BanglaGrid } from "./BanglaGrid";

const STORAGE_KEY = "upoma-booted";
const VISIBLE_MS = 3200;
const EXIT_MS = 700;

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
      <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves="4" seed={seed} stitchTiles="stitch" />
          {/* RGB -> white, alpha = luminance of the noise (bright noise = cloud) */}
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.33 0.33 0.33 0 0" />
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

// A one-time cinematic intro: the camera flies through teal sky and cloud banks
// toward the উপমা wordmark as it emerges from the distance. Runs once per
// session; skipped for prefers-reduced-motion.
export function BootIntro() {
  const [show, setShow] = useState(false);
  const [exiting, setExiting] = useState(false);

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

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] overflow-hidden bg-surface transition-opacity ease-[cubic-bezier(0.16,1,0.3,1)] ${
        exiting ? "pointer-events-none opacity-0 duration-700" : "opacity-100 duration-0"
      }`}
    >
      {/* White neural-Bangla grid backdrop against the teal */}
      <div className="absolute inset-0 opacity-45">
        <BanglaGrid rgb={[255, 255, 255]} />
      </div>

      {/* Soft light bloom at the vanishing point where the logo arrives */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 45%)",
        }}
      />

      {/* Cloud banks — layered for parallax depth */}
      <CloudLayer seed={3} freq="0.006 0.010" delay={0} blur={9} />
      <CloudLayer seed={7} freq="0.011 0.017" delay={500} blur={4} />
      <CloudLayer seed={11} freq="0.020 0.030" delay={1000} blur={1} />

      {/* Wordmark emerging from the distance */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p
          className="animate-boot-logo font-serif text-6xl text-white md:text-8xl"
          style={{ textShadow: "0 4px 40px rgba(0,0,0,0.25)" }}
        >
          উপমা
        </p>
      </div>
    </div>
  );
}
