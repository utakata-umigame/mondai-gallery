<template>
  <div>
    <h2 class="title">マイページ</h2>
    <div id="profile" class="card">
      <p class="title is-3">{{profile.nickname}}</p>
      <p class="subtitle is-5">{{profile.username}}</p>
      <div class="card-text">
        <p class="multiline">{{ profile.bio }}</p>
        <p>登録日時：{{profile.signup_date}}</p>
      </div>
      <a class="" @click="isEditProfileModalActive=true">編集</a>
    </div>
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
    <div class="panel">
      <p class="panel-heading">作成したリスト</p>
      <a class="panel-block" @click="$router.push(url(item.id))" v-for="item in mondaiList" v-bind:key="item._id">
        <span>{{ item.name }}</span>
        <small class="text-secondary">リスト作成者：{{item.editor.nickname}}</small>
        <b-tag class='is-primary' v-if='item.fromMyMondais'>自作問題のみ</b-tag>
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
  },
  methods: {
    url: function (id) {
      return '/mondaiList/show/' + id
    },
    handleOk: function (evt) {
      this.$http.post('/api/profile/edit', {bio: this.profile.bio})
      this.isEditProfileModalActive = false
    }
  }
}
</script>
<style scoped>
#profile {
  padding: 5px;
  margin-bottom: 2em;
}
</style>
