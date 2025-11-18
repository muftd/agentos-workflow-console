import { cn } from "@/lib/utils";
import type { WorkflowSession } from "@/types/workflow";
import { Calendar, FileText, MoreVertical, Edit, Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SessionListItemProps {
  session: WorkflowSession;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

/**
 * Format date to readable format
 */
function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;

  return new Intl.DateTimeFormat('zh-CN', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function SessionListItem({
  session,
  isSelected,
  onSelect,
  onEdit,
  onDuplicate,
  onDelete,
}: SessionListItemProps) {
  return (
    <div
      className={cn(
        "relative w-full p-4 rounded-lg",
        "border-2 transition-all duration-200",
        "flex flex-col gap-2",
        "hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800",
        isSelected && "border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-950",
        !isSelected && "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
      )}
    >
      {/* Main clickable area */}
      <button
        onClick={onSelect}
        className="w-full text-left flex flex-col gap-2"
      >
        {/* Title */}
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate pr-8">
          {session.title}
        </h3>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(session.created_at)}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>{session.steps.length} steps</span>
          </div>
        </div>

        {/* Description preview */}
        {session.description && (
          <p className="text-xs text-gray-500 dark:text-gray-500 line-clamp-2 leading-relaxed">
            {session.description}
          </p>
        )}
      </button>

      {/* Action menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className="w-4 h-4" />
            <span className="sr-only">Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDuplicate}>
            <Copy className="w-4 h-4 mr-2" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={onDelete}
            className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
