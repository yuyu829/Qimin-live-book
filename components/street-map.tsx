"use client";

import Link from "next/link";
import { Coffee, PackageOpen, BusFront, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { useUnlockedMemories } from "@/components/memory-counter";
import type { MemoryLocation } from "@/lib/types";

const icons = {
  kopitiam: Coffee,
  grocery: PackageOpen,
  "bus-stop": BusFront
};

export function StreetMap({ locations }: { locations: MemoryLocation[] }) {
  const unlocked = useUnlockedMemories();

  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-lg border border-wood/30 bg-[#c79b6d] shadow-oldstreet film-grain">
      <div className="absolute inset-x-8 top-12 h-24 rounded-sm bg-[#d8b083] shadow-lg" />
      <div className="absolute inset-x-0 bottom-20 h-36 bg-[#6a5840]/80" />
      <div className="absolute inset-x-0 bottom-36 h-4 bg-warmorange/70" />
      <div className="absolute left-0 right-0 top-44 h-20 bg-[#b2774d]/70" />
      <div className="absolute left-10 top-16 grid grid-cols-8 gap-2">
        {Array.from({ length: 24 }).map((_, index) => (
          <div key={index} className="h-12 w-16 rounded-sm border border-wood/25 bg-paper/70" />
        ))}
      </div>
      <div className="absolute bottom-8 left-8 right-8 h-20 rounded-[50%] border border-paper/40 bg-[#4f5f50]/55" />

      {locations.map((location) => {
        const Icon = icons[location.id];
        const isUnlocked = unlocked.includes(location.id);

        return (
          <Link
            key={location.id}
            href={`/location/${location.id}`}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${location.mapPosition.x}%`, top: `${location.mapPosition.y}%` }}
          >
            <div className="flex min-w-40 flex-col items-center gap-2 rounded-lg border border-paper/70 bg-paper/90 p-3 text-center shadow-lg transition-transform group-hover:-translate-y-1">
              <span className="grid h-12 w-12 place-items-center rounded-md bg-warmorange text-paper">
                <Icon className="h-6 w-6" />
              </span>
              <span className="font-serif text-base font-bold text-ink">{location.name}</span>
              <Badge variant={isUnlocked ? "green" : "warm"}>
                {isUnlocked ? "已归档" : `${location.year}`}
              </Badge>
            </div>
          </Link>
        );
      })}

      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-md bg-ink/75 px-3 py-2 text-sm text-paper">
        <MapPin className="h-4 w-4" />
        一条老街，三个记忆坐标
      </div>
    </div>
  );
}
