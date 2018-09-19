<template>
  <div>
    <div class="mb-2">
      <h2>リストを追加</h2>
      <label>リスト名</label>
      <input v-model="myList.name" class="form-control" type="text" placeholder="リスト名">
      <label>リストの説明</label>
      <textarea v-model="myList.description" class="form-control" type="text" placeholder="説明"></textarea>
    </div>
    <button v-on:click="submit()" class="form-control btn btn-primary mb-2">リストを保存</button>
    <b-btn v-b-modal.myModal class="">問題を追加</b-btn>
    <!-- 問題リスト -->
    <ul class="list-group" v-for="item in myList.mondai" v-bind:key="item._id">
      <div class="form-inline">
        <a v-bind:title='item.description' class="list-group-item list-group-item-action" target='_blank' v-bind:href='url(item.site,item.id)'>
          <small class="text-secondary">{{item.author}}</small>
          <span>{{ item.title }}</span>
          <span class="badge badge-primary">{{site[item.site].name}}</span>
          <span class="badge badge-info">{{genre[item.genre]}}</span>
          <span>コメント：{{item.description}}</span>
        </a>
        <b-btn v-b-modal.editModal @click="set(item)">編集</b-btn>
        <button class="btn btn-danger" v-on:click="remove(item)">削除</button>
      </div>
    </ul>
    <!--モーダルダイアログ-->
    <b-modal id="myModal" title="問題を追加" @ok="handleOk">
      <div class="form">
        <label>サイト</label>
        <select v-model='newMondai.site' class="form-control">
          <option value="latethink">ラテシン</option>
          <option value="cindy">Cindy</option>
          <option value="R">R鯖</option>
        </select>
        <label>ジャンル</label>
        <select v-model='newMondai.genre' class="form-control">
          <option value="umigame">ウミガメ</option>
          <option value="tobira">20の扉</option>
          <option value="kameo">亀夫君問題</option>
          <option value="other">その他</option>
        </select>
        <label>問題ID</label>
        <input v-model ="newMondai.id" class="form-control" type="number" placeholder="ID">
        <label>タイトル</label>
        <input v-model ="newMondai.title" class="form-control" type="text" placeholder="タイトル">
        <label>問題の作者</label>
        <input v-model = "newMondai.author" class="form-control" type="text" placeholder="作者">
        <label>コメント</label>
        <textarea v-model="newMondai.description" class="form-control" type="text" placeholder="コメント"></textarea>
      </div>
    </b-modal>
    <b-modal id="editModal" title="問題を編集" @ok="handleEditOk">
      <div class="form">
        <label>サイト</label>
        <select v-model='newMondai.site' class="form-control">
          <option value="latethink">ラテシン</option>
          <option value="cindy">Cindy</option>
          <option value="R">R鯖</option>
        </select>
        <label>ジャンル</label>
        <select v-model='newMondai.genre' class="form-control">
          <option value="umigame">ウミガメ</option>
          <option value="tobira">20の扉</option>
          <option value="kameo">亀夫君問題</option>
          <option value="other">その他</option>
        </select>
        <label>問題ID</label>
        <input v-model ="newMondai.id" class="form-control" type="number" placeholder="ID">
        <label>タイトル</label>
        <input v-model ="newMondai.title" class="form-control" type="text" placeholder="タイトル">
        <label>問題の作者</label>
        <input v-model = "newMondai.author" class="form-control" type="text" placeholder="作者">
        <label>コメント</label>
        <textarea v-model="newMondai.description" class="form-control" type="text" placeholder="コメント"></textarea>
      </div>
    </b-modal>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      newMondai: {
        'id': 0,
        'title': '',
        'author': '',
        'site': 'latethink',
        'description': '',
        'genre': 'umigame'
      },
      tmpMondai: {},
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
      },
      myList: {
        'name': '',
        'editor': {
          'nickname': '',
          'username': ''
        },
        'description': '',
        'mondai': []
      }
    }
  },
  mounted: function () {
  },
  methods: {
    url: function (siteName, id) {
      return this.site[siteName].showUrl + id
    },
    remove: function (item) {
      this.myList.mondai = this.myList.mondai.filter(x => x !== item)
    },
    addMondai: function () {
      let id = 0
      let end = false
      while (!end) {
        end = true
        id++
        for (var key in this.myList.mondai) {
          var item = this.myList.mondai[key]
          if (item._id) {
            if (item._id === id) {
              end = false
            }
          }
        }
      }
      this.newMondai._id = id
      let obj = Object.assign({}, this.newMondai)
      this.myList.mondai.push(obj)
      console.log(this.myList.mondai)
    },
    submit: function () {
      let vm = this
      let obj = Object.assign({}, this.myList)
      axios.post('/api/add', obj)
        .then(function (response) {
          let data = response.data
          if (data.error) {
            alert('ログインしてください')
            vm.$router.push('/login')
          } else if (data.message) {
            vm.$router.push('/')
          } else {}
        })
    },
    handleOk: function (evt) {
      this.addMondai()
    },
    handleEditOk: function (evt) {
      this.addMondai()
      this.myList.mondai = this.myList.mondai.filter(x => x !== this.tmpMondai)
      this.tmpMondai = {}
    },
    set: function (item) {
      this.newMondai = Object.assign({}, item)
      this.tmpMondai = item
    }
  }
}
</script>
