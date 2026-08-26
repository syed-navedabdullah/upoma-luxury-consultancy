import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-xs tracking-label uppercase text-primary mb-4">Error 404</p>
        <h1 className="font-serif text-5xl text-foreground">Page not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Back home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Upoma Consultancy" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.cdnfonts.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.cdnfonts.com/css/glacial-indifference",
      },
      { rel: "canonical", href: "https://upoma.one/" },
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
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
