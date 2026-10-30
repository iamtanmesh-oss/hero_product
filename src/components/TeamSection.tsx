import { UserRound } from "lucide-react";
import tanmesh from "@/assets/tanmesh-tiwari.jpg.asset.json";
import anshita from "@/assets/anshita-mishra.jpg.asset.json";
import pradeep from "@/assets/pradeep-kumar.jpg.asset.json";

type Member = { name: string; role: string; photo?: string; bio?: string; linkedin?: string };

// Bios and LinkedIn links are left empty until real details are provided.
export const team: Member[] = [
  { name: "Tanmesh Tiwari", role: "Founder", photo: tanmesh.url },
  { name: "Anshita Mishra", role: "Chief Executive Officer (CEO)", photo: anshita.url },
  { name: "Dhiraj Deori", role: "Chief Technology Officer (CTO)" },
  { name: "Shubhi Jaiswal", role: "Chief Financial Officer (CFO)" },
  { name: "Dr. Pradeep Kumar", role: "Chief Advisory Officer", photo: pradeep.url },
];

export function TeamSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Meet the Minds Behind IndexBaazaar</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Driven by financial knowledge, strategic vision, technological innovation and advisory expertise.
        </p>
      </div>
      <div className="mt-12 flex flex-wrap justify-center gap-6">
        {team.map((m) => (
          <article
            key={m.name}
            className="glass glow-hover w-full rounded-2xl p-5 text-center sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
          >
            <div className="aspect-square overflow-hidden rounded-xl bg-muted">
              {m.photo ? (
                <img src={m.photo} alt={m.name} loading="lazy" className="h-full w-full object-cover object-top" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
                  <UserRound className="h-16 w-16" />
                  <span className="text-xs">Photo coming soon</span>
                </div>
              )}
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
