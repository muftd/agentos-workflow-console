/**
 * Workflow Log Schema v0.1
 * TypeScript type definitions for workflow console
 */

/**
 * A single step/hop in the workflow
 */
export interface Step {
  /** Unique ID within the session */
  id: string;

  /** Order for sorting (integer) */
  order: number;

  /** Timestamp (ISO 8601 format) */
  timestamp: string;

  /** Actor/Coach/Role (e.g., "Coach C", "Coach A", "Replit") */
  actor: string;

  /** Skill name if applicable (null if not using a skill) */
  skill: string | null;

  /** Execution tool/environment (e.g., "Claude Code", "ChatGPT", "Replit") */
  tool: string;

  /** One-line description of input object */
  input_label: string;

  /** One-line description of output object */
  output_label: string;

  /** Optional: Brief action description (1-2 sentences) */
  summary?: string;

  /** Optional: Tags for filtering/coloring */
  tags?: string[];
}

/**
 * A workflow session representing a complete collaboration flow
 */
export interface WorkflowSession {
  /** Unique session ID (e.g., "2025-11-18-agentos-demo-seed") */
  session_id: string;

  /** Human-readable title for display */
  title: string;

  /** Creation timestamp (ISO 8601 format) */
  created_at: string;

  /** Brief description of the session */
  description: string;

  /** List of steps/hops in the workflow */
  steps: Step[];
}
