<template>
  <div id="app" class="container-fluid">
    <div id="heading">
      <b-nav variant="success" class="mb-2">
        <b-nav-item to="/">ホーム</b-nav-item>
        <b-nav-item to="/add">リストを追加</b-nav-item>
        <b-nav-item to="/contact">お問い合わせ</b-nav-item>
        <b-nav-item-dropdown v-bind:text="user.nickname" right>
          <b-dropdown-item to="/mypage" v-if="user.username">マイページ</b-dropdown-item>
          <b-dropdown-item v-on:click="logout()" v-if="user.username">ログアウト</b-dropdown-item>
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
    vm.getUser()
  },
  methods: {
    getUser: function () {
      let vm = this
      this.$http.get('/api/user')
        .then((res) => {
          if (res.data.username) {
            vm.$store.commit('setUser', res.data)
          } else {
            vm.$store.commit('setUser', {'nickname': 'Guest'})
          }
        })
    },
    logout: function () {
      let vm = this
      this.$http.get('/api/logout')
        .then((res) => {
          vm.getUser()
        })
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
.multiline {
  white-space: pre-wrap;
}
</style>
