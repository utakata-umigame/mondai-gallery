<template>
  <div>
    <h2 class="title">プロフィール</h2>
    <div id="profile" class="card">
      <p class="title is-4">{{profile.nickname}}</p>
      <div class="card-text">
        <p class="multiline">{{ profile.bio }}</p>
        <p>登録日時：{{profile.signup_date}}</p>
      </div>
    </div>
    <div class="panel">
      <p class="panel-heading">作成したリスト</p>
      <a class="panel-block" v-for="item in mondaiList" v-bind:key="item._id" @click="$router.push(url(item.id))">
        <span>{{ item.name }}</span>
        <small class="is-secondary">リスト作成者：{{item.editor.nickname}}</small>
        <b-tag class="is-primary" v-if='item.fromMyMondais'>自作問題のみ</b-tag>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      profile: {
        id: 0,
        nickname: '-',
        bio: '-',
        signup_date: '-'
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
    let vm = this
    let id = this.$route.params.id
    this.$http.get('/api/profile/show/' + id)
      .then(function (res) {
        if (res) {
          vm.profile = res.data
          vm.$http.get('/api/mondaiList')
            .then(function (res) {
              if (res) {
                vm.mondaiList = res.data.filter(x => x.editor.id === vm.profile.id)
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    url: function (id) {
      return '/mondaiList/show/' + id
    }
  }
}
</script>
<style scoped>
#profile {
  margin-bottom: 2em;
  padding: 5px;
}
</style>
