<template>
  <div>
    <div class="mb-2">
      <label>リスト名</label>
      <input v-model="myList.name" class="form-control" type="text" placeholder="リスト名">
      <label>リストの説明</label>
      <textarea v-model="myList.description" class="form-control" type="text" placeholder="説明"></textarea>
    </div>
    <div class="form-inline">
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
      <button class="form-control btn btn-primary" v-on:click="addMondai()">問題を追加</button>
    </div>
    <button v-on:click="submit()" class="form-control btn btn-primary">リスト作成</button>
    <ul class="list-group" v-for="item in myList.mondai" v-bind:key="item.id">
      <a target='_blank' v-bind:href='url(item.site,item.id)' v-bind:title='item.description' class="list-group-item list-group-item-action">
        <small class="text-secondary">{{item.author}}</small>
        <span>{{ item.title }}</span>
        <span class="badge badge-primary">{{site[item.site].name}}</span>
        <span class="badge badge-info">{{genre[item.genre]}}</span>
      </a>
    </ul>
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
        'editor': '',
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
    addMondai: function () {
      let obj = Object.assign({}, this.newMondai)
      this.myList.mondai.push(obj)
    },
    submit: function () {
      let obj = Object.assign({}, this.myList)
      axios.post((process.env.HOST || 'http://localhost') + ':' + (process.env.PORT || 8000) + '/api/add', obj)
    }
  }
}
</script>
