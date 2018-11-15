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
              <b-icon icon="home-account"/>
            </span>
            <span>マイページ</span>
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
                <p class="subtitle is-6">{{profile.username}}</p>
              </div>
            </div>
            <div class="card-text">
              <account-link :profile="profile"></account-link>
              <p class="multiline mb">{{ profile.bio }}</p>
              <p>登録日時：{{profile.signup_date}}</p>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" @click="$router.push('/mypage/edit')"><b-icon icon="settings"></b-icon><span>個人設定</span></a>
          </footer>
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
            <router-link :to="{ name: 'EditMilestone', params: {id: this.profile.id}}">マイルストーンを編集</router-link>
          </b-tab-item>
        </b-tabs>
        <footer class="panel-footer">
          <router-link v-if="activeTab===0" :to="{ name: 'AddList', params: {} }">リストを追加</router-link>
          <router-link v-if="activeTab===1" :to="{ name: 'EditSchedule', params: {id: this.profile.id} }">スケジュールを編集</router-link>
        </footer>
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
        picUrl: ''
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
        picUrl: ''
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
  mounted: function () {
    let data = this.$localStorage.get('profile')
    if (data) {
      this.profile = data
    }
    let vm = this
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
            if (doc.data) this.timeline = doc.data.timeline
          })
        this.$localStorage.set('profile', this.profile)
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
