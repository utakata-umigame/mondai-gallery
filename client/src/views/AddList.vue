<template>
  <div>
    <div>
      <h2 class="title">リストを追加</h2>
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
      <div class="field">
          <b-checkbox v-model="mondaiList.private">
            非公開にする場合はチェック
          </b-checkbox>
      </div>
    </div>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="buttons has-addons">
            <span class="button is-primary is-outlined" @click="isAddMondaiModalActive = true" v-if="isSwitched === '個別編集'"><b-icon icon="plus-circle"></b-icon>&ensp;問題を追加</span>
            <span class="button is-primary is-outlined" @click="addEmpty()" v-else><b-icon icon="plus-circle"></b-icon>&ensp;空の問題を追加</span>
            <span class="button is-outlined is-primary" @click="activateJSONModal"><b-icon icon="json"></b-icon>&ensp;JSONモード</span>
          </div>
        </div>
        <div class="level-item">
          <b-switch v-model="isSwitched" trueValue="一括編集" falseValue="個別編集">
              {{ isSwitched }}
          </b-switch>
      </div>
      </div>
    </div>
    <!-- 問題リスト -->
    <div class="panel">
      <div v-for="item in mondaiList.mondai" v-bind:key="item._id" class="panel-block" >
        <div class="fill" v-if="isSwitched === '一括編集'">
          <div class="columns">
            <mondai-editor :mondai="item"></mondai-editor>
            <div class="column buttons has-addons">
              <button class="button is-outlined is-primary" @click="moveTop(item)"><b-icon icon="arrow-collapse-up">一番上へ</b-icon></button>
              <button class="button is-outlined is-primary" @click="moveUp(item)"><b-icon icon="arrow-up">上へ</b-icon></button>
              <button class="button is-outlined is-primary" @click="moveDown(item)"><b-icon icon="arrow-down">下へ</b-icon></button>
              <button class="button is-outlined is-primary" @click="moveBottom(item)"><b-icon icon="arrow-collapse-down">一番下へ</b-icon></button>
              <button class="button is-outlined is-danger" v-on:click="remove(item)"><b-icon icon="minus-circle">削除</b-icon></button>
            </div>
          </div>
        </div>
        <div :title="item.title" :sub-title="item.author" v-else>
          <mondai-view class="block" v-bind:item="item"></mondai-view>
          <div class="buttons has-addons">
            <button class="button is-outlined is-primary" @click="set(item)"><b-icon icon="pencil">編集</b-icon></button>
              <button class="button is-outlined is-primary" @click="moveTop(item)"><b-icon icon="arrow-collapse-up">一番上へ</b-icon></button>
              <button class="button is-outlined is-primary" @click="moveUp(item)"><b-icon icon="arrow-up">上へ</b-icon></button>
              <button class="button is-outlined is-primary" @click="moveDown(item)"><b-icon icon="arrow-down">下へ</b-icon></button>
              <button class="button is-outlined is-primary" @click="moveBottom(item)"><b-icon icon="arrow-collapse-down">一番下へ</b-icon></button>
            <button class="button is-outlined is-danger" v-on:click="remove(item)"><b-icon icon="minus-circle">削除</b-icon></button>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <div class="buttons has-addons">
        <span @click="confirm()" class="button is-success is-outlined"><b-icon icon="content-save"></b-icon>&ensp;リストを作成</span>
        <span @click="confirmCancel()" class="button is-danger is-outlined"><b-icon icon="close-circle"></b-icon>&ensp;キャンセル</span>
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
          'id': 0,
          'nickname': '',
          'username': ''
        },
        'description': '',
        'private': false,
        'mondai': []
      },
      mondaiJSON: '[]',
      isAddMondaiModalActive: false,
      isEditMondaiModalActive: false,
      isJSONModalActive: false,
      isSwitched: '個別編集'
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
    sort: function () {
      this.mondaiList.mondai.sort((x, y) => x._id - y._id)
    },
    moveTop: function (item) {
      item._id = -1
      this.sort()
      for (let i = 0; i < this.mondaiList.mondai.length; i++){
        this.mondaiList.mondai[i]._id = i
      }
    },
    moveBottom: function (item) {
      item._id = 9999
      this.sort()
      for (let i = 0; i < this.mondaiList.mondai.length; i++){
        this.mondaiList.mondai[i]._id = i
      }
    },
    moveUp: function (item) {
      for (let i = 0; i < this.mondaiList.mondai.length -1; i++){
        if (this.mondaiList.mondai[i+1] === item) {
          let tmp = this.mondaiList.mondai[i]._id
          this.mondaiList.mondai[i]._id = item._id
          item._id = tmp
        }
      }
      this.sort()
    },
    moveDown: function (item) {
      for (let i = 1; i <= this.mondaiList.mondai.length; i++){
        if (this.mondaiList.mondai[i-1] === item) {
          let tmp = this.mondaiList.mondai[i]._id
          this.mondaiList.mondai[i]._id = item._id
          item._id = tmp
        }
      }
      this.sort()
    },
    addEmpty: function () {
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
      this.mondaiList.mondai.push({
        'id': 0,
        'title': '',
        'author': '',
        'site': 'latethink',
        'description': '',
        'genre': 'umigame',
        '_id': id
      })
      this.sort()
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
      this.sort()
    },
    confirm: function () {
      this.$dialog.confirm({
        message: 'リストを追加します。続行しますか?',
        onConfirm: this.submit
      })
    },
    submit: function () {
      let vm = this
      let obj = Object.assign({}, this.mondaiList)
      this.$http.post(this.$endPoint('/api/add'), obj)
        .then(function (response) {
          let data = response.data
          if (data.error) {
            vm.$toast.open({
              'message': 'ログインしてください',
              'type': 'is-danger'
            })
            vm.$router.push('/login')
          } else if (data.message) {
            vm.$router.push('/mondailist')
          }
        })
        .catch(function (err) {
          if (!err) return
          vm.$toast.open({
            'message': 'エラー',
            'type': 'is-danger'
          })
        })
    },
    confirmCancel: function () {
      this.$dialog.confirm({
        message: '未保存の編集は失われます。続行しますか?',
        onConfirm: this.cancel
      })
    },
    cancel: function () {
      this.$router.go(-1)
    },
    // eslint-disable-next-line
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
    // eslint-disable-next-line
    handleEditOk: function (evt) {
      this.mondaiList.mondai = this.mondaiList.mondai.filter(x => x !== this.tmpMondai)
      this.mondaiList.mondai.push(this.newMondai)
      this.sort()
      this.isEditMondaiModalActive = false
    },
    activateJSONModal: function () {
      try {
        let res = JSON.stringify(this.mondaiList.mondai)
        this.mondaiJSON = res
      } catch (err) {
        this.$toast.open({
          'message': 'エラー',
          'type': 'is-danger'
        })
      }
      this.isJSONModalActive = true
    },
    // eslint-disable-next-line
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
        this.$toast.open({
          'message': 'エラー',
          'type': 'is-danger'
        })
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
