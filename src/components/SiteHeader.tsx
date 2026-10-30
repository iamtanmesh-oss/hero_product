import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

const research = [
  { to: "/stocks", label: "Stock Screener" },
  { to: "/compare", label: "Compare Stocks" },
  { to: "/dashboard", label: "Market Dashboard" },
  { to: "/methodology", label: "Research Methodology" },
] as const;

const main = [
  { to: "/recommendations", label: "Recommendations" },
  { to: "/news", label: "Market News" },
  { to: "/ipo", label: "IPO" },
  { to: "/psu", label: "PSU Stocks" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/watchlist", label: "Watchlist" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

const linkCls = "rounded-md px-2 py-1.5 text-muted-foreground transition hover:text-foreground";
const active = { className: "text-foreground" };

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5">
        <Link to="/" className="font-display text-lg font-bold tracking-tight" onClick={() => setOpen(false)}>
          Index<span className="text-primary">Baazaar</span>
        </Link>
        <nav className="hidden items-center text-[13px] xl:flex">
          <Link to="/" activeOptions={{ exact: true }} activeProps={active} className={linkCls}>Home</Link>
          <div className="group relative">
            <button className={linkCls + " inline-flex items-center gap-1"}>Stock Research <ChevronDown className="h-3 w-3" /></button>
            <div className="invisible absolute left-0 top-full w-56 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="glass rounded-xl bg-popover p-2">
                {research.map((l) => (
                  <Link key={l.to} to={l.to} activeProps={active} className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">{l.label}</Link>
                ))}
              </div>
            </div>
          </div>
          {main.map((l) => (
            <Link key={l.to} to={l.to} activeProps={active} className={linkCls}>{l.label}</Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 xl:flex">
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">Login</Link>
          <Link to="/premium" className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground">Premium</Link>
        </div>
        <button className="xl:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="max-h-[80vh] overflow-y-auto border-t border-border px-5 pb-6 pt-2 xl:hidden">
          {[{ to: "/", label: "Home" }, ...research, ...main, { to: "/login", label: "Login / Sign Up" }, { to: "/premium", label: "Premium Membership" }].map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} activeOptions={{ exact: l.to === "/" }} activeProps={{ className: "text-primary" }} className="block border-b border-border py-3 text-sm">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
