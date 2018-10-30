<template>
  <div>
    <div id="profile" class="card">
      <div class="card-content">
        <p class="title is-4"><b-icon :style="{'color': profile.color||'#000'}" icon="account-box"/>{{profile.nickname}}</p>
        <div class="card-text">
          <p class="multiline">{{ profile.bio }}</p>
          <p>登録日時：{{profile.signup_date}}</p>
        </div>
      </div>
    </div>
    <account-link :profile="profile"></account-link>
    <div class="panel">
      <p class="panel-heading" :style="{'background-color': profile.color||'#333', 'color': '#fff'}">作成したリスト</p>
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
        nickname: '',
        bio: '',
        signup_date: '',
        latethink: '',
        cindy: '',
        R: '',
        latelate: '',
        latePro: '',
        twitter: '',
        github: '',
        color: ''
      },
      mondaiList: []
    }
  },
  mounted: function () {
    let vm = this
    let id = this.$route.params.id
    let prof = this.$store.state.savedProfiles[id]
    if (prof) {
      this.profile = prof
    } else {
      this.$http.get(this.$endPoint('/api/profile/show/' + id))
        .then(function (res) {
          if (res) {
            vm.profile = res.data
            vm.$store.commit('setSavedProfile', vm.profile)
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
    this.$http.get(this.$endPoint('/api/userlist/' + id))
      .then(function (res) {
        if (res) {
          vm.mondaiList = res.data
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
