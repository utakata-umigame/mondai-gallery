<template>
  <div id="app" class="has-background-light">
    <div id="heading">
      <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <router-link class="navbar-item" to="/home">
            <span>Mondai Gallery</span>
          </router-link>
          <div class="navbar-burger burger" @click="showNav = !showNav" data-target="navbar1">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div id="navbar1" class="navbar-menu" :class="{'is-active': showNav}">
          <div class="navbar-start">
            <router-link class="navbar-item" to="/add">
              <b-icon icon="plus-circle"></b-icon>
              <span>リスト</span>
            </router-link>
            <router-link class="navbar-item" to="/contact">
              <b-icon icon="contacts"></b-icon>
              <span>お問い合わせ</span>
            </router-link>
            <router-link class="navbar-item" to="/graph">
              <span>グラフ</span>
            </router-link>
          </div>
          <div class="navbar-end">
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">ようこそ、{{user.nickname}}さん</a>
              <div class="navbar-dropdown">
                <router-link class="navbar-item" to="/mypage" v-if="user.username">
                  <b-icon icon="account"></b-icon>
                  <span>マイページ</span>
                </router-link>
                <router-link class="navbar-item" to="/mypage/edit" v-if="user.username">
                  <b-icon icon="settings"></b-icon>
                  <span>個人設定</span>
                </router-link>
                <a class="navbar-item" @click="logout()" v-if="user.username">
                  <b-icon icon="logout"></b-icon>
                  <span>ログアウト</span>
                </a>
                <router-link class="navbar-item" to="/login" v-else>
                  <b-icon icon="login"></b-icon>
                  <span>ログイン</span>
                </router-link>
                <router-link class="navbar-item" to="/signup">
                  <b-icon icon="account-plus"></b-icon>
                  <span>新規登録</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div :class="{'container is-fluid': $route.path !== '/'}">
      <router-view class="page"/>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Mondai Gallery</strong> by
          <router-link to="/contact">人参</router-link>. The source code is licensed under
          <a
            href="http://opensource.org/licenses/mit-license.php"
          >MIT</a>.
        </p>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  localStorage: {
    user: {
      type: Object,
      default: {
        id: 0,
        nickname: "Guest",
        username: ""
      }
    }
  },
  data() {
    return {
      showNav: false,
      isTop: false
    };
  },
  name: "App",
  computed: {
    user: function() {
      return this.$store.state.user;
    }
  },
  watch: {
    $route() {
      this.getUser();
    }
  },
  mounted: function() {
    this.getUser();
  },
  methods: {
    getUser: function() {
      this.$store.dispatch("fetchUser");
    },
    logout: function() {
      let vm = this;
      this.$http.get(this.$endPoint("/api/logout")).then(() => {
        vm.getUser();
        vm.$router.push("/login");
      });
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Revalia|Sawarabi+Gothic|Noto+Sans+JP:300|M+PLUS+1p:500|Raleway+Dots");
#app {
  font-family: "Noto Sans JP", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #fefefe;
}
.title {
  font-family: "M Plus 1p", sans-serif;
}
.subtitle {
  font-family: "M Plus 1p", sans-serif;
}
div > #markdown > h1 {
  font-size: 2rem;
}
div > #markdown > h2 {
  font-size: 1.8rem;
}
div > #markdown > h3 {
  font-size: 1.6rem;
}
div > #markdown > ul {
  margin: 1em 0;
  padding-left: 40px;
  list-style-type: disc;
}
#markdown > ol {
  margin: 1em 0;
  padding-left: 40px;
  list-style-type: decimal;
}
h2.title {
  text-align: center;
}
.container {
  min-height: 80vh;
  padding-bottom: 10px;
  padding-top: 10px;
}
.page {
  height: 100%;
}
.fill {
  width: 100%;
}
.multiline {
  white-space: pre-wrap;
  word-break: break-all;
}
.p10 {
  padding: 10px;
}
.mr {
  margin-right: 5px;
}
.mb {
  margin-bottom: 10px;
}
.revalia {
  font-family: "Revalia", cursive;
}
.raleway {
  font-family: "Raleway Dots", cursive;
}
.caption-light {
  font-family: "Kosugi Maru", sans-serif;
  font-weight: lighter;
}
.panel-block {
  background: white;
}
.pb {
  padding-bottom: 50px;
}
.scrollX {
  overflow-x: scroll;
}
</style>
