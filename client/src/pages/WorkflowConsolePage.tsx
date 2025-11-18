import { useEffect, useState } from "react";
import { useApp, useCurrentSession } from "@/contexts/AppContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { SessionHeader } from "@/components/workflow/SessionHeader";
import { FlowMap } from "@/components/workflow/FlowMap";
import { StepDetailPanel } from "@/components/workflow/StepDetailPanel";

export function WorkflowConsolePage() {
  const { state } = useApp();
  const currentSession = useCurrentSession();
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

  // Select first step when session changes
  useEffect(() => {
    if (currentSession && currentSession.steps.length > 0) {
      const firstStep = [...currentSession.steps].sort((a, b) => a.order - b.order)[0];
      setSelectedStepId(firstStep.id);
    } else {
      setSelectedStepId(null);
    }
  }, [currentSession?.session_id]);

  // Keyboard navigation: Arrow Left/Right to switch steps
  useEffect(() => {
    if (!currentSession || !selectedStepId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const sortedSteps = [...currentSession.steps].sort((a, b) => a.order - b.order);
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
  }, [currentSession, selectedStepId]);

  // Loading state
  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-primary mx-auto"></div>
          <p className="text-foreground/60 font-medium">Loading workflow...</p>
        </div>
      </div>
    );
  }

  // No session state
  if (!currentSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-5xl">📋</div>
          <h2 className="text-xl font-bold text-foreground">No Workflow Selected</h2>
          <p className="text-sm text-foreground/60 leading-relaxed">
            Please select or create a workflow to get started.
          </p>
        </div>
      </div>
    );
  }

  // Find selected step
  const selectedStep = currentSession.steps.find((s) => s.id === selectedStepId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      <Sidebar />

      <SessionHeader
        title={currentSession.title}
        createdAt={currentSession.created_at}
        description={currentSession.description}
      />

      <FlowMap
        steps={currentSession.steps}
        selectedStepId={selectedStepId}
        onSelectStep={setSelectedStepId}
      />

      <StepDetailPanel step={selectedStep} />
    </div>
  );
}
