import { useSyncExternalStore } from "react";
import { marketData } from "@/lib/data/provider";

export function useMarketData() {
  const revision = useSyncExternalStore(marketData.subscribe, marketData.revision, () => 0);
  return revision === 0 ? hydrationData : marketData;
}

// Lazy route chunks may hydrate after the shared feed effect has already run.
// Keep their first render identical to SSR, then expose verified client quotes.
const hydrationData: typeof marketData = {
  ...marketData,
  all: marketData.demoStocks,
  get: (symbol) => marketData.demoStocks().find((stock) => stock.symbol === symbol.toUpperCase()),
  quote: () => undefined,
  indices: () => [],
  status: () => "Demo",
};