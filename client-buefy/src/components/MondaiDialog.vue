<template>
  <div class="form">
    <label>サイト</label>
    <select v-model='mondai.site' class="form-control">
      <option value="latethink">ラテシン</option>
      <option value="cindy">Cindy</option>
      <option value="R">R鯖</option>
    </select>
    <label>ジャンル</label>
    <select v-model='mondai.genre' class="form-control">
      <option value="umigame">ウミガメ</option>
      <option value="tobira">20の扉</option>
      <option value="kameo">亀夫君問題</option>
      <option value="other">その他</option>
    </select>
    <label>問題ID</label>
    <input v-model ="mondai.id" class="form-control" type="number" placeholder="ID">
    <label>タイトル</label>
    <input v-model ="mondai.title" class="form-control" type="text" placeholder="タイトル">
    <label>問題の作者</label>
    <input v-model = "mondai.author" class="form-control" type="text" placeholder="作者">
    <label>コメント</label>
    <textarea v-model="mondai.description" class="form-control" type="text" placeholder="コメント"></textarea>
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
