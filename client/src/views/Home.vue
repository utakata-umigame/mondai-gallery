<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li class="is-active">
          <router-link to="/home">
            <span class="icon is-small is-primary">
              <b-icon icon="home"/>
            </span>
            <span>ホーム</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="columns">
      <div class="column is-8">
        <b-tabs v-model="activeTab" position="is-centered" @change="changed">
          <b-tab-item icon="format-list-bulleted">
            <all-list />
          </b-tab-item>
          <b-tab-item icon="account">
            <AllUser />
          </b-tab-item>
        </b-tabs>
      </div>
      <div class="column is-4">
        <AllSchedule />
      </div>
    </div>
  </div>
</template>
<script>
import AllSchedule from '@/components/AllSchedule'
import AllUser from '@/components/AllUser'
export default {
  components: {
    AllSchedule,
    AllUser
  },
  data () {
    return {
      name: '-',
      genreFilter: 'all',
      siteFilter: 'all',
      mondaiList: [],
      activeTab: 0
    }
  },
  mounted: function () {
    this.activeTab = this.$route.query.tab || 0
    var vm = this
    this.$http.get(this.$endPoint('/api/mondaiList'))
      .then(function (response) {
        vm.mondaiList = response.data.sort((x, y) => {
          // Descending sort
          return y.id - x.id
        })
      })
  },
  methods: {
    url: function (id) {
      return '/mondaiList/show/' + id
    },
    to: function (id) {
      this.$router.push(this.url(id))
    },
    changed (index) {
      this.$router.push('/home?tab=' + index)
    }
  }
}
</script>
