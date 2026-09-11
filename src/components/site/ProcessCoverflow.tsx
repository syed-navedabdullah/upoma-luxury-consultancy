import { useEffect, useState } from "react";

type Step = { number: string; title: string; description: string };

// Cards sit on the surface of a cylinder that spins continuously around its
// vertical axis — like a rotating globe. Each card is double-sided (a back face
// mirrors the front) so every card stays visible as it turns to the rear.
// For a 4-card ring, edges meet when RADIUS === CARD_W / 2; a hair above that
// leaves the cards almost touching.
const CARD_W = 200;
const CARD_H = 250;
const RADIUS = 112;

function Card({ step }: { step: Step }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-primary/40 bg-surface p-5 shadow-xl">
      <p className="font-mono text-[10px] tracking-label uppercase text-white/60">{step.number}</p>
      <div>
        <p className="text-lg font-bold leading-tight text-white">{step.title}</p>
        <p className="mt-2 text-xs leading-relaxed text-white/75">{step.description}</p>
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
      <div className="grid grid-cols-2 gap-3">
        {steps.map((step) => (
          <div key={step.number} className="min-h-[150px]">
            <Card step={step} />
          </div>
        ))}
      </div>
    );
  }

  const theta = 360 / steps.length;

  return (
    <div
      className="group relative h-[320px] w-full [perspective:1200px] md:h-[360px]"
      role="group"
      aria-label="How we work"
    >
      <div className="absolute left-1/2 top-1/2 h-0 w-0 animate-spin-y [transform-style:preserve-3d] group-hover:[animation-play-state:paused]">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className="absolute [transform-style:preserve-3d]"
            style={{
              width: CARD_W,
              height: CARD_H,
              left: -CARD_W / 2,
              top: -CARD_H / 2,
              transform: `rotateY(${i * theta}deg) translateZ(${RADIUS}px)`,
            }}
          >
            {/* Front face */}
            <div className="absolute inset-0 [backface-visibility:hidden]">
              <Card step={step} />
            </div>
            {/* Back face — mirrored copy so the rear reads correctly when turned */}
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <Card step={step} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
