import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, Section } from "@/components/common";
import { marketData, fmtCr } from "@/lib/data/provider";
import type { Stock } from "@/lib/data/stocks";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/compare")({ head: () => seo("Compare Stocks", "Compare up to four Indian companies side by side on growth, returns and valuation."), component: Compare });

const COLORS = ["var(--primary)", "var(--gold)", "var(--chart-2, #4fc3f7)", "var(--destructive)"];
const METRICS: [keyof Stock, string][] = [["salesGrowth", "Revenue growth %"], ["profitGrowth", "Profit growth %"], ["roe", "ROE %"], ["roce", "ROCE %"], ["pe", "P/E"], ["pb", "P/B"], ["de", "Debt/Equity"], ["eps", "EPS ₹"], ["divYield", "Dividend yield %"], ["marketCap", "Market cap"]];

function Compare() {
  const all = marketData.all();
  const [sel, setSel] = useState<string[]>(["HDFCBANK", "ICICIBANK", "SBIN"]);
  const stocks = sel.map((x) => marketData.get(x)!).filter(Boolean);
  const chart = METRICS.slice(0, 6).map(([k, l]) => Object.fromEntries([["metric", l], ...stocks.map((s) => [s.symbol, s[k] as number])]));
  return (
    <div>
      <PageHeader eyebrow="Stock Research" title="Compare Stocks" subtitle="Pick up to four companies — ideally from the same sector — to compare side by side." />
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-wrap gap-2">
          {all.map((s) => {
            const on = sel.includes(s.symbol);
            return <button key={s.symbol} disabled={!on && sel.length >= 4} onClick={() => setSel(on ? sel.filter((x) => x !== s.symbol) : [...sel, s.symbol])} className={"rounded-full px-3 py-1.5 text-xs font-medium disabled:opacity-40 " + (on ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>{s.symbol}</button>;
          })}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{sel.length}/4 selected</p>
      </div>
      {stocks.length > 0 && (
        <>
          <Section title="Comparison table">
            <div className="glass overflow-x-auto rounded-2xl">
              <table className="w-full min-w-[560px] text-sm">
                <thead><tr className="border-b border-border text-left"><th className="p-3 text-xs text-muted-foreground">Metric</th>{stocks.map((s) => <th key={s.symbol} className="p-3">{s.name}</th>)}</tr></thead>
                <tbody>{METRICS.map(([k, l]) => (
                  <tr key={k} className="border-b border-border/40"><td className="p-3 text-muted-foreground">{l}</td>{stocks.map((s) => <td key={s.symbol} className="p-3 font-medium">{k === "marketCap" ? fmtCr(s.marketCap) : (s[k] as number)}</td>)}</tr>
                ))}</tbody>
              </table>
            </div>
          </Section>
          <Section title="Comparison chart">
            <div className="glass rounded-2xl p-5">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={chart}>
                  <XAxis dataKey="metric" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                  <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)" }} />
                  <Legend />
                  {stocks.map((s, i) => <Bar key={s.symbol} dataKey={s.symbol} fill={COLORS[i]} radius={[4, 4, 0, 0]} />)}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Section>
        </>
      )}
    </div>
  );
}
