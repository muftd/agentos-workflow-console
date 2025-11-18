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

---

# Workflow Console · Context (v0.2)

> v0.2 技术架构与上下文
>
> **状态**: ✅ v0.2 已完成 (2025-11-18)
>
> **目标**: 从"静态演示"到"可编辑工具"

## 9. 数据层架构 (v0.2)

### 9.1 LocalStorage 封装

**文件**: `client/src/lib/storage.ts` (314 行)

**核心类**: WorkflowStorage
- 单例模式，所有数据操作通过静态方法
- 数据结构：
  ```typescript
  interface AppData {
    version: '0.2';
    sessions: WorkflowSession[];
    currentSessionId: string | null;
    lastUpdated: string;
  }
  ```
- LocalStorage key: `'workflow-console-v0.2'`

**关键方法**:
```typescript
// 初始化（从静态 JSON 迁移）
static async initialize(): Promise<void>

// Session CRUD
static getSessions(): WorkflowSession[]
static getSession(id: string): WorkflowSession | undefined
static addSession(data: Omit<...>): string
static updateSession(id: string, data: Partial<WorkflowSession>): void
static deleteSession(id: string): void
static duplicateSession(id: string): string

// Step CRUD
static addStep(sessionId: string, step: Omit<...>): string
static updateStep(sessionId: string, stepId: string, data: Partial<Step>): void
static deleteStep(sessionId: string, stepId: string): void

// 当前 session
static getCurrentSessionId(): string | null
static setCurrentSessionId(id: string | null): void
```

**数据版本控制**:
- 读取时检查 `version` 字段
- 版本不匹配时返回 null（触发重新初始化）
- 所有写入操作自动更新 `lastUpdated`

### 9.2 数据迁移策略

**首次访问流程**:
1. 检查 LocalStorage 是否存在 key
2. 如不存在，fetch `/data/workflow-log-sample.json`
3. 包装成 AppData 结构
4. 保存到 LocalStorage
5. 后续访问直接读取 LocalStorage

**数据持久化**:
- 所有 CRUD 操作立即写入 LocalStorage
- 无需手动 save 按钮
- 刷新页面数据不丢失

## 10. 状态管理架构 (v0.2)

### 10.1 React Context + useReducer

**文件**: `client/src/contexts/AppContext.tsx` (312 行)

**全局状态**:
```typescript
interface AppState {
  sessions: WorkflowSession[];        // 所有会话
  currentSessionId: string | null;    // 当前选中
  isEditMode: boolean;                // 编辑模式开关
  isSidebarOpen: boolean;             // 侧边栏开关
  isLoading: boolean;                 // 加载状态
}
```

**Action 类型** (11 种):
```typescript
'SET_SESSIONS' | 'SELECT_SESSION' | 'ADD_SESSION' |
'UPDATE_SESSION' | 'DELETE_SESSION' |
'ADD_STEP' | 'UPDATE_STEP' | 'DELETE_STEP' |
'TOGGLE_EDIT_MODE' | 'TOGGLE_SIDEBAR' | 'SET_LOADING'
```

### 10.2 自定义 Hooks

**提供 8 个便捷 hooks**:
```typescript
useApp()              // 完整的 state + dispatch + helpers
useSessions()         // sessions 数组
useCurrentSession()   // 当前 session 对象
useCurrentSessionId() // 当前 session ID
useEditMode()         // isEditMode 状态
useSidebarOpen()      // isSidebarOpen 状态
useLoading()          // isLoading 状态
```

**helper 函数自动处理 LocalStorage**:
```typescript
const { selectSession, addSession, updateSession, deleteSession } = useApp();

// 调用 helper 时：
// 1. 更新 LocalStorage
// 2. dispatch action 更新 React state
// 3. 两者保持同步
```

### 10.3 初始化流程

**AppProvider 挂载时**:
```typescript
useEffect(() => {
  async function init() {
    await WorkflowStorage.initialize();    // 确保数据存在
    const sessions = WorkflowStorage.getSessions();
    const currentId = WorkflowStorage.getCurrentSessionId();

    dispatch({ type: 'SET_SESSIONS', payload: sessions });
    dispatch({ type: 'SELECT_SESSION', payload: currentId });
    dispatch({ type: 'SET_LOADING', payload: false });
  }
  init();
}, []);
```

## 11. UI 架构 (v0.2)

### 11.1 组件层级结构

```
App.tsx
└── AppProvider (全局状态)
    └── WorkflowConsolePage
        ├── Sidebar (始终渲染)
        │   ├── Menu Button (z-40, fixed)
        │   └── Sheet (左侧抽屉)
        │       ├── "New Session" Button
        │       └── SessionList
        │           └── SessionListItem (多个)
        │               ├── 会话信息
        │               └── DropdownMenu (Edit/Duplicate/Delete)
        │
        ├── [Loading State] (条件渲染)
        ├── [Empty State] (条件渲染)
        │
        └── [Session Content] (条件渲染)
            ├── SessionHeader
            │   ├── Title
            │   └── Edit/Done Toggle
            ├── FlowMap
            │   ├── StepNode (多个)
            │   │   └── Edit/Delete Buttons (编辑模式)
            │   └── "Add Step" Button (编辑模式)
            └── StepDetailPanel

        // 弹窗（始终渲染，通过 state 控制显示）
        ├── SessionFormDialog
        ├── StepFormDialog
        └── AlertDialog (删除确认)
```

### 11.2 条件渲染逻辑

**WorkflowConsolePage 渲染策略**:
```typescript
return (
  <div>
    <Sidebar />  {/* 始终渲染 - 关键！*/}

    {state.isLoading && <LoadingSpinner />}

    {!state.isLoading && !currentSession && (
      <EmptyState message="..." />
    )}

    {!state.isLoading && currentSession && (
      <>
        <SessionHeader />
        <FlowMap />
        <StepDetailPanel />
      </>
    )}

    {/* Dialogs - 始终渲染，通过 open prop 控制 */}
    <SessionFormDialog />
    <StepFormDialog />
    <AlertDialog />
  </div>
);
```

**关键设计决策**:
- Sidebar **必须始终渲染**，避免无 session 时 UI 死锁
- 使用条件渲染而非提前 return
- Dialog 始终渲染，通过 open 状态控制显示

### 11.3 编辑模式 UI 状态

**Normal Mode** (isEditMode = false):
- StepNode: 可点击，显示 hover 效果
- FlowMap: 无 "Add Step" 按钮
- SessionHeader: 显示 "Edit" 按钮

**Edit Mode** (isEditMode = true):
- StepNode: 不可点击，显示 Edit/Delete 按钮（右下角）
- FlowMap: 显示 "Add Step" 占位按钮（末尾）
- SessionHeader: 显示 "Done" 按钮（primary 变体）

## 12. 新增 UI 组件 (v0.2)

### 12.1 shadcn/ui 组件

**Dialog 系列**:
- `client/src/components/ui/dialog.tsx` (120 行)
  - SessionFormDialog 和 StepFormDialog 的基础
  - 基于 @radix-ui/react-dialog

- `client/src/components/ui/alert-dialog.tsx` (139 行)
  - 删除确认对话框
  - 基于 @radix-ui/react-alert-dialog

**Sheet (侧边栏抽屉)**:
- `client/src/components/ui/sheet.tsx` (138 行)
  - 支持 4 个方向（left, right, top, bottom）
  - Sidebar 使用 side="left"
  - 基于 @radix-ui/react-dialog

**DropdownMenu (操作菜单)**:
- `client/src/components/ui/dropdown-menu.tsx` (198 行)
  - SessionListItem 的 Edit/Duplicate/Delete 菜单
  - 基于 @radix-ui/react-dropdown-menu

**表单组件**:
- `input.tsx`, `label.tsx`, `textarea.tsx`
  - 用于 SessionFormDialog 和 StepFormDialog
  - 基于 @radix-ui/react-label

### 12.2 业务组件

**Session 管理**:
- `Sidebar.tsx` (159 行)
  - 整合 Menu Button + Sheet + SessionList
  - 管理 SessionFormDialog 和 DeleteDialog 状态
  - 处理所有 session CRUD 回调

- `SessionList.tsx` (47 行)
  - 映射 sessions 到 SessionListItem
  - 空状态处理

- `SessionListItem.tsx` (125 行)
  - 会话卡片显示
  - DropdownMenu 集成
  - 选中状态高亮

- `SessionFormDialog.tsx` (127 行)
  - 创建/编辑模式切换
  - 表单验证（标题必填）
  - 重置逻辑

**Step 编辑**:
- `StepFormDialog.tsx` (236 行)
  - 完整的 Step 字段表单
  - 必填/可选字段验证
  - Tags 逗号分隔输入
  - 创建/编辑模式切换

### 12.3 组件修改

**StepNode.tsx**:
- 添加 `isEditMode` prop
- 条件渲染 Edit/Delete 按钮
- 编辑模式下禁用 onClick 和 hover

**FlowMap.tsx**:
- 添加 `isEditMode`, `onEditStep`, `onDeleteStep`, `onAddStep` props
- 编辑模式下显示 "Add Step" 占位按钮
- 传递回调到 StepNode

**SessionHeader.tsx**:
- 添加 `isEditMode`, `onToggleEditMode` props
- Edit/Done 按钮
- 响应式布局（按钮在右侧）

**WorkflowConsolePage.tsx**:
- 完全重构为条件渲染架构
- 集成所有 CRUD 逻辑
- 管理 3 个 dialog 状态
- 管理 2 个确认 dialog 状态

## 13. 架构变更 (v0.2)

### 13.1 数据模型变更

**WorkflowSession**:
```typescript
// v0.1
interface WorkflowSession {
  description: string;  // 必填
}

// v0.2
interface WorkflowSession {
  description?: string;  // 可选
}
```

**原因**: 创建新 session 时，描述可以为空

### 13.2 依赖变更

**新增**:
```json
{
  "uuid": "^10.0.0",
  "@types/uuid": "^10.0.0",
  "@radix-ui/react-dialog": "latest",
  "@radix-ui/react-alert-dialog": "latest",
  "@radix-ui/react-dropdown-menu": "latest",
  "@radix-ui/react-label": "latest"
}
```

### 13.3 构建产物变化

**v0.1**:
```
CSS: 28.26 KB (gzip: 5.39 KB)
JS:  233.25 KB (gzip: 73.33 KB)
```

**v0.2**:
```
CSS: 33.78 KB (gzip: 6.52 KB)  +20% (新增 UI 组件)
JS:  353.26 KB (gzip: 110.93 KB)  +51% (Radix UI + 业务逻辑)
```

## 14. 关键 Bug 修复 (v0.2)

### 14.1 Sidebar 不可访问问题

**问题**: commit `8dfaab0`
- **症状**: 删除最后一个 session 后，UI 无法恢复
- **原因**: `if (!currentSession) return <EmptyState />`
  - 提前返回导致 Sidebar 未渲染
  - 用户无法打开菜单创建新 session

**修复**:
```typescript
// ❌ 错误做法
if (!currentSession) return <EmptyState />;
return <><Sidebar /><SessionContent /></>;

// ✅ 正确做法
return (
  <>
    <Sidebar />  {/* 始终渲染 */}
    {!currentSession && <EmptyState />}
    {currentSession && <SessionContent />}
  </>
);
```

**教训**:
- 关键 UI 元素（如导航）必须始终可访问
- 避免过早返回导致 UI 死锁
- 用条件渲染替代提前 return

## 15. 测试与验证 (v0.2)

### 15.1 功能测试清单

**Session 管理**:
- ✅ 创建新 session
- ✅ 编辑 session 元数据
- ✅ 删除 session（带确认）
- ✅ 复制 session
- ✅ 切换 session
- ✅ LocalStorage 持久化

**Step 管理**:
- ✅ 创建新 step
- ✅ 编辑现有 step
- ✅ 删除 step（带确认）
- ✅ 自动重排序

**编辑模式**:
- ✅ Edit/Done 按钮切换
- ✅ 编辑模式下显示操作按钮
- ✅ 正常模式下隐藏操作按钮

**边缘情况**:
- ✅ 删除最后一个 session
- ✅ 无 session 时打开侧边栏
- ✅ 刷新页面数据保留

### 15.2 构建测试

```bash
cd client

# TypeScript 类型检查
npx tsc --noEmit  # ✅ 通过

# 生产构建
npm run build     # ✅ 成功
# 输出: CSS 33.78 KB, JS 353.26 KB

# 预览服务器
npm run preview   # ✅ 正常

# 开发服务器
npm run dev       # ✅ 正常
```

## 16. 部署建议 (v0.2)

**Replit 配置**:
- 无需修改 `vite.config.ts`（v0.1 配置适用）
- 确保 `allowedHosts: true` 存在
- 构建命令: `cd client && npm run build`
- 启动命令: `cd client && npm run preview`

**本地开发**:
```bash
cd client
npm install      # 安装新增依赖
npm run dev      # 启动开发服务器
```

**数据管理**:
- 首次访问自动从 `/data/workflow-log-sample.json` 初始化
- 后续数据存储在浏览器 LocalStorage
- 清除数据: 浏览器开发者工具 → Application → Local Storage → 删除 key
- 重置数据: 删除 LocalStorage key 后刷新页面
## 17. P0 问题修复与技术总结 (v0.2 后续)

### 17.1 部署测试发现的问题

**测试环境**: Replit Preview (用户首次实际环境测试)
**测试时间**: 2025-11-18
**问题严重程度**: P0 (阻塞核心功能)

**发现的问题**:
1. Menu 按钮完全不可见 → 无法访问 session 列表
2. Step 表单背景深灰，输入看不清 → 无法编辑 step
3. Step 操作位置错误 → UX 不符合用户期望
4. Edit Mode 设计为反模式 → 增加操作复杂度
5. Step 重排序功能缺失 → 需求理解错误

### 17.2 CSS 变量失效问题分析

**问题现象**:
- 开发环境：所有 CSS 变量正常工作
- Replit 环境：部分 CSS 变量失效

**根本原因**:
1. **Tailwind v4 CSS 变量系统限制**
   - `bg-primary` 等变量依赖 CSS 自定义属性
   - 在某些环境下，CSS 变量初始化时机问题

2. **Dialog Portal 渲染导致继承断裂**
   - Radix UI Dialog 通过 `Portal` 渲染到 `body` 外部
   - CSS 变量继承链可能在 Portal 边界断裂
   - 表现：`bg-background`, `text-foreground` 等变量未生效

3. **浏览器/环境差异**
   - 不同浏览器对 CSS 变量的支持程度略有差异
   - Replit 的iframe环境可能影响变量继承

**解决方案**:
```tsx
// ❌ 依赖 CSS 变量 (不可靠)
className="bg-primary text-primary-foreground"
className="bg-background text-foreground"

// ✅ 明确的 Tailwind 颜色 (可靠)
className="!bg-blue-600 !text-white"
className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
```

**使用 `!` 前缀的原因**:
- 强制覆盖任何 variant 带来的样式
- 确保颜色在所有环境下生效

### 17.3 Edit Mode 反模式分析

**反模式实现**:
```tsx
// SessionHeader 有 Edit/Done 切换按钮
{isEditMode ? "Done" : "Edit"}

// StepNode 根据 isEditMode 显示按钮
{isEditMode && <Button>Edit</Button>}

// FlowMap 根据 isEditMode 显示 Add Step
{isEditMode && <Button>Add Step</Button>}
```

**问题分析**:
1. **增加认知负担**: 用户需要先进入编辑模式才能操作
2. **不符合用户期望**: 用户明确表示"不应该依赖编辑模式"
3. **操作流程复杂**: 编辑 → Done → 再编辑 → Done
4. **与现代 UX 模式不符**: 应该是"Direct Manipulation"而非"Mode Switching"

**正确实现**:
```tsx
// StepDetailPanel: 选中 step 时直接显示按钮
{selectedStep && (
  <Button onClick={onEdit}>Edit</Button>
  <Button onClick={onDelete}>Delete</Button>
)}

// FlowMap: Add Step 始终可见
<Button onClick={onAddStep}>Add Step</Button>
```

**设计原则**:
- **上下文相关**: 操作可用性由上下文决定，不是由模式决定
- **就近原则**: 操作按钮靠近操作对象
- **即时反馈**: 用户操作立即生效，无需模式切换

### 17.4 Step 重排序实现

**需求澄清**:
- 用户说的"session 编辑" ≠ 编辑 session metadata
- 真实含义：调整 session 内的 step 顺序

**极简实现方案**:
```typescript
// 1. Storage 层：交换 order 值
static moveStepLeft(sessionId: string, stepId: string): void {
  const sortedSteps = [...session.steps].sort((a, b) => a.order - b.order);
  const currentIndex = sortedSteps.findIndex(s => s.id === stepId);
  
  if (currentIndex <= 0) return; // 第一个 step 无法前移
  
  // 交换 order 值
  const temp = currentStep.order;
  currentStep.order = previousStep.order;
  previousStep.order = temp;
}

// 2. UI 层：Move Left 按钮
<Button
  onClick={onMoveLeft}
  disabled={isFirstStep}
  title="Move step left (earlier in workflow)"
>
  <ArrowLeft /> Move Left
</Button>
```

**设计考虑**:
1. **单向移动**: 只实现"向左"(向前)，简化 UI
2. **禁用状态**: 第一个 step 禁用按钮
3. **视觉反馈**: ArrowLeft 图标清晰表达方向
4. **tooltip 提示**: disabled 状态有解释

**未来扩展可能性**:
- 向右移动（向后）
- 拖拽排序
- 键盘快捷键（Ctrl+Up/Down）

### 17.5 Form UI 改进细节

**问题诊断**:
- 用户看到：背景深灰(0-0-0-0.8)，输入框黑文字在黑背景上
- 根源：Dialog Portal 中 CSS 变量未继承

**改进策略**:

**1. 三段式布局**:
```tsx
<DialogContent className="flex flex-col p-0">
  <DialogHeader className="shrink-0">       {/* 固定头部 */}
  <div className="flex-1 overflow-y-auto">  {/* 滚动内容 */}
  <DialogFooter className="shrink-0">       {/* 固定底部 */}
</DialogContent>
```

**2. 字段分组**:
```
┌─ Basic Information ─────┐
│  [Actor]    [Tool]       │  (并排)
│  [Skill]                 │  (全宽)
└─────────────────────────┘
┌─ Workflow Information ──┐
│  [Input Label]           │
│  [Output Label]          │
│  [Summary]               │
│  [Tags]                  │
└─────────────────────────┘
```

**3. 错误增强**:
```tsx
<Input className={errors.actor ? "border-destructive" : ""} />
{errors.actor && (
  <p className="text-xs text-destructive flex items-center gap-1">
    <span>⚠</span> {errors.actor}
  </p>
)}
```

**4. 明确颜色**:
```tsx
// Section 标题
className="text-gray-700 dark:text-gray-300 border-b border-gray-200"

// Input 组件
className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"

// Label 组件
className="text-gray-900 dark:text-gray-100"
```

### 17.6 技术决策总结

**何时使用 CSS 变量**:
- ✅ 全局主题色（需要动态切换）
- ✅ 主页面内容（非 Portal）
- ❌ Dialog/Modal（通过 Portal 渲染）
- ❌ 关键 UI 组件（必须保证可见性）

**何时使用明确颜色**:
- ✅ Portal 内的所有组件
- ✅ 关键交互元素（按钮、表单）
- ✅ 跨环境兼容性要求高的组件

**颜色策略**:
```tsx
// 混合策略：主要用 CSS 变量，关键处用明确颜色
<div className="bg-background">                    {/* 页面背景 */}
  <Button className="!bg-blue-600 !text-white">   {/* 关键按钮 */}
  <Dialog>
    <DialogContent className="!bg-white">         {/* Portal 内 */}
      <Input className="bg-white text-gray-900"/> {/* Form 组件 */}
    </DialogContent>
  </Dialog>
</div>
```

### 17.7 测试覆盖建议

**本地测试**:
- [x] TypeScript 类型检查
- [x] 生产构建测试
- [x] 预览服务器测试
- [x] 开发服务器测试

**环境测试**:
- [x] Replit 环境部署
- [x] 不同浏览器测试
- [ ] 移动端测试（可选）
- [ ] 不同网络条件测试（可选）

**UI 测试清单**:
- [x] Menu 按钮可见性
- [x] Dialog 背景和文字对比度
- [x] Form 输入框可见性
- [x] 所有交互按钮可点击
- [x] 禁用状态正确显示

**用户验收测试**:
- [x] 核心流程可用（创建/编辑/删除 session 和 step）
- [x] Step 重排序功能正常
- [ ] 所有边缘情况处理（待用户确认）

### 17.8 文档更新清单

- [x] docs/plan.md (Section 5.7: Replit 部署测试与修复)
- [x] docs/context.md (Section 17: P0 问题修复与技术总结)
- [x] docs/task.md (Section 10: Replit 部署测试与问题修复)
- [x] Git commits 记录完整
- [x] 问题分析和解决方案文档化
