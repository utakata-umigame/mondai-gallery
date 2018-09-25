<template>
  <div>
    <h2 class="title">マイページ</h2>
    <b-card class="mb-2" v-bind:title="profile.nickname"
      v-bind:sub-title=profile.username>
      <div class="card-text">
        <p class="multiline">{{ profile.bio }}</p>
        <p>登録日時：{{profile.signup_date}}</p>
      </div>
      <button class="button is-link" @click="isEditProfileModalActive=true">編集</button>
    </b-card>
    <!--モーダルダイアログ-->
    <b-modal id="myModal" :active.sync="isEditProfileModalActive" title="プロフィールを編集">
      <header class="modal-card-head">
        <p class="modal-card-title">プロフィールを編集</p>
      </header>
      <section class="modal-card-body">
        <b-input
          type="textarea"
          v-model="profile.bio"
          placeholder="自己紹介"
          :rows="6">
        </b-input>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="isEditProfileModalActive = false">キャンセル</button>
        <button class="button is-primary" @click="handleOk">編集</button>
      </footer>
    </b-modal>
    <h3>作成したリスト</h3>
    <div class="panel">
      <a class="panel-block" v-bind:to="url(item.id)" v-for="item in mondaiList" v-bind:key="item._id">
        <span>{{ item.name }}</span>
        <small class="text-secondary">リスト作成者：{{item.editor.nickname}}</small>
        <span class='badge badge-success' v-if='item.fromMyMondais'>自作問題のみ</span>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      profile: {
        nickname: '-',
        username: '-',
        signup_date: '-',
        bio: '-'
      },
      mondaiList: [{
        'id': 0,
        'name': '-',
        'editor': {
          'nickname': '-'
        },
        'fromMyMondais': true
      }],
      isEditProfileModalActive: false
    }
  },
  mounted: function () {
    var vm = this
    this.$http.get('/api/mypage')
      .then(function (res) {
        vm.profile = res.data
        vm.$http.get('/api/mondaiList')
          .then(function (res) {
            vm.mondaiList = res.data.filter(x => x.editor.username === vm.$store.state.user.username)
          })
          .catch(function (error) {
            console.log(error)
          })
      })
      .catch(function (error) {
        console.log(error)
      })
      .then(function () {})
  },
  methods: {
    url: function (id) {
      return '/mondaiList/show/' + id
    },
    handleOk: function (evt) {
      this.$http.post('/api/profile/edit', {bio: this.profile.bio})
    }
  }
}
</script>
