<template>
  <div id="app">
    <div class="container is-fluid">
      <div id="heading">
        <nav class="navbar is-fixed-top is-primary" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <router-link class="is-light navbar-item" to="/"><span>問題集</span><b-tag class="is-danger">BETA</b-tag></router-link>
            <div class="navbar-burger burger" @click="showNav = !showNav" data-target="navbar1">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div id="navbar1" class="navbar-menu" :class="{'is-active': showNav}">
            <div class="navbar-start">
              <router-link class="navbar-item"  to="/"><b-icon icon="home"></b-icon><span>ホーム</span></router-link>
              <router-link class="navbar-item" to="/add"><b-icon icon="plus-circle"></b-icon><span>リストを追加</span></router-link>
              <router-link class="navbar-item"  to="/contact"><b-icon icon="contacts"></b-icon><span>お問い合わせ</span></router-link>
            </div>
            <div class="navbar-end">
              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                ようこそ、{{user.nickname}}さん
                </a>
                <div class="navbar-dropdown">
                  <router-link class="navbar-item" to="/mypage" v-if="user.username"><b-icon icon="account"></b-icon><span>マイページ</span></router-link>
                  <a class="navbar-item" @click="logout()" v-if="user.username"><b-icon icon="logout"></b-icon><span>ログアウト</span></a>
                  <router-link class="navbar-item" to="/login" v-else><b-icon icon="login"></b-icon><span>ログイン</span></router-link>
                  <router-link class="navbar-item" to="/signup"><b-icon icon="account-plus"></b-icon><span>新規登録</span></router-link>
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
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>[未定]</strong> by <router-link to="/contact">人参</router-link>. The source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
        </p>
      </div>
    </footer>
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
          vm.$router.push('/login')
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
  margin-top: 70px;
}
.container {
  min-height: 80vh;
}
.multiline {
  white-space: pre-wrap;
}
</style>
