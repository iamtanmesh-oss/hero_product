import { createFileRoute, Link } from "@tanstack/react-router";
import { TeamSection } from "@/components/TeamSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IndexBaazaar — Data-Driven Indian Stock Research" },
      { name: "description", content: "Research-driven Buy, Sell & Hold insights on NSE and BSE stocks, backed by financial analysis and valuation models." },
      { property: "og:title", content: "IndexBaazaar — Data-Driven Indian Stock Research" },
      { property: "og:description", content: "Research-driven insights on Indian equity markets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">NSE · BSE Research</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          Invest Smarter with <span className="text-primary">Data-Driven</span> Stock Research
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
          Expert Buy, Sell & Hold recommendations backed by financial analysis, valuation models, market intelligence and research-driven insights.
        </p>
        <Link
          to="/about"
          className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Meet the team
        </Link>
      </section>
      <TeamSection />
    </div>
  );
}
