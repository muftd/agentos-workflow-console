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

## 10. Iteration 004: UI 精致化任务 (2025-11-18)

> **目标**: 将粗糙的 UI 提升到 Figma/Framer 级别

### Phase 1: StepNode 重构 ✅

- [x] 创建自定义阴影工具类 (shadow-card 系列)
  - **实现**: client/src/index.css (+40 行)
  - 包含默认、hover、selected 三种阴影
  - 深色模式变体
- [x] 增大卡片尺寸
  - w-64 h-32 → w-80 h-48 (256×128px → 320×192px)
- [x] 增加内边距
  - p-4 → p-6 (16px → 24px)
- [x] 建立 5 级视觉层次
  - output_label: text-lg font-semibold
  - actor badge: 渐变背景 (from-X-500 to-X-600)
  - skill: text-sm text-foreground/70
  - tool: text-xs text-foreground/50
  - order: text-xs font-light text-foreground/40
- [x] 增强 hover 效果
  - -translate-y-1 + scale-[1.02]
  - shadow-card-hover
  - border-primary/50
- [x] 增强 selected 效果
  - bg-gradient-to-br from-primary/5 via-card to-card
  - shadow-card-selected
  - border-primary
- [x] 优化动画
  - duration-300 ease-out

### Phase 2: FlowMap 增强 ✅

- [x] 添加渐变背景
  - bg-gradient-to-b from-background via-muted/20 to-background
- [x] 增加垂直间距
  - py-8 md:py-12 → py-12 md:py-16
- [x] 增加水平间距
  - gap-4 md:gap-6 → gap-6 md:gap-8
- [x] 优化箭头设计
  - 尺寸: w-5 h-5 md:w-6 h-6 → w-6 h-6 md:w-7 h-7
  - 颜色: text-muted-foreground → text-primary/40
  - 描边: strokeWidth={2.5}

### Phase 3: StepDetailPanel 重构 ✅

- [x] 创建 InfoCard 组件
  - 图标 + 标签结构
  - 用于展示 Order, Timestamp, Actor, Tool, Skill
- [x] 导入 Lucide 图标
  - Hash, Clock, User, Wrench, Zap, ArrowRight
- [x] 重构元数据展示
  - 表单式 dl/dt/dd → 卡片网格
  - grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- [x] 重构 Input/Output 展示
  - 独立 Card 组件
  - Input: border-border/50, bg-card
  - Output: border-primary/20, bg-gradient-to-br from-primary/5
  - 添加图标和 uppercase 标题
- [x] 优化 Summary 展示
  - Card 组件包裹
  - bg-muted/20
- [x] 添加渐变背景
  - bg-gradient-to-br from-muted/30 via-background to-muted/20
- [x] 改进排版
  - 标题: text-2xl font-bold
  - section 标题: uppercase tracking-wide

### Phase 4: SessionHeader 优化 ✅

- [x] 增大标题字号
  - text-xl md:text-2xl → text-2xl md:text-3xl
- [x] 增强字重
  - font-semibold → font-bold
- [x] 添加 tracking-tight
- [x] 增强背景模糊
  - backdrop-blur-sm → backdrop-blur-md
- [x] 提高不透明度
  - bg-background/80 → bg-background/90
- [x] 添加阴影
  - shadow-sm
- [x] 优化时间文本
  - text-muted-foreground → text-foreground/60 font-medium
- [x] Clock 图标品牌色
  - text-primary
- [x] 增加间距
  - px-4 md:px-6 → px-6 md:px-8
  - py-4 md:py-6 → py-5 md:py-7

### Phase 5: 全局优化 ✅

- [x] 添加页面渐变背景
  - bg-background → bg-gradient-to-br from-background via-muted/10 to-background
- [x] 优化 Loading 状态
  - spinner: border-b-2 → border-b-2 border-t-2
  - 文本: text-muted-foreground → text-foreground/60 font-medium
- [x] 优化 Error 状态
  - emoji 尺寸: text-4xl → text-5xl
  - 标题: font-semibold → font-bold
  - 文本: text-muted-foreground → text-foreground/60 leading-relaxed

### 测试任务 ✅

- [x] TypeScript 类型检查
  - `cd client && npx tsc --noEmit`
- [x] 生产构建测试
  - `cd client && npm run build`
  - 验证输出: CSS 28.26 KB, JS 233.25 KB
- [x] 预览服务器测试
  - `cd client && npm run preview`
- [x] 开发服务器测试
  - `cd client && npm run dev`
- [x] 浏览器验证
  - 检查控制台无错误
  - 验证所有交互正常
  - 确认视觉质量提升

### 文档任务 ✅

- [x] 创建 docs/iteration-004-ui-refinement.md
  - 详细设计分析和优化方案
- [x] 更新 docs/plan.md
  - 添加 Iteration 004 完成记录
- [x] 更新 docs/context.md
  - 添加实施细节和技术要点
- [x] 更新 docs/task.md
  - 添加完整任务清单

### 成功标准验证 ✅

- [x] 清晰的视觉层次 - output_label 一眼识别
- [x] 充足的留白 - 卡片增大 25%，内边距增加 50%
- [x] 精致的阴影系统 - 3 层阴影 (默认/hover/selected)
- [x] 丰富的微交互 - hover 4 个维度变化
- [x] 统一的设计语言 - duration-300 ease-out
- [x] 专业的渐变应用 - badge、背景、选中状态
- [x] 达到 Figma/Framer 质量水准

### 关键指标对比

```
节点尺寸:    256×128px → 320×192px (+25%)
内边距:      16px → 24px (+50%)
主标题字号:  14px → 18px (+29%)
阴影层数:    1 层 → 3 层
hover 维度:  1 个 → 4 个
代码改动:    6 个文件，~250 行
构建大小:    CSS 28.26 KB, JS 233.25 KB
```
---

# Workflow Console · Tasks (v0.2)

> **状态**: ✅ 所有任务已完成 (2025-11-18)
>
> **目标**: 多 session 管理 + 完整编辑功能

## 1. Stage 1: 数据层重构

- [x] 设计 LocalStorage 数据结构 (AppData interface)
- [x] 实现 WorkflowStorage 类 (`client/src/lib/storage.ts`)
  - [x] 基础 CRUD 方法 (load, save, getSessions)
  - [x] Session 操作 (add, update, delete, duplicate)
  - [x] Step 操作 (add, update, delete)
  - [x] 当前 session 管理 (get/setCurrentSessionId)
  - [x] 数据迁移 (initialize 方法)
- [x] 安装 uuid 依赖 (npm install uuid @types/uuid)
- [x] 测试数据持久化（刷新页面数据保留）

**完成时间**: 2025-11-18

## 2. Stage 2: 状态管理重构

- [x] 设计 AppState 接口（5 个状态字段）
- [x] 实现 AppContext (`client/src/contexts/AppContext.tsx`)
  - [x] appReducer 函数（11 种 action 类型）
  - [x] AppProvider 组件（useReducer + useEffect 初始化）
  - [x] Helper 函数（selectSession, addSession, etc.）
  - [x] 8 个自定义 hooks
- [x] 修改 App.tsx（包裹 AppProvider）
- [x] 修改 WorkflowConsolePage.tsx（使用 context hooks）
- [x] 测试全局状态管理（会话切换正常）

**完成时间**: 2025-11-18

## 3. Stage 3: Session 列表 UI

- [x] 安装 @radix-ui/react-dialog 依赖
- [x] 创建 Sheet 组件 (`client/src/components/ui/sheet.tsx`)
- [x] 创建 SessionListItem 组件
  - [x] 显示标题、日期、步骤数
  - [x] 描述预览（line-clamp-2）
  - [x] formatDate 辅助函数
  - [x] 选中状态高亮
- [x] 创建 SessionList 组件
  - [x] 映射 sessions 到 SessionListItem
  - [x] 空状态处理
- [x] 创建 Sidebar 组件
  - [x] 菜单按钮（固定左上角）
  - [x] Sheet 抽屉（左侧，340px/400px）
  - [x] 集成 SessionList
  - [x] 使用 AppContext
- [x] 集成到 WorkflowConsolePage
- [x] 测试侧边栏（打开/关闭流畅）

**完成时间**: 2025-11-18

## 4. Stage 4: Session 编辑功能

- [x] 安装 UI 组件依赖
  - [x] @radix-ui/react-alert-dialog
  - [x] @radix-ui/react-dropdown-menu
  - [x] @radix-ui/react-label
- [x] 创建基础 UI 组件
  - [x] dialog.tsx
  - [x] alert-dialog.tsx
  - [x] dropdown-menu.tsx
  - [x] input.tsx
  - [x] label.tsx
  - [x] textarea.tsx
- [x] 创建 SessionFormDialog 组件
  - [x] 创建/编辑模式切换
  - [x] 标题 + 描述表单
  - [x] 表单验证（标题必填）
  - [x] 重置逻辑
- [x] 修改 SessionListItem
  - [x] 添加 DropdownMenu（Edit, Duplicate, Delete）
  - [x] 操作菜单在右上角
  - [x] stopPropagation 防止触发选中
- [x] 修改 SessionList（传递编辑回调）
- [x] 修改 Sidebar
  - [x] "New Session" 按钮
  - [x] 管理 SessionFormDialog 状态
  - [x] 管理删除确认对话框
  - [x] 处理所有 CRUD 操作
- [x] 测试完整 Session CRUD 功能

**完成时间**: 2025-11-18
**Git Commit**: 28c090d

## 5. Stage 5: Step 编辑功能

- [x] 创建 StepFormDialog 组件
  - [x] 完整字段表单（Actor*, Tool*, Skill, Input*, Output*, Summary, Tags）
  - [x] 必填字段验证
  - [x] Tags 逗号分隔输入
  - [x] 创建/编辑模式切换
- [x] 修改 StepNode
  - [x] 添加 isEditMode prop
  - [x] 条件渲染 Edit/Delete 按钮（右下角）
  - [x] 编辑模式下禁用 hover 和点击
- [x] 修改 FlowMap
  - [x] 添加 isEditMode, onEditStep, onDeleteStep, onAddStep props
  - [x] 编辑模式显示 "Add Step" 占位按钮
  - [x] 传递回调到 StepNode
- [x] 修改 SessionHeader
  - [x] 添加 Edit/Done 切换按钮
  - [x] 响应式布局
- [x] 修改 WorkflowConsolePage
  - [x] 集成 StepFormDialog
  - [x] 管理 step form 状态
  - [x] 管理 step 删除确认
  - [x] 处理所有 Step CRUD 操作
- [x] 修改 WorkflowSession 类型（description → 可选）
- [x] 测试完整 Step CRUD 功能

**完成时间**: 2025-11-18
**Git Commit**: 3d24b31

## 6. Stage 6: Bug 修复与优化

- [x] 修复 Sidebar 不可访问问题
  - [x] 问题：删除最后一个 session 后 UI 死锁
  - [x] 原因：提前 return 导致 Sidebar 未渲染
  - [x] 方案：Sidebar 始终渲染，主内容条件渲染
  - [x] 添加空状态提示文案
- [x] 改进 selectedStep 查找（使用可选链）
- [x] 统一条件渲染逻辑
- [x] TypeScript 类型检查
- [x] 生产构建测试

**完成时间**: 2025-11-18
**Git Commit**: 8dfaab0

## 7. 文档更新

- [x] 更新 docs/plan.md（添加 v0.2 部分）
- [x] 更新 docs/context.md（添加 v0.2 技术架构）
- [x] 更新 docs/task.md（本文档）
- [ ] 考虑更新 v0.2-plan.md 状态（改为"已完成"）

**完成时间**: 2025-11-18

## 8. 成功标准验证

- [x] 功能完整性
  - [x] 多 session 管理（列表、切换、排序）
  - [x] Session CRUD（创建、编辑、删除、复制）
  - [x] Step CRUD（创建、编辑、删除）
  - [x] LocalStorage 持久化
  - [x] 编辑模式切换
- [x] 边缘情况处理
  - [x] 删除最后一个 session 可恢复
  - [x] 无 session 时 UI 可用
  - [x] 刷新页面数据保留
- [x] 代码质量
  - [x] TypeScript 类型安全
  - [x] 无构建错误
  - [x] 生产构建成功
- [x] 部署就绪
  - [x] Vite 配置完整
  - [x] 所有依赖已安装
  - [x] 文档已更新

## 9. 下一步行动

- [ ] 部署 v0.2 到 Replit
- [ ] 用户验收测试
- [ ] 收集反馈
- [ ] 规划 v0.3（如需要）

## 10. Replit 部署测试与问题修复

> **状态**: ✅ 所有 P0 问题已修复 (2025-11-18)

### 10.1 部署准备

- [x] 同步 v0.2 代码到 Replit
- [x] 安装依赖 `cd client && npm install`
  - **问题**: 缺少 @radix-ui/react-label
  - **解决**: npm install 自动安装所有依赖
- [x] 运行构建测试
  - [x] TypeScript 类型检查通过
  - [x] 生产构建成功

### 10.2 用户验收测试 (第一轮)

**测试环境**: Replit Preview
**测试时间**: 2025-11-18

**测试结果**:
- ✅ 测试点 2: Step Edit/Delete 按钮位置正确
- ✅ 测试点 3: Move Left 功能正常
- ✅ 测试点 4: 第一个 step 的 Move Left 禁用
- ✅ 测试点 6: Add Step 按钮始终可见
- ✅ 测试点 7: 操作不依赖 Edit Mode
- ❌ 测试点 1: Menu 按钮不可见 → P0 问题
- ❌ 测试点 5: 表单背景深灰，输入看不清 → P0 问题

### 10.3 P0 问题修复

#### 问题 1: Menu 按钮不可见

- [x] 诊断问题根源
  - **现象**: 用户完全看不到 menu 按钮
  - **开发者工具**: border color 为浅灰 `rgb(229, 232, 235)`
  - **根源**: CSS 变量 `bg-primary` 未生效

- [x] 实施修复 (Sidebar.tsx)
  - 改用明确的 Tailwind 颜色
  - `!bg-blue-600 hover:!bg-blue-700`
  - `!text-white border-2 !border-blue-700`
  - 使用 `!` 前缀强制覆盖

- [x] 测试验证
  - [x] 本地构建通过
  - [x] 视觉确认蓝色按钮醒目
  - [ ] 用户 Replit 环境验证（待确认）

**完成时间**: 2025-11-18
**Git Commit**: cd38865 (part 1)

#### 问题 2: Step 表单 UI 严重问题

**子问题 2.1: 表单背景深灰/黑色**

- [x] 诊断问题根源
  - **现象**: 背景深灰 (0-0-0-0.8)，输入框看不清
  - **根源**: Dialog Portal 中 CSS 变量继承失效

- [x] 实施修复
  - DialogContent 和所有容器: `!bg-white dark:!bg-gray-900`
  - Input: `bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`
  - Textarea: 同 Input
  - Label: `text-gray-900 dark:text-gray-100`
  - Section 标题: `text-gray-700 dark:text-gray-300`
  - 边框: `border-gray-200 dark:border-gray-700`

- [x] 修改文件
  - [x] StepFormDialog.tsx (5 处)
  - [x] input.tsx
  - [x] textarea.tsx
  - [x] label.tsx

**完成时间**: 2025-11-18
**Git Commit**: cd38865 (part 2)

**子问题 2.2: 表单布局和 UX 改进**

- [x] 固定 Header/Footer，内容区滚动
  - DialogContent: `flex flex-col gap-0 p-0`
  - 内容区: `flex-1 overflow-y-auto`
  - Header/Footer: `shrink-0`

- [x] 字段分组与布局
  - [x] 添加"基本信息"和"流程信息" section
  - [x] Actor & Tool 并排显示（2列）
  - [x] 对话框宽度：600px → 700px

- [x] 增强错误显示
  - [x] 错误图标：⚠
  - [x] 红色边框：`border-destructive`
  - [x] 更明显的错误样式

- [x] 完善字段说明
  - [x] 所有主要字段添加 help text
  - [x] 更清晰的 placeholder

- [x] 统一必填标记
  - [x] 红色 * 在 Label 外侧
  - [x] 使用 flex 布局

- [x] 更清晰的按钮文字
  - [x] "Create Step" / "Save Changes"

**完成时间**: 2025-11-18
**Git Commit**: 5800397

#### 问题 3: Step 操作设计缺陷

**子问题 3.1: Edit Mode 反模式**

- [x] 移除 isEditMode 状态依赖
  - [x] WorkflowConsolePage: 移除 toggleEditMode
  - [x] SessionHeader: 移除 Edit/Done 切换按钮
  - [x] FlowMap: 移除 isEditMode prop
  - [x] StepNode: 移除 isEditMode 逻辑

- [x] Add Step 按钮始终可见
  - [x] FlowMap 末尾始终显示

**子问题 3.2: 操作位置错误**

- [x] 从 StepNode 移除 Edit/Delete 按钮
  - [x] 恢复 StepNode 到 v0.1 简洁设计
  - [x] 移除所有 edit mode 相关代码

- [x] 在 StepDetailPanel 添加 Edit/Delete 按钮
  - [x] 添加 onEdit, onDelete props
  - [x] 按钮在标题右侧
  - [x] 只在 step 选中时显示

- [x] WorkflowConsolePage 连接回调
  - [x] handleEditStep, handleDeleteStep
  - [x] 传递给 StepDetailPanel

**完成时间**: 2025-11-18
**Git Commit**: d4bc558

#### 问题 4: Step 重排序功能缺失

**需求理解**:
- [x] 确认需求："session 编辑 = 调整 step 顺序"
- [x] 设计极简方案："Move Left"单向移动

**实现步骤**:
- [x] WorkflowStorage 添加 moveStepLeft() 方法
  - [x] 交换当前 step 与前一个 step 的 order 值
  - [x] 保存到 LocalStorage

- [x] AppContext 添加状态管理
  - [x] 新增 MOVE_STEP_LEFT action type
  - [x] Reducer 实现 order 交换逻辑
  - [x] 新增 moveStepLeft() helper 函数

- [x] StepDetailPanel 添加 UI
  - [x] 添加 isFirstStep prop
  - [x] 添加 onMoveLeft prop
  - [x] Move Left 按钮（ArrowLeft 图标）
  - [x] 第一个 step 禁用，带 tooltip

- [x] WorkflowConsolePage 集成
  - [x] 计算 isFirstStep
  - [x] handleMoveStepLeft 实现
  - [x] 连接到 StepDetailPanel

**完成时间**: 2025-11-18
**Git Commit**: 589387e

### 10.4 最终验证

#### 本地验证

- [x] TypeScript 类型检查
  ```bash
  cd client && npx tsc --noEmit
  # ✅ 通过
  ```

- [x] 生产构建测试
  ```bash
  npm run build
  # ✅ CSS: 35.19 KB, JS: 356.19 KB
  ```

- [x] 所有修改的组件功能测试
  - [x] Menu 按钮可见性和点击
  - [x] Sidebar 打开/关闭
  - [x] StepDetailPanel 按钮显示
  - [x] Step 表单打开和提交
  - [x] Move Left 功能和禁用状态
  - [x] Add Step 功能

#### 代码质量

- [x] 代码提交记录清晰
  ```
  cd38865 Fix: Color visibility issues
  589387e Feat: Implement step reordering
  5800397 Fix: Step form UI improvements
  d4bc558 Fix: Critical P0 UX issues
  ```

- [x] 文档更新完整
  - [x] docs/plan.md (Section 5.7)
  - [x] docs/context.md (Section 17)
  - [x] docs/task.md (Section 10)

#### 用户验收（待确认）

- [ ] Menu 按钮在 Replit 环境清晰可见
- [ ] 表单背景白色，所有输入清晰
- [ ] 所有 P0 功能正常工作

### 10.5 经验教训记录

#### 技术教训

- [x] **CSS 变量在 Portal 中不可靠**
  - 记录问题原因和解决方案
  - 更新最佳实践文档

- [x] **环境差异测试的重要性**
  - 本地正常 ≠ 生产环境正常
  - 需要在目标环境测试关键 UI

- [x] **Tailwind v4 的局限性**
  - CSS 变量系统在某些场景下不稳定
  - 关键组件应混合使用明确颜色

#### UX 教训

- [x] **避免 Mode-dependent 操作模式**
  - Edit Mode 是反模式
  - 操作应该上下文相关，而非模式相关

- [x] **操作按钮应靠近数据**
  - 详情面板的操作在详情面板中
  - 不要分散在卡片上

- [x] **需求理解需要具体示例**
  - 抽象概念容易误解
  - 需要用户提供具体场景确认

#### 流程教训

- [x] **用户实际测试的价值**
  - Claude Code 无法模拟真实环境
  - 第一次用户测试发现 4 个 P0 问题

- [x] **分阶段修复的有效性**
  - 每个 commit 聚焦单一问题域
  - 便于测试和问题追踪

### 10.6 后续行动

- [ ] 用户在 Replit 验证所有修复
- [ ] 收集进一步反馈
- [ ] 规划 v0.3（如有需要）
- [ ] 考虑添加更多 step 重排序选项（向右移动、拖拽）
