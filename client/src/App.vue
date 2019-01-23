<template>
  <div id="app" class="has-background-light">
    <div class="toggler has-background-primary" @click="showNav = !showNav" :class="{'closed': !showNav, 'open': showNav}">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <header id="heading">
    </header>
    <transition name="slide">
      <SideMenu :user="user" class="side" @logout="logout" :class="{'open': showNav, 'closed': !showNav}"/>
    </transition>
    <div class="main">
      <router-view class="page"/>
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
  </div>
</template>
<script>
import SideMenu from "@/components/SideMenu";
export default {
  components: {
    SideMenu
  },
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
      this.showNav = false;
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
html {
  background-color: whitesmoke !important;
}
#app {
  font-family: "Noto Sans JP", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #fefefe;
}
.main {
  margin-left: 50px;
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
.modal.is-active {
  z-index: 200;
}
.toggler {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 151;
  padding: 15px 10px;
  width: 50px;
  height: 50px;
  cursor: pointer;
}
.side {
  left: -300px;
}
.side.open {
  transition: transform .5s ease;
  transform: translateX(300px);
}
.side.closed {
  transition: transform .5s ease;
  transform: translateX(0);
}
.toggler.open {
  transition: transform .5s ease;
  transform: translateX(300px);
}
.toggler.closed {
  transition: transform .5s ease;
  transform: translateX(0);
}
.toggler span{
  display: block;
  margin-bottom: 5px;
  height: 3px;
  background:#fff;
}
#heading {
  display: none;
  height: 0;
}
@media screen and (min-width: 900px) {
  .main {
    margin-left: 300px;
  }
  .toggler {
    display: none;
  }
  .closed {
    left: 0;
  }
}
@media screen and (max-width: 480px) {
  .main {
    margin-top: 50px;
    margin-left: 0;
  }
  #side-menu {
    position: fixed;
    width: 100vw;
    top: 0;
    right: 0;
    left: -100vw;
  }
  #side-menu.open {
    width: 100vw;
    transition: transform .5s ease;
    transform: translateX(100vw);
  }
  #side-menu.closed {
    width: 100vw;
    transition: transform .5s ease;
    transform: translateX(0);
  }
  .toggler {
    position: fixed;
    left: 0;
  }
  .toggler.open {
    transition: none;
    transform: none;
  }
  .toggler.closed {
    transition: none;
    transform: none;
  }
  #heading {
    display: block;
    background: #0984e3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 50px;
    z-index: 120;
  }
}
</style>
