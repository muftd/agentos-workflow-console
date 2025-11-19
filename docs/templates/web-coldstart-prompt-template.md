# Claude Code Web 端冷启动 Prompt 模板

> 复制此模板，替换占位符后使用

---

## 📋 Prompt 内容

```
你好！我需要你帮我开发一个名为 **{{PROJECT_NAME}}** 的 Web 项目。

## 项目背景

这是我的第 {{N}} 个 web demo 项目。我之前的项目 **{{PREVIOUS_PROJECT}}** 达到了很高的质量标准。

现在我希望用 **Claude Code 实现 {{PROJECT_NAME}}，并达到与 {{REFERENCE_PROJECT}} 同等级别的质量**。

## 项目概述

**{{PROJECT_NAME}}** 是一个 {{项目类型}}：
- {{核心功能1}}
- {{核心功能2}}
- {{核心功能3}}
- 技术栈：React + TypeScript + Tailwind + shadcn UI + Vite

## 质量标准：参考 {{REFERENCE_PROJECT}}

我已经为你提供了 {{REFERENCE_PROJECT}} 项目的关键文件作为参考。**你的任务是实现与其同等质量的 UI/UX**。

**关键质量要素**：
1. **完整的设计系统**（CSS 变量、design tokens、统一风格）
2. **专业的视觉效果**（圆角、阴影、间距、字体层级）
3. **流畅的交互动画**（hover、active、transition）
4. **清晰的信息层级**（字体大小、颜色对比）
5. **shadcn UI 组件库**（new-york style）

## 当前任务：Iteration 001 - Foundation

请严格按照 `docs/iteration-001-foundation.md` 执行第一轮迭代。

**核心目标**：
1. 初始化 React + TypeScript + Vite 项目
2. 配置 Tailwind（参考 {{REFERENCE_PROJECT}} 的 tailwind.config.ts）
3. 实现 CSS 变量系统（参考 design-system.md）
4. 安装并测试 shadcn UI 基础组件
5. 验证视觉质量达到 {{REFERENCE_PROJECT}} 水平

## 必读文档（按顺序）

我已上传以下文件，请在开始工作前**务必阅读**：

### 1. 项目指导文档
- `CLAUDE.md` - 项目总体指导
- `WORKFLOW.md` - Git 工作流
- `docs/tooling-workflow.md` - 多工具协作流程

### 2. 设计规范（核心）
- `docs/design-system.md` - **完整的设计系统定义**（必读！）
- `docs/component-spec.md` - 组件实现规格

### 3. 当前迭代任务
- `docs/iteration-001-foundation.md` - **本轮详细任务清单**（必读！）
- `docs/plan.md` - 总体开发计划
- `docs/task.md` - 任务跟踪

### 4. 参考材料（{{REFERENCE_PROJECT}}）
- `{{REFERENCE_PROJECT}}/design_guidelines.md` - 设计指南
- `{{REFERENCE_PROJECT}}/tailwind.config.ts` - Tailwind 配置参考
- `{{REFERENCE_PROJECT}}/components.json` - shadcn 配置参考
- `{{REFERENCE_PROJECT}}/index.css`（前100行）- CSS 变量参考

## 工作流程

1. **阅读文档**（15分钟）
   - 优先阅读：`design-system.md` + `iteration-001-foundation.md`
   - 理解质量标准和任务目标

2. **执行任务**（按 iteration-001 的步骤）
   - Task 1: 项目初始化
   - Task 2: Tailwind 配置
   - Task 3: shadcn UI 初始化
   - Task 4: 质量验收

3. **对比参考**
   - 每完成一个组件，与 {{REFERENCE_PROJECT}} 对比
   - 调整直到视觉质量达标

4. **提交代码**
   - 使用 Git 提交（遵守 WORKFLOW.md 的规范）
   - commit message 要清晰描述改动

## 关键约束

❌ **禁止做的事**：
- 不要一次性实现整个项目（分步迭代）
- 不要偏离设计系统定义（严格遵守 design-system.md）
- 不要跳过质量验收（必须对比 {{REFERENCE_PROJECT}}）
- {{项目特定禁区}}

✅ **必须做的事**：
- 严格遵守 design-system.md 的所有规范
- 使用 {{REFERENCE_PROJECT}} 的配置作为参考
- 每个组件都要达到参考质量
- 完成后截图对比并调整

## 质量检查清单

在完成 Iteration 001 后，请确认：

| 检查项 | 标准 | 状态 |
|-------|------|------|
| 项目运行 | `npm run dev` 成功启动 | |
| Tailwind 配置 | 与参考项目一致 | |
| CSS 变量 | 所有颜色变量正确定义 | |
| 圆角 | 3px/6px/9px 三级 | |
| 阴影 | shadow-sm/md/lg 层次清晰 | |
| 字体 | {{PRIMARY_FONT}} + Source Han Sans CN | |
| Button hover | 200ms transition | |
| Card 样式 | 边框、阴影、圆角符合规范 | |

## 开始工作

现在请：
1. 确认已阅读所有上传的文档
2. 告诉我你的理解（简述本轮目标）
3. 开始执行 Iteration 001 的 Task 1

准备好了吗？让我们开始！🚀
```

---

## 需要上传的文件清单

### 必需文件（{{PROJECT_NAME}} 项目）

```
{{PROJECT_NAME}}/
├── CLAUDE.md
├── WORKFLOW.md
├── docs/
│   ├── design-system.md
│   ├── component-spec.md
│   ├── iteration-001-foundation.md
│   ├── tooling-workflow.md
│   ├── plan.md
│   ├── task.md
│   └── [其他spec文档]
└── data/
    └── [数据文件，如有]
```

### 参考文件（{{REFERENCE_PROJECT}} 项目）

```
{{REFERENCE_PROJECT}}/
├── design_guidelines.md
├── tailwind.config.ts
├── components.json
└── index.css（前100行）
```

---

**使用方法**：

1. 复制此模板
2. 替换所有 {{占位符}}
3. 上传文件 + 粘贴Prompt到Claude Code web端
4. 开始工作

---

**最后更新**: 2025-11-18
