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
      <div class="level-left">
        <div class="buttons has-addons level-item">
          <span class="button is-primary is-outlined" @click="isAddMondaiModalActive = true"><b-icon icon="plus-circle"></b-icon>&ensp;問題を追加</span>
          <span class="button is-outlined is-primary" @click="activateJSONModal"><b-icon icon="json"></b-icon>&ensp;JSONモード</span>
        </div>
      </div>
      <div class="level-right">
        <div class="buttons has-addons level-item">
          <span @click="submit()" class="button is-success is-outlined"><b-icon icon="content-save"></b-icon>&ensp;保存</span>
          <span @click="cancel()" class="button is-danger is-outlined"><b-icon icon="close-circle"></b-icon>&ensp;キャンセル</span>
        </div>
      </div>
    </div>
    <!-- 問題リスト -->
    <div class="panel">
      <div v-for="item in mondaiList.mondai" v-bind:key="item._id" class="panel-block">
        <div :title="item.title" :sub-title="item.author">
          <mondai-view class="block" v-bind:item="item"></mondai-view>
          <div class="buttons has-addons">
            <button class="button is-outlined is-primary" @click="set(item)"><b-icon icon="pencil"></b-icon><span>編集</span></button>
            <button class="button is-outlined is-danger" v-on:click="remove(item)"><b-icon icon="minus-circle"></b-icon><span>削除</span></button>
          </div>
        </div>
      </div>
    </div>
    <!--モーダルダイアログ-->
    <b-modal id="myModal" :active.sync="isAddMondaiModalActive" has-modal-card>
      <div class="modal-card">
        <div class="modal-card-body">
          <mondai-dialog :mondai="newMondai"></mondai-dialog>
          <button class="button" type="button" @click="isAddMondaiModalActive = false">キャンセル</button>
          <button class="button is-primary" @click="handleOk">追加</button>
        </div>
      </div>
    </b-modal>
    <b-modal id="editModal" :active.sync="isEditMondaiModalActive" has-modal-card>
      <div class="modal-card">
        <div class="modal-card-body">
          <mondai-dialog :mondai="newMondai"></mondai-dialog>
          <button class="button" type="button" @click="isEditMondaiModalActive = false">キャンセル</button>
          <button class="button is-primary" @click="handleEditOk">編集</button>
        </div>
      </div>
    </b-modal>
    <!-- JSONを読み込み -->
    <b-modal id="stringEditModal" :active.sync="isJSONModalActive">
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
      mondaiJSON: '',
      isAddMondaiModalActive: false,
      isEditMondaiModalActive: false,
      isJSONModalActive: false
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
              'message': '編集権限がありません。',
              'type': 'is-danger'
            })
          } else if (data.message) {
            vm.$router.push('/')
          } else {}
        })
        .catch(function (error) {
          if (!error) return
          vm.$toast.open({
            'message': 'ログインしてください。',
            'type': 'is-danger'
          })
          vm.$router.push('/login')
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
