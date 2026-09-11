import { useEffect, useState } from "react";

type Step = { number: string; title: string; description: string };

// Cards sit on the surface of a cylinder that spins continuously around its
// vertical axis — like a rotating globe. Only the front-facing hemisphere is
// visible (backface hidden), so cards flow in and out of view as it turns.
const RADIUS = 340; // px — cylinder radius
const CARD_W = 280;
const CARD_H = 300;

function Card({ step }: { step: Step }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-primary/40 bg-surface p-7 shadow-xl md:p-8">
      <p className="font-mono text-[11px] tracking-label uppercase text-white/60">{step.number}</p>
      <div>
        <p className="text-2xl font-bold leading-tight text-white md:text-3xl">{step.title}</p>
        <p className="mt-3 text-sm leading-relaxed text-white/75">{step.description}</p>
      </div>
    </div>
  );
}

export function ProcessCoverflow({ steps }: { steps: Step[] }) {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Reduced motion: a plain static row, no 3D spin.
  if (reduce) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div key={step.number} className="min-h-[200px]">
            <Card step={step} />
          </div>
        ))}
      </div>
    );
  }

  const theta = 360 / steps.length;

  return (
    <div
      className="group relative h-[400px] w-full [perspective:1600px] md:h-[440px]"
      role="group"
      aria-label="How we work"
    >
      <div className="absolute left-1/2 top-1/2 h-0 w-0 animate-spin-y [transform-style:preserve-3d] group-hover:[animation-play-state:paused]">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className="absolute [backface-visibility:hidden]"
            style={{
              width: CARD_W,
              height: CARD_H,
              left: -CARD_W / 2,
              top: -CARD_H / 2,
              transform: `rotateY(${i * theta}deg) translateZ(${RADIUS}px)`,
            }}
          >
            <Card step={step} />
          </div>
        ))}
      </div>
    </div>
  );
}
