import { useMarketData } from "@/hooks/use-market-data";
import { quoteTime } from "@/lib/data/quotes";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Change, DemoBadge, Logo, RatingPill, Section, Stat } from "@/components/common";
import { MiniBars, PriceChart, TechnicalChart } from "@/components/PriceChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { marketData, fmtCr, fmtINR, pct } from "@/lib/data/provider";
import { DEMO_DATE } from "@/lib/data/stocks";
import { useLocal } from "@/lib/useLocal";

export const Route = createFileRoute("/stocks/$symbol")({
  loader: ({ params }) => {
    const s = marketData.get(params.symbol);
    if (!s) throw notFound();
    return { symbol: s.symbol, name: s.name };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.name} (${loaderData.symbol}) Research` : "Stock research";
    const d = "Fundamentals, financial statements, valuation, technicals, shareholding and SWOT — demonstration data.";
    return { meta: [{ title: t + " | IndexBaazaar" }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  notFoundComponent: () => <div className="p-16 text-center">Stock not found. <Link to="/stocks" className="text-primary">Back to screener</Link></div>,
  component: StockPage,
});

function Table({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-x-auto"><table className="w-full min-w-[480px] text-sm"><thead><tr className="border-b border-border text-left text-xs text-muted-foreground">{head.map((h) => <th key={h} className="p-2">{h}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i} className="border-b border-border/40">{r.map((c, j) => <td key={j} className={"p-2 " + (j === 0 ? "text-muted-foreground" : "")}>{typeof c === "number" ? c.toLocaleString("en-IN") : c}</td>)}</tr>)}</tbody></table></div>
  );
}

function StockPage() {
  const marketData = useMarketData();
  const { symbol } = Route.useLoaderData();
  const data = marketData;
  const s = data.get(symbol);
  const [wl, setWl] = useLocal<string[]>("ib-watchlist", []);
  if (!s) return <p className="p-5">Stock unavailable.</p>;
  const quote = data.quote(symbol);
  const inWl = wl.includes(s.symbol);
  const f = s.financials;
  const peers = marketData.all().filter((p) => p.sector === s.sector && p.symbol !== s.symbol);
  const h = s.holding;
  const card = "glass rounded-2xl p-5";
  return (
    <div>
      <section className="mx-auto max-w-7xl px-5 pt-10">
        <Link to="/stocks" className="text-sm text-muted-foreground hover:text-foreground">← Screener</Link>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo s={s} />
            <div><h1 className="text-2xl font-bold md:text-4xl">{s.name}</h1><p className="text-sm text-muted-foreground">NSE: {s.symbol} · {s.sector}{s.psu ? " · PSU" : ""}</p></div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{fmtINR(s.price)}</p><Change v={s.changePct} />
            <div className="mt-2 flex items-center justify-end gap-2"><RatingPill r={s.rating} />
              <button onClick={() => { setWl(inWl ? wl.filter((x) => x !== s.symbol) : [...wl, s.symbol]); toast.success(inWl ? "Removed from watchlist" : "Added to watchlist"); }} className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs"><Star className={"h-3.5 w-3.5 " + (inWl ? "fill-gold text-gold" : "")} />{inWl ? "Watching" : "Watchlist"}</button>
            </div>
          </div>
        </div>
        <div className="mt-3"><DemoBadge /> <span className="ml-2 text-xs text-muted-foreground">{quote ? `Yahoo Finance quote · ${quoteTime(quote.asOf)}` : "Demo price · quote unavailable"} · Fundamentals and research: sample dataset ({DEMO_DATE})</span></div>
      </section>

      <Section title="Price chart"><div className={card}><PriceChart id={s.symbol} last={s.price} /></div></Section>

      <Section title="A. Company overview">
        <div className={card}>
          <p className="text-muted-foreground">{s.description}</p>
          <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4"><Stat label="Market cap" value={fmtCr(s.marketCap)} /><Stat label="Industry / Sector" value={s.sector} /><Stat label="Segments" value={s.segments.length} /><Stat label="Website" value={<a href={s.website} target="_blank" rel="noreferrer" className="text-primary">Visit ↗</a>} /></div>
          <div className="mt-3 flex flex-wrap gap-2">{s.segments.map((x) => <span key={x} className="rounded-full bg-muted px-3 py-1 text-xs">{x}</span>)}</div>
        </div>
      </Section>

      <Section title="B. Fundamental analysis (illustrative)">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
          <Stat label="Revenue growth" value={pct(s.salesGrowth)} /><Stat label="Net profit growth" value={pct(s.profitGrowth)} /><Stat label="Operating margin" value={s.opm + "%"} /><Stat label="EBITDA margin" value={s.ebitdaMargin + "%"} /><Stat label="ROE" value={s.roe + "%"} />
          <Stat label="ROCE" value={s.roce + "%"} /><Stat label="Debt / Equity" value={s.de} /><Stat label="EPS" value={fmtINR(s.eps)} /><Stat label="Operating cash flow" value={fmtCr(f[4]!.ocf)} /><Stat label="Working capital" value={fmtCr(f[4]!.revenue * 0.08)} />
        </div>
        <div className={card + " mt-4"}><p className="mb-2 text-sm font-semibold">5-year revenue & profit (₹ Cr)</p><MiniBars data={f.map((x) => ({ year: x.year, Revenue: x.revenue, Profit: x.profit }))} keys={[{ k: "Revenue", color: "var(--primary)" }, { k: "Profit", color: "var(--gold)" }]} /></div>
      </Section>

      <Section title="C. Financial statements (illustrative)">
        <div className={card}>
          <Tabs defaultValue="pl">
            <TabsList className="flex-wrap"><TabsTrigger value="pl">Profit & Loss</TabsTrigger><TabsTrigger value="bs">Balance Sheet</TabsTrigger><TabsTrigger value="cf">Cash Flow</TabsTrigger><TabsTrigger value="q">Quarterly</TabsTrigger><TabsTrigger value="a">Annual</TabsTrigger></TabsList>
            <TabsContent value="pl"><Table head={["₹ Cr", ...f.map((x) => x.year)]} rows={[["Revenue", ...f.map((x) => x.revenue)], ["EBITDA", ...f.map((x) => x.ebitda)], ["Net profit", ...f.map((x) => x.profit)], ["EPS (₹)", ...f.map((x) => x.eps)]]} /></TabsContent>
            <TabsContent value="bs"><Table head={["₹ Cr", ...f.map((x) => x.year)]} rows={[["Total assets", ...f.map((x) => Math.round(x.revenue * 1.4))], ["Net worth", ...f.map((x) => Math.round(x.profit / (s.roe / 100)))], ["Borrowings", ...f.map((x) => Math.round((x.profit / (s.roe / 100)) * s.de))]]} /></TabsContent>
            <TabsContent value="cf"><Table head={["₹ Cr", ...f.map((x) => x.year)]} rows={[["Operating CF", ...f.map((x) => x.ocf)], ["Investing CF", ...f.map((x) => -Math.round(x.ocf * 0.6))], ["Financing CF", ...f.map((x) => -Math.round(x.ocf * 0.3))]]} /></TabsContent>
            <TabsContent value="q"><Table head={["₹ Cr", ...s.quarterly.map((x) => x.q)]} rows={[["Revenue", ...s.quarterly.map((x) => x.revenue)], ["Net profit", ...s.quarterly.map((x) => x.profit)]]} /></TabsContent>
            <TabsContent value="a"><Table head={["Year", "Revenue", "Profit", "Margin"]} rows={f.map((x) => [x.year, x.revenue, x.profit, ((x.profit / x.revenue) * 100).toFixed(1) + "%"])} /></TabsContent>
          </Tabs>
        </div>
      </Section>

      <Section title="D. Valuation analysis">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-6"><Stat label="P/E" value={s.pe} /><Stat label="P/B" value={s.pb} /><Stat label="EV/EBITDA" value={s.evEbitda} /><Stat label="Price/Sales" value={s.ps} /><Stat label="EPS" value={fmtINR(s.eps)} /><Stat label="Dividend yield" value={s.divYield + "%"} /></div>
        <div className={card + " mt-4"}><p className="mb-2 text-sm font-semibold">Peer comparison — {s.sector}</p>
          {peers.length ? <Table head={["Company", "CMP", "P/E", "P/B", "ROE", "D/E"]} rows={[s, ...peers].map((p) => [p.name, p.price, p.pe, p.pb, p.roe + "%", p.de])} /> : <p className="text-sm text-muted-foreground">No sector peers in the demo universe.</p>}
        </div>
      </Section>

      <Section title="E. Technical analysis">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-5"><Stat label="RSI (14)" value={s.rsi} /><Stat label="MACD" value={s.macd} /><Stat label="Support" value={fmtINR(s.price * 0.95)} /><Stat label="Resistance" value={fmtINR(s.price * 1.06)} /><Stat label="Volume" value={s.volume.toLocaleString("en-IN")} /></div>
        <div className={card + " mt-4"}><TechnicalChart id={s.symbol} last={s.price} /></div>
      </Section>

      <Section title="F. Shareholding pattern">
        <div className={card + " space-y-3"}>
          {([["Promoter" + (s.psu ? " (Government)" : ""), h.promoter], ["FII", h.fii], ["DII", h.dii], ["of which Mutual Funds", h.mf], ["Public", h.public]] as const).map(([l, v]) => (
            <div key={l}><div className="flex justify-between text-sm"><span>{l}</span><span>{v}%</span></div><div className="mt-1 h-2 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: v + "%" }} /></div></div>
          ))}
        </div>
      </Section>

      <Section title="G. SWOT analysis">
        <div className="grid gap-4 md:grid-cols-2">
          {[["Strengths", [`Established position in ${s.sector}`, `ROE of ${s.roe}% in demo data`]], ["Weaknesses", [s.de > 1 ? "Elevated leverage" : "Limited pricing power in some segments", "Cyclical exposure"]], ["Opportunities", ["Domestic demand growth", `Expansion in ${s.segments[0] ?? s.sector}`]], ["Threats", ["Regulatory changes", "Competitive intensity"]]].map(([t, items]) => (
            <div key={t as string} className={card}><p className="font-semibold text-gold">{t as string}</p><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">{(items as string[]).map((i) => <li key={i}>{i}</li>)}</ul></div>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Illustrative template points for demonstration.</p>
      </Section>

      <Section title="H. Research conclusion">
        <div className={card + " grid gap-3 md:grid-cols-2"}>
          {([["Financial strength", s.de < 0.5 ? "Conservative balance sheet" : "Moderate leverage to monitor"], ["Business quality", s.roce > 18 ? "High capital efficiency" : "Average capital efficiency"], ["Valuation", s.pe > 35 ? "Premium valuation" : "Reasonable valuation"], ["Growth", `Sales growth of ${s.salesGrowth}%`], ["Risk assessment", `${s.risk} risk`], ["Overall", `Illustrative ${s.rating} opinion · target ${fmtINR(s.target)} · stop loss ${fmtINR(s.stopLoss)}`]] as [string, string][]).map(([k, v]) => <Stat key={k as string} label={k} value={v} />)}
        </div>
      </Section>

      <Section title="I. Corporate actions">
        <div className="grid gap-4 md:grid-cols-2">
          <div className={card}><p className="mb-2 font-semibold">Dividend history (₹/share)</p><Table head={["Year", "Dividend"]} rows={s.dividends.map((d) => [d.year, d.amount])} /></div>
          <div className={card}><p className="mb-2 font-semibold">Bonus, splits & announcements</p><ul className="space-y-2 text-sm text-muted-foreground"><li>Bonus history: none in demo dataset</li><li>Stock split history: none in demo dataset</li><li>Board meeting for quarterly results — demo announcement</li></ul></div>
        </div>
      </Section>
    </div>
  );
}
