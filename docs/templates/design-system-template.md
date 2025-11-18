# Design System · {{PROJECT_NAME}}

> 基于 {{REFERENCE_PROJECT}} 调整的设计系统

## 设计哲学

**{{项目一句话定位}}**

- 参考：{{设计参考项目}}
- 优先级：{{核心价值排序}}
- 风格：{{视觉风格描述}}
- 交互：{{交互特点}}

---

## 色彩系统（Color System）

### 主题模式

**Light Mode（主要）：**
```css
--background: {{BACKGROUND_COLOR}}
--card: {{CARD_COLOR}}
--foreground: {{FOREGROUND_COLOR}}
--border: {{BORDER_COLOR}}
--muted: {{MUTED_COLOR}}
--muted-foreground: {{MUTED_FOREGROUND_COLOR}}
```

**主题色：**
```css
--primary: {{PRIMARY_COLOR}}           /* 主要交互色 */
--primary-foreground: hsl(0 0% 100%)
--accent: {{ACCENT_COLOR}}             /* 辅助色 */
--accent-foreground: hsl(0 0% 100%)
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
--font-sans: '{{PRIMARY_FONT}}', 'Source Han Sans CN', system-ui
--font-mono: '{{MONO_FONT}}', 'SF Mono', monospace
```

### 字体层级（6级）

| 级别 | Class | 用途 |
|------|-------|------|
| **1** | `text-3xl font-bold` | 页面标题 |
| **2** | `text-2xl font-semibold` | 主标题 |
| **3** | `text-xl font-semibold` | 区域标题 |
| **4** | `text-lg font-medium` | 卡片标题 |
| **5** | `text-base` | 正文 |
| **6** | `text-sm text-muted-foreground` | 辅助信息 |

---

## 布局系统（Layout）

### 间距单位（基于 4px）
```
4, 8, 12, 16, 24, 32, 48, 64
```

### 容器布局
```jsx
<div className="container max-w-7xl mx-auto px-6 md:px-12">
  {/* 内容 */}
</div>
```

---

## 组件设计规范

### {{组件1名称}}

**设计要求**：
- 尺寸：{{尺寸规格}}
- 边框：{{边框规格}}
- 圆角：{{圆角规格}}
- 阴影：{{阴影规格}}

**状态设计**：
```jsx
// 默认态
className="{{默认样式}}"

// Hover 态
hover:{{hover样式}}

// 选中态
{{active样式}}
```

---

## 视觉效果规范

### 阴影系统
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
```

### 圆角系统
```css
--radius-sm: 3px
--radius-md: 6px
--radius-lg: 9px
```

---

## 动画规范（Animations）

### Transition 时长
```
快速: 150ms
标准: 200ms
慢速: 300ms
```

### Easing 函数
```css
ease-out  /* 默认 */
ease-in-out  /* 平滑 */
```

---

## 可访问性（Accessibility）

### Focus 状态
```jsx
focus-visible:ring-2 focus-visible:ring-primary
```

### 色彩对比
- 文字对比度 ≥ 4.5:1 (WCAG AA)
- 交互元素对比度 ≥ 3:1

---

## 与 {{REFERENCE_PROJECT}} 的差异

| 维度 | {{REFERENCE_PROJECT}} | {{PROJECT_NAME}} |
|------|----------------------|------------------|
| **色彩风格** | {{参考项目风格}} | {{本项目风格}} |
| **主题色** | {{参考主题色}} | {{本项目主题色}} |
| **视觉密度** | {{参考密度}} | {{本项目密度}} |

---

**最后更新**: {{START_DATE}}
**版本**: 1.0.0
