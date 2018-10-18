<template>
  <div class="columns">
      <div class="column">
        <b-select class="mb" placeholder="Select a name" v-model="mondai.site">
          <option v-for="item in site" :value="item.key" :key="item.key">{{item.value.name}}</option>
        </b-select>
        <b-select class="mb" placeholder="Select a genre" v-model="mondai.genre">
          <option v-for="item in genre" :value="item.key" :key="item.key">{{item.value}}</option>
        </b-select>
        <b-input class="mb" v-model ="mondai.id" type="number" placeholder="ID">
        </b-input>
        <b-input v-model ="mondai.title" type="text" placeholder="タイトル" maxlength="100">
        </b-input>
      </div>
      <div class="column">
        <b-input  v-model ="mondai.author" type="text" placeholder="作者" maxlength="20">
        </b-input>
        <b-input v-model ="mondai.description" type="textarea" maxlength="200" :rows="4" placeholder="コメント">
        </b-input>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    mondai: {
      'id': Number,
      'title': String,
      'author': String,
      'site': String,
      'description': String,
      'genre': String
    }
  },
  computed: {
    site: function () {
      let list = []
      for(let key in this.$store.state.site) {
        list.push({key: key, value: this.$store.state.site[key]})
      }
      return list
    },
    genre: function () {
      let list = []
      for(let key in this.$store.state.genre) {
        list.push({key: key, value: this.$store.state.genre[key]})
      }
      return list
    }
  }
}
</script>
<style scoped>
.fill {
  width: 100%;
}
.columns {
  width: 100%;
  margin: auto;
}
.mb {
  margin-bottom: 10px;
}
.level-item {
  margin: 0 auto;
}
</style>
