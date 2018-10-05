<template>
  <div>
    <div class="level">
      <div class="level-item">
        <label>サイト</label>
        <b-select placeholder="Select a name" v-model="mondai.site">
            <option value="latethink">ラテシン</option>
            <option value="cindy">Cindy</option>
            <option value="R">R鯖</option>
        </b-select>
      </div>
      <div class="level-item">
        <label>ジャンル</label>
        <b-select placeholder="Select a genre" v-model="mondai.genre">
          <option value="umigame">ウミガメ</option>
          <option value="tobira">20の扉</option>
          <option value="kameo">亀夫君問題</option>
          <option value="other">その他</option>
        </b-select>
      </div>
    </div>
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
