import { createFileRoute, Link } from "@tanstack/react-router";
import founder from "@/assets/founder.jpg";
import { SectionLabel } from "@/components/site/SectionLabel";

export const Route = createFileRoute("/founder")({
  head: () => ({
    meta: [
      { title: "Founder — Syed Naved Abdullah | Upoma" },
      {
        name: "description",
        content:
          "Syed Naved Abdullah is the founder of Upoma, a Dhaka-based luxury brand consultancy translating Bengali heritage into globally resonant identities.",
      },
      { property: "og:title", content: "Founder — Syed Naved Abdullah | Upoma" },
      {
        property: "og:description",
        content: "The founder behind Upoma — a Dhaka-based luxury brand consultancy.",
      },
      { property: "og:image", content: founder },
      { name: "twitter:image", content: founder },
    ],
  }),
  component: Founder,
});

function Founder() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <SectionLabel index="00">Founder</SectionLabel>
          <h1 className="mt-8 font-serif font-light text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-bone max-w-5xl text-balance">
            Syed Naved <em className="italic text-gold">Abdullah</em>.
          </h1>
        </div>
      </section>

      <section className="pb-32 md:pb-48">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-12 md:gap-16">
          <div className="col-span-12 md:col-span-5">
            <div className="aspect-[4/5] overflow-hidden bg-emerald-mist/20">
              <img
                src={founder}
                alt="Portrait of Syed Naved Abdullah, founder of Upoma"
                width={1024}
                height={1280}
                loading="lazy"
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-6 text-[10px] tracking-luxury uppercase text-bone/55">
              <div>
                <p className="text-bone/40 mb-1">Role</p>
                <p>Founder & Creative Director</p>
              </div>
              <div>
                <p className="text-bone/40 mb-1">Based</p>
                <p>Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 space-y-8">
            <p className="font-serif italic text-2xl md:text-3xl leading-snug text-bone">
              "Heritage is not a prop. It is the deepest, quietest source code a brand can be built on."
            </p>
            <div className="h-px w-16 bg-gold" />
            <div className="space-y-6 text-base md:text-lg leading-relaxed text-bone/75">
              <p>
                Syed Naved Abdullah is launching Upoma in 2027, after a decade spent at the intersection of design, strategy and the global luxury industry. Trained between Dhaka and Bangkok, he began his career working alongside heritage houses in South and Southeast Asia before returning home with a singular conviction — that the next generation of enduring luxury would be authored from the East, on its own terms.
              </p>
              <p>
                His practice draws as much from Bengali poetry, jamdani weave structures and Mughal manuscript tradition as it does from contemporary brand strategy. Under his direction, Upoma has shaped identities, narratives and spatial experiences for textile houses, hospitality groups and cultural institutions across South Asia and beyond.
              </p>
              <p>
                He continues to lead every engagement personally, in keeping with the studio's commitment to a small, deliberate body of work each year.
              </p>
            </div>

            <div className="pt-10 grid grid-cols-2 gap-8 border-t border-bone/15">
              <div>
                <p className="text-[10px] tracking-luxury uppercase text-bone/45 mb-3">Education</p>
                <p className="text-sm text-bone/80 leading-relaxed">
                  MBA, Sasin School of Management, Bangkok<br />
                  Undergraduate, North South University, Dhaka
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-luxury uppercase text-bone/45 mb-3">Recognition</p>
                <p className="text-sm text-bone/80 leading-relaxed">
                  D&AD New Blood, 2017<br />
                  Brand New Conference speaker, 2023
                </p>
              </div>
            </div>

            <div className="pt-10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-4 border border-bone/40 px-10 py-5 text-[10px] tracking-luxury uppercase text-bone hover:bg-bone hover:text-emerald-deep transition-all duration-700"
              >
                <span>Write to Naved</span>
                <span className="h-px w-8 bg-current" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
