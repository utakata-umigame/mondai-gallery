<template>
  <div>
    <div>
      <p class="multiline">{{item.description}}</p>
      <b-link target="_blank" v-bind:href="url(item.site, item.id)">{{url(item.site, item.id)}}</b-link>
      <br>
      <span class="notification">{{site[item.site].name}}</span>
      <span class="notification">{{genre[item.genre]}}</span>
      <br>
    </div>
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
