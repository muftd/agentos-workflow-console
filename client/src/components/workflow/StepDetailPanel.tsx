import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, User, Wrench, Zap, Clock, Hash, Edit, Trash2 } from "lucide-react";
import type { Step } from "@/types/workflow";

interface StepDetailPanelProps {
  step: Step | undefined;
  isFirstStep?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onMoveLeft?: () => void;
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

/**
 * Info card component for metadata display
 */
function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-100/30 dark:bg-gray-800/30 border border-gray-200/50 dark:border-gray-700/50">
      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-900/60 dark:text-gray-100/60 mb-1">{label}</p>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{value}</p>
      </div>
    </div>
  );
}

export function StepDetailPanel({ step, isFirstStep = false, onEdit, onDelete, onMoveLeft }: StepDetailPanelProps) {
  if (!step) {
    return (
      <div className="border-t bg-gradient-to-br from-gray-100/30 dark:from-gray-800/30 via-white dark:via-gray-900 to-gray-100/20 dark:to-gray-800/20 p-8 md:p-12 text-center">
        <p className="text-gray-900/40 dark:text-gray-100/40 text-sm">选择一个节点查看详细信息</p>
      </div>
    );
  }

  return (
    <div
      className="border-t bg-gradient-to-br from-gray-100/30 dark:from-gray-800/30 via-white dark:via-gray-900 to-gray-100/20 dark:to-gray-800/20 p-8 md:p-12"
      role="region"
      aria-label="Step details"
    >
      <div className="container max-w-5xl mx-auto space-y-8">
        {/* Header with action buttons */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Step Details</h3>
            <p className="text-sm text-gray-900/60 dark:text-gray-100/60">
              Detailed information about this workflow step
            </p>
          </div>
          <div className="flex gap-2">
            {onMoveLeft && (
              <Button
                variant="outline"
                size="sm"
                onClick={onMoveLeft}
                disabled={isFirstStep}
                title={isFirstStep ? "Cannot move first step left" : "Move step left (earlier in workflow)"}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Move Left
              </Button>
            )}
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="destructive"
                size="sm"
                onClick={onDelete}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            )}
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard icon={Hash} label="Order" value={`#${step.order}`} />
          <InfoCard icon={Clock} label="Timestamp" value={formatDate(step.timestamp)} />
          <InfoCard icon={User} label="Actor" value={step.actor} />
          <InfoCard icon={Wrench} label="Tool" value={step.tool} />
          {step.skill && <InfoCard icon={Zap} label="Skill" value={step.skill} />}
        </div>

        {/* Input/Output Flow Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Card */}
          <Card className="p-6 border-2 border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-gray-900/60 dark:text-gray-100/60 rotate-180" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900/80 dark:text-gray-100/80 uppercase tracking-wide">
                Input
              </h4>
            </div>
            <p className="text-base leading-relaxed text-gray-900 dark:text-gray-100">{step.input_label}</p>
          </Card>

          {/* Output Card */}
          <Card className="p-6 border-2 border-blue-600/20 dark:border-blue-500/20 bg-gradient-to-br from-blue-600/5 dark:from-blue-400/5 to-white dark:to-gray-900">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-600/10 dark:bg-blue-400/10 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                Output
              </h4>
            </div>
            <p className="text-base leading-relaxed font-medium text-gray-900 dark:text-gray-100">
              {step.output_label}
            </p>
          </Card>
        </div>

        {/* Summary Section */}
        {step.summary && (
          <Card className="p-6 border border-gray-200/50 dark:border-gray-700/50 bg-gray-100/20 dark:bg-gray-800/20">
            <h4 className="text-sm font-semibold text-gray-900/80 dark:text-gray-100/80 uppercase tracking-wide mb-3">
              Summary
            </h4>
            <p className="text-sm leading-relaxed text-gray-900/70 dark:text-gray-100/70">{step.summary}</p>
          </Card>
        )}

        {/* Tags */}
        {step.tags && step.tags.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-900/80 dark:text-gray-100/80 uppercase tracking-wide mb-3">
              Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {step.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-3 py-1 text-xs font-medium"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
