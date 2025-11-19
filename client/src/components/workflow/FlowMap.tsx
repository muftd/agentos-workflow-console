import { ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepNode } from "./StepNode";
import type { Step } from "@/types/workflow";

interface FlowMapProps {
  steps: Step[];
  selectedStepId: string | null;
  onSelectStep: (stepId: string) => void;
  onAddStep?: () => void;
}

export function FlowMap({
  steps,
  selectedStepId,
  onSelectStep,
  onAddStep
}: FlowMapProps) {
  // Sort steps by order
  const sortedSteps = [...steps].sort((a, b) => a.order - b.order);

  return (
    <div
      className="py-12 md:py-16 bg-gradient-to-b from-background via-muted/20 to-background"
      aria-label="Workflow flow map"
    >
      <div className="overflow-x-auto px-6 md:px-8">
        <div className="flex items-center gap-6 md:gap-8 min-w-max pb-4">
          {sortedSteps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-6 md:gap-8">
              <StepNode
                step={step}
                isSelected={step.id === selectedStepId}
                onSelect={() => onSelectStep(step.id)}
              />
              {index < sortedSteps.length - 1 && (
                <ArrowRight
                  className="w-6 h-6 md:w-7 md:h-7 text-blue-600/40 dark:text-blue-400/40 shrink-0 transition-colors"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}

          {/* Add Step button - always visible */}
          {onAddStep && (
            <>
              {sortedSteps.length > 0 && (
                <ArrowRight
                  className="w-6 h-6 md:w-7 md:h-7 text-blue-600/40 dark:text-blue-400/40 shrink-0 transition-colors"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              )}
              <Button
                variant="outline"
                className="w-80 h-48 border-2 border-dashed border-purple-400/40 dark:border-purple-400/40 bg-purple-600/5 dark:bg-purple-400/5 hover:bg-purple-600/10 dark:hover:bg-purple-400/10 hover:border-purple-500/60 dark:hover:border-purple-400/60 transition-all duration-300"
                onClick={onAddStep}
              >
                <div className="flex flex-col items-center gap-3 text-purple-600 dark:text-purple-400">
                  <Plus className="w-10 h-10" />
                  <span className="text-sm font-medium">Add New Step</span>
                </div>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
