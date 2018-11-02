<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <router-link to="/mondailist">
            <span class="icon is-small is-primary">
              <b-icon icon="home"/>
            </span>
            <span>ホーム</span>
          </router-link>
        </li>
        <li class="is-active">
          <a href="#">
            <span class="icon is-small is-primary">
              <b-icon icon="account-box"/>
            </span>
            <span>{{profile.nickname}}</span>
          </a>
        </li>
      </ul>
    </nav>
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
          </div>
        </div>
        <div class="card-text">
          <p class="multiline">{{ profile.bio }}</p>
          <p>登録日時：{{profile.signup_date}}</p>
        </div>
      </div>
    </div>
    <ScheduleView :schedule="schedule" :color="profile.color"></ScheduleView>
    <account-link :profile="profile"></account-link>
    <div class="panel">
      <p class="panel-heading caption-light" :style="{'background-color': profile.color||'#555', 'color': '#fff'}">作成したリスト</p>
      <list-link :item="item" v-for="item in mondaiList" v-bind:key="item.id"></list-link>
    </div>
  </div>
</template>
<script>
import ScheduleView from '@/components/ScheduleView'
export default {
  components: {
    ScheduleView
  },
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
      mondaiList: [],
      schedule: {
        tasks: []
      }
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
        .then(res => {
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
    this.$http.get(this.$endPoint('/api/schedule/' + id))
      .then(doc => {
        if (!doc.data.tasks) return
        this.schedule.tasks = doc.data.tasks.map(t => {
          t.createdDate = new Date(t.createdDate)
          t.endDate = new Date(t.endDate)
          return t
        })
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
