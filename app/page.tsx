import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/marketing/hero";
import { Separator } from "@/components/ui/separator";

const stack = [
  {
    title: "Next.js App Router",
    description:
      "Server Components by default, typed routes, and a clean production baseline.",
  },
  {
    title: "Tailwind CSS",
    description:
      "Utility-first styling with CSS variables for consistent theming across the product.",
  },
  {
    title: "shadcn/ui",
    description:
      "Composable, accessible UI primitives you own — ready to extend for your product.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />

        <section id="features" className="border-t border-border/60 bg-background">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Built on a modern stack
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Everything you need to start shipping product features without
              fighting the foundation.
            </p>

            <div className="mt-14 grid gap-10 sm:grid-cols-3">
              {stack.map((item) => (
                <div key={item.title}>
                  <h3 className="font-heading text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        <section id="get-started" className="bg-muted/40">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready when you are
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Folders for components, lib, and types are in place. Add auth,
              billing, and product routes next.
            </p>
            <pre className="mt-8 overflow-x-auto rounded-xl bg-foreground px-5 py-4 text-sm text-background">
              <code>npm run dev</code>
            </pre>
          </div>
        </section>
      </main>
    </>
  );
}
