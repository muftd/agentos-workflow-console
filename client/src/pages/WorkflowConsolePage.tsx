import { useEffect, useState } from "react";
import { SessionHeader } from "@/components/workflow/SessionHeader";
import { FlowMap } from "@/components/workflow/FlowMap";
import { StepDetailPanel } from "@/components/workflow/StepDetailPanel";
import type { WorkflowSession } from "@/types/workflow";

export function WorkflowConsolePage() {
  const [session, setSession] = useState<WorkflowSession | null>(null);
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load workflow data
  useEffect(() => {
    fetch('/data/workflow-log-sample.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load data: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data: WorkflowSession) => {
        setSession(data);
        // Select first step by default
        if (data.steps.length > 0) {
          const firstStep = data.steps.sort((a, b) => a.order - b.order)[0];
          setSelectedStepId(firstStep.id);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load workflow data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Keyboard navigation: Arrow Left/Right to switch steps
  useEffect(() => {
    if (!session || !selectedStepId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const sortedSteps = [...session.steps].sort((a, b) => a.order - b.order);
      const currentIndex = sortedSteps.findIndex((s) => s.id === selectedStepId);

      if (currentIndex === -1) return;

      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        // Navigate to previous step
        setSelectedStepId(sortedSteps[currentIndex - 1].id);
        e.preventDefault();
      } else if (e.key === 'ArrowRight' && currentIndex < sortedSteps.length - 1) {
        // Navigate to next step
        setSelectedStepId(sortedSteps[currentIndex + 1].id);
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [session, selectedStepId]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading workflow...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-4xl">⚠️</div>
          <h2 className="text-xl font-semibold">Failed to Load Workflow</h2>
          <p className="text-sm text-muted-foreground">
            {error || 'No data available'}
          </p>
        </div>
      </div>
    );
  }

  // Find selected step
  const selectedStep = session.steps.find((s) => s.id === selectedStepId);

  return (
    <div className="min-h-screen bg-background">
      <SessionHeader
        title={session.title}
        createdAt={session.created_at}
        description={session.description}
      />

      <FlowMap
        steps={session.steps}
        selectedStepId={selectedStepId}
        onSelectStep={setSelectedStepId}
      />

      <StepDetailPanel step={selectedStep} />
    </div>
  );
}
