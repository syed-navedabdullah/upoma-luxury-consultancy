import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-emerald-deep px-4">
      <div className="max-w-md text-center">
        <p className="text-[10px] tracking-luxury uppercase text-bone/60 mb-6">Error 404</p>
        <h1 className="font-serif text-7xl text-bone">Lost in the weave</h1>
        <p className="mt-4 text-sm text-bone/65">
          The page you sought has unraveled or never was.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-bone px-8 py-3 text-[10px] tracking-refined uppercase text-bone hover:bg-emerald-deep hover:text-bone transition-all duration-500"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Upoma — Luxury Brand Consultancy, Dhaka" },
      {
        name: "description",
        content:
          "Upoma is a Dhaka-based luxury brand consultancy weaving Bengali craft heritage into globally resonant identities, strategy, and curated experiences.",
      },
      { name: "author", content: "Upoma" },
      { property: "og:title", content: "Upoma — Luxury Brand Consultancy, Dhaka" },
      {
        property: "og:description",
        content: "A quiet house for enduring brands. Heritage-led identity, strategy, and curation from Dhaka.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Tenor+Sans&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="bg-emerald-deep text-foreground min-h-screen">
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
