# LuLu Personal Brand Website

LuLu（魯魯）個人品牌官網，結合 MMT 天賦顧問、塔羅師與保險顧問專業。  
部署於 GitHub Pages：[yishan168888.github.io](https://yishan168888.github.io)

## 技術棧

- **框架**：[Astro 5](https://astro.build) — 靜態站點生成（`output: 'static'`）
- **CSS 基底**：Bootstrap 5
- **動畫**：AOS（捲動進場）、CSS keyframes（魔法陣旋轉、Aurora 光暈）
- **互動元件**：Swiper（輪播）、GLightbox（燈箱）、SweetAlert2（提示框）
- **字型**：Google Fonts（Roboto / Poppins / Raleway / Noto Sans TC）

## 視覺主題

MUJI 自然暖色（米棕 `#ede4d5`）+ 魔法科幻疊層：

- **Hero**：六芒星魔法陣 + 魯恩符文環旋轉 + 手電筒滑鼠光暈
- **分隔線**：底片膠捲齒孔風格（`repeating-linear-gradient`）
- **流星**：comet 形狀射線（`clip-path: polygon`）
- **手機優化**：`@media (pointer: coarse)` 關閉 Aurora blur、粒子、背景動畫，保留 GPU composited 旋轉

## 本地開發

```bash
cd Client
npm install
npm run dev      # http://localhost:4321
```

## 建置與部署

```bash
cd Client
npm run build    # 輸出至 Client/dist/
npm run preview  # 預覽靜態建置結果
```

推送至 `main` branch → GitHub Actions 在 `Client/` build，發布 `Client/dist`，
GitHub Pages 自動部署。

## 目錄結構

```
Client/                              # 前端網站（Astro 專案，build 後部署上線）
├── src/
│   ├── pages/
│   │   ├── index.astro              # 首頁
│   │   ├── tarot.astro              # 塔羅師頁
│   │   └── insurance.astro          # 富邦保險頁
│   ├── components/
│   │   ├── Header.astro             # 頂部 + 跑馬燈
│   │   ├── HeroSection.astro        # 魔法陣 Hero
│   │   ├── HexagramSVG.astro        # 共用六芒星 SVG
│   │   ├── AboutMeSection.astro
│   │   ├── MMTSection.astro         # MMT 天賦系統介紹
│   │   ├── FeaturedProgramsSection.astro
│   │   ├── TarotSection.astro
│   │   └── Footer.astro
│   ├── styles/
│   │   ├── theme-magic.css          # 主題覆寫、RWD、手機效能
│   │   ├── magic-effects.css        # 魔法陣環、流星
│   │   ├── rune-ring.css            # SVG 符文環
│   │   ├── particles.css            # 浮動魔法粒子
│   │   ├── section-divider.css      # 底片膠捲分隔線
│   │   ├── tarot-electric.css       # 塔羅區卡片樣式
│   │   ├── pixel-wizard.css         # CSS box-shadow 像素巫師
│   │   ├── cursor-trail.css         # 手電筒滑鼠光暈
│   │   └── corner-ornament.css      # 四角裝飾
│   └── layouts/
│       └── MainLayout.astro
└── public/
    ├── admin/                       # （規劃中）Sveltia CMS 後台，上線後於 /admin/
    ├── img/                         # 圖片（lulu/、mmt/、person/ 等）
    ├── js/
    │   ├── main.js                  # Bootstrap 初始化
    │   └── cursor-trail.js          # 手電筒光暈 JS
    └── vendor/                      # Bootstrap、AOS、Swiper 等（勿修改）

Server/
└── Admin/                           # Sveltia OAuth 門鎖（部署到 Cloudflare，不經 GitHub Pages）

.github/workflows/deploy.yml         # 在 Client/ build、發布 Client/dist（必須留根目錄）
```

## 顏色系統

| 名稱 | 值 | 用途 |
|------|-----|------|
| Base | `#ede4d5` | 頁面背景（暖米） |
| Cream | `#f7f2ea` | 卡片高光 |
| Stone | `#8a6e56` | 線條、強調 |
| Ink | `#3e2d1c` | 主文字 |
| Amber | `#a05c14` | CTA 按鈕、主強調色 |
| Deep | `#1a1008` | 深色背景層 |
