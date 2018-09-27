<template>
  <div>
    <h2 class="title">問題リスト</h2>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <span>サイト</span>
          <b-select placeholder="Select a name" v-model="siteFilter">
            <option value="all">すべて</option>
            <option value="latethink">ラテシン</option>
            <option value="cindy">Cindy</option>
            <option value="R">R鯖</option>
          </b-select>
        </div>
        <div class="level-item">
          <span>ジャンル</span>
          <b-select placeholder="Select a genre" v-model="genreFilter">
            <option value="all">すべて</option>
            <option value="umigame">ウミガメ</option>
            <option value="tobira">20の扉</option>
            <option value="kameo">亀夫君問題</option>
            <option value="other">その他</option>
          </b-select>
        </div>
        <div class="level-item">
          <a class="button is-outlined is-danger" v-on:click='clearFilter()'>クリア</a>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <span>表示</span>
          <b-select v-model='detail'>
            <option :value="false">リスト</option>
            <option :value="true">詳細</option>
          </b-select>
        </div>
        <div class="level-item">
          <button class="button is-outlined is-secondary" @click="$router.push(editUrl())" v-if="isMine">編集</button>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-heading">
        <span class="title is-4">{{mondaiList.name}}</span>
        <span class="subtitle is-6">リスト作成者:<a @click="to(profileUrl())">{{mondaiList.editor.nickname}}</a></span>
        <p class="multiline">{{mondaiList.description}}</p>
      </div>
      <a class="panel-block" v-for="item in filter()" v-bind:key="item.id" target='_blank' v-bind:href='url(item.site,item.id)'>
        <div v-if="detail">
          <mondai-view v-bind:item="item"></mondai-view>
        </div>
        <div class="level" v-else>
          <div class="level-left">
            <div class="level-item">
            <small>{{item.author}}</small>
            <span>{{ item.title }}</span>
            </div>
          </div>
          <div class="level-right">
            <b-tag class="is-primary level-item">{{site[item.site].name}}</b-tag>
            <b-tag class="is-info level-item">{{genre[item.genre]}}</b-tag>
          </div>
        </div>
      </a>
    </div>
  </div>
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
          'id': 0,
          'username': '-',
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
    editUrl: function () {
      return '/mondaiList/edit/' + this.mondaiList.id
    },
    profileUrl: function () {
      return '/profile/show/' + this.mondaiList.editor.id
    },
    to: function (url) {
      this.$router.push(url)
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
<style scoped>
.level {
  width: 100%;
}
</style>
