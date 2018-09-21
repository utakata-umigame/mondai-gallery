<template>
  <div>
    <h2 class="text-center">{{mondaiList.name}}</h2>
    <p>リスト作成者:{{mondaiList.editor.nickname}}</p>
    <p class="multiline">{{mondaiList.description}}</p>
    <v-ons-button modifier="outline" class="btn btn-outline-secondary mb-2" v-bind:to="editUrl()" v-if="isMine">編集</v-ons-button>
    <div class="form-inline mb-2">
      <label class="mx-1">サイト</label>
      <v-ons-select v-model='siteFilter' class="form-control">
        <option value="all">すべて</option>
        <option value="latethink">ラテシン</option>
        <option value="cindy">Cindy</option>
        <option value="R">R鯖</option>
      </v-ons-select>
      <label class="mx-1">ジャンル</label>
      <v-ons-select v-model='genreFilter' class="form-control">
        <option value="all">すべて</option>
        <option value="umigame">ウミガメ</option>
        <option value="tobira">20の扉</option>
        <option value="kameo">亀夫君問題</option>
        <option value="other">その他</option>
      </v-ons-select>
      <v-ons-button modifier="outline" class="" v-on:click='clearFilter()'>クリア</v-ons-button>
      <label class="text-right mx-1">表示</label>
      <v-ons-select v-model='detail' class="form-control">
        <option :value="false">リスト</option>
        <option :value="true">詳細</option>
      </v-ons-select>
    </div>
    <div class="row">
      <div class="col-xs-12 col-md-4 mb-2" v-for="item in filter()" v-bind:key="item.id">
        <v-ons-card :title="item.title" :sub-title="item.author" v-if="detail">
          <mondai-view v-bind:item="item"></mondai-view>
        </v-ons-card>
        <v-ons-list id="all-list" class="mb-1" v-else>
          <v-ons-list-item target='_blank' v-bind:href='url(item.site,item.id)' v-bind:title='item.description' class="list-group-item list-group-item-action">
            <small class="text-secondary">{{item.author}}</small>
            <span>{{ item.title }}</span><br>
            <span class="badge badge-primary">{{site[item.site].name}}</span>
            <span class="badge badge-info">{{genre[item.genre]}}</span>
          </v-ons-list-item>
        </v-ons-list>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import MondaiView from './MondaiView.vue'
Vue.component('mondai-view', MondaiView)
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
    axios.get('/api/mondaiList/show/' + id)
      .then(function (response) {
        vm.mondaiList = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
      .then(function () {
        axios.get('/api/user')
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
