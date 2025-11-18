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

## 8. Iteration 004: UI 精致化实施记录

### 8.1 优化背景

**问题**: 用户反馈部署后 UI 设计非常粗糙，与参考项目 PromptImagine 差距很大。
**目标**: 达到 Figma/Framer 级别的 UI 质量。

### 8.2 核心改进措施

#### StepNode 组件 (client/src/components/workflow/StepNode.tsx)
**视觉层次重建**:
```typescript
// 5 级信息层级
output_label: text-lg font-semibold          // 18px，粗体，主角
actor badge:  gradient bg + text-white      // 渐变背景，醒目
skill:        text-sm text-foreground/70    // 14px，次要
tool:         text-xs text-foreground/50    // 12px，辅助
order:        text-xs font-light /40        // 12px，点缀
```

**尺寸与间距**:
```typescript
// 优化前: w-64 h-32 p-4 (256×128px, 16px padding)
// 优化后: w-80 h-48 p-6 (320×192px, 24px padding)
// 增长: 25% 面积，50% 内边距
```

**阴影系统** (client/src/index.css):
```css
.shadow-card          /* 默认：双层柔和阴影 */
.shadow-card-hover    /* hover：深度阴影 */
.shadow-card-selected /* selected：带颜色的光晕 */
```

**交互增强**:
```typescript
hover:   -translate-y-1 + scale-[1.02] + shadow-card-hover + border-primary/50
selected: gradient bg + shadow-card-selected + border-primary
```

#### FlowMap 组件 (client/src/components/workflow/FlowMap.tsx)
**氛围营造**:
```typescript
// 背景渐变增加层次
bg-gradient-to-b from-background via-muted/20 to-background

// 间距增加呼吸感
py-12 md:py-16  (之前: py-8 md:py-12)
gap-6 md:gap-8  (之前: gap-4 md:gap-6)

// 箭头更醒目
w-6 h-6 md:w-7 md:h-7 text-primary/40 strokeWidth={2.5}
```

#### StepDetailPanel 组件 (client/src/components/workflow/StepDetailPanel.tsx)
**卡片化设计**:
- 元数据：图标 + 标签的 InfoCard 组件
- Input/Output：独立卡片，Output 带 primary 渐变高亮
- 所有标题：uppercase tracking-wide 增强视觉
- 背景：渐变增加层次感

**图标系统** (Lucide icons):
```typescript
Hash, Clock, User, Wrench, Zap, ArrowRight
```

#### SessionHeader 组件 (client/src/components/workflow/SessionHeader.tsx)
**现代化提升**:
```typescript
// 标题更突出
text-2xl md:text-3xl font-bold tracking-tight

// 背景更强
backdrop-blur-md bg-background/90 shadow-sm

// 细节优化
Clock icon: text-primary  // 品牌色点缀
时间文本: font-medium text-foreground/60
```

#### 全局优化 (client/src/pages/WorkflowConsolePage.tsx)
**页面级增强**:
```typescript
// 所有页面背景
bg-gradient-to-br from-background via-muted/10 to-background

// Loading/Error 状态
- 更大的 spinner
- 改进的文字层级
- 渐变背景
```

### 8.3 设计原则

1. **视觉层次**: 5 级字号系统 (xs/sm/base/lg/xl)，清晰主次
2. **空间呼吸**: 大尺寸卡片 + 充足内边距 + 合理间距
3. **多层阴影**: shadow-card 系列，营造深度
4. **渐变点缀**: badge、背景、选中状态使用渐变
5. **微交互**: hover/selected 多维度反馈 (位移+缩放+阴影+颜色)
6. **统一动画**: duration-300 ease-out

### 8.4 技术要点

**自定义工具类** (index.css):
```css
@layer utilities {
  .shadow-card { /* 双层阴影 */ }
  .shadow-card-hover { /* 深度阴影 */ }
  .shadow-card-selected { /* 彩色光晕 */ }
  .dark .shadow-card { /* 深色模式变体 */ }
}
```

**渐变背景模式**:
```typescript
// 双色渐变 (badge)
bg-gradient-to-br from-blue-500 to-blue-600

// 三色渐变 (selected card)
bg-gradient-to-br from-primary/5 via-card to-card

// 页面渐变 (background)
bg-gradient-to-br from-background via-muted/10 to-background
```

**组件改动统计**:
- index.css: +40 行 (阴影工具类)
- StepNode.tsx: 重构 70 行
- FlowMap.tsx: 优化 10 行
- StepDetailPanel.tsx: 重构 100 行
- SessionHeader.tsx: 优化 15 行
- WorkflowConsolePage.tsx: 优化 20 行

### 8.5 测试验证

```bash
# 类型检查
cd client && npx tsc --noEmit  # ✅ 通过

# 构建
cd client && npm run build     # ✅ 成功
# 输出: CSS 28.26 KB, JS 233.25 KB

# 预览
cd client && npm run preview   # ✅ 启动

# 开发
cd client && npm run dev       # ✅ 启动
```

### 8.6 成果总结

**优化效果**:
- ✅ 视觉层次清晰，output_label 一眼识别
- ✅ 空间舒适，无拥挤感
- ✅ 阴影精致，有深度感
- ✅ 交互流畅，反馈丰富
- ✅ 色彩和谐，渐变恰当
- ✅ 排版专业，细节考究
- ✅ 达到 Figma/Framer 级别

**关键指标对比**:
```
节点尺寸:    256×128px → 320×192px (+25%)
内边距:      16px → 24px (+50%)
主标题字号:  14px → 18px (+29%)
阴影层数:    1 层 → 3 层
hover 维度:  1 个 → 4 个 (位移+缩放+阴影+边框)
```