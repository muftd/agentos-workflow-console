# Workflow Console · 开发工作流指南

> 本文档说明日常开发和提交策略

## 项目架构

```
obsidian-vault/ (主repo)
└── projects/workflow-console/ (submodule)
    ├── 独立的GitHub repo: agentos-workflow-console
    └── 独立的版本控制
```

## 策略：方案A - 独立迭代，里程碑同步

### 日常开发（90% 的时间）

在 `projects/workflow-console` 目录里自由开发，**无需**关心 obsidian-vault：

```bash
# 进入项目目录
cd projects/workflow-console

# 正常的git工作流
git add .
git commit -m "你的提交信息"
git push origin main
```

**特点**：
- ✅ workflow-console 有完整的独立历史
- ✅ GitHub 上 agentos-workflow-console 始终最新
- ✅ 开发节奏不受 obsidian-vault 束缚
- ✅ 本地工作目录始终同步

### 里程碑更新（10% 的时间）

当完成某个**版本里程碑**时（例如 v0.1、v0.2），在 obsidian-vault 中记录这个引用：

```bash
# 从任意位置
cd obsidian-vault/

# 更新submodule指针
git add projects/workflow-console
git commit -m "Release: Workflow Console v0.1

- Complete MVP UI layout and interactions
- Implement workflow log data loading
- Deploy on Replit

✅ Version: agentos-workflow-console v0.1"

git push origin main
```

**何时更新**：
- 完成一个版本发布（v0.1、v0.2 等）
- 有重大功能完成
- 需要对外展示/分享时
- 大约 1–2 周一次

## 重要注意事项

### ✅ 你的本地状态始终是最新的

即使 obsidian-vault 落后几周，你在 workflow-console 目录里的工作始终是最新的：

```bash
cd projects/workflow-console
git log --oneline  # 你能看到所有commit
git status         # 显示你的最新状态
```

### ✅ GitHub 上 agentos-workflow-console 始终最新

你在 workflow-console 里的每个 `git push` 都会立即推送到：
https://github.com/muftd/agentos-workflow-console

### ⚠️ obsidian-vault 可能落后

obsidian-vault 中的 submodule 引用可能指向几个 commit 之前的版本，这是**正常的**。

如果有人 clone obsidian-vault 并想要最新的 workflow-console：

```bash
cd obsidian-vault
git submodule update --remote
```

## 快速参考

### 日常命令（在 workflow-console 目录）

```bash
# 查看当前状态
git status

# 查看变更
git diff

# 提交
git add .
git commit -m "你的提交信息"

# 推送
git push origin main

# 查看历史
git log --oneline
```

### 里程碑命令（在 obsidian-vault 目录）

```bash
# 更新submodule指针
git add projects/workflow-console

# 创建里程碑提交
git commit -m "Release: Workflow Console v0.X

详细描述..."

# 推送
git push origin main
```

## 风险管理

| 情形 | 是否有风险 | 说明 |
|------|-----------|------|
| 我在workflow-console里工作 | 🟢 无 | 本地始终最新，GitHub repo始终最新 |
| 别人clone agentos-workflow-console | 🟢 无 | 独立repo，可以直接访问最新代码 |
| 别人clone obsidian-vault | 🟡 轻微 | 会拿到submodule的旧版本，但可以手动更新 |
| obsidian-vault的commit历史 | 🟢 无 | 只在里程碑时刻记录，保持整洁 |

## 何时考虑更改策略

如果以下情况发生，考虑改用其他方案：

- ❌ 多人频繁协作，需要保持版本同步
- ❌ obsidian-vault 需要每日snapshot
- ❌ 需要自动化的submodule同步
- ❌ 发现频繁手工更新submodule很烦人

→ 则考虑**方案B**（定期同步）或**方案C**（自动化）

## 常见问题

**Q: 我需要每次commit都更新obsidian-vault吗？**
A: 不需要。方案A的设计就是避免这个繁琐。只在里程碑时刻更新。

**Q: 别人clone我的项目，会看不到最新代码吗？**
A: 如果clone的是 agentos-workflow-console，会看到最新的。如果clone的是 obsidian-vault，可能看到submodule的旧版本（但很容易更新）。

**Q: 如何检查obsidian-vault中的submodule指向的版本？**
A:
```bash
cd obsidian-vault
git ls-files --stage projects/workflow-console
# 输出的hash就是指向的commit
```

**Q: 如何快速更新到最新版本？**
A:
```bash
cd obsidian-vault
git submodule update --remote projects/workflow-console
git add projects/workflow-console
git commit -m "Update workflow-console submodule to latest"
git push origin main
```
