<template>
  <div>
    <div class="panel">
      <div class="panel-heading">すべてのリスト</div>
      <list-link :item="item" v-for="item in mondaiList" v-bind:key="item.id"></list-link>
    </div>
  </div>
</template>
<script>
export default {
  localStorage: {
    mondaiList: []
  },
  data () {
    return {
      name: '-',
      genreFilter: 'all',
      siteFilter: 'all',
      mondaiList: []
    }
  },
  mounted: function () {
    let mondaiList = this.$localStorage.get('mondaiList')
    if (mondaiList.length > 0) {
      this.mondaiList = mondaiList
    }
    let vm = this
    this.$http.get(this.$endPoint('/api/mondaiList'))
      .then(function (response) {
        vm.mondaiList = response.data.sort((x, y) => {
          // Descending sort
          return y.id - x.id
        })
        vm.$localStorage.set('mondaiList', vm.mondaiList)
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
