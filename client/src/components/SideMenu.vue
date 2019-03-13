<template>
    <div id="side-menu" class="has-background-light">
        <div class="header revalia has-background-info">
          <router-link class="no-deco" to="/home">
            <span class="is-size-4 has-text-white">Mondai Gallery</span>
          </router-link>
        </div>
        <div class="items">
            <router-link class="list-item first-item" to="/home">
                <b-icon icon="home"></b-icon>
                <span>ホーム</span>
            </router-link>
            <router-link class="list-item" to="/add">
                <b-icon icon="plus-circle"></b-icon>
                <span>リスト</span>
            </router-link>
            <router-link class="list-item" to="/contact">
                <b-icon icon="contacts"></b-icon>
                <span>お問い合わせ</span>
            </router-link>
        </div>
        <footer class="foot">
            <router-link class="list-item first-item" to="/mypage" v-if="user.username">
                <b-icon icon="account"></b-icon>
                <span>マイページ</span>
            </router-link>
            <router-link class="list-item" to="/mypage/edit" v-if="user.username">
                <b-icon icon="settings"></b-icon>
                <span>個人設定</span>
            </router-link>
            <a class="list-item" @click="logout()" v-if="user.username">
                <b-icon icon="logout"></b-icon>
                <span>ログアウト</span>
            </a>
            <router-link class="list-item first-item" to="/login" v-else>
                <b-icon icon="login"></b-icon>
                <span>ログイン</span>
            </router-link>
            <router-link class="list-item" to="/signup">
                <b-icon icon="account-plus"></b-icon>
                <span>新規登録</span>
            </router-link>
        </footer>
    </div>
</template>
<script>
export default {
    props: {
        user: {
            username: String
        }
    },
    methods: {
        logout() {
            this.$emit("logout");
        }
    }
}
</script>
<style scoped>
#side-menu {
    z-index: 150;
    position: fixed;
    height: 100vh;
    width: 300px;
    overflow-x: hidden;
    overflow-y: auto;
}
.items {
    border-bottom: 1px solid #dddddd;
    padding: 10px;
}
.header {
    padding: 50px 0;
    text-align: center;
}
.foot {
    box-sizing: border-box;
    width: 300px;
    padding: 10px;
}
.no-deco {
    color: #333;
}
.first-item {
}
.list-item {
    color: #333;
    display: block;
    box-sizing: border-box;
    padding: 10px;
}
.list-item:hover {
    background: #eeeeee;
}
</style>
