// Demonstration stock universe. All figures are illustrative — DEMO DATA, NOT LIVE.
export const DEMO_DATE = "30 Oct 2026";

export type Rating = "BUY" | "SELL" | "HOLD";
export type Risk = "Low" | "Medium" | "High";

export interface StockSeed {
  symbol: string;
  name: string;
  sector: string;
  base: number; // illustrative reference price
  psu?: boolean;
  govtStake?: number;
  website: string;
  description: string;
  segments: string[];
}

export interface Stock extends StockSeed {
  price: number;
  change: number;
  changePct: number;
  marketCap: number; // ₹ Cr
  capBucket: "Large" | "Mid" | "Small";
  pe: number;
  pb: number;
  roe: number;
  roce: number;
  de: number;
  divYield: number;
  eps: number;
  epsGrowth: number;
  salesGrowth: number;
  profitGrowth: number;
  ebitdaMargin: number;
  opm: number;
  evEbitda: number;
  ps: number;
  volume: number;
  rsi: number;
  macd: number;
  high52: number;
  low52: number;
  rating: Rating;
  target: number;
  stopLoss: number;
  risk: Risk;
  horizon: string;
  confidence: number;
  researchScore: number;
  holding: { promoter: number; fii: number; dii: number; mf: number; public: number };
  financials: { year: string; revenue: number; profit: number; ebitda: number; ocf: number; eps: number }[];
  quarterly: { q: string; revenue: number; profit: number }[];
  dividends: { year: string; amount: number }[];
}

export const SEEDS: StockSeed[] = [
  { symbol: "RELIANCE", name: "Reliance Industries", sector: "Energy", base: 2850, website: "https://www.ril.com", description: "Diversified conglomerate spanning oil-to-chemicals, retail and digital services.", segments: ["Oil to Chemicals", "Retail", "Digital Services", "Oil & Gas"] },
  { symbol: "SBIN", name: "State Bank of India", sector: "Banking", base: 820, psu: true, govtStake: 57.5, website: "https://sbi.co.in", description: "India's largest public sector bank with a nationwide branch network.", segments: ["Retail Banking", "Corporate Banking", "Treasury", "Insurance"] },
  { symbol: "HDFCBANK", name: "HDFC Bank", sector: "Banking", base: 1680, website: "https://www.hdfcbank.com", description: "Leading private sector bank focused on retail and wholesale banking.", segments: ["Retail Banking", "Wholesale Banking", "Treasury"] },
  { symbol: "ICICIBANK", name: "ICICI Bank", sector: "Banking", base: 1240, website: "https://www.icicibank.com", description: "Large private sector bank with diversified financial services subsidiaries.", segments: ["Retail", "Corporate", "Treasury", "Subsidiaries"] },
  { symbol: "HINDUNILVR", name: "Hindustan Unilever", sector: "FMCG", base: 2450, website: "https://www.hul.co.in", description: "Consumer goods company across home care, beauty and foods.", segments: ["Home Care", "Beauty & Personal Care", "Foods"] },
  { symbol: "ITC", name: "ITC Limited", sector: "FMCG", base: 465, website: "https://www.itcportal.com", description: "Diversified company across cigarettes, FMCG, agri-business and paperboards.", segments: ["Cigarettes", "FMCG Others", "Agri", "Paperboards"] },
  { symbol: "NTPC", name: "NTPC Limited", sector: "Power", base: 360, psu: true, govtStake: 51.1, website: "https://www.ntpc.co.in", description: "India's largest power generation utility with growing renewables capacity.", segments: ["Thermal", "Renewables", "Hydro"] },
  { symbol: "POWERGRID", name: "Power Grid Corporation", sector: "Power", base: 320, psu: true, govtStake: 51.3, website: "https://www.powergrid.in", description: "Central transmission utility operating inter-state power transmission.", segments: ["Transmission", "Telecom", "Consultancy"] },
  { symbol: "COALINDIA", name: "Coal India", sector: "Mining", base: 420, psu: true, govtStake: 63.1, website: "https://www.coalindia.in", description: "World's largest coal producer by volume.", segments: ["Coal Mining", "Washeries"] },
  { symbol: "ONGC", name: "ONGC", sector: "Oil & Gas", base: 265, psu: true, govtStake: 58.9, website: "https://ongcindia.com", description: "Largest domestic crude oil and natural gas producer.", segments: ["Exploration", "Production", "Refining (subsidiaries)"] },
  { symbol: "TATASTEEL", name: "Tata Steel", sector: "Metals", base: 155, website: "https://www.tatasteel.com", description: "Integrated steel producer with operations in India and Europe.", segments: ["India Steel", "Europe", "Downstream"] },
  { symbol: "LT", name: "Larsen & Toubro", sector: "Infrastructure", base: 3600, website: "https://www.larsentoubro.com", description: "Engineering, construction and technology conglomerate.", segments: ["Infrastructure", "Energy", "Hi-Tech Manufacturing", "IT Services"] },
  { symbol: "INFY", name: "Infosys", sector: "IT", base: 1850, website: "https://www.infosys.com", description: "Global IT services and digital transformation company.", segments: ["Financial Services", "Retail", "Communication", "Manufacturing"] },
  { symbol: "TCS", name: "Tata Consultancy Services", sector: "IT", base: 4100, website: "https://www.tcs.com", description: "India's largest IT services exporter.", segments: ["BFSI", "Retail", "Life Sciences", "Manufacturing"] },
  { symbol: "BHARTIARTL", name: "Bharti Airtel", sector: "Telecom", base: 1620, website: "https://www.airtel.in", description: "Telecom operator with mobile, broadband and enterprise services.", segments: ["Mobile India", "Homes", "Enterprise", "Africa"] },
  { symbol: "MARUTI", name: "Maruti Suzuki", sector: "Automobile", base: 12400, website: "https://www.marutisuzuki.com", description: "India's largest passenger vehicle manufacturer.", segments: ["Domestic PV", "Exports", "Services"] },
  { symbol: "TMPV", name: "Tata Motors", sector: "Automobile", base: 780, website: "https://www.tatamotors.com", description: "Automaker with passenger vehicles, EVs and Jaguar Land Rover.", segments: ["Passenger Vehicles", "EV", "JLR"] },
  { symbol: "SUNPHARMA", name: "Sun Pharmaceutical", sector: "Pharma", base: 1750, website: "https://sunpharma.com", description: "Largest Indian pharma company with specialty and generics portfolio.", segments: ["India Formulations", "US Specialty", "Emerging Markets"] },
  { symbol: "BEL", name: "Bharat Electronics", sector: "Defence", base: 290, psu: true, govtStake: 51.1, website: "https://bel-india.in", description: "Defence electronics PSU supplying radars, communication and systems.", segments: ["Defence", "Non-Defence", "Exports"] },
  { symbol: "ADANIPORTS", name: "Adani Ports", sector: "Infrastructure", base: 1380, website: "https://www.adaniports.com", description: "Largest private port operator in India with logistics integration.", segments: ["Ports", "Logistics", "SEZ"] },
];

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}
export function rng(seed: string) {
  let a = hash(seed);
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const r2 = (n: number) => Math.round(n * 100) / 100;

export function buildStock(s: StockSeed): Stock {
  const r = rng(s.symbol);
  const between = (a: number, b: number) => a + r() * (b - a);
  const changePct = r2(between(-2.5, 2.5));
  const price = r2(s.base * (1 + changePct / 100));
  const pe = r2(between(s.psu ? 6 : 14, s.psu ? 18 : 60));
  const eps = r2(price / pe);
  const marketCap = Math.round(price * between(80, 2200) * 10);
  const roe = r2(between(10, 32));
  const ratingRoll = r();
  const rating: Rating = ratingRoll > 0.55 ? "BUY" : ratingRoll > 0.2 ? "HOLD" : "SELL";
  const upside = rating === "BUY" ? between(10, 28) : rating === "HOLD" ? between(-3, 8) : between(-18, -8);
  const risk: Risk = (["Low", "Medium", "High"] as Risk[])[Math.floor(r() * 3)];
  let rev = between(20000, 600000);
  let margin = between(0.08, 0.22);
  const financials = ["FY22", "FY23", "FY24", "FY25", "FY26"].map((year) => {
    rev *= 1 + between(0.03, 0.18);
    margin = Math.min(0.3, Math.max(0.05, margin + between(-0.015, 0.02)));
    const profit = rev * margin;
    return { year, revenue: Math.round(rev), profit: Math.round(profit), ebitda: Math.round(profit * 1.6), ocf: Math.round(profit * between(0.9, 1.4)), eps: r2(eps * (0.7 + financials_i++ * 0.08)) };
  });
  financials_i = 0;
  const q = financials[4].revenue / 4;
  const quarterly = ["Q3 FY26", "Q4 FY26", "Q1 FY27", "Q2 FY27"].map((label) => {
    const rv = Math.round(q * between(0.92, 1.1));
    return { q: label, revenue: rv, profit: Math.round(rv * margin) };
  });
  const promoter = r2(s.govtStake ?? between(0, 72));
  const fii = r2(between(8, Math.max(10, 90 - promoter) * 0.5));
  const dii = r2(between(5, Math.max(6, 100 - promoter - fii) * 0.6));
  const mf = r2(dii * between(0.4, 0.7));
  const pub = r2(100 - promoter - fii - dii);
  const divYield = r2(between(s.psu ? 2.5 : 0.3, s.psu ? 7 : 2.5));
  return {
    ...s,
    price,
    change: r2(price - s.base),
    changePct,
    marketCap,
    capBucket: marketCap > 100000 ? "Large" : marketCap > 30000 ? "Mid" : "Small",
    pe,
    pb: r2(between(1, 12)),
    roe,
    roce: r2(roe + between(-3, 6)),
    de: r2(s.sector === "Banking" ? between(0, 0.2) : between(0, 1.6)),
    divYield,
    eps,
    epsGrowth: r2(between(-5, 30)),
    salesGrowth: r2(between(2, 22)),
    profitGrowth: r2(between(-4, 30)),
    ebitdaMargin: r2(margin * 160),
    opm: r2(margin * 130),
    evEbitda: r2(between(5, 35)),
    ps: r2(between(0.5, 10)),
    volume: Math.round(between(0.5, 25) * 1e6),
    rsi: r2(between(28, 74)),
    macd: r2(between(-12, 12)),
    high52: r2(price * between(1.03, 1.3)),
    low52: r2(price * between(0.65, 0.95)),
    rating,
    target: r2(price * (1 + upside / 100)),
    stopLoss: r2(price * between(0.86, 0.94)),
    risk,
    horizon: (["6–12 months", "1–2 years", "2–3 years", "3+ years"])[Math.floor(r() * 4)],
    confidence: Math.round(between(55, 90)),
    researchScore: Math.round(between(55, 92)),
    holding: { promoter, fii, dii, mf, public: pub },
    financials,
    quarterly,
    dividends: ["FY22", "FY23", "FY24", "FY25", "FY26"].map((year, i) => ({ year, amount: r2(eps * divYield * pe / 100 * (0.8 + i * 0.06)) })),
  };
}
let financials_i = 0;

/** Deterministic illustrative price history. */
export function priceHistory(symbolOrIndex: string, last: number, points: number, volatility = 0.012) {
  const r = rng(symbolOrIndex + ":" + points);
  const arr: number[] = [last];
  for (let i = 1; i < points; i++) arr.push(arr[i - 1] / (1 + (r() - 0.48) * volatility * 2));
  return arr.reverse().map((v, i) => {
    const o = v * (1 + (r() - 0.5) * volatility);
    return { i, close: r2(v), open: r2(o), high: r2(Math.max(v, o) * (1 + r() * volatility)), low: r2(Math.min(v, o) * (1 - r() * volatility)), volume: Math.round((0.5 + r()) * 1e6) };
  });
}
