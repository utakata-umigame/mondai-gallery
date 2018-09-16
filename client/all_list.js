/* global axios */
/* global Vue */
/* global localStorage */

var allList = new Vue({
  el: '#all-list',
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
    axios.get("/api/myList")
      .then(function(response) {
        vm.myList = response.data
      })
      .catch(function(error) {
        console.log(error)
      })
      .then(function(){
        
      })
  },
  methods: {
    setId: function(id) {
        localStorage.id = id
    }
  }
})
