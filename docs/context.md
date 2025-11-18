# Workflow Console · Context (v0.1)

> 项目背景与上下文说明
>
> **状态**: ✅ v0.1 已完成 (2025-11-18)

## 1. 数据相关

- [x] 阅读 `docs/workflow-log-schema.md`，理解schema
- [x] 在 `data/` 目录下创建 `workflow-log-sample.json`
  - 内容参考schema示例，包含6个step，讲述"信息源→常青→碰撞→demo火种→snippet→web demo"故事
- [x] 编写一个简单的data loader模块，从JSON文件读取并在控制台打印，确保可以正常解析
  - **实现**: 在 `WorkflowConsolePage.tsx` 中使用 `fetch()` 加载 JSON 数据

## 2. 前端项目初始化

- [x] 在Replit上创建新的web项目（技术栈可参考PromptImagine）
  - **技术栈**: React 19 + TypeScript 5.9 + Vite 7 + Tailwind v4 + shadcn/ui
- [x] 初始化React + TypeScript + Tailwind + shadcn UI的基本结构
  - **配置**: 使用 `@tailwindcss/vite` 插件实现 Tailwind v4 集成
- [x] 创建基础页面组件 `WorkflowConsolePage`
  - **位置**: `client/src/pages/WorkflowConsolePage.tsx`

## 3. UI布局 & 流程图

- [x] 在 `WorkflowConsolePage` 内划分三个区域：
  - 顶部：Session概览（标题/时间/描述）→ `SessionHeader.tsx`
  - 中间：Flow Map（线性节点）→ `FlowMap.tsx`
  - 底部：Step详情面板 → `StepDetailPanel.tsx`
- [x] 实现基于 `steps` 数组渲染节点序列（按 `order` 排序）
  - **实现**: 在 `FlowMap.tsx` 中排序并渲染 `StepNode` 组件

## 4. 交互逻辑

- [x] 为每个节点添加点击事件：
  - 更新选中态
  - 将当前选中step传给详情面板组件
  - **额外功能**: 实现键盘导航 (Arrow Left/Right)
- [x] 在详情面板展示：
  - actor / skill / tool
  - input_label / output_label
  - summary（如有）
  - **视觉增强**: Actor 颜色编码系统（Coach C=蓝色, Coach A=绿色, Coach E=紫色, Replit=橙色）

## 5. 样式与部署

- [x] 使用Tailwind/shadcn简单美化节点卡片和布局，使之清晰可读
  - **设计系统**: CSS 变量 + HSL 颜色 + 3/6/9px 圆角体系
  - **响应式**: 支持移动端和桌面端完整体验
- [x] 在Replit中配置构建&部署流程，确保可以通过公开URL访问
  - **部署配置**: `.replit` 工作流文件 + Vite 服务器配置
- [x] 在README中简要说明如何更新 `workflow-log-sample.json` 来更换展示的workflow
  - **文档**: `client/README.md` 包含完整使用说明

## 6. 部署相关的关键配置

### 6.1 Tailwind CSS v4 配置

**关键文件**:
- `client/package.json`: 包含 `tailwindcss@^4.1.17` 和 `@tailwindcss/vite@^4.1.17`
- `client/vite.config.ts`: 导入并使用 `tailwindcss()` 插件
- `client/src/index.css`: 使用 `@import "tailwindcss"` (v4 语法)

**注意事项**:
- ❌ 不要降级到 Tailwind v3
- ❌ 不要使用 `postcss.config.js` (v4 不需要)
- ✅ 使用 Vite 插件方式集成

### 6.2 Replit 服务器配置

**关键配置** (`client/vite.config.ts`):
```typescript
server: {
  host: '0.0.0.0',      // 监听所有网络接口
  port: 5000,           // 固定端口
  strictPort: true,     // 端口被占用时报错而非自动切换
  allowedHosts: true,   // 关键：允许 Replit 动态主机名
}
```

### 6.3 部署前验证清单

```bash
# 1. 验证 Tailwind v4 配置
grep -q "@tailwindcss/vite" client/package.json && echo "✅ Tailwind v4 plugin"
grep -q '@import "tailwindcss"' client/src/index.css && echo "✅ v4 CSS syntax"

# 2. 验证 Replit 配置
grep -q "allowedHosts: true" client/vite.config.ts && echo "✅ Replit config"

# 3. 测试所有服务器模式
cd client
npm run build    # 生产构建
npm run preview  # 预览服务器
npm run dev      # 开发服务器

# 4. 检查浏览器
# - 控制台无错误
# - 数据正确加载
# - 所有交互正常
```

## 7. 经验教训

### 不要降级依赖
- Tailwind v4 是为 Vite 优化的版本
- 遇到新版本问题时，优先查阅官方文档
- 理解问题原因比快速修复更重要

### 提前配置部署环境
- 开发时就考虑目标平台（Replit）的特殊要求
- 不要等到部署时才发现配置问题

### 完整测试
- 不只是 `npm run build`
- 必须测试 `preview` 和 `dev` 服务器
- 在浏览器中验证所有功能

### 理想工作流
```
Claude Code (开发 + 配置 + 测试)
    ↓
用户部署 (一键部署)
    ↓
完成 (无需修复)
```