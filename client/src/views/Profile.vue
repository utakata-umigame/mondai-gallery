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
    <div class="columns">
      <div class="column is-one-third">
        <div id="profile" class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <img :src="profile.picUrl" v-if="profile.picUrl" width="48" height="48" alt="No Image">
                <figure class="image is-48x48" v-else>
                  <b-icon size="is-large" :style="{'color': profile.color||'#555'}" icon="account-box"/>
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{profile.nickname}}</p>
              </div>
            </div>
            <div class="card-text">
              <account-link :profile="profile"></account-link>
              <p class="multiline mb">{{ profile.bio }}</p>
              <p>登録日時：{{profile.signup_date}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <b-tabs v-model="activeTab" position="is-centered" class="block" expanded>
          <b-tab-item label="すべてのリスト">
            <list-link :item="item" v-for="item in mondaiList" v-bind:key="item.id"></list-link>
          </b-tab-item>
          <b-tab-item label="スケジュール" icon="calendar-today">
            <ScheduleView :schedule="schedule" :color="profile.color"></ScheduleView>
          </b-tab-item>
          <b-tab-item label="マイルストーン">
            <MilestoneView :timelineItems="timeline" />
          </b-tab-item>
        </b-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import ScheduleView from '@/components/ScheduleView'
import MilestoneView from '@/components/MilestoneView'
export default {
  components: {
    ScheduleView,
    MilestoneView
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
        color: '',
        picUrl: ''
      },
      mondaiList: [],
      timeline: [],
      schedule: {
        tasks: []
      },
      activeTab: 0
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
  this.$http.get(this.$endPoint('/api/milestone/' + id))
    .then(doc => {
      if (doc.data.timeline) this.timeline = doc.data.timeline
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
