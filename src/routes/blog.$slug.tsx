import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BLOG } from "@/lib/data/content";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = BLOG.find((b) => b.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [{ title: loaderData.title + " | IndexBaazaar" }, { name: "description", content: loaderData.excerpt }, { property: "og:title", content: loaderData.title }, { property: "og:description", content: loaderData.excerpt }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" }]
      : [{ title: "Article not found" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => <div className="p-16 text-center">Article not found. <Link to="/blog" className="text-primary">Back to blog</Link></div>,
  component: Post,
});

function Post() {
  const p = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <Link to="/blog" className="text-sm text-muted-foreground">← Blog</Link>
      <p className="mt-6 text-xs text-gold">{p.category} · {p.read} read</p>
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">{p.title}</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">{p.body.map((x) => <p key={x}>{x}</p>)}</div>
    </article>
  );
}
