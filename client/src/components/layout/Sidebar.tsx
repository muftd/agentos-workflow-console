import { useState } from "react";
import { Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
import { SessionList } from "@/components/session/SessionList";
import { SessionFormDialog } from "@/components/session/SessionFormDialog";
import { useApp, useSessions, useCurrentSessionId } from "@/contexts/AppContext";
import type { WorkflowSession } from "@/types/workflow";

export function Sidebar() {
  const { state, toggleSidebar, selectSession, addSession, updateSession, deleteSession, duplicateSession } = useApp();
  const sessions = useSessions();
  const currentSessionId = useCurrentSessionId();

  // Form dialog state
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [editingSession, setEditingSession] = useState<WorkflowSession | null>(null);

  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingSession, setDeletingSession] = useState<WorkflowSession | null>(null);

  // Handle new session
  const handleNewSession = () => {
    setFormMode("create");
    setEditingSession(null);
    setFormDialogOpen(true);
  };

  // Handle edit session
  const handleEditSession = (session: WorkflowSession) => {
    setFormMode("edit");
    setEditingSession(session);
    setFormDialogOpen(true);
  };

  // Handle duplicate session
  const handleDuplicateSession = (session: WorkflowSession) => {
    duplicateSession(session.session_id);
  };

  // Handle delete session (open confirmation)
  const handleDeleteSession = (session: WorkflowSession) => {
    setDeletingSession(session);
    setDeleteDialogOpen(true);
  };

  // Confirm delete session
  const confirmDeleteSession = () => {
    if (deletingSession) {
      deleteSession(deletingSession.session_id);
      setDeletingSession(null);
      setDeleteDialogOpen(false);
    }
  };

  // Handle form submit
  const handleFormSubmit = (data: { title: string; description?: string }) => {
    if (formMode === "create") {
      addSession(data);
    } else if (editingSession) {
      updateSession(editingSession.session_id, data);
    }
  };

  return (
    <>
      {/* Menu trigger button - highly visible */}
      <Button
        variant="default"
        size="icon"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 !bg-blue-600 hover:!bg-blue-700 !text-white shadow-lg border-2 !border-blue-700"
        aria-label="Toggle sessions sidebar"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Sidebar Sheet */}
      <Sheet open={state.isSidebarOpen} onOpenChange={toggleSidebar}>
        <SheetContent side="left" className="w-[340px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Workflow Sessions</SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            {/* New Session Button */}
            <Button
              onClick={handleNewSession}
              className="w-full"
              variant="default"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Session
            </Button>

            {/* Session List */}
            <SessionList
              sessions={sessions}
              currentSessionId={currentSessionId}
              onSelectSession={selectSession}
              onEditSession={handleEditSession}
              onDuplicateSession={handleDuplicateSession}
              onDeleteSession={handleDeleteSession}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Session Form Dialog */}
      <SessionFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        mode={formMode}
        session={editingSession}
        onSubmit={handleFormSubmit}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Session?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingSession?.title}"?
              This action cannot be undone and will permanently delete the session
              and all of its steps.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteSession}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
