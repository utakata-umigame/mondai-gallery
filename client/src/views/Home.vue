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
    <b-tabs v-model="activeTab" position="is-centered" class="block">
      <b-tab-item icon="format-list-bulleted">
        <all-list />
      </b-tab-item>
      <b-tab-item icon="calendar-today">
        <AllSchedule />
      </b-tab-item>
    </b-tabs>
  </div>
</template>
<script>
import AllSchedule from '@/components/AllSchedule'
export default {
  components: {
    AllSchedule
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
    var vm = this
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
