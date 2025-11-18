# Iteration 001: Foundation & Design System Setup

> 第一轮迭代：建立技术基础和设计系统，验证质量能达到 PromptImagine 水平

**开始日期**: 2025-11-18
**目标时长**: 2-3 小时
**负责人**: Claude Code (web 端)

---

## 🎯 本轮目标

**核心目标**：搭建项目基础，实现并验证设计系统

**成功标准**：
1. ✅ 项目运行正常（npm run dev）
2. ✅ Tailwind + shadcn UI 配置完成
3. ✅ CSS 变量系统实现（参考 PromptImagine）
4. ✅ 基础组件（Button, Card, Badge）达到 PromptImagine 的视觉质量
5. ✅ 部署到 Replit 可访问

---

## 📋 任务清单

### Task 1: 项目初始化（30分钟）

**前置条件**：在 Replit 或本地已创建空白项目

**执行步骤**：

1. **初始化 React + TypeScript + Vite 项目**
   ```bash
   npm create vite@latest . -- --template react-ts
   npm install
   ```

2. **安装核心依赖**
   ```bash
   # Tailwind + shadcn
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p

   # shadcn UI 依赖
   npm install class-variance-authority clsx tailwind-merge
   npm install lucide-react  # 图标库（替代 @heroicons/react）

   # 可选：Framer Motion（如需动画）
   npm install framer-motion
   ```

3. **配置 path aliases**（tsconfig.json）
   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

   并在 `vite.config.ts` 添加：
   ```typescript
   import path from "path"

   export default defineConfig({
     resolve: {
       alias: {
         "@": path.resolve(__dirname, "./src"),
       },
     },
   })
   ```

**验收标准**：
- ✅ `npm run dev` 启动成功
- ✅ 浏览器访问 localhost 显示 Vite 默认页面

---

### Task 2: Tailwind 配置（45分钟）

**目标**：配置与 PromptImagine 一致的 Tailwind 设计系统

**执行步骤**：

1. **创建 `tailwind.config.ts`**

参考 `docs/design-system.md` 和 PromptImagine 的配置：

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "9px",
        md: "6px",
        sm: "3px",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      fontFamily: {
        sans: ["Inter", "Source Han Sans CN", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "SF Mono", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

2. **创建 `src/index.css`**

定义 CSS 变量（参考 design-system.md）：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 98%;
    --foreground: 0 0% 9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 9%;
    --border: 214 15% 91%;
    --muted: 210 10% 96%;
    --muted-foreground: 0 0% 45%;
    --primary: 217 91% 60%;
    --primary-foreground: 0 0% 100%;
    --accent: 142 76% 36%;
    --accent-foreground: 0 0% 100%;
  }

  .dark {
    --background: 0 0% 9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 13%;
    --card-foreground: 0 0% 98%;
    --border: 0 0% 18%;
    --muted: 0 0% 15%;
    --muted-foreground: 0 0% 60%;
    --primary: 217 91% 60%;
    --primary-foreground: 0 0% 100%;
    --accent: 142 76% 36%;
    --accent-foreground: 0 0% 100%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-sans;
  }
}
```

3. **在 `main.tsx` 中引入**
   ```typescript
   import './index.css'
   ```

**验收标准**：
- ✅ 页面背景色变为设计系统定义的颜色
- ✅ CSS 变量在浏览器 DevTools 中可见
- ✅ 字体应用正确

---

### Task 3: shadcn UI 初始化（30分钟）

**执行步骤**：

1. **创建 `components.json`**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

2. **安装基础组件**

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add separator
```

3. **创建测试页面验证组件**

在 `src/App.tsx` 创建组件测试：

```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function App() {
  return (
    <div className="min-h-screen bg-background p-12">
      <div className="container max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Design System 测试</h1>

        <section>
          <h2 className="text-xl font-semibold mb-4">Buttons</h2>
          <div className="flex gap-4">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Cards</h2>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">示例卡片</h3>
            <p className="text-sm text-muted-foreground">
              这是一个使用设计系统的卡片组件
            </p>
          </Card>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Badges</h2>
          <div className="flex gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
```

**验收标准**：
- ✅ Button 样式与 PromptImagine 风格一致
- ✅ Card 有正确的圆角、边框、阴影
- ✅ Badge 颜色和圆角符合设计规范
- ✅ Hover 状态流畅（200ms transition）

---

### Task 4: 对比质量验收（30分钟）

**执行步骤**：

1. **在 Replit 部署**
   - 推送代码到 GitHub
   - 在 Replit 拉取并运行

2. **截图对比**
   - 截图 workflow-console 的基础组件
   - 对比 PromptImagine 的组件
   - 列出差距

3. **调整**
   - 根据差距调整 CSS 变量
   - 微调阴影、间距、圆角
   - 直到视觉质量达标

**验收清单**：

| 维度 | PromptImagine 标准 | workflow-console | 达标？ |
|------|-------------------|------------------|--------|
| 圆角 | 3px/6px/9px | ? | |
| 阴影 | shadow-sm/md/lg | ? | |
| 字体 | Inter + Source Han Sans | ? | |
| 间距 | 4px 基准 | ? | |
| 边框颜色 | hsl(214 15% 91%) | ? | |
| Hover 动画 | 200ms | ? | |

---

## 🚧 阻塞点与决策

### 已知问题
无

### 待决策
- [ ] 是否使用 Framer Motion？（可选，先用 Tailwind transitions）
- [ ] 字体加载方式？（Google Fonts CDN vs 本地）

---

## 📝 完成后的产物

1. ✅ 可运行的 React + TypeScript 项目
2. ✅ 完整的 Tailwind 配置
3. ✅ CSS 变量系统
4. ✅ shadcn UI 基础组件
5. ✅ 部署在 Replit 的测试页面

---

## 🔗 下一轮迭代

**Iteration 002**: 实现 SessionHeader + 数据加载

**预计任务**：
- 创建 TypeScript 类型定义
- 实现 WorkflowConsolePage 数据加载
- 实现 SessionHeader 组件
- 验证 JSON 数据正确渲染

---

**最后更新**: 2025-11-18
