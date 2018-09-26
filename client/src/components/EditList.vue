<template>
  <div>
    <div class="mb-2">
      <h2 class="title">リストを編集</h2>
      <b-field label="リスト名">
        <b-input v-model="mondaiList.name" type="text" placeholder="リスト名" maxlength="30">
        </b-input>
      </b-field>
      <b-field label="リストの説明">
        <b-input v-model="mondaiList.description" placeholder="説明" type="textarea" maxlength="200">
        </b-input>
      </b-field>
      <div class="field">
          <b-checkbox v-model="mondaiList.fromMyMondais">
            自作問題のみのリストの場合はチェック
          </b-checkbox>
      </div>
    </div>
    <div class="level">
      <div class="buttons has-addons">
        <span class="button" @click="isAddMondaiModalActive = true">問題を追加</span>
        <span class="button" @click="activateJSONModal">JSONモード</span>
      </div>
      <div class="buttons has-addons">
        <span @click="submit()" class="button">保存</span>
        <span @click="cancel()" class="button">キャンセル</span>
      </div>
    </div>
    <!-- 問題リスト -->
    <div class="panel">
      <div v-for="item in mondaiList.mondai" v-bind:key="item._id" class="panel-block">
        <div :title="item.title" :sub-title="item.author">
          <mondai-view v-bind:item="item"></mondai-view>
          <div class="buttons has-addons">
            <button class="button is-outlined" @click="set(item)">編集</button>
            <button class="button is-outlined is-danger" v-on:click="remove(item)">削除</button>
          </div>
        </div>
      </div>
    </div>
    <!--モーダルダイアログ-->
    <b-modal id="myModal" :active.sync="isAddMondaiModalActive" has-modal-card>
      <header class="modal-card-head">
        <p class="modal-card-title">問題を追加</p>
      </header>
      <section>
        <mondai-dialog :mondai="newMondai"></mondai-dialog>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="isAddMondaiModalActive = false">キャンセル</button>
        <button class="button is-primary" @click="handleOk">追加</button>
      </footer>
    </b-modal>
    <b-modal id="editModal" :active.sync="isEditMondaiModalActive" has-modal-card>
      <header class="modal-card-head">
        <p class="modal-card-title">問題を編集</p>
      </header>
      <mondai-dialog :mondai="newMondai"></mondai-dialog>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="isEditMondaiModalActive = false">キャンセル</button>
        <button class="button is-primary" @click="handleEditOk">編集</button>
      </footer>
    </b-modal>
    <!-- JSONを読み込み -->
    <b-modal id="stringEditModal" :active.sync="isJSONModalActive" @ok="handleStringEditOk">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">JSONを読み込み</p>
        </header>
        <section class="modal-card-body">
          <b-field label="コピーしたJSON文字列からリストを生成できます">
            <b-input
              type="textarea"
              v-model="mondaiJSON"
              class="form-control"
              placeholder="JSON"
              :rows="6">
            </b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="isJSONModalActive = false">キャンセル</button>
          <button class="button is-primary" @click="handleStringEditOk">読み込み</button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>
<script>
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
      mondaiJSON: ''
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
    let id = this.$route.params.id
    let vm = this
    this.$http.get('/api/mondaiList/show/' + id)
      .then(function (response) {
        vm.mondaiList = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    url: function (siteName, id) {
      return this.site[siteName].showUrl + id
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
      this.$http.post('/api/mondaiList/edit/' + this.mondaiList.id, this.mondaiList)
        .then(function (response) {
          let data = response.data
          if (data.error) {
            vm.$toast.open({
              'message': 'ログインしてください',
              'type': 'is-danger'
            })
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
      this.newMondai = {
        'id': 0,
        'title': '',
        'author': '',
        'site': 'latethink',
        'description': '',
        'genre': 'umigame'
      }
      this.isAddMondaiModalActive = false
    },
    handleEditOk: function (evt) {
      this.addMondai()
      this.mondaiList.mondai = this.mondaiList.mondai.filter(x => x !== this.tmpMondai)
      this.tmpMondai = {}
      this.isEditMondaiModalActive = false
    },
    activateJSONModal: function () {
      try {
        let res = JSON.stringify(this.mondaiList.mondai)
        this.mondaiJSON = res
      } catch (err) {
      }
      this.isJSONModalActive = true
    },
    handleStringEditOk: function (evt) {
      try {
        let obj = JSON.parse(this.mondaiJSON)
        this.mondaiList.mondai = obj.filter(x => this.isValidUrl(x.site))
          .map(x => {
            return {
              id: x.id,
              title: x.title,
              author: x.author,
              site: x.site,
              description: x.description,
              genre: x.genre,
              _id: x._id
            }
          })
      } catch (err) {
        console.log(err)
      }
      this.isJSONModalActive = false
    },
    set: function (item) {
      this.newMondai = Object.assign({}, item)
      this.tmpMondai = item
      this.isEditMondaiModalActive = true
    }
  }
}
</script>
