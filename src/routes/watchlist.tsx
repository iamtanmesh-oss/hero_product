import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader, StockRow } from "@/components/common";
import { marketData } from "@/lib/data/provider";
import { useLocal } from "@/lib/useLocal";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/watchlist")({ head: () => seo("Watchlist", "Track favourite stocks, organise multiple watchlists and set target price alerts."), component: Watch });

type Lists = Record<string, { symbol: string; target?: number; news?: boolean }[]>;

function Watch() {
  const [lists, setLists] = useLocal<Lists>("ib-watchlists", { "My Watchlist": [] });
  const [quick] = useLocal<string[]>("ib-watchlist", []);
  const names = Object.keys(lists);
  const [cur, setCur] = useState(names[0] ?? "My Watchlist");
  const [add, setAdd] = useState("");
  const [newName, setNewName] = useState("");
  const items = lists[cur] ?? [];
  const update = (v: Lists[string]) => setLists({ ...lists, [cur]: v });
  const starred = quick.filter((s) => !items.some((i) => i.symbol === s));
  return (
    <div>
      <PageHeader eyebrow="My account" title="Watchlist" subtitle="Saved on this device for now. Account-synced watchlists arrive once sign-in is switched on." />
      <div className="mx-auto max-w-5xl px-5">
        <div className="flex flex-wrap items-center gap-2">
          {names.map((n) => <button key={n} onClick={() => setCur(n)} className={"rounded-full px-4 py-2 text-sm " + (n === cur ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>{n}</button>)}
          <form onSubmit={(e) => { e.preventDefault(); if (!newName.trim() || lists[newName]) return; setLists({ ...lists, [newName]: [] }); setCur(newName); setNewName(""); }} className="flex gap-2">
            <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="New list name" className="rounded-full border border-input bg-secondary px-3 py-2 text-sm" />
            <button className="rounded-full bg-muted px-3 text-sm">+ Create</button>
          </form>
        </div>
        <div className="mt-4 flex gap-2">
          <select value={add} onChange={(e) => setAdd(e.target.value)} className="flex-1 rounded-lg border border-input bg-secondary px-3 py-2 text-sm">
            <option value="">Add a stock…</option>
            {marketData.all().filter((s) => !items.some((i) => i.symbol === s.symbol)).map((s) => <option key={s.symbol} value={s.symbol}>{s.name} ({s.symbol})</option>)}
          </select>
          <button onClick={() => { if (!add) return; update([...items, { symbol: add }]); setAdd(""); toast.success("Added"); }} className="rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground">Add</button>
        </div>
        {starred.length > 0 && <p className="mt-3 text-xs text-muted-foreground">Starred from research pages: {starred.map((s) => <button key={s} className="mr-2 text-primary" onClick={() => update([...items, { symbol: s }])}>+{s}</button>)}</p>}
        <div className="glass mt-5 divide-y divide-border rounded-2xl">
          {items.length === 0 && <p className="p-6 text-center text-sm text-muted-foreground">This list is empty. Add a stock above.</p>}
          {items.map((it, idx) => {
            const s = marketData.get(it.symbol);
            if (!s) return null;
            const hit = it.target && s.price >= it.target;
            return (
              <div key={it.symbol} className="grid items-center gap-3 p-2 md:grid-cols-[1fr_auto]">
                <StockRow s={s} />
                <div className="flex flex-wrap items-center gap-2 px-3 pb-2 md:pb-0">
                  <input type="number" placeholder="Target ₹" value={it.target ?? ""} onChange={(e) => { const c = [...items]; const { target: _t, ...rest } = it; c[idx] = e.target.value ? { ...rest, target: +e.target.value } : rest; update(c); }} className="w-28 rounded-lg border border-input bg-secondary px-2 py-1.5 text-sm" />
                  {hit && <span className="text-xs text-primary">Target reached</span>}
                  <label className="flex items-center gap-1 text-xs text-muted-foreground"><input type="checkbox" checked={!!it.news} onChange={(e) => { const c = [...items]; c[idx] = { ...it, news: e.target.checked }; update(c); }} />News alerts</label>
                  <button aria-label="Remove" onClick={() => update(items.filter((x) => x.symbol !== it.symbol))} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
