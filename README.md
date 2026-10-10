# remonkosyou.2re.fun

「えっちゃんのレモン胡椒」の紹介ページ・レシピページ。
Next.js（App Router）で構築し、Docker コンテナとして本番サーバー上で稼働しています。
ページの文章は `/admin` の管理画面からパスワードでログインして編集できます。

## 構成

```
remonkosyou/
├─ app/
│  ├─ layout.js       ルートレイアウト（<title> などのメタデータ、フォント設定）
│  ├─ page.js          トップページ本体（content/ の内容を描画）
│  ├─ recipe/page.js   レシピページ本体
│  ├─ admin/           管理画面（ログイン・内容編集フォーム、/admin, /admin/login）
│  ├─ globals.css      ページ全体のスタイル
│  └─ icon.svg         ファビコン（レモン絵文字、App Router の規約で自動配信）
├─ lib/
│  ├─ content.js       コンテンツ（JSON）の読み書き
│  └─ auth.js          管理画面のパスワード認証・セッションCookie
├─ content/
│  └─ default-content.json  初回起動時に使われる初期コンテンツ
├─ public/
│  └─ images/          ブランド写真・商品写真・レシピ写真
├─ Dockerfile          本番用マルチステージビルド（standalone 出力）
├─ docker-compose.yml  本番コンテナの起動定義
└─ next.config.js      output: "standalone" を設定
```

## ローカル開発

```bash
npm install
npm run dev
```

`http://localhost:3000` で確認できます。

## 本番ビルド

```bash
npm run build
npm start
```

## デプロイ

本番サーバー（ConoHa VPS）では、このリポジトリを直接 `docker compose` でコンテナ化して動かしています。

```bash
docker compose up -d --build
```

- コンテナ名: `remonkosyou-frontend`
- 公開ポート: `127.0.0.1:3003 -> 3000`（ホストのローカルにのみ公開）
- `next.config.js` の `output: "standalone"` により、`node_modules` を含まない最小構成の実行イメージを作れます（`.next/standalone` を使用）。

外部からのアクセスは、同じサーバー上で動く共有の [caddy](https://github.com/fukudajitaku1-hub/caddy) リポジトリの Caddy が HTTPS 終端・リバースプロキシを行い、`remonkosyou.2re.fun` 宛のリクエストを `localhost:3003` に振り分けています（`caddy` リポジトリの `Caddyfile` 参照）。

設定変更後にコンテナを作り直した場合は、Caddy 側の bind mount がファイルの inode を参照しているため、`Caddyfile` を書き換えただけでは反映されないことがあります。その場合は `caddy` リポジトリ側で `docker compose restart caddy`（または `up -d`）を実行してください。

## 管理画面（コンテンツ編集）

トップページとレシピページの文章（紹介文・商品情報・取り扱い店舗・イベント情報・レシピ本文）は、`/admin` の管理画面から編集できます。

- ログイン: `https://remonkosyou.2re.fun/admin/login` にパスワードでログイン（パスワードは `.env` の `ADMIN_PASSWORD`）
- `/admin` は未ログインだと自動的に `/admin/login` にリダイレクトされます
- `/admin` から保存すると、即座に公開ページへ反映されます（再ビルド不要）
- `robots.txt` で `/admin` 以下はクロール禁止にしています

### 必要な環境変数

`docker-compose.yml` は同じディレクトリの `.env`（Git管理外）から以下を読み込みます。

```
ADMIN_PASSWORD=管理画面のログインパスワード
ADMIN_SESSION_SECRET=セッションCookie署名用のランダムな文字列（32byte程度推奨）
```

`.env` がないと `docker compose up` 時にコンテナがこれらの値なしで起動してしまうため、必ず作成してください。

### コンテンツの保存先

編集した内容は `content.json` としてコンテナ内 `/app/data` に保存されます。このディレクトリは `docker-compose.yml` で名前付きボリューム `content_data` にマウントしているため、`docker compose up -d --build` でイメージを作り直しても編集内容は消えません（ボリューム自体を削除した場合は、次回アクセス時に `content/default-content.json` の内容で自動的に再作成されます）。

## 以前の構成からの変更点

元々は素の `index.html` を Caddy の `file_server` で直接配信していましたが、Next.js に書き換えて Docker コンテナとして稼働する構成に移行し、レシピページと管理画面（コンテンツ編集機能）を追加しました。
