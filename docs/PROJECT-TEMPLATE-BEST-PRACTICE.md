# Web Demo 项目冷启动 Best Practice

> 基于 PromptImagine 和 Workflow Console 的经验，提炼可复用的项目启动模式

**版本**: 1.0.0
**更新日期**: 2025-11-18
**适用场景**: React + TypeScript + Tailwind + shadcn UI 的 Web Demo 项目

---

## 📚 目录

1. [核心理念](#核心理念)
2. [可复用资产库](#可复用资产库)
3. [快速启动流程（3步法）](#快速启动流程)
4. [项目模板结构](#项目模板结构)
5. [经验沉淀方法论](#经验沉淀方法论)
6. [未来项目清单](#未来项目清单)

---

## 核心理念

### 🎯 从两个项目中学到的关键经验

| 项目 | 成功要素 | 可复用资产 |
|------|---------|-----------|
| **PromptImagine** | Replit Agent 0→1，Figma级UI质量 | 设计系统、Tailwind配置、shadcn组件库 |
| **Workflow Console** | Claude Code实现，参考PromptImagine质量 | 文档模板、迭代流程、冷启动Prompt |

### ✅ 核心成功因素（复制到每个项目）

1. **完整的设计系统** — 在写代码前定义清楚
2. **详细的组件规格** — TypeScript类型 + 实现细节
3. **分步迭代计划** — 不一次性完成，每步验收
4. **参考项目质量** — 有具体的视觉标杆
5. **标准化工具链** — React + TS + Tailwind + shadcn + Vite

---

## 可复用资产库

### 📦 资产分类与存储

建议创建一个**通用模板仓库**：

```
~/templates/
└── web-demo-template/
    ├── docs-templates/        # 文档模板
    ├── config-templates/      # 配置文件模板
    ├── design-assets/         # 设计资产
    └── code-snippets/         # 代码片段
```

---

### 1. 文档模板（docs-templates/）

#### 必备文档模板（每个项目必用）

| 文件 | 作用 | 来源项目 | 复用方式 |
|------|------|---------|---------|
| **CLAUDE.md** | AI协作指南 | PromptImagine | 复制后修改项目名 |
| **design-system.md** | 设计系统 | Workflow Console | 调整色彩/字体/风格 |
| **component-spec.md** | 组件规格 | Workflow Console | 按新项目组件重写 |
| **tooling-workflow.md** | 多工具协作 | PromptImagine | 直接复用 |
| **WORKFLOW.md** | Git策略 | Workflow Console | 直接复用 |

#### Dev Docs 三件套模板

| 文件 | 模板内容 |
|------|---------|
| **plan.md** | 阶段划分模板（M1/M2/M3 + 验收标准） |
| **context.md** | 技术环境、决策记录、踩坑经验 |
| **task.md** | 任务列表模板（TODO/DOING/DONE） |

#### 迭代文档模板

| 文件 | 用途 |
|------|------|
| **iteration-template.md** | 单次迭代的标准格式（目标/任务/验收） |
| **web-coldstart-prompt-template.md** | Claude Code web端冷启动模板 |

---

### 2. 配置文件模板（config-templates/）

#### 完整配置文件清单

```
config-templates/
├── tailwind.config.ts           # ← 基于PromptImagine
├── components.json              # ← shadcn配置（new-york style）
├── tsconfig.json                # ← TypeScript配置
├── vite.config.ts               # ← Vite + path alias
├── package.json                 # ← 依赖清单
├── postcss.config.js
├── .gitignore
└── index.css                    # ← CSS变量系统模板
```

**每个文件的复用策略**：

#### `tailwind.config.ts` 模板

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "9px",
        md: "6px",
        sm: "3px",
      },
      colors: {
        // ← 替换为项目主题色
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ...完整变量（从PromptImagine复制）
      },
      fontFamily: {
        sans: ["Inter", "Source Han Sans CN", "system-ui"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

#### `index.css` 模板

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* ← 替换为项目色彩方案 */
    --background: 0 0% 100%;
    --foreground: 0 0% 9%;
    /* ...完整变量定义 */
  }

  .dark {
    /* Dark mode 变量 */
  }
}
```

#### `package.json` 依赖模板

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@radix-ui/react-*": "latest",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.5",
    "lucide-react": "^0.468.0",
    "framer-motion": "^11.15.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "~5.6.2",
    "vite": "^6.0.3",
    "tailwindcss": "^3.4.17",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49"
  }
}
```

---

### 3. 设计资产（design-assets/）

#### 设计系统可复用部分

| 资产类型 | 来源 | 复用方式 |
|---------|------|---------|
| **色彩系统模板** | PromptImagine | 保留结构，替换具体色值 |
| **字体层级** | PromptImagine | 6级层级直接复用 |
| **间距系统** | Tailwind 4px基准 | 直接复用 |
| **圆角规范** | 3px/6px/9px | 直接复用 |
| **阴影系统** | shadow-sm/md/lg | 直接复用 |
| **动画规范** | 200ms transition | 直接复用 |

#### 设计风格决策树

```
新项目设计风格 = ?

├─ 创意工具类（如PromptImagine）
│  └─ 使用：Glassmorphism + 渐变 + 炫酷动画
│
├─ 专业工具类（如Workflow Console）
│  └─ 使用：简洁卡片 + 清晰边框 + subtle动画
│
└─ 数据展示类
   └─ 使用：高对比 + 清晰层级 + 最小动画
```

---

### 4. 代码片段（code-snippets/）

#### shadcn 组件安装清单

**基础组件（每个项目必装）**：
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add separator
```

**常用交互组件**：
```bash
npx shadcn@latest add dialog
npx shadcn@latest add tooltip
npx shadcn@latest add dropdown-menu
npx shadcn@latest add tabs
```

#### 常用工具函数

**cn() 工具（必备）**：
```typescript
// lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**日期格式化**：
```typescript
export function formatDate(isoString: string): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(isoString));
}
```

---

## 快速启动流程

### 🚀 三步法：从 0 到第一个Demo（3-4小时）

#### Step 1: 准备阶段（30分钟）

**1.1 明确项目定位**

填写这个清单：
```markdown
- 项目名称: _______
- 项目类型: [ ] 创意工具 [ ] 专业工具 [ ] 数据展示
- 核心功能: _______（一句话）
- 参考质量标杆: _______（PromptImagine / Workflow Console / 其他）
- 主题色: _______（HSL值）
```

**1.2 复制模板文件**

```bash
# 创建项目目录
mkdir my-new-project
cd my-new-project

# 复制文档模板
cp ~/templates/web-demo-template/docs-templates/* ./docs/

# 复制配置文件
cp ~/templates/web-demo-template/config-templates/* ./
```

**1.3 批量替换占位符**

```bash
# 替换项目名（macOS）
find . -type f -name "*.md" -exec sed -i '' 's/{{PROJECT_NAME}}/My New Project/g' {} +

# 或者手动在IDE中全局替换：
# {{PROJECT_NAME}} → 实际项目名
# {{PRIMARY_COLOR}} → 主题色HSL
# {{REFERENCE_PROJECT}} → 参考项目名
```

---

#### Step 2: 设计定义阶段（1-1.5小时）

**2.1 在 ChatGPT 定义设计系统**

使用这个 Prompt：

```
我要开始一个新的 Web Demo 项目：{{PROJECT_NAME}}

项目定位：{{项目类型}}
参考质量：{{参考项目}}

请帮我基于以下模板，定制这个项目的设计系统：

[上传] design-system.md 模板
[上传] PromptImagine 的 design_guidelines.md（参考）

需要调整的部分：
1. 色彩系统（主题色、辅助色、语义色）
2. 视觉风格（创意炫酷 vs 专业简洁）
3. 动画规范（多 vs 少）

请输出完整的 design-system.md 文件。
```

**2.2 定义组件清单**

```markdown
## 本项目的组件层级

App
└── MainPage
    ├── Header
    ├── [核心组件1]
    ├── [核心组件2]
    └── Footer (可选)
```

**2.3 编写 iteration-001**

基于模板，定义第一轮迭代：
- 目标：技术栈配置 + 基础组件验证
- 任务：4-5个具体任务
- 验收：与参考项目对比的检查清单

---

#### Step 3: Claude Code 实现（1.5-2小时）

**3.1 准备文件上传清单**

```
必需文件：
□ CLAUDE.md
□ design-system.md
□ component-spec.md
□ iteration-001.md
□ tooling-workflow.md
□ WORKFLOW.md

参考文件：
□ 参考项目的 design_guidelines.md
□ 参考项目的 tailwind.config.ts
□ 参考项目的 components.json
```

**3.2 使用冷启动 Prompt**

复制 `web-coldstart-prompt-template.md`，替换：
- 项目名
- 项目背景
- 参考项目
- 当前迭代任务

**3.3 启动开发**

上传文件 + 粘贴 Prompt → Claude Code 开始工作

---

## 项目模板结构

### 📂 标准目录结构（每个项目一致）

```
my-new-project/
├── docs/
│   ├── design-system.md         # 设计系统定义
│   ├── component-spec.md        # 组件规格
│   ├── plan.md                  # 开发计划
│   ├── context.md               # 上下文/决策
│   ├── task.md                  # 任务列表
│   ├── tooling-workflow.md      # 工具协作流程
│   ├── iteration-001-*.md       # 迭代文档
│   └── web-coldstart-prompt.md  # 冷启动Prompt
├── data/                        # 数据文件（如有）
├── specs/                       # 需求规格
│   └── mvp-v0.1-spec.md
├── client/src/                  # 前端代码
│   ├── components/
│   │   ├── [project-specific]/  # 项目特定组件
│   │   └── ui/                  # shadcn组件
│   ├── lib/
│   ├── types/
│   ├── pages/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── CLAUDE.md                    # AI协作指南
├── WORKFLOW.md                  # Git工作流
├── README.md
├── package.json
├── tailwind.config.ts
├── components.json
├── tsconfig.json
└── vite.config.ts
```

---

## 经验沉淀方法论

### 🧠 每个项目结束后的总结流程

#### 1. 更新模板仓库

**问自己3个问题**：

1. **这个项目有哪些配置/代码可以复用？**
   - 新的设计模式？
   - 新的工具函数？
   - 新的shadcn组件组合？

2. **踩了哪些坑？如何避免？**
   - 更新 `context.md` 模板的"常见问题"章节

3. **工作流程有哪些改进？**
   - 更新 `tooling-workflow.md`
   - 更新迭代模板

#### 2. 提取可复用资产

**代码资产**：
```bash
# 从项目中提取通用组件
cp client/src/components/CommonHeader.tsx ~/templates/code-snippets/
cp client/src/lib/utils.ts ~/templates/code-snippets/
```

**配置资产**：
```bash
# 如果这个项目的Tailwind配置更优，更新模板
cp tailwind.config.ts ~/templates/config-templates/
```

**文档资产**：
- 如果设计系统有创新 → 更新设计模板
- 如果组件规格更清晰 → 更新规格模板

#### 3. 记录项目对比矩阵

维护一个 `PROJECT_COMPARISON.md`：

| 项目 | 类型 | 设计风格 | 核心技术 | 质量亮点 | 可复用资产 |
|------|------|---------|---------|---------|-----------|
| PromptImagine | 创意工具 | Glassmorphism | React+TS | Figma级UI | 设计系统、Tailwind配置 |
| Workflow Console | 专业工具 | 简洁卡片 | React+TS | 清晰信息层级 | 文档模板、迭代流程 |
| 未来项目3 | ? | ? | ? | ? | ? |

---

## 未来项目清单

### 🎯 下次启动新项目时的操作步骤

#### 前置准备（项目启动前）

- [ ] 1. 打开 `PROJECT-TEMPLATE-BEST-PRACTICE.md`（本文档）
- [ ] 2. 复制模板仓库到新项目目录
- [ ] 3. 填写项目定位清单

#### ChatGPT 定义阶段（1小时）

- [ ] 4. 在 ChatGPT 定制 design-system.md
- [ ] 5. 在 ChatGPT 定义 component-spec.md
- [ ] 6. 在 ChatGPT 编写 iteration-001.md

#### Claude Code 实现阶段（2-3小时）

- [ ] 7. 上传必需文件 + 参考文件
- [ ] 8. 粘贴冷启动 Prompt
- [ ] 9. 执行 Iteration 001

#### Replit 验收阶段（30分钟）

- [ ] 10. 部署到 Replit
- [ ] 11. 对比参考项目质量
- [ ] 12. 调整差距

#### 迭代循环

- [ ] 13. 进入 Iteration 002, 003...

---

## 附录：模板文件占位符规范

### 统一的占位符命名

在所有模板文件中使用以下占位符：

```markdown
{{PROJECT_NAME}}              # 项目名称
{{PROJECT_TYPE}}              # 项目类型（创意工具/专业工具/数据展示）
{{PRIMARY_COLOR}}             # 主题色（HSL格式）
{{SECONDARY_COLOR}}           # 辅助色
{{REFERENCE_PROJECT}}         # 参考项目名
{{GITHUB_REPO}}               # GitHub仓库地址
{{REPLIT_URL}}                # Replit部署地址
{{START_DATE}}                # 项目开始日期
```

### 批量替换脚本

**macOS/Linux**:
```bash
#!/bin/bash
# replace-placeholders.sh

PROJECT_NAME="My New Project"
PRIMARY_COLOR="217 91% 60%"
REFERENCE_PROJECT="PromptImagine"

find . -type f -name "*.md" -exec sed -i '' \
  -e "s/{{PROJECT_NAME}}/$PROJECT_NAME/g" \
  -e "s/{{PRIMARY_COLOR}}/$PRIMARY_COLOR/g" \
  -e "s/{{REFERENCE_PROJECT}}/$REFERENCE_PROJECT/g" \
  {} +
```

---

## 成功案例总结

### PromptImagine → Workflow Console 的复用

| 复用资产 | 节省时间 | 质量提升 |
|---------|---------|---------|
| 设计系统模板 | 1小时 | ⭐⭐⭐⭐⭐ |
| Tailwind配置 | 30分钟 | ⭐⭐⭐⭐⭐ |
| shadcn组件清单 | 20分钟 | ⭐⭐⭐⭐ |
| 工具协作流程 | 直接复用 | ⭐⭐⭐⭐⭐ |
| 冷启动Prompt模式 | 1小时 | ⭐⭐⭐⭐⭐ |

**总计节省**: ~3小时 + 质量保证

---

## 持续改进

### 每完成一个项目后

1. **更新本文档**
   - 添加新的最佳实践
   - 更新模板仓库链接
   - 补充踩坑经验

2. **更新模板仓库**
   - 提取新的可复用代码
   - 优化配置文件
   - 改进文档模板

3. **记录项目对比**
   - 更新 PROJECT_COMPARISON.md
   - 分析质量差异
   - 提炼成功模式

---

**最后更新**: 2025-11-18
**下次更新触发**: 完成第三个项目时
