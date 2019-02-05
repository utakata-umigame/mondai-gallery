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
                <p class="subtitle">{{profile.username}}</p>
              </div>
            </div>
            <account-link :profile="profile"></account-link>
            <a class="" @click="$router.push('/mypage/edit')"><b-icon icon="settings"></b-icon><span>個人設定</span></a>
          </section>
        </div>
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
              <router-link :to="{ name: 'AddList', params: {} }">リストを追加</router-link>
            </b-tab-item>
            <b-tab-item icon="calendar-today">
              <ScheduleView :schedule="schedule" :color="profile.color"></ScheduleView>
              <router-link :to="{ name: 'EditSchedule', params: {id: this.profile.id} }">スケジュールを編集</router-link>
            </b-tab-item>
            <b-tab-item icon="flag" class="section">
              <MilestoneView :timelineItems="timeline" />
              <router-link :to="{ name: 'EditMilestone', params: {id: this.profile.id}}">マイルストーンを編集</router-link>
            </b-tab-item>
          </b-tabs>
        </div>
      </div>
    </div>
    <a class="button is-primary is-outlined" v-if="tumblrToken.token"><router-link to="/blog">Tumblr投稿</router-link></a>
    <a class="button is-primary is-outlined" href="/api/tumblr" v-else>Tumblr連携</a>
  </div>
</template>
<script>
import ScheduleView from '@/components/ScheduleView'
import MilestoneView from '@/components/MilestoneView'
import marked from '@/markdown.js'
export default {
  mixins: [marked],
  components: {
    ScheduleView,
    MilestoneView
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
        color: '',
        picUrl: '',
        graph: {
          nodes: [],
          links: []
        }
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
        github: '',
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
      isEditProfileModalActive: false,
      activeTab: 0
    }
  },
  computed: {
    tumblrToken () {
      return this.$store.state.tumblrToken
    }
  },
  mounted: function () {
    let data = this.$localStorage.get('profile')
    if (data) {
      if(!data.graph) {
        data.graph = {
          nodes: [],
          links: []
        }
      }
      this.profile = data
    }
    this.$http.get(this.$endPoint('/api/mypage'))
      .then(res => {
        this.profile = res.data
        this.$http.get(this.$endPoint('/api/mylist'))
          .then(list => {
            this.mondaiList = list.data
          })
          .catch(err => {
            this.$toast.open({
              'message': err.message,
              'type': 'is-danger'
            })
          })
        this.$http.get(this.$endPoint('/api/schedule/' + this.profile.id))
          .then(doc => {
            this.schedule.tasks = doc.data.tasks.map(t => {
              t.createdDate = new Date(t.createdDate)
              t.endDate = new Date(t.endDate)
              return t
            })
          })
        this.$http.get(this.$endPoint('/api/milestone/' + this.profile.id))
          .then(doc => {
            if (doc.data.timeline) this.timeline = doc.data.timeline
          })
        this.$localStorage.set('profile', this.profile)
      })
  },
  methods: {
    url: function (id) {
      return '/mondaiList/show/' + id
    },
    handleOk() {
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
