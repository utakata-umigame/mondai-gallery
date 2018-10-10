# mondai-gallery

## 用意するもの
- npm
- git
- MongoDB
## クローン
```bash
git clone https://github.com/pb10001/mondai-gallery.git
```
## インストール
```bash
cd mondai-gallery
npm install
```
## npmパッケージの追加
```bash
npm install -g node-dev
```
## MongoDBの起動
ポートは27017
## 開発用サーバ(バックエンド)
```bash
npm run dev
# localhost:3000にアクセス
```
## Vue CLI UI(フロントエンド)
```bash
cd client
vue ui
```
## ※Dockerで手軽に試す
```bash
#現在のディレクトリにdocker-compose.ymlがあることを確認
docker-compose pull
docker-compose up
#192.168.99.100:49160にアクセス
```
