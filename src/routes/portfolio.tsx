import { createFileRoute } from "@tanstack/react-router";
import craft1 from "@/assets/craft-1.jpg";
import craft2 from "@/assets/craft-2.jpg";
import craft3 from "@/assets/craft-3.jpg";
import heroMuslin from "@/assets/hero-muslin.jpg";
import { SectionLabel } from "@/components/site/SectionLabel";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Upoma" },
      {
        name: "description",
        content:
          "Selected works from the Upoma archive — identity, strategy and spatial curation for heritage-led luxury houses.",
      },
      { property: "og:title", content: "Portfolio — Upoma" },
      { property: "og:description", content: "Selected works from the Upoma archive." },
      { property: "og:image", content: heroMuslin },
      { name: "twitter:image", content: heroMuslin },
    ],
  }),
  component: Portfolio,
});

const works = [
  {
    img: heroMuslin,
    vol: "Vol. IV",
    discipline: "Textile Identity",
    title: "The Weaver's Paradox",
    client: "Malitola Silk House, est. 1812",
    year: "2026",
    span: "md:col-span-8 md:row-span-2",
    aspect: "aspect-[4/5]",
  },
  {
    img: craft2,
    vol: "Vol. III",
    discipline: "Identity & Print",
    title: "Letters of Light",
    client: "Atelier Borendro",
    year: "2025",
    span: "md:col-span-4",
    aspect: "aspect-square",
  },
  {
    img: craft3,
    vol: "Vol. II",
    discipline: "Spatial Curation",
    title: "House of Verdant",
    client: "Verdant Hospitality, Sylhet",
    year: "2024",
    span: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    img: craft1,
    vol: "Vol. I",
    discipline: "Cultural Strategy",
    title: "The Loom Manifesto",
    client: "Bengal Crafts Council",
    year: "2023",
    span: "md:col-span-12",
    aspect: "aspect-[21/9]",
  },
];

function Portfolio() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <SectionLabel index="00">The Archive</SectionLabel>
          <h1 className="mt-8 font-serif font-light text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-emerald-deep max-w-5xl text-balance">
            Volumes from the <em className="italic">Upoma</em> archive.
          </h1>
        </div>
      </section>

      <section className="pb-32 md:pb-48">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {works.map((w) => (
              <article key={w.title} className={`group cursor-pointer ${w.span ?? ""}`}>
                <div className={`${w.aspect} overflow-hidden bg-silk`}>
                  <img
                    src={w.img}
                    alt={w.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="pt-6 flex justify-between items-start gap-6">
                  <div>
                    <p className="text-[10px] tracking-luxury uppercase text-muted-foreground mb-2">
                      {w.vol} — {w.discipline}
                    </p>
                    <h2 className="font-serif italic text-2xl md:text-3xl text-emerald-deep">
                      {w.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-2">{w.client}</p>
                  </div>
                  <span className="text-[10px] tracking-refined uppercase text-gold whitespace-nowrap pt-2">
                    {w.year}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
