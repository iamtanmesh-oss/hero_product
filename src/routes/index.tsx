import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Change, DemoBadge, Logo, RatingPill, Section, StockRow } from "@/components/common";
import { PriceChart } from "@/components/PriceChart";
import { RecoCard } from "@/components/RecoCard";
import { BLOG, INDICES, IPOS, NEWS } from "@/lib/data/content";
import { marketData, pct } from "@/lib/data/provider";
import type { Stock } from "@/lib/data/stocks";

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
  const all = marketData.all();
  const sorted = [...all].sort((a, b) => b.changePct - a.changePct);
  const buys = all.filter((s) => s.rating === "BUY");
  const [email, setEmail] = useState("");
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-25"><PriceChart id="hero" last={24350} height={480} /></div>
        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-20 text-center md:pt-28">
          <DemoBadge />
          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            Invest Smarter with <span className="text-primary">Data-Driven</span> Stock Research
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Expert Buy, Sell & Hold recommendations backed by financial analysis, valuation models, market intelligence and research-driven insights.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/stocks" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">Explore Stock Research</Link>
            <Link to="/recommendations" className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-primary">View Today's Picks</Link>
          </div>
        </div>
      </section>

      <Section title="Today's Market Overview" action={<Link to="/dashboard" className="text-sm text-primary">Full dashboard →</Link>}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
          {INDICES.slice(0, 6).map((x) => (
            <div key={x.name} className="glass rounded-xl p-4"><p className="text-xs text-muted-foreground">{x.name}</p><p className="mt-1 text-lg font-bold">{x.value.toLocaleString("en-IN")}</p><Change v={x.changePct} className="text-xs" /></div>
          ))}
        </div>
      </Section>

      <Section title="Top Stock Recommendations" action={<Link to="/recommendations" className="text-sm text-primary">All picks →</Link>}>
        <p className="-mt-3 mb-4 text-xs text-muted-foreground">Illustrative research examples only — not investment advice.</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{buys.slice(0, 3).map((s) => <RecoCard key={s.symbol} s={s} />)}</div>
      </Section>

      <Section title="High Conviction Research Picks">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...all].sort((a, b) => b.researchScore - a.researchScore).slice(0, 4).map((s) => (
            <Link key={s.symbol} to="/stocks/$symbol" params={{ symbol: s.symbol }} className="glass glow-hover rounded-2xl p-5">
              <p className="text-xs text-muted-foreground">{s.sector}</p><p className="mt-1 font-semibold">{s.name}</p>
              <p className="mt-3 font-display text-3xl font-bold text-primary">{s.researchScore}<span className="text-sm text-muted-foreground">/100</span></p>
              <p className="text-xs text-muted-foreground">Educational research score</p>
            </Link>
          ))}
        </div>
      </Section>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-2">
        {[["Top Gainers", sorted.slice(0, 5)], ["Top Losers", sorted.slice(-5).reverse()]].map(([t, list]) => (
          <div key={t as string} className="glass rounded-2xl p-4"><h2 className="mb-2 px-3 text-lg font-bold">{t as string}</h2>{(list as Stock[]).map((s) => <StockRow key={s.symbol} s={s} />)}</div>
        ))}
      </div>

      <Section title="PSU Stock Opportunities" action={<Link to="/psu" className="text-sm text-primary">PSU dashboard →</Link>}>
        <div className="grid gap-3 md:grid-cols-3">{all.filter((s) => s.psu).map((s) => <div key={s.symbol} className="glass rounded-xl"><StockRow s={s} /></div>)}</div>
      </Section>

      <Section title="Latest Market News" action={<Link to="/news" className="text-sm text-primary">All news →</Link>}>
        <div className="grid gap-4 md:grid-cols-3">
          {NEWS.slice(0, 3).map((n) => (
            <article key={n.id} className="glass rounded-2xl p-5"><p className="text-xs text-gold">{n.category}</p><h3 className="mt-2 font-semibold">{n.title}</h3><p className="mt-2 text-sm text-muted-foreground">{n.summary}</p><p className="mt-3 text-xs text-muted-foreground">{n.date}</p></article>
          ))}
        </div>
      </Section>

      <Section title="Upcoming IPOs" action={<Link to="/ipo" className="text-sm text-primary">IPO centre →</Link>}>
        <div className="grid gap-4 md:grid-cols-2">
          {IPOS.filter((i) => i.status === "Upcoming" || i.status === "Open").map((i) => (
            <div key={i.name} className="glass flex items-center justify-between rounded-2xl p-5"><div><p className="font-semibold">{i.name}</p><p className="text-xs text-muted-foreground">{i.band} · {i.open}</p></div><span className="rounded-md bg-muted px-2 py-1 text-xs">{i.status}</span></div>
          ))}
        </div>
      </Section>

      <Section title="Long-Term Investment Ideas">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">{all.filter((s) => s.horizon === "3+ years" || s.horizon === "2–3 years").slice(0, 4).map((s) => <div key={s.symbol} className="glass rounded-xl"><StockRow s={s} /></div>)}</div>
      </Section>

      <Section title="Latest Educational Articles" action={<Link to="/blog" className="text-sm text-primary">Blog →</Link>}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {BLOG.map((b) => (
            <Link key={b.slug} to="/blog/$slug" params={{ slug: b.slug }} className="glass glow-hover rounded-2xl p-5"><p className="text-xs text-gold">{b.category} · {b.read}</p><h3 className="mt-2 font-semibold">{b.title}</h3></Link>
          ))}
        </div>
      </Section>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="glass grid gap-8 rounded-3xl p-8 md:grid-cols-2 md:p-12">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Unlock <span className="text-gold">Premium</span> Research</h2>
            <p className="mt-3 text-muted-foreground">Detailed reports, advanced screening and exclusive educational content.</p>
            <Link to="/premium" className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground">See plans</Link>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (!/^\S+@\S+\.\S+$/.test(email)) { toast.error("Enter a valid email"); return; } toast.success("Thanks! Newsletter sign-ups will be saved once the mailing list is connected."); setEmail(""); }}>
            <h3 className="font-semibold">Weekly research newsletter</h3>
            <div className="mt-3 flex gap-2">
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="flex-1 rounded-full border border-input bg-background px-4 py-2.5 text-sm" />
              <button className="rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">Subscribe</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
