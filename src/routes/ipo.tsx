import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Stat } from "@/components/common";
import { IPOS } from "@/lib/data/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/ipo")({ head: () => seo("IPO Analysis", "Upcoming, open, closed and listed IPOs with structured research — demonstration examples."), component: IPOPage });

function IPOPage() {
  const [tab, setTab] = useState("Upcoming");
  return (
    <div>
      <PageHeader eyebrow="IPO" title="IPO Analysis" subtitle="Structured IPO research. All companies, dates and subscription figures below are fictional demonstration examples." />
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-wrap gap-2">{["Upcoming", "Open", "Closed", "Listed"].map((t) => <button key={t} onClick={() => setTab(t)} className={"rounded-full px-4 py-2 text-sm " + (tab === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>{t}</button>)}</div>
        <div className="mt-6 space-y-5">
          {IPOS.filter((i) => i.status === tab).map((i) => (
            <article key={i.name} className="glass rounded-2xl p-6">
              <div className="flex justify-between"><h2 className="text-xl font-bold">{i.name}</h2><span className="rounded-md bg-muted px-2 py-1 text-xs">{i.status}</span></div>
              <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-7"><Stat label="Issue size" value={i.size} /><Stat label="Price band" value={i.band} /><Stat label="Opens" value={i.open} /><Stat label="Closes" value={i.close} /><Stat label="Listing" value={i.listing} /><Stat label="GMP" value={i.gmp} /><Stat label="Subscription" value={i.subscription} /></div>
              <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
                <p><span className="font-semibold">Business overview: </span><span className="text-muted-foreground">{i.overview}</span></p>
                <p><span className="font-semibold">Risk assessment: </span><span className="text-muted-foreground">{i.risk}</span></p>
                <p className="rounded-lg bg-gold/10 p-3"><span className="font-semibold text-gold">Should you apply? </span>{i.conclusion}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
