
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { useQuestionnaire } from '@/lib/context/questionnaire-context';
import { IKIGAI_QUESTIONS, PILLARS } from '@/lib/ikigai-questions';
import { StepWrapper } from '@/components/questionnaire/step-wrapper';
import { ProgressIndicator } from '@/components/questionnaire/progress-indicator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function QuestionnairePage() {
  const router = useRouter();
  const { answers, setAnswers, user } = useQuestionnaire();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!user.name) {
      router.push('/ikigai');
    }
  }, [user, router]);

  if (!user.name) {
    return null;
  }

  const handleAnswerChange = (questionIndex: number, value: string | string[]) => {
    const currentPillarKey = PILLARS[currentStep].key as keyof typeof answers;
    const newAnswers = [...answers[currentPillarKey]];
    newAnswers[questionIndex] = value;
    setAnswers(prev => ({
      ...prev,
      [currentPillarKey]: newAnswers,
    }));
  };

  const currentPillar = PILLARS[currentStep];
  const currentQuestions = IKIGAI_QUESTIONS[currentPillar.key];
  const currentPillarAnswers = answers[currentPillar.key as keyof typeof answers];

  const handleNext = () => {
    if (currentStep < PILLARS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/ikigai/results');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const isCurrentStepComplete = currentPillarAnswers.every(answer => {
    if (Array.isArray(answer)) return answer.length > 0;
    return answer.trim() !== '';
  });

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-3xl">
        <ProgressIndicator currentStep={currentStep} totalSteps={PILLARS.length} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full mt-8">
        <AnimatePresence mode="wait">
          <StepWrapper
            key={currentStep}
            icon={
              <span className="text-5xl mb-2">
                {currentPillar.key === 'passion' ? '❤️‍🔥' : currentPillar.key === 'mission' ? '✨' : currentPillar.key === 'vocation' ? '🌎' : '💸'}
              </span>
            }
            title={currentPillar.title}
            description={currentPillar.description}
            questions={currentQuestions}
            answers={currentPillarAnswers}
            onAnswerChange={handleAnswerChange}
          />
        </AnimatePresence>
      </div>
      
       {currentStep < PILLARS.length -1 && isCurrentStepComplete && (
         <Alert className="max-w-3xl mt-8 border-primary/50 bg-primary/10">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>¡Excelente!</AlertTitle>
          <AlertDescription>
            Has completado la sección de {currentPillar.title}. ¡Vamos a la siguiente!
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between w-full max-w-3xl mt-8">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Anterior
        </Button>
        <Button onClick={handleNext} disabled={!isCurrentStepComplete}>
          {currentStep === PILLARS.length - 1 ? 'Ver mis Resultados' : 'Siguiente'}
          {currentStep === PILLARS.length - 1 ? <CheckCircle className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
