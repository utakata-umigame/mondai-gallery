<template>
  <div id="app" class="container is-fluid">
    <div id="heading">
      <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item"></a>
          <div class="navbar-burger burger" @click="showNav = !showNav" data-target="navbar1">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div id="navbar1" class="navbar-menu" :class="{'is-active': showNav}">
          <div class="navbar-start">
            <router-link class="navbar-item"  to="/">ホーム</router-link>
            <router-link class="navbar-item" to="/add">リストを追加</router-link>
            <router-link class="navbar-item"  to="/contact">お問い合わせ</router-link>
          </div>
          <div class="navbar-end">
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
              ようこそ、{{user.nickname}}さん
              </a>
              <div class="navbar-dropdown">
                <router-link class="navbar-item" to="/mypage" v-if="user.username">マイページ</router-link>
                <a class="navbar-item" @click="logout()" v-if="user.username">ログアウト</a>
                <router-link class="navbar-item" to="/login" v-else>ログイン</router-link>
                <router-link class="navbar-item" to="/signup">新規登録</router-link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <!--
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
      -->
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showNav: false
    }
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
            vm.$toast.open({
              'message': 'ログインしてください',
              'type': 'is-danger'
            })
            vm.$router.push('/login')
          }
        })
        .catch((err) => {
          console.log(err)
          vm.$store.commit('setUser', {'nickname': 'Guest'})
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
.multiline {
  white-space: pre-wrap;
}
</style>
