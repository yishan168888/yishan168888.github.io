/**
 * Cloudflare Worker — Sveltia / Decap CMS 的 GitHub OAuth 門鎖
 *
 * 作用：讓部署在 GitHub Pages（純靜態）的後台 /admin/ 能用 GitHub 帳號登入。
 *       GitHub Pages 不能跑後端，所以這段交握跑在 Cloudflare（免費額度）。
 *
 * 需設定的環境變數（Cloudflare → Worker → Settings → Variables，建議用 Secret）：
 *   GITHUB_CLIENT_ID      GitHub OAuth App 的 Client ID
 *   GITHUB_CLIENT_SECRET  GitHub OAuth App 的 Client Secret
 *
 * 端點：
 *   GET /auth      → 導向 GitHub 授權
 *   GET /callback  → 換 token，postMessage 回後台視窗
 */

const GITHUB_AUTHORIZE = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN = 'https://github.com/login/oauth/access_token';

function randomState() {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return [...arr].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function htmlResponse(html, extraHeaders = {}) {
  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', ...extraHeaders },
  });
}

// 回傳一段 HTML，透過 postMessage 把結果送回開啟它的後台視窗
function renderResult(status, content) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  return `<!doctype html><html lang="zh-TW"><head><meta charset="utf-8"></head><body>
<script>
(function () {
  var message = ${JSON.stringify(message)};
  function receive(e) {
    window.opener && window.opener.postMessage(message, e.origin);
    window.removeEventListener('message', receive, false);
  }
  window.addEventListener('message', receive, false);
  if (window.opener) {
    window.opener.postMessage('authorizing:github', '*');
  } else {
    document.body.textContent = '請從 CMS 後台開啟此登入流程。';
  }
})();
</script>
</body></html>`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname, searchParams } = url;

    // 1) 發起授權
    if (pathname === '/' || pathname === '/auth') {
      if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
        return htmlResponse(renderResult('error', { error: '未設定 GITHUB_CLIENT_ID / SECRET' }));
      }
      const state = randomState();
      const authUrl = new URL(GITHUB_AUTHORIZE);
      authUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      authUrl.searchParams.set('redirect_uri', `${url.origin}/callback`);
      authUrl.searchParams.set('scope', searchParams.get('scope') || 'repo,user');
      authUrl.searchParams.set('state', state);
      return new Response(null, {
        status: 302,
        headers: {
          Location: authUrl.toString(),
          'Set-Cookie': `csrf=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`,
        },
      });
    }

    // 2) 回呼：換 token
    if (pathname === '/callback') {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const cookie = request.headers.get('Cookie') || '';
      const saved = (cookie.match(/csrf=([^;]+)/) || [])[1];

      if (!code || !state || state !== saved) {
        return htmlResponse(renderResult('error', { error: 'CSRF 或參數驗證失敗' }));
      }

      const res = await fetch(GITHUB_TOKEN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'User-Agent': 'lulu-cms-auth',
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });
      const data = await res.json();

      if (data.error || !data.access_token) {
        return htmlResponse(renderResult('error', { error: data.error || '取得 token 失敗' }));
      }
      return htmlResponse(renderResult('success', { token: data.access_token, provider: 'github' }));
    }

    return new Response('Not found', { status: 404 });
  },
};
