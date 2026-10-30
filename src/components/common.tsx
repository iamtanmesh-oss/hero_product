import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { INDICES } from "@/lib/data/content";
import { DEMO_DATE } from "@/lib/data/stocks";
import { pct } from "@/lib/data/provider";
import type { Stock } from "@/lib/data/stocks";

export function DemoBadge({ className = "" }: { className?: string }) {
  return (
    <span className={"inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold " + className}>
      <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Demo data – not live
    </span>
  );
}

export function PageHeader({ eyebrow, title, subtitle, children }: { eyebrow?: string; title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-8 pt-12">
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{eyebrow}</p>}
      <h1 className="mt-2 text-3xl font-bold md:text-5xl">{title}</h1>
      {subtitle && <p className="mt-3 max-w-3xl text-muted-foreground">{subtitle}</p>}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <DemoBadge />
        <span className="text-xs text-muted-foreground">Demonstration date: {DEMO_DATE}</span>
        {children}
      </div>
    </section>
  );
}

export function Section({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Change({ v, className = "" }: { v: number; className?: string }) {
  return <span className={(v >= 0 ? "text-primary" : "text-destructive") + " font-medium " + className}>{v >= 0 ? "▲" : "▼"} {pct(v)}</span>;
}

export function RatingPill({ r }: { r: Stock["rating"] }) {
  const c = r === "BUY" ? "bg-primary/15 text-primary" : r === "SELL" ? "bg-destructive/15 text-destructive" : "bg-gold/15 text-gold";
  return <span className={"rounded-md px-2 py-0.5 text-xs font-bold " + c}>{r}</span>;
}

export function Logo({ s }: { s: Pick<Stock, "symbol"> }) {
  return <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-muted font-display text-xs font-bold text-primary">{s.symbol.slice(0, 2)}</div>;
}

export function StockRow({ s }: { s: Stock }) {
  return (
    <Link to="/stocks/$symbol" params={{ symbol: s.symbol }} className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 hover:bg-muted">
      <div className="flex items-center gap-3">
        <Logo s={s} />
        <div>
          <p className="text-sm font-semibold">{s.symbol}</p>
          <p className="text-xs text-muted-foreground">{s.name}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold">₹{s.price.toLocaleString("en-IN")}</p>
        <Change v={s.changePct} className="text-xs" />
      </div>
    </Link>
  );
}

export function Stat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="rounded-lg bg-muted/60 px-3 py-2">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

export function Ticker() {
  const items = [...INDICES, ...INDICES];
  return (
    <div className="border-b border-border bg-secondary/80">
      <div className="flex items-center">
        <div className="z-10 hidden shrink-0 border-r border-border bg-secondary px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-gold sm:block">Demo · {DEMO_DATE}</div>
        <div className="overflow-hidden">
          <div className="animate-ticker flex w-max gap-8 py-2 text-xs">
            {items.map((x, i) => (
              <span key={i} className="flex items-center gap-2 whitespace-nowrap">
                <span className="font-semibold">{x.name}</span>
                <span>{x.value.toLocaleString("en-IN")}</span>
                <span className={x.changePct >= 0 ? "text-primary" : "text-destructive"}>
                  {x.change >= 0 ? "+" : ""}{x.change.toLocaleString("en-IN")} ({pct(x.changePct)})
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-4">
        <div>
          <p className="font-display text-lg font-bold">Index<span className="text-primary">Baazaar</span></p>
          <p className="mt-2 text-sm text-muted-foreground">Research-driven insights on Indian equity markets.</p>
        </div>
        {[
          ["Research", [["/stocks", "Screener"], ["/recommendations", "Recommendations"], ["/compare", "Compare"], ["/methodology", "Methodology"]]],
          ["Markets", [["/dashboard", "Dashboard"], ["/news", "News"], ["/ipo", "IPO"], ["/psu", "PSU Stocks"]]],
          ["Company", [["/about", "About Us"], ["/blog", "Blog"], ["/contact", "Contact"], ["/premium", "Premium"]]],
        ].map(([h, links]) => (
          <div key={h as string}>
            <p className="text-sm font-semibold">{h as string}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {(links as string[][]).map(([to, l]) => (
                <li key={to}><a href={to} className="hover:text-foreground">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mx-auto max-w-7xl px-5 pb-8 text-xs leading-relaxed text-muted-foreground">
        Disclaimer: All market figures, recommendations and research shown are illustrative demonstration data and are not live prices or investment advice. Investments in securities are subject to market risks. Please consult a SEBI-registered adviser before investing.
      </p>
    </footer>
  );
}
