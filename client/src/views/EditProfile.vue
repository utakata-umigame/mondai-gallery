<template>
  <div>
    <h2 class="title">プロフィールを編集</h2>
    <div class="mb">
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
        label="らてらて鯖のID">
        <b-input
          type="number"
          v-model = "profile.latelate"
          placeholder=".../mondai/profile/[ID]">
        </b-input>
      </b-field>
      <b-field
        label="らてしんPROのID">
        <b-input
          type="number"
          v-model = "profile.latePro"
          placeholder=".../users/profile/[ID]">
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
    </div>
    <div class="buttons has-addons">
      <span class="button is-primary is-outlined" @click="submit">保存</span>
      <span class="button is-danger is-outlined" @click="$router.push('/mypage')">キャンセル</router-link></span>
    </div>
  </div>
</template>
<script>
export default{
  mounted: function () {
    var vm = this
    this.$http.get(this.$endPoint('/api/mypage'))
      .then(function (res) {
        vm.profile = res.data
      })
      .catch(function (error) {
        if (error) {
          vm.$toast.open({
            'message': 'エラー',
            'type': 'is-danger'
          })
        }
      })
  },
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
        latelate: '',
        latePro: '',
        twitter: '',
        github: ''
      }
    }
  },
  methods: {
    submit: function () {
      let vm = this
      this.$http.post(this.$endPoint('/api/profile/edit'), this.profile)
        .catch(function (err){
          if (err) {
            vm.$toast.open({
              'message': 'エラー',
              'type': 'is-danger'
            })
          }
        })
        .then(function (res) {
          vm.$router.push('/mypage')
        })
    }
  }
}
</script>
<style scoped>
.mb {
  margin-bottom: 10px;
}
</style>
