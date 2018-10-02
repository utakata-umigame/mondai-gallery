<template>
  <div>
    <h2 class="title">ログイン</h2>
    <div class="mb-2" method="post">
      <b-field label="ユーザー名">
        <b-input v-model="credential.username" class="form-control mb-2" type="text" name="username" placeholder='User Name'></b-input>
      </b-field>
      <b-field label="パスワード">
        <b-input v-model="credential.password" class="form-control mb-2" type="password" name="password" placeholder='Password'></b-input>
      </b-field>
      <button v-on:click="login()" class="button is-primary is-outlined mb-2"><b-icon icon="login"></b-icon><span>ログイン</span></button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      credential: {
        username: '',
        password: ''
      },
      showError: false
    }
  },
  methods: {
    login: function () {
      let vm = this
      this.$http.post(this.$endPoint('/api/login'), vm.credential)
        .then(function (res) {
          vm.$router.push('/')
          vm.$store.commit('setUser', res.data.user)
        })
        .catch(function (err) {
          if (err) {
            vm.showError = true
            vm.$toast.open({
              message: '認証に失敗しました。ユーザー名およびパスワードを確認してください。',
              type: 'is-danger'
            })
          }
        })
    }
  }
}
</script>
