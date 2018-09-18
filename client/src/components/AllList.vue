<template>
  <div id="all-list">
    <ul class="list-group" v-for="item in myList" v-bind:key="item._id">
      <router-link v-bind:to="url(item.id)" class="list-group-item list-group-item-action">
        <small class="text-secondary">{{item.editor.nickname}}</small>
        <span>{{ item.name }}</span>
      </router-link>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      name: 'abab',
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
    axios.get('/api/myList')
      .then(function (response) {
        vm.myList = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
      .then(function () {})
  },
  methods: {
    url: function (id) {
      return '/myList/show/' + id
    }
  }
}
</script>
