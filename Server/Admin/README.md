# Server / Admin — Sveltia CMS 的 GitHub 登入門鎖

讓 GitHub Pages 上的後台 `/admin/` 能用 GitHub 帳號登入。
GitHub Pages 是純靜態、不能跑後端，所以這段 OAuth 交握部署到 **Cloudflare Workers（免費額度）**。

- `worker.js` — OAuth 門鎖程式（GitHub 授權 → 換 token → 回傳後台）
- `wrangler.toml` — Cloudflare 部署設定

後台「編輯介面」本身是靜態網頁，在 `../Client/public/admin/`，上線後於
`https://yishan168888.github.io/admin/` 開啟。

---

## 部署步驟（一次性，約 10 分鐘）

> 先決條件：已安裝 Node.js；有 Cloudflare 帳號、GitHub 帳號（對 repo 有 write 權限）。

### 1. 部署 Worker 拿到網址

在本資料夾（`Server/Admin/`）執行：

```bash
npx wrangler login        # 第一次會開瀏覽器登入 Cloudflare
npx wrangler deploy
```

部署成功會印出網址，例如：
`https://lulu-cms-auth.<你的子網域>.workers.dev` —— **記下這個網址**。

### 2. 建立 GitHub OAuth App

到 GitHub（用 `yishan168888` 帳號）：
**Settings → Developer settings → OAuth Apps → New OAuth App**

| 欄位 | 填入 |
|------|------|
| Application name | LuLu 網站後台 |
| Homepage URL | `https://yishan168888.github.io` |
| Authorization callback URL | `https://lulu-cms-auth.<你的子網域>.workers.dev/callback` |

建立後取得 **Client ID**，再按 **Generate a new client secret** 取得 **Client Secret**。

### 3. 把金鑰設給 Worker

在本資料夾執行（會提示貼上值）：

```bash
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

### 4. 把 Worker 網址填進後台設定

編輯 `../Client/public/admin/config.yml`，把 `base_url` 改成你的 Worker 網址：

```yaml
backend:
  name: github
  repo: yishan168888/yishan168888.github.io
  branch: main
  base_url: https://lulu-cms-auth.<你的子網域>.workers.dev
```

commit + push 後，到 `https://yishan168888.github.io/admin/` 用 GitHub 登入即可。

### 5.（選用）讓魯魯用她自己的帳號

請 repo 擁有者到 **repo → Settings → Collaborators** 把魯魯的 GitHub 帳號加入、給 **Write** 權限。她就能用自己的帳號登入後台。
