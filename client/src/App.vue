<template>
  <div id="app" class="container-fluid">
    <h1><router-link to="/">問題集</router-link></h1>
    <router-link to="/mypage">マイページ</router-link>
    <router-link to="/add">リストを追加</router-link>
    <router-link to="/login">ログイン</router-link>
    <router-link to="/signup">登録</router-link>
    <span>ようこそ、{{user.nickname}}さん</span>
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
