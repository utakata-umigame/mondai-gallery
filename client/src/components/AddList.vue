<template>
  <div>
    <div class="mb-2">
      <h2 class="text-center">リストを追加</h2>
      <label>リスト名</label>
      <input v-model="mondaiList.name" class="form-control" type="text" placeholder="リスト名">
      <label>リストの説明</label>
      <textarea v-model="mondaiList.description" class="form-control" type="text" placeholder="説明"></textarea>
      <b-form-checkbox id="checkbox1"
                       v-model="mondaiList.fromMyMondais">
         自作問題のみのリストの場合はチェック
      </b-form-checkbox>
    </div>
    <b-btn-group class="mb-1">
      <b-btn v-b-modal.myModal variant="outline-primary">問題を追加</b-btn>
      <b-btn v-b-modal.stringEditModal v-on:click="stringify()" variant="outline-primary" class="form-control">JSONモード</b-btn>
    </b-btn-group>
    <b-button-group class="mx-1 mb-1">
      <b-btn v-on:click="submit()" variant="outline-success" class="form-control">保存</b-btn>
      <b-btn v-on:click="cancel()" variant="outline-secondary" class="form-control">キャンセル</b-btn>
    </b-button-group>
    <!-- 問題リスト -->
    <div class="row">
      <div v-for="item in mondaiList.mondai" v-bind:key="item._id" class="col-xs-12 col-md-4">
        <b-card :title="item.title" :sub-title="item.author">
          <mondai-view v-bind:item="item"></mondai-view>
          <b-button-group class="mb-1">
            <b-btn v-b-modal.editModal variant="outline-secondary" @click="set(item)">編集</b-btn>
            <b-btn variant="outline-danger" v-on:click="remove(item)">削除</b-btn>
          </b-button-group>
        </b-card>
      </div>
    </div>
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
    <!-- JSONを読み込み -->
    <b-modal id="stringEditModal" title="JSONを読み込み" @ok="handleStringEditOk">
      <p>コピーしたJSON文字列からリストを生成できます</p>
      <div class="form">
        <b-form-textarea
          v-model="mondaiJSON"
          class="form-control"
          placeholder="JSON"
          :rows="5">
        </b-form-textarea>
      </div>
    </b-modal>
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
      newMondai: {
        'id': 0,
        'title': '',
        'author': '',
        'site': 'latethink',
        'description': '',
        'genre': 'umigame'
      },
      tmpMondai: {},
      mondaiList: {
        'name': '',
        'fromMyMondais': false,
        'editor': {
          'nickname': '',
          'username': ''
        },
        'description': '',
        'mondai': []
      },
      mondaiJSON: '[]'
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
  },
  methods: {
    url: function (siteName, id) {
      let res = this.site[siteName].showUrl + id
      return res
    },
    isValidUrl: function (siteName) {
      if (this.site[siteName]) return true
      else return false
    },
    remove: function (item) {
      this.mondaiList.mondai = this.mondaiList.mondai.filter(x => x !== item)
    },
    addMondai: function () {
      let id = 0
      let end = false
      while (!end) {
        end = true
        id++
        for (var key in this.mondaiList.mondai) {
          var item = this.mondaiList.mondai[key]
          if (item._id) {
            if (item._id === id) {
              end = false
            }
          }
        }
      }
      this.newMondai._id = id
      let obj = Object.assign({}, this.newMondai)
      this.mondaiList.mondai.push(obj)
      console.log(this.mondaiList.mondai)
    },
    submit: function () {
      let vm = this
      let obj = Object.assign({}, this.mondaiList)
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
    cancel: function () {
      this.$router.go(-1)
    },
    handleOk: function (evt) {
      this.addMondai()
    },
    handleEditOk: function (evt) {
      this.addMondai()
      this.mondaiList.mondai = this.mondaiList.mondai.filter(x => x !== this.tmpMondai)
      this.tmpMondai = {}
    },
    stringify: function () {
      try {
        let res = JSON.stringify(this.mondaiList.mondai)
        this.mondaiJSON = res
      } catch (err) {
      }
    },
    handleStringEditOk: function (evt) {
      try {
        let obj = JSON.parse(this.mondaiJSON)
        this.mondaiList.mondai = obj.filter(x => this.isValidUrl(x.site))
      } catch (err) {
        console.log(err)
      }
    },
    set: function (item) {
      this.newMondai = Object.assign({}, item)
      this.tmpMondai = item
    }
  }
}
</script>
