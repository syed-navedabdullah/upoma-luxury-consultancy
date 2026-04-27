import { createFileRoute, Link } from "@tanstack/react-router";
import heroMuslin from "@/assets/hero-muslin.jpg";
import craft1 from "@/assets/craft-1.jpg";
import craft2 from "@/assets/craft-2.jpg";
import craft3 from "@/assets/craft-3.jpg";
import { SectionLabel } from "@/components/site/SectionLabel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Upoma — Luxury Brand Consultancy, Dhaka" },
      {
        name: "description",
        content:
          "Upoma weaves Bengali craft heritage into globally resonant luxury brands. Identity, strategy and curation from Dhaka.",
      },
      { property: "og:image", content: heroMuslin },
      { name: "twitter:image", content: heroMuslin },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-12 gap-6 md:gap-8 items-end mb-16 md:mb-24">
            <div className="col-span-12 lg:col-span-9">
              <p className="text-[10px] tracking-luxury uppercase text-bone/60 mb-8">
                Est. MMXIX — Dhaka, Bangladesh
              </p>
              <h1 className="font-serif font-light text-[clamp(3rem,9vw,8.5rem)] leading-[0.92] tracking-tight text-balance text-bone">
                The quiet <em className="italic text-gold">eloquence</em><br />
                of heritage-led luxury.
              </h1>
            </div>
            <div className="col-span-12 lg:col-span-3 pb-2">
              <p className="text-sm leading-relaxed max-w-[28ch] text-bone/65">
                A consultancy weaving the intricate soul of Bengali craft into the language of global luxury.
              </p>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative aspect-[21/10] overflow-hidden bg-emerald-mist/20">
            <img
              src={heroMuslin}
              alt="Hand-loomed Dhaka muslin catching morning light against deep emerald"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bone/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 md:bottom-10 right-6 md:right-10">
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-4 bg-bone/95 backdrop-blur-md px-8 md:px-10 py-4 md:py-5 text-[10px] tracking-luxury uppercase text-emerald-deep hover:bg-gold hover:text-emerald-deep transition-all duration-700"
              >
                <span>View Portfolio</span>
                <span className="h-px w-6 bg-current transition-all group-hover:w-10" />
              </Link>
            </div>
            <div className="absolute top-6 md:top-10 left-6 md:left-10 text-bone/90">
              <p className="text-[9px] tracking-luxury uppercase mb-2">Vol. IV / 2026</p>
              <p className="font-serif italic text-xl md:text-2xl">The Weaver's Suite</p>
            </div>
          </div>
        </div>
      </section>

      {/* ETHOS */}
      <section className="py-32 md:py-48 bg-bone/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-12 gap-12 md:gap-16">
            <div className="col-span-12 md:col-span-5">
              <div className="md:sticky md:top-32">
                <SectionLabel index="01">Our Ethos</SectionLabel>
                <h2 className="mt-8 font-serif text-4xl md:text-5xl italic leading-snug max-w-md text-bone">
                  We believe luxury is a dialogue between the hand and the mind.
                </h2>
              </div>
            </div>

            <div className="col-span-12 md:col-span-7 space-y-20 md:space-y-24">
              {[
                {
                  n: "i",
                  title: "Origin",
                  body: "Every brand we touch begins with a pilgrimage — to the loom, the kiln, the field. Authenticity is not a strategy; it is the soil.",
                },
                {
                  n: "ii",
                  title: "Restraint",
                  body: "Luxury speaks in whispers. We compose visual systems that breathe — measured in white space, in the patience of a single serif.",
                },
                {
                  n: "iii",
                  title: "Resonance",
                  body: "From hand-pressed paper to spatial choreography, every touchpoint is tuned to a single, unmistakable frequency.",
                },
              ].map((p) => (
                <div key={p.n} className="border-b border-bone/10 pb-12">
                  <div className="flex items-baseline gap-6 mb-6">
                    <span className="font-serif italic text-gold text-lg">{p.n}</span>
                    <h3 className="text-xl tracking-refined uppercase text-bone">
                      {p.title}
                    </h3>
                  </div>
                  <p className="max-w-[55ch] text-base md:text-lg leading-relaxed text-bone/65">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED FRAGMENTS */}
      <section className="py-32 md:py-48">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
            <div>
              <SectionLabel index="02">Selected Fragments</SectionLabel>
              <h2 className="mt-8 font-serif text-5xl md:text-7xl text-bone">
                A curated <em className="italic">archive</em>.
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="text-[10px] tracking-luxury uppercase text-bone border-b border-gold pb-1 hover:text-gold transition-colors"
            >
              View all volumes
            </Link>
          </div>

          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <article className="col-span-12 md:col-span-7 group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden bg-emerald-mist/20">
                <img
                  src={craft1}
                  alt="Bengali artisan weaving on traditional handloom"
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                />
              </div>
              <div className="pt-6 flex justify-between items-start">
                <div>
                  <p className="text-[10px] tracking-luxury uppercase text-bone/65 mb-2">Vol. IV — Textile</p>
                  <h3 className="font-serif italic text-2xl md:text-3xl text-bone">The Weaver's Paradox</h3>
                </div>
                <span className="text-[10px] tracking-refined uppercase text-gold">2026</span>
              </div>
            </article>

            <div className="col-span-12 md:col-span-5 flex flex-col gap-6">
              <article className="group cursor-pointer">
                <div className="aspect-square overflow-hidden bg-emerald-mist/20">
                  <img
                    src={craft2}
                    alt="Gold calligraphy on ivory paper"
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="pt-4 flex justify-between items-start">
                  <div>
                    <p className="text-[10px] tracking-luxury uppercase text-bone/65 mb-2">Vol. III — Identity</p>
                    <h3 className="font-serif italic text-xl text-bone">Letters of Light</h3>
                  </div>
                  <span className="text-[10px] tracking-refined uppercase text-gold">2025</span>
                </div>
              </article>

              <article className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden bg-emerald-mist/20">
                  <img
                    src={craft3}
                    alt="Emerald boutique interior with brass fixtures"
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="pt-4 flex justify-between items-start">
                  <div>
                    <p className="text-[10px] tracking-luxury uppercase text-bone/65 mb-2">Vol. II — Spatial</p>
                    <h3 className="font-serif italic text-xl text-bone">House of Verdant</h3>
                  </div>
                  <span className="text-[10px] tracking-refined uppercase text-gold">2024</span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-48 bg-bone text-emerald-deep">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <p className="text-[10px] tracking-luxury uppercase text-emerald-deep/60 mb-10">An Invitation</p>
          <h2 className="font-serif font-light text-5xl md:text-8xl leading-[0.95] text-balance max-w-5xl mx-auto">
            For brands that intend to <em className="italic text-gold">endure</em>.
          </h2>
          <p className="mt-10 text-base md:text-lg text-emerald-deep/70 max-w-xl mx-auto">
            We accept a small number of engagements each year. Conversations begin in confidence.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-4 mt-14 border border-emerald-deep/40 px-10 py-5 text-[10px] tracking-luxury uppercase text-emerald-deep hover:bg-emerald-deep hover:text-bone transition-all duration-700"
          >
            <span>Begin a conversation</span>
            <span className="h-px w-8 bg-current" />
          </Link>
        </div>
      </section>
    </>
  );
}
