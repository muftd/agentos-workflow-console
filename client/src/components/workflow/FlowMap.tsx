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
    <div className="py-12 bg-background" aria-label="Workflow flow map">
      <div className="overflow-x-auto px-6">
        <div className="flex items-center gap-6 min-w-max">
          {sortedSteps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-6">
              <StepNode
                step={step}
                isSelected={step.id === selectedStepId}
                onSelect={() => onSelectStep(step.id)}
              />
              {index < sortedSteps.length - 1 && (
                <ArrowRight
                  className="w-6 h-6 text-muted-foreground shrink-0"
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
