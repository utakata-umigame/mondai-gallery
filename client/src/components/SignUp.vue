<template>
  <div>
    <h2 class="text-center">ユーザー登録</h2>
    <p class="text-danger">{{error}}</p>
    <div method="post" class="mb-2">
      <label>ニックネーム</label>
      <input v-model="credential.nickname" class="form-control mb-2" type="text" name="nickname" placeholder="Nickname" required="required">
      <label>ユーザー名(英数、必須)</label>
      <input v-model="credential.username" class="form-control mb-2" type="text" name="username" placeholder='User Name' required="required">
      <label>パスワード(英数、必須)</label>
      <input v-model="credential.password" class="form-control mb-2" type="password" name="password" placeholder='Password' required="required">
      <b-btn v-on:click="signup()" variant="outline-primary" class="mb-2">新規登録</b-btn>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      credential: {
        nickname: '',
        username: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    signup: function () {
      let vm = this
      axios.post('/api/signup', vm.credential)
        .then(function (res) {
          if (!res.data.error) {
            vm.$router.push('/login')
          } else {
            vm.error = res.data.error
          }
        })
        .catch(function (err) {
          if (err) {
            console.log(err)
          }
        })
    }
  }
}
</script>
