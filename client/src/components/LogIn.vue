<template>
  <div>
    <h2>ログイン</h2>
    <p class="text-danger">{{error}}</p>
    <div :class="input-group" method="post" class="mb-2">
      <label>ユーザー名</label>
      <input v-model="credential.username" class="form-control mb-2" type="text" name="username" placeholder='User Name' required="required">
      <label>パスワード</label>
      <input v-model="credential.password" class="form-control mb-2" type="password" name="password" placeholder='Password' required="required">
      <b-btn v-on:click="login()" class="btn btn-primary mb-2">ログイン</b-btn>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      credential: {
        username: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    login: function () {
      let vm = this
      axios.post('/api/login', vm.credential)
        .then(function (res) {
          vm.$router.push('/')
          vm.$store.commit('setUser', res.data.user)
        })
        .catch(function (err) {
          if (err) {
            vm.error = '認証に失敗しました。ユーザー名およびパスワードを確認してください。'
          }
        })
    }
  }
}
</script>
