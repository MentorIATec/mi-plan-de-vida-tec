
import { getLifePlans } from '@/firebase/firestore-actions';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { COMMUNITY_COLORS, MENTORS_BY_COMMUNITY } from '@/lib/mentors-data';
import { Header } from '@/components/common/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { UserInfo } from '@/lib/context/questionnaire-context';

const getInitials = (name: string) => {
  return name.charAt(0).toUpperCase();
};

const getCommunityFromMentor = (mentorNickname: string) => {
    for (const community of MENTORS_BY_COMMUNITY) {
        if (community.mentors.some(m => m.nickname === mentorNickname)) {
            return community.name;
        }
    }
    return 'Krei'; // Default community
};

export default async function GalleryPage() {
  const lifePlans = await getLifePlans();

  return (
    <>
      <Header />
      <main className="container py-8 md:py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-primary">Galería de Propósitos</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Inspírate con las declaraciones y visiones de la comunidad estudiantil. Un mosaico de sueños y aspiraciones.
            </p>
             <Button asChild variant="outline">
              <Link href="/ikigai/results">
                <ArrowLeft />
                Volver a mis resultados
              </Link>
            </Button>
          </div>
          
          {lifePlans.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {lifePlans.map((plan) => {
                const user = plan.user as UserInfo; // Ensure user is of type UserInfo
                const community = getCommunityFromMentor(user.mentor);
                
                return (
                <Card key={plan.id} className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
                  {plan.purposeImage && (
                    <div className="relative w-full h-48">
                      <Image
                        src={plan.purposeImage}
                        alt={`Visión de ${user.name}`}
                        fill
                        objectFit="cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-4 flex-grow">
                    <p className="italic text-foreground/90">"{plan.purposeStatement}"</p>
                  </CardContent>
                  <CardFooter className="p-4 bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback style={{ backgroundColor: COMMUNITY_COLORS[community as keyof typeof COMMUNITY_COLORS] }}>
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{community}</p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              )})}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Aún no se han guardado propósitos. ¡Sé el primero!</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
