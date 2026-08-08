import Link from "next/link";
import { Map, Route, ScrollText } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AppNav() {
  return (
    <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5">
      <Link href="/" className="font-serif text-lg font-bold text-ink">
        街角记忆博物馆
      </Link>
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link href="/street">
            <Map className="h-4 w-4" />
            街区
          </Link>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link href="/timeline">
            <Route className="h-4 w-4" />
            时间轴
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/location/kopitiam">
            <ScrollText className="h-4 w-4" />
            第一封信
          </Link>
        </Button>
      </div>
    </nav>
  );
}
