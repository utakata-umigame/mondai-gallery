<template>
  <div>
    <div class="columns">
      <div class="column is-one-third">
        <div id="profile" class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <b-icon size="is-large" :style="{'color': profile.color||'#555'}" icon="account-box"/>
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{profile.nickname}}</p>
                <p class="subtitle is-6">{{profile.username}}</p>
              </div>
            </div>
            <div class="card-text">
              <account-link :profile="profile"></account-link>
              <p class="multiline">{{ profile.bio }}</p>
              <p>登録日時：{{profile.signup_date}}</p>
            </div>
            <a class="mr" @click="$router.push('/mypage/edit')">編集</a>
            <a class="" @click="$router.push('/schedule/edit/' + profile.id)">スケジュール</a>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="panel">
          <div class="panel-heading caption-light" :style="{'background-color': profile.color||'#555'}">
            <a class="mr"　@click="show='list'" style="color: #fff;"><span>作成したリスト</span></a>
            <a @click="show='schedule'" style="color: #fff;"><b-icon icon="calendar-today"/><span>スケジュール</span></a>
          </div>
          <list-link v-if="show==='list'" :item="item" v-for="item in mondaiList" v-bind:key="item.id"></list-link>
          <ScheduleView v-if="show==='schedule'" :schedule="schedule" :color="profile.color"></ScheduleView>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ScheduleView from '@/components/ScheduleView'
export default {
  components: {
    ScheduleView
  },
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
      schedule: {
        tasks: []
      },
      isEditProfileModalActive: false,
      show: 'list'
    }
  },
  mounted: function () {
    let data = this.$localStorage.get('profile')
    if (data) {
      this.profile = data
    }
    let vm = this
    this.$http.get(this.$endPoint('/api/mypage'))
      .then(res => {
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
        vm.$http.get(vm.$endPoint('/api/schedule/' + vm.profile.id))
          .then(doc => {
            vm.schedule.tasks = doc.data.tasks.map(t => {
              t.createdDate = new Date(t.createdDate)
              t.endDate = new Date(t.endDate)
              return t
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
