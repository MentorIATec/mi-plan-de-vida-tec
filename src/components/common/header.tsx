import Link from 'next/link';
import { Compass } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-primary" />
          <span className="font-headline text-2xl font-bold text-foreground">Mi Plan de Vida en el Tec</span>
        </Link>
      </div>
    </header>
  );
}
