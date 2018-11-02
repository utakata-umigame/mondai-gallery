<template>
  <div class="panel">
    <b-tag class="mr" v-for="item in account" :key="item.name" v-if="profile[item.key]"><a target="_blank" :href="profileUrl(item.profileUrl, item.key)">{{item.name}}</a></b-tag>
  </div>
</template>
<script>
export default {
  props: {
    profile: {
      latethink: Number,
      cindy: Number,
      R: Number,
      latelate: Number,
      latePro: Number,
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
