import { describe, expect, it } from "vitest";
import { parseQuote } from "@/lib/data/quotes";
import { marketData } from "@/lib/data/provider";

describe("Verified market quotes", () => {
  it("uses the source price, previous close and source timestamp", () => {
    const quote = parseQuote("^NSEI", { chart: { result: [{ meta: { regularMarketPrice: 25000, chartPreviousClose: 24750, regularMarketTime: 1793593813 } }] } });
    expect(quote?.price).toBe(25000);
    expect(quote?.change).toBe(250);
    expect(quote?.changePct).toBeCloseTo(1.010101);
    expect(quote?.asOf).toBe("2026-11-02T04:30:13.000Z");
  });
  it("rejects missing timestamps and invalid prices instead of inventing current data", () => {
    expect(parseQuote("^NSEI", { chart: { result: [{ meta: { regularMarketPrice: 25000, chartPreviousClose: 24750 } }] } })).toBeNull();
    expect(parseQuote("^NSEI", { chart: { result: [{ meta: { regularMarketPrice: 0, chartPreviousClose: 24750, regularMarketTime: 1793593813 } }] } })).toBeNull();
  });
  it("updates shared stock prices while preserving illustrative fundamentals and verified timestamps", () => {
    const before = marketData.get("RELIANCE");
    const sbin = marketData.get("SBIN")?.price;
    marketData.apply([{ symbol: "RELIANCE.NS", price: 1236.6, change: 10, changePct: 0.815, asOf: "2026-11-02T04:30:13.000Z" }]);
    expect(marketData.get("RELIANCE")?.price).toBe(1236.6);
    expect(marketData.get("RELIANCE")?.roe).toBe(before?.roe);
    expect(marketData.get("SBIN")?.price).toBe(sbin);
    expect(marketData.quote("SBIN")).toBeUndefined();
    marketData.apply([]);
    expect(marketData.quote("RELIANCE")?.asOf).toBe("2026-11-02T04:30:13.000Z");
  });
  it("exposes only verified index values, never demo index values", () => {
    marketData.apply([{ symbol: "^NSEI", price: 25000, change: 250, changePct: 1.01, asOf: "2026-11-02T04:30:13.000Z" }]);
    expect(marketData.indices().find((index) => index.name === "NIFTY 50")?.value).toBe(25000);
    expect(marketData.indices().some((index) => index.name === "SENSEX")).toBe(false);
  });
});