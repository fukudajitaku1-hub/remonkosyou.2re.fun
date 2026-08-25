# remonkosyou.2re.fun

「えっちゃんのレモン胡椒」の紹介ページ（現在は準備中の告知のみ）。
Next.js（App Router）で構築し、Docker コンテナとして本番サーバー上で稼働しています。

## 構成

```
remonkosyou/
├─ app/
│  ├─ layout.js      ルートレイアウト（<title> などのメタデータ）
│  ├─ page.js         トップページ本体
│  ├─ globals.css     ページ全体のスタイル
│  └─ icon.svg        ファビコン（レモン絵文字、App Router の規約で自動配信）
├─ public/
│  └─ images/
│     └─ lemon-kosho.jpg   ブランドイラスト（トップページに表示）
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

## 以前の構成からの変更点

元々は素の `index.html` を Caddy の `file_server` で直接配信していましたが、今後の機能追加（レシピ例の公開など）を見据えて Next.js に書き換え、Docker コンテナとして稼働する構成に移行しました。
