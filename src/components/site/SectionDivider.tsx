import { useInView } from "@/hooks/use-in-view";

// A thin signal-trace seam between sections — echoes the ambient wave math
// in BanglaGrid so the whole page reads as one continuous "living" system.
export function SectionDivider() {
  const { ref, inView } = useInView();

  return (
    <div ref={ref} aria-hidden="true" className="relative section-light bg-background">
      <div className="relative mx-auto max-w-6xl px-6">
        <svg
          viewBox="0 0 1200 32"
          preserveAspectRatio="none"
          className={`h-6 w-full text-primary/25 ${inView ? "animate-line-reveal" : "opacity-0"}`}
        >
          <path
            d="M0,16 C150,2 300,30 450,16 C600,2 750,30 900,16 C1050,2 1150,30 1200,16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40" />
      </div>
    </div>
  );
}
