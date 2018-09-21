<template>
  <div id="app" class="container-fluid">
    <div id="heading">
  <v-ons-splitter>
    <v-ons-splitter-side
      swipeable width="150px" collapse="" side="left"
      :open.sync="openSide"
    >
      <v-ons-page>
        <v-ons-list>
          <v-ons-list-item
            tappable modifier="chevron"
            @click="currentPage = page; openSide = false"
          >
            <div class="center">a</div>
          </v-ons-list-item>
        </v-ons-list>
      </v-ons-page>
    </v-ons-splitter-side>

    <v-ons-splitter-content>
      <component :is="currentPage" :toggle-menu="() => openSide = !openSide"></component>
    </v-ons-splitter-content>
  </v-ons-splitter>
      <h1>水平思考問題リンク集</h1>
      <b-nav class="mb-2">
        <b-nav-item to="/">ホーム</b-nav-item>
        <b-nav-item to="/add">リストを追加</b-nav-item>
        <b-nav-item to="/contact">連絡先</b-nav-item>
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
    vm.getUser()
  },
  methods: {
    getUser: function () {
      let vm = this
      axios.get('/api/user')
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
      axios.get('/api/logout')
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
