<template>
  <div>
    <div class="">
      <div class="has-background-white">
        <b-tabs v-model="activeTab" position="is-centered" @change="changed" expanded>
          <b-tab-item icon="format-list-bulleted">
            <all-list />
          </b-tab-item>
          <b-tab-item icon="account">
            <AllUser />
          </b-tab-item>
        </b-tabs>
      </div>
      <div>
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
