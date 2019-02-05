<template>
  <div>
    <div class="">
      <div class="has-background-white">
        <div id="profile" class="">
          <section class="section">
            <div class="media">
              <div class="media-left">
                <img :src="profile.picUrl" v-if="profile.picUrl" width="48" height="48" alt="No Image">
                <figure class="image is-48x48" v-else>
                  <b-icon size="is-large" :style="{'color': profile.color||'#555'}" icon="account-box"/>
                </figure>
              </div>
              <div class="media-content">
                <p class="title">{{profile.nickname}}</p>
              </div>
            </div>
            <account-link :profile="profile"></account-link>
          </section>
        </div>
        <!--<div class="card" v-if="profile.update">
          <header class="card-header">
            <p class="card-header-title">最新の更新</p>
          </header>
          <div class="card-content">
            <p>{{profile.update}}</p>
            <p>{{profile.updateDate}}</p>
          </div>
        </div>-->
        <div class="">
          <b-tabs v-model="activeTab" position="is-centered">
            <b-tab-item icon="account-card-details">
              <div class="section">
                <div class="content mb" v-html="renderMarkdown(profile.bio)"></div>
                <p>登録日時：{{profile.signup_date}}</p>
              </div>
              <diagram
                v-if="profile.graph.nodes.length > 0"
                :width="1000"
                :height="800"
                background="#ffffff"
                :editable="false"
                :nodes="profile.graph.nodes"
                :links="profile.graph.links" />
            </b-tab-item>
            <b-tab-item icon="format-list-bulleted">
              <list-link :item="item" v-for="item in mondaiList" v-bind:key="item.id"></list-link>
            </b-tab-item>
            <b-tab-item icon="calendar-today">
              <ScheduleView :schedule="schedule" :color="profile.color"></ScheduleView>
            </b-tab-item>
            <b-tab-item icon="flag" class="section">
              <MilestoneView
                :timelineItems="timeline" />
            </b-tab-item>
          </b-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ScheduleView from '@/components/ScheduleView'
import MilestoneView from '@/components/MilestoneView'
import marked from "@/markdown.js"
export default {
  mixins: [marked],
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
        picUrl: '',
        graph: {
          nodes: [],
          links: []
        }
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
            console.log(JSON.stringify(res.data));
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
