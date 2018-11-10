<template>
  <div>
    <section class="hero is-light is-large is-bold">
      <div class="hero-body">
        <div>
          <h1 class="title is-1 revalia">Mondai Gallery</h1>
          <h2 class="subtitle">水平思考問題集共有サイト</h2>
          <router-link class="button is-light is-outlined is-inverted is-medium" to="/login">ログイン</router-link>
          <router-link class="button is-light is-outlined is-inverted is-medium" to="/signup">新規登録</router-link>
        </div>
      </div>
    </section>
    <section class="hero is-medium is-dark is-bold">
      <div class="hero-body">
        <div class="columns">
          <div class="column">
            <b-icon icon="format-list-bulleted" size="is-large"/>
            <p class="subtitle">問題リスト</p>
            <p>サイト横断型の問題リンク集を作成可能</p>
          </div>
          <div class="column">
            <b-icon icon="calendar-today" size="is-large"/>
            <p class="subtitle"><span class="mr">スケジュール</span><b-tag class="is-info">BETA</b-tag></p>
            <p>出題予定やイベントの締め切り日を管理</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  computed: {
    messages: function () {
      return this.$store.state.updateLog
    }
  }
}
</script>
<style scoped>
* {
  text-align: center;
}
.button {
  margin: auto 5px;
}
</style>
