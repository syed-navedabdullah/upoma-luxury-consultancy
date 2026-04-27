import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionLabel } from "@/components/site/SectionLabel";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Upoma" },
      {
        name: "description",
        content:
          "Brand identity, cultural strategy, narrative writing, spatial curation and creative direction for heritage-led luxury houses.",
      },
      { property: "og:title", content: "Services — Upoma" },
      {
        property: "og:description",
        content: "Identity, strategy, narrative, spatial curation and creative direction.",
      },
    ],
  }),
  component: Services,
});

const services = [
  {
    n: "01",
    title: "Brand Identity",
    body: "Marks, type systems, palettes and visual languages designed as heirlooms — built to outlast the brief that created them.",
    deliverables: ["Identity systems", "Custom typography", "Packaging architecture", "Print & editorial"],
  },
  {
    n: "02",
    title: "Cultural Strategy",
    body: "Positioning rooted in anthropology rather than trend — uncovering the stories your brand is uniquely qualified to tell.",
    deliverables: ["Brand archaeology", "Market positioning", "Audience cartography", "Naming & nomenclature"],
  },
  {
    n: "03",
    title: "Narrative Writing",
    body: "Voice, copy and long-form storytelling that earns the silence around it. Written by hand. Edited by ear.",
    deliverables: ["Tone of voice", "Manifesto & founder letters", "Editorial direction", "Campaign copy"],
  },
  {
    n: "04",
    title: "Spatial Curation",
    body: "From flagship boutiques to intimate ateliers — physical environments that translate brand into atmosphere.",
    deliverables: ["Retail concepting", "Material direction", "Sensory design", "Exhibition curation"],
  },
  {
    n: "05",
    title: "Creative Direction",
    body: "Long-term stewardship of brands at inflection points — succession, expansion, reinvention.",
    deliverables: ["Long-term retainership", "Campaign direction", "Partnership curation", "Cultural counsel"],
  },
];

function Services() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <SectionLabel index="00">Capabilities</SectionLabel>
          <h1 className="mt-8 font-serif font-light text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-bone max-w-5xl text-balance">
            Five disciplines, <em className="italic">one</em> grammar.
          </h1>
          <p className="mt-10 max-w-xl text-base md:text-lg text-bone/65 leading-relaxed">
            Each engagement draws from one or more of the following disciplines, configured around the precise weight of your brief.
          </p>
        </div>
      </section>

      <section className="pb-32 md:pb-48">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 border-t border-bone/15">
          {services.map((s) => (
            <article
              key={s.n}
              className="grid grid-cols-12 gap-6 md:gap-12 py-16 md:py-24 border-b border-bone/15 group"
            >
              <div className="col-span-12 md:col-span-2">
                <span className="font-serif italic text-3xl text-gold">{s.n}</span>
              </div>
              <div className="col-span-12 md:col-span-6">
                <h2 className="font-serif text-4xl md:text-6xl text-bone mb-6 transition-colors duration-500 group-hover:text-gold">
                  {s.title}
                </h2>
                <p className="text-base md:text-lg text-bone/65 leading-relaxed max-w-[55ch]">
                  {s.body}
                </p>
              </div>
              <div className="col-span-12 md:col-span-4 md:pt-4">
                <p className="text-[10px] tracking-luxury uppercase text-bone/60 mb-4">Deliverables</p>
                <ul className="space-y-3">
                  {s.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-baseline gap-3 text-sm text-bone border-b border-bone/10 pb-3"
                    >
                      <span className="text-gold text-[10px]">◆</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-24 text-center">
          <p className="font-serif italic text-3xl md:text-4xl text-bone max-w-2xl mx-auto leading-snug">
            Unsure where your brief begins?
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-4 mt-10 border border-bone/40 px-10 py-5 text-[10px] tracking-luxury uppercase text-bone hover:bg-bone hover:text-emerald-deep transition-all duration-700"
          >
            <span>Speak with the studio</span>
            <span className="h-px w-8 bg-current" />
          </Link>
        </div>
      </section>
    </>
  );
}
