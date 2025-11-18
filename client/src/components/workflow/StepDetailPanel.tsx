import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight, User, Wrench, Zap, Clock, Hash } from "lucide-react";
import type { Step } from "@/types/workflow";

interface StepDetailPanelProps {
  step: Step | undefined;
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
    <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/50">
      <Icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-foreground/60 mb-1">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}

export function StepDetailPanel({ step }: StepDetailPanelProps) {
  if (!step) {
    return (
      <div className="border-t bg-gradient-to-br from-muted/30 via-background to-muted/20 p-8 md:p-12 text-center">
        <p className="text-foreground/40 text-sm">选择一个节点查看详细信息</p>
      </div>
    );
  }

  return (
    <div
      className="border-t bg-gradient-to-br from-muted/30 via-background to-muted/20 p-8 md:p-12"
      role="region"
      aria-label="Step details"
    >
      <div className="container max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Step Details</h3>
          <p className="text-sm text-foreground/60">
            Detailed information about this workflow step
          </p>
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
          <Card className="p-6 border-2 border-border/50 shadow-card bg-card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-foreground/60 rotate-180" />
              </div>
              <h4 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                Input
              </h4>
            </div>
            <p className="text-base leading-relaxed text-foreground">{step.input_label}</p>
          </Card>

          {/* Output Card */}
          <Card className="p-6 border-2 border-primary/20 shadow-card bg-gradient-to-br from-primary/5 to-card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-primary" />
              </div>
              <h4 className="text-sm font-semibold text-primary uppercase tracking-wide">
                Output
              </h4>
            </div>
            <p className="text-base leading-relaxed font-medium text-foreground">
              {step.output_label}
            </p>
          </Card>
        </div>

        {/* Summary Section */}
        {step.summary && (
          <Card className="p-6 border border-border/50 shadow-card bg-muted/20">
            <h4 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide mb-3">
              Summary
            </h4>
            <p className="text-sm leading-relaxed text-foreground/70">{step.summary}</p>
          </Card>
        )}

        {/* Tags */}
        {step.tags && step.tags.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide mb-3">
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
