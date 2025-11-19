import { SessionListItem } from "./SessionListItem";
import type { WorkflowSession } from "@/types/workflow";

interface SessionListProps {
  sessions: WorkflowSession[];
  currentSessionId: string | null;
  onSelectSession: (id: string) => void;
  onEditSession: (session: WorkflowSession) => void;
  onDuplicateSession: (session: WorkflowSession) => void;
  onDeleteSession: (session: WorkflowSession) => void;
}

export function SessionList({
  sessions,
  currentSessionId,
  onSelectSession,
  onEditSession,
  onDuplicateSession,
  onDeleteSession,
}: SessionListProps) {
  if (sessions.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <p className="text-sm text-gray-900/40 dark:text-gray-100/40">No workflows yet</p>
        <p className="text-xs text-gray-900/30 dark:text-gray-100/30 mt-2">
          Create your first workflow to get started
        </p>
      </div>
    );
  }

  // Sort sessions by created_at (newest first)
  const sortedSessions = [...sessions].sort((a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="space-y-3">
      {sortedSessions.map((session) => (
        <SessionListItem
          key={session.session_id}
          session={session}
          isSelected={session.session_id === currentSessionId}
          onSelect={() => onSelectSession(session.session_id)}
          onEdit={() => onEditSession(session)}
          onDuplicate={() => onDuplicateSession(session)}
          onDelete={() => onDeleteSession(session)}
        />
      ))}
    </div>
  );
}
