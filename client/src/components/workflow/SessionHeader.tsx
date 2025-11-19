import { Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface SessionHeaderProps {
  title: string;
  createdAt: string;
  description?: string;
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
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container max-w-7xl mx-auto px-6 md:px-8 py-5 md:py-7">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          {title}
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mt-3">
          <time className="text-sm text-gray-900/60 dark:text-gray-100/60 inline-flex items-center gap-2 shrink-0 font-medium">
            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            {formatDate(createdAt)}
          </time>
          {description && (
            <>
              <Separator orientation="vertical" className="h-4 hidden sm:block bg-gray-200/60 dark:bg-gray-700/60" />
              <p className="text-sm text-gray-900/70 dark:text-gray-100/70 line-clamp-2 sm:line-clamp-1 leading-relaxed">
                {description}
              </p>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
