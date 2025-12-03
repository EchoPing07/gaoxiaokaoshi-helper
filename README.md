# gaoxiaokaoshi-helper
# 高校考试网小助手

<div align="center">

![Version](https://img.shields.io/badge/版本-1.0-blue)
![License](https://img.shields.io/badge/许可证-MIT-green)
![Platform](https://img.shields.io/badge/平台-油猴脚本-orange)

基于 [Yiero](https://greasyfork.org/scripts/463301) 原版脚本重构的 UI 增强版

</div>

## ✨ 功能特性

- 🎨 全新现代化 UI 设计
- 📊 实时页码和课程进度显示
- 🔄 自动翻页功能
- ⚙️ 可控制的自动播放开关
- 📋 观看记录管理
- 🖱️ 面板可拖拽移动
- 🔔 操作状态 Toast 提示

## 📸 界面预览

> 面板支持最小化和拖拽

## 📦 安装方法

1. 首先安装浏览器油猴扩展：
   - [Tampermonkey (Chrome)](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Tampermonkey (Firefox)](https://addons.mozilla.org/firefox/addon/tampermonkey/)
   - [Tampermonkey (Edge)](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

2. 安装脚本：
   - [Greasy Fork 安装](https://greasyfork.org/) *(待发布)*
   - [ScriptCat 安装](https://scriptcat.org/zh-CN/script-show-page/4790)
   - 或直接复制 `script.user.js` 内容到油猴新建脚本中

## 🚀 使用说明

1. 登录高校考试网 (www.gaoxiaokaoshi.com)
2. 进入课程页面，脚本会自动运行
3. 右侧面板显示当前状态和进度
4. 可通过开关控制自动播放功能

## 🔧 功能说明

| 功能 | 说明 |
|------|------|
| 自动播放 | 自动查找并播放未完成的视频 |
| 自动翻页 | 当前页视频完成后自动跳转下一页 |
| 进度续播 | 自动跳转到上次观看位置 |
| 多窗口同步 | 支持同时打开多个页面观看 |
| 观看记录 | 记录当天观看状态，可手动清除 |

## 💡 注意事项

1. 不建议同时打开超过 5 个页面，网速不佳可能导致进度停止
2. 观看进度按实际时间计算，无法倍速
3. 观看记录每日自动清除

## 📜 致谢

- **原作者**: [Yiero](https://github.com/AliubYiero)
- **原项目**: [Greasy Fork #463301](https://greasyfork.org/scripts/463301)
- **原仓库**: https://github.com/AliubYiero/TemperScripts *(已失效)*

## 🤖 关于本项目

本脚本由 **AI (Claude)** 基于原版代码进行 UI 重构和功能优化。

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
   - 包括但不限于：账号封禁、学习记录异常、课程进度问题等
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

```text
MIT License

Copyright (c) 2023 Yiero (原作者)
Copyright (c) 2025 claude-opus-4-5-20251101 (修改者)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
