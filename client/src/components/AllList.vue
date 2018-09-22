<template>
  <v-ons-page>
    <v-ons-list>
      <v-ons-list-header>問題集一覧</v-ons-list-header>
        <v-ons-list-item v-on:click='to(item.id)' v-for='item in mondaiList' v-bind:key='item._id' modifier="chevron" tappable>
          <span>{{ item.name }}</span>
          <small class='text-secondary'>リスト作成者：{{item.editor.nickname}}</small>
          <span class='notification' v-if='item.fromMyMondais'>自作問題のみ</span>
        </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
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
      .then(function () {})
  },
  methods: {
    to: function (id) {
      let url = '/mondaiList/show/' + id
      this.$router.push(url)
    }
  }
}
</script>
