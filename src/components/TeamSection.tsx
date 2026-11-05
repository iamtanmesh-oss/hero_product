import tanmesh from "@/assets/tanmesh-tiwari.jpg.asset.json";

type Member = { name: string; role: string; photo?: string; bio?: string; linkedin?: string };

// Bios and LinkedIn links are left empty until real details are provided.
export const team: Member[] = [
  { name: "Tanmesh Tiwari", role: "Founder (NISM certified)", photo: tanmesh.url },
];

export function TeamSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Meet the Mind Behind IndexBaazaar</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Driven by financial knowledge, strategic vision and technological innovation.
        </p>
      </div>
      <div className="mt-12 flex justify-center">
        {team.map((m) => (
          <article key={m.name} className="glass glow-hover w-full max-w-sm rounded-2xl p-5 text-center">
            <div className="aspect-square overflow-hidden rounded-xl bg-muted">
              {m.photo ? (
                <img src={m.photo} alt={m.name} loading="eager" decoding="async" className="h-full w-full object-cover object-top" />
              ) : null}
            </div>
            <h3 className="mt-5 text-lg font-semibold">{m.name}</h3>
            <p className="mt-1 text-sm font-medium text-gold">{m.role}</p>
            {m.bio && <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
