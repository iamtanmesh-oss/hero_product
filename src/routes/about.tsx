import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { TeamSection } from "@/components/TeamSection";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About IndexBaazaar — Our Leadership Team" },
      { name: "description", content: "Meet the founder, leadership and advisory team behind IndexBaazaar's Indian stock market research." },
      { property: "og:title", content: "About IndexBaazaar — Our Leadership Team" },
      { property: "og:description", content: "Meet the minds behind IndexBaazaar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-3xl px-5 pt-16 text-center">
        <h1 className="text-4xl font-bold md:text-5xl">Making Financial Research More Accessible</h1>
        <p className="mt-5 text-muted-foreground">
          IndexBaazaar is a financial research and market intelligence platform focused on helping investors understand
          businesses, evaluate financial performance and make more informed investment decisions.
        </p>
      </section>
      <TeamSection />
    </div>
  );
}
