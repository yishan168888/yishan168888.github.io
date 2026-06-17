# Server / Admin — 後台伺服器端

這個資料夾放「真正會執行的後端程式」，目前規劃放 **Sveltia CMS 的 OAuth 門鎖**
（GitHub 登入用的授權代理）。

## 重要觀念

- GitHub Pages **只供應靜態檔、不會執行任何後端程式**，所以這裡的東西**不是**由
  GitHub Pages 跑的。
- OAuth 門鎖會部署到 **Cloudflare Workers（免費額度）**，與網站本體（`../Client`）
  分開部署。
- 後台「編輯介面」本身是靜態網頁，放在 `../Client/public/admin/`，會隨網站一起
  build、上線後可於 `https://yishan168888.github.io/admin/` 開啟。

## 待辦（後續階段）

- [ ] 建立 GitHub OAuth App，取得 Client ID / Secret
- [ ] 放入 Cloudflare Worker（sveltia-cms-auth）原始碼與 `wrangler.toml`
- [ ] 部署到 Cloudflare，取得授權網域，填入 `../Client/public/admin/config.yml`
