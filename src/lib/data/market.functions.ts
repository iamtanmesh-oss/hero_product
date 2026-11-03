import { createServerFn } from "@tanstack/react-start";
import { SEEDS } from "./stocks";
import { INDEX_SYMBOLS, parseQuote, type Quote } from "./quotes";

let cached: { quotes: Quote[]; fetchedAt: number } | undefined;
let pending: Promise<{ quotes: Quote[]; fetchedAt: number }> | undefined;

export const getMarketQuotes = createServerFn({ method: "GET" }).handler(async () => {
  if (cached && Date.now() - cached.fetchedAt < 300_000) return cached;
  if (pending) return pending;
  pending = (async () => {
    const symbols = [...INDEX_SYMBOLS.map((index) => index.symbol), ...SEEDS.map((stock) => stock.symbol + ".NS")];
    const quotes: Quote[] = [];
    // Fixed allowlist, bounded concurrency, timeouts and caching keep this public read bounded.
    for (let i = 0; i < symbols.length; i += 8) {
      const batch = await Promise.all(symbols.slice(i, i + 8).map(async (symbol) => {
        try {
          const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1d&interval=1d`, {
            headers: { "User-Agent": "Mozilla/5.0", Accept: "application/json" },
            signal: AbortSignal.timeout(8000),
          });
          if (!response.ok) return null;
          return parseQuote(symbol, await response.json());
        } catch { return null; }
      }));
      quotes.push(...batch.filter((quote): quote is Quote => quote !== null));
    }
    // Keep last verified quotes for failed symbols without changing their source timestamps.
    const bySymbol = new Map(cached?.quotes.map((quote) => [quote.symbol, quote]));
    quotes.forEach((quote) => bySymbol.set(quote.symbol, quote));
    cached = { quotes: [...bySymbol.values()], fetchedAt: Date.now() };
    return cached;
  })();
  try { return await pending; } finally { pending = undefined; }
});