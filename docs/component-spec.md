# Component Specifications · Workflow Console

> 每个组件的详细实现规格，供 Claude Code 直接实现

---

## 组件层级结构

```
App
└── WorkflowConsolePage
    ├── SessionHeader
    ├── FlowMap
    │   └── StepNode (×N)
    └── StepDetailPanel
```

---

## 1. WorkflowConsolePage（主页面容器）

### 职责
- 加载 `workflow-log-sample.json` 数据
- 管理选中状态（哪个 step 被点击）
- 协调三个子组件

### Props
无（直接从数据文件加载）

### State
```typescript
const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
const [session, setSession] = useState<WorkflowSession | null>(null);
```

### 数据类型
```typescript
interface WorkflowSession {
  session_id: string;
  title: string;
  created_at: string;
  description: string;
  steps: Step[];
}

interface Step {
  id: string;
  order: number;
  timestamp: string;
  actor: string;
  skill: string | null;
  tool: string;
  input_label: string;
  output_label: string;
  summary?: string;
  tags?: string[];
}
```

### 数据加载
```typescript
useEffect(() => {
  // 从 /data/workflow-log-sample.json 加载
  fetch('/data/workflow-log-sample.json')
    .then(res => res.json())
    .then(data => {
      setSession(data);
      // 默认选中第一个 step
      if (data.steps.length > 0) {
        setSelectedStepId(data.steps[0].id);
      }
    });
}, []);
```

### 布局
```jsx
<div className="min-h-screen bg-background">
  <SessionHeader
    title={session.title}
    createdAt={session.created_at}
    description={session.description}
  />

  <FlowMap
    steps={session.steps}
    selectedStepId={selectedStepId}
    onSelectStep={setSelectedStepId}
  />

  <StepDetailPanel
    step={session.steps.find(s => s.id === selectedStepId)}
  />
</div>
```

---

## 2. SessionHeader（顶部概览）

### Props
```typescript
interface SessionHeaderProps {
  title: string;
  createdAt: string;
  description: string;
}
```

### 实现规格

**HTML 结构**：
```jsx
<header className="sticky top-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border">
  <div className="container max-w-7xl mx-auto px-6 py-6">
    <h1 className="text-2xl font-semibold text-foreground">
      {title}
    </h1>
    <div className="flex items-center gap-4 mt-2">
      <time className="text-sm text-muted-foreground inline-flex items-center gap-1.5">
        <ClockIcon className="w-4 h-4" />
        {formatDate(createdAt)}
      </time>
      <Separator orientation="vertical" className="h-4" />
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  </div>
</header>
```

**日期格式化**：
```typescript
function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
```

**交互**：
- 无交互（纯展示）
- Sticky 定位跟随滚动

---

## 3. FlowMap（流程图容器）

### Props
```typescript
interface FlowMapProps {
  steps: Step[];
  selectedStepId: string | null;
  onSelectStep: (stepId: string) => void;
}
```

### 实现规格

**布局**：
```jsx
<div className="py-12 bg-background">
  <div className="overflow-x-auto px-6">
    <div className="flex items-center gap-6 min-w-max">
      {steps
        .sort((a, b) => a.order - b.order)
        .map((step, index) => (
          <React.Fragment key={step.id}>
            <StepNode
              step={step}
              isSelected={step.id === selectedStepId}
              onSelect={() => onSelectStep(step.id)}
            />
            {index < steps.length - 1 && (
              <ArrowRightIcon className="w-6 h-6 text-muted-foreground shrink-0" />
            )}
          </React.Fragment>
        ))}
    </div>
  </div>
</div>
```

**响应式**：
- 横向滚动（overflow-x-auto）
- 保持节点之间固定间距（gap-6 = 24px）

**可访问性**：
- 键盘导航：ArrowLeft/ArrowRight 切换节点
- 提供 `aria-label="工作流程图"`

---

## 4. StepNode（流程节点卡片）

### Props
```typescript
interface StepNodeProps {
  step: Step;
  isSelected: boolean;
  onSelect: () => void;
}
```

### 实现规格

**尺寸与布局**：
```jsx
<button
  onClick={onSelect}
  className={cn(
    // 基础样式
    "w-64 h-32 p-4",
    "bg-card border-2 rounded-lg",
    "shadow-sm",
    "transition-all duration-200",
    "cursor-pointer",
    "text-left", // 文字左对齐
    "flex flex-col justify-between",

    // 默认边框
    "border-border",

    // 选中态
    isSelected && "border-primary shadow-md ring-2 ring-primary/20",

    // Hover 态
    "hover:shadow-md hover:border-primary/50 hover:-translate-y-0.5",

    // Focus 可访问性
    "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
  )}
>
  {/* 顶部：order + actor */}
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-muted-foreground">
      #{step.order.toString().padStart(2, '0')}
    </span>
    <ActorBadge actor={step.actor} />
  </div>

  {/* 中间：skill/tool */}
  <div className="space-y-1">
    {step.skill && (
      <p className="text-xs text-muted-foreground truncate">
        {step.skill}
      </p>
    )}
    <p className="text-xs text-muted-foreground/70 truncate">
      via {step.tool}
    </p>
  </div>

  {/* 底部：output_label */}
  <p className="text-sm font-medium text-foreground truncate">
    {step.output_label}
  </p>
</button>
```

### Actor Badge 子组件

**根据 actor 类型返回不同颜色**：
```typescript
function getActorColor(actor: string): string {
  if (actor.includes('Coach C')) return 'bg-blue-100 text-blue-700';
  if (actor.includes('Coach A')) return 'bg-green-100 text-green-700';
  if (actor.includes('Coach E')) return 'bg-purple-100 text-purple-700';
  if (actor.includes('Replit')) return 'bg-orange-100 text-orange-700';
  // 默认
  return 'bg-gray-100 text-gray-700';
}
```

```jsx
<div className={cn(
  "inline-flex items-center gap-1 px-2 py-0.5",
  "rounded-full text-xs font-medium",
  getActorColor(step.actor)
)}>
  {step.actor}
</div>
```

### 交互行为

**点击**：
- 触发 `onSelect()` 回调
- 父组件更新 `selectedStepId`
- 卡片显示选中态（border + ring）
- 触发 StepDetailPanel 更新

**Hover**：
- 轻微上浮（-translate-y-0.5）
- 阴影增强（shadow-md）
- 边框颜色变化（border-primary/50）

**键盘导航**：
- Tab 聚焦
- Enter/Space 触发选中
- ArrowLeft/Right 切换（由 FlowMap 处理）

---

## 5. StepDetailPanel（详情面板）

### Props
```typescript
interface StepDetailPanelProps {
  step: Step | undefined;
}
```

### 实现规格

**条件渲染**：
```jsx
{!step ? (
  <div className="border-t bg-muted/30 p-8 text-center text-muted-foreground">
    选择一个节点查看详细信息
  </div>
) : (
  <div className="border-t bg-muted/30 p-8">
    {/* 详情内容 */}
  </div>
)}
```

**详情布局**：
```jsx
<div className="container max-w-4xl mx-auto">
  <h3 className="text-xl font-semibold mb-6">Step Details</h3>

  <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <DetailItem label="Order" value={`#${step.order}`} />
    <DetailItem label="Timestamp" value={formatDate(step.timestamp)} />
    <DetailItem label="Actor" value={step.actor} />
    <DetailItem label="Tool" value={step.tool} />
    {step.skill && <DetailItem label="Skill" value={step.skill} />}
  </dl>

  <Separator className="my-6" />

  <div className="space-y-4">
    <div>
      <h4 className="text-sm font-medium text-muted-foreground mb-2">Input</h4>
      <p className="text-base">{step.input_label}</p>
    </div>

    <div>
      <h4 className="text-sm font-medium text-muted-foreground mb-2">Output</h4>
      <p className="text-base font-medium">{step.output_label}</p>
    </div>

    {step.summary && (
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-2">Summary</h4>
        <p className="text-sm leading-relaxed text-muted-foreground">{step.summary}</p>
      </div>
    )}

    {step.tags && step.tags.length > 0 && (
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-2">Tags</h4>
        <div className="flex flex-wrap gap-2">
          {step.tags.map(tag => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    )}
  </div>
</div>
```

### DetailItem 辅助组件

```jsx
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-medium text-muted-foreground mb-1">
        {label}
      </dt>
      <dd className="text-base text-foreground">
        {value}
      </dd>
    </div>
  );
}
```

---

## 数据加载策略

### 方案 1：直接 import（开发时）
```typescript
import workflowLog from '@/data/workflow-log-sample.json';
```

### 方案 2：fetch（生产环境）
```typescript
useEffect(() => {
  fetch('/data/workflow-log-sample.json')
    .then(res => res.json())
    .then(setSession)
    .catch(err => console.error('Failed to load workflow data:', err));
}, []);
```

### 推荐：方案 2（更灵活）

---

## shadcn 组件使用清单

需要安装的 shadcn 组件：

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add separator
```

可选（如需要更丰富交互）：
```bash
npx shadcn@latest add tooltip
npx shadcn@latest add scroll-area
```

---

## 文件结构建议

```
client/src/
├── components/
│   ├── workflow/
│   │   ├── SessionHeader.tsx
│   │   ├── FlowMap.tsx
│   │   ├── StepNode.tsx
│   │   └── StepDetailPanel.tsx
│   └── ui/           # shadcn 组件
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       └── separator.tsx
├── lib/
│   └── utils.ts      # cn() 等工具函数
├── types/
│   └── workflow.ts   # TypeScript 类型定义
├── pages/
│   └── WorkflowConsolePage.tsx
└── App.tsx
```

---

## 实现优先级

### Phase 1：数据加载 + 基础布局
1. 创建类型定义（types/workflow.ts）
2. 实现 WorkflowConsolePage（数据加载）
3. 实现 SessionHeader（纯展示）

### Phase 2：核心组件
4. 实现 StepNode（静态）
5. 实现 FlowMap（布局 + 连接线）
6. 添加点击交互

### Phase 3：详情面板
7. 实现 StepDetailPanel
8. 联调选中状态

### Phase 4：视觉打磨
9. 调整间距、阴影、颜色
10. 添加 hover/focus 动画
11. 响应式优化

---

## 验收标准

### 功能完整性
- ✅ 加载 JSON 数据成功
- ✅ 所有 steps 按 order 排序展示
- ✅ 点击节点高亮并更新详情面板
- ✅ 默认选中第一个 step

### 视觉质量
- ✅ 节点间距一致（24px）
- ✅ 卡片尺寸统一（w-64 h-32）
- ✅ 选中态清晰可见（border + ring）
- ✅ Hover 反馈流畅（200ms transition）

### 可访问性
- ✅ 键盘可导航所有节点
- ✅ Focus 状态清晰可见
- ✅ ARIA labels 完整

### 响应式
- ✅ 移动端横向滚动流畅
- ✅ 桌面端所有节点可见
- ✅ DetailPanel 在小屏幕不溢出

---

**最后更新**: 2025-11-18
**版本**: 1.0.0
