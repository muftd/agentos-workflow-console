# Workflow Log Schema v0.1

> 目的：统一「AgentOS 多 Coach 协作流程」的结构化记录格式，让
> - Claude Code / skills 可以往同一个格式里写日志
> - Workflow Console Web Demo 可以只认这一个 JSON 契约来做可视化回放

## 1. 顶层结构（Session）

每一条「高光协作流程」是一条 Session，对应一个 JSON 文件。

```jsonc
{
  "session_id": "2025-11-18-sourceX-to-demo-snippet",
  "title": "从信息源X，到demo snippet的高光协作链路",
  "created_at": "2025-11-18T10:00:00+08:00",
  "description": "围绕某篇AI文章，从信息源处理→常青笔记→知识花园碰撞→demo火种→Claude Code snippet的一次完整流。",
  "steps": [ /* Hop 列表，见下 */ ]
}

字段说明：

* `session_id`：此条工作流的唯一 ID，用日期 + 关键任务名即可。
* `title`：面向人类的一句话标题，适合在 Web 页顶部展示。
* `created_at`：大致发生时间，精确度不强制。
* `description`：对这条 Session 的简短描述。

## 2. 步骤（Step / Hop）

每个 Step 代表一次「切到某个 Coach/工具做了一个动作」，是可视化中一个节点。

```jsonc
{
  "id": "step-03",
  "order": 3,
  "timestamp": "2025-11-18T10:34:00+08:00",

  "actor": "Coach C",
  "skill": "knowledge-processing",
  "tool": "Claude Code",

  "input_label": "信息源：《X的长文笔记》",
  "output_label": "常青：《X-核心观点A/B/C》",

  "summary": "使用knowledge-processing SOP处理信息源，产出一篇结构化常青笔记。",
  "tags": ["information_source", "evergreen"]
}
```

### 2.1 必填字段

* `id`：在本 session 内唯一的 step ID，如 `step-01`。

* `order`：整数，用于排序（即使 timestamp 缺失也可按 order 排序）。

* `timestamp`：粗粒度时间，精确到分钟或只用日期皆可。

* `actor`：参与方 / Coach / 角色，例如：

  * `"Coach C"`、`"Coach A"`、`"Coach E"`、`"Coach R"`
  * 或者外部工具角色如 `"Figma"`, `"Replit"`, `"Make"`。

* `skill`：如果是通过某个 skill 跑的，填 skill 名，例如：

  * `"knowledge-processing"`, `"demo-seed-extractor"`
  * 若无，填 `null` 或空字符串。

* `tool`：实际使用的执行容器，例如：

  * `"Claude Code"`, `"ChatGPT"`, `"Gemini"`, `"Replit"`，等。

* `input_label`：一句话描述本次 Hop 的输入对象

  * 例：`"信息源：《X长文原文》"`, `"常青：《记忆重新整合》"`.

* `output_label`：一句话描述本次 Hop 的输出对象

  * 例：`"常青：《X-核心观点A/B/C》"`, `"demo seed：记忆重新整合→demo idea"`.

### 2.2 选填字段

* `summary`：简短动作描述（1–2 句）

  * 例：`"将常青与既有知识花园中的Y笔记碰撞，发现一处视角冲突。"`
* `tags`：字符串数组，方便未来做过滤/着色

  * 例：`["information_source", "evergreen"]`, `["demo_seed", "snippet"]`.

## 3. 约定

* 一条 Session 中，`steps` 按 `order` 升序连接成一条主线。
* 每个 Step 代表一次「Hop」，即：从某个输入对象，经由某个 Actor/Skill/Tool，产生某个输出对象。
* v0.1 中，我们只关心一条线性主线，不处理分叉和并行。
* 未来如需支持分支 / 并行执行，可以在此 schema 基础上扩展 `parent_ids` / `lane` 等字段。