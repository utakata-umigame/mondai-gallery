<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li class="is-active">
          <router-link to="/mondailist">
            <span class="icon is-small is-primary">
              <b-icon icon="home"/>
            </span>
            <span>ホーム</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <div>
      <div class="panel-heading caption-light">
        <router-link :to="{ name: 'Home', query: { show: 'list' } }" class="mr"><span>すべてのリスト</span></router-link>
        <router-link :to="{ name: 'Home', query: { show: 'schedule' } }"><b-icon icon="calendar-today"/><span>スケジュール</span></router-link>
      </div>
      <AllSchedule v-if="show==='schedule'"/>
      <all-list v-if="show==='list'"/>
    </div>
  </div>
</template>
<script>
import AllSchedule from '@/components/AllSchedule'
export default {
  components: {
    AllSchedule
  },
  watch: {
    '$route' (to, from) {
      this.show = this.$route.query.show || 'list'
    }
  },
  data () {
    return {
      name: '-',
      genreFilter: 'all',
      siteFilter: 'all',
      mondaiList: [],
      show: 'list'
    }
  },
  mounted: function () {
    var vm = this
    this.show = this.$route.query.show || 'list'
    this.$http.get(this.$endPoint('/api/mondaiList'))
      .then(function (response) {
        vm.mondaiList = response.data.sort((x, y) => {
          // Descending sort
          return y.id - x.id
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
    to: function (id) {
      this.$router.push(this.url(id))
    }
  }
}
</script>
