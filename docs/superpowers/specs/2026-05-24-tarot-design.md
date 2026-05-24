# 塔羅師專業頁面設計 Spec

**日期**：2026-05-24  
**作者**：LuLu × Claude Code  
**狀態**：待實作

---

## 目標

將「塔羅師」從靈性療癒 tile 的一筆帶過，提升為獨立且完整的專業呈現：
- 首頁新增 TarotSection（獨立 section，類似 MMT）
- 新增 `/tarot` 獨立頁面（類似 `/insurance`）
- 整合電氣卡片動效（Animated Electric Card）
- 所有塔羅相關樣式集中於 `tarot-electric.css`

---

## 關鍵資訊

| 項目 | 內容 |
|------|------|
| 塔羅牌系統 | 偉特塔羅（Rider-Waite Tarot） |
| 執業年資 | 約 1 年 |
| 諮詢主題 | 感情、事業、靈性成長（不設限） |
| LINE 預約 | `https://line.me/ti/p/w7U_i0Dc0k` |
| IG | `https://www.instagram.com/yishan168/` |

---

## 新增檔案

### 1. `src/styles/tarot-electric.css`

職責：所有塔羅相關視覺，不影響現有 CSS。

**SVG filter**（全站共用，注入 `<body>` 頂端）：
- `id="tarot-turbulent-displace"`：feTurbulence + feDisplacementMap，製造電流波動邊框

**電氣卡片 `.tarot-electric-card`**：
- 結構沿用 Animated-Electric-Card 素材的 `.card-container` → `.inner-container` → `.border-outer` → `.main-card` 層級
- 顏色覆蓋：`--electric-border-color: #c9a227`（暖金色，配合網站 `#deb887` 系列）
- 尺寸彈性化（不固定 350×500，改用 `width: 100%; aspect-ratio: 7/10`）

**塔羅裝飾粒子 `.tarot-mp`**：
- 繼承現有 `.mp` 動畫 keyframe
- 符號改為 `☽ ☽ ★ ✦ ☆`（月相 + 星）

**塔羅主題卡片 `.tarot-theme-card`**：
- 用於「感情 / 事業 / 靈性成長」三張小卡
- 暗底 + 金邊 + 微弱 glow，與 `.value-cyber-card` 同結構但塔羅配色

**預約按鈕 `.btn-tarot-line` / `.btn-tarot-ig`**：
- LINE：綠色 `#00B900` → hover 加亮
- IG：漸層 `#833AB4 → #C13584 → #E1306C`

---

### 2. `src/components/TarotSection.astro`

首頁獨立 section，id 為 `tarot`。

**結構**：
```
<section id="tarot" class="tarot-cyber section">
  [corner-ornament × 2]
  [magic-particles（☽ ★ 月相符號）]
  [container]
    [cyber-section-header]  ← TAROT / 塔羅 · 偉特解讀
    [row: 左文 + 右電氣卡片]
    [row: 三張主題小卡]
```

**左欄文字（擬稿）**：
> 「學習偉特塔羅以來，我深刻感受到每一張牌背後的生命智慧。我以直覺與象徵語言為媒介，陪你穿越迷霧、看見自己真正渴望的方向。感情、事業、靈性探索——你的每一個問題，都值得被好好看見。」

CTA 按鈕並排：
- 【LINE 預約諮詢】（`.btn-tarot-line`）
- 【IG 追蹤洽詢】（`.btn-tarot-ig`）

**右欄電氣卡片**（`.tarot-electric-card`）：
- 標籤：`Rider-Waite Tarot`
- 標題：偉特塔羅
- 內文：「偉特塔羅由 78 張牌組成——22 張大阿爾克那（Major Arcana）掌管人生重大課題；56 張小阿爾克那（Minor Arcana）細緻描繪日常情境。每一張牌皆有其象徵語言，引導你看見當下能量與潛在方向。」

**三張主題卡片**（`.tarot-theme-card`）：
| 主題 | 圖示 | 說明 |
|------|------|------|
| 感情解讀 | ♥ | 釐清感情現況、關係動態與內心渴望 |
| 事業方向 | ★ | 看見職涯轉折的能量訊息與最佳時機 |
| 靈性成長 | ☽ | 探索內在聲音，回到自己的生命節奏 |

---

### 3. `src/pages/tarot.astro`

獨立頁面 `/tarot`，使用 `MainLayout`。

**區塊**：

1. **Hero 區**：`<section id="tarot-hero">`
   - 背景：aurora + 魔法粒子（月相）
   - 中央：塔羅師稱謂 + 名字 + 偉特塔羅 badge
   - 副標：「一年 · 偉特塔羅 · 各主題皆可」
   - CTA：LINE 預約 + IG 按鈕

2. **關於塔羅師**：`<section id="tarot-about">`
   - 左：照片（沿用 `/img/lulu/lu02.png`）
   - 右：完整自我介紹（含護理背景帶來的洞察力、MMT 天賦加持、靈性療癒整合）

3. **偉特塔羅介紹**：`<section id="tarot-intro">`
   - 大阿爾克那卡片：介紹愚者、女祭司、星星等代表牌（各一小卡，電氣邊框效果）
   - 小阿爾克那：四元素（聖杯 / 星幣 / 寶劍 / 權杖）一覽

4. **預約區**：`<section id="tarot-booking">`
   - 大標：「準備好與牌對話了嗎？」
   - LINE 預約 + IG 並排大按鈕
   - 注意事項（選填，可之後補充）

---

## 修改現有檔案

### `src/pages/index.astro`

在 FeaturedProgramsSection 之後插入：
```astro
<div class="magic-divider" aria-hidden="true">
  <div class="magic-divider-line"></div>
  <div class="magic-divider-symbols">
    <span>☽</span><span>✦</span><span>★</span><span>✦</span><span>☽</span>
  </div>
</div>
<TarotSection />
```

### `src/components/Header.astro`

「我的專業」dropdown 新增：
```html
<li><a href="/tarot">塔羅解讀</a></li>
```
行動版 navmenu 同步新增。

### `src/components/HeroSection.astro`

系統標籤改為：
```
SOUL ADVISOR · MMT · 塔羅師 · 保險顧問
```

### `src/components/AboutMeSection.astro`

靈性療癒 tile 更新：
- 說明文加入「偉特塔羅解讀」明確標示
- 新增兩個小連結：`LINE 預約 →` 與 `IG 洽詢 →`

### `src/layouts/MainLayout.astro`

在現有 CSS import 最後新增一行：
```js
import '../styles/tarot-electric.css';
```

---

## 技術備注

- SVG `#tarot-turbulent-displace` filter 需注入一次即可，建議放在 `TarotSection.astro` 頂端，`tarot.astro` 各自重複（不共用，避免 id 衝突於 SSG）
- 電氣效果使用 `oklch()` 色彩函數，需確認目標瀏覽器支援（現代瀏覽器皆支援）
- `filter: url(#tarot-turbulent-displace)` 套用於卡片邊框 div，不影響內容可讀性
- 所有新 section 沿用 AOS fade-up 動畫，與現有 section 保持一致體驗

---

## 不在本次範圍

- 真實塔羅牌圖片（需版權確認，佔位用文字或抽象幾何圖示代替）
- 線上預約系統 / 表單後端
- 部落格 / 牌義資料庫
