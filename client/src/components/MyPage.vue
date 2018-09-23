<template>
  <div>
    <h2 class="text-center">マイページ</h2>
    <b-card class="mb-2" v-bind:title="profile.nickname"
      v-bind:sub-title=profile.username>
      <div class="card-text">
        <p class="multiline">{{ profile.bio }}</p>
        <p>登録日時：{{profile.signup_date}}</p>
      </div>
      <b-btn v-b-modal.myModal variant="link">編集</b-btn>
    </b-card>
    <!--モーダルダイアログ-->
    <b-modal id="myModal" title="プロフィールを編集" @ok="handleOk">
      <div class="form">
        <b-form-textarea
          v-model="profile.bio"
          placeholder="自己紹介"
          :rows="6">
        </b-form-textarea>
      </div>
    </b-modal>
    <h3>作成したリスト</h3>
    <div class="row">
      <div class="col-xs-12 col-md-4 mb-1" v-for="item in mondaiList" v-bind:key="item._id">
        <router-link v-bind:to="url(item.id)" class="list-group-item list-group-item-action">
          <span>{{ item.name }}</span>
          <small class="text-secondary">リスト作成者：{{item.editor.nickname}}</small>
          <span class='badge badge-success' v-if='item.fromMyMondais'>自作問題のみ</span>
        </router-link>
      </div>
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
      }]
    }
  },
  mounted: function () {
    var vm = this
    this.$http.get('/api/mypage')
      .then(function (res) {
        vm.profile = res.data
      })
      .catch(function (error) {
        console.log(error)
      })
      .then(function () {})
    this.$http.get('/api/mondaiList')
      .then(function (res) {
        vm.mondaiList = res.data.filter(x => x.editor.username === vm.$store.state.user.username)
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
    }
  }
}
</script>
