
"use client";

import { motion } from 'framer-motion';
import { Briefcase, Globe, Heart, Star, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const pillarData = [
  { name: 'Pasión', icon: Heart, color: 'text-red-500', position: 'top-0 left-1/4' },
  { name: 'Misión', icon: Star, color: 'text-yellow-500', position: 'top-0 right-1/4' },
  { name: 'Profesión', icon: Briefcase, color: 'text-blue-500', position: 'bottom-0 left-1/4' },
  { name: 'Vocación', icon: Globe, color: 'text-green-500', position: 'bottom-0 right-1/4' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
};

const centerVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.8,
      type: 'spring',
      stiffness: 150,
      damping: 15,
      duration: 0.5
    },
  },
};

export function IkigaiVennDiagram() {
  return (
    <Card className="shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Tu Convergencia</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {pillarData.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.name}
                className={`absolute w-32 h-32 sm:w-40 sm:h-40 flex flex-col items-center justify-center bg-card/50 border rounded-full shadow-md p-2 backdrop-blur-sm ${pillar.position}`}
                style={{
                  top: pillar.position.includes('top') ? '0' : undefined,
                  bottom: pillar.position.includes('bottom') ? '0' : undefined,
                  left: pillar.position.includes('left') ? '15%' : undefined,
                  right: pillar.position.includes('right') ? '15%' : undefined,
                  transform: 'translate(-50%, -50%)',
                  left: pillar.position.includes('left') ? '35%' : '65%',
                  top: pillar.position.includes('top') ? '35%' : '65%',
                }}
                variants={itemVariants}
              >
                <Icon className={`h-8 w-8 sm:h-10 sm:w-10 ${pillar.color}`} />
                <span className="text-sm sm:text-base font-semibold mt-1 text-center">{pillar.name}</span>
              </motion.div>
            );
          })}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 flex flex-col items-center justify-center bg-primary text-primary-foreground rounded-full shadow-2xl z-10"
            variants={centerVariants}
          >
            <Sparkles className="h-8 w-8 sm:h-10 sm:h-10" />
            <span className="text-lg sm:text-xl font-bold">IKIGAI</span>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
