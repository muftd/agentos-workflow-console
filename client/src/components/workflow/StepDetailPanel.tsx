import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Step } from "@/types/workflow";

interface StepDetailPanelProps {
  step: Step | undefined;
}

/**
 * Helper component for displaying detail items
 */
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-medium text-muted-foreground mb-1">
        {label}
      </dt>
      <dd className="text-base text-foreground">
        {value}
      </dd>
    </div>
  );
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

export function StepDetailPanel({ step }: StepDetailPanelProps) {
  if (!step) {
    return (
      <div className="border-t bg-muted/30 p-6 md:p-8 text-center text-muted-foreground">
        选择一个节点查看详细信息
      </div>
    );
  }

  return (
    <div className="border-t bg-muted/30 p-6 md:p-8" role="region" aria-label="Step details">
      <div className="container max-w-4xl mx-auto">
        <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Step Details</h3>

        {/* Basic info grid */}
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DetailItem label="Order" value={`#${step.order}`} />
          <DetailItem label="Timestamp" value={formatDate(step.timestamp)} />
          <DetailItem label="Actor" value={step.actor} />
          <DetailItem label="Tool" value={step.tool} />
          {step.skill && <DetailItem label="Skill" value={step.skill} />}
        </dl>

        <Separator className="my-6" />

        {/* Input/Output section */}
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Input</h4>
            <p className="text-base">{step.input_label}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Output</h4>
            <p className="text-base font-medium">{step.output_label}</p>
          </div>

          {step.summary && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Summary</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.summary}</p>
            </div>
          )}

          {step.tags && step.tags.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {step.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
