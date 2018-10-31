<template>
  <div>
    <div id="profile" class="card">
      <div class="card-content">
        <p class="title is-4"><b-icon size="is-medium" :style="{'color': profile.color||'#333'}" icon="account-box"/>{{profile.nickname}}</p>
        <p class="subtitle is-6">{{profile.username}}</p>
        <div class="card-text">
          <p class="multiline">{{ profile.bio }}</p>
          <p>登録日時：{{profile.signup_date}}</p>
        </div>
        <a class="" @click="$router.push('/mypage/edit')">編集</a>
        <a class="" @click="$router.push('/schedule/edit/' + profile.id)">スケジュール</a>
      </div>
    </div>
    <account-link :profile="profile"></account-link>
    <div class="panel">
      <p class="panel-heading caption-light" :style="{'background-color': profile.color||'#333', 'color': '#fff'}">作成したリスト</p>
      <list-link :item="item" v-for="item in mondaiList" v-bind:key="item.id"></list-link>
    </div>
  </div>
</template>
<script>
export default {
  localStorage: {
    profile: {
      type: Object,
      default: {
        nickname: '',
        username: '',
        signup_date: '',
        bio: '',
        latethink: '',
        cindy: '',
        R: '',
        latelate: '',
        latePro: '',
        twitter: '',
        github: '',
        color: ''
      }
    }
  },
  data () {
    return {
      profile: {
        nickname: '',
        username: '',
        signup_date: '',
        bio: '',
        latethink: '',
        cindy: '',
        R: '',
        latelate: '',
        latePro: '',
        twitter: '',
        github: ''
      },
      mondaiList: [],
      isEditProfileModalActive: false
    }
  },
  mounted: function () {
    let data = this.$localStorage.get('profile')
    if (data) {
      this.profile = data
    }
    let vm = this
    this.$http.get(this.$endPoint('/api/mypage'))
      .then(function (res) {
        vm.profile = res.data
        vm.$localStorage.set('profile', vm.profile)
        vm.$http.get(vm.$endPoint('/api/mylist'))
          .then(function (res) {
            vm.mondaiList = res.data
          })
          .catch(function (error) {
            vm.$toast.open({
              'message': error.message,
              'type': 'is-danger'
            })
          })
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    url: function (id) {
      return '/mondaiList/show/' + id
    },
    handleOk: function (evt) {
      this.$http.post(this.$endPoint('/api/profile/edit'), this.profile)
      this.isEditProfileModalActive = false
    }
  }
}
</script>
<style scoped>
#profile {
  padding: 5px;
  margin-bottom: 2em;
}
</style>
