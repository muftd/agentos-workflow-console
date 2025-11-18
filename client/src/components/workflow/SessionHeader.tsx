import { Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface SessionHeaderProps {
  title: string;
  createdAt: string;
  description: string;
}

/**
 * Format ISO 8601 date string to localized format
 */
function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function SessionHeader({ title, createdAt, description }: SessionHeaderProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
        <h1 className="text-xl md:text-2xl font-semibold text-foreground">
          {title}
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
          <time className="text-sm text-muted-foreground inline-flex items-center gap-1.5 shrink-0">
            <Clock className="w-4 h-4" />
            {formatDate(createdAt)}
          </time>
          <Separator orientation="vertical" className="h-4 hidden sm:block" />
          <p className="text-sm text-muted-foreground line-clamp-2 sm:line-clamp-1">
            {description}
          </p>
        </div>
      </div>
    </header>
  );
}
