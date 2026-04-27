import { createFileRoute } from "@tanstack/react-router";
import craft1 from "@/assets/craft-1.jpg";
import { SectionLabel } from "@/components/site/SectionLabel";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "The Practice — Upoma" },
      {
        name: "description",
        content:
          "Upoma is a Dhaka-based atelier of strategists, designers and cultural curators dedicated to enduring luxury brands rooted in Bengali heritage.",
      },
      { property: "og:title", content: "The Practice — Upoma" },
      {
        property: "og:description",
        content: "An atelier of strategists, designers and cultural curators in Dhaka.",
      },
      { property: "og:image", content: craft1 },
      { name: "twitter:image", content: craft1 },
    ],
  }),
  component: Practice,
});

function Practice() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <SectionLabel index="00">The Practice</SectionLabel>
          <h1 className="mt-8 font-serif font-light text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-bone max-w-5xl text-balance">
            A small house, <em className="italic">long-form</em> by intention.
          </h1>
        </div>
      </section>

      <section className="pb-32 md:pb-48">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-12">
          <div className="col-span-12 md:col-span-7 order-2 md:order-1">
            <div className="aspect-[4/5] overflow-hidden bg-emerald-mist/20">
              <img
                src={craft1}
                alt="Hands working a traditional Bengali handloom"
                width={1024}
                height={1280}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 order-1 md:order-2 space-y-8">
            <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-bone">
              Upoma was founded in Dhaka in 2019 as a quiet rebellion against the loud, the disposable, the imitation.
            </p>
            <p className="text-base leading-relaxed text-bone/65">
              We are a deliberately small atelier of strategists, designers, writers and cultural anthropologists. We accept no more than seven engagements each year, devoting the patience and care our work requires.
            </p>
            <p className="text-base leading-relaxed text-bone/65">
              Our partners are heritage houses, emerging luxury maisons, hospitality groups and cultural institutions — each entrusted to us by a single principle: that the most resonant brands are the ones most faithful to their origin.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-bone/10">
              <div>
                <p className="font-serif text-5xl text-bone">07</p>
                <p className="text-[10px] tracking-luxury uppercase text-bone/65 mt-2">Engagements / year</p>
              </div>
              <div>
                <p className="font-serif text-5xl text-bone">42</p>
                <p className="text-[10px] tracking-luxury uppercase text-bone/65 mt-2">Partners since 2019</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 md:py-40 bg-bone/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <SectionLabel index="01">The Atelier</SectionLabel>
          <h2 className="mt-8 mb-16 font-serif text-4xl md:text-6xl text-bone max-w-3xl">
            A council of <em className="italic">disciplines</em>.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              { name: "Tahmina Rahman", role: "Founder, Creative Director", note: "Formerly of Wieden+Kennedy, RCA London." },
              { name: "Arif Chowdhury", role: "Strategy Principal", note: "Cultural anthropology, Dhaka University." },
              { name: "Nadia Hossain", role: "Design Director", note: "Type and identity systems, Yale MFA." },
            ].map((p) => (
              <div key={p.name}>
                <p className="text-[10px] tracking-luxury uppercase text-gold mb-4">— {p.role}</p>
                <h3 className="font-serif text-3xl italic text-bone mb-3">{p.name}</h3>
                <p className="text-sm text-bone/65 leading-relaxed">{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
