
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useMemo } from 'react';
import { IKIGAI_QUESTIONS, PILLARS } from '@/lib/ikigai-questions';

export type IkigaiAnswers = {
  passion: (string | string[])[];
  mission: (string | string[])[];
  vocation: (string | string[])[];
  profession: (string | string[])[];
};

export type UserInfo = {
  name: string;
  studentId: string;
  mentor: string;
};

export type LifePlan = {
  id: string | null;
  purposeStatement: string;
  purposeImage: string | null;
}

type QuestionnaireContextType = {
  answers: IkigaiAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<IkigaiAnswers>>;
  user: UserInfo;
  setUser: React.Dispatch<React.SetStateAction<UserInfo>>;
  lifePlan: LifePlan;
  setLifePlan: React.Dispatch<React.SetStateAction<LifePlan>>;
};

const QuestionnaireContext = createContext<QuestionnaireContextType | null>(null);

const createInitialState = (): IkigaiAnswers => {
  const initialState: IkigaiAnswers = {
    passion: [],
    mission: [],
    vocation: [],
    profession: [],
  };

  PILLARS.forEach(pillar => {
    const pillarKey = pillar.key as keyof IkigaiAnswers;
    initialState[pillarKey] = IKIGAI_QUESTIONS[pillar.key].map(q => 
      q.type === 'checkbox' ? [] : ''
    );
  });
  
  return initialState;
};

const initialUser: UserInfo = {
  name: '',
  studentId: '',
  mentor: '',
};

const initialLifePlan: LifePlan = {
    id: null,
    purposeStatement: '',
    purposeImage: null,
}

export function QuestionnaireProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<IkigaiAnswers>(createInitialState);
  const [user, setUser] = useState<UserInfo>(initialUser);
  const [lifePlan, setLifePlan] = useState<LifePlan>(initialLifePlan);

  const contextValue = useMemo(() => ({ answers, setAnswers, user, setUser, lifePlan, setLifePlan }), [answers, user, lifePlan]);

  return (
    <QuestionnaireContext.Provider value={contextValue}>
      {children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaire() {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
  }
  return context;
}
