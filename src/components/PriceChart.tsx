import { useMemo, useState } from "react";
import { Area, AreaChart, Bar, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { priceHistory } from "@/lib/data/stocks";

const PERIODS = { "1D": 78, "1W": 35, "1M": 22, "3M": 66, "6M": 126, "1Y": 250, "5Y": 260 } as const;
type P = keyof typeof PERIODS;

const tip = { contentStyle: { background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 } };

export function PriceChart({ id, last, height = 260, bare = false }: { id: string; last: number; height?: number; bare?: boolean }) {
  const [p, setP] = useState<P>("1M");
  const data = useMemo(() => priceHistory(id + p, last, PERIODS[p], p === "5Y" ? 0.03 : 0.012), [id, last, p]);
  const up = data[data.length - 1]!.close >= data[0]!.close;
  const color = up ? "var(--primary)" : "var(--destructive)";
  return (
    <div>
      {!bare && <p className="mb-2 text-xs text-muted-foreground">Illustrative price history · not actual market candles</p>}
      {!bare && <div className="mb-3 flex flex-wrap gap-1">
        {(Object.keys(PERIODS) as P[]).map((k) => (
          <button key={k} onClick={() => setP(k)} className={"rounded-md px-2.5 py-1 text-xs font-medium " + (k === p ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground")}>{k}</button>
        ))}
      </div>}
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={"g" + id} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="i" hide />
          <YAxis hide={bare} domain={["auto", "auto"]} width={60} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip {...tip} labelFormatter={() => "Demo data"} />
          <Area type="monotone" dataKey="close" stroke={color} strokeWidth={2} fill={`url(#g${id})`} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TechnicalChart({ id, last }: { id: string; last: number }) {
  const data = useMemo(() => {
    const raw = priceHistory(id + "tech", last, 260);
    return raw.map((d, i) => {
      const avg = (n: number) => (i >= n - 1 ? raw.slice(i - n + 1, i + 1).reduce((a, b) => a + b.close, 0) / n : undefined);
      return { ...d, ma50: avg(50), ma200: avg(200) };
    }).slice(-120);
  }, [id, last]);
  const candles = data.slice(-50);
  const min = Math.min(...candles.map((c) => c.low));
  const max = Math.max(...candles.map((c) => c.high));
  const y = (v: number) => 180 - ((v - min) / (max - min)) * 170;
  const hi = Math.max(...data.map((d) => d.high));
  const lo = Math.min(...data.map((d) => d.low));
  const fib = [0.236, 0.382, 0.5, 0.618].map((f) => ({ f, v: hi - (hi - lo) * f }));
  return (
    <div className="space-y-6">
      <p className="text-xs text-muted-foreground">Illustrative technical charts · not actual market history</p>
      <div>
        <p className="mb-2 text-sm font-semibold">Candlestick (last 50 sessions)</p>
        <svg viewBox="0 0 500 190" className="h-56 w-full">
          {candles.map((c, i) => {
            const x = i * 10 + 5;
            const up = c.close >= c.open;
            const col = up ? "var(--primary)" : "var(--destructive)";
            return (
              <g key={i}>
                <line x1={x} x2={x} y1={y(c.high)} y2={y(c.low)} stroke={col} />
                <rect x={x - 3} width={6} y={y(Math.max(c.open, c.close))} height={Math.max(1, Math.abs(y(c.open) - y(c.close)))} fill={col} />
              </g>
            );
          })}
        </svg>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold">Price with 50-DMA & 200-DMA, volume</p>
        <ResponsiveContainer width="100%" height={240}>
          <ComposedChart data={data}>
            <XAxis dataKey="i" hide />
            <YAxis yAxisId="p" domain={["auto", "auto"]} width={60} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="v" hide orientation="right" />
            <Tooltip {...tip} labelFormatter={() => "Demo data"} />
            <Bar yAxisId="v" dataKey="volume" fill="var(--muted)" />
            <Line yAxisId="p" dataKey="close" stroke="var(--foreground)" dot={false} strokeWidth={1.5} />
            <Line yAxisId="p" dataKey="ma50" stroke="var(--primary)" dot={false} strokeWidth={1.5} />
            <Line yAxisId="p" dataKey="ma200" stroke="var(--gold)" dot={false} strokeWidth={1.5} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold">Fibonacci retracement levels</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {fib.map((f) => (
            <div key={f.f} className="rounded-lg bg-muted/60 px-3 py-2 text-sm"><span className="text-muted-foreground">{(f.f * 100).toFixed(1)}%</span> · ₹{f.v.toFixed(2)}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MiniBars({ data, keys }: { data: Record<string, number | string>[]; keys: { k: string; color: string }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <ComposedChart data={data}>
        <XAxis dataKey={Object.keys(data[0] ?? {})[0] ?? "x"} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis width={70} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip {...tip} />
        {keys.map((x) => <Bar key={x.k} dataKey={x.k} fill={x.color} radius={[4, 4, 0, 0]} />)}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
