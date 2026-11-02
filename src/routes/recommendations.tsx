import { useMarketData } from "@/hooks/use-market-data";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/common";
import { marketData, fmtCr } from "@/lib/data/provider";
import { RecoCard } from "@/components/RecoCard";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/recommendations")({ head: () => seo("Stock Recommendations", "Illustrative BUY, SELL and HOLD research examples with targets, stop loss, risk and valuation metrics."), component: Recos });

const Sel = ({ v, set, opts, label }: { v: string; set: (s: string) => void; opts: string[]; label: string }) => (
  <select value={v} onChange={(e) => set(e.target.value)} aria-label={label} className="rounded-lg border border-input bg-secondary px-3 py-2 text-sm">
    <option value="">{label}: All</option>
    {opts.map((o) => <option key={o}>{o}</option>)}
  </select>
);

function Recos() {
  const all = useMarketData().all();
  const [rating, setRating] = useState("");
  const [sector, setSector] = useState("");
  const [cap, setCap] = useState("");
  const [risk, setRisk] = useState("");
  const [hz, setHz] = useState("");
  const list = useMemo(() => all.filter((s) => (!rating || s.rating === rating) && (!sector || s.sector === sector) && (!cap || s.capBucket === cap) && (!risk || s.risk === risk) && (!hz || s.horizon === hz)), [all, rating, sector, cap, risk, hz]);
  const uniq = (k: (s: (typeof all)[0]) => string) => [...new Set(all.map(k))];
  return (
    <div>
      <PageHeader eyebrow="Research" title="Stock Recommendations" subtitle="Illustrative research examples showing how IndexBaazaar presents research opinions. These are not real recommendations." />
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-wrap gap-2">
          {["", "BUY", "HOLD", "SELL"].map((r) => (
            <button key={r} onClick={() => setRating(r)} className={"rounded-full px-4 py-2 text-sm font-semibold " + (rating === r ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>{r || "All"}</button>
          ))}
          <Sel v={sector} set={setSector} opts={uniq((s) => s.sector)} label="Sector" />
          <Sel v={cap} set={setCap} opts={["Large", "Mid", "Small"]} label="Market cap" />
          <Sel v={risk} set={setRisk} opts={["Low", "Medium", "High"]} label="Risk" />
          <Sel v={hz} set={setHz} opts={uniq((s) => s.horizon)} label="Horizon" />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{list.length} results</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <div key={s.symbol}>
              <RecoCard s={s} />
              <div className="mt-2 grid grid-cols-4 gap-1 px-1 text-[11px] text-muted-foreground">
                <span>P/E {s.pe}</span><span>ROE {s.roe}%</span><span>ROCE {s.roce}%</span><span>D/E {s.de}</span>
                <span>Div {s.divYield}%</span><span>SL ₹{s.stopLoss}</span><span className="col-span-2">{fmtCr(s.marketCap)}</span>
              </div>
            </div>
          ))}
          {list.length === 0 && <p className="text-muted-foreground">No recommendations match these filters.</p>}
        </div>
      </div>
    </div>
  );
}
