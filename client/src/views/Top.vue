<template>
  <div>
    <section id="hero" class="hero is-primary is-large">
      <div id="hero-content" class="hero-body">
        <div class="">
            <h1 class="title is-1 raleway">MONDAI GALLERY</h1><br>
            <!--<h1 class="is-size-4">水平思考問題プレイヤーのためのプロフィールサイト</h1>-->
            <router-link class="button is-link is-outlined is-inverted is-medium mb" to="/signup">新規登録</router-link>
        </div>
      </div>
    </section>
    <section id="hero-reverse" class="hero is-large is-white">
      <div class="hero-body">
        <div class="columns">
          <div class="column">
            <b-icon icon="format-list-bulleted" type="is-primary" size="is-large"/>
            <p class="subtitle">問題リスト</p>
            <p>サイト横断型の問題リンク集を作成可能</p>
          </div>
          <div class="column">
            <b-icon icon="calendar-today" type="is-primary" size="is-large"/>
            <p class="subtitle">
              <span class="mr">スケジュール</span>
              <b-tag class="is-info">BETA</b-tag>
            </p>
            <p>出題予定やイベントの締め切り日を管理</p>
          </div>
          <div class="column">
            <b-icon icon="flag" type="is-primary" size="is-large"/>
            <p class="subtitle">
              <span class="mr">マイルストーン</span>
              <b-tag class="is-danger">DEV</b-tag>
            </p>
            <p>活動の年表を作成</p>
          </div>
        </div>
      </div>
      <a target="_blank" href="https://www.flaticon.com/packs/strategy-and-managemet-2">designed by Freepik from Flaticon</a>
    </section>
  </div>
</template>
<script>
export default {
  computed: {
    messages: function() {
      return this.$store.state.updateLog;
    }
  }
};
</script>
<style scoped>
* {
  text-align: center;
}
.title {
  font-weight: lighter;
  font-size: 5rem;
}
@media screen and (max-width: 480px) {
  font-size: 3rem;
}
.button {
  margin: 5px;
  padding: 20px;
}
#hero {
  position: relative;
  height: 100%;
  background-image: url(../assets/bg.svg);
  background-size: 30em;
}
#hero:before {
  position: absolute;
  left: 0;
  top: 0;
  content: "";
  background: #0984e3;
  width: 100vw;
  height: 100%;
  transform-origin: left top;
  /*transform: skewY(3deg);*/
  opacity: 0.9;
  z-index: 101;
}
.hero-body {
  z-index: 102;
}
.blur {
  transition: filter .3s ease;
  filter: blur(3px);
}
.blur:hover {
  z-index: 200;
  filter: blur(0);
}
</style>
