import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tumblr: {
      token: '',
      secret: ''
    },
    user: {
      id: 0,
      nickname: 'Guest',
      username: ''
    },
    savedLists: {},
    savedProfiles: {},
    genre: {
      'umigame': 'ウミガメ',
      'tobira': '20の扉',
      'kameo': '亀夫君問題',
      'other': 'その他'
    },
    site: {
      'latethink': {name: 'ラテシン', showUrl: 'http://sui-hei.net/mondai/show/'},
      'cindy': {name: 'Cindy', showUrl: 'https://www.cindythink.com/puzzle/show/'},
      'R': {name: 'R鯖', showUrl: 'http://openumigame.sakura.ne.jp/openumi/mondai/show/'},
      'latelate': {name: 'らてらて鯖', showUrl: 'https://late-late.jp/mondai/show/'},
      'latePro': {name: 'らてしんPRO', showUrl: 'https://sui-hei-pro.net/mondai/show/'}
    },
    account: [
      { key: 'latethink', name: 'ラテシン', profileUrl: 'http://sui-hei.net/mondai/profile/'},
      { key: 'cindy', name: 'Cindy', profileUrl: 'https://www.cindythink.com/profile/show/'},
      { key: 'R', name: 'R鯖', profileUrl: 'http://openumigame.sakura.ne.jp/openumi/Mmail/userpage/'},
      { key: 'latelate', name: 'らてらて鯖', profileUrl: 'https://late-late.jp/users/profile/'},
      { key: 'latePro', name: 'らてしんPRO', profileUrl: 'https://sui-hei-pro.net/users/profile/'},
      { key: 'twitter', name: 'Twitter', profileUrl: 'https://twitter.com/'},
      { key: 'github', name: 'GitHub', profileUrl: 'https://github.com/'}
    ],
    updateLog: [
      "11/ 7 プロフィール画像を設定できるようになりました。設定するには画像のURLを指定してください。アップローダについては別途ご相談ください",
      "11/ 6 ログインが必要なページに非ログイン状態でアクセスする場合、ログインページにリダイレクトする機能を実装しました。",
      "11/ 1 開発中のスケジュール機能を使用可能です。機能を拡充して11/10にはベータ版になる予定です。",
      "10/30 テーマカラーを設定できるようになりました。",
      "10/30 リストに独自のタグを付けられるようになりました。"
    ]
  },
  mutations: {
    setUser (state, value) {
      state.user = value
    },
    setSavedList (state, value) {
      state.savedLists[value.id] = value
    },
    setSavedProfile (state, value) {
      state.savedProfiles[value.id] = value
    }
  },
  getters: {
    user (state) { return state.user },
    genre (state) { return state.genre },
    site (state) { return state.site },
    account (state) { return state.account },
    updateLog (state) { return state.updateLog },
    savedLists(state) { return state.savedLists },
    savedProfiles(state) { return state.savedProfiles }
  }
})
