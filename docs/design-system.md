# Design System · Workflow Console

> 参考 PromptImagine 的设计系统，为 workflow-console 定制的专业数据可视化风格

## 设计哲学

**专业简洁的协作流程可视化工具**

- 参考：Linear 的清晰度 + Vercel 的现代感 + Figma 的精确性
- 优先级：**信息清晰 > 视觉炫酷**
- 风格：专业、简洁、可读性强
- 交互：Subtle 动画，强调数据流转

---

## 色彩系统（Color System）

### 主题模式：Light Mode 优先，Dark Mode 可选

**Light Mode（主要）：**
```css
--background: hsl(0 0% 98%)           /* 浅灰白背景 */
--card: hsl(0 0% 100%)                /* 纯白卡片 */
--foreground: hsl(0 0% 9%)            /* 深灰文字 */
--border: hsl(214 15% 91%)            /* 浅灰边框 */
--muted: hsl(210 10% 96%)             /* 次要背景 */
--muted-foreground: hsl(0 0% 45%)     /* 次要文字 */
```

**Workflow 主题色（区别于 PromptImagine 的 magic/tension）：**
```css
--primary: hsl(217 91% 60%)           /* 蓝色 - 主要交互色 */
--primary-foreground: hsl(0 0% 100%)  /* 白色文字 */
--accent: hsl(142 76% 36%)            /* 绿色 - 成功/完成状态 */
--accent-foreground: hsl(0 0% 100%)

/* Actor 角色配色（用于区分不同 Coach/工具）*/
--actor-coach-c: hsl(217 91% 60%)     /* Coach C - 蓝色 */
--actor-coach-a: hsl(142 76% 36%)     /* Coach A - 绿色 */
--actor-coach-e: hsl(271 81% 56%)     /* Coach E - 紫色 */
--actor-tool: hsl(25 95% 53%)         /* 工具（Replit等）- 橙色 */
```

**Dark Mode（次要）：**
```css
--background: hsl(0 0% 9%)
--card: hsl(0 0% 13%)
--foreground: hsl(0 0% 98%)
--border: hsl(0 0% 18%)
```

---

## 字体系统（Typography）

### 字体栈
```css
--font-sans: 'Inter', 'Source Han Sans CN', system-ui, sans-serif
--font-mono: 'IBM Plex Mono', 'SF Mono', monospace
```

### 字体层级（6级）

| 级别 | Tailwind Class | 用途 | 示例 |
|------|---------------|------|------|
| **1** | `text-3xl font-bold` (30px) | 页面标题 | "Workflow Console" |
| **2** | `text-2xl font-semibold` (24px) | Session 标题 | workflow session title |
| **3** | `text-xl font-semibold` (20px) | 区域标题 | "Flow Map", "Step Details" |
| **4** | `text-lg font-medium` (18px) | 卡片标题 | Step order + actor |
| **5** | `text-base` (16px) | 正文 | input_label, output_label |
| **6** | `text-sm text-muted-foreground` (14px) | 辅助信息 | timestamp, tags |

### 字重（Font Weight）
- Regular (400): 正文
- Medium (500): 强调
- Semibold (600): 小标题
- Bold (700): 主标题

---

## 布局系统（Layout）

### 间距单位（基于 4px）
```
空间层级: 4, 8, 12, 16, 24, 32, 48, 64
Tailwind: p-1, p-2, p-3, p-4, p-6, p-8, p-12, p-16
```

### 容器布局
```jsx
<div className="container max-w-7xl mx-auto px-6 md:px-12">
  {/* 内容 */}
</div>
```

### 页面结构（三区域布局）

```
┌─────────────────────────────────────────┐
│ SessionHeader (sticky)                  │ ← py-6, backdrop-blur
├─────────────────────────────────────────┤
│                                         │
│  FlowMap (main content)                 │ ← py-12, 横向滚动
│  [Node] → [Node] → [Node] → [Node]     │
│                                         │
├─────────────────────────────────────────┤
│ StepDetailPanel                         │ ← p-8, border-t
│ (选中节点的详细信息)                      │
└─────────────────────────────────────────┘
```

### 响应式断点
```
sm: 640px   (移动端)
md: 768px   (平板)
lg: 1024px  (桌面)
xl: 1280px  (大屏)
```

---

## 组件设计规范

### 1. SessionHeader（顶部概览）

**布局**：
```jsx
<header className="sticky top-0 z-50 backdrop-blur-sm bg-background/80 border-b">
  <div className="container py-6">
    <h1 className="text-2xl font-semibold">{title}</h1>
    <div className="flex items-center gap-4 mt-2">
      <time className="text-sm text-muted-foreground">{created_at}</time>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
</header>
```

**样式特征**：
- Sticky 定位
- 轻微 backdrop-blur（非 glassmorphism）
- 简洁边框分隔

---

### 2. StepNode（流程节点卡片）

**设计要求**：
- 尺寸：w-64 h-32（固定宽度，保持一致性）
- 边框：2px border（默认 border-border，选中时 border-primary）
- 圆角：rounded-lg (9px)
- 阴影：shadow-sm（默认），shadow-md（hover）
- 内边距：p-4

**状态设计**：
```jsx
// 默认态
className="
  w-64 h-32 p-4
  bg-card border-2 border-border rounded-lg
  shadow-sm
  transition-all duration-200
  cursor-pointer
"

// Hover 态
hover:shadow-md hover:border-primary/50 hover:-translate-y-0.5

// 选中态（Active）
border-primary shadow-md ring-2 ring-primary/20
```

**内容结构**：
```
┌─────────────────────────┐
│ [#01] Coach C           │ ← order + actor (text-sm font-medium)
│ ──────────────────────  │
│ knowledge-processing    │ ← skill (text-xs text-muted-foreground)
│                         │
│ Output: 常青笔记         │ ← output_label (text-sm)
└─────────────────────────┘
```

**Actor Badge（角色标识）**：
```jsx
<div className="
  inline-flex items-center gap-2 px-3 py-1
  rounded-full text-xs font-medium
  bg-primary/10 text-primary
">
  {actor}
</div>
```

---

### 3. FlowMap（流程图容器）

**布局**：
```jsx
<div className="overflow-x-auto py-12">
  <div className="flex items-center gap-6 px-6">
    {steps.map((step, i) => (
      <>
        <StepNode key={step.id} {...step} />
        {i < steps.length - 1 && (
          <ArrowRight className="text-muted-foreground shrink-0" />
        )}
      </>
    ))}
  </div>
</div>
```

**连接线**：
- 使用 Heroicons 的 ArrowRight
- 颜色：text-muted-foreground
- 尺寸：w-6 h-6

---

### 4. StepDetailPanel（详情面板）

**布局**：
```jsx
<div className="border-t bg-muted/30 p-8">
  <div className="container max-w-4xl">
    <h3 className="text-xl font-semibold mb-4">Step Details</h3>

    <dl className="grid grid-cols-2 gap-4">
      <div>
        <dt className="text-sm font-medium text-muted-foreground">Actor</dt>
        <dd className="mt-1">{actor}</dd>
      </div>
      {/* 更多字段 */}
    </dl>
  </div>
</div>
```

---

## 视觉效果规范

### 阴影系统（Shadows）

**不使用 PromptImagine 的 multi-layer colored shadows**

使用简洁的灰色阴影：
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
```

### 边框透明度
- 主要边框：`border border-border` (100% opacity)
- 次要边框：`border border-border/50` (50% opacity)
- 禁用状态：`border border-border/30`

### Glassmorphism（谨慎使用）

**仅在 SessionHeader 使用轻微效果**：
```jsx
className="backdrop-blur-sm bg-background/80"
```

**不在卡片上使用**（保持清晰可读）

---

## 动画规范（Animations）

### 使用 Tailwind 内置动画（不强制 Framer Motion）

**Hover 过渡**：
```jsx
className="transition-all duration-200"
```

**卡片 Hover**：
```jsx
hover:-translate-y-0.5 hover:shadow-md
```

**按钮点击**：
```jsx
active:scale-[0.98]
```

**可选：Framer Motion（如果需要更复杂动画）**

卡片入场动画：
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  <StepNode />
</motion.div>
```

---

## 可访问性（Accessibility）

### Focus 状态
```jsx
focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
```

### 色彩对比
- 所有文字与背景对比度 ≥ 4.5:1 (WCAG AA)
- 交互元素（按钮、链接）对比度 ≥ 3:1

### 键盘导航
- 所有卡片支持 Tab 导航
- Enter/Space 触发点击
- 提供 ARIA labels

---

## 图标系统

**使用 Heroicons（与 PromptImagine 一致）**

```bash
npm install @heroicons/react
```

常用图标：
- `ArrowRightIcon` - 连接线
- `CheckCircleIcon` - 完成状态
- `ClockIcon` - 时间戳
- `TagIcon` - 标签

---

## 响应式设计

### 移动端（< 768px）
- FlowMap 横向滚动
- SessionHeader 保持 sticky
- StepDetailPanel 占满宽度

### 平板/桌面（≥ 768px）
- FlowMap 横向展示所有节点
- DetailPanel 使用 max-w-4xl 居中

---

## 与 PromptImagine 的主要差异

| 维度 | PromptImagine | Workflow Console |
|------|---------------|------------------|
| **色彩风格** | 炫酷渐变 + Glassmorphism | 简洁单色 + 清晰边框 |
| **主题色** | Magic (emerald) + Tension (purple) | Primary (blue) + Actor colors |
| **阴影** | Multi-layer colored shadows | Simple gray shadows |
| **动画** | 复杂 Framer Motion | Tailwind transitions |
| **视觉密度** | 高密度、多层次 | 低密度、清晰分隔 |
| **字体** | Source Han Sans CN | Inter + Source Han Sans |

---

## 快速参考

### CSS 变量完整列表

参考 `client/src/index.css`（待生成）

### Tailwind 配置

参考 `tailwind.config.ts`（待生成）

### shadcn 组件

使用 new-york style：
```bash
npx shadcn@latest add button card badge separator
```

---

**最后更新**: 2025-11-18
**版本**: 1.0.0
