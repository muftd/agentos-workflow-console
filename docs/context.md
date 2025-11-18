# Workflow Console · Tasks (v0.1)

> 这一轮开发任务清单（面向Claude Code）

## 1. 数据相关

- [ ] 阅读 `docs/workflow-log-schema.md`，理解schema
- [ ] 在 `data/` 目录下创建 `workflow-log-sample.json`
  - 内容参考schema示例，包含6个step，讲述“信息源→常青→碰撞→demo火种→snippet→web demo”故事
- [ ] 编写一个简单的data loader模块，从JSON文件读取并在控制台打印，确保可以正常解析

## 2. 前端项目初始化

- [ ] 在Replit上创建新的web项目（技术栈可参考PromptImagine）
- [ ] 初始化React + TypeScript + Tailwind + shadcn UI的基本结构
- [ ] 创建基础页面组件 `WorkflowConsolePage`

## 3. UI布局 & 流程图

- [ ] 在 `WorkflowConsolePage` 内划分三个区域：
  - 顶部：Session概览（标题/时间/描述）
  - 中间：Flow Map（线性节点）
  - 底部：Step详情面板
- [ ] 实现基于 `steps` 数组渲染节点序列（按 `order` 排序）

## 4. 交互逻辑

- [ ] 为每个节点添加点击事件：
  - 更新选中态
  - 将当前选中step传给详情面板组件
- [ ] 在详情面板展示：
  - actor / skill / tool
  - input_label / output_label
  - summary（如有）

## 5. 样式与部署

- [ ] 使用Tailwind/shadcn简单美化节点卡片和布局，使之清晰可读
- [ ] 在Replit中配置构建&部署流程，确保可以通过公开URL访问
- [ ] 在README中简要说明如何更新 `workflow-log-sample.json` 来更换展示的workflow