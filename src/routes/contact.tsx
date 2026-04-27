import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/site/SectionLabel";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Inquiry — Upoma" },
      {
        name: "description",
        content:
          "Begin a confidential conversation with Upoma. We accept a small number of engagements each year from our studio in Dhaka.",
      },
      { property: "og:title", content: "Inquiry — Upoma" },
      {
        property: "og:description",
        content: "Begin a confidential conversation with the studio.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <SectionLabel index="00">Inquiry</SectionLabel>
          <h1 className="mt-8 font-serif font-light text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-bone max-w-5xl text-balance">
            Begin a <em className="italic">conversation</em>.
          </h1>
        </div>
      </section>

      <section className="pb-32 md:pb-48">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-12 md:gap-16">
          <aside className="col-span-12 md:col-span-4 space-y-12">
            <div>
              <p className="text-[10px] tracking-luxury uppercase text-bone/60 mb-4">Studio</p>
              <p className="font-serif text-2xl italic text-bone leading-snug">
                House 14, Road 11<br />
                Banani, Dhaka 1213<br />
                Bangladesh
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-luxury uppercase text-bone/60 mb-4">Direct</p>
              <a
                href="mailto:syednaved.abdullah@proton.me"
                className="block font-serif italic text-xl md:text-2xl break-all text-bone hover:text-gold transition-colors"
              >
                syednaved.abdullah@proton.me
              </a>
            </div>
            <div>
              <p className="text-[10px] tracking-luxury uppercase text-bone/60 mb-4">Hours</p>
              <p className="text-sm text-bone leading-relaxed">
                By appointment.<br />
                Sunday — Thursday<br />
                10.00 — 18.00 BST
              </p>
            </div>
          </aside>

          <div className="col-span-12 md:col-span-8">
            {submitted ? (
              <div className="border border-bone/20 p-12 md:p-16 text-center">
                <p className="font-serif italic text-4xl md:text-5xl text-bone mb-6">
                  Received.
                </p>
                <p className="text-base text-bone/65 max-w-md mx-auto">
                  Your message has been delivered to the studio. We will respond, in confidence, within three working days.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-10"
              >
                {[
                  { id: "name", label: "Your name", type: "text" },
                  { id: "house", label: "House or organisation", type: "text" },
                  { id: "email", label: "Email", type: "email" },
                ].map((f) => (
                  <div key={f.id} className="border-b border-bone/20 pb-3 focus-within:border-gold transition-colors">
                    <label
                      htmlFor={f.id}
                      className="block text-[10px] tracking-luxury uppercase text-bone/60 mb-3"
                    >
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      type={f.type}
                      required
                      className="w-full bg-transparent font-serif text-2xl text-bone placeholder:text-bone/20 focus:outline-none"
                    />
                  </div>
                ))}

                <div className="border-b border-bone/20 pb-3 focus-within:border-gold transition-colors">
                  <label
                    htmlFor="discipline"
                    className="block text-[10px] tracking-luxury uppercase text-bone/60 mb-3"
                  >
                    Discipline of interest
                  </label>
                  <select
                    id="discipline"
                    className="w-full bg-transparent font-serif text-2xl text-bone focus:outline-none cursor-pointer"
                  >
                    <option>Brand Identity</option>
                    <option>Cultural Strategy</option>
                    <option>Narrative Writing</option>
                    <option>Spatial Curation</option>
                    <option>Creative Direction</option>
                    <option>Multiple / Unsure</option>
                  </select>
                </div>

                <div className="border-b border-bone/20 pb-3 focus-within:border-gold transition-colors">
                  <label
                    htmlFor="message"
                    className="block text-[10px] tracking-luxury uppercase text-bone/60 mb-3"
                  >
                    The brief, in your words
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    className="w-full bg-transparent font-serif text-xl text-bone placeholder:text-bone/20 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex items-center gap-4 bg-bone text-emerald-deep px-10 py-5 text-[10px] tracking-luxury uppercase hover:bg-gold hover:text-emerald-deep transition-all duration-700"
                >
                  <span>Send to the studio</span>
                  <span className="h-px w-8 bg-current transition-all group-hover:w-12" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
