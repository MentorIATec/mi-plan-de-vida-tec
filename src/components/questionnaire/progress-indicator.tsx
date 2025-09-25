import { Progress } from '@/components/ui/progress';
import { PILLARS } from '@/lib/ikigai-questions';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const progressValue = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full px-4 sm:px-0">
      <Progress value={progressValue} className="w-full h-2 bg-secondary" />
      <div className="mt-2 grid grid-cols-4 gap-2 text-center text-xs sm:text-sm">
        {PILLARS.map((pillar, index) => (
          <div key={pillar.key} className="flex flex-col items-center">
            <span
              className={cn(
                'font-medium transition-colors',
                currentStep >= index ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {pillar.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
