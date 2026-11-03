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
  ...([
    ["KOTAKBANK", "Kotak Mahindra Bank", "Banking", 2100, "https://www.kotak.com", "Private bank with broking, insurance and asset management arms.", ["Retail", "Corporate", "Securities", "Insurance"]],
    ["AXISBANK", "Axis Bank", "Banking", 1180, "https://www.axisbank.com", "Third-largest private sector bank in India.", ["Retail", "Corporate", "Treasury"]],
    ["INDUSINDBK", "IndusInd Bank", "Banking", 800, "https://www.indusind.com", "Private bank strong in vehicle finance and microfinance.", ["Consumer Finance", "Corporate", "Treasury"]],
    ["BANKBARODA", "Bank of Baroda", "Banking", 250, "https://www.bankofbaroda.in", "Large public sector bank with international presence.", ["Retail", "Corporate", "International"], 63.97],
    ["PNB", "Punjab National Bank", "Banking", 110, "https://www.pnbindia.in", "Major public sector bank with wide rural reach.", ["Retail", "Corporate", "Treasury"], 70.08],
    ["CANBK", "Canara Bank", "Banking", 115, "https://canarabank.com", "Public sector bank with large deposit base.", ["Retail", "Corporate", "Treasury"], 62.93],
    ["BAJFINANCE", "Bajaj Finance", "Financial Services", 900, "https://www.bajajfinserv.in", "Leading consumer and SME lending NBFC.", ["Consumer Loans", "SME", "Mortgages"]],
    ["BAJAJFINSV", "Bajaj Finserv", "Financial Services", 2000, "https://www.bajajfinserv.in", "Holding company for lending and insurance businesses.", ["Lending", "Life Insurance", "General Insurance"]],
    ["SBILIFE", "SBI Life Insurance", "Insurance", 1800, "https://www.sbilife.co.in", "Life insurer backed by State Bank of India.", ["Protection", "Savings", "Annuity"]],
    ["HDFCLIFE", "HDFC Life Insurance", "Insurance", 750, "https://www.hdfclife.com", "Private life insurer with bancassurance strength.", ["Protection", "Savings", "Annuity"]],
    ["LICI", "Life Insurance Corporation", "Insurance", 900, "https://licindia.in", "India's largest life insurer.", ["Individual", "Group", "Annuity"], 96.5],
    ["WIPRO", "Wipro", "IT", 250, "https://www.wipro.com", "Global IT, consulting and business process services company.", ["Americas", "Europe", "APMEA"]],
    ["HCLTECH", "HCL Technologies", "IT", 1550, "https://www.hcltech.com", "IT services, engineering and software products company.", ["IT Services", "Engineering", "Software"]],
    ["TECHM", "Tech Mahindra", "IT", 1500, "https://www.techmahindra.com", "IT services firm strong in telecom vertical.", ["Communications", "BFSI", "Manufacturing"]],
    ["LTIM", "LTIMindtree", "IT", 5500, "https://www.ltimindtree.com", "IT services and digital solutions provider.", ["BFSI", "Manufacturing", "Retail"]],
    ["NESTLEIND", "Nestle India", "FMCG", 1200, "https://www.nestle.in", "Packaged foods company known for Maggi and Nescafe.", ["Milk Products", "Prepared Dishes", "Beverages"]],
    ["BRITANNIA", "Britannia Industries", "FMCG", 5800, "https://britannia.co.in", "Leading bakery and dairy foods maker.", ["Biscuits", "Dairy", "Cakes"]],
    ["TATACONSUM", "Tata Consumer Products", "FMCG", 1150, "https://www.tataconsumer.com", "Tea, coffee, salt and packaged foods company.", ["India Beverages", "India Foods", "International"]],
    ["DABUR", "Dabur India", "FMCG", 500, "https://www.dabur.com", "Ayurvedic and natural consumer products maker.", ["Healthcare", "Home & Personal Care", "Foods"]],
    ["ASIANPAINT", "Asian Paints", "Consumer Durables", 2400, "https://www.asianpaints.com", "India's largest decorative paints company.", ["Decorative", "Industrial", "Home Decor"]],
    ["TITAN", "Titan Company", "Consumer Durables", 3500, "https://www.titancompany.in", "Jewellery, watches and eyewear retailer.", ["Jewellery", "Watches", "Eyecare"]],
    ["ULTRACEMCO", "UltraTech Cement", "Cement", 12000, "https://www.ultratechcement.com", "India's largest cement producer.", ["Grey Cement", "White Cement", "RMC"]],
    ["GRASIM", "Grasim Industries", "Cement", 2700, "https://www.grasim.com", "Diversified company in VSF, chemicals, cement and paints.", ["VSF", "Chemicals", "Cement", "Paints"]],
    ["SHREECEM", "Shree Cement", "Cement", 29000, "https://www.shreecement.com", "Major cement producer in north and east India.", ["Cement", "Power"]],
    ["JSWSTEEL", "JSW Steel", "Metals", 1100, "https://www.jsw.in", "Large integrated steel producer.", ["Steel", "Coated Products"]],
    ["HINDALCO", "Hindalco Industries", "Metals", 780, "https://www.hindalco.com", "Aluminium and copper major, owner of Novelis.", ["Aluminium", "Copper", "Novelis"]],
    ["VEDL", "Vedanta", "Metals", 480, "https://www.vedantalimited.com", "Natural resources company across zinc, oil and aluminium.", ["Zinc", "Aluminium", "Oil & Gas"]],
    ["NMDC", "NMDC", "Mining", 75, "https://www.nmdc.co.in", "India's largest iron ore producer.", ["Iron Ore", "Pellets"], 60.79],
    ["SAIL", "Steel Authority of India", "Metals", 130, "https://www.sail.co.in", "State-owned integrated steel producer.", ["Flat Products", "Long Products"], 65],
    ["BPCL", "Bharat Petroleum", "Oil & Gas", 340, "https://www.bharatpetroleum.in", "Oil refining and fuel marketing PSU.", ["Refining", "Marketing", "Gas"], 52.98],
    ["IOC", "Indian Oil Corporation", "Oil & Gas", 150, "https://iocl.com", "India's largest refiner and fuel retailer.", ["Refining", "Pipelines", "Marketing", "Petrochemicals"], 51.5],
    ["GAIL", "GAIL India", "Oil & Gas", 185, "https://gailonline.com", "Natural gas transmission and marketing PSU.", ["Transmission", "Gas Trading", "Petrochemicals"], 51.92],
    ["ADANIENT", "Adani Enterprises", "Infrastructure", 2400, "https://www.adanienterprises.com", "Incubator of Adani group businesses.", ["Airports", "Roads", "Mining", "New Energy"]],
    ["ADANIGREEN", "Adani Green Energy", "Power", 1000, "https://www.adanigreenenergy.com", "Large renewable energy developer.", ["Solar", "Wind", "Hybrid"]],
    ["TATAPOWER", "Tata Power", "Power", 400, "https://www.tatapower.com", "Integrated power company with rooftop solar and EV charging.", ["Generation", "Distribution", "Renewables"]],
    ["M&M", "Mahindra & Mahindra", "Automobile", 3500, "https://www.mahindra.com", "SUV and tractor maker.", ["Automotive", "Farm Equipment", "Services"]],
    ["BAJAJ-AUTO", "Bajaj Auto", "Automobile", 8800, "https://www.bajajauto.com", "Two- and three-wheeler maker with strong exports.", ["Motorcycles", "Three-wheelers", "Exports"]],
    ["HEROMOTOCO", "Hero MotoCorp", "Automobile", 5400, "https://www.heromotocorp.com", "World's largest two-wheeler maker by volume.", ["Motorcycles", "Scooters", "Parts"]],
    ["EICHERMOT", "Eicher Motors", "Automobile", 6800, "https://www.eicher.in", "Royal Enfield maker and VECV partner.", ["Royal Enfield", "Commercial Vehicles"]],
    ["TVSMOTOR", "TVS Motor", "Automobile", 3400, "https://www.tvsmotor.com", "Two-wheeler maker with growing EV portfolio.", ["Motorcycles", "Scooters", "EV"]],
    ["DRREDDY", "Dr. Reddy's Laboratories", "Pharma", 1250, "https://www.drreddys.com", "Global generics and APIs pharma company.", ["Global Generics", "PSAI", "Biosimilars"]],
    ["CIPLA", "Cipla", "Pharma", 1500, "https://www.cipla.com", "Respiratory-focused global pharma company.", ["India", "North America", "Africa"]],
    ["DIVISLAB", "Divi's Laboratories", "Pharma", 6500, "https://www.divislabs.com", "Leading API and custom synthesis manufacturer.", ["Generic APIs", "Custom Synthesis", "Nutraceuticals"]],
    ["APOLLOHOSP", "Apollo Hospitals", "Healthcare", 7500, "https://www.apollohospitals.com", "Largest private hospital chain in India.", ["Hospitals", "Pharmacy", "Digital Health"]],
    ["HAL", "Hindustan Aeronautics", "Defence", 4600, "https://hal-india.co.in", "Defence aerospace PSU building aircraft and helicopters.", ["Aircraft", "Helicopters", "MRO"], 71.64],
    ["BHEL", "Bharat Heavy Electricals", "Capital Goods", 260, "https://www.bhel.com", "Power and industrial equipment PSU.", ["Power", "Industry", "Transportation"], 63.17],
    ["SIEMENS", "Siemens India", "Capital Goods", 3200, "https://www.siemens.co.in", "Electrification, automation and mobility company.", ["Smart Infrastructure", "Mobility", "Digital Industries"]],
    ["IRCTC", "IRCTC", "Railways", 750, "https://www.irctc.co.in", "Railway catering, ticketing and tourism PSU.", ["Internet Ticketing", "Catering", "Rail Neer", "Tourism"], 62.4],
    ["RVNL", "Rail Vikas Nigam", "Railways", 350, "https://rvnl.org", "Railway infrastructure execution PSU.", ["Rail Projects", "Metro", "Highways"], 72.84],
    ["IRFC", "Indian Railway Finance Corp", "Financial Services", 130, "https://irfc.co.in", "Dedicated financing arm of Indian Railways.", ["Rolling Stock Leasing", "Project Finance"], 86.36],
    ["DLF", "DLF", "Real Estate", 750, "https://www.dlf.in", "India's largest listed real estate developer.", ["Residential", "Commercial Rentals"]],
    ["ZOMATO", "Eternal (Zomato)", "Consumer Internet", 300, "https://www.eternal.com", "Food delivery and quick commerce platform.", ["Food Delivery", "Blinkit", "Hyperpure"]],
    ["TRENT", "Trent", "Retail", 5000, "https://trentlimited.com", "Tata group fashion retailer (Westside, Zudio).", ["Westside", "Zudio", "Star"]],
    ["DMART", "Avenue Supermarts", "Retail", 4200, "https://www.dmartindia.com", "Value retail supermarket chain DMart.", ["Grocery", "General Merchandise", "Apparel"]],
    ["PIDILITIND", "Pidilite Industries", "Chemicals", 1450, "https://www.pidilite.com", "Adhesives and sealants maker (Fevicol).", ["Consumer & Bazaar", "B2B"]],
    ["UPL", "UPL", "Chemicals", 650, "https://www.upl-ltd.com", "Global agrochemicals company.", ["Crop Protection", "Seeds", "Post-harvest"]],
  ] as [string, string, string, number, string, string, string[], number?][]).map(([symbol, name, sector, base, website, description, segments, govtStake]) => ({
    symbol, name, sector, base, website, description, segments,
    ...(govtStake ? { psu: true, govtStake } : {}),
  })),
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
  const risk: Risk = (["Low", "Medium", "High"] as Risk[])[Math.floor(r() * 3)]!;
  let rev = between(20000, 600000);
  let margin = between(0.08, 0.22);
  const financials = ["FY22", "FY23", "FY24", "FY25", "FY26"].map((year, i) => {
    rev *= 1 + between(0.03, 0.18);
    margin = Math.min(0.3, Math.max(0.05, margin + between(-0.015, 0.02)));
    const profit = rev * margin;
    return { year, revenue: Math.round(rev), profit: Math.round(profit), ebitda: Math.round(profit * 1.6), ocf: Math.round(profit * between(0.9, 1.4)), eps: r2(eps * (0.7 + i * 0.08)) };
  });
  const q = financials[4]!.revenue / 4;
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
    horizon: (["6–12 months", "1–2 years", "2–3 years", "3+ years"])[Math.floor(r() * 4)]!,
    confidence: Math.round(between(55, 90)),
    researchScore: Math.round(between(55, 92)),
    holding: { promoter, fii, dii, mf, public: pub },
    financials,
    quarterly,
    dividends: ["FY22", "FY23", "FY24", "FY25", "FY26"].map((year, i) => ({ year, amount: r2(eps * divYield * pe / 100 * (0.8 + i * 0.06)) })),
  };
}

/** Deterministic illustrative price history. */
export function priceHistory(symbolOrIndex: string, last: number, points: number, volatility = 0.012) {
  const r = rng(symbolOrIndex + ":" + points);
  const arr: number[] = [last];
  for (let i = 1; i < points; i++) arr.push(arr[i - 1]! / (1 + (r() - 0.48) * volatility * 2));
  return arr.reverse().map((v, i) => {
    const o = v * (1 + (r() - 0.5) * volatility);
    return { i, close: r2(v), open: r2(o), high: r2(Math.max(v, o) * (1 + r() * volatility)), low: r2(Math.min(v, o) * (1 - r() * volatility)), volume: Math.round((0.5 + r()) * 1e6) };
  });
}
