import { ArrowRight } from "lucide-react";
import { StepNode } from "./StepNode";
import type { Step } from "@/types/workflow";

interface FlowMapProps {
  steps: Step[];
  selectedStepId: string | null;
  onSelectStep: (stepId: string) => void;
}

export function FlowMap({ steps, selectedStepId, onSelectStep }: FlowMapProps) {
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
                  className="w-6 h-6 md:w-7 md:h-7 text-primary/40 shrink-0 transition-colors"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
