# 新项目快速启动 Checklist

> 下次启动项目时，按照这个清单执行（预计3-4小时从0到第一个Demo）

**使用方法**：复制此清单，逐项打勾

---

## 📋 第1阶段：准备（30分钟）

### 项目定位

- [ ] **填写项目信息卡**
  ```
  项目名称: _________________
  项目类型: [ ] 创意工具 [ ] 专业工具 [ ] 数据展示
  核心功能: _________________（一句话）
  参考质量: _________________（PromptImagine / Workflow Console / 其他）
  主题色(HSL): _______________
  GitHub仓库: ________________
  ```

### 复制模板文件

- [ ] **创建项目目录**
  ```bash
  mkdir {{PROJECT_NAME}}
  cd {{PROJECT_NAME}}
  ```

- [ ] **复制文档模板**
  ```bash
  mkdir docs
  cp ~/templates/web-demo-template/docs-templates/* ./docs/
  ```

- [ ] **复制配置模板**
  ```bash
  cp ~/templates/web-demo-template/config-templates/tailwind.config.ts ./
  cp ~/templates/web-demo-template/config-templates/components.json ./
  cp ~/templates/web-demo-template/config-templates/package.json ./
  # ...其他配置文件
  ```

### 批量替换占位符

- [ ] **全局替换**（使用IDE的Find & Replace All）
  - `{{PROJECT_NAME}}` → 实际项目名
  - `{{PRIMARY_COLOR}}` → 主题色HSL值
  - `{{REFERENCE_PROJECT}}` → 参考项目名（PromptImagine/Workflow Console）
  - `{{START_DATE}}` → 今天日期

---

## 📋 第2阶段：ChatGPT 设计定义（1-1.5小时）

### 设计系统定义

- [ ] **打开 ChatGPT**

- [ ] **使用以下Prompt**
  ```
  我要开始一个新的Web Demo项目：{{PROJECT_NAME}}

  项目定位：{{项目类型}}
  参考质量：{{参考项目}}

  请帮我基于以下模板，定制这个项目的设计系统。

  [上传] docs/templates/design-system-template.md
  [上传] {{REFERENCE_PROJECT}}/design_guidelines.md

  需要调整：
  1. 色彩系统（主题色：{{PRIMARY_COLOR}}）
  2. 视觉风格（{{创意炫酷 vs 专业简洁}}）
  3. 动画规范

  请输出完整的 design-system.md 文件。
  ```

- [ ] **保存输出为 `docs/design-system.md`**

### 组件规格定义

- [ ] **在 ChatGPT 继续对话**
  ```
  现在请基于这个设计系统，定义项目的组件清单和规格。

  核心组件：
  1. {{组件1名称}} - {{功能描述}}
  2. {{组件2名称}} - {{功能描述}}
  3. {{组件3名称}} - {{功能描述}}

  参考：{{REFERENCE_PROJECT}}/component-spec.md

  请输出 component-spec.md。
  ```

- [ ] **保存输出为 `docs/component-spec.md`**

### 迭代计划定义

- [ ] **在 ChatGPT 继续对话**
  ```
  请基于以上设计和组件规格，编写第一轮迭代计划。

  参考：{{REFERENCE_PROJECT}}/iteration-001-foundation.md

  Iteration 001 目标：
  - 技术栈配置
  - 基础组件验证
  - 质量对比

  请输出 iteration-001-foundation.md。
  ```

- [ ] **保存输出为 `docs/iteration-001-foundation.md`**

---

## 📋 第3阶段：准备上传文件（15分钟）

### 整理必需文件

- [ ] **workflow-console 项目文件**
  ```
  □ CLAUDE.md
  □ WORKFLOW.md
  □ docs/design-system.md
  □ docs/component-spec.md
  □ docs/iteration-001-foundation.md
  □ docs/tooling-workflow.md
  □ docs/plan.md
  □ docs/task.md
  ```

### 整理参考文件

- [ ] **{{REFERENCE_PROJECT}} 参考文件**
  ```
  □ {{REFERENCE_PROJECT}}/design_guidelines.md
  □ {{REFERENCE_PROJECT}}/tailwind.config.ts
  □ {{REFERENCE_PROJECT}}/components.json
  □ {{REFERENCE_PROJECT}}/index.css（前100行）
  ```

### 准备冷启动Prompt

- [ ] **打开 `docs/templates/web-coldstart-prompt-template.md`**

- [ ] **替换所有占位符**
  - {{PROJECT_NAME}}
  - {{REFERENCE_PROJECT}}
  - {{PRIMARY_FONT}}
  - 等等

- [ ] **保存为 `docs/web-coldstart-prompt.md`**

---

## 📋 第4阶段：Claude Code Web 端实现（1.5-2小时）

### 启动 Claude Code

- [ ] **访问** https://claude.ai/code

- [ ] **上传所有文件**（拖拽或点击📎）
  - 必需文件（8-10个）
  - 参考文件（4个）

### 执行冷启动

- [ ] **复制 `docs/web-coldstart-prompt.md` 的完整内容**

- [ ] **粘贴到 Claude Code 对话框，发送**

- [ ] **等待 Claude 响应**
  - ✅ 确认已读取文件
  - ✅ 理解项目目标
  - ✅ 开始执行 Task 1

### 监控进度

- [ ] **Task 1: 项目初始化**（Claude 执行）
  - 检查：package.json 依赖正确
  - 检查：tsconfig.json 配置正确

- [ ] **Task 2: Tailwind 配置**（Claude 执行）
  - 检查：tailwind.config.ts 与参考项目一致
  - 检查：index.css CSS变量完整

- [ ] **Task 3: shadcn UI 初始化**（Claude 执行）
  - 检查：components.json 配置正确
  - 检查：Button/Card/Badge 组件安装

- [ ] **Task 4: 质量验收**（你来做）
  - 对比参考项目截图
  - 检查圆角/阴影/间距
  - 验证动画流畅度

---

## 📋 第5阶段：Replit 部署验收（30分钟）

### 推送到 GitHub

- [ ] **Claude Code 完成后，提交代码**
  ```bash
  git add .
  git commit -m "feat: Complete Iteration 001 - Foundation"
  git push origin main
  ```

### Replit 部署

- [ ] **在 Replit 创建新项目，连接 GitHub 仓库**

- [ ] **拉取代码并运行**
  ```bash
  git pull origin main
  npm install
  npm run dev
  ```

- [ ] **浏览器访问 Replit URL**

### 质量验收

- [ ] **截图当前页面**

- [ ] **对比 {{REFERENCE_PROJECT}} 截图**

- [ ] **填写质量对比表**

  | 维度 | {{REFERENCE_PROJECT}} | {{PROJECT_NAME}} | 达标？ |
  |------|---------------------|------------------|--------|
  | 圆角 | 3px/6px/9px | ? | [ ] |
  | 阴影 | 清晰层次 | ? | [ ] |
  | 字体 | Inter + 思源 | ? | [ ] |
  | 间距 | 4px 基准 | ? | [ ] |
  | Hover | 200ms 流畅 | ? | [ ] |

- [ ] **如有差距，调整代码直到达标**

---

## 📋 第6阶段：进入迭代循环（持续）

### 规划下一轮

- [ ] **创建 `docs/iteration-002-*.md`**

- [ ] **在 ChatGPT 定义下一轮目标**
  ```
  Iteration 001 已完成，现在规划 Iteration 002。

  目标：实现 {{核心组件1}}
  ```

### 继续开发

- [ ] **重复阶段4-5的流程**
  - 在 Claude Code web端继续开发
  - 在 Replit 验收
  - 对比质量
  - 调整差距

---

## ✅ 完成标志

当你完成以下所有任务，第一个Demo就完成了：

- [x] 项目可运行（npm run dev）
- [x] 设计系统完整定义
- [x] 基础组件视觉质量达标
- [x] 部署在 Replit 可访问
- [x] 质量对比表全部达标
- [x] 代码推送到 GitHub

---

## 🎯 时间分配参考

| 阶段 | 预计时间 | 累计时间 |
|------|---------|---------|
| 准备 | 30分钟 | 0.5h |
| ChatGPT 设计 | 1.5小时 | 2h |
| 准备文件 | 15分钟 | 2.25h |
| Claude Code 实现 | 1.5小时 | 3.75h |
| Replit 验收 | 30分钟 | 4.25h |

**总计：约 4 小时**

---

## 💡 成功技巧

1. **不要跳过 ChatGPT 设计阶段** — 设计清晰=开发快速
2. **严格对比参考项目** — 不要降低质量标准
3. **分步验收** — 每个Task完成后立即检查
4. **保持文档更新** — 随时记录决策和踩坑经验
5. **复用模板** — 不要重新发明轮子

---

**最后更新**: 2025-11-18
**下次使用**: 启动第三个项目时
