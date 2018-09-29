<template>
  <div>
    <h2 class="title">マイページ</h2>
    <div id="profile" class="card">
      <p class="title is-4">{{profile.nickname}}</p>
      <p class="subtitle is-6">{{profile.username}}</p>
      <div class="card-text">
        <p class="multiline">{{ profile.bio }}</p>
        <p>登録日時：{{profile.signup_date}}</p>
      </div>
      <a class="" @click="isEditProfileModalActive=true">編集</a>
      <account-link :profile="profile"></account-link>
    </div>
    <!--モーダルダイアログ-->
    <b-modal id="myModal" :active.sync="isEditProfileModalActive" title="プロフィールを編集">
      <header class="modal-card-head">
        <p class="modal-card-title">プロフィールを編集</p>
      </header>
      <section class="modal-card-body">
        <b-input
          type="textarea"
          v-model.trim="profile.bio"
          placeholder="自己紹介"
          :rows="6">
        </b-input>
        <label>アカウントID(任意記入)</label>
        <b-field
          label="ラテシンのID">
          <b-input
            type="number"
            v-model = "profile.latethink"
            placeholder=".../mondai/profile/[ID]">
          </b-input>
        </b-field>
        <b-field
          label="CindyのID">
          <b-input
            type="number"
            v-model = "profile.cindy"
            placeholder=".../profile/show/[ID]">
          </b-input>
        </b-field>
        <b-field
          label="R鯖のID">
          <b-input
            type="number"
            v-model = "profile.R"
            placeholder=".../Mmail/userpage/[ID]">
          </b-input>
        </b-field>
        <b-field
          label="TwitterのID">
          <b-input
            type="text"
            v-model = "profile.twitter"
            placeholder=".../twitter.com/[ID]">
          </b-input>          
        </b-field>
        <b-field 
          label="GitHubのID">
          <b-input
            type="text"
            v-model = "profile.github"
            placeholder=".../github.com/[ID]">
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="isEditProfileModalActive = false">キャンセル</button>
        <button class="button is-primary" @click="handleOk">編集</button>
      </footer>
    </b-modal>
    <div class="panel">
      <p class="panel-heading">作成したリスト</p>
      <list-link :item="item" v-for="item in mondaiList" v-bind:key="item.id"></list-link>
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
        bio: '-',
        latethink: '',
        cindy: '',
        R: '',
        twitter: '',
        github: ''
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
      this.$http.post('/api/profile/edit', this.profile)
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
