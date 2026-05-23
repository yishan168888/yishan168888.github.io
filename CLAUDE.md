# CLAUDE.md — 專案快速定位

LuLu 個人品牌網站，Astro 5 靜態生成，MUJI 自然風 + 科幻魔法視覺主題。

## 框架

Astro 5（`output: 'static'`）。開發：`npm run dev`，建置：`npm run build`。

## 目錄

| 路徑 | 內容 |
|------|------|
| `src/pages/` | 頁面（index.astro 首頁、insurance.astro 保險頁） |
| `src/components/` | Header、HeroSection、AboutMeSection、MMTSection、FeaturedProgramsSection、Footer |
| `src/layouts/MainLayout.astro` | 共用 HTML 骨架，匯入所有 CSS 和 vendor JS |
| `src/styles/` | 見下方 CSS 說明 |
| `public/img/` | 圖片（lulu/、mmt/、person/ 等子目錄） |
| `public/js/` | main.js（Bootstrap 初始化）、cursor-trail.js（滑鼠粒子） |
| `public/vendor/` | 第三方庫（Bootstrap、AOS、Swiper、GLightbox 等），不要修改 |

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
Base:   #ede4d5   背景
Stone:  #8a6e56   強調
Ink:    #3e2d1c   文字 / 深色元素
```

## 部署

GitHub Pages，repository：`yishan168888/yishan168888.github.io`，推 `main` 自動上線。
