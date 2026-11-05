import { createFileRoute } from "@tanstack/react-router";
import { TeamSection } from "@/components/TeamSection";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About IndexBaazaar — Founder & Leadership" },
      { name: "description", content: "Meet the founder behind IndexBaazaar's Indian stock market research." },
      { property: "og:title", content: "About IndexBaazaar — Founder & Leadership" },
      { property: "og:description", content: "Meet the mind behind IndexBaazaar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen">
      <section className="mx-auto max-w-3xl px-5 pt-16 text-center">
        <h1 className="text-4xl font-bold md:text-5xl">Making Financial Research More Accessible</h1>
        <p className="mt-5 text-muted-foreground">
          IndexBaazaar is a financial research and market intelligence platform focused on helping investors understand
          businesses, evaluate financial performance and make more informed investment decisions.
        </p>
        <p className="mt-4 text-muted-foreground">Our platform brings together fundamental analysis, technical research, valuation insights and market intelligence to simplify the complexities of equity markets.</p>
      </section>
      <section className="mx-auto mt-10 grid max-w-6xl gap-5 px-5 md:grid-cols-2">
        <div className="glass rounded-2xl p-6"><p className="font-semibold text-gold">Our Vision</p><p className="mt-2 text-muted-foreground">To become a trusted destination for financial research, market intelligence and investment education in India.</p></div>
        <div className="glass rounded-2xl p-6"><p className="font-semibold text-gold">Our Mission</p><p className="mt-2 text-muted-foreground">To empower investors through structured research, financial knowledge, transparent analysis and data-driven insights.</p></div>
      </section>
      <section className="mx-auto mt-5 flex max-w-6xl flex-wrap justify-center gap-2 px-5">
        {["Research Integrity", "Transparency", "Financial Literacy", "Analytical Thinking", "Innovation", "Investor Awareness"].map((v) => <span key={v} className="rounded-full bg-muted px-4 py-2 text-sm">{v}</span>)}
      </section>
      <TeamSection />
    </div>
  );
}
