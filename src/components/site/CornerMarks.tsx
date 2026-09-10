// Registration / crop marks — small L-shaped hairline ticks in the four
// corners of a section's content area. Part of the technical-instrument frame.
export function CornerMarks() {
  const common = "absolute h-3.5 w-3.5 border-primary/40";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] mx-auto max-w-6xl px-6">
      <div className="relative h-full w-full">
        <span className={`${common} left-6 top-6 border-l border-t`} />
        <span className={`${common} right-6 top-6 border-r border-t`} />
        <span className={`${common} bottom-6 left-6 border-b border-l`} />
        <span className={`${common} bottom-6 right-6 border-b border-r`} />
      </div>
    </div>
  );
}
