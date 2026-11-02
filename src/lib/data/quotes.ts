export type Quote = {
  symbol: string;
  price: number;
  change: number;
  changePct: number;
  asOf: string;
  volume?: number;
  high52?: number;
  low52?: number;
};

export const INDEX_SYMBOLS = [
  { name: "NIFTY 50", symbol: "^NSEI" },
  { name: "SENSEX", symbol: "^BSESN" },
  { name: "BANK NIFTY", symbol: "^NSEBANK" },
  { name: "NIFTY MIDCAP 100", symbol: "NIFTY_MIDCAP_100.NS" },
  { name: "NIFTY IT", symbol: "^CNXIT" },
  { name: "INDIA VIX", symbol: "^INDIAVIX" },
  { name: "USD/INR", symbol: "INR=X" },
  { name: "BITCOIN", symbol: "BTC-INR", unit: "₹" },
] as const;

type YahooResponse = { chart?: { result?: { meta?: {
  regularMarketPrice?: number; regularMarketTime?: number;
  chartPreviousClose?: number; previousClose?: number;
  regularMarketVolume?: number; fiftyTwoWeekHigh?: number; fiftyTwoWeekLow?: number;
} }[] } };

export function parseQuote(symbol: string, input: unknown): Quote | null {
  const meta = (input as YahooResponse | null)?.chart?.result?.[0]?.meta;
  if (!meta) return null;
  const price = meta.regularMarketPrice;
  const previous = meta.chartPreviousClose ?? meta.previousClose;
  const time = meta.regularMarketTime;
  if (typeof price !== "number" || !Number.isFinite(price) || price <= 0 ||
      typeof previous !== "number" || !Number.isFinite(previous) || previous <= 0 ||
      typeof time !== "number" || !Number.isFinite(time) || time <= 0) return null;
  const date = new Date(time * 1000);
  if (!Number.isFinite(date.getTime())) return null;
  return {
    symbol, price, change: price - previous, changePct: (price - previous) / previous * 100,
    asOf: date.toISOString(),
    ...(Number.isFinite(meta.regularMarketVolume) ? { volume: meta.regularMarketVolume } : {}),
    ...(Number.isFinite(meta.fiftyTwoWeekHigh) ? { high52: meta.fiftyTwoWeekHigh } : {}),
    ...(Number.isFinite(meta.fiftyTwoWeekLow) ? { low52: meta.fiftyTwoWeekLow } : {}),
  };
}

export function quoteTime(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata", day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: false,
  }) + " IST";
}