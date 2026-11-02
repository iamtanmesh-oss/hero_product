/**
 * Market data provider architecture.
 * UI talks only to `marketData`. Swapping in a licensed feed means implementing
 * `MarketDataProvider` and registering it in `providers` — no UI changes.
 */
import { SEEDS, buildStock, type Stock, DEMO_DATE } from "./stocks";
import { INDEX_SYMBOLS, type Quote } from "./quotes";

export type DataStatus = "Live" | "Delayed" | "End-of-day" | "Historical" | "Demo";

export interface MarketDataProvider {
  id: string;
  status: DataStatus;
  getStocks(): Stock[];
}

// 1. Demo Data Provider
const demoProvider: MarketDataProvider = {
  id: "demo",
  status: "Demo",
  getStocks: () => SEEDS.map(buildStock),
};

// 2. Future Licensed Market Data Provider (inactive until credentials exist)
const licensedProvider: MarketDataProvider = {
  id: "licensed",
  status: "Delayed",
  getStocks: () => {
    throw new Error("Licensed market data provider not configured");
  },
};

// 4. Data Validation Layer
function validate(stocks: Stock[]): Stock[] {
  return stocks.filter((s) => Number.isFinite(s.price) && s.price > 0 && s.symbol && s.name);
}

// 3 + 5. Refresh manager with fallback
const providers = [licensedProvider, demoProvider];
let cache: { stocks: Stock[]; status: DataStatus; updated: string } | null = null;

function refresh() {
  for (const p of providers) {
    try {
      const stocks = validate(p.getStocks());
      if (stocks.length) {
        cache = { stocks, status: p.status, updated: DEMO_DATE };
        return cache;
      }
    } catch {
      /* fall through to next provider */
    }
  }
  cache = { stocks: [], status: "Demo", updated: DEMO_DATE };
  return cache;
}

export const marketData = {
  demoStocks: () => (cache ?? refresh()).stocks,
  all: () => currentStocks ?? (cache ?? refresh()).stocks,
  status: (): DataStatus => quotes.size ? "Delayed" : "Demo",
  updated: () => [...quotes.values()].map((q) => q.asOf).sort().at(-1) ?? DEMO_DATE,
  get: (symbol: string) => marketData.all().find((s) => s.symbol === symbol.toUpperCase()),
  quote: (symbol: string) => quotes.get(symbol.endsWith(".NS") || symbol.startsWith("^") ? symbol : symbol + ".NS"),
  indices: () => INDEX_SYMBOLS.flatMap((index) => {
    const quote = quotes.get(index.symbol);
    return quote ? [{ ...index, value: quote.price, change: quote.change, changePct: quote.changePct, asOf: quote.asOf }] : [];
  }),
  apply: (incoming: Quote[]) => {
    incoming.forEach((q) => quotes.set(q.symbol, q));
    currentStocks = (cache ?? refresh()).stocks.map((stock) => {
      const q = quotes.get(stock.symbol + ".NS");
      return q ? { ...stock, price: q.price, change: q.change, changePct: q.changePct,
        volume: q.volume ?? stock.volume, high52: q.high52 ?? stock.high52, low52: q.low52 ?? stock.low52 } : stock;
    });
    revision++;
    listeners.forEach((listener) => listener());
  },
  subscribe: (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; },
  revision: () => revision,
  refresh,
};

const quotes = new Map<string, Quote>();
let currentStocks: Stock[] | undefined;
let revision = 0;
const listeners = new Set<() => void>();

export const fmtINR = (n: number, d = 2) => "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: d, minimumFractionDigits: d });
export const fmtCr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN") + " Cr";
export const pct = (n: number) => (n > 0 ? "+" : "") + n.toFixed(2) + "%";
