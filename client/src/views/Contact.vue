<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <router-link to="/mondailist">
            <span class="icon is-small is-primary">
              <b-icon icon="home"/>
            </span>
            <span>ホーム</span>
          </router-link>
        </li>
        <li class="is-active">
          <a href="#">
            <span class="icon is-small is-primary">
              <b-icon icon="contacts"/>
            </span>
            <span>お問い合わせ</span>
          </a>
        </li>
      </ul>
    </nav>
    <div class="mb">
      <p>サイトのレイアウト、機能等について要望がございましたらお気軽にご連絡ください。サービス向上の参考にいたします。</p>
      <div class="columns">
        <section class="section column">
          <p class="subtitle">改善案(アイデア)がある場合</p>
          <p>アイデアをお送りください。各種アカウントは下の通りです。現状との比較の上、管理人の判断で実装します。</p>
          <p>* 技術・リソースの制約、変更に伴う他の機能への影響等の理由で実装を見送る可能性がございます。あらかじめご了承ください。</p>
          <p>
            * 実現可能なレイアウトは右のリンク先のドキュメントをご参照ください。
            <a target="_blank" href="https://buefy.github.io/documentation">Buefy</a>/
            <a target="_blank" href="https://bulma.io/documentation/">Bulma</a>
          </p>
        </section>
        <section class="section column">
          <p class="subtitle">改善案(コード)がある場合</p>
          <p>GitHubからプルリクエストをお送りください。現状との比較の上、管理人の判断でマージします。</p>
        </section>
      </div>
    </div>
    <account-link :profile="profile"></account-link>
    <div class="panel">
      <div class="panel-heading caption-light" :style="{'background-color':'#555', 'color': '#fff'}">更新履歴</div>
      <div class="panel-block" v-for="item in messages" :key="item">{{item}}</div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    messages: function () {
      return this.$store.state.updateLog
    }
  },
  data () {
    return {
      profile: {
        latethink: 7485,
        cindy: 7,
        R: 13,
        twitter: 'ninjin_umigame',
        github: 'utakata-umigame'
      }
    }
  }
}
</script>
