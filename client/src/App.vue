<template>
  <div id="app" class="container-fluid">
    <div id="heading">
      <h1><router-link to="/">水平思考問題リンク集</router-link></h1>
      <router-link to="/mypage">マイページ</router-link>
      <router-link to="/add">リストを追加</router-link>
      <router-link to="/login">ログイン</router-link>
      <router-link to="/signup">登録</router-link>
      <b-btn variant="link" v-on:click="logout()">ログアウト</b-btn>
      <span>ようこそ、{{user.nickname}}さん</span>
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
  },
  methods: {
    logout: function () {
      axios.get('/api/logout')
    }
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
</style>
