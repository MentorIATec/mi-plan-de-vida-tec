
"use client";

import { useQuestionnaire } from '@/lib/context/questionnaire-context';
import { IKIGAI_QUESTIONS, PILLARS } from '@/lib/ikigai-questions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function SummaryCard() {
  const { answers } = useQuestionnaire();

  const renderAnswer = (answer: string | string[], questionType: 'textarea' | 'checkbox' | undefined) => {
    if (questionType === 'checkbox') {
      if (Array.isArray(answer) && answer.length > 0) {
        return (
          <ul className="list-disc list-inside">
            {answer.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        );
      }
      return 'No se seleccionó ninguna opción.';
    }
    
    return answer || 'No se proporcionó respuesta.';
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Tus Reflexiones</CardTitle>
        <CardDescription>
          Aquí tienes un resumen de tus respuestas. Revisa y reflexiona sobre tu viaje hasta ahora.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {PILLARS.map((pillar) => (
            <AccordionItem value={pillar.key} key={pillar.key}>
              <AccordionTrigger className="text-lg font-semibold">{pillar.title}: <span className="text-muted-foreground ml-2 font-normal text-base">{pillar.subtitle}</span></AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-4 pl-4">
                  {IKIGAI_QUESTIONS[pillar.key].map((question, index) => {
                    const answer = answers[pillar.key as keyof typeof answers][index];
                    return (
                      <li key={question.id} className="space-y-1">
                        <p className="font-semibold text-foreground/80">{question.text}</p>
                        <div className="text-muted-foreground italic border-l-2 border-primary pl-3">
                          {renderAnswer(answer, question.type)}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
