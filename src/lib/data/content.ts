// Illustrative content — DEMO DATA, NOT LIVE.
import { rng } from "./stocks";

export const INDICES = [
  { name: "NIFTY 50", value: 24350.4 },
  { name: "SENSEX", value: 80120.6 },
  { name: "BANK NIFTY", value: 52410.2 },
  { name: "NIFTY MIDCAP", value: 56210.8 },
  { name: "NIFTY IT", value: 41280.5 },
  { name: "INDIA VIX", value: 13.42 },
  { name: "GOLD", value: 76450, unit: "₹/10g" },
  { name: "SILVER", value: 92300, unit: "₹/kg" },
  { name: "USD/INR", value: 84.12 },
  { name: "CRUDE OIL", value: 6120, unit: "₹/bbl" },
  { name: "BITCOIN", value: 6150000, unit: "₹" },
].map((x) => {
  const r = rng(x.name);
  const changePct = Math.round((r() * 3 - 1.4) * 100) / 100;
  return { ...x, changePct, change: Math.round(x.value * changePct) / 100 };
});

export const NEWS_CATEGORIES = ["Indian Stock Market", "Global Markets", "Economy", "Banking", "RBI", "SEBI", "PSU Companies", "Corporate Announcements", "Gold and Silver", "Geopolitics and Markets"];

export const NEWS = [
  ["Benchmarks consolidate as investors await quarterly earnings", "Indian Stock Market", "Frontline indices traded in a narrow range in this illustrative session as earnings season approached."],
  ["Global equities mixed ahead of central bank commentary", "Global Markets", "A sample story on how global cues may influence Indian market sentiment."],
  ["Understanding India's GDP growth composition", "Economy", "An explainer-style demo article on consumption, investment and government spending."],
  ["Credit growth trends across public and private banks", "Banking", "Illustrative look at how loan growth and deposit growth compare across lenders."],
  ["What a policy rate pause means for borrowers", "RBI", "Demo explainer on monetary policy transmission to loans and deposits."],
  ["New disclosure norms explained for retail investors", "SEBI", "A sample summary of how disclosure rules help investors evaluate companies."],
  ["PSU dividend payouts: a historical perspective", "PSU Companies", "Illustrative analysis of dividend consistency among public sector companies."],
  ["How to read a corporate board meeting announcement", "Corporate Announcements", "Demo guide to interpreting results dates, dividends and fund raising notices."],
  ["Gold as a portfolio diversifier", "Gold and Silver", "An educational sample piece on the role of precious metals in asset allocation."],
  ["Geopolitical events and market volatility", "Geopolitics and Markets", "A demo article on how investors may think about event-driven volatility."],
].map(([title, category, summary], i) => ({ id: String(i + 1), title, category, summary, date: `${28 - i} Oct 2026` }));

export const BLOG = [
  { slug: "what-is-pe-ratio", title: "What Is the P/E Ratio and How Should You Use It?", category: "Valuation", read: "6 min", excerpt: "The price-to-earnings ratio is a starting point for valuation — not the whole story.", body: ["The P/E ratio compares a company's share price to its earnings per share. A higher P/E can indicate higher growth expectations, while a lower P/E may signal value or concern.", "Always compare P/E against the company's own history and its sector peers. A bank and an IT company will naturally trade at different multiples.", "Combine P/E with growth (PEG), return ratios such as ROE and ROCE, and balance sheet strength before forming a view."] },
  { slug: "roe-vs-roce", title: "ROE vs ROCE: Measuring Capital Efficiency", category: "Fundamentals", read: "5 min", excerpt: "Two return ratios, two different questions about how well a business uses capital.", body: ["Return on Equity (ROE) tells you how much profit a company generates on shareholders' money.", "Return on Capital Employed (ROCE) includes debt, showing efficiency on all capital invested.", "A high ROE with low ROCE may indicate heavy leverage. Look at both together."] },
  { slug: "reading-moving-averages", title: "Reading the 50-DMA and 200-DMA", category: "Technical Analysis", read: "4 min", excerpt: "Moving averages smooth out noise and help identify the broader trend.", body: ["The 50-day moving average reflects the medium-term trend; the 200-day reflects the long-term trend.", "A price above both is often considered a healthy uptrend; crossovers are watched by many traders.", "Moving averages lag price — treat them as context, not prediction."] },
  { slug: "investing-in-psu-stocks", title: "A Framework for Researching PSU Stocks", category: "PSU", read: "7 min", excerpt: "Government ownership brings unique strengths and risks worth understanding.", body: ["PSU companies often offer high dividend yields and strategic importance.", "Investors should evaluate government policy risk, capital allocation, and minority shareholder treatment.", "Debt levels, capex plans and dividend sustainability are key metrics to track."] },
];

export type IPO = { name: string; status: "Upcoming" | "Open" | "Closed" | "Listed"; size: string; band: string; open: string; close: string; listing: string; gmp: string; subscription: string; overview: string; risk: string; conclusion: string };
export const IPOS: IPO[] = [
  { name: "Demo Renewables Ltd", status: "Upcoming", size: "₹1,200 Cr", band: "₹210–222", open: "12 Nov 2026", close: "14 Nov 2026", listing: "19 Nov 2026", gmp: "Not available", subscription: "—", overview: "Illustrative solar EPC and IPP developer.", risk: "Execution risk, working-capital intensity.", conclusion: "Example: Evaluate after RHP review; suitable only for high-risk investors." },
  { name: "Sample FinServ Ltd", status: "Open", size: "₹850 Cr", band: "₹415–437", open: "28 Oct 2026", close: "30 Oct 2026", listing: "4 Nov 2026", gmp: "Not available", subscription: "Demo: 2.1x", overview: "Illustrative NBFC focused on MSME lending.", risk: "Asset quality cycles, funding cost.", conclusion: "Example: Long-term investors may consider, valuations look moderate." },
  { name: "Example Logistics Ltd", status: "Closed", size: "₹640 Cr", band: "₹98–104", open: "20 Oct 2026", close: "22 Oct 2026", listing: "27 Oct 2026", gmp: "Not available", subscription: "Demo: 14.6x", overview: "Illustrative third-party logistics provider.", risk: "Customer concentration.", conclusion: "Example: Listing-gain oriented interest; fundamentals average." },
  { name: "Illustrative Pharma Ltd", status: "Listed", size: "₹2,100 Cr", band: "₹540–568", open: "2 Oct 2026", close: "4 Oct 2026", listing: "9 Oct 2026", gmp: "Not available", subscription: "Demo: 38.2x", overview: "Illustrative CDMO serving global pharma.", risk: "Regulatory inspections, client concentration.", conclusion: "Example: Strong franchise, but listing valuation is rich." },
];
