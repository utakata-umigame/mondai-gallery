<template>
  <div class="modal-card">
    <section class="modal-card-body">
      <b-field label="サイト">
        <b-select placeholder="Select a name" v-model="mondai.site">
            <option value="latethink">ラテシン</option>
            <option value="cindy">Cindy</option>
            <option value="R">R鯖</option>
        </b-select>
      </b-field>
      <b-field label="ジャンル">
        <b-select placeholder="Select a genre" v-model="mondai.genre">
          <option value="umigame">ウミガメ</option>
          <option value="tobira">20の扉</option>
          <option value="kameo">亀夫君問題</option>
          <option value="other">その他</option>
        </b-select>
      </b-field>
      <b-field label="問題ID">
        <b-input v-model ="mondai.id" type="number" placeholder="ID">
        </b-input>
      </b-field>
      <b-field label="タイトル">
        <b-input v-model ="mondai.title" type="text" placeholder="タイトル">
        </b-input>
      </b-field>
      <b-field label="問題の作者">
        <b-input v-model ="mondai.author" type="text" placeholder="作者">
        </b-input>
      </b-field>
      <b-field label="コメント">
        <b-input v-model ="mondai.description" type="textarea" maxlength="200" placeholder="コメント">
        </b-input>
      </b-field>
    </section>
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
