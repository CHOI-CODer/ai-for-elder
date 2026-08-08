# AI 健康助手网页

这是一个可独立打开、也可作为微信小程序 `web-view` 页面的 Coze Chat SDK 容器。

## 本地使用

运行时向服务器提供 `COZE_ACCESS_TOKEN`，然后打开显示的本地地址。令牌仅保留在当次运行环境，不会写入 HTML 或 `config.js`。

## 网站部署

1. 将此目录的静态文件部署到 HTTPS 网站。
2. 在同一域名实现 `GET /api/coze/token`，返回 `{ "token": "短期 OAuth token" }`。
3. 在该接口中加入用户校验、频率限制和 `Cache-Control: no-store`。
4. 如用于微信小程序，将 HTTPS 域名加入小程序业务域名，再把页面地址填入根目录 `app.js` 的 `globalData.chatWebUrl`。

## 安全提示

- 不要把 PAT 直接写入 HTML、`config.js`、小程序代码或公开仓库。
- PAT 适合本地调试，公网部署应改用限权、短期、可刷新的 OAuth token。
- 如 PAT 曾在聊天、截图或共享文件中出现，请在正式上线前撤销并更换。
