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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {mode === "create" ? "Create New Step" : "Edit Step"}
            </DialogTitle>
            <DialogDescription>
              {mode === "create"
                ? "Add a new step to the workflow."
                : "Update the step information."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Actor */}
            <div className="grid gap-2">
              <Label htmlFor="actor">
                Actor <span className="text-destructive">*</span>
              </Label>
              <Input
                id="actor"
                placeholder="e.g., Coach C, Claude Code, Replit"
                value={actor}
                onChange={(e) => setActor(e.target.value)}
                autoFocus
              />
              {errors.actor && (
                <p className="text-sm text-destructive">{errors.actor}</p>
              )}
            </div>

            {/* Skill */}
            <div className="grid gap-2">
              <Label htmlFor="skill">Skill (optional)</Label>
              <Input
                id="skill"
                placeholder="e.g., knowledge-processing"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
              />
            </div>

            {/* Tool */}
            <div className="grid gap-2">
              <Label htmlFor="tool">
                Tool <span className="text-destructive">*</span>
              </Label>
              <Input
                id="tool"
                placeholder="e.g., Claude Code, ChatGPT, Gemini"
                value={tool}
                onChange={(e) => setTool(e.target.value)}
              />
              {errors.tool && (
                <p className="text-sm text-destructive">{errors.tool}</p>
              )}
            </div>

            {/* Input Label */}
            <div className="grid gap-2">
              <Label htmlFor="input_label">
                Input Label <span className="text-destructive">*</span>
              </Label>
              <Input
                id="input_label"
                placeholder="Brief description of input"
                value={inputLabel}
                onChange={(e) => setInputLabel(e.target.value)}
              />
              {errors.inputLabel && (
                <p className="text-sm text-destructive">{errors.inputLabel}</p>
              )}
            </div>

            {/* Output Label */}
            <div className="grid gap-2">
              <Label htmlFor="output_label">
                Output Label <span className="text-destructive">*</span>
              </Label>
              <Input
                id="output_label"
                placeholder="Brief description of output"
                value={outputLabel}
                onChange={(e) => setOutputLabel(e.target.value)}
              />
              {errors.outputLabel && (
                <p className="text-sm text-destructive">{errors.outputLabel}</p>
              )}
            </div>

            {/* Summary */}
            <div className="grid gap-2">
              <Label htmlFor="summary">Summary (optional)</Label>
              <Textarea
                id="summary"
                placeholder="Brief action description (1-2 sentences)"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={3}
              />
            </div>

            {/* Tags */}
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags (optional)</Label>
              <Input
                id="tags"
                placeholder="Comma-separated tags, e.g., research, implementation"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Separate multiple tags with commas
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {mode === "create" ? "Create" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
