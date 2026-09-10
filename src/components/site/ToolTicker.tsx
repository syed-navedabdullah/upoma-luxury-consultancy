type Tool = { name: string; logo: string };

// Duplicated once so the marquee can loop seamlessly — translating by -50%
// of the doubled track always lands exactly on the start of the next copy.
export function ToolTicker({ tools }: { tools: Tool[] }) {
  const items = [...tools, ...tools];

  return (
    <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
        {items.map((tool, i) => (
          <div
            key={`${tool.name}-${i}`}
            title={tool.name}
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-white p-3 shadow-sm"
          >
            <img
              src={tool.logo}
              alt={tool.name}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
