# mondai-gallery

## 一般
### 用意するもの
- git
### クローン
```bash
git clone https://github.com/pb10001/mondai-gallery.git
```
## Dockerを使う場合
### 用意するもの
- docker
- docker-compose
### ビルド済みのイメージを試す
```bash
wget https://raw.githubusercontent.com/pb10001/mondai-gallery/master/docker-compose.yml
docker-compose up
# 192.168.99.100:49160にアクセス
```
### ソースコードからビルドする
```bash
docker-compose build
docker-compose up
# 192.168.99.100:49160にアクセス
```
## npmを使う場合
### 用意するもの
- npm
- MongoDB
### インストール
```bash
cd mondai-gallery
npm install
```
### npmパッケージの追加
```bash
npm install -g node-dev
```
### MongoDBの起動
ポートは27017
### 開発用サーバ(バックエンド)
```bash
npm run dev
# localhost:3000にアクセス
```
### Vue CLI UI(フロントエンド)
```bash
cd client
vue ui
```
