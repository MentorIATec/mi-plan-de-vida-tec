
"use client";

import { useEffect } from 'react';
import { SummaryCard } from '@/components/results/summary-card';
import { PurposeStatement } from '@/components/results/purpose-statement';
import { PathSuggestions } from '@/components/results/path-suggestions';
import { Award, GalleryHorizontal } from 'lucide-react';
import { useQuestionnaire } from '@/lib/context/questionnaire-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ResultsPage() {
  const { user } = useQuestionnaire();
  const router = useRouter();

  useEffect(() => {
    if (!user.name) {
      router.push('/ikigai');
    }
  }, [user, router]);

  if (!user.name) {
    return null; 
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4 p-6 bg-card rounded-xl shadow-lg border">
          <div className="flex justify-center">
            <Award className="h-12 w-12 text-primary animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-primary">Tu Propósito de Vida, {user.name}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ¡Felicidades por completar tu viaje de autodescubrimiento! Aquí convergen tus intereses, talentos, impacto y carrera.
          </p>
          <Button asChild>
            <Link href="/ikigai/gallery">
              <GalleryHorizontal className="mr-2" />
              Explorar Galería de Propósitos
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
            <PurposeStatement />
            <PathSuggestions />
        </div>

        <SummaryCard />

      </div>
    </div>
  );
}
