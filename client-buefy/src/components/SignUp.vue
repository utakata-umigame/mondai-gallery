<template>
  <div>
    <h2 class="title">ユーザー登録</h2>
    <div method="post" class="mb-2">
      <b-field label="ニックネーム">
        <b-input v-model="credential.nickname" type="text" name="nickname" placeholder='NickName'></b-input>
      </b-field>
      <b-field label="ユーザー名">
        <b-input v-model="credential.username" type="text" name="username" placeholder='User Name'></b-input>
      </b-field>
      <b-field label="パスワード">
        <b-input v-model="credential.username" type="password" name="password" placeholder='Password'></b-input>
      </b-field>
      <button v-on:click="signup()" class="button is-primary is-outlined">新規登録</button>
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
      this.$http.post('/api/signup', vm.credential)
        .then(function (res) {
          if (!res.data.error) {
            vm.$router.push('/login')
          } else {
          }
        })
        .catch(function (err) {
          if (err) {
            console.log(err)
            vm.$toast.open({
              message: 'サーバーのエラーです。',
              type: 'is-danger'
            })
            vm.showError = true
          }
        })
    }
  }
}
</script>
