import { useMarketData } from "@/hooks/use-market-data";
import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Section, StockRow } from "@/components/common";
import { marketData } from "@/lib/data/provider";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/premium")({ head: () => seo("Premium Membership", "Free, Pro and Elite plans for deeper stock research, screening and premium research dashboards."), component: Premium });

const PLANS = [
  { name: "Free", m: 0, y: 0, f: ["Market Overview", "Basic Stock Research", "Educational Articles", "Limited Watchlist"] },
  { name: "Pro", m: 499, y: 4999, f: ["Detailed Research Reports", "Stock Comparison", "Premium Research Ideas", "Extended Watchlists"] },
  { name: "Elite", m: 999, y: 9999, f: ["Advanced Research Dashboard", "Premium Stock Analysis", "Advanced Screening", "Detailed Financial Research", "Exclusive Educational Content"] },
];

function Premium() {
  const [yearly, setYearly] = useState(false);
  const all = useMarketData().all();
  const groups: [string, typeof all][] = [
    ["Today's High Conviction Picks", [...all].sort((a, b) => b.confidence - a.confidence)],
    ["Momentum Stocks", [...all].sort((a, b) => b.rsi - a.rsi)],
    ["Undervalued Stocks", [...all].sort((a, b) => a.pe - b.pe)],
    ["Dividend Stocks", [...all].sort((a, b) => b.divYield - a.divYield)],
    ["High ROE Companies", [...all].sort((a, b) => b.roe - a.roe)],
    ["Low Debt Companies", [...all].sort((a, b) => a.de - b.de)],
  ];
  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 pt-14 text-center">
        <h1 className="text-3xl font-bold md:text-5xl">Premium <span className="text-gold">Membership</span></h1>
        <div className="mt-6 inline-flex rounded-full bg-muted p-1 text-sm">{["Monthly", "Annual"].map((t, i) => <button key={t} onClick={() => setYearly(i === 1)} className={"rounded-full px-4 py-1.5 " + (yearly === (i === 1) ? "bg-primary text-primary-foreground" : "")}>{t}</button>)}</div>
        <div className="mt-8 grid gap-5 text-left md:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.name} className={"glass rounded-2xl p-6 " + (p.name === "Pro" ? "border-gold" : "")}>
              <p className="font-display text-xl font-bold">{p.name}</p>
              <p className="mt-2 text-3xl font-bold">₹{(yearly ? p.y : p.m).toLocaleString("en-IN")}<span className="text-sm text-muted-foreground">/{yearly ? "year" : "month"}</span></p>
              <ul className="mt-5 space-y-2 text-sm">{p.f.map((x) => <li key={x} className="flex gap-2"><Check className="h-4 w-4 text-primary" />{x}</li>)}</ul>
              <button onClick={() => toast.info(p.m ? "Payments aren't switched on yet — no charge has been made." : "You're on the Free plan.")} className="mt-6 w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground">{p.m ? "Choose " + p.name : "Current plan"}</button>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Prices shown are placeholders. Payment checkout will be enabled once a payment provider is connected.</p>
      </section>
      <Section title="Premium Research Dashboard preview">
        <p className="-mt-3 mb-4 text-xs text-muted-foreground">Research scores are educational and do not guarantee investment outcomes. Demo data.</p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {groups.map(([t, l]) => <div key={t} className="glass rounded-2xl p-3"><p className="px-3 py-2 font-semibold">{t}</p>{l.slice(0, 3).map((s) => <StockRow key={s.symbol} s={s} />)}</div>)}
        </div>
      </Section>
    </div>
  );
}
