<template>
  <div>
    <h2 class="title">プロフィール</h2>
    <div id="profile" class="card">
      <p class="title is-4">{{profile.nickname}}</p>
      <div class="card-text">
        <p class="multiline">{{ profile.bio }}</p>
        <p>登録日時：{{profile.signup_date}}</p>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" target="_blank" v-bind:href="profileUrl('http://sui-hei.net/mondai/profile/', profile.latethink)" v-if="profile.latethink">ラテシン<b-icon icon="open-in-new"></b-icon></a>
        <a class="card-footer-item" target="_blank" v-bind:href="profileUrl('https://www.cindythink.com/profile/show/', profile.cindy)" v-if="profile.cindy">Cindy<b-icon icon="open-in-new"></b-icon></a>
        <a class="card-footer-item" target="_blank" v-bind:href="profileUrl('http://openumigame.sakura.ne.jp/openumi/Mmail/userpage/', profile.R)" v-if="profile.R">R鯖<b-icon icon="open-in-new"></b-icon></a>
        <a class="card-footer-item" target="_blank" v-bind:href="profileUrl('https://twitter.com/', profile.twitter)" v-if="profile.twitter"><b-icon icon="twitter"></b-icon>Twitter<b-icon icon="open-in-new"></b-icon></a>
        <a class="card-footer-item" target="_blank" v-bind:href="profileUrl('https://github.com/', profile.github)" v-if="profile.github"><b-icon icon="github-circle"></b-icon>GitHub<b-icon icon="open-in-new"></b-icon></a>
      </footer>
    </div>
    <div class="panel">
      <p class="panel-heading">作成したリスト</p>
      <list-link :item="item" v-for="item in mondaiList" v-bind:key="item.id"></list-link>
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
        signup_date: '-',
        latethink: '',
        cindy: '',
        R: '',
        twitter: '',
        github: ''
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
    },
    profileUrl: function (site, id) {
      return site + id
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
