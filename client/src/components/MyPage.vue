<template>
  <div>
    <h2>マイページ</h2>
    <h3>{{profile.nickname}}</h3>
    <h3 class="text-secondary">{{profile.username}}</h3>
    <p>登録日時:{{profile.signup_date}}</p>
    <h3>作成したリスト</h3>
    <ul class="list-group" v-for="item in myList" v-bind:key="item._id">
      <router-link v-bind:to="url(item.id)" class="list-group-item list-group-item-action">
        <small class="text-secondary">{{item.editor.nickname}}</small>
        <span>{{ item.name }}</span>
      </router-link>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      profile: {
        nickname: '',
        username: '',
        signup_date: ''
      },
      myList: []
    }
  },
  mounted: function () {
    var vm = this
    axios.get('/api/mypage')
      .then(function (res) {
        vm.profile = res.data
      })
      .catch(function (error) {
        console.log(error)
      })
      .then(function () {})
    axios.get('/api/myList')
      .then(function (res) {
        vm.myList = res.data.filter(x => x.editor.username === vm.$store.state.user.username)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    url: function (id) {
      return '/myList/show/' + id
    }
  }
}
</script>
