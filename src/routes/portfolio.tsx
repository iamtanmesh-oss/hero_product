import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { toast } from "sonner";
import { PageHeader, Stat } from "@/components/common";
import { MiniBars } from "@/components/PriceChart";
import { marketData, fmtINR, pct } from "@/lib/data/provider";
import { useLocal } from "@/lib/useLocal";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/portfolio")({ head: () => seo("Portfolio Tracker", "Track holdings, profit and loss, allocation and dividend income — simulated with demonstration prices."), component: Portfolio });

type H = { id: string; symbol: string; qty: number; buy: number };
const COLORS = ["var(--primary)", "var(--gold)", "#4fc3f7", "#ef5350", "#ab47bc", "#26a69a", "#ffa726", "#8d6e63"];

function Portfolio() {
  const [ports, setPorts] = useLocal<Record<string, H[]>>("ib-portfolios", { "Main Portfolio": [] });
  const names = Object.keys(ports);
  const [cur, setCur] = useState(names[0] ?? "Main Portfolio");
  const [form, setForm] = useState({ symbol: "", qty: "", buy: "" });
  const [pname, setPname] = useState("");
  const hold = ports[cur] ?? [];
  const rows = hold.map((h) => { const s = marketData.get(h.symbol)!; return { ...h, s, inv: h.qty * h.buy, val: h.qty * s.price, div: h.qty * s.dividends[4]!.amount }; });
  const inv = rows.reduce((a, r) => a + r.inv, 0);
  const val = rows.reduce((a, r) => a + r.val, 0);
  const sectors = Object.entries(rows.reduce<Record<string, number>>((m, r) => ((m[r.s.sector] = (m[r.s.sector] ?? 0) + r.val), m), {})).map(([name, value]) => ({ name, value: Math.round(value) }));
  const input = "rounded-lg border border-input bg-secondary px-3 py-2 text-sm";
  return (
    <div>
      <PageHeader eyebrow="My account" title="Portfolio Tracker" subtitle="Valuations are simulated using demonstration prices. Saved on this device until sign-in is switched on." />
      <div className="mx-auto max-w-7xl space-y-6 px-5">
        <div className="flex flex-wrap gap-2">
          {names.map((n) => <button key={n} onClick={() => setCur(n)} className={"rounded-full px-4 py-2 text-sm " + (n === cur ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>{n}</button>)}
          <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); if (!pname.trim() || ports[pname]) return; setPorts({ ...ports, [pname]: [] }); setCur(pname); setPname(""); }}>
            <input value={pname} onChange={(e) => setPname(e.target.value)} placeholder="New portfolio" className={input + " rounded-full"} /><button className="rounded-full bg-muted px-3 text-sm">+ Create</button>
          </form>
        </div>
        <form className="glass grid gap-2 rounded-2xl p-4 md:grid-cols-4" onSubmit={(e) => {
          e.preventDefault();
          const qty = +form.qty, buy = +form.buy;
          if (!form.symbol || !(qty > 0) || !(buy > 0)) { toast.error("Choose a stock and enter a positive quantity and price"); return; }
          setPorts({ ...ports, [cur]: [...hold, { id: crypto.randomUUID(), symbol: form.symbol, qty, buy }] });
          setForm({ symbol: "", qty: "", buy: "" }); toast.success("Holding added");
        }}>
          <select className={input} value={form.symbol} onChange={(e) => setForm({ ...form, symbol: e.target.value, buy: form.buy || String(marketData.get(e.target.value)?.price ?? "") })}><option value="">Select stock</option>{marketData.all().map((s) => <option key={s.symbol} value={s.symbol}>{s.name}</option>)}</select>
          <input className={input} type="number" placeholder="Quantity" value={form.qty} onChange={(e) => setForm({ ...form, qty: e.target.value })} />
          <input className={input} type="number" step="0.01" placeholder="Purchase price ₹" value={form.buy} onChange={(e) => setForm({ ...form, buy: e.target.value })} />
          <button className="rounded-lg bg-primary text-sm font-semibold text-primary-foreground">Add holding</button>
        </form>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <Stat label="Invested" value={fmtINR(inv)} /><Stat label="Current value (simulated)" value={fmtINR(val)} />
          <Stat label="P&L" value={<span className={val - inv >= 0 ? "text-primary" : "text-destructive"}>{fmtINR(val - inv)}</span>} />
          <Stat label="Return" value={inv ? pct(((val - inv) / inv) * 100) : "—"} /><Stat label="Annual dividend income" value={fmtINR(rows.reduce((a, r) => a + r.div, 0))} />
        </div>
        <div className="glass overflow-x-auto rounded-2xl">
          <table className="w-full min-w-[700px] text-sm">
            <thead><tr className="border-b border-border text-left text-xs text-muted-foreground">{["Stock", "Qty", "Buy", "CMP", "Invested", "Value", "P&L", ""].map((h) => <th key={h} className="p-3">{h}</th>)}</tr></thead>
            <tbody>
              {rows.length === 0 && <tr><td colSpan={8} className="p-6 text-center text-muted-foreground">No holdings yet — add your first one above.</td></tr>}
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-border/40">
                  <td className="p-3 font-semibold">{r.symbol}</td><td className="p-3">{r.qty}</td><td className="p-3">{fmtINR(r.buy)}</td><td className="p-3">{fmtINR(r.s.price)}</td><td className="p-3">{fmtINR(r.inv)}</td><td className="p-3">{fmtINR(r.val)}</td>
                  <td className={"p-3 " + (r.val >= r.inv ? "text-primary" : "text-destructive")}>{pct(((r.val - r.inv) / r.inv) * 100)}</td>
                  <td className="p-3"><button aria-label="Remove" onClick={() => setPorts({ ...ports, [cur]: hold.filter((h) => h.id !== r.id) })}><Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2">
            <div className="glass rounded-2xl p-5"><p className="font-semibold">Sector allocation</p>
              <ResponsiveContainer width="100%" height={240}><PieChart><Pie data={sectors} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90}>{sectors.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)" }} /></PieChart></ResponsiveContainer>
            </div>
            <div className="glass rounded-2xl p-5"><p className="mb-2 font-semibold">Stock allocation — invested vs value</p><MiniBars data={rows.map((r) => ({ s: r.symbol, Invested: Math.round(r.inv), Value: Math.round(r.val) }))} keys={[{ k: "Invested", color: "var(--muted-foreground)" }, { k: "Value", color: "var(--primary)" }]} /></div>
          </div>
        )}
      </div>
    </div>
  );
}
