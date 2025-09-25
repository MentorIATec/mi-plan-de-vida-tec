
"use client";

import type { ReactNode } from 'react';
import type { Question } from '@/lib/ikigai-questions';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { GuidedPrompts } from './guided-prompts';
import { motion } from 'framer-motion';

interface StepWrapperProps {
  icon: ReactNode;
  title: string;
  description: string;
  questions: Question[];
  answers: (string | string[])[];
  onAnswerChange: (questionIndex: number, value: string | string[]) => void;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function StepWrapper({
  icon,
  title,
  description,
  questions,
  answers,
  onAnswerChange,
}: StepWrapperProps) {

  const handleCheckboxChange = (questionIndex: number, option: string, checked: boolean) => {
    const currentAnswers = (answers[questionIndex] as string[] | undefined) || [];
    const newAnswers = checked
      ? [...currentAnswers, option]
      : currentAnswers.filter((item) => item !== option);
    onAnswerChange(questionIndex, newAnswers);
  };

  return (
    <motion.div
      key={title}
      className="w-full max-w-3xl space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <div className="inline-block">{icon}</div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </motion.div>

      <div className="space-y-8">
        {questions.map((q, index) => (
          <motion.div key={q.id} className="space-y-2" variants={itemVariants}>
            <Label htmlFor={q.id} className="text-lg font-semibold">
              {q.text}
            </Label>
            {q.type === 'checkbox' && q.options ? (
              <div className="space-y-2 pt-2">
                {q.options.map((option) => (
                  <div key={option} className="flex items-center gap-x-3">
                    <Checkbox
                      id={`${q.id}-${option}`}
                      checked={((answers[index] as string[]) || []).includes(option)}
                      onCheckedChange={(checked) => handleCheckboxChange(index, option, !!checked)}
                    />
                    <Label htmlFor={`${q.id}-${option}`} className="font-normal text-base">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <Textarea
                  id={q.id}
                  value={answers[index] as string}
                  onChange={(e) => onAnswerChange(index, e.target.value)}
                  placeholder={q.placeholder}
                  className="min-h-[120px] text-base bg-card focus:bg-background"
                  rows={5}
                />
                <GuidedPrompts
                  prompts={q.prompts}
                  onPromptSelect={(prompt) => {
                    const currentAnswer = answers[index] as string;
                    const newAnswer = currentAnswer ? `${currentAnswer} ${prompt}` : prompt;
                    onAnswerChange(index, newAnswer);
                  }}
                />
              </>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
