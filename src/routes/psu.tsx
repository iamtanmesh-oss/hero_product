import { useMarketData } from "@/hooks/use-market-data";
import { quoteTime } from "@/lib/data/quotes";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Change, PageHeader, Section } from "@/components/common";
import { MiniBars } from "@/components/PriceChart";
import { marketData, fmtCr } from "@/lib/data/provider";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/psu")({ head: () => seo("PSU Stock Research & Analysis", "Screen and compare public sector companies on dividends, government ownership, debt and performance."), component: PSU });

const CATS: Record<string, string> = { Banking: "PSU Banking", Power: "Power", "Oil & Gas": "Oil & Gas", Defence: "Defence", Mining: "Mining", Infrastructure: "Infrastructure" };

function PSU() {
  const psu = useMarketData().all().filter((s) => s.psu);
  const [cat, setCat] = useState("");
  const list = psu.filter((s) => !cat || CATS[s.sector] === cat);
  return (
    <div>
      <PageHeader eyebrow="PSU" title="PSU Stock Research & Analysis" subtitle="A dedicated dashboard for India's public sector companies." />
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-wrap gap-2">{["", ...Object.values(CATS)].map((c) => <button key={c} onClick={() => setCat(c)} className={"rounded-full px-4 py-2 text-sm " + (cat === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>{c || "All PSU"}</button>)}</div>
      </div>
      <Section title="PSU screener & peer comparison">
        <div className="glass overflow-x-auto rounded-2xl">
          <table className="w-full min-w-[800px] text-sm">
            <thead><tr className="border-b border-border text-left text-xs text-muted-foreground">{["Company", "Category", "CMP", "Chg", "Govt stake", "Div yield", "D/E", "ROE", "P/E", "Mcap"].map((h) => <th key={h} className="p-3">{h}</th>)}</tr></thead>
            <tbody>{list.map((s) => (
              <tr key={s.symbol} className="border-b border-border/40">
                <td className="p-3"><Link to="/stocks/$symbol" params={{ symbol: s.symbol }} className="font-semibold hover:text-primary">{s.name}</Link><p className="text-[10px] text-muted-foreground">{marketData.quote(s.symbol) ? quoteTime(marketData.quote(s.symbol)?.asOf ?? "") : "Demo price"}</p></td>
                <td className="p-3">{CATS[s.sector]}</td><td className="p-3">₹{s.price}</td><td className="p-3"><Change v={s.changePct} /></td><td className="p-3">{s.govtStake}%</td><td className="p-3">{s.divYield}%</td><td className="p-3">{s.de}</td><td className="p-3">{s.roe}%</td><td className="p-3">{s.pe}</td><td className="p-3">{fmtCr(s.marketCap)}</td>
              </tr>
            ))}</tbody>
          </table>
          {list.length === 0 && <p className="p-5 text-sm text-muted-foreground">No PSU companies in this category in the demo universe yet.</p>}
        </div>
      </Section>
      <div className="mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-2">
        <div className="glass rounded-2xl p-5"><p className="mb-2 font-semibold">Dividend yield analysis (%)</p><MiniBars data={psu.map((s) => ({ s: s.symbol, "Div %": s.divYield }))} keys={[{ k: "Div %", color: "var(--gold)" }]} /></div>
        <div className="glass rounded-2xl p-5"><p className="mb-2 font-semibold">Government ownership (%)</p><MiniBars data={psu.map((s) => ({ s: s.symbol, Govt: s.govtStake ?? 0 }))} keys={[{ k: "Govt", color: "var(--primary)" }]} /></div>
        <div className="glass rounded-2xl p-5"><p className="mb-2 font-semibold">Debt analysis (D/E)</p><MiniBars data={psu.map((s) => ({ s: s.symbol, "D/E": s.de }))} keys={[{ k: "D/E", color: "var(--destructive)" }]} /></div>
        <div className="glass rounded-2xl p-5"><p className="mb-2 font-semibold">Capital expenditure proxy — FY26 investing outflow (₹ Cr)</p><MiniBars data={psu.map((s) => ({ s: s.symbol, Capex: Math.round(s.financials[4]!.ocf * 0.6) }))} keys={[{ k: "Capex", color: "var(--primary)" }]} /></div>
      </div>
      <Section title="Research reports">
        <div className="grid gap-3 md:grid-cols-3">{psu.map((s) => <Link key={s.symbol} to="/stocks/$symbol" params={{ symbol: s.symbol }} className="glass glow-hover rounded-xl p-4"><p className="font-semibold">{s.name}</p><p className="text-xs text-muted-foreground">Full research report →</p></Link>)}</div>
      </Section>
    </div>
  );
}
