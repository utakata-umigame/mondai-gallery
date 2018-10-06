<template>
  <div>
    <div class="card">
      <div class="card-content">
        <div class="card-header-title">
        管理人
        </div>
        <account-link :profile="profile"></account-link>
      </div>
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
      }
    }
  }
}
</script>
