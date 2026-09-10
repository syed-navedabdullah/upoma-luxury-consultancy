// Exposed structural grid — hairline column rules aligned to the site's
// max-w-6xl container, fixed behind all content. Swiss-technical framing that
// makes the layout's underlying grid visible.
export function GridLines() {
  return (
    <div
      aria-hidden="true"
      className="section-light pointer-events-none fixed inset-0 z-30 hidden md:block"
    >
      <div className="mx-auto h-full max-w-6xl px-6">
        <div className="relative h-full">
          {/* Left container edge */}
          <span className="absolute inset-y-0 left-6 w-px bg-border" />
          {/* Three interior column rules */}
          <span className="absolute inset-y-0 left-1/4 w-px bg-border/60" />
          <span className="absolute inset-y-0 left-1/2 w-px bg-border/60" />
          <span className="absolute inset-y-0 left-3/4 w-px bg-border/60" />
          {/* Right container edge */}
          <span className="absolute inset-y-0 right-6 w-px bg-border" />
        </div>
      </div>
    </div>
  );
}
