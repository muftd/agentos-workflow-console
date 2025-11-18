import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Step } from "@/types/workflow";

interface StepNodeProps {
  step: Step;
  isSelected: boolean;
  onSelect: () => void;
}

/**
 * Get actor badge color based on actor name
 */
function getActorColor(actor: string): string {
  const lowerActor = actor.toLowerCase();

  if (lowerActor.includes('coach c')) {
    return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
  }
  if (lowerActor.includes('coach a')) {
    return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
  }
  if (lowerActor.includes('coach e')) {
    return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
  }
  if (lowerActor.includes('coach r')) {
    return 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300';
  }
  if (lowerActor.includes('replit') || lowerActor.includes('tool')) {
    return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
  }
  if (lowerActor.includes('knowledge') || lowerActor.includes('garden')) {
    return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300';
  }

  // Default gray
  return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
}

export function StepNode({ step, isSelected, onSelect }: StepNodeProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        // Base styles
        "w-64 h-32 p-4",
        "bg-card border-2 rounded-lg",
        "shadow-sm",
        "transition-all duration-200",
        "cursor-pointer",
        "text-left",
        "flex flex-col justify-between",

        // Default border
        "border-border",

        // Selected state
        isSelected && "border-primary shadow-md ring-2 ring-primary/20",

        // Hover state
        "hover:shadow-md hover:border-primary/50 hover:-translate-y-0.5",

        // Focus accessibility
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      )}
      aria-label={`Step ${step.order}: ${step.actor} - ${step.output_label}`}
      aria-pressed={isSelected}
    >
      {/* Top: order + actor badge */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          #{step.order.toString().padStart(2, '0')}
        </span>
        <Badge className={cn("border-transparent", getActorColor(step.actor))}>
          {step.actor}
        </Badge>
      </div>

      {/* Middle: skill/tool */}
      <div className="space-y-1">
        {step.skill && (
          <p className="text-xs text-muted-foreground truncate" title={step.skill}>
            {step.skill}
          </p>
        )}
        <p className="text-xs text-muted-foreground/70 truncate" title={`via ${step.tool}`}>
          via {step.tool}
        </p>
      </div>

      {/* Bottom: output label */}
      <p className="text-sm font-medium text-foreground truncate" title={step.output_label}>
        {step.output_label}
      </p>
    </button>
  );
}
