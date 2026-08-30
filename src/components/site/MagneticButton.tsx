import { useRef } from "react";

const STRENGTH = 0.35;
const MAX_OFFSET = 14;

export function MagneticButton({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const x = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, dx * STRENGTH));
    const y = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, dy * STRENGTH));
    el.style.transform = `translate(${x}px, ${y}px)`;
  }

  function onLeave() {
    const el = ref.current;
    if (el) el.style.transform = "translate(0px, 0px)";
  }

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        transition:
          "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease, border-color 0.2s ease, color 0.2s ease",
      }}
    >
      {children}
    </a>
  );
}
