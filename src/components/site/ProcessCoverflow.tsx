import { useEffect, useState } from "react";

type Step = { number: string; title: string; description: string };

const AUTO_MS = 2800;

// A 3D coverflow of the process steps — cards sit angled in shared perspective
// and flow across as the active index auto-advances. Click any card (or dot) to
// bring it to center; pauses on hover; degrades to a static fan for reduced motion.
export function ProcessCoverflow({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % steps.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, reduce, steps.length]);

  return (
    <div
      className="relative h-[300px] md:h-[340px] w-full [perspective:1600px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="group"
      aria-label="How we work"
    >
      <div className="relative h-full w-full [transform-style:preserve-3d]">
        {steps.map((step, i) => {
          const offset = i - active;
          const abs = Math.abs(offset);
          const hidden = abs > 2;
          const style = {
            transform: `translateX(calc(-50% + ${offset * 46}%)) rotateY(${offset * -38}deg) translateZ(${-abs * 150}px) scale(${1 - abs * 0.07})`,
            opacity: hidden ? 0 : 1 - abs * 0.26,
            zIndex: 20 - abs,
            pointerEvents: hidden ? ("none" as const) : ("auto" as const),
          };
          return (
            <button
              key={step.number}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${step.number} — ${step.title}`}
              className="absolute left-1/2 top-0 h-full w-[260px] cursor-pointer text-left transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [backface-visibility:hidden] md:w-[300px]"
              style={style}
            >
              <div className="flex h-full flex-col justify-between rounded-xl border border-primary/40 bg-surface p-7 shadow-xl md:p-8">
                <p className="font-mono text-[11px] tracking-label uppercase text-white/60">
                  {step.number}
                </p>
                <div>
                  <p className="text-2xl font-bold leading-tight text-white md:text-3xl">
                    {step.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">{step.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="absolute inset-x-0 -bottom-1 flex justify-center gap-2">
        {steps.map((step, i) => (
          <button
            key={step.number}
            type="button"
            aria-label={`Show ${step.title}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-primary" : "w-1.5 bg-foreground/25 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
