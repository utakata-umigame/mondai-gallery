// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
// ajax client
import axios from 'axios'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
/* import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css' */
import MondaiView from '@/components/MondaiView'
import ListLinkView from '@/components/ListLinkView'
import MondaiDialog from '@/components/MondaiDialog'

Vue.use(Vuex)
Vue.use(Buefy)
// Vue.use(BootstrapVue)
Vue.component('mondai-view', MondaiView)
Vue.component('list-link', ListLinkView)
Vue.component('mondai-dialog', MondaiDialog)

Vue.prototype.$http = axios
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    user: {
      id: 0,
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
