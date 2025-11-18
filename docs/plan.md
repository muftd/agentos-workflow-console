# Workflow Console · Dev Plan (v0.1)

> **状态**: ✅ v0.1 已完成并部署 (2025-11-18)

## 1. 这一轮的目标

在2–3天内，完成一个可在线访问的Web Demo：

- 从本地 `data/workflow-log-sample.json` 读取一条高光协作流程；
- 使用React构建一个单页应用，展示：
  - 顶部：Session 概览
  - 中间：线性的Flow Map（多Coach协作谱线）
  - 底部：点击节点后显示的详细故事面板；
- 部署在Replit并验证可以正常加载sample数据。

## 2. 阶段拆分

### Stage 1: 数据契约 & 假数据 ✅
- 任务：
  - 确认 `docs/workflow-log-schema.md` schema（v0.1）
  - 创建 `data/workflow-log-sample.json`（单条高光协作流）
- 成功标准：
  - JSON通过基本校验，字段完整，Claude Code能读取并打印出结构。
- **完成时间**: Iteration 002

### Stage 2: UI 骨架搭建 ✅
- 任务：
  - 初始化前端项目（React + TS + Tailwind + shadcn UI）
  - 搭出页面三块区域：顶部概览 / 中间Flow / 底部详情
- 成功标准：
  - 使用虚拟数据在页面上看到一条"假Flow线"。
- **完成时间**: Iteration 001
- **技术栈**:
  - React 19.2.0 + TypeScript 5.9.3
  - Vite 7.2.2
  - Tailwind CSS 4.1.17 (with @tailwindcss/vite plugin)
  - shadcn/ui (New York style variant)

### Stage 3: 数据绑定 & 基础交互 ✅
- 任务：
  - 用真实 `workflow-log-sample.json` 驱动UI
  - 实现点击节点→更新详情面板
- 成功标准：
  - 能完整走一遍step-01到step-06的点击，高亮与详情联动正确。
- **完成时间**: Iteration 002
- **额外功能**:
  - 实现了键盘导航 (Arrow Left/Right)
  - Actor 颜色编码系统

### Stage 4: 视觉细节 & 部署 ✅
- 任务：
  - 优化节点样式、hover效果、整体排版
  - 在Replit上配置构建&部署
- 成功标准：
  - 通过浏览器访问Replit URL，可以看到完整的Workflow Console v0.1页面。
- **完成时间**: Iteration 003 + Replit 部署修复
- **响应式设计**: 支持移动端和桌面端完整体验

## 3. 部署后回顾与经验总结

### 3.1 部署过程

**Claude Code 阶段** (Iteration 001-003):
- ✅ 完成所有功能开发
- ✅ 本地构建测试通过 (`npm run build`)
- ⚠️ 存在配置问题未被发现

**Replit 修复阶段**:
- Replit Agent 发现并修复了5个关键配置问题
- 修复成本高，不符合预期工作流

### 3.2 主要问题与解决方案

#### 问题1: Tailwind CSS 版本管理错误 ⭐⭐⭐
**错误**: 在 Iteration 003 遇到 Tailwind v4 构建错误时，错误地降级到 v3.4
```bash
# ❌ 错误做法
npm uninstall tailwindcss @tailwindcss/postcss
npm install -D tailwindcss@^3.4
```

**正确做法**:
```bash
# ✅ 应该使用 Tailwind v4 + Vite 插件
npm install -D @tailwindcss/vite
# 在 vite.config.ts 中添加 tailwindcss() 插件
# 在 index.css 中使用 @import "tailwindcss"
```

**教训**:
- 永远不要在没有理解原因的情况下降级依赖
- Tailwind v4 专为 Vite 优化，应该优先使用
- 遇到新版本问题时，首先查阅官方文档

#### 问题2: Replit 服务器配置缺失 ⭐⭐
**错误**: 未在 vite.config.ts 中配置 `allowedHosts: true`

**正确配置**:
```typescript
server: {
  host: '0.0.0.0',
  port: 5000,
  strictPort: true,
  allowedHosts: true,  // 关键配置
}
```

**教训**:
- 开发时就应考虑目标部署平台的要求
- Replit 使用动态主机名，必须允许所有主机访问

#### 问题3: 测试不充分 ⭐⭐⭐
**错误**: 只运行了 `npm run build`，未测试预览和开发服务器

**正确测试流程**:
```bash
# 1. 构建测试
npm run build

# 2. 预览测试（模拟生产环境）
npm run preview

# 3. 开发服务器测试
npm run dev

# 4. 浏览器检查
# - 控制台无错误
# - 网络请求正常
# - 所有交互功能正常
```

**教训**:
- 部署前必须测试所有服务器模式
- 在类似目标环境中验证配置

### 3.3 理想工作流

```
Claude Code (完成所有开发和配置)
    ↓ 正确配置 + 充分测试
用户部署到 Replit (只需点击部署)
    ↓ 如有小问题
Claude Code 远程修复 (通过 git)
```

### 3.4 配置验证清单

部署前运行以下命令验证配置：

```bash
# 验证 Tailwind v4
grep -q "@tailwindcss/vite" client/package.json && echo "✅ Tailwind v4 plugin installed"

# 验证 Vite 配置
grep -q "allowedHosts: true" client/vite.config.ts && echo "✅ Replit config present"

# 验证 CSS 配置
grep -q '@import "tailwindcss"' client/src/index.css && echo "✅ Tailwind v4 CSS syntax"

# 测试构建
cd client && npm run build && echo "✅ Build successful"

# 测试预览
cd client && timeout 5s npm run preview && echo "✅ Preview server starts"
```

## 4. Iteration 004: UI 精致化 (2025-11-18) ✅

### 目标
将 v0.1 的粗糙 UI 提升到 Figma/Framer 级别的专业视觉质量。

### 问题诊断
1. **视觉层次混乱** - 所有文字都是小字号，没有主次对比
2. **空间拥挤** - 节点卡片过小 (256×128px)，内边距不足
3. **设计细节缺失** - 只有基础阴影，缺少渐变和光效
4. **排版质量低** - 字体对比不够，行高拥挤
5. **颜色单调** - 大量灰色，缺少品牌色和渐变

### 实施成果

#### Phase 1: StepNode 重构 ✅
- 卡片尺寸增大 25%：256×128px → 320×192px
- 内边距增加：p-4 → p-6
- 建立 5 级视觉层次：
  - output_label: text-lg font-semibold (主角)
  - actor badge: 渐变背景 (from-X-500 to-X-600)
  - skill: text-sm (次要)
  - tool: text-xs text-foreground/50 (辅助)
  - order: text-xs font-light (点缀)
- 实现多层阴影系统 (shadow-card 系列工具类)
- 增强 hover 效果：-translate-y-1 + scale-[1.02] + shadow-card-hover
- 增强 selected 效果：渐变背景 + shadow-card-selected
- 动画优化：duration-300 ease-out

#### Phase 2: FlowMap 增强 ✅
- 添加渐变背景：from-background via-muted/20 to-background
- 增加垂直间距：py-8/12 → py-12/16
- 增加水平间距：gap-4/6 → gap-6/8
- 优化箭头样式：更大尺寸 + primary 颜色 + 更粗描边

#### Phase 3: StepDetailPanel 重构 ✅
- 表单式布局 → 卡片化设计
- 添加图标增强的元数据卡片 (Hash, Clock, User, Wrench, Zap)
- Input/Output 独立卡片展示，Output 带渐变高亮
- 改进标题排版：uppercase tracking-wide
- 渐变背景增加层次感

#### Phase 4: SessionHeader 优化 ✅
- 标题增大：text-xl/2xl → text-2xl/3xl font-bold
- 增强背景模糊：backdrop-blur-sm → backdrop-blur-md
- 提高不透明度：bg-background/80 → bg-background/90
- 添加微妙阴影和品牌色点缀

#### Phase 5: 全局设计系统 ✅
- 自定义阴影工具类 (shadow-card, shadow-card-hover, shadow-card-selected)
- 深色模式阴影变体
- 页面渐变背景
- 统一动画时长和缓动函数

### 测试结果
```
✅ TypeScript 类型检查通过
✅ 生产构建成功 (CSS: 28.26 KB, JS: 233.25 KB)
✅ 预览服务器正常启动
✅ 开发服务器正常启动
```

### 视觉质量对比

**优化前**：
- 节点 256×128px, p-4, shadow-sm, text-xs/sm
- 平淡、拥挤、单调
- 简单的 hover 位移

**优化后**：
- 节点 320×192px, p-6, 多层阴影, text-lg 主标题
- 层次清晰、舒展、精致
- 位移+缩放+阴影+边框+渐变

### 成功标准达成
- ✅ 清晰的视觉层次
- ✅ 充足的留白
- ✅ 精致的多层阴影
- ✅ 丰富的微交互
- ✅ 统一的设计语言
- ✅ 专业的渐变应用
- ✅ 达到 Figma/Framer 质量水准

## 5. 下一步计划

v0.2 将在后续迭代中规划，可能包括：
- 多 session 支持
- 过滤和搜索功能
- 分支工作流可视化
- 深色模式完善