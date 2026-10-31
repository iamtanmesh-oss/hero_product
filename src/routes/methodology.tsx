import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/methodology")({ head: () => seo("How IndexBaazaar Researches Stocks", "Our five-stage research framework: business, financial, valuation, technical and risk analysis."), component: Method });

const STAGES = [
  ["Business Analysis", ["Business Model", "Industry Position", "Competitive Advantage", "Management Quality", "Industry Growth"]],
  ["Financial Analysis", ["Revenue Growth", "Profit Growth", "EBITDA Margin", "ROE", "ROCE", "Debt-to-Equity", "Operating Cash Flow"]],
  ["Valuation Analysis", ["P/E Ratio", "P/B Ratio", "EV/EBITDA", "Peer Comparison", "Historical Valuation"]],
  ["Technical Analysis", ["Price Trends", "Moving Averages", "RSI", "MACD", "Volume", "Support and Resistance"]],
  ["Risk Assessment", ["Business Risks", "Financial Risks", "Industry Risks", "Market Risks", "Regulatory Risks"]],
] as const;

function Method() {
  const [i, setI] = useState(0);
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Methodology</p>
      <h1 className="mt-2 text-3xl font-bold md:text-5xl">How IndexBaazaar Researches Stocks</h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">Every investment idea deserves a structured approach. Our research framework combines business understanding, financial performance, valuation, technical trends and risk assessment.</p>
      <div className="mt-10 grid gap-3 md:grid-cols-5">
        {STAGES.map(([t], k) => (
          <button key={t} onClick={() => setI(k)} className={"glass rounded-2xl p-4 text-left transition " + (k === i ? "border-primary shadow-[var(--shadow-glow)]" : "opacity-70 hover:opacity-100")}>
            <p className="font-display text-2xl font-bold text-primary">0{k + 1}</p><p className="mt-1 text-sm font-semibold">{t}</p>
          </button>
        ))}
      </div>
      <div className="glass mt-5 rounded-2xl p-6">
        <h2 className="text-xl font-bold">Stage {i + 1}: {STAGES[i][0]}</h2>
        <div className="mt-4 flex flex-wrap gap-2">{STAGES[i][1].map((x) => <span key={x} className="rounded-full bg-muted px-3 py-1.5 text-sm">{x}</span>)}</div>
      </div>
      <h2 className="mt-14 text-2xl font-bold">From findings to a research opinion</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {[["BUY", "text-primary", "Strong business quality and financials, reasonable valuation relative to growth, supportive trend and acceptable risk."], ["HOLD", "text-gold", "Sound business but valuation is fair or full, or near-term trend and risks suggest waiting."], ["SELL", "text-destructive", "Deteriorating fundamentals, stretched valuation, weak trend or elevated risks outweighing upside."]].map(([r, c, d]) => (
          <div key={r} className="glass rounded-2xl p-5"><p className={"font-display text-2xl font-bold " + c}>{r}</p><p className="mt-2 text-sm text-muted-foreground">{d}</p></div>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">Research opinions are educational and do not guarantee returns or predictive accuracy.</p>
    </div>
  );
}
