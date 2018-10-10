<template>
  <div>
    <div class="card mb">
      <div class="card-content">
        <div class="card-header-title">
        管理人
        </div>
        <account-link :profile="profile"></account-link>
      </div>
    </div>
    <div class="panel">
      <div class="panel-heading">更新履歴</div>
      <div class="panel-block" v-for="item in messages" :key="item">{{item}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      profile: {
        latethink: 7485,
        cindy: 7,
        R: 13,
        twitter: 'ninjin_umigame',
        github: 'pb10001'
      },
      messages: [
        "10/10 Docker上で実行できるようにしました。",
        "10/9 プロフィールのアカウントリンクの表示を更新しました。",
        "10/9 リストの非公開を実装しました。",
        "10/8 プロフィール編集フォームを更新しました。"
      ]
    }
  }
}
</script>
