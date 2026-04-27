import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/practice", label: "The Practice" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Inquiry" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-emerald-deep/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <Link to="/" className="group flex items-baseline gap-3">
          <span className="font-serif italic text-2xl md:text-3xl text-bone leading-none">
            upoma
          </span>
          <span className="hidden sm:inline text-[9px] tracking-luxury uppercase text-bone/65">
            Dhaka
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-12">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[10px] tracking-refined uppercase text-bone/80 hover:text-gold transition-colors duration-500"
              activeProps={{ className: "text-gold" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          aria-label="Open menu"
          className="md:hidden text-bone"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block w-6 h-px bg-current mb-1.5" />
          <span className="block w-6 h-px bg-current mb-1.5" />
          <span className="block w-4 h-px bg-current ml-auto" />
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-emerald-deep border-t border-border">
          <div className="px-6 py-8 flex flex-col gap-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-xs tracking-refined uppercase text-bone"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
