import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";

import { AppNav } from "@/components/app-nav";
import { LocationExperience } from "@/components/location-experience";
import { Button } from "@/components/ui/button";
import { getCharacterById, getLocationById, memory } from "@/lib/memory";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return memory.locations.map((location) => ({ id: location.id }));
}

export default async function LocationPage({ params }: PageProps) {
  const { id } = await params;
  const location = getLocationById(id);

  if (!location) {
    notFound();
  }

  const character = getCharacterById(location.characterId);
  if (!character) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <AppNav />
      <section className="mx-auto w-full max-w-7xl px-4 pb-12">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Button asChild variant="outline">
            <Link href="/street">
              <ArrowLeft className="h-4 w-4" />
              返回老街
            </Link>
          </Button>
          <div className="flex items-center gap-2 rounded-md border border-wood/25 bg-paper/75 px-3 py-2 text-sm text-wood">
            <Clock className="h-4 w-4" />
            当前年份：{location.year}
          </div>
        </div>
        <LocationExperience location={location} character={character} />
      </section>
    </main>
  );
}
