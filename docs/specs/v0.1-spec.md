# Workflow Console · MVP v0.1（Vibe Spec）

## 0. 项目一句话

做一个「只读的多Coach协作回放器」：
- 以一条从「信息源 → 常青 → demo snippet」的完整高光链路为素材，
- 把这条链路变成一张 Flow 图 + 一段故事解说，
- 让人一眼看懂：**我在实际任务中，如何在多个Coach/工具之间切换、协作、传递上下文。**

## 1. 背景 & 北极星

- 这是「个人AI Coach-AgentOS」项目的一个对外窗口。
- 引擎（真实协作流程、skill执行、日志生成）都在 AgentOS / Claude Code 一侧。
- 这个项目只负责一件事：
  > 把已经存在的「workflow-log」数据，变成一个可以被人类看懂、愿意反复回看的「协作谱线」。

北极星（长期）：
- 能够回放任意一次高光协作任务，看到当时哪些Coach出场、怎么交接、在哪里撞出了demo火种。
- 未来可以接入多条workflow日志，成为AgentOS的中控台之一。

本次 v0.1 目标（2–3天内可实现）：
- 只支持一条手工构造的 `workflow-log-sample.json`。
- 实现单页web，可视化这条workflow为一条 flow，支持点击节点看详情。

## 2. 本次 Demo 叙事切片

- 只讲一个故事：  
  > 「围绕一篇AI相关信息源，从信息源处理 → 常青笔记 → 与既有知识花园碰撞 → 提炼demo火种 → 生成Claude Code snippet → 跑出第一个web demo壳」。
- 粒度是 Hop：
  - 每一个 Hop = 我在多Coach/多工具之间的一次切换和行动。
  - 整个故事包含约 6–12 个 Hop（v0.1采用 sample.json 中的6个）。

看完这条flow，观众应有的感觉：
- “原来你真的在多 Coach 之间不停切换，而不是一窗到底。”
- “原来每次 demo 背后，有一条可复盘的知识流转链路。”

## 3. 数据输入：workflow-log 契约

- 单一数据源：`data/workflow-log-sample.json`
- 格式：参考 `docs/workflow-log-schema.md` 定义
- 重要字段（用于UI）：
  - `session_id`, `title`, `description`
  - 每个 `step` 的：
    - `order`, `actor`, `skill`, `tool`
    - `input_label`, `output_label`
    - `summary`, `tags`（若有）

开发期要求：
- 实现一个简单的 `data-loader` 模块，用于从本地 `sample.json` 读取数据并映射为前端使用的结构。
- 不需要实现写入/更新，仅只读。

## 4. 界面骨架 & 布局

目标布局（v0.1）：

1. **顶部区域：Session 概览**
   - 显示：
     - `title`
     - `created_at`
     - `description`（1–2行）
   - 左上角可放一个简单的 “AgentOS Workflow Console” logo/标题。

2. **中间主区域：Flow Map**
   - 表现形式：线性的节点链路（稍微有一点空间感即可，无需复杂力导向图）。
   - 每个 Step 渲染为一个节点卡片：
     - 显示：
       - `order` 序号
       - `actor`（Coach/工具）
       - `tool` 图标/文字
       - 简短版 `output_label`（或结合input+output）
   - 节点之间用箭头相连，形成从左到右的一条“谱线”。

3. **底部区域：详细故事面板**
   - 默认显示第一步的详细内容。
   - 内容包括：
     - `order`, `timestamp`
     - `actor`, `skill`, `tool`
     - `input_label`, `output_label`
     - `summary`（如有）
     - 若可能，可预留一个“作者手写的meta叙事”区域（v0.1可用`summary`代替）

交互：
- 点击上方Flow中的任意节点：
  - 高亮该节点
  - 滚动/切换下方详细面板，展示对应Step的详细信息

## 5. 交互行为 & 动效（v0.1）

最低要求：
- 节点 hover 时：
  - 稍微放大或变亮，显示简短工具提示（actor + output_label）。
- 节点 click：
  - 选中态高亮（例如边框加粗）
  - 下方详细面板更新为对应step

可选加分（非必需）：
- 简单的“播放按钮”：
  - 自动从 step-01 播放到 step-06，每秒高亮一个节点并同步更新详细面板。
  - 可用 setTimeout 实现的极简版本。

## 6. 技术约束与非目标

技术自由度：
- 保持与 PromptImagine 项目类似的技术栈（React + TS + Tailwind + shadcn UI + Vite）。
- 不需要接数据库或真实API，直接从本地JSON文件加载即可。

非目标（本次不做）：
- 用户登录、多Session列表页。
- 真实写入/编辑日志。
- 自动从 Obsidian/AgentOS 读取实时workflow数据。
- 分支/并行可视化（只做单线线性Flow）。
- 复杂图算法或动画（聚焦简洁、可读性）。

## 7. 未来扩展挂钩（仅做占位）

- 支持加载多个 `workflow-log-*.json`，在首页列出“高光协作清单”供选择。
- 接入实际 AgentOS 日志：由skill在每次执行后写入日志文件，本前端不需要改schema即可复用。
- 按 Coach / 标签过滤，查看某一类步骤的分布。