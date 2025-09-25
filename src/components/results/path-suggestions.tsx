
"use client";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Lightbulb } from 'lucide-react';
import { MENTORS_BY_COMMUNITY, COMMUNITY_COLORS } from '@/lib/mentors-data';

// Sample data for purpose statements
const exampleStatements = [
  {
    name: "Alex",
    community: "Krei",
    statement: "Mi propósito es usar la narrativa y el diseño para construir mundos que inspiren empatía y curiosidad en las personas.",
    imageUrl: "https://picsum.photos/seed/1/600/400",
    imageHint: "narrative design"
  },
  {
    name: "Sofía",
    community: "Pasio",
    statement: "Busco aplicar mis habilidades analíticas para desarrollar soluciones energéticas sostenibles que combatan el cambio climático.",
    imageUrl: "https://picsum.photos/seed/2/600/400",
    imageHint: "sustainable energy"
  },
  {
    name: "Leo",
    community: "Ekilibro",
    statement: "Quiero dedicar mi carrera a crear tecnología accesible que reduzca la brecha digital y empodere a comunidades vulnerables.",
    imageUrl: "https://picsum.photos/seed/3/600/400",
    imageHint: "accessible technology"
  },
  {
    name: "Valeria",
    community: "Spirita",
    statement: "Mi misión es liderar equipos multidisciplinarios para resolver problemas complejos de salud pública a través de la innovación y la colaboración.",
    imageUrl: "https://picsum.photos/seed/4/600/400",
    imageHint: "public health"
  },
  {
    name: "Carlos",
    community: "Energio",
    statement: "Aspiro a emprender proyectos de impacto social que utilicen la biotecnología para mejorar la seguridad alimentaria en mi región.",
    imageUrl: "https://picsum.photos/seed/5/600/400",
    imageHint: "biotechnology impact"
  }
];

const getInitials = (name: string) => {
  return name.charAt(0).toUpperCase();
};

export function PathSuggestions() {
  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Lightbulb className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">Propósitos que Inspiran</CardTitle>
        </div>
        <CardDescription>
          Mira ejemplos de otros estudiantes. Usa estas ideas como inspiración para redactar tu propia declaración.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-sm"
        >
          <CarouselContent>
            {exampleStatements.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
                <div className="p-1">
                  <Card className="bg-secondary/50 border-border/50 overflow-hidden">
                    <CardContent className="flex flex-col items-center justify-center p-0">
                      <div className="relative w-full h-40">
                         <Image
                            src={item.imageUrl}
                            alt={`Inspiración para ${item.name}`}
                            layout="fill"
                            objectFit="cover"
                            className="opacity-90"
                            data-ai-hint={item.imageHint}
                         />
                      </div>
                       <div className="p-6 space-y-4 w-full">
                         <p className="text-center text-foreground/90 italic">"{item.statement}"</p>
                         <div className="flex items-center gap-3 pt-2 justify-center">
                            <Avatar>
                              <AvatarFallback style={{ backgroundColor: COMMUNITY_COLORS[item.community as keyof typeof COMMUNITY_COLORS] }}>
                                  {getInitials(item.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{item.name}</p>
                              <p className="text-sm text-muted-foreground">{item.community}</p>
                            </div>
                         </div>
                       </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  );
}
