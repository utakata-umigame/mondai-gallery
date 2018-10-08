import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
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
      'R': {name: 'Openウミガメ R鯖', showUrl: 'http://openumigame.sakura.ne.jp/openumi/mondai/show/'},
      'latelate': {name: 'Openウミガメ らてらて鯖', showUrl: 'https://late-late.jp/mondai/show/'},
      'latePro': {name: 'らてしんPRO', showUrl: 'https://sui-hei-pro.net/mondai/show/'}
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
