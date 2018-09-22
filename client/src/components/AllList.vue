<template>
  <div>
    <h2 class="text-center">リスト一覧</h2>
    <div class="row">
      <div class='col-xs-12 col-md-4 mb-1' v-for='item in mondaiList' v-bind:key='item._id'>
        <router-link v-bind:to='url(item.id)' class='list-group-item list-group-item-action'>
          <span>{{ item.name }}</span>
          <small class='text-secondary'>リスト作成者：{{item.editor.nickname}}</small>
          <span class='badge badge-success' v-if='item.fromMyMondais'>自作問題のみ</span>
        </router-link>
      </div>
    </div>
    <div class="row">
      <loading :show="show"></loading>
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
      show: true,
      mondaiList: [
        {
          'id': 0,
          'name': '-',
          'editor': {
            'id': 0,
            'nickname': '-'
          },
          'fromMyMondais': true
        }
      ]
    }
  },
  mounted: function () {
    var vm = this
    this.$http.get('/api/mondaiList')
      .then(function (response) {
        vm.mondaiList = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
      .then(function () {
        vm.show = false
      })
  },
  methods: {
    url: function (id) {
      return '/mondaiList/show/' + id
    }
  }
}
</script>
