import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMarketQuotes } from "@/lib/data/market.functions";
import { useMarketData } from "@/hooks/use-market-data";
import { quoteTime } from "@/lib/data/quotes";

export function MarketFeed() {
  const data = useMarketData();
  const query = useQuery({ queryKey: ["market-quotes"], queryFn: () => getMarketQuotes(), staleTime: 300_000, refetchInterval: 300_000, retry: 1 });
  useEffect(() => { if (query.data) data.apply(query.data.quotes); }, [query.data, data]);
  return <div className="border-b border-border bg-secondary/60">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-2 text-xs text-muted-foreground" role="status">
      <p>{data.status() === "Demo" ? (query.isFetching ? "Fetching market quotes…" : "Market feed unavailable · stock prices are demo values") : `Yahoo Finance · latest available quotes · ${quoteTime(data.updated())}`}
        <span className="block">Quotes may be delayed; check each quote’s time. Research and technical charts remain illustrative.</span>
      </p>
      <Button variant="ghost" size="icon" title="Refresh market quotes" aria-label="Refresh market quotes" disabled={query.isFetching} onClick={() => void query.refetch()}><RefreshCw className={query.isFetching ? "animate-spin" : ""} /></Button>
    </div>
  </div>;
}