# LuLu Personal Brand Website

LuLu（魯魯）個人品牌官網，結合 MMT 天賦顧問、保險顧問與護理專業背景。  
部署於 GitHub Pages：[yishan168888.github.io](https://yishan168888.github.io)

## 技術棧

- **框架**：[Astro 5](https://astro.build) — 靜態站點生成
- **CSS 基底**：Bootstrap 5
- **動畫**：AOS（捲動進場）、CSS keyframes（魔法特效）
- **互動元件**：Swiper（輪播）、GLightbox（燈箱）、SweetAlert2（提示框）
- **字型**：Google Fonts（Roboto / Poppins / Raleway / Noto Sans TC）

## 本地開發

```bash
npm install
npm run dev      # http://localhost:4321
```

## 建置與部署

```bash
npm run build    # 輸出至 dist/
npm run preview  # 預覽靜態建置結果
```

靜態檔案直接推送至 `main` branch，GitHub Pages 自動部署。

## 目錄結構

```
src/
├── pages/
│   ├── index.astro          # 首頁
│   └── insurance.astro      # 富邦保險頁
├── components/
│   ├── Header.astro
│   ├── HeroSection.astro
│   ├── AboutMeSection.astro
│   ├── MMTSection.astro
│   ├── FeaturedProgramsSection.astro
│   └── Footer.astro
├── styles/                  # 見 CLAUDE.md
└── layouts/
    └── MainLayout.astro

public/
├── img/                     # 圖片資源
├── js/                      # main.js、cursor-trail.js
└── vendor/                  # Bootstrap、AOS、Swiper 等第三方庫
```
