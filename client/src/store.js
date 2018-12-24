import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

const graph = {
  namespaced: true,
  state: {

  }
}

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
      umigame: 'ウミガメ',
      tobira: '20の扉',
      kameo: '亀夫君問題',
      other: 'その他'
    },
    site: {
      latethink: {
        name: 'ラテシン',
        showUrl: 'http://sui-hei.net/mondai/show/'
      },
      cindy: {
        name: 'Cindy',
        showUrl: 'https://www.cindythink.com/puzzle/show/'
      },
      R: {
        name: 'R鯖',
        showUrl: 'http://openumigame.sakura.ne.jp/openumi/mondai/show/'
      },
      latelate: {
        name: 'らてらて鯖',
        showUrl: 'https://late-late.jp/mondai/show/'
      },
      latePro: {
        name: 'らてしんPRO',
        showUrl: 'https://sui-hei-pro.net/mondai/show/'
      }
    },
    account: [
      {
        key: 'latethink',
        name: 'ラテシン',
        profileUrl: 'http://sui-hei.net/mondai/profile/'
      },
      {
        key: 'cindy',
        name: 'Cindy',
        profileUrl: 'https://www.cindythink.com/profile/show/'
      },
      {
        key: 'R',
        name: 'R鯖',
        profileUrl: 'http://openumigame.sakura.ne.jp/openumi/Mmail/userpage/'
      },
      {
        key: 'latelate',
        name: 'らてらて鯖',
        profileUrl: 'https://late-late.jp/users/profile/'
      },
      {
        key: 'latePro',
        name: 'らてしんPRO',
        profileUrl: 'https://sui-hei-pro.net/users/profile/'
      },
      { key: 'twitter', name: 'Twitter', profileUrl: 'https://twitter.com/' },
      { key: 'github', name: 'GitHub', profileUrl: 'https://github.com/' }
    ],
    picture: {
      umigame:
        'https://res.cloudinary.com/hlcdk0lhr/image/upload/b_auto,c_pad,h_900,w_1600/v1543142406/app/umigame.jpg',
      yesno:
        'https://res.cloudinary.com/hlcdk0lhr/image/upload/b_auto,c_pad,h_900,w_1600/v1543142403/app/yesno.jpg',
      puzzle:
        'https://res.cloudinary.com/hlcdk0lhr/image/upload/b_auto,c_pad,h_900,w_1600/v1543142404/app/puzzle.jpg',
      question:
        'https://res.cloudinary.com/hlcdk0lhr/image/upload/b_auto,c_pad,h_900,w_1600/v1543836738/app/question.jpg'
    },
    updateLog: [
      '11/ 7 プロフィール画像を設定できるようになりました。設定するには画像のURLを指定してください。アップローダについては別途ご相談ください',
      '11/ 6 ログインが必要なページに非ログイン状態でアクセスする場合、ログインページにリダイレクトする機能を実装しました。',
      '11/ 1 開発中のスケジュール機能を使用可能です。機能を拡充して11/10にはベータ版になる予定です。',
      '10/30 テーマカラーを設定できるようになりました。',
      '10/30 リストに独自のタグを付けられるようになりました。'
    ],
    nodeId: 0,
    linkId: 100000,
    nodes: [],
    links: [],
    selected: -1,
    createLinkMode: false
  },
  mutations: {
    setAllUser(state, value) {
      state.allUser = value;
    },
    setUser(state, value) {
      state.user = value;
    },
    setSavedList(state, value) {
      Vue.set(state.savedLists, value.id, value);
    },
    setSavedProfile(state, value) {
      state.savedProfiles[value.id] = value;
    },
    setTumblrToken(state, value) {
      state.tumblrToken = value;
    },
    updateLocation(state, obj) {
      let item = state.nodes.find(x => x.id === obj.id)
      item.x = obj.x
      item.y = obj.y
      state.links.filter(x => x.source === obj.id).forEach(item => {
        item.point1.x = obj.x + 50
        item.point1.y = obj.y + 30
      })
      state.links.filter(x => x.destination === obj.id).forEach(item => {
        item.point2.x = obj.x + 50
        item.point2.y = obj.y + 30
      })
    },
    add(state) {
      state.nodes.push({
        id: state.nodeId++,
        point: {
            x: 10,
            y: 10 + Math.random() * 100
        }
      })
    },
    select(state, obj) {
      state.selected = obj.id
    },
    toggleSelect(state) {
      state.createLinkMode ^= true
    },
    commitDest(state, obj) {
      let src = state.nodes.find(x => x.id === state.selected)
      let dest = state.nodes.find(x => x.id === obj.id)
      state.links.push({
        id: state.linkId++,
        source: state.selected,
        destination: obj.id,
        point1: {
          x: src.x + 50,
          y: src.y + 30
        },
        point2: {
          x: dest.x + 50,
          y: dest.y + 30
        }
      })
      state.createLinkMode = false
    }
  },
  actions: {
    async fetchAllUser(context) {
      let users = [];
      await axios.get(new Vue().$endPoint('/api/allUser')).then(res => {
        users = res.data;
      });
      context.commit('setAllUser', users);
    },
    async fetchUser(context) {
      let payload = {
        username: '',
        nickname: ''
      };
      await axios
        .get(new Vue().$endPoint('/api/user'))
        .then(res => {
          if (res.data.username) payload = res.data;
          else
            payload = {
              nickname: 'Guest'
            };
        })
        .catch(error => {});
      context.commit('setUser', payload);
    },
    async fetchList(context, id) {
      let payload = {
        id: 0,
        mondaiList: {},
        otherList: [],
        isMine: false
      };
      await axios
        .get(new Vue().$endPoint('/api/mondaiList/' + id))
        .then(response => {
          let data = response.data;
          payload.id = id;
          payload.mondaiList = {
            id: id,
            name: data.name,
            description: data.description,
            editor: data.editor,
            tags: data.tags,
            picture: data.picture,
            accept: data.accept,
            addible: data.addible,
            read: data.read,
            mondai: data.mondai.sort((x, y) => x._id - y._id)
          };
        })
        .catch(error => {});
      await axios
        .get(new Vue().$endPoint('/api/mondaiList'))
        .then(res => {
          payload.otherList = res.data.filter(
            x =>
              x.editor.id === payload.mondaiList.editor.id &&
              x.id !== payload.mondaiList.id
          );
        })
        .catch(error => {});
      await axios
        .get(new Vue().$endPoint('/api/user'))
        .then(res => {
          if (res) {
            if (res.data) {
              if (res.data.username === payload.mondaiList.editor.username) {
                payload.isMine = true;
              }
            }
          }
        })
        .catch(error => {});
      context.commit('setSavedList', payload);
    }
  },
  getters: {
    allUser(state) {
      return state.allUser;
    },
    user(state) {
      return state.user;
    },
    genre(state) {
      return state.genre;
    },
    site(state) {
      return state.site;
    },
    account(state) {
      return state.account;
    },
    updateLog(state) {
      return state.updateLog;
    },
    savedLists(state) {
      return state.savedLists;
    },
    savedProfiles(state) {
      return state.savedProfiles;
    },
    tumblrToken(state) {
      return state.tumblrToken;
    },
    picture(state) {
      return state.picture;
    },
    nodes(state) {return state.nodes},
    links(state) {return state.links}
  }
});
