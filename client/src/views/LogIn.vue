<template>
  <div class="page column is-4 is-offset-4">
    <div class="form card mb">
      <b-field label="ユーザー名">
        <b-input v-model="credential.username" class="mb" type="text" name="username" placeholder='User Name'></b-input>
      </b-field>
      <b-field label="パスワード">
        <b-input v-model="credential.password" class="mb" type="password" name="password" placeholder='Password'></b-input>
      </b-field>
      <b-field>
        <button v-on:click="login()" class="button is-primary is-fullwidth"><b-icon icon="login"></b-icon><span>ログイン</span></button>
      </b-field>
    </div>
    <router-link :to="{ name: 'SignUp', params: {} }">新規登録</router-link>
  </div>
</template>
<script>
export default {
  localStorage: {
    user: {
      type: Object,
      default: {
        id: 0,
        nickname: 'Guest',
        username: ''
      }
    }
  },
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
      this.$http.post(this.$endPoint('/api/login'), this.credential)
        .then(function (res) {
          vm.$localStorage.set('user', res.data.user)
          vm.$router.push('/mypage')
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
<style scoped>
.form {
  padding: 20px;
}
</style>
