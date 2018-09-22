<template>
  <div id="app" class="container-fluid">
    <v-ons-splitter>
      <v-ons-splitter-side
        swipeable width="150px" collapse="" side="left"
        :open.sync="openSide"
      >
        <v-ons-page>
          <v-ons-list>
            <v-ons-list-item @click="go('/')" tappable modifier="chevron">ホーム</v-ons-list-item>
            <v-ons-list-item @click="go('/add')" tappable modifier="chevron">リストを追加</v-ons-list-item>
            <v-ons-list-item @click="go('/contact')" tappable modifier="chevron">連絡先</v-ons-list-item>
            <v-ons-list-item @click="go('/login')" tappable modifier="chevron">ログイン</v-ons-list-item>
            <v-ons-list-item @click="go('/login')" tappable modifier="chevron">新規登録</v-ons-list-item>
          </v-ons-list>
        </v-ons-page>
      </v-ons-splitter-side>
      <v-ons-splitter-content>
        <v-ons-toolbar>
          <div class="left">
            <v-ons-toolbar-button @click="() => openSide = !openSide">
              <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
            </v-ons-toolbar-button>
          </div>
          <div class="center">水平思考問題リンク集</div>
        </v-ons-toolbar>
        <router-view class="page-body"/>
      </v-ons-splitter-content>
    </v-ons-splitter>
  </div>
</template>
<script>
export default {
  data () {
    return {
      openSide: false
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
    },
    logout: function () {
      let vm = this
      this.$http.get('/api/logout')
        .then((res) => {
          vm.getUser()
        })
    },
    go: function (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>
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
.page-body {
  margin-top: 45px;
}
</style>
