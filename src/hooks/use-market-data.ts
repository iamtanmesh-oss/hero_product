import { useSyncExternalStore } from "react";
import { marketData } from "@/lib/data/provider";

export function useMarketData() {
  useSyncExternalStore(marketData.subscribe, marketData.revision, () => 0);
  return marketData;
}