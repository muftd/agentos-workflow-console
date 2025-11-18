import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Step } from "@/types/workflow";

interface StepNodeProps {
  step: Step;
  isSelected: boolean;
  onSelect: () => void;
}

/**
 * Get actor badge gradient color based on actor name
 */
function getActorColor(actor: string): string {
  const lowerActor = actor.toLowerCase();

  if (lowerActor.includes('coach c')) {
    return 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-400/20';
  }
  if (lowerActor.includes('coach a')) {
    return 'bg-gradient-to-br from-green-500 to-green-600 text-white border-green-400/20';
  }
  if (lowerActor.includes('coach e')) {
    return 'bg-gradient-to-br from-purple-500 to-purple-600 text-white border-purple-400/20';
  }
  if (lowerActor.includes('coach r')) {
    return 'bg-gradient-to-br from-pink-500 to-pink-600 text-white border-pink-400/20';
  }
  if (lowerActor.includes('replit') || lowerActor.includes('tool')) {
    return 'bg-gradient-to-br from-orange-500 to-orange-600 text-white border-orange-400/20';
  }
  if (lowerActor.includes('knowledge') || lowerActor.includes('garden')) {
    return 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-emerald-400/20';
  }

  // Default gradient
  return 'bg-gradient-to-br from-gray-500 to-gray-600 text-white border-gray-400/20';
}

export function StepNode({ step, isSelected, onSelect }: StepNodeProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        // Base styles - increased size and padding
        "w-80 h-48 p-6",
        "bg-white dark:bg-gray-900 border-2 rounded-lg",
        "shadow-sm",
        "transition-all duration-300 ease-out",
        "cursor-pointer",
        "text-left",
        "flex flex-col justify-between",
        "relative overflow-hidden",

        // Default border
        "border-gray-200 dark:border-gray-700",

        // Selected state - gradient background + enhanced shadow
        isSelected && [
          "border-blue-600 dark:border-blue-500",
          "shadow-xl",
          "bg-gradient-to-br from-blue-600/5 dark:from-blue-400/5 via-white dark:via-gray-900 to-white dark:to-gray-900",
        ],

        // Hover state - lift + scale + shadow
        "hover:shadow-lg hover:border-blue-600/50 dark:hover:border-blue-500/50 hover:-translate-y-1 hover:scale-[1.02]",

        // Focus accessibility
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      )}
      aria-label={`Step ${step.order}: ${step.actor} - ${step.output_label}`}
      aria-pressed={isSelected}
    >
      {/* Top: order + actor badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-light text-gray-900/40 dark:text-gray-100/40">
          #{step.order.toString().padStart(2, '0')}
        </span>
        <Badge
          className={cn(
            "border shadow-sm font-medium",
            getActorColor(step.actor)
          )}
        >
          {step.actor}
        </Badge>
      </div>

      {/* Middle: skill/tool - improved hierarchy */}
      <div className="space-y-2 flex-1">
        {step.skill && (
          <p className="text-sm text-gray-900/70 dark:text-gray-100/70 truncate leading-relaxed" title={step.skill}>
            {step.skill}
          </p>
        )}
        <p className="text-xs text-gray-900/50 dark:text-gray-100/50 truncate" title={`via ${step.tool}`}>
          via {step.tool}
        </p>
      </div>

      {/* Bottom: output label - primary focus with larger font */}
      <p
        className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate leading-tight mt-3"
        title={step.output_label}
      >
        {step.output_label}
      </p>
    </button>
  );
}
