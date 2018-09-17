<template>
  <div>
    <h2>{{myList.name}}</h2>
    <p>作成者:{{myList.editor.nickname}}</p>
    <div class="form-inline mb-2">
      <label>サイト</label>
      <select v-model='siteFilter' class="form-control">
        <option value="all">すべて</option>
        <option value="latethink">ラテシン</option>
        <option value="cindy">Cindy</option>
        <option value="R">R鯖</option>
      </select>
      <label>ジャンル</label>
      <select v-model='genreFilter' class="form-control">
        <option value="all">すべて</option>
        <option value="umigame">ウミガメ</option>
        <option value="tobira">20の扉</option>
        <option value="kameo">亀夫君問題</option>
        <option value="other">その他</option>
      </select>
      <button class="btn btn-danger" v-on:click='clearFilter()'>クリア</button>
    </div>
    <ul class="list-group" v-for="item in filter()" v-bind:key="item.id">
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
      name: '',
      genreFilter: 'all',
      siteFilter: 'all',
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
      myList: []
    }
  },
  mounted: function () {
    var vm = this
    var id = this.$route.params.id
    axios.get('/api/myList/show/' + id)
      .then(function (response) {
        vm.myList = response.data
        var list = response.data.mondai
        for (var i = 0; i < list.length; i++) {
          vm.mondai.push(list[i])
        }
      })
      .catch(function (error) {
        console.log(error)
      })
      .then(function () {})
  },
  methods: {
    url: function (siteName, id) {
      return this.site[siteName].showUrl + id
    },
    filter: function () {
      var filtered = this.myList.mondai
      // ジャンル
      if (this.genreFilter !== 'all') filtered = filtered.filter(x => x.genre === this.genreFilter)
      // サイト
      if (this.siteFilter !== 'all') filtered = filtered.filter(x => x.site === this.siteFilter)

      return filtered
    },
    clearFilter: function () {
      this.genreFilter = 'all'
      this.siteFilter = 'all'
    }
  }
}
</script>
