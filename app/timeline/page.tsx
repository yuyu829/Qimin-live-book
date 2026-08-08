import Link from "next/link";
import { ArrowLeftRight, MapPin } from "lucide-react";

import { AppNav } from "@/components/app-nav";
import { TimelineUnlocks } from "@/components/timeline-unlocks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCharacterById, getLocationById, memory } from "@/lib/memory";

export default function TimelinePage() {
  return (
    <main className="min-h-screen">
      <AppNav />
      <section className="mx-auto w-full max-w-6xl px-4 pb-12">
        <div className="mb-8">
          <Badge variant="warm" className="mb-3">
            1965 → 1988 → 2003
          </Badge>
          <h1 className="font-serif text-4xl font-bold text-ink md:text-5xl">街区时间轴</h1>
          <p className="mt-3 max-w-3xl text-base leading-8 text-wood">
            时间轴不是剧情摘要，而是你已整理出的记忆索引。每个节点都连接一个地点、一位普通人和一种时代压力。
          </p>
        </div>

        <TimelineUnlocks />

        <div className="mt-8 space-y-5">
          {memory.timeline.map((node) => {
            const location = getLocationById(node.locationId);
            const character = getCharacterById(node.characterId);

            return (
              <article key={node.year} className="grid gap-4 rounded-lg border border-wood/25 bg-paper/80 p-5 shadow-oldstreet md:grid-cols-[120px_1fr_auto]">
                <div className="font-serif text-3xl font-bold text-warmorange">{node.year}</div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-ink">{node.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-wood">{node.connection}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="green">
                      <MapPin className="mr-1 h-3 w-3" />
                      {location?.name}
                    </Badge>
                    <Badge variant="warm">{character?.name}</Badge>
                  </div>
                </div>
                {location ? (
                  <Button asChild variant="outline" className="self-center">
                    <Link href={`/location/${location.id}`}>
                      <ArrowLeftRight className="h-4 w-4" />
                      回到现场
                    </Link>
                  </Button>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
