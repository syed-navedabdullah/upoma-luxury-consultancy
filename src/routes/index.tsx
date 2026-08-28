import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import founder1 from "@/assets/founder-1.png.asset.json";
import founder2 from "@/assets/founder-2.jpg.asset.json";
import { useInView } from "@/hooks/use-in-view";

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
    featured: true,
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

const projects = [
  {
    number: "01",
    category: "AI Solutions",
    title: "Sasa — AI Assistant for Sasin MBA",
    summary:
      "Sasin School of Management had a knowledge base buried in their student information system — a static FAQ that students rarely used because it was hard to navigate. I saw the gap, built a working prototype of an AI assistant from scratch, and pitched it to the administration as a tool that could answer student queries instantly using the university's own data.",
    did: [
      "Identified the problem independently — no brief, no assignment",
      "Built a RAG-based AI chatbot using Lovable (frontend), Supabase (backend), and Cloudflare Workers",
      "Pitched it to Sasin's director as a 360-degree student solution",
      "Scope expanded from a chatbot to a full AI implementation roadmap for the school",
    ],
    result: "Offered a formal role from the institute in Bangkok.",
  },
  {
    number: "02",
    category: "Social Media Management",
    title: "Sundora — Three Years of Digital Growth",
    summary:
      "Sundora is a Bangladeshi beauty and lifestyle brand with management based in Dubai. I was their on-ground digital presence for three years — creating content, managing social channels, and running campaigns while coordinating remotely with the leadership team.",
    did: [
      "Managed all social media content creation and publishing",
      "Ran marketing communications across digital channels",
      "Coordinated content strategy between Dhaka execution and Dubai management",
      "Maintained consistent brand voice across platforms over a three-year period",
    ],
    result:
      "Grew Sundora's Instagram from 12,000 to 23,000 followers — nearly doubling their audience through consistent, strategic content.",
  },
  {
    number: "03",
    category: "Digital Marketing Strategy",
    title: "Sasin Social Media Strategy — Platform Revamp Proposal",
    summary:
      "Sasin's social media presence was corporate-heavy — the kind of content that works on LinkedIn but falls flat on Instagram and TikTok. I independently developed a revamp strategy focused on making the content work for each platform's audience and behaviour.",
    did: [
      "Audited Sasin's existing content across platforms and identified the corporate-visual mismatch",
      "Proposed integrating Thai-language content to connect with the local audience",
      "Designed a production workflow where all video is shot to allow horizontal-to-vertical reformatting for reels",
      "Recommended synced subtitle highlighting to increase viewer retention on short-form video",
    ],
    result:
      "A platform-specific strategy that shifts Sasin's social content from broadcasting to engaging — built around how people actually consume content on each platform.",
  },
];

const founderPhotos = [
  { url: founder1.url, alt: "Naved Abdullah, founder of Upoma" },
  { url: founder2.url, alt: "Naved Abdullah presenting at Sasin School of Management" },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] tracking-label uppercase text-primary font-semibold">{children}</p>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}

function FounderCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % founderPhotos.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-xl border border-border p-2 md:p-3">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted">
        {founderPhotos.map((p, i) => (
          <img
            key={p.url}
            src={p.url}
            alt={p.alt}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="mt-4 flex gap-2 px-1">
        {founderPhotos.map((p, i) => (
          <button
            key={p.url}
            type="button"
            aria-label={`Show photo ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-primary" : "w-4 bg-border hover:bg-primary/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bento-card flex flex-col justify-between min-h-[120px]">
      <p className="text-[11px] tracking-label uppercase text-white/70">{label}</p>
      <p className="text-xl md:text-2xl font-bold text-white mt-3">{value}</p>
    </div>
  );
}

function ServiceCard({
  service,
  className = "",
}: {
  service: (typeof services)[0];
  className?: string;
}) {
  return (
    <article className={`bento-card flex flex-col ${className}`}>
      <h2 className="font-serif text-2xl md:text-3xl text-foreground">{service.title}</h2>
      <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground flex-1 text-pretty">
        {service.body}
      </p>
      <ul className="mt-7 flex flex-wrap gap-2">
        {service.tags.map((t) => (
          <li key={t} className="tag">
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}

function ProjectPanel({
  project,
  variant = "surface",
}: {
  project: (typeof projects)[0];
  variant?: "surface" | "tint";
}) {
  return (
    <div
      className={`border-t border-border/60 ${
        variant === "tint" ? "bg-tint" : "bg-surface"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[11px] tracking-label uppercase text-muted-foreground font-medium">
              {project.number}
            </span>
            <span className="h-px flex-1 max-w-[120px] bg-border" />
            <span className="tag">{project.category}</span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground max-w-4xl">
            {project.title}
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground text-pretty max-w-3xl">
            {project.summary}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={200}>
            <div>
              <p className="text-[11px] tracking-label uppercase text-primary mb-5 font-semibold">
                What I did
              </p>
              <ul className="space-y-4">
                {project.did.map((item, i) => (
                  <li key={i} className="flex gap-3 text-[15px] text-muted-foreground">
                    <span className="text-primary mt-1">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="rounded-xl bg-primary-deep p-6 md:p-8">
              <p className="text-[11px] tracking-label uppercase text-primary-foreground/70 mb-3">
                Key result
              </p>
              <p className="text-lg md:text-xl text-primary-foreground leading-snug font-medium">
                {project.result}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [sent, setSent] = useState(false);

  return (
    <div id="top">
      {/* Hero */}
      <section className="relative overflow-hidden section-light bg-background text-foreground">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-28 md:pb-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <Reveal>
                <h1 className="font-serif text-[clamp(2.6rem,7vw,5.5rem)] leading-[1.02] text-balance">
                  Digital strategy and AI solutions for brands that build{" "}
                  <span className="text-primary">forward</span>.
                </h1>
              </Reveal>
              <Reveal delay={100}>
                <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
                  Upoma is a Dhaka-based consultancy that builds intelligent systems, crafts
                  digital strategies, and helps brands operate smarter.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="#work"
                    className="inline-flex items-center rounded-md bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-all"
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
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={250}>
                <div className="grid grid-cols-2 gap-3">
                  <StatCard label="Location" value="Dhaka, Bangkok" />
                  <StatCard label="Focus" value="AI + Strategy" />
                  <StatCard label="Launch" value="2027" />
                  <div className="bento-card flex items-center justify-center min-h-[120px]">
                    <span className="text-4xl font-bold text-white animate-float">উ</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative py-24 md:py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <Label>What we do</Label>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4">
            <Reveal delay={100} className="lg:col-span-2 lg:row-span-2">
              <ServiceCard service={services[0]} className="h-full" />
            </Reveal>
            <Reveal delay={150} className="lg:col-span-1 lg:row-span-1">
              <ServiceCard service={services[1]} className="h-full" />
            </Reveal>
            <Reveal delay={200} className="lg:col-span-1 lg:row-span-1">
              <ServiceCard service={services[2]} className="h-full" />
            </Reveal>
            <Reveal delay={250} className="lg:col-span-1 lg:row-span-1">
              <ServiceCard service={services[3]} className="h-full" />
            </Reveal>
            <Reveal delay={300} className="lg:col-span-1 lg:row-span-1">
              <div className="bento-card h-full flex flex-col justify-center items-center text-center min-h-[160px]">
                <p className="text-3xl font-bold text-primary">4</p>
                <p className="mt-2 text-sm text-muted-foreground">core capabilities</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work">
        <div className="max-w-6xl mx-auto px-6 pt-24 md:pt-32">
          <Reveal>
            <Label>Selected work</Label>
          </Reveal>
        </div>
        <div className="mt-12">
          {projects.map((p, i) => (
            <ProjectPanel key={p.number} project={p} variant={i % 2 === 0 ? "surface" : "tint"} />
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-24 md:py-32 overflow-hidden section-light bg-background text-foreground">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <Label>About</Label>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal delay={100}>
                <FounderCarousel />
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={150}>
                <h2 className="font-serif text-4xl md:text-5xl text-[#3c067a]">Naved Abdullah</h2>
                <p className="mt-2 text-sm text-muted-foreground">Founder, Upoma</p>
              </Reveal>

              <Reveal delay={200}>
                <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-muted-foreground text-pretty">
                  <p>
                    I started Upoma because I kept seeing the same gap — businesses that knew they
                    needed to move digitally but didn't know where to start or who to trust with it.
                  </p>
                  <p>
                    My background is a mix of doing and building. Three years running social media
                    and marketing communications at Sundora taught me how brands actually operate day
                    to day. An MBA at Sasin School of Management in Bangkok gave me the strategic
                    framework. And building Sasa — an AI assistant I developed from scratch for Sasin
                    using tools like Lovable, Supabase, and Cloudflare Workers — taught me that you
                    don't need a traditional engineering team to ship real products.
                  </p>
                  <p>
                    Upoma works with a small number of clients at a time. Every engagement is led
                    by me personally.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={250}>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bento-card">
                    <p className="text-[11px] tracking-label uppercase text-white/70 mb-3">
                      Education
                    </p>
                    <p className="text-sm text-white leading-relaxed">
                      MBA, Sasin School of Management (Chulalongkorn University), Bangkok
                    </p>
                  </div>
                  <div className="bento-card">
                    <p className="text-[11px] tracking-label uppercase text-white/70 mb-3">
                      Based in
                    </p>
                    <p className="text-sm text-white">Dhaka, Bangkok</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-24 md:py-32 border-t border-border/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="font-serif text-4xl md:text-5xl text-balance text-foreground">
                  Start a conversation
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground text-pretty">
                  Whether you have a project in mind or want to explore what's possible, reach out.
                </p>
              </Reveal>
              <Reveal delay={150}>
                <p className="mt-8 text-[11px] tracking-label uppercase text-primary font-semibold">
                  Email
                </p>
                <a
                  href="mailto:syednaved.abdullah@proton.me"
                  className="mt-2 inline-block text-sm text-foreground hover:text-primary transition-colors whitespace-nowrap"
                >
                  syednaved.abdullah@proton.me
                </a>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={200}>
                {sent ? (
                  <div className="rounded-xl border border-border bg-surface p-10 text-center">
                    <p className="font-serif text-3xl text-foreground">Message sent.</p>
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
                    className="rounded-xl border border-border bg-surface p-8 md:p-10 space-y-6"
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
                          className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
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
                        className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="rounded-md bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-all"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
