# GitHub Pages 上传包

本文件夹是可直接上传的纯静态 Coze Chat SDK 网页，无需 Node.js 或服务器。

## 上传和开启网页

1. 将本文件夹内的 `index.html`、`og.png` 和 `.nojekyll` 上传到 `CHOI-CODer/ai-for-elder` 仓库的 `main` 根目录。
2. 在 GitHub 仓库打开 **Settings → Pages**。
3. 在 **Build and deployment** 中选择 **Deploy from a branch**。
4. 选择 `main` 和 `/ (root)`，然后保存。
5. 等待 GitHub 显示部署完成，访问：

   `https://choi-coder.github.io/ai-for-elder/`

## Chat SDK 配置

- SDK：`chat-app-sdk/1.2.0-beta.19/libs/cn/index.js`
- Bot ID：`7606770413703593994`
- 认证：前端 token，支持 SDK 自带的文字、语音、图片等对话能力，具体能力取决于 Coze 智能体的已发布配置。

## 重要提示

这是按“纯静态、上传即用”要求制作的版本，因此 PAT 会包含在 `index.html` 中并对所有访客可见。令牌被撤销、过期或账户限额用尽后，需要更换 `index.html` 中的 token 才能继续使用。
