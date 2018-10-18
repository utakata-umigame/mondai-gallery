<template>
  <div>
    <p class="title is-4">{{item.title}}</p>
    <p class="subtitle is-6">{{item.author}}</p>
    <p class="multiline">{{item.description}}</p>
    <p><a target="_blank" v-bind:href="url(item.site, item.id)">{{url(item.site, item.id)}}</a></p>
    <b-tag class="is-primary">{{site[item.site].name}}</b-tag>
    <b-tag class="is-info">{{genre[item.genre]}}</b-tag>
    <br>
  </div>
</template>
<script>
export default {
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
.tag {
  min-width: 100px;
}
</style>
