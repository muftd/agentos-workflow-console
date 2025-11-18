# Iteration 004: UI Refinement - 达到 Figma/Framer 级别

> **目标**: 将当前粗糙的 UI 提升到 Figma/Framer 级别的精致度
>
> **参考标准**: PromptImagine 项目的视觉质量
>
> **状态**: 🔄 规划中

## 1. 设计问题分析

### 1.1 StepNode（节点卡片）问题

**当前状态**:
```typescript
// 尺寸: w-64 h-32 (256×128px) - 太小，信息拥挤
// 内边距: p-4 (16px) - 不足
// 字体: text-xs, text-sm - 太小，对比不够
// 阴影: shadow-sm - 太弱
// hover: -translate-y-0.5 - 效果单薄
```

**问题清单**:
1. ❌ 卡片尺寸过小，信息密度过高
2. ❌ output_label（主要信息）没有视觉突出
3. ❌ 字体层级不明显（xs/sm 差别太小）
4. ❌ 颜色单调（大量灰色）
5. ❌ 缺少渐变、光效等设计细节
6. ❌ hover/selected 状态反馈不够强烈

### 1.2 FlowMap（流程图容器）问题

**当前状态**:
```typescript
// 背景: bg-background - 纯色，单调
// 箭头: ArrowRight icon - 普通，无设计感
// 间距: gap-4 md:gap-6 - 规律但缺乏节奏
```

**问题清单**:
1. ❌ 纯色背景缺乏层次感
2. ❌ 箭头设计太简单
3. ❌ 缺少整体氛围（网格、渐变、光效）

### 1.3 StepDetailPanel（详情面板）问题

**当前状态**:
```typescript
// 布局: dl/dt/dd 表单式 - 古板
// 背景: bg-muted/30 - 平淡
// 分组: Separator 分隔 - 不够明显
```

**问题清单**:
1. ❌ 表单式布局缺乏设计感
2. ❌ 背景太平淡
3. ❌ Input/Output 应该用卡片展示
4. ❌ 缺少图标增强视觉

## 2. 优化策略

### 2.1 视觉层次优化

#### StepNode 信息层级（从主到次）:
```
1. output_label    → text-lg font-semibold (主角，18px，粗体)
2. actor badge     → text-sm font-medium (配角，14px，彩色)
3. skill           → text-sm (次要，14px)
4. tool            → text-xs (辅助，12px)
5. order           → text-xs font-light (点缀，12px)
```

#### 字体大小系统:
```
- 点缀信息: text-xs (12px)
- 辅助信息: text-sm (14px)
- 主要信息: text-base/lg (16-18px)
- 标题信息: text-xl/2xl (20-24px)
```

### 2.2 空间系统优化

#### StepNode 尺寸调整:
```typescript
// 当前: w-64 h-32 p-4
// 优化后: w-72 h-44 p-6 (或 w-80 h-48 p-6)
//
// 理由:
// - 增加 32px 宽度 → 更舒展
// - 增加 48px 高度 → 减少拥挤感
// - 增加到 p-6 (24px) → 内容与边缘有呼吸空间
```

#### 间距系统:
```
- 组件内部: space-y-3 (12px)
- 卡片内边距: p-6 (24px)
- 卡片间距: gap-6 md:gap-8 (24-32px)
- section 间距: py-12 md:py-16 (48-64px)
```

### 2.3 颜色系统优化

#### 增强颜色对比:
```typescript
// 主要文本: text-foreground (不变)
// 次要文本: text-foreground/70 (替代 text-muted-foreground)
// 辅助文本: text-foreground/50
// 点缀文本: text-foreground/40
```

#### Actor 颜色优化:
```typescript
// 当前: bg-blue-100 text-blue-700 (太淡)
// 优化: 使用更饱和的颜色 + 渐变
{
  Coach_C: "from-blue-500 to-blue-600 text-white",
  Coach_A: "from-green-500 to-green-600 text-white",
  Coach_E: "from-purple-500 to-purple-600 text-white",
  Replit: "from-orange-500 to-orange-600 text-white"
}
```

### 2.4 阴影系统优化

#### 多层阴影:
```css
/* 当前 shadow-sm */
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

/* 优化后 */
.card-shadow {
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px -1px rgba(0, 0, 0, 0.1);
}

.card-shadow-hover {
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
}

.card-shadow-selected {
  box-shadow:
    0 10px 15px -3px rgba(59, 130, 246, 0.2),
    0 4px 6px -4px rgba(59, 130, 246, 0.1),
    0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

### 2.5 微交互优化

#### StepNode hover 效果:
```typescript
// 当前: hover:-translate-y-0.5 hover:shadow-md
// 优化后: 多维度反馈
{
  transform: "translateY(-4px) scale(1.02)",
  shadow: "card-shadow-hover",
  border: "border-primary/30",
  background: "bg-gradient-to-br from-card to-card/80"
}
```

#### StepNode selected 效果:
```typescript
// 当前: border-primary ring-2 ring-primary/20
// 优化后: 更强烈的视觉反馈
{
  border: "border-primary border-2",
  shadow: "card-shadow-selected",
  background: "bg-gradient-to-br from-primary/5 to-card",
  glow: "shadow-[0_0_20px_rgba(59,130,246,0.2)]"
}
```

## 3. 具体实施步骤

### Phase 1: StepNode 重构 ⭐⭐⭐

优先级最高，是用户主要视觉焦点。

**任务清单**:
- [ ] 增大卡片尺寸 (w-72 h-44 p-6)
- [ ] 重新设计信息层级
  - [ ] output_label: text-lg font-semibold
  - [ ] actor badge: 渐变背景 + 更醒目
  - [ ] skill: text-sm
  - [ ] tool: text-xs text-foreground/50
  - [ ] order: text-xs font-light
- [ ] 实现多层阴影系统
- [ ] 增强 hover 效果（位移 + 缩放 + 阴影 + 边框）
- [ ] 增强 selected 效果（渐变背景 + 光晕）
- [ ] 添加卡片渐变背景
- [ ] 优化行高和间距

**预期效果**: 节点看起来更大、更舒展、信息层次清晰、交互反馈丰富

### Phase 2: FlowMap 增强 ⭐⭐

提升整体氛围感。

**任务清单**:
- [ ] 添加渐变背景或网格背景
- [ ] 优化箭头设计（颜色/大小/样式）
- [ ] 调整节点间距（增加呼吸感）
- [ ] 添加整体容器阴影或边框

**预期效果**: 流程图有更好的视觉包裹感和层次感

### Phase 3: StepDetailPanel 重构 ⭐⭐

改善信息展示方式。

**任务清单**:
- [ ] 用卡片布局替代表单式布局
- [ ] Input/Output 使用独立卡片展示
- [ ] 添加图标增强视觉（Lucide icons）
- [ ] 改进背景（渐变或毛玻璃效果）
- [ ] 优化排版（增加行高、字重对比）
- [ ] Tags 使用更精致的 badge 设计

**预期效果**: 详情面板更有设计感，信息分组清晰

### Phase 4: SessionHeader 优化 ⭐

次要但也要保持一致。

**任务清单**:
- [ ] 增加背景模糊效果（backdrop-blur）
- [ ] 优化标题字体（增大、加粗）
- [ ] 改进时间/描述排版
- [ ] 添加微妙的底部阴影

**预期效果**: 更现代的 sticky header

### Phase 5: 全局优化 ⭐

统一提升。

**任务清单**:
- [ ] 创建自定义 CSS utilities（多层阴影）
- [ ] 统一圆角系统（使用 --radius）
- [ ] 添加页面背景纹理或渐变
- [ ] 优化深色模式（如果需要）
- [ ] 统一动画时长和缓动函数

**预期效果**: 整体设计系统统一、精致

## 4. 设计参考

### 4.1 Figma/Framer 级别特征

- ✅ 清晰的视觉层次（字号、字重、颜色对比明显）
- ✅ 充足的留白（不拥挤）
- ✅ 精致的阴影系统（多层、柔和）
- ✅ 丰富的微交互（hover、active 有多维度反馈）
- ✅ 统一的设计语言（圆角、间距、颜色系统一致）
- ✅ 细腻的渐变使用（背景、按钮、badge）
- ✅ 专业的排版（行高、字距、对齐）

### 4.2 避免的设计错误

- ❌ 所有文字都用 text-sm（缺乏层级）
- ❌ 只用 shadow-sm（太弱）
- ❌ 颜色只有灰色系（单调）
- ❌ padding 太小（拥挤）
- ❌ hover 只有一种变化（单薄）
- ❌ 卡片尺寸太小（信息密度过高）

## 5. 成功标准

### 视觉质量检查清单:

- [ ] **层次清晰**: 一眼就能看到最重要的信息（output_label）
- [ ] **空间舒适**: 没有拥挤感，留白充足
- [ ] **细节精致**: 阴影、圆角、渐变都很细腻
- [ ] **交互流畅**: hover/click 有丰富但不过度的反馈
- [ ] **色彩和谐**: 颜色搭配专业，不刺眼也不灰暗
- [ ] **排版专业**: 字体大小、行高、对齐都很讲究
- [ ] **整体统一**: 各部分设计语言一致

### 用户体验检查清单:

- [ ] 节点信息一目了然
- [ ] 点击反馈明确
- [ ] 选中状态清晰
- [ ] 整体视觉舒适，不累眼
- [ ] 达到或超越 PromptImagine 的视觉质量

## 6. 时间估计

- Phase 1 (StepNode): 1-1.5 小时
- Phase 2 (FlowMap): 0.5 小时
- Phase 3 (StepDetailPanel): 1 小时
- Phase 4 (SessionHeader): 0.5 小时
- Phase 5 (全局优化): 0.5 小时

**总计**: 约 3.5-4 小时

## 7. 技术要点

### 自定义阴影 utilities:

```css
/* 添加到 index.css */
@layer utilities {
  .shadow-card {
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px -1px rgba(0, 0, 0, 0.1);
  }

  .shadow-card-hover {
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1);
  }

  .shadow-card-selected {
    box-shadow:
      0 10px 15px -3px rgba(59, 130, 246, 0.2),
      0 4px 6px -4px rgba(59, 130, 246, 0.1),
      0 0 0 3px rgba(59, 130, 246, 0.1);
  }
}
```

### 渐变背景:

```typescript
// Badge 渐变
className="bg-gradient-to-br from-blue-500 to-blue-600 text-white"

// Card 渐变（选中时）
className="bg-gradient-to-br from-primary/5 via-card to-card"
```

### 动画缓动:

```typescript
// 替换 duration-200 为更专业的设置
className="transition-all duration-300 ease-out"
```
