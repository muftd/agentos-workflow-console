# Workflow Console · Dev Plan (v0.1)

## 1. 这一轮的目标

在2–3天内，完成一个可在线访问的Web Demo：

- 从本地 `data/workflow-log-sample.json` 读取一条高光协作流程；
- 使用React构建一个单页应用，展示：
  - 顶部：Session 概览
  - 中间：线性的Flow Map（多Coach协作谱线）
  - 底部：点击节点后显示的详细故事面板；
- 部署在Replit并验证可以正常加载sample数据。

## 2. 阶段拆分

### Stage 1: 数据契约 & 假数据
- 任务：
  - 确认 `docs/workflow-log-schema.md` schema（v0.1）
  - 创建 `data/workflow-log-sample.json`（单条高光协作流）
- 成功标准：
  - JSON通过基本校验，字段完整，Claude Code能读取并打印出结构。

### Stage 2: UI 骨架搭建
- 任务：
  - 初始化前端项目（React + TS + Tailwind + shadcn UI）
  - 搭出页面三块区域：顶部概览 / 中间Flow / 底部详情
- 成功标准：
  - 使用虚拟数据在页面上看到一条“假Flow线”。

### Stage 3: 数据绑定 & 基础交互
- 任务：
  - 用真实 `workflow-log-sample.json` 驱动UI
  - 实现点击节点→更新详情面板
- 成功标准：
  - 能完整走一遍step-01到step-06的点击，高亮与详情联动正确。

### Stage 4: 视觉细节 & 部署
- 任务：
  - 优化节点样式、hover效果、整体排版
  - 在Replit上配置构建&部署
- 成功标准：
  - 通过浏览器访问Replit URL，可以看到完整的Workflow Console v0.1页面。