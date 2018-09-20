<template>
  <div id='all-list' class="mb-1">
    <a target='_blank' v-bind:href='url(item.site,item.id)' v-bind:title='item.description' class="list-group-item list-group-item-action">
      <small class="text-secondary">{{item.author}}</small>
      <span>{{ item.title }}</span>
      <span class="badge badge-primary">{{site[item.site].name}}</span>
      <span class="badge badge-info">{{genre[item.genre]}}</span>
    </a>
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
      genre: String
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
