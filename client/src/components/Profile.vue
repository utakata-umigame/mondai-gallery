<template>
  <div>
    <h2 class="title">プロフィール</h2>
    <div class="mb-2" v-bind:title="profile.nickname">
      <div class="card-text">
        <p class="multiline">{{ profile.bio }}</p>
        <p>登録日時：{{profile.signup_date}}</p>
      </div>
    </div>
    <h3>作成したリスト</h3>
    <div class="panel">
      <a class="panel-block" v-for="item in mondaiList" v-bind:key="item._id" @click="$router.push(url(item.id))">
        <span>{{ item.name }}</span>
        <small class="text-secondary">リスト作成者：{{item.editor.nickname}}</small>
        <span class='badge badge-success' v-if='item.fromMyMondais'>自作問題のみ</span>
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
