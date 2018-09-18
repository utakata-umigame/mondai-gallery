<template>
  <div id="app" class="container-fluid">
    <h1><router-link to="/">問題集</router-link></h1>
    <router-link to="/add">追加</router-link>
    <a href="/login">ログイン</a>
    <a href="/logout">ログアウト</a>
    <a href="/signup">登録</a>
    <span>ようこそ、{{user.nickname}}さん</span>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      user: {
        'nickname': 'Guest',
        'username': ''
      }
    }
  },
  name: 'App',
  mounted: function () {
    let vm = this
    axios.get('/api/user')
      .then((res) => {
        if (res.data) {
          vm.user = res.data
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
