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
      </div>
      <router-view/>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>問題集(ベータ版)</strong> by <router-link to="/contact">人参</router-link>. The source code is licensed
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
      this.$http.get(this.$endPoint('/api/user'))
        .then((res) => {
          if (res.data.username) {
            vm.$store.commit('setUser', res.data)
          } else {
            vm.$store.commit('setUser', {'nickname': 'Guest'})
          }
        })
        .catch((err) => {
          if (err) {
            vm.$store.commit('setUser', {'nickname': 'Guest'})
          }
        })
    },
    logout: function () {
      let vm = this
      this.$http.get(this.$endPoint('/api/logout'))
        .then(() => {
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
h2.title {
  text-align: center;
}
.container {
  min-height: 80vh;
  padding-bottom: 10px;
}
.fill {
  width: 100%;
}
.multiline {
  white-space: pre-wrap;
}
</style>
