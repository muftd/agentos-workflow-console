# Workflow Console · Tasks (v0.1)

> **状态**: ✅ 所有任务已完成 (2025-11-18)

## 1. 数据相关

- [x] 阅读 `docs/workflow-log-schema.md`，理解schema
- [x] 在 `data/` 目录下创建 `workflow-log-sample.json`
  - 内容参考schema示例，包含6个step，讲述"信息源→常青→碰撞→demo火种→snippet→web demo"故事
- [x] 编写一个简单的data loader模块，从JSON文件读取并在控制台打印，确保可以正常解析
  - **位置**: `client/src/pages/WorkflowConsolePage.tsx` (使用 fetch API)

## 2. 前端项目初始化

- [x] 在Replit上创建新的web项目（技术栈可参考PromptImagine）
  - **项目结构**: `client/` 目录包含完整的 Vite + React 项目
- [x] 初始化React + TypeScript + Tailwind + shadcn UI的基本结构
  - **配置文件**: vite.config.ts, tsconfig.json, tailwind.config.ts
- [x] 创建基础页面组件 `WorkflowConsolePage`
  - **文件**: `client/src/pages/WorkflowConsolePage.tsx`

## 3. UI布局 & 流程图

- [x] 在 `WorkflowConsolePage` 内划分三个区域：
  - 顶部：Session概览（标题/时间/描述）→ `SessionHeader.tsx`
  - 中间：Flow Map（线性节点）→ `FlowMap.tsx`
  - 底部：Step详情面板 → `StepDetailPanel.tsx`
- [x] 实现基于 `steps` 数组渲染节点序列（按 `order` 排序）
  - **实现**: 在 `FlowMap.tsx` 中使用 `sort()` 排序后映射为 `StepNode` 组件

## 4. 交互逻辑

- [x] 为每个节点添加点击事件：
  - 更新选中态
  - 将当前选中step传给详情面板组件
- [x] 在详情面板展示：
  - actor / skill / tool
  - input_label / output_label
  - summary（如有）
- [x] 额外功能：键盘导航 (Arrow Left/Right)

## 5. 样式与部署

- [x] 使用Tailwind/shadcn简单美化节点卡片和布局，使之清晰可读
  - **设计系统**: CSS 变量 + Actor 颜色编码 + 响应式布局
- [x] 在Replit中配置构建&部署流程，确保可以通过公开URL访问
  - **配置文件**: `.replit`, `vite.config.ts` (server 配置)
- [x] 在README中简要说明如何更新 `workflow-log-sample.json` 来更换展示的workflow
  - **文档**: `client/README.md`

## 6. 部署前验证任务 (新增)

### 6.1 配置验证

运行以下命令确认配置正确：

```bash
# Tailwind v4 配置检查
grep -q "@tailwindcss/vite" client/package.json && echo "✅ Tailwind v4 plugin" || echo "❌ Missing Tailwind v4 plugin"
grep -q '@import "tailwindcss"' client/src/index.css && echo "✅ v4 CSS syntax" || echo "❌ Wrong CSS syntax"
grep -q 'tailwindcss()' client/vite.config.ts && echo "✅ Vite plugin configured" || echo "❌ Missing Vite plugin"

# Replit 配置检查
grep -q "allowedHosts: true" client/vite.config.ts && echo "✅ Replit config" || echo "❌ Missing allowedHosts"
grep -q "host: '0.0.0.0'" client/vite.config.ts && echo "✅ Network config" || echo "❌ Missing host config"

# PostCSS 配置检查（应该不存在）
[ ! -f client/postcss.config.js ] && echo "✅ No postcss.config.js (correct for v4)" || echo "⚠️ postcss.config.js exists (not needed for v4)"
```

### 6.2 功能测试

- [x] 构建测试：`cd client && npm run build`
  - 确认无 TypeScript 错误
  - 确认无 Tailwind CSS 错误
  - 确认生成 `dist/` 目录
- [x] 预览测试：`cd client && npm run preview`
  - 访问 http://localhost:4173
  - 确认页面正常显示
  - 确认数据正确加载
- [x] 开发服务器测试：`cd client && npm run dev`
  - 访问 http://localhost:5000
  - 确认热更新正常工作
- [x] 浏览器验证：
  - 打开浏览器开发者工具
  - 检查控制台无错误
  - 检查网络面板，确认 JSON 数据加载成功
  - 测试所有交互：点击节点、键盘导航
  - 测试响应式：调整窗口大小，检查移动端布局

### 6.3 代码质量检查

- [x] TypeScript 类型检查：`cd client && npx tsc --noEmit`
- [x] ESLint 检查：`cd client && npm run lint`
- [x] 构建大小检查：查看 `dist/` 目录大小
  - JS bundle: ~230 KB (gzip: ~72 KB) ✅
  - CSS: ~19 KB (gzip: ~4 KB) ✅

## 7. 部署后验证任务

- [x] Replit URL 可访问
- [x] 页面完整显示（顶部、中间、底部三个区域）
- [x] 数据正确加载（6个 steps）
- [x] 点击交互正常
- [x] 键盘导航正常
- [x] 响应式设计在移动端正常工作

## 8. 文档任务

- [x] 更新 `CLAUDE.md` - 添加配置最佳实践
- [x] 创建 `client/README.md` - 项目使用文档
- [x] 创建 `docs/deployment.md` - 多平台部署指南
- [x] 创建 `replit.md` - 系统架构文档
- [x] 更新 `docs/plan.md` - 添加回顾总结
- [x] 更新 `docs/context.md` - 添加部署经验
- [x] 更新 `docs/task.md` - 添加验证清单

## 9. 经验总结（供未来迭代参考）

### 配置管理教训
1. **不要降级依赖** - Tailwind v4 是正确选择，不要因错误而降级
2. **理解新版本** - 遇到问题先查文档，不要匆忙回退
3. **提前配置部署** - 开发时就考虑目标平台要求

### 测试流程教训
1. **测试三种模式** - build, preview, dev 都要测试
2. **浏览器验证** - 控制台、网络、交互都要检查
3. **配置验证脚本** - 使用 grep 命令自动验证配置

### 理想工作流
```
Claude Code:
  开发功能 ✅
  配置环境 ✅
  完整测试 ✅
  验证配置 ✅
      ↓
用户:
  部署到 Replit ✅
  一键完成 ✅
```