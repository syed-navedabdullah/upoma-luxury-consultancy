import { useLayoutEffect, useState } from "react";

const STORAGE_KEY = "upoma-booted";
const VISIBLE_MS = 1500;
const EXIT_MS = 500;

// A brief "system boot" moment on first load only — the wordmark assembling
// reads as a thesis statement for an AI consultancy, not just decoration.
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
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface transition-opacity ease-[cubic-bezier(0.16,1,0.3,1)] ${
        exiting ? "opacity-0 duration-500 pointer-events-none" : "opacity-100 duration-0"
      }`}
    >
      <p className="animate-boot-word font-serif text-5xl md:text-6xl text-white">উপমা</p>
      <div className="mt-6 h-px w-24 overflow-hidden bg-white/20">
        <div className="h-full w-full origin-left scale-x-0 bg-white animate-line-reveal [animation-delay:0.5s]" />
      </div>
    </div>
  );
}
