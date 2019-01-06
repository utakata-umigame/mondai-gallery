<template>
  <div class="column is-4 is-offset-4">
    <div class="form card">
      <b-field label="ニックネーム">
        <b-input v-model="credential.nickname" maxlength="10" type="text" placeholder='NickName'></b-input>
      </b-field>
      <b-field label="ユーザー名">
        <b-input v-model="credential.username" maxlength="10" type="text" name="username" placeholder='User Name'></b-input>
      </b-field>
      <b-field label="パスワード">
        <b-input v-model="credential.password" type="password" maxlength="20" name="password" placeholder='Password' password-reveal></b-input>
      </b-field>
      <button v-on:click="signup()" class="button is-primary is-fullwidth"><b-icon icon="account-plus"></b-icon><span>新規登録</span></button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      credential: {
        nickname: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signup: function () {
      let vm = this
      this.$http.post(this.$endPoint('/api/signup'), vm.credential)
        .then(function (res) {
          if (!res.data.error) {
            vm.$router.push('/login')
          } else {
            vm.$toast.open({
              message: res.data.error,
              type: 'is-danger'
            })
          }
        })
        .catch(function (err) {
          if (err) {
            vm.$toast.open({
              message: 'サーバーのエラーです。',
              type: 'is-danger'
            })
          }
        })
    }
  }
}
</script>
<style scoped>
.form {
  padding: 20px;
}
</style>
