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
  data () {
    return {
      name: '-',
      genreFilter: 'all',
      siteFilter: 'all',
      mondaiList: []
    }
  },
  mounted: function () {
    let vm = this
    this.$http.get(this.$endPoint('/api/mondaiList'))
      .then(function (response) {
        let sorted = response.data.sort((x, y) => {
          // Descending sort
          return y.id - x.id
        })
        vm.mondaiList = sorted
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
