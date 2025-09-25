
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/common/header';

const ikigaiPillars = [
  {
    icon: '❤️‍🔥',
    title: 'Lo que Amas',
    description: 'Descubre tus pasiones e intereses que te traen alegría y satisfacción.',
  },
  {
    icon: '✨',
    title: 'En lo que Eres Bueno/a',
    description: 'Identifica tus talentos, habilidades y fortalezas únicos.',
  },
  {
    icon: '🌎',
    title: 'Lo que el Mundo Necesita',
    description: 'Explora cómo tus habilidades pueden contribuir al bienestar de los demás.',
  },
  {
    icon: '💸',
    title: 'Por lo que te Pueden Pagar',
    description: 'Encuentra la intersección donde tus habilidades pueden aportar valor.',
  },
];

export default function Home() {
  const heroImage = getPlaceholderImage('hero-compass');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 flex items-center justify-center text-center bg-background">
          <div className="container px-4 md:px-6 z-10">
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Despega con Propósito 🚀
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Embárcate en un viaje de autodescubrimiento para encontrar tu propósito — una guía para una vida plena donde convergen pasión, misión, vocación y profesión.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform transform hover:scale-105">
                  <Link href="/ikigai">
                    Comienza tu Viaje
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover opacity-5"
                data-ai-hint={heroImage.imageHint}
                priority
             />
          )}
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
              <div className="space-y-6">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">Los Cuatro Pilares</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">¿Qué es Ikigai?</h2>
                <p className="max-w-2xl text-muted-foreground md:text-lg">
                  Ikigai es un concepto japonés que significa "una razón de ser". Se trata de encontrar la alegría en la vida a través del propósito. Al explorar cuatro áreas clave de tu vida, puedes descubrir tu propio propósito personal y vivir con más intención y plenitud.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {ikigaiPillars.map((pillar) => (
                  <Card key={pillar.title} className="shadow-md hover:shadow-xl hover:border-primary/50 transition-all duration-300 bg-card border-border">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <span className="text-3xl">{pillar.icon}</span>
                      <CardTitle className="text-lg">{pillar.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{pillar.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex items-center justify-center w-full h-20 border-t border-border">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Mi Plan de Vida en el Tec. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
