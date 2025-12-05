# 高校考试网小助手/gaoxiaokaoshi-helper


<div align="center">

![Version](https://img.shields.io/badge/版本-2.0-blue)
![License](https://img.shields.io/badge/许可证-MIT-green)
![Platform](https://img.shields.io/badge/平台-油猴脚本-orange)

基于 [Yiero](https://greasyfork.org/scripts/463301) 和 [Aisen](https://greasyfork.org/scripts/404599) 原版脚本重构的增强版

</div>

## ✨ 功能特性

### 🎬 自动刷课
- 自动查找未学习视频并播放
- 自动跳转到上次学习进度
- 自动翻页，全程无需手动操作
- 实时显示页码和课程进度

### 📝 自动答题
- **手动进入答题页面**（需要自己点击开始考试）
- 自动从本地题库查询答案
- 题库有答案则自动填写，没有则跳过
- 自动交卷
- 自动跳转查看答卷
- 自动收录正确答案到题库
- 自动关闭答题窗口

### 📚 题库管理
- 支持导入/导出题库（JSON 格式）
- 题库数据保存在本地，永久有效
- 多次答题自动积累题库

---

## 📦 安装方法

### 1. 安装浏览器扩展

首先安装油猴扩展（任选其一）：

| 浏览器 | 下载链接 |
|--------|----------|
| Chrome | [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) |
| Firefox | [Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/) |
| Edge | [Tampermonkey](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) |

### 2. 安装脚本

| 平台 | 链接 |
|------|------|
| **Greasy Fork** | [点击安装](https://greasyfork.org/) |
| **ScriptCat 脚本猫** | [点击安装](https://scriptcat.org/zh-CN/script-show-page/4790) |
| **GitHub 源码** | [下载安装](./script.user.js) |

---

## 🚀 使用说明

### 刷课流程

```
1. 登录高校考试网
2. 进入课程页面
3. 打开「自动刷课」开关
4. 脚本自动播放所有未完成视频 ✅
```

### 答题流程

```
1. 打开「自动答题」开关
2. 手动点击进入考试 👆
      ↓
3. 自动查询题库并填写答案
      ↓
4. 自动交卷
      ↓
5. 自动跳转查看答卷
      ↓
6. 自动收录正确答案到题库
      ↓
7. 自动关闭答题窗口 ✅
```

> 💡 **提示**：多做几次考试，题库会越来越全！

---

## ⚠️ 注意事项

| 项目 | 说明 |
|------|------|
| 多开限制 | 刷课不建议同时打开超过 5 个页面 |
| 倍速播放 | 观看进度按实际时间计算，无法倍速 |
| 题库存储 | 保存在浏览器本地，清除数据会丢失 |
| 题库备份 | 建议定期导出题库备份 |

---

## 📜 致谢

本项目基于以下原版脚本重构：

| 原作者 | 功能 | 原项目链接 |
|--------|------|------------|
| Yiero | 自动刷课 | [Greasy Fork #463301](https://greasyfork.org/scripts/463301) |
| Aisen | 自动答题、题库 | [Greasy Fork #404599](https://greasyfork.org/scripts/404599) |

---

## 🤖 关于本项目

本脚本由 **AI (Claude)** 基于原版代码进行 UI 重构和功能整合。

发布者仅负责代码托管和发布，不参与代码编写。

---

## ⚠️ 免责声明

**请仔细阅读以下声明：**

1. **仅供学习交流**
   - 本脚本仅供学习和研究使用
   - 请勿用于任何商业用途
   - 使用者应在学习研究后 24 小时内删除

2. **使用风险自担**
   - 使用本脚本产生的一切后果由使用者自行承担
   - 包括但不限于：账号封禁、学习记录异常、考试成绩问题等
   - 发布者和 AI 不对任何直接或间接损失负责

3. **合规使用**
   - 请遵守高校考试网的用户协议和相关规定
   - 请遵守所在地区的法律法规
   - 如有侵权请联系删除

4. **无任何保证**
   - 本脚本按"原样"提供，不提供任何明示或暗示的保证
   - 不保证脚本的可用性、准确性、可靠性
   - 网站更新可能导致脚本失效

5. **AI 生成代码声明**
   - 本脚本由 AI (Claude) 生成/修改
   - 发布者仅进行托管和发布工作
   - 代码问题与发布者无关

**继续使用本脚本即表示您已阅读并同意以上所有条款。**

---

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源，继承原项目许可证。

```
MIT License

Copyright (c) 2023 Yiero (原作者)
Copyright (c) 2020 Aisen (原作者)
Copyright (c) 2025 claude-opus-4-5-20251101 (修改者)
```
