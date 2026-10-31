import { createFileRoute } from "@tanstack/react-router";
import { Newspaper } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/common";
import { NEWS, NEWS_CATEGORIES } from "@/lib/data/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/news")({ head: () => seo("Market News", "Indian and global market news across economy, banking, RBI, SEBI, PSU and commodities."), component: News });

function News() {
  const [cat, setCat] = useState("");
  const list = NEWS.filter((n) => !cat || n.category === cat);
  return (
    <div>
      <PageHeader eyebrow="News" title="Market News" subtitle="Sample articles demonstrating the news layout. A licensed news feed can be connected later." />
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-wrap gap-2">{["", ...NEWS_CATEGORIES].map((c) => <button key={c} onClick={() => setCat(c)} className={"rounded-full px-3 py-1.5 text-xs " + (cat === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>{c || "All"}</button>)}</div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((n) => (
            <article key={n.id} className="glass glow-hover overflow-hidden rounded-2xl">
              <div className="grid h-36 place-items-center bg-muted"><Newspaper className="h-10 w-10 text-muted-foreground" /></div>
              <div className="p-5"><p className="text-xs text-gold">{n.category}</p><h2 className="mt-2 font-semibold">{n.title}</h2><p className="mt-2 text-sm text-muted-foreground">{n.summary}</p><p className="mt-3 text-xs text-muted-foreground">{n.date} · Demo article</p></div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
