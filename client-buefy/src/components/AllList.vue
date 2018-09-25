<template>
  <div>
    <h2 class="title">リスト一覧</h2>
    <div class="panel">
      <div v-for='item in mondaiList' v-bind:key='item._id'>
        <a class="panel-block" @click='to(item.id)'>
          <span>{{ item.name }}</span>
          <span>リスト作成者：{{item.editor.nickname}}</span>
          <b-tag v-if='item.fromMyMondais'>自作問題のみ</b-tag>
        </a>
      </div>
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
