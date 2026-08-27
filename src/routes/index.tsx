import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Upoma — Digital Strategy & AI Consultancy in Dhaka" },
      {
        name: "description",
        content:
          "Upoma is a Dhaka-based consultancy building AI solutions, digital marketing strategy, social media management, and team training for brands that build forward.",
      },
      { property: "og:title", content: "Upoma — Digital Strategy & AI Consultancy" },
      {
        property: "og:description",
        content:
          "Dhaka-based consultancy building intelligent systems and digital strategies for brands that build forward.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const services = [
  {
    title: "AI Solutions",
    body: "Custom AI tools built for your specific business needs — from intelligent assistants to automated workflows. We handle architecture, development, and deployment.",
    tags: ["AI Assistants", "Workflow Automation", "System Architecture", "Deployment"],
  },
  {
    title: "Digital Marketing Strategy",
    body: "Data-informed strategies that connect your brand to the right audience through the right channels, with clear metrics and accountability.",
    tags: ["Campaign Strategy", "Channel Planning", "Analytics", "Growth"],
  },
  {
    title: "Social Media Management",
    body: "End-to-end social media — from content strategy and creation to daily management and performance reporting.",
    tags: ["Content Strategy", "Content Creation", "Community Management", "Reporting"],
  },
  {
    title: "Training & Workshops",
    body: "Hands-on sessions that bring your team up to speed on AI tools, digital marketing fundamentals, and modern content workflows.",
    tags: ["AI Tools Training", "Digital Marketing", "Content Workflows", "Team Upskilling"],
  },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] tracking-label uppercase text-primary font-medium">{children}</p>
  );
}

function Home() {
  const [sent, setSent] = useState(false);

  return (
    <div id="top">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-24 md:pt-36 md:pb-32">
        <h1 className="font-serif text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.08] text-balance max-w-4xl">
          Digital strategy and AI solutions for brands that build{" "}
          <span className="text-primary">forward</span>.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
          Upoma is a Dhaka-based consultancy that builds intelligent systems, crafts digital
          strategies, and helps brands operate smarter.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#work"
            className="inline-flex items-center rounded-md bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-md border border-border px-7 py-3.5 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-tint border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <Label>What we do</Label>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((s) => (
              <article
                key={s.title}
                className="rounded-lg border border-border bg-surface p-8 md:p-10 flex flex-col"
              >
                <h2 className="font-serif text-2xl md:text-3xl">{s.title}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground flex-1 text-pretty">
                  {s.body}
                </p>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-border bg-tint px-3 py-1 text-xs text-primary"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <Label>Selected work</Label>
        <div className="mt-12 rounded-lg border border-border bg-surface p-8 md:p-12 max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl">Sasa</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            AI assistant · Sasin School of Management, Bangkok
          </p>
          <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground text-pretty">
            An AI assistant built from scratch for Sasin — architecture, development, and
            deployment handled end to end using Lovable, Supabase, and Cloudflare Workers. Proof
            that a small, focused team can ship real products.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2">
            {["AI Assistant", "Supabase", "Cloudflare Workers", "End-to-end build"].map((t) => (
              <li
                key={t}
                className="rounded-full border border-border bg-tint px-3 py-1 text-xs text-primary"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-tint border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="aspect-[3/4] w-full rounded-lg border border-border bg-surface flex items-center justify-center">
              <span className="text-xs tracking-label uppercase text-muted-foreground">
                Founder photo
              </span>
            </div>
          </div>

          <div className="md:col-span-7">
            <h2 className="font-serif text-4xl md:text-5xl">Naved Abdullah</h2>
            <p className="mt-2 text-sm text-muted-foreground">Founder, Upoma</p>

            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-muted-foreground text-pretty">
              <p>
                I started Upoma because I kept seeing the same gap — businesses that knew they
                needed to move digitally but didn't know where to start or who to trust with it.
              </p>
              <p>
                My background is a mix of doing and building. Three years running social media and
                marketing communications at Sundora taught me how brands actually operate day to
                day. An MBA at Sasin School of Management in Bangkok gave me the strategic
                framework. And building Sasa — an AI assistant I developed from scratch for Sasin
                using tools like Lovable, Supabase, and Cloudflare Workers — taught me that you
                don't need a traditional engineering team to ship real products.
              </p>
              <p>
                Upoma works with a small number of clients at a time. Every engagement is led by me
                personally.
              </p>
            </div>

            <dl className="mt-10 border-t border-border">
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-8 border-b border-border py-4">
                <dt className="text-[11px] tracking-label uppercase text-primary sm:w-32 shrink-0 pt-1">
                  Education
                </dt>
                <dd className="text-sm text-foreground">
                  MBA, Sasin School of Management (Chulalongkorn University), Bangkok
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-8 border-b border-border py-4">
                <dt className="text-[11px] tracking-label uppercase text-primary sm:w-32 shrink-0 pt-1">
                  Based in
                </dt>
                <dd className="text-sm text-foreground">Dhaka, Bangladesh</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <h2 className="font-serif text-4xl md:text-5xl text-balance">Start a conversation</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground text-pretty">
              Whether you have a project in mind or want to explore what's possible, reach out.
            </p>
            <p className="mt-8 text-[11px] tracking-label uppercase text-primary">Email</p>
            <a
              href="mailto:syednaved.abdullah@proton.me"
              className="mt-2 inline-block text-sm text-foreground hover:text-primary transition-colors"
            >
              syednaved.abdullah@proton.me
            </a>
          </div>

          <div className="md:col-span-7">
            {sent ? (
              <div className="rounded-lg border border-border bg-surface p-10 text-center">
                <p className="font-serif text-3xl">Message sent.</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Thank you — you'll hear back within a few working days.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="rounded-lg border border-border bg-surface p-8 md:p-10 space-y-6"
              >
                {[
                  { id: "name", label: "Name", type: "text", required: true },
                  { id: "email", label: "Email", type: "email", required: true },
                  { id: "org", label: "Organization (optional)", type: "text", required: false },
                ].map((f) => (
                  <div key={f.id}>
                    <label
                      htmlFor={f.id}
                      className="block text-[11px] tracking-label uppercase text-muted-foreground mb-2"
                    >
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      name={f.id}
                      type={f.type}
                      required={f.required}
                      className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[11px] tracking-label uppercase text-muted-foreground mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-md bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
