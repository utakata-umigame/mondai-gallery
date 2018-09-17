/* global axios */
/* global Vue */
/* global localStorage */

var mondaiList = new Vue({
  el: '#mondai-list',
  data: {
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
      'R': {name: 'Openウミガメ R鯖', showUrl: 'http://openumigame.sakura.ne.jp/openumi/mondai/show/'},
    },
    myList: {}
  },
  mounted: function() {
    var vm = this
    var id = localStorage.id;
    console.log(localStorage);
    axios.get("/api/myList/show/"+id)
      .then(function(response) {
        vm.myList = response.data
        var list = response.data.mondai
        for(var i=0;i<list.length;i++){
          vm.mondai.push(list[i])
        }
      })
      .catch(function(error) {
        console.log(error)
      })
      .then(function(){
        
      })
  },
  methods: {
    url: function(siteName, id) {
      return this.site[siteName].showUrl + id
    },
    filter: function() {
      var filtered = this.myList.mondai
      //ジャンル
      if(this.genreFilter === 'all') filtered = filtered
      else filtered = filtered.filter(x=>x.genre===this.genreFilter)
      //サイト
      if(this.siteFilter==='all') filtered = filtered;
      else filtered = filtered.filter(x=>x.site===this.siteFilter)

      return filtered;
    },
    clearFilter: function() {
      this.genreFilter = 'all'
      this.siteFilter = 'all'
    }
  }
})
