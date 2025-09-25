import { Badge } from '@/components/ui/badge';
import { Lightbulb } from 'lucide-react';

interface GuidedPromptsProps {
  prompts: string[];
  onPromptSelect: (prompt: string) => void;
}

export function GuidedPrompts({ prompts, onPromptSelect }: GuidedPromptsProps) {
  if (prompts.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 space-y-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Lightbulb className="h-4 w-4" />
        <span>¿Necesitas ayuda? Prueba con estos inicios de oración.</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="cursor-pointer transition-transform transform hover:scale-105 hover:bg-primary/20"
            onClick={() => onPromptSelect(prompt)}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onPromptSelect(prompt)}
          >
            {prompt}
          </Badge>
        ))}
      </div>
    </div>
  );
}
