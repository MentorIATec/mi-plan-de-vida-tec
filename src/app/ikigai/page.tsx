
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuestionnaire } from '@/lib/context/questionnaire-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from '@/components/ui/select';
import { ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { MENTORS_BY_COMMUNITY, COMMUNITY_COLORS } from '@/lib/mentors-data';
import { getLifePlanByStudentId } from '@/firebase/firestore-actions';
import { useToast } from '@/hooks/use-toast';

export default function WelcomePage() {
  const router = useRouter();
  const { setUser, setAnswers, setLifePlan } = useQuestionnaire();
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [mentor, setMentor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleStart = async () => {
    if (name && studentId && mentor) {
      setIsLoading(true);
      try {
        const existingPlan = await getLifePlanByStudentId(studentId);
        
        if (existingPlan) {
          // If a plan exists, load the data and go to results
          setUser(existingPlan.user);
          setAnswers(existingPlan.answers);
          setLifePlan({
            id: existingPlan.id || null,
            purposeStatement: existingPlan.purposeStatement,
            purposeImage: existingPlan.purposeImage || null,
          });
          router.push('/ikigai/results');
        } else {
          // If no plan, set user and start the questionnaire
          setUser({ name, studentId, mentor });
          router.push('/ikigai/questionnaire');
        }
      } catch (error) {
        console.error("Error checking for existing plan:", error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'No se pudo verificar tu información. Por favor, intenta de nuevo.',
        });
        setIsLoading(false);
      }
    }
  };

  const selectedCommunity = mentor ? MENTORS_BY_COMMUNITY.flatMap(c => c.mentors).find(m => m.nickname === mentor)?.community : undefined;
  const accentColor = selectedCommunity ? COMMUNITY_COLORS[selectedCommunity as keyof typeof COMMUNITY_COLORS] : undefined;

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="w-full max-w-lg shadow-2xl border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">¡Bienvenido/a a tu Plan de Vida!</CardTitle>
            <CardDescription className="text-muted-foreground pt-2">
              Ingresa tus datos para comenzar o para ver tu plan guardado.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Tu nombre o cómo prefieres que te llamen</Label>
              <Input
                id="name"
                placeholder="Tu nombre de preferencia"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentId">Matrícula</Label>
              <Input
                id="studentId"
                placeholder="A01234567"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mentor">Mentor/a</Label>
              <Select onValueChange={setMentor} value={mentor}>
                <SelectTrigger id="mentor" style={accentColor ? { borderColor: accentColor, boxShadow: `0 0 0 1px ${accentColor}` } : {}}>
                  <SelectValue placeholder="Selecciona a tu mentor o mentora" />
                </SelectTrigger>
                <SelectContent>
                  {MENTORS_BY_COMMUNITY.map((community) => (
                    <SelectGroup key={community.name}>
                      <Label className="px-2 text-xs" style={{ color: COMMUNITY_COLORS[community.name as keyof typeof COMMUNITY_COLORS] }}>{community.name}</Label>
                      {community.mentors.map((m) => (
                        <SelectItem key={m.nickname} value={m.nickname}>
                          {m.nickname}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={handleStart}
              disabled={!name || !studentId || !mentor || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Cargando...
                </>
              ) : (
                <>
                  Continuar
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
