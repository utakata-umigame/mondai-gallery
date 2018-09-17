/* global axios */
/* global Vue */

var addList = new Vue({
  el: '#add-list',
  data: {
    newMondai: {
        'id':0,
        'title':'',
        'author':'',
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
      'R': {name: 'Openウミガメ R鯖', showUrl: 'http://openumigame.sakura.ne.jp/openumi/mondai/show/'},
    },
    myList: {
        'name':'',
        'editor': '',
        'description': '',
        'mondai': []
    }
  },
  mounted: function() {
    var vm = this
  },
  methods: {
    url: function(siteName, id) {
      return this.site[siteName].showUrl + id
    },
    addMondai: function() {
        let obj = Object.assign({}, this.newMondai)
        this.myList.mondai.push(obj)
    },
    submit: function() {
        let obj = Object.assign({}, this.myList)
        axios.post('/api/add',obj)
    }
  }
})
