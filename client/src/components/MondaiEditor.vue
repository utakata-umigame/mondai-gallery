<template>
  <div class="fill">
    <div class="level">
      <div class="level-item">
        <b-select placeholder="Select a name" v-model="mondai.site">
            <option value="latethink">ラテシン</option>
            <option value="cindy">Cindy</option>
            <option value="R">R鯖</option>
        </b-select>
        <b-select placeholder="Select a genre" v-model="mondai.genre">
          <option value="umigame">ウミガメ</option>
          <option value="tobira">20の扉</option>
          <option value="kameo">亀夫君問題</option>
          <option value="other">その他</option>
        </b-select>
        <b-input v-model ="mondai.id" type="number" placeholder="ID">
        </b-input>
      </div>
    </div>
    <div class="level">
      <div class="level-item">
        <b-input v-model ="mondai.title" type="text" placeholder="タイトル" maxlength="100">
        </b-input>
        <b-input v-model ="mondai.author" type="text" placeholder="作者" maxlength="20">
        </b-input>
        <b-input v-model ="mondai.description" type="textarea" maxlength="200" :rows="1" placeholder="コメント">
        </b-input>
      </div>
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
  }
}
</script>
<style scoped>
.fill {
  width: 100%;
}
.level { 
  width: 100%;
}
.level-item {
  margin: 0 auto;
}
</style>
