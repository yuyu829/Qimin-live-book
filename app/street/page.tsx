import { AppNav } from "@/components/app-nav";
import { MemoryCounter } from "@/components/memory-counter";
import { StreetMap } from "@/components/street-map";
import { Badge } from "@/components/ui/badge";
import { memory } from "@/lib/memory";
import { StreetMemoryAgent } from "@/lib/agents/street-memory-agent";

export default function StreetPage() {
  const streetAgent = new StreetMemoryAgent();

  return (
    <main className="min-h-screen">
      <AppNav />
      <section className="mx-auto w-full max-w-6xl px-4 pb-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge variant="green" className="mb-3">
              当前年份：沿街探索
            </Badge>
            <h1 className="font-serif text-4xl font-bold text-ink md:text-5xl">老街地图</h1>
            <p className="mt-3 max-w-3xl text-base leading-8 text-wood">
              {streetAgent.introduce()}
            </p>
          </div>
          <MemoryCounter />
        </div>
        <StreetMap locations={memory.locations} />
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {memory.locations.map((location) => (
            <div key={location.id} className="rounded-lg border border-wood/25 bg-paper/75 p-4">
              <p className="text-sm font-bold text-warmorange">{location.year}</p>
              <h2 className="mt-1 font-serif text-xl font-bold">{location.name}</h2>
              <p className="mt-2 text-sm leading-7 text-wood">{location.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
