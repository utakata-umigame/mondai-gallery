<template>
  <div id="app" class="container-fluid">
    <h1><a href="/">問題集</a></h1>
    <a href="/add">追加</a>
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
