import { Link } from "@tanstack/react-router";
import { Logo, RatingPill } from "@/components/common";
import { pct } from "@/lib/data/provider";
import type { Stock } from "@/lib/data/stocks";
import { useMarketData } from "@/hooks/use-market-data";
import { quoteTime } from "@/lib/data/quotes";

export function RecoCard({ s }: { s: Stock }) {
  const quote = useMarketData().quote(s.symbol);
  const ret = ((s.target - s.price) / s.price) * 100;
  return (
    <Link to="/stocks/$symbol" params={{ symbol: s.symbol }} className="glass glow-hover block rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3"><Logo s={s} /><div><p className="font-semibold">{s.name}</p><p className="text-xs text-muted-foreground">{s.symbol} · {s.sector}</p></div></div>
        <RatingPill r={s.rating} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <div><p className="text-[11px] text-muted-foreground">CMP</p><p className="font-semibold">₹{s.price}</p></div>
        <div><p className="text-[11px] text-muted-foreground">Target</p><p className="font-semibold">₹{s.target}</p></div>
        <div><p className="text-[11px] text-muted-foreground">Exp. return</p><p className={ret >= 0 ? "font-semibold text-primary" : "font-semibold text-destructive"}>{pct(ret)}</p></div>
      </div>
      <p className="mt-2 text-[10px] text-muted-foreground">{quote ? `Quote: ${quoteTime(quote.asOf)}` : "Demo price"} · Target and rating are illustrative</p>
      <div className="mt-3 h-1.5 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: s.confidence + "%" }} /></div>
      <p className="mt-1 text-[11px] text-muted-foreground">Confidence {s.confidence}% · {s.risk} risk · {s.horizon}</p>
    </Link>
  );
}

