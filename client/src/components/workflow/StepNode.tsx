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
        "bg-card border-2 rounded-lg",
        "shadow-card",
        "transition-all duration-300 ease-out",
        "cursor-pointer",
        "text-left",
        "flex flex-col justify-between",
        "relative overflow-hidden",

        // Default border
        "border-border",

        // Selected state - gradient background + enhanced shadow
        isSelected && [
          "border-primary",
          "shadow-card-selected",
          "bg-gradient-to-br from-primary/5 via-card to-card",
        ],

        // Hover state - lift + scale + shadow
        "hover:shadow-card-hover hover:border-primary/50 hover:-translate-y-1 hover:scale-[1.02]",

        // Focus accessibility
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      )}
      aria-label={`Step ${step.order}: ${step.actor} - ${step.output_label}`}
      aria-pressed={isSelected}
    >
      {/* Top: order + actor badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-light text-foreground/40">
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
          <p className="text-sm text-foreground/70 truncate leading-relaxed" title={step.skill}>
            {step.skill}
          </p>
        )}
        <p className="text-xs text-foreground/50 truncate" title={`via ${step.tool}`}>
          via {step.tool}
        </p>
      </div>

      {/* Bottom: output label - primary focus with larger font */}
      <p
        className="text-lg font-semibold text-foreground truncate leading-tight mt-3"
        title={step.output_label}
      >
        {step.output_label}
      </p>
    </button>
  );
}
