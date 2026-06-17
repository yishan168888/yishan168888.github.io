# CLAUDE.md — 專案快速定位

LuLu 個人品牌網站，Astro 5 靜態生成，MUJI 自然風 + 科幻魔法視覺主題。

## 框架

Astro 5（`output: 'static'`）。**所有指令一律在 `Client/` 目錄內執行**：
`cd Client` 後 `npm run dev`（開發）、`npm run build`（建置）。

## 目錄

頂層採前後端分離（monorepo）：

| 路徑 | 內容 |
|------|------|
| `Client/` | 前端網站本體（Astro 專案，整站都在這），build 後部署上線 |
| `Server/Admin/` | 後端：Sveltia CMS 的 OAuth 門鎖原始碼，部署到 Cloudflare（**不經 GitHub Pages**） |
| `.github/workflows/deploy.yml` | GitHub Actions：在 `Client/` build 並發布 `Client/dist`（**必須留在根目錄**） |

`Client/` 內部：

| 路徑 | 內容 |
|------|------|
| `Client/src/pages/` | 頁面（index.astro 首頁、tarot.astro 塔羅頁、insurance.astro 保險頁） |
| `Client/src/components/` | Header、HeroSection、HexagramSVG、AboutMeSection、MMTSection、FeaturedProgramsSection、TarotSection、Footer |
| `Client/src/layouts/MainLayout.astro` | 共用 HTML 骨架（含 `<head>`、loader、**Header + `<main>` + Footer**），匯入所有 CSS 和 vendor JS。頁面只需 `<MainLayout>內容</MainLayout>`，header/footer 自動包；`<slot name="head">` 可插入頁面專屬 `<head>` 內容 |
| `Client/src/styles/` | 見下方 CSS 說明 |
| `Client/public/img/` | 圖片（lulu/、mmt/、person/ 等子目錄） |
| `Client/public/js/` | main.js（Bootstrap 初始化）、cursor-trail.js（滑鼠粒子） |
| `Client/public/admin/` | （規劃中）Sveltia CMS 後台網頁，上線後於 `/admin/` 開啟 |
| `Client/public/vendor/` | 第三方庫（Bootstrap、AOS、Swiper、GLightbox 等），不要修改 |

## CSS 檔案

| 檔案 | 職責 |
|------|------|
| `main.css` | 基底排版與元件樣式（NiceSchool 範本，輕易不要動） |
| `theme-magic.css` | 整站主題覆蓋：MUJI 配色（#ede4d5 背景）、Header、Nav、Hero、各 Section |
| `magic-effects.css` | 魔法陣環（.mc-ring）、六芒星（.mc-hexagram）、流星（.shooting-star） |
| `pixel-wizard.css` | CSS box-shadow 像素巫師動畫 |
| `rune-ring.css` | SVG textPath 符文環（外圈古北歐、內圈英文咒語） |
| `particles.css` | 浮動魔法粒子（.mp） |
| `section-divider.css` | 區段間分隔線 + 符號 |
| `corner-ornament.css` | 區段四角小魔法陣裝飾 |
| `card-hover-magic.css` | 卡片懸停光暈 + 閃光 |
| `cursor-trail.css` | 滑鼠軌跡粒子樣式 |
| `card.css` | 表單 / 登入卡片 |

## 顏色系統

```
Base:   #ede4d5   背景（暖米）
Cream:  #f7f2ea   淺米白（比 Base 更亮，用於卡片高光、懸浮層）
Stone:  #8a6e56   中性棕（強調、線條）
Ink:    #3e2d1c   深褐（主文字、深色元素）
Amber:  #a05c14   深橘棕（行動按鈕、高對比強調、塔羅主題色）
Deep:   #1a1008   近黑（深色背景層、夜色元素、文字最深層）
```

## 部署

GitHub Pages，repository：`yishan168888/yishan168888.github.io`。
推 `main` 觸發 GitHub Actions：在 `Client/` 跑 `npm ci && npm run build`，
發布 `Client/dist` → 自動上線。資料夾結構可自由調整，因為是 Actions build，
不是「直接供應某資料夾」。

## 網頁排版四大黃金原則（所有 UI 修改必須遵守）

1. **留白（White Space）**：區塊之間保留足夠間距，section padding 至少 80px 上下，卡片內部 padding 至少 24px，呼吸感是高級感的來源。
2. **視覺層級（Hierarchy）**：H1/H2 大且粗引導第一眼，內文小且輕，標籤（tag/eyebrow）用小字加字距，不同層級字體大小要有明顯落差（至少 1.4× 以上）。
3. **響應式設計（RWD）**：電腦多欄 → 平板縮減 → 手機單欄垂直排列，所有 grid/flex 布局都要寫 breakpoint，按鈕和可點擊區域手機上至少 44px 高。
4. **CTA 定位**：主要行動按鈕放在內容自然結尾、視線落點處，不要埋在頁面深處，手機上要能隨手點到（避免貼邊太近）。
