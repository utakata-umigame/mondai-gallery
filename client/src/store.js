import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tumblrToken: {
      token: '',
      secret: ''
    },
    user: {
      id: 0,
      nickname: 'Guest',
      username: ''
    },
    allUser: [],
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
    picture: {
      'umigame': 'https://res.cloudinary.com/hlcdk0lhr/image/upload/b_auto,c_pad,h_900,w_1600/v1543142406/app/umigame.jpg',
      'yesno': 'https://res.cloudinary.com/hlcdk0lhr/image/upload/b_auto,c_pad,h_900,w_1600/v1543142403/app/yesno.jpg',
      'puzzle': 'https://res.cloudinary.com/hlcdk0lhr/image/upload/b_auto,c_pad,h_900,w_1600/v1543142404/app/puzzle.jpg',
    },
    updateLog: [
      "11/ 7 プロフィール画像を設定できるようになりました。設定するには画像のURLを指定してください。アップローダについては別途ご相談ください",
      "11/ 6 ログインが必要なページに非ログイン状態でアクセスする場合、ログインページにリダイレクトする機能を実装しました。",
      "11/ 1 開発中のスケジュール機能を使用可能です。機能を拡充して11/10にはベータ版になる予定です。",
      "10/30 テーマカラーを設定できるようになりました。",
      "10/30 リストに独自のタグを付けられるようになりました。"
    ]
  },
  mutations: {
    setAllUser (state, value) {
      state.allUser = value
    },
    setUser (state, value) {
      state.user = value
    },
    setSavedList (state, value) {
      Vue.set(state.savedLists, value.id, value)
    },
    setSavedProfile (state, value) {
      state.savedProfiles[value.id] = value
    },
    setTumblrToken (state, value) {
      state.tumblrToken = value
    }
  },
  actions: {
    async fetchAllUser (context) {
      let users = []
      await axios.get(new Vue().$endPoint('/api/allUser'))
        .then(res => {
          users = res.data
        })
      context.commit('setAllUser', users)
    },
    async fetchUser (context) {
      let payload = {
        'username': '',
        'nickname': ''
      }
      await axios.get(new Vue().$endPoint('/api/user'))
        .then(res => {
          if (res.data.username) payload = res.data
          else payload = {
            'nickname': 'Guest'
          }
        })
        .catch( error => {

        })
      context.commit('setUser', payload)
    },
    async fetchList (context, id) {
      let payload = {
        id: 0,
        mondaiList: {},
        otherList: [],
        isMine: false
      }
      await axios.get(new Vue().$endPoint('/api/mondaiList/' + id))
        .then( response => {
          let data = response.data
          payload.id = id
          payload.mondaiList = {
            'id': id,
            'name': data.name,
            'description': data.description,
            'editor': data.editor,
            'tags': data.tags,
            'picture': data.picture,
            'accept': data.accept,
            'mondai': data.mondai.sort((x, y) => x._id - y._id)
          }
        })
        .catch( error => {

        })
      await axios.get(new Vue().$endPoint('/api/mondaiList'))
        .then( res => {
          payload.otherList = res.data.filter(x => x.editor.id === payload.mondaiList.editor.id && x.id !== payload.mondaiList.id)
        })
        .catch( error => {

        })
      await axios.get(new Vue().$endPoint('/api/user'))
        .then( res => {
          if (res) {
            if (res.data) {
              if (res.data.username === payload.mondaiList.editor.username) {
                payload.isMine = true
              }
            }
          }
        })
        .catch( error => {

        })
      context.commit('setSavedList', payload)
    }
  },
  getters: {
    allUser (state) { return state.allUser },
    user (state) { return state.user },
    genre (state) { return state.genre },
    site (state) { return state.site },
    account (state) { return state.account },
    updateLog (state) { return state.updateLog },
    savedLists(state) { return state.savedLists },
    savedProfiles(state) { return state.savedProfiles },
    tumblrToken (state) { return state.tumblrToken },
    picture (state) { return state.picture }
  }
})
