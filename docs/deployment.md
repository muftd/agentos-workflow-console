# Deployment Guide · Workflow Console

> 如何将 Workflow Console 部署到 Replit 或其他静态托管平台

---

## 📋 部署前准备

### 1. 确保构建成功

```bash
cd client
npm install
npm run build
```

构建成功后，会在 `client/dist/` 目录生成静态文件。

### 2. 验证构建产物

```bash
npm run preview
```

访问 http://localhost:4173 预览构建后的应用。

---

## 🚀 Replit 部署

### 方法 1: 使用 Git导入（推荐）

1. **将代码推送到 GitHub**

```bash
git add .
git commit -m "feat: Complete Workflow Console v0.1"
git push origin main
```

2. **在 Replit 创建新项目**

- 访问 [replit.com](https://replit.com)
- 点击 "Create Repl"
- 选择 "Import from GitHub"
- 输入仓库 URL: `https://github.com/muftd/agentos-workflow-console`
- 选择分支并导入

3. **配置 Replit**

在 `.replit` 文件中配置运行命令：

```toml
run = "cd client && npm install && npm run build && npm run preview"
modules = ["nodejs-20"]

[nix]
channel = "stable-24_05"

[deployment]
run = ["sh", "-c", "cd client && npm run build && npm run preview"]
deploymentTarget = "static"
```

4. **运行项目**

点击 "Run" 按钮，Replit 会自动：
- 安装依赖
- 构建项目
- 启动预览服务器

5. **获取公开 URL**

Replit 会自动分配一个公开 URL，例如：
```
https://workflow-console.replit.app
```

### 方法 2: 手动上传

1. 在 Replit 创建空白 Node.js 项目
2. 上传整个 `client` 目录
3. 在 Shell 中运行：

```bash
cd client
npm install
npm run build
npm run preview -- --host 0.0.0.0
```

---

## 🌐 其他部署平台

### Vercel（推荐）

**最简单的部署方式**

1. 在项目根目录创建 `vercel.json`：

```json
{
  "buildCommand": "cd client && npm install && npm run build",
  "outputDirectory": "client/dist",
  "framework": "vite"
}
```

2. 安装 Vercel CLI：

```bash
npm i -g vercel
```

3. 部署：

```bash
vercel
```

或通过 Vercel Dashboard 导入 GitHub 仓库。

**访问 URL**: `https://workflow-console.vercel.app`

---

### Netlify

1. 在 `client` 目录创建 `netlify.toml`：

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. 部署方式：

**方式 A: 拖拽部署**
- 访问 [app.netlify.com](https://app.netlify.com)
- 拖拽 `client/dist` 目录到页面

**方式 B: Git 集成**
- 连接 GitHub 仓库
- 选择 `client` 作为基础目录
- 构建命令: `npm run build`
- 发布目录: `dist`

---

### GitHub Pages

1. 在 `client/vite.config.ts` 添加 base 路径：

```typescript
export default defineConfig({
  base: '/agentos-workflow-console/',  // 替换为你的仓库名
  // ... 其他配置
})
```

2. 重新构建：

```bash
npm run build
```

3. 创建 GitHub Actions workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: cd client && npm install

      - name: Build
        run: cd client && npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./client/dist
```

4. 在 GitHub 仓库设置中启用 GitHub Pages

---

### Cloudflare Pages

1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 Pages 部分
3. 连接 GitHub 仓库
4. 配置构建：

- **构建命令**: `cd client && npm run build`
- **构建输出目录**: `client/dist`
- **Root directory**: `/`

5. 部署完成后获取 URL：
```
https://workflow-console.pages.dev
```

---

## 🔧 环境变量

当前项目不需要环境变量。如果将来需要配置 API endpoints，可以创建 `.env` 文件：

```env
VITE_API_URL=https://api.example.com
```

并在代码中使用：
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 📝 部署检查清单

部署前确认：

- [ ] `npm run build` 成功执行
- [ ] `npm run preview` 本地预览正常
- [ ] 所有资源文件（JSON 数据）正确加载
- [ ] 响应式设计在移动端正常显示
- [ ] 所有交互功能正常工作

---

## 🐛 常见问题

### Q: 部署后页面空白

**A:** 检查 `vite.config.ts` 中的 `base` 配置：

```typescript
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
  // ...
})
```

### Q: JSON 数据加载失败

**A:** 确保 `public/data/workflow-log-sample.json` 文件存在，并且路径正确：

```typescript
fetch('/data/workflow-log-sample.json')  // 注意开头的斜杠
```

### Q: 字体未加载

**A:** 检查 `index.html` 中的 Google Fonts 链接是否可访问。

---

## 📊 性能优化

### 1. 启用 Gzip 压缩

大多数托管平台自动启用。如需手动配置：

**Vercel**: 默认启用
**Netlify**: 默认启用
**Replit**: 需要在服务器配置中启用

### 2. 图片优化

当前项目主要使用 SVG 图标，无需额外优化。

### 3. 代码分割

Vite 自动进行代码分割。当前构建大小：

- `index.html`: ~1 KB
- `index.css`: ~19 KB (gzip: ~4 KB)
- `index.js`: ~230 KB (gzip: ~72 KB)

---

## 🎉 部署完成

部署成功后，测试以下功能：

1. ✅ 加载 workflow 数据
2. ✅ 点击节点切换选中状态
3. ✅ 键盘导航（左/右箭头）
4. ✅ 响应式布局（移动端）
5. ✅ 所有动画和过渡效果

分享你的部署 URL 并享受 Workflow Console！🚀
