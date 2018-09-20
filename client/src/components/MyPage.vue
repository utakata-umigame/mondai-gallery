<template>
  <div>
    <h2 class="text-center">マイページ</h2>
    <b-card v-bind:title="profile.nickname"
      v-bind:sub-title=profile.username>
      <p class="card-text">
        登録日時：{{profile.signup_date}}
      </p>
      <router-link to="#"
         class="card-link">編集</router-link>
    </b-card>
    <h3>作成したリスト</h3>
    <ul class="list-group" v-for="item in myList" v-bind:key="item._id">
      <router-link v-bind:to="url(item.id)" class="list-group-item list-group-item-action">
        <small class="text-secondary">{{item.editor.nickname}}</small>
        <span>{{ item.name }}</span>
        <span class='badge badge-success' v-if='item.fromMyMondais'>自作問題のみ</span>
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
