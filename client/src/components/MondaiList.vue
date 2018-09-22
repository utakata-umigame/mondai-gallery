<template>
  <v-ons-page>
    <h2>{{mondaiList.name}}</h2>
    <p>リスト作成者:{{mondaiList.editor.nickname}}</p>
    <p class="multiline">{{mondaiList.description}}</p>
    <v-ons-button modifier="outline" @click="to(editUrl())" v-bind:to="editUrl()" v-if="isMine">編集</v-ons-button>
    <div>
      <label>サイト</label>
      <v-ons-select v-model='siteFilter'>
        <option value="all">すべて</option>
        <option value="latethink">ラテシン</option>
        <option value="cindy">Cindy</option>
        <option value="R">R鯖</option>
      </v-ons-select>
      <label>ジャンル</label>
      <v-ons-select v-model='genreFilter'>
        <option value="all">すべて</option>
        <option value="umigame">ウミガメ</option>
        <option value="tobira">20の扉</option>
        <option value="kameo">亀夫君問題</option>
        <option value="other">その他</option>
      </v-ons-select>
      <v-ons-button modifier="outline" class="" v-on:click='clearFilter()'>クリア</v-ons-button>
      <label>表示</label>
      <v-ons-select v-model='detail'>
        <option :value="false">リスト</option>
        <option :value="true">詳細</option>
      </v-ons-select>
    </div>
    <div class="row">
      <div class="col-xs-12 col-md-4 mb-2" v-for="item in filter()" v-bind:key="item.id">
        <v-ons-card :title="item.title" :sub-title="item.author" v-if="detail==='true'">
          <mondai-view v-bind:item="item"></mondai-view>
        </v-ons-card>
        <v-ons-list id="all-list" class="mb-1" v-else>
            <a target='_blank' v-bind:href='url(item.site,item.id)'>
              <v-ons-list-item v-bind:title='item.description' tappable modifier="chevron">
                  <small class="text-secondary">{{item.author}}</small>
                  <span>{{ item.title }}</span><br>
                  <span class="notification">{{site[item.site].name}}</span>
                  <span class="notification">{{genre[item.genre]}}</span>
              </v-ons-list-item>
            </a>
        </v-ons-list>
      </div>
    </div>
  </v-ons-page>
</template>
<script>
export default {
  data () {
    return {
      name: 'MondaiList',
      genreFilter: 'all',
      siteFilter: 'all',
      detail: false,
      isMine: false,
      mondaiList: {
        'name': '-',
        'description': '-',
        'editor': {
          'nickname': '-'
        },
        'mondai': [{
          'id': 0,
          'title': '-',
          'author': '-',
          'site': 'latethink',
          'description': '-',
          'genre': 'umigame'
        }]
      }
    }
  },
  computed: {
    site: function () {
      return this.$store.state.site
    },
    genre: function () {
      return this.$store.state.genre
    }
  },
  mounted: function () {
    var vm = this
    var id = this.$route.params.id
    this.$http.get('/api/mondaiList/show/' + id)
      .then(function (response) {
        vm.mondaiList = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
      .then(function () {
        vm.$http.get('/api/user')
          .then((res) => {
            if (res) {
              if (res.data) {
                if (res.data.username === vm.mondaiList.editor.username) {
                  vm.isMine = true
                }
              }
            }
          })
      })
  },
  methods: {
    url: function (siteName, id) {
      return this.site[siteName].showUrl + id
    },
    to: function (url) {
      this.$router.push(url)
    },
    editUrl: function () {
      return '/mondaiList/edit/' + this.mondaiList.id
    },
    filter: function () {
      var filtered = this.mondaiList.mondai
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
<style>
a {
  text-decoration: none;
}
</style>
