## 構成

本プロジェクトはフロントエンド（Next.js）とバックエンド（FastAPI）で構成されています。

```
.
├── backend/   # Python/FastAPI バックエンド
│   ├── main.py
│   ├── agent.py
│   ├── requirements.txt
│   └── .env
├── frontend/  # Next.js フロントエンド
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
└── README.md
```

## セットアップ

### バックエンド

1. Python 3.11 以上をインストール
2. 必要なパッケージをインストール

```sh
cd backend
pip install -r requirements.txt
```

3. `.env` ファイルを設定

4. サーバー起動

```sh
uvicorn main:app --reload
```

### フロントエンド

1. Node.js 18 以上をインストール
2. 依存パッケージをインストール

```sh
cd frontend
pnpm install
```

3. `.env` ファイルを設定

4. 開発サーバー起動

```sh
pnpm dev
```

## 主な利用技術

- フロントエンド: [Next.js](https://nextjs.org/)（React 19対応）
- バックエンド: [FastAPI](https://fastapi.tiangolo.com/)
- AG-UI: `@ag-ui/core` など
- CopilotKit: `@copilotkit/react-core` など

## 開発・ビルド

- フロントエンド開発: `pnpm dev`
- フロントエンドビルド: `pnpm build`
- バックエンド開発: `uvicorn main:app --reload`

## その他

- フロントエンドのAPIルートは `frontend/pages/api/` 配下に配置
- バックエンドAPIはFastAPIで実装
- `.env` ファイルのサンプルや必要な環境変数は各ディレクトリに記載

## 参考

- [Next.js ドキュメント](https://nextjs.org/docs)
- [FastAPI ドキュメント](https://fastapi.tiangolo.com/)# ag-ui-demo
