# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Workflow Console** is a read-only web application that visualizes multi-Coach collaboration workflows. It takes structured `workflow-log` JSON data and renders it as an interactive Flow visualization showing how work transitions across multiple Coaches/tools, with detailed step information panels.

### Key Objectives
- Visualize a single high-impact collaboration narrative (6–12 Hops) as an interactive timeline
- Show how context flows between different Coach/tool actors
- Serve as a prototype for AgentOS's workflow replay and documentation system

## Architecture

### Data Model
- **Schema**: `docs/workflow-log-schema.md` defines the structure
- **Sample Data**: `data/workflow-log-sample.json` contains a single workflow session
- A **Session** = one complete workflow with metadata (session_id, title, created_at, description)
- A **Step** = one Hop representing an actor/skill/tool action with input/output labels

### Core Concepts
- **Actor**: Coach (A, C, E, R), tool (Claude Code, ChatGPT, Replit), or service
- **Skill**: Named workflow (e.g., knowledge-processing, demo-seed-extractor)
- **Tool**: Execution environment (Claude Code, ChatGPT, Gemini, Replit)
- **Hop**: A single transition from input → actor/skill/tool → output

### UI Architecture
The application has three main sections:
1. **Top**: Session metadata (title, created_at, description)
2. **Middle**: Flow Map (linear node sequence with arrows, clickable nodes)
3. **Bottom**: Step Detail Panel (shows actor, skill, tool, input/output labels, summary for selected step)

**Interaction**: Clicking a node highlights it and updates the detail panel.

## Repository Structure & Git Strategy

### Location & Relationship
This project is organized as a **Git Submodule** within the obsidian-vault:
```
obsidian-vault/                          ← Main knowledge base repo
└── projects/workflow-console/           ← This project (submodule)
    └── Independent GitHub repo: agentos-workflow-console
```

### Development Strategy (Plan A: Independent Iteration)
**Key principle**: Develop workflow-console independently without requiring frequent obsidian-vault updates.

**Daily workflow** (in `projects/workflow-console/`):
```bash
# Work normally, push directly to agentos-workflow-console repo
git add . && git commit -m "..." && git push origin main
```

**Milestone updates** (in `obsidian-vault/` at release points):
```bash
# Only when completing v0.1, v0.2, etc.
git add projects/workflow-console
git commit -m "Release: Workflow Console v0.1"
git push origin main
```

**Why this approach**:
- ✅ No friction during daily development
- ✅ GitHub repo (agentos-workflow-console) always stays current
- ✅ obsidian-vault captures snapshot at release milestones
- ✅ Clear separation between active development and knowledge base

### Reference Documents
When starting development, read these guides in order:
1. **WORKFLOW.md** — Daily operations and git strategy (method Plan A)
2. **docs/tooling-workflow.md** — ChatGPT + Claude Code + Replit collaboration protocol
3. **docs/plan.md** — Overall development stages and timeline
4. **docs/iteration-*.md** — Current iteration goals and specs

## Development

### Project Structure
```
.
├── docs/
│   ├── workflow-log-schema.md    # Data schema documentation
│   ├── plan.md                    # Development plan (stages 1-4)
│   ├── task.md                    # Task checklist for implementation
│   └── context.md
├── data/
│   └── workflow-log-sample.json  # Single workflow session for v0.1
├── specs/
│   └── mvp-v0.1-spec.md          # Full feature spec (UI, interactions, scope)
└── CLAUDE.md
```

### Recommended Tech Stack
Follow the PromptImagine pattern:
- **React** + **TypeScript** for UI
- **Tailwind CSS** + **shadcn UI** for styling
- **Vite** for bundling
- Deploy on **Replit** (no database needed; JSON file is the data source)

### Key Files to Understand
- `specs/mvp-v0.1-spec.md:52-86` — UI layout and interaction spec
- `docs/workflow-log-schema.md` — Complete data contract
- `data/workflow-log-sample.json` — Example to understand structure

## Common Development Tasks

### Reading & Parsing the Workflow Log
```typescript
// Load and validate the JSON
import workflowLog from '../data/workflow-log-sample.json';
const session = workflowLog as WorkflowSession;
const steps = session.steps.sort((a, b) => a.order - b.order);
```

### Data Loader Module
Create a simple module to load and validate JSON:
- Read `workflow-log-sample.json`
- Map to TypeScript types (Session, Step interfaces)
- Validate required fields
- Export for use in React components

### UI Component Structure
```
WorkflowConsolePage
├── SessionHeader (displays title, created_at, description)
├── FlowMap (renders clickable node sequence)
│   └── StepNode (individual node, shows order, actor, tool)
└── StepDetailPanel (displays full step info for selected step)
```

### Updating Sample Data
To show a different workflow:
1. Edit `data/workflow-log-sample.json` following `workflow-log-schema.md`
2. Update session metadata and steps array
3. Ensure each step has required fields: id, order, actor, tool, input_label, output_label
4. Optionally add summary, skill, tags for richer display

## Non-Goals for v0.1
- User authentication or multi-session listing
- Real write/edit capabilities
- Auto-sync from Obsidian/AgentOS
- Branching or parallel workflow visualization
- Complex graph algorithms or heavy animations
- Database storage (static JSON only)

## Future Extensions
The schema is designed to accommodate:
- Multiple workflow logs in a selection UI
- Filter/search by Coach or tags
- Real-time log sync from AgentOS skill execution
- Branching workflow support (via parent_ids/lane fields)

See `specs/mvp-v0.1-spec.md:114-118` for detailed extension hooks.

## Development Stages (from plan.md)
1. **Stage 1**: Data schema & sample JSON (validation)
2. **Stage 2**: UI skeleton (React + layout + virtual data)
3. **Stage 3**: Data binding & basic interaction (real JSON + clicking)
4. **Stage 4**: Visual polish & deployment (styling + Replit setup)

Success criteria: Load `workflow-log-sample.json`, render clickable flow timeline, display step details on click, deploy on public Replit URL.
