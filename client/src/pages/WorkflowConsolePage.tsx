import { useEffect, useState } from "react";
import { useApp, useCurrentSession } from "@/contexts/AppContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Sidebar } from "@/components/layout/Sidebar";
import { SessionHeader } from "@/components/workflow/SessionHeader";
import { FlowMap } from "@/components/workflow/FlowMap";
import { StepDetailPanel } from "@/components/workflow/StepDetailPanel";
import { StepFormDialog } from "@/components/workflow/StepFormDialog";
import type { Step } from "@/types/workflow";

export function WorkflowConsolePage() {
  const { state, toggleEditMode, addStep, updateStep, deleteStep } = useApp();
  const currentSession = useCurrentSession();
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

  // Step form dialog state
  const [stepFormOpen, setStepFormOpen] = useState(false);
  const [stepFormMode, setStepFormMode] = useState<"create" | "edit">("create");
  const [editingStep, setEditingStep] = useState<Step | null>(null);

  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingStep, setDeletingStep] = useState<Step | null>(null);

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

  // Handle add step
  const handleAddStep = () => {
    setStepFormMode("create");
    setEditingStep(null);
    setStepFormOpen(true);
  };

  // Handle edit step
  const handleEditStep = (step: Step) => {
    setStepFormMode("edit");
    setEditingStep(step);
    setStepFormOpen(true);
  };

  // Handle delete step (open confirmation)
  const handleDeleteStep = (step: Step) => {
    setDeletingStep(step);
    setDeleteDialogOpen(true);
  };

  // Confirm delete step
  const confirmDeleteStep = () => {
    if (deletingStep && currentSession) {
      deleteStep(currentSession.session_id, deletingStep.id);
      setDeletingStep(null);
      setDeleteDialogOpen(false);
    }
  };

  // Handle step form submit
  const handleStepFormSubmit = (data: {
    actor: string;
    skill: string | null;
    tool: string;
    input_label: string;
    output_label: string;
    summary?: string;
    tags?: string[];
  }) => {
    if (!currentSession) return;

    if (stepFormMode === "create") {
      addStep(currentSession.session_id, data);
    } else if (editingStep) {
      updateStep(currentSession.session_id, editingStep.id, data);
    }
  };

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
        isEditMode={state.isEditMode}
        onToggleEditMode={toggleEditMode}
      />

      <FlowMap
        steps={currentSession.steps}
        selectedStepId={selectedStepId}
        isEditMode={state.isEditMode}
        onSelectStep={setSelectedStepId}
        onEditStep={handleEditStep}
        onDeleteStep={handleDeleteStep}
        onAddStep={handleAddStep}
      />

      <StepDetailPanel step={selectedStep} />

      {/* Step Form Dialog */}
      <StepFormDialog
        open={stepFormOpen}
        onOpenChange={setStepFormOpen}
        mode={stepFormMode}
        step={editingStep}
        onSubmit={handleStepFormSubmit}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Step?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this step? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteStep}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
