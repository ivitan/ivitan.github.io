---
wiki: Shell
title: Shell
---
<p align="center" class="has-mb-6">
<img class="not-gallery-item" height="48" src="https://cdn.jsdelivr.net/gh/ivitan/Picture@master/imageslogo.svg">
<br>
<h2 align="center">Vitan's Shell Scripts</h2>
<p align="center">🐚 一个实用的 Shell 脚本集合</p>
</p>

## 📋 项目介绍

这是一个包含多个实用 Shell 脚本和自动化工具的集合，旨在提高开发效率和系统管理体验。项目主要用于 Termux 环境的配置和管理，同时也包含其他有用的命令行工具。

## ✨ 主要特性

- 🚀 **快速配置**: 一键配置 Termux 环境
- 🛠️ **实用工具**: 包含多个实用脚本
- 📱 **移动优化**: 专门针对 Termux 优化
- 🔧 **易于安装**: 支持 curl 和 wget 两种安装方式

## 🚀 快速开始

### Termux 一键配置

#### 方式一：使用 curl
```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/ivitan/Shell/master/Termux/Termux.sh)"
```

#### 方式二：使用 wget
```bash
bash -c "$(wget -O- https://raw.githubusercontent.com/ivitan/Shell/master/Termux/Termux.sh)"
```

## 📁 项目结构

```
Shell/
├── Termux/                 # Termux 相关脚本
│   └── Termux.sh          # Termux 一键配置脚本
├── README.md              # 项目说明
└── ...                    # 其他脚本
```

## 📦 包含的内容

- **Termux 配置脚本**: 自动配置 Termux 环境，包括软件包管理、终端优化等

## 💻 系统要求

- **操作系统**: Linux / Termux / macOS
- **Shell**: Bash 4.0 及以上
- **必要工具**: curl 或 wget（用于安装）

## 🤝 如何使用

1. **手动安装**: 克隆项目并执行相应的脚本
   ```bash
   git clone https://github.com/ivitan/Shell.git
   cd Shell
   bash Termux/Termux.sh
   ```

2. **远程安装**: 使用上述快速开始中的一键命令

## 📝 常见问题

**Q: 脚本在哪些环境下测试过？**
A: 主要在 Termux 和 Linux 环境下测试，也支持 macOS。

**Q: 如何修改脚本以适应我的需求？**
A: 您可以 fork 本项目并修改相应的脚本文件。

**Q: 遇到问题怎么办？**
A: 请提交 Issue 或联系项目维护者。

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 👤 作者

- **Vitan** - 项目创建者

## 🔗 相关链接

- [GitHub 仓库](https://github.com/ivitan/Shell)

## 🙌 贡献

欢迎提交 Issue 和 Pull Request，如果您有任何建议或改进意见，请随时提出！

---

<p align="center">
Made with ❤️ by Vitan
</p>
