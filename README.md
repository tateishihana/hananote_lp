# Hananote LP

Hananoteのサービス紹介ランディングページです。

## ファイル構成

```
Hananote_LP/
├── index.html   メインHTML（全セクション）
├── style.css    スタイルシート
├── script.js    FAQ アコーディオン・スクロールアニメーション
├── assets/      画像素材置き場（ダミーのSVGを配置済み）
└── README.md    このファイル
```

## 公開方法

### 方法① Netlify Drop（最速・無料）
1. https://app.netlify.com/drop を開く
2. `Hananote_LP` フォルダごとドラッグ＆ドロップ
3. 公開URLが発行されます

更新するときも、同じページに再度ドラッグ＆ドロップするだけです。

### 方法② GitHub Pages
1. GitHub にリポジトリを作成
2. `Hananote_LP` 内のファイルをすべてアップロード
3. Settings → Pages → Branch: main / root で公開

### 方法③ レンタルサーバー
FTPで `Hananote_LP` 内のファイルをすべてアップロードしてください。

---

## 編集方法

### 文言を変更したい
`index.html` を開いて該当箇所を直接編集してください。
セクションごとにコメント（`<!-- SECTION名 -->`）で区切っています。

### 色を変更したい
`style.css` の冒頭 `:root { }` ブロック内の CSS 変数を変更してください。

```css
:root {
  --color-base: #F7F2E9;   /* 背景（生成り） */
  --color-main: #14243F;   /* メインカラー（紺） */
  --color-accent: #E04A3F; /* アクセントカラー（朱赤） */
  --color-gold: #E5A83C;   /* ゴールド（数字・バッジ） */
  --color-sub: #EFE6D6;    /* サブカラー */
  --color-text: #1B2432;   /* テキスト */
}
```

### CTAのリンク先を変更したい
現在はGoogleフォームに設定済みです（ヘッダー・ファーストビュー・中間CTA・最終CTAの4箇所）。
変更する場合は `index.html` 内の `docs.google.com/forms/...` を新しいURLに置換してください。

### 料金を変更したい
`index.html` の `<!-- PRICING -->` セクション内を編集してください。

### 画像を差し替えたい
`assets/` にダミー画像（SVG）が入っています。本番画像に差し替えるときは、
画像ファイルを `assets/` に入れたうえで、`index.html` の該当する `<img src="assets/○○.svg">` の
ファイル名を差し替えてください。

| ファイル | 使用箇所 | 推奨サイズ |
| --- | --- | --- |
| assets/hero.svg | ファーストビュー | 800 × 600px |
| assets/about.svg | Hananoteとは | 600 × 600px |
| assets/case01〜03.svg | サポート事例 | 640 × 360px |
| assets/profile.svg | プロフィール（今後追加予定・未使用） | 600 × 600px |

OGP画像は `assets/ogp.png`（推奨サイズ：1200×630px）を配置してください。

---

## 動作環境

静的HTML/CSS/JSのみで構成されています。
サーバー不要でローカルでも確認できます。
ブラウザで `index.html` をダブルクリックして開くか、Live Server等をお使いください。
