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
    <section class="hero">
      <div class="hero-body">
        <div class="columns">
          <div class="column">
            <all-list></all-list>
          </div>
          <div class="column">
            <div class="panel">
              <div class="panel-heading">更新履歴</div>
              <div class="panel-block" v-for="item in messages" :key="item">{{item}}</div>
            </div>
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
