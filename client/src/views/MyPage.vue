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
              <p class="multiline">{{ profile.bio }}</p>
              <p>登録日時：{{profile.signup_date}}</p>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" @click="$router.push('/mypage/edit')"><b-icon icon="settings"></b-icon><span>個人設定</span></a>
          </footer>
        </div>
      </div>
      <div class="column">
        <div class="panel">
          <div class="panel-heading caption-light" :style="{'background-color': profile.color||'#555'}">
            <router-link :to="{ query: { show: 'list' } }" class="mr has-text-white"><span>作成したリスト</span></router-link>
            <router-link :to="{ query: { show: 'schedule' } }" class="has-text-white"><b-icon icon="calendar-today"/><span>スケジュール</span></router-link>
          </div>
          <list-link v-if="show==='list'" :item="item" v-for="item in mondaiList" v-bind:key="item.id"></list-link>
          <ScheduleView v-if="show==='schedule'" :schedule="schedule" :color="profile.color"></ScheduleView>
          <footer class="panel-footer">
            <router-link v-if="show==='list'" :to="{ name: 'AddList', params: {} }">リストを追加</router-link>
            <router-link v-if="show==='schedule'" :to="{ name: 'EditSchedule', params: {id: this.profile.id} }">スケジュールを編集</router-link>
          </footer>
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
        color: '',
        picUrl: ''
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.show = this.$route.query.show || 'list'
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
