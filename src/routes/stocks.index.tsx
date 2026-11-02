import { useMarketData } from "@/hooks/use-market-data";
import { quoteTime } from "@/lib/data/quotes";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Change, PageHeader, RatingPill } from "@/components/common";
import { marketData } from "@/lib/data/provider";
import type { Stock } from "@/lib/data/stocks";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/stocks/")({ head: () => seo("Stock Screener", "Filter and sort 20 Indian companies by valuation, returns, growth and technical indicators."), component: Screener });

type K = keyof Stock;
const COLS: [K, string][] = [["price", "CMP"], ["changePct", "Chg %"], ["marketCap", "MCap Cr"], ["pe", "P/E"], ["pb", "P/B"], ["roe", "ROE"], ["roce", "ROCE"], ["de", "D/E"], ["salesGrowth", "Sales gr."], ["profitGrowth", "Profit gr."], ["epsGrowth", "EPS gr."], ["divYield", "Div %"], ["volume", "Volume"], ["rsi", "RSI"], ["macd", "MACD"], ["high52", "52W H"], ["low52", "52W L"]];
const FILTERS: [K, string][] = [["pe", "Max P/E"], ["pb", "Max P/B"], ["de", "Max D/E"]];
const MINS: [K, string][] = [["roe", "Min ROE"], ["roce", "Min ROCE"], ["divYield", "Min Div %"], ["salesGrowth", "Min sales gr."], ["profitGrowth", "Min profit gr."]];

function Screener() {
  const nav = useNavigate();
  const all = useMarketData().all();
  const [q, setQ] = useState("");
  const [sector, setSector] = useState("");
  const [cap, setCap] = useState("");
  const [lim, setLim] = useState<Record<string, string>>({});
  const [sort, setSort] = useState<{ k: K; d: 1 | -1 }>({ k: "marketCap", d: -1 });
  const rows = useMemo(() => all
    .filter((s) => (!q || (s.name + s.symbol).toLowerCase().includes(q.toLowerCase())) && (!sector || s.sector === sector) && (!cap || s.capBucket === cap))
    .filter((s) => FILTERS.every(([k]) => !lim[k] || (s[k] as number) <= +lim[k]) && MINS.every(([k]) => !lim[k] || (s[k] as number) >= +lim[k]))
    .sort((a, b) => ((a[sort.k] as number) - (b[sort.k] as number)) * sort.d), [all, q, sector, cap, lim, sort]);
  const input = "rounded-lg border border-input bg-secondary px-3 py-2 text-sm";
  return (
    <div>
      <PageHeader eyebrow="Stock Research" title="Stock Screener" subtitle="Latest available prices for the IndexBaazaar stock universe. Fundamentals and opinions are illustrative." />
      <div className="mx-auto max-w-7xl px-5">
        <div className="glass grid gap-2 rounded-2xl p-4 sm:grid-cols-2 lg:grid-cols-6">
          <input className={input + " lg:col-span-2"} placeholder="Search company or symbol" value={q} onChange={(e) => setQ(e.target.value)} />
          <select className={input} value={sector} onChange={(e) => setSector(e.target.value)}><option value="">All sectors</option>{[...new Set(all.map((s) => s.sector))].map((s) => <option key={s}>{s}</option>)}</select>
          <select className={input} value={cap} onChange={(e) => setCap(e.target.value)}><option value="">All caps</option>{["Large", "Mid", "Small"].map((s) => <option key={s}>{s}</option>)}</select>
          {[...FILTERS, ...MINS].map(([k, l]) => (
            <input key={k} type="number" className={input} placeholder={l} value={lim[k] ?? ""} onChange={(e) => setLim({ ...lim, [k]: e.target.value })} />
          ))}
          <button className="rounded-lg bg-muted px-3 py-2 text-sm" onClick={() => { setLim({}); setQ(""); setSector(""); setCap(""); }}>Reset</button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{rows.length} of {all.length} companies</p>
        <div className="glass mt-3 overflow-x-auto rounded-2xl">
          <table className="w-full min-w-[1400px] text-sm">
            <thead><tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="p-3">Company</th><th className="p-3">Opinion</th>
              {COLS.map(([k, l]) => <th key={k} className="cursor-pointer p-3 hover:text-foreground" onClick={() => setSort({ k, d: sort.k === k ? (sort.d === 1 ? -1 : 1) : -1 })}>{l}{sort.k === k ? (sort.d === 1 ? " ↑" : " ↓") : ""}</th>)}
            </tr></thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.symbol} onClick={() => nav({ to: "/stocks/$symbol", params: { symbol: s.symbol } })} className="cursor-pointer border-b border-border/50 hover:bg-muted/50">
                  <td className="p-3"><p className="font-semibold">{s.symbol}</p><p className="text-xs text-muted-foreground">{s.name} · {s.sector}</p><p className="text-[10px] text-muted-foreground">{marketData.quote(s.symbol) ? quoteTime(marketData.quote(s.symbol)?.asOf ?? "") : "Demo price"}</p></td>
                  <td className="p-3"><RatingPill r={s.rating} /></td>
                  {COLS.map(([k]) => <td key={k} className="p-3">{k === "changePct" ? <Change v={s.changePct} /> : (s[k] as number).toLocaleString("en-IN")}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
