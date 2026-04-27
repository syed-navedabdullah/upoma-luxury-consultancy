export function SectionLabel({ children, index }: { children: React.ReactNode; index?: string }) {
  return (
    <div className="flex items-center gap-3 text-[10px] tracking-luxury uppercase text-emerald-deep/60">
      {index && <span className="text-gold">{index}</span>}
      <span className="h-px w-8 bg-emerald-deep/20" />
      <span>{children}</span>
    </div>
  );
}
