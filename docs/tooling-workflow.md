# Tooling Workflow · Workflow Console

> 目标：统一 ChatGPT 网页版、Claude Code、Replit、GitHub 之间的协作方式，避免"平行宇宙代码"，让每一轮迭代都有清晰的责任边界与操作流程。
>
> **项目特性**：Workflow Console 是一个只读可视化 Web 应用，展示多 Coach 协作流程。核心是数据展示和交互体验，无后端逻辑、无 LLM 调用、无 API 集成。

---

## 0. 总则：唯一真相源 & 单一工作端

1. **GitHub 仓库是唯一真相源（Source of Truth）**
   - 所有"正式认可的代码状态"都必须以 GitHub 上的主分支为准。
   - Replit、Claude Code、本地副本，都只是 GitHub 的不同"工作视图"。

2. **任一时刻只允许一个"活跃工作端"持有未推送代码**
   - 只能在 **Replit** 或 **Claude Code / 本地环境** 中有"未 commit / 未 push 的变更"，不能两边同时。
   - 每次切换工作端前，必须确保：
     - 当前端：**改动已经 commit + push** 或明确丢弃
     - 目标端：**先 git pull**，再开始改。

---

## 1. 角色分工

### 1.1 ChatGPT 网页版（需求定义 / 中控台）

**定位**：
- 项目级"迭代规划 + UI/UX 设计指导 + 总体控制"。

**职责**：

1. **迭代目标收敛（Iteration Brief）**
   - 协助定义每一轮迭代的 1–2 个核心目标，避免 scope 失控。
   - 输出形态建议：
     - `docs/iteration-YYYYMMDD-<short-title>.md`
     - 或更新 `docs/plan.md` 中的当前阶段计划。

2. **UI/UX 规范与数据展示设计**
   - 定义：
     - 界面布局与组件结构（顶部概览 / 中间流程图 / 底部详情面板）
     - 节点卡片的信息呈现方式（显示哪些字段、如何排版）
     - 交互反馈设计（点击、hover、高亮等视觉反馈）
     - 从 `workflow-log-sample.json` 到屏幕展示的数据映射规则
   - 这些内容将作为 Claude Code 实现 React 组件的"上游 artefact"。

3. **跨工具总控 & 复盘**
   - 汇总 Claude Code 的实现结果 + Replit 上的实际表现：
     - 记录样式问题、交互体验问题
     - 验证数据呈现是否清晰
     - 决定下一轮迭代的 focus
   - 不直接改代码，但影响代码迭代的方向和标准。

---

### 1.2 Claude Code（主力开发）

**定位**：
- 主力前端开发环境 + GitHub 协作中枢。

**职责**：

1. **读取 dev docs & 计划执行**
   - 打开 `agentos-workflow-console` 仓库（或本地 `projects/workflow-console/`）；
   - 读取：
     - `CLAUDE.md`（项目指导）
     - `docs/plan.md`（开发阶段）
     - `WORKFLOW.md`（协作工作流）
     - `docs/tooling-workflow.md`（本文件）
     - 最近一轮 `docs/iteration-*.md`（当前迭代目标）
   - 基于这些 artefact 生成实现计划（可写入 `docs/iteration-*.md` 中）。

2. **按计划修改代码 & 实现 UI**
   - 在 React + TypeScript 项目中按阶段实施：
     - 修改/新增 React 组件（SessionHeader、FlowMap、StepDetailPanel 等）
     - 实现数据加载逻辑（从 `workflow-log-sample.json` 读取）
     - 实现交互逻辑（节点点击、高亮、详情面板更新）
     - Tailwind + shadcn UI 样式调整
   - 不需要处理后端逻辑、API 调用、或 LLM 集成。

3. **本地验证 & 提交**
   - 在本地开发环境中完成：
     - 启动 dev server（`npm run dev` 或类似）
     - 手动测试流程（点击节点、查看详情）
     - 验证响应式布局和样式
   - 将完整改动 `git commit` 并 `git push` 到 GitHub。

---

### 1.3 Replit（部署环境 + 线上验收场）

**定位**：
- "线上运行 + 实际体验验收环境"，而不是主力开发 IDE。

**职责**：

1. **拉取 GitHub 最新代码并部署**
   - 通过 Replit 的 Version Control 或终端：
     - `git pull origin main`（或当前主分支）
   - 运行项目（Run 或 `npm start`）并确保项目正常启动。

2. **处理 Replit 专属环境/部署问题（小范围）**
   - 典型场景：
     - 端口 / 运行命令 / 构建脚本等与 Replit 环境强相关的问题
     - JSON 数据文件的路径配置（Replit vs 本地）
     - 依赖安装或构建报错
   - 在这种情况下允许在 Replit 上做**小范围改动 + 立即测试**，但必须遵守"修改后立即 commit + push"的规则（见 §3）。

3. **审查线上体验 & 数据展示**
   - 确认：
     - Web 页面可正常访问
     - workflow-log 数据正确加载并渲染
     - Flow Map 节点序列展示完整
     - 点击节点可切换详情面板
     - 样式和布局清晰可读
   - 将发现的问题记录为下一轮迭代的输入（回到 ChatGPT / Claude Code）。

---

### 1.4 GitHub（唯一真相源）

**定位**：
- 代码与 dev docs 的集中存储；所有环境的共同基准线。

**职责**：

- 存放：
  - 源代码
  - Dev Docs（计划、上下文、迭代记录、工作流等）
- 所有部署与开发都必须基于 GitHub 上的状态展开。

---

## 2. 标准迭代流程

> 目标：用最少的切换完成"想清楚 → 实现 → 部署 → 回顾"的闭环。

### Step 1：在 ChatGPT 明确本轮目标 & UI 设计

- 和 ChatGPT 讨论并敲定：
  - 本轮迭代只做 1–2 个改动（例如：实现 Flow Map 节点、调整样式、优化交互反馈）
  - UI 布局、数据字段映射、交互反馈设计
- 输出或更新：
  - `docs/iteration-YYYYMMDD-*.md`（当前轮迭代说明，含UI草图/设计描述）
  - 如有必要，微调 `docs/plan.md`

> **产出**：清晰可读的 UI 规范和设计指导，供 Claude Code 直接实现。

---

### Step 2：在 Claude Code 实现

1. **同步代码**
   - `git pull origin main`
   - 确认本地副本与 GitHub 一致。

2. **加载 dev docs & 生成执行计划**
   - 让 Claude Code 阅读：
     - `CLAUDE.md`（项目总体指导）
     - `docs/tooling-workflow.md`（本文件）
     - `WORKFLOW.md`（Git 协作策略）
     - 最新的 `docs/iteration-*.md`、`docs/plan.md`
   - 生成并记录一个分阶段执行计划（可在 console 打印或写入 `docs/iteration-*.md`）。

3. **实现 & 本地验证**
   - 按计划修改 React 组件和样式；
   - 运行 dev server（`npm run dev` 等）；
   - 手动测试交互流程，确保在本地环境可用。

4. **提交 & 推送**
   - `git commit -am "<清晰的 message>"`
   - `git push origin main`

---

### Step 3：在 Replit 部署 & 验收

1. **从 GitHub 拉取最新代码**
   - 使用 Replit Version Control 面板或终端：
     - `git pull origin main`

2. **运行 & 手动验收**
   - 点击 Run 或执行启动命令（`npm start` / `npm run dev` 等）；
   - 以真实用户视角走一遍核心流程：
     - 页面加载后能否看到 Session 概览（标题、描述）
     - Flow Map 是否正确展示所有步骤节点
     - 点击不同节点，详情面板是否正确更新
     - 样式和排版是否清晰、响应式是否正常
   - 记录异常与体验问题。

3. **如遇到 Replit 专属问题**
   - 若问题明显是部署/环境相关（例如构建报错、路径问题、依赖缺失）：
     - 在 Replit 中做小范围修复；
     - 验证通过后，**立即 commit + push 回 GitHub**（流程见 §3.2）。

---

### Step 4：回到 ChatGPT 做小结 & 规划下一轮

- 带着：
  - Claude Code 的变更摘要（commit 信息、实现了哪些组件）
  - Replit 上的实际表现 & 问题（样式问题、交互反馈不足、布局不清晰等）
- 与 ChatGPT 沟通：
  - 这轮目标是否完成？
  - 有哪些 UI/UX 层面的发现或改进空间？
  - 数据展示是否清晰？交互反馈是否足够？
  - 下一轮只选 1–2 个最重要的改动点（例如：调整节点样式、优化触觉反馈、增加动画）。

---

## 3. 双端改代码的协作协议

> 核心目标：避免 Replit 和 Claude Code 形成"两个平行版本"。

### 3.1 黄金规则（一定要遵守）

1. **需要开始写代码的一端：必须先 `git pull`**
   - 确保当前端的代码 = GitHub 最新状态。

2. **准备切换工作端之前：必须先 `git commit + git push` 或清空改动**
   - 不允许一端保留未推送的改动时，另一端也开始改同一份代码。

> 用一句话记：
> **"谁要写，谁先 pull；谁写完，谁就 push；换人写之前先把事收尾。"**

---

### 3.2 场景 A：在 Replit 中做"小范围部署修复"

典型用例：
- 修复 JSON 数据文件的路径问题（本地 vs Replit）
- 修复只在 Replit 运行环境出现的构建错误、端口问题等

**固定流程：**

1. **确认 Claude Code 端已收尾**
   - 在 Claude Code / 本地：
     - 将现有改动全部 `commit + push`
     - 或明确放弃未提交改动
   - 保证 GitHub 上是一个"完整状态"。

2. **Replit 拉取最新代码**
   - 在 Replit：
     - `git pull origin main`

3. **在 Replit 做小范围修复 + 立即测试**
   - 修改相关配置/代码（例如数据路径、构建脚本）；
   - 用 Replit Run 验证问题已解决。

4. **立刻 commit + push 回 GitHub**
   - 在 Replit Version Control 或终端中：
     - `git commit -am "fix: json data path for replit env"`
     - `git push origin main`

5. **回到 Claude Code 前，先拉取新状态**
   - 在 Claude Code / 本地：
     - `git pull origin main`
   - 之后再开始下一轮功能迭代。

---

### 3.3 场景 B：在 Claude Code 做功能开发，再交给 Replit 验收

**固定流程：**

1. Claude Code / 本地：
   - `git pull origin main`
   - 修改代码（添加组件、实现交互、调整样式）+ 本地验证。

2. 改动完成：
   - `git commit -am "feat: add flowmap component and step detail panel"`
   - `git push origin main`

3. Replit：
   - `git pull origin main`
   - Run 验收（页面展示、数据加载、交互表现）。

---

### 3.4 遇到 Git 冲突时的建议

如果在任一端 `git pull` 时发生冲突：

1. **优先在 Claude Code / 本地环境解决冲突**
   - 冲突说明：
     - 多数是 Replit 与 Claude Code 同时编辑了同一片区域。
   - 做法：
     - 让 Claude Code 阅读冲突文件；
     - 告诉它：
       - 哪些改动来自 Replit（例如 OpenRouter 配置）
       - 哪些来自最近的功能开发
     - 指示它帮助合并：保留两侧有价值的部分。

2. 冲突解决后：
   - `git add .`
   - `git commit`
   - `git push origin main`

3. Replit 再 `git pull`，获得已经合并好的版本。

---

### 3.5（可选）分支策略（项目变复杂时可启用）

当前阶段可以直接在 `main` 上迭代。
当项目复杂度提升，可以启用轻量分支约定，例如：

- `main`：随时可部署版本
- `feature/<name>`：在 Claude Code 上做功能开发
- `replit-fix/<name>`：用于 Replit 端的临时基础设施修复

简单工作流示例：

1. Claude Code：
   - `git checkout -b feature/new-feature`
   - `git push origin feature/new-feature`

2. Replit：
   - 切到 `feature/new-feature` 分支
   - 测试 + 验收

3. Claude Code：
   - 发起合并到 `main`（或直接 merge）
   - 推送后 Replit 再回到 `main` 并 `git pull`。

> **当前阶段可以不强制使用分支**，只需记住：
> 双端不同时长时间持有未 push 的改动。

---

## 4. 如何让 AI 遵守本工作流（给未来的自己）

当你在 Claude Code / 其他编程代理中启动新一轮工作时，可以先说：

> "请先阅读 `docs/tooling-workflow.md` 和 `WORKFLOW.md`，严格遵守其中关于 GitHub / Replit / ChatGPT 的分工与协作协议。任何改动前先 `git pull` 确认本地与 GitHub 同步，任何改动完成后必须 `git commit + git push`。遇到 Replit 特定问题时，仅在 Replit 做小范围修复，并立即同步回仓库。不做任何后端开发、LLM 调用或 API 集成，仅专注于 React 前端组件、样式和交互。"

这样可以让 AI 工具在同一套"协作宪法"下工作，减少上下文解释成本。

---

## 5. 快速参考卡

### 开始工作前
```bash
git pull origin main  # 必须先同步
```

### 完成工作后
```bash
git add .
git commit -m "清晰的提交信息"
git push origin main  # 必须立即推送
```

### 切换工作端前
- ✅ 当前端已 commit + push
- ✅ 目标端先 git pull
- ❌ 不允许两端同时有未推送的改动

### 职责边界
- **ChatGPT**：迭代规划、UI/UX 设计指导、总体控制
- **Claude Code**：前端开发、React 组件实现、数据加载、交互逻辑
- **Replit**：部署验收、线上体验检查、部署问题修复
- **GitHub**：唯一真相源、版本控制中枢

### 禁区（不在本项目范围内）
- ❌ 后端服务器开发
- ❌ LLM API 调用
- ❌ 数据库集成
- ❌ 用户认证系统
- ❌ 复杂状态管理库（仅用 React state + Context）

---

**最后更新：** 2025-11-18
**版本：** 1.1.0（从 PromptImagine 调整为 Workflow Console）
