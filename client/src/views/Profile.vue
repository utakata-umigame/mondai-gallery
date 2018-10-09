<template>
  <div>
    <div id="profile" class="card">
      <div class="card-content">
        <p class="title is-4">{{profile.nickname}}</p>
        <div class="card-text">
          <p class="multiline">{{ profile.bio }}</p>
          <p>登録日時：{{profile.signup_date}}</p>
        </div>
      </div>
    </div>
    <account-link :profile="profile"></account-link>
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
        latelate: '',
        latePro: '',
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
    this.$http.get(this.$endPoint('/api/profile/show/' + id))
      .then(function (res) {
        if (res) {
          vm.profile = res.data
          vm.$http.get(vm.$endPoint('/api/mondaiList'))
            .then(function (res) {
              if (res) {
                vm.mondaiList = res.data.filter(x => x.editor.id === vm.profile.id)
              }
            })
            .catch(function (error) {
              if (error) {
                this.$toast.open({
                  'message': 'error',
                  'type': 'is-danger'
                })
              }
            })
        }
      })
      .catch(function (error) {
        if (error) {
          this.$toast.open({
            'message': 'error',
            'type': 'is-danger'
          })
        }
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
