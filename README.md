# monman53.github.io

[![Deploy to GitHub Pages](https://github.com/monman53/monman53.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/monman53/monman53.github.io/actions/workflows/deploy.yml)

## 開発

```sh
# 静的ファイルの生成（dist/ に出力）
cargo run

# ローカル確認
npm install --global http-server
http-server dist
```

## デプロイ

`main` ブランチへのプッシュで GitHub Actions が自動的に `dist/` をビルドし GitHub Pages へデプロイする。

## ブランチ運用

詳細は [AGENT.md](AGENT.md) を参照。

- 作業は `dev` ブランチで行う
- `main` へのマージは新しいマージコミットを作成（fast-forward 禁止）
- マージおよび push は手動で行う
