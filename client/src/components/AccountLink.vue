<template>
  <div class="panel">
    <div class="panel-heading">
      アカウント
    </div>
    <a v-for="item in account" :key="item.name" class="panel-block" target="_blank" v-if="profile[item.key]" :href="profileUrl(item.profileUrl, item.key)">{{item.name}}</a>
  </div>
</template>
<script>
export default {
  props: {
    profile: {
      latethink: Number,
      cindy: Number,
      R: Number,
      twitter: String,
      github: String
    }
  },
  computed: {
    account: function () {
      return this.$store.state.account
    }
  },
  methods: {
    profileUrl: function (site, key) {
      return site + this.profile[key]
    }
  }
}
</script>
