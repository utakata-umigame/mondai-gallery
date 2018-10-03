<template>
  <div>
    <p><span class="subtitle is-6">{{item.author}}</span><span class="title is-4">{{item.title}}</span></p>
    <p class="multiline">{{item.description}}</p>
    <a target="_blank" v-bind:href="url(item.site, item.id)">{{url(item.site, item.id)}}</a>
    <br>
    <b-tag class="is-primary">{{site[item.site].name}}</b-tag>
    <b-tag class="is-info">{{genre[item.genre]}}</b-tag>
    <br>
  </div>
</template>
<script>
export default {
  parent: {},
  props: {
    item: {
      id: Number,
      title: String,
      site: String,
      author: String,
      genre: String,
      description: String
    }
  },
  computed: {
    site: function () {
      return this.$store.state.site
    },
    genre: function () {
      return this.$store.state.genre
    }
  },
  methods: {
    url: function (siteName, id) {
      return this.site[siteName].showUrl + id
    }
  }
}
</script>
<style scoped>
.subtitle {
  margin-right: 5px;
}
.tag {
  min-width: 100px;
}
</style>
