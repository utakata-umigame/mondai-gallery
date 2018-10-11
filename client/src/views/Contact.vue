<template>
  <div>
    <div class="card mb">
      <div class="card-content">
        <div class="card-header-title">
        管理人
        </div>
        <account-link :profile="profile"></account-link>
      </div>
    </div>
    <div class="panel">
      <div class="panel-heading">更新履歴</div>
      <div class="panel-block" v-for="item in messages" :key="item">{{item}}</div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    messages: function () {
      return this.$store.state.updateLog
    }
  },
  data () {
    return {
      profile: {
        latethink: 7485,
        cindy: 7,
        R: 13,
        twitter: 'ninjin_umigame',
        github: 'pb10001'
      }
    }
  }
}
</script>
