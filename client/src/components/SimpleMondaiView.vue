<template>
  <div class="level" v-else>
    <div class="level-left">
      <div class="level-item">
      <strong>{{ item.title }}</strong>
      </div>
    </div>
    <div class="level-right">
      <span class="level-item">{{item.author}}</span>
      <b-tag class="is-primary level-item">{{site[item.site].name}}</b-tag>
      <b-tag class="is-info level-item">{{genre[item.genre]}}</b-tag>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      author: String,
      title: String,
      site: String,
      genre: String
    }
  },
  computed: {
    site: function () {
      return this.$store.state.site
    },
    siteList: function () {
      let list = [{key: 'all', value: {'name': 'すべて'}}]
      for (let key in this.$store.state.site) {
        list.push({key: key, value: this.$store.state.site[key]})
      }
      return list
    },
    genre: function () {
      return this.$store.state.genre
    },
    genreList: function () {
      let list = [{key: 'all', value: 'すべて'}]
      for (let key in this.$store.state.genre) {
        list.push({key: key, value: this.$store.state.genre[key]})
      }
      return list
    }
  }
}
</script>
<style scoped>
.tag {
  min-width: 100px;
}
</style>
