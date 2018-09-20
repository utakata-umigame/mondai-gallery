<template>
  <div id="app" class="container-fluid">
    <div id="heading">
      <h1>水平思考問題リンク集</h1>
      <b-nav class="mb-2">
        <b-nav-item to="/">ホーム</b-nav-item>
        <b-nav-item to="/add">リストを追加</b-nav-item>
        <b-nav-item to="/contact">連絡先</b-nav-item>
        <b-nav-item-dropdown v-bind:text="user.nickname" right>
          <b-dropdown-item to="/mypage" v-if="user.username">マイページ</b-dropdown-item>
          <b-dropdown-item to="/login" v-else>ログイン</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item to="/signup">新規登録</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-nav>
    </div>
    <router-view/>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {}
  },
  name: 'App',
  computed: {
    user: function () {
      return this.$store.state.user
    }
  },
  mounted: function () {
    let vm = this
    axios.get('/api/user')
      .then((res) => {
        if (res.data.username) {
          vm.$store.commit('setUser', res.data)
        }
      })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
#heading {
  text-align: center;
}
.multiline {
  white-space: pre-wrap;
}
</style>
