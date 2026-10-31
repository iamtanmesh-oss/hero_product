import { createFileRoute, Link } from "@tanstack/react-router";
import { BLOG } from "@/lib/data/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({ head: () => seo("Blog & Learning", "Educational articles on valuation, fundamentals, technical analysis and PSU investing."), component: Blog });

function Blog() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Learn</p>
      <h1 className="mt-2 text-3xl font-bold md:text-5xl">IndexBaazaar Blog</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {BLOG.map((b) => (
          <Link key={b.slug} to="/blog/$slug" params={{ slug: b.slug }} className="glass glow-hover rounded-2xl p-6">
            <p className="text-xs text-gold">{b.category} · {b.read} read</p><h2 className="mt-2 text-xl font-semibold">{b.title}</h2><p className="mt-2 text-sm text-muted-foreground">{b.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
