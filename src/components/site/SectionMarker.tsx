// Indexed section header — §NN + label + hairline rule + optional right-aligned
// metadata. The exposed-grid / technical-index treatment for every section.
export function SectionMarker({
  index,
  label,
  meta,
}: {
  index: string;
  label: string;
  meta?: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-sm font-medium text-primary">§{index}</span>
      <span className="text-base md:text-lg tracking-label uppercase text-foreground font-bold whitespace-nowrap">
        {label}
      </span>
      <span className="h-px flex-1 bg-border" />
      {meta && (
        <span className="font-mono text-[11px] tracking-label uppercase text-muted-foreground whitespace-nowrap">
          {meta}
        </span>
      )}
    </div>
  );
}
