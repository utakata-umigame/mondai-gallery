// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import MondaiView from './components/MondaiView'
import AllList from './components/AllList'
import AddList from './components/AddList'
import MondaiList from './components/MondaiList'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import EditList from './components/EditList'
import MyPage from './components/MyPage'
import Contact from './components/Contact'

// ajax client
import axios from 'axios'

// Webpack CSS import
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

// JS import
import VueOnsen from 'vue-onsenui' // This already imports 'onsenui'

Vue.use(VueOnsen)
Vue.use(Vuex)

Vue.prototype.$http = axios

Vue.component('mondai-view', MondaiView)
Vue.component('all-list', AllList)
Vue.component('add-list', AddList)
Vue.component('mondai-list', MondaiList)
Vue.component('sign-up', SignUp)
Vue.component('log-in', LogIn)
Vue.component('edit-list', EditList)
Vue.component('my-page', MyPage)
Vue.component('contact', Contact)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    user: {
      nickname: 'Guest',
      username: ''
    },
    genre: {
      'umigame': 'ウミガメのスープ',
      'tobira': '20の扉',
      'kameo': '亀夫君問題',
      'other': 'その他'
    },
    site: {
      'latethink': {name: 'ラテシン', showUrl: 'http://sui-hei.net/mondai/show/'},
      'cindy': {name: 'Cindy', showUrl: 'https://www.cindythink.com/puzzle/show/'},
      'R': {name: 'Openウミガメ R鯖', showUrl: 'http://openumigame.sakura.ne.jp/openumi/mondai/show/'}
    }
  },
  mutations: {
    setUser (state, value) {
      state.user = value
    }
  },
  getters: {
    user (state) { return state.user },
    genre (state) { return state.genre },
    site (state) { return state.site }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
