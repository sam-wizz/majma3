import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="font-heading text-5xl font-semibold tracking-tight">404</p>
      <h1 className="mt-3 text-lg text-muted-foreground">
        This page could not be found.
      </h1>
      <Button className="mt-8" render={<Link href="/" />}>
        Back home
      </Button>
    </main>
  );
}
