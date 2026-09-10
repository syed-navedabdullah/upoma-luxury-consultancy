import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "services", index: "01", label: "SERVICES" },
  { id: "toolkit", index: "02", label: "TOOLKIT" },
  { id: "demo", index: "03", label: "DEMO" },
  { id: "work", index: "04", label: "SELECTED WORK" },
  { id: "about", index: "05", label: "ABOUT" },
  { id: "contact", index: "06", label: "CONTACT" },
];

// Persistent control-room readout — live scroll progress + active section,
// framed as a system status HUD. Desktop-only, non-interactive overlay.
export function Hud() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(SECTIONS[0]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = SECTIONS.find((s) => s.id === entry.target.id);
            if (match) setActive(match);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="section-light pointer-events-none fixed inset-x-0 bottom-0 z-40 hidden md:block"
    >
      <div className="mx-auto flex max-w-6xl items-end justify-between px-6 pb-5">
        <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-label text-foreground/70">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
          <span>SYSTEM ONLINE</span>
          <span className="text-foreground/30">/</span>
          <span className="text-primary">
            §{active.index} · {active.label}
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px] tracking-label text-foreground/70">
          <div className="h-px w-16 overflow-hidden bg-border">
            <div className="h-full bg-primary transition-[width] duration-150" style={{ width: `${progress}%` }} />
          </div>
          <span className="tabular-nums text-foreground">
            {String(progress).padStart(3, "0")}%
          </span>
        </div>
      </div>
    </div>
  );
}
