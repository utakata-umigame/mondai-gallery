<template>
  <div>
      <b-field label="サイト">
        <b-select placeholder="Select a name" v-model="mondai.site">
          <option v-for="item in site" :value="item.key" :key="item.key">{{item.value.name}}</option>
        </b-select>
      </b-field>
      <b-field label="ジャンル">
        <b-select placeholder="Select a genre" v-model="mondai.genre">
          <option v-for="item in genre" :value="item.key" :key="item.key">{{item.value}}</option>
        </b-select>
      </b-field>
    <b-field label="問題ID">
      <b-input v-model ="mondai.id" type="number" placeholder="ID">
      </b-input>
    </b-field>
    <b-field label="タイトル">
      <b-input v-model ="mondai.title" type="text" placeholder="タイトル" maxlength="100">
      </b-input>
    </b-field>
    <b-field label="問題の作者">
      <b-input v-model ="mondai.author" type="text" placeholder="作者" maxlength="20">
      </b-input>
    </b-field>
    <b-field label="コメント">
      <b-input v-model ="mondai.description" type="textarea" maxlength="200" placeholder="コメント">
      </b-input>
    </b-field>
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
