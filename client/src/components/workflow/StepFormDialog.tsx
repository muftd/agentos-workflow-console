import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Step } from "@/types/workflow";

interface StepFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  step?: Step | null;
  onSubmit: (data: {
    actor: string;
    skill: string | null;
    tool: string;
    input_label: string;
    output_label: string;
    summary?: string;
    tags?: string[];
  }) => void;
}

export function StepFormDialog({
  open,
  onOpenChange,
  mode,
  step,
  onSubmit,
}: StepFormDialogProps) {
  const [actor, setActor] = useState("");
  const [skill, setSkill] = useState("");
  const [tool, setTool] = useState("");
  const [inputLabel, setInputLabel] = useState("");
  const [outputLabel, setOutputLabel] = useState("");
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Reset form when dialog opens/closes or step changes
  useEffect(() => {
    if (open) {
      if (mode === "edit" && step) {
        setActor(step.actor);
        setSkill(step.skill || "");
        setTool(step.tool);
        setInputLabel(step.input_label);
        setOutputLabel(step.output_label);
        setSummary(step.summary || "");
        setTags(step.tags?.join(", ") || "");
      } else {
        setActor("");
        setSkill("");
        setTool("");
        setInputLabel("");
        setOutputLabel("");
        setSummary("");
        setTags("");
      }
      setErrors({});
    }
  }, [open, mode, step]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: { [key: string]: string } = {};
    if (!actor.trim()) newErrors.actor = "Actor is required";
    if (!tool.trim()) newErrors.tool = "Tool is required";
    if (!inputLabel.trim()) newErrors.inputLabel = "Input label is required";
    if (!outputLabel.trim()) newErrors.outputLabel = "Output label is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      actor: actor.trim(),
      skill: skill.trim() || null,
      tool: tool.trim(),
      input_label: inputLabel.trim(),
      output_label: outputLabel.trim(),
      summary: summary.trim() || undefined,
      tags: tags.trim() ? tags.split(",").map(t => t.trim()).filter(Boolean) : undefined,
    });

    // Close dialog
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] flex flex-col gap-0 p-0 !bg-white dark:!bg-gray-900">
        <form onSubmit={handleSubmit} className="flex flex-col h-full bg-white dark:bg-gray-900">
          {/* Fixed Header */}
          <DialogHeader className="px-6 pt-6 pb-4 shrink-0 bg-white dark:bg-gray-900">
            <DialogTitle className="text-gray-900 dark:text-gray-100">
              {mode === "create" ? "Create New Step" : "Edit Step"}
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              {mode === "create"
                ? "Add a new step to the workflow. Fields marked with * are required."
                : "Update the step information. Fields marked with * are required."}
            </DialogDescription>
          </DialogHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-2 bg-white dark:bg-gray-900">
            <div className="grid gap-6">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2">
                  Basic Information
                </h4>

                {/* Actor & Tool - Side by side */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="actor" className="flex items-center gap-1">
                      Actor
                      <span className="text-destructive text-base">*</span>
                    </Label>
                    <Input
                      id="actor"
                      placeholder="Coach C, Claude Code, etc."
                      value={actor}
                      onChange={(e) => setActor(e.target.value)}
                      className={errors.actor ? "border-destructive" : ""}
                      autoFocus
                    />
                    {errors.actor && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <span className="font-semibold">⚠</span> {errors.actor}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="tool" className="flex items-center gap-1">
                      Tool
                      <span className="text-destructive text-base">*</span>
                    </Label>
                    <Input
                      id="tool"
                      placeholder="Claude Code, ChatGPT, etc."
                      value={tool}
                      onChange={(e) => setTool(e.target.value)}
                      className={errors.tool ? "border-destructive" : ""}
                    />
                    {errors.tool && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <span className="font-semibold">⚠</span> {errors.tool}
                      </p>
                    )}
                  </div>
                </div>

                {/* Skill - Full width */}
                <div className="grid gap-2">
                  <Label htmlFor="skill">Skill (optional)</Label>
                  <Input
                    id="skill"
                    placeholder="e.g., knowledge-processing, demo-seed-extractor"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    The workflow skill or capability being executed
                  </p>
                </div>
              </div>

              {/* Workflow Information Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2">
                  Workflow Information
                </h4>

                {/* Input Label */}
                <div className="grid gap-2">
                  <Label htmlFor="input_label" className="flex items-center gap-1">
                    Input Label
                    <span className="text-destructive text-base">*</span>
                  </Label>
                  <Input
                    id="input_label"
                    placeholder="What this step receives as input"
                    value={inputLabel}
                    onChange={(e) => setInputLabel(e.target.value)}
                    className={errors.inputLabel ? "border-destructive" : ""}
                  />
                  {errors.inputLabel && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <span className="font-semibold">⚠</span> {errors.inputLabel}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Brief description of what this step receives
                  </p>
                </div>

                {/* Output Label */}
                <div className="grid gap-2">
                  <Label htmlFor="output_label" className="flex items-center gap-1">
                    Output Label
                    <span className="text-destructive text-base">*</span>
                  </Label>
                  <Input
                    id="output_label"
                    placeholder="What this step produces as output"
                    value={outputLabel}
                    onChange={(e) => setOutputLabel(e.target.value)}
                    className={errors.outputLabel ? "border-destructive" : ""}
                  />
                  {errors.outputLabel && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <span className="font-semibold">⚠</span> {errors.outputLabel}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Brief description of what this step produces
                  </p>
                </div>

                {/* Summary */}
                <div className="grid gap-2">
                  <Label htmlFor="summary">Summary (optional)</Label>
                  <Textarea
                    id="summary"
                    placeholder="Brief description of what this step does (1-2 sentences)"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                </div>

                {/* Tags */}
                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags (optional)</Label>
                  <Input
                    id="tags"
                    placeholder="research, implementation, planning"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Comma-separated keywords for categorization
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Footer */}
          <DialogFooter className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {mode === "create" ? "Create Step" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
