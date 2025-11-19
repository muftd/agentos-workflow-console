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
                className="w-80 h-48 border-2 border-dashed border-blue-600/40 dark:border-blue-400/40 bg-blue-600/5 dark:bg-blue-400/5 hover:bg-blue-600/10 dark:hover:bg-blue-400/10 hover:border-blue-600/60 dark:hover:border-blue-400/60 transition-all duration-300 !text-gray-900 dark:!text-gray-100"
                onClick={onAddStep}
              >
                <div className="flex flex-col items-center gap-3">
                  <Plus className="w-10 h-10 text-blue-600 dark:text-blue-400" />
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
