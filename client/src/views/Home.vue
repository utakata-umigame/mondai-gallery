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
        <a class="mr"　@click="show='list'"><span>すべてのリスト</span></a>
        <a @click="show='schedule'"><b-icon icon="calendar-today"/><span>スケジュール</span></a>
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
