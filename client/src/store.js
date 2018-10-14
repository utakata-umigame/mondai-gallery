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
    },
    account: [
      { key: 'latethink', name: 'ラテシン', profileUrl: 'http://sui-hei.net/mondai/profile/'},
      { key: 'cindy', name: 'Cindy', profileUrl: 'https://www.cindythink.com/profile/show/'},
      { key: 'R', name: 'Openウミガメ R鯖', profileUrl: 'http://openumigame.sakura.ne.jp/openumi/Mmail/userpage/'},
      { key: 'latelate', name: 'Openウミガメ らてらて鯖', profileUrl: 'https://late-late.jp/mondai/profile/'},
      { key: 'latePro', name: 'らてしんPRO', profileUrl: 'https://sui-hei-pro.net/users/profile/'},
      { key: 'twitter', name: 'Twitter', profileUrl: 'https://twitter.com/'},
      { key: 'github', name: 'GitHub', profileUrl: 'https://github.com/'}
    ],
    updateLog: [
      "10/14 URLを独自ドメインにしました。→ gallery.utakata-umigame.com",
      "10/11 トップページを追加しました。",
      "10/10 Docker上で実行できるようにしました。",
      "10/9 プロフィールのアカウントリンクの表示を更新しました。",
      "10/9 リストの非公開を実装しました。"
    ]
  },
  mutations: {
    setUser (state, value) {
      state.user = value
    }
  },
  getters: {
    user (state) { return state.user },
    genre (state) { return state.genre },
    site (state) { return state.site },
    account (state) { return state.account },
    updateLog (state) { return state.updateLog }
  }
})
