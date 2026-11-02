import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Change, PageHeader, Section, StockRow } from "@/components/common";
import { MiniBars, PriceChart } from "@/components/PriceChart";
import { useMarketData } from "@/hooks/use-market-data";
import { quoteTime } from "@/lib/data/quotes";
import { Button } from "@/components/ui/button";
import { marketData } from "@/lib/data/provider";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/dashboard")({ head: () => seo("Market Dashboard", "Indices, gainers, losers, sector heatmap, market breadth and FII/DII activity — demonstration data."), component: Dashboard });

function Dashboard() {
  const data = useMarketData();
  const all = data.all();
  const indices = data.indices();
  const [selected, setSelected] = useState("NIFTY 50");
  const sel = indices.find((index) => index.name === selected) ?? indices[0];
  const by = (k: (s: (typeof all)[0]) => number) => [...all].sort((a, b) => k(b) - k(a));
  const sectors = Object.entries(all.reduce<Record<string, number[]>>((m, s) => ((m[s.sector] ??= []).push(s.changePct), m), {})).map(([sector, v]) => ({ sector, chg: +(v.reduce((a, b) => a + b, 0) / v.length).toFixed(2) }));
  const adv = all.filter((s) => s.changePct > 0).length;
  return (
    <div>
      <PageHeader eyebrow="Markets" title="Market Dashboard" subtitle="A consolidated view of Indian and global market indicators." />
      <Section title="Indices & instruments">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
          {indices.map((x) => (
            <Button variant="outline" key={x.name} onClick={() => setSelected(x.name)} className={"glass h-auto flex-col items-start whitespace-normal rounded-lg p-4 text-left " + (sel?.name === x.name ? "border-primary" : "")}>
              <span className="text-xs text-muted-foreground">{x.name}</span><span className="mt-1 font-bold">{x.value.toLocaleString("en-IN")}</span><Change v={x.changePct} className="text-xs" /><span className="text-[10px] text-muted-foreground">{quoteTime(x.asOf)}</span>
            </Button>
          ))}
        </div>
        {sel ? <div className="glass mt-5 rounded-2xl p-5"><p className="mb-3 font-semibold">{sel.name}</p><PriceChart id={sel.name} last={sel.value} /></div> : <p className="mt-4 text-sm text-muted-foreground">Waiting for verified index quotes.</p>}
      </Section>
      <div className="mx-auto grid max-w-7xl gap-5 px-5 py-6 md:grid-cols-2 lg:grid-cols-3">
        {([["Top Gainers", by((s) => s.changePct).slice(0, 5)], ["Top Losers", by((s) => -s.changePct).slice(0, 5)], ["Most Active", by((s) => s.volume).slice(0, 5)], ["Near 52-Week High", by((s) => s.price / s.high52).slice(0, 5)], ["Near 52-Week Low", by((s) => s.low52 / s.price).slice(0, 5)]] as const).map(([t, l]) => (
          <div key={t} className="glass rounded-2xl p-3"><p className="px-3 py-2 font-semibold">{t}</p>{l.map((s) => <StockRow key={s.symbol} s={s} />)}</div>
        ))}
        <div className="glass rounded-2xl p-5">
          <p className="font-semibold">Market Breadth</p>
          <div className="mt-4 flex h-3 overflow-hidden rounded-full"><div className="bg-primary" style={{ width: (adv / all.length) * 100 + "%" }} /><div className="flex-1 bg-destructive" /></div>
          <p className="mt-2 text-sm text-muted-foreground">{adv} advancing · {all.length - adv} declining</p>
          <p className="mt-6 font-semibold">FII / DII activity (₹ Cr · demo)</p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm"><div className="rounded-lg bg-muted/60 p-3">FII <span className="block font-bold text-destructive">−1,842</span></div><div className="rounded-lg bg-muted/60 p-3">DII <span className="block font-bold text-primary">+2,315</span></div></div>
        </div>
      </div>
      <Section title="Sector Heatmap">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
          {sectors.map((s) => (
            <div key={s.sector} className={"rounded-xl p-4 " + (s.chg >= 0 ? "bg-primary/20" : "bg-destructive/20")} style={{ opacity: 0.55 + Math.min(Math.abs(s.chg) / 3, 0.45) }}>
              <p className="text-sm font-semibold">{s.sector}</p><Change v={s.chg} className="text-xs" />
            </div>
          ))}
        </div>
        <div className="glass mt-5 rounded-2xl p-5"><p className="mb-3 font-semibold">Sector performance (%)</p><MiniBars data={sectors} keys={[{ k: "chg", color: "var(--primary)" }]} /></div>
      </Section>
    </div>
  );
}
