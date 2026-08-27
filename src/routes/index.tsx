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
      <section id="work">
        <div className="max-w-6xl mx-auto px-6 pt-24 md:pt-32">
          <Label>Selected work</Label>
        </div>

        {/* Project 1 */}
        <div className="bg-surface border-t border-border mt-12">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
            <span className="inline-block rounded-full border border-border bg-tint px-3 py-1 text-xs text-primary">
              AI Solutions
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mt-6">Sasa — AI Assistant for Sasin MBA</h2>
            <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground text-pretty max-w-3xl">
              Sasin School of Management had a knowledge base buried in their student information
              system — a static FAQ that students rarely used because it was hard to navigate. I
              saw the gap, built a working prototype of an AI assistant from scratch, and pitched it
              to the administration as a tool that could answer student queries instantly using the
              university's own data.
            </p>
            <div className="mt-8 max-w-3xl">
              <p className="text-[11px] tracking-label uppercase text-primary mb-4">What I did</p>
              <ul className="space-y-3 text-[15px] text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">—</span>
                  <span>Identified the problem independently — no brief, no assignment</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">—</span>
                  <span>
                    Built a RAG-based AI chatbot using Lovable (frontend), Supabase (backend), and
                    Cloudflare Workers
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">—</span>
                  <span>Pitched it to Sasin's director as a 360-degree student solution</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">—</span>
                  <span>Scope expanded from a chatbot to a full AI implementation roadmap for the school</span>
                </li>
              </ul>
            </div>
            <div className="mt-10 max-w-3xl rounded-lg border-l-4 border-primary bg-tint p-6 md:p-8">
              <p className="text-[11px] tracking-label uppercase text-primary mb-2">Key result</p>
              <p className="text-lg md:text-xl text-foreground leading-snug">
                What started as a side project became a job offer. I'm joining Sasin as their AI
                &amp; Digital Solutions Officer.
              </p>
            </div>
          </div>
        </div>

        {/* Project 2 */}
        <div className="bg-tint border-t border-border">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
            <span className="inline-block rounded-full border border-border bg-surface px-3 py-1 text-xs text-primary">
              Social Media Management
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mt-6">Sundora — Three Years of Digital Growth</h2>
            <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground text-pretty max-w-3xl">
              Sundora is a Bangladeshi beauty and lifestyle brand with management based in Dubai. I
              was their on-ground digital presence for three years — creating content, managing
              social channels, and running campaigns while coordinating remotely with the leadership
              team.
            </p>
            <div className="mt-8 max-w-3xl">
              <p className="text-[11px] tracking-label uppercase text-primary mb-4">What I did</p>
              <ul className="space-y-3 text-[15px] text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">—</span>
                  <span>Managed all social media content creation and publishing</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">—</span>
                  <span>Ran marketing communications across digital channels</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">—</span>
                  <span>Coordinated content strategy between Dhaka execution and Dubai management</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">—</span>
                  <span>Maintained consistent brand voice across platforms over a three-year period</span>
                </li>
              </ul>
            </div>
            <div className="mt-10 max-w-3xl rounded-lg border-l-4 border-primary bg-surface p-6 md:p-8">
              <p className="text-[11px] tracking-label uppercase text-primary mb-2">Key result</p>
              <p className="text-lg md:text-xl text-foreground leading-snug">
                Grew Sundora's Instagram from 12,000 to 23,000 followers — nearly doubling their
                audience through consistent, strategic content.
              </p>
            </div>
          </div>
        </div>

        {/* Project 3 */}
        <div className="bg-surface border-t border-border">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
            <span className="inline-block rounded-full border border-border bg-tint px-3 py-1 text-xs text-primary">
              Digital Marketing Strategy
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mt-6">Sasin Social Media Strategy — Platform Revamp Proposal</h2>
            <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground text-pretty max-w-3xl">
              Sasin's social media presence was corporate-heavy — the kind of content that works on
              LinkedIn but falls flat on Instagram and TikTok. I independently developed a revamp
              strategy focused on making the content work for each platform's audience and
              behaviour.
            </p>
            <div className="mt-8 max-w-3xl">
              <p className="text-[11px] tracking-label uppercase text-primary mb-4">What I did</p>
              <ul className="space-y-3 text-[15px] text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">—</span>
                  <span>
                    Audited Sasin's existing content across platforms and identified the
                    corporate-visual mismatch
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">—</span>
                  <span>Proposed integrating Thai-language content to connect with the local audience</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">—</span>
                  <span>
                    Designed a production workflow where all video is shot to allow
                    horizontal-to-vertical reformatting for reels
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">—</span>
                  <span>
                    Recommended synced subtitle highlighting to increase viewer retention on
                    short-form video
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-10 max-w-3xl rounded-lg border-l-4 border-primary bg-tint p-6 md:p-8">
              <p className="text-[11px] tracking-label uppercase text-primary mb-2">Key result</p>
              <p className="text-lg md:text-xl text-foreground leading-snug">
                A platform-specific strategy that shifts Sasin's social content from broadcasting to
                engaging — built around how people actually consume content on each platform.
              </p>
            </div>
          </div>
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
