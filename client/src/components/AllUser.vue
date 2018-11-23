<template>
  <div>
    <div class="columns is-multiline">
      <div class="column is-4" v-for="profile in allUser" v-bind:key="profile.id">
        <div id="profile" class="card">
          <header class="card-header">
            <div class="card-header-title">
              <img class="mr" :src="profile.picUrl" v-if="profile.picUrl" width="32" height="32" alt="No Image">
              <figure class="image is-32x32 mr" v-else>
                <b-icon size="is-medum" :style="{'color': profile.color||'#555'}" icon="account-box"/>
              </figure>
              <router-link class="has-text-link" :to="{ name: 'Profile', params: {id: profile.id} }">{{profile.nickname}}</router-link>
            </div>
          </header>
          <div class="card-content">
            <div class="card-text">
              <account-link :profile="profile"></account-link>
              <p class="multiline mb">{{ profile.bio }}</p>
              <p>登録日時：{{profile.signup_date}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AccountLink from '@/components/AccountLink'
export default {
  components: {
    'account-link': AccountLink
  },
  computed: {
    allUser () {
      let sorted = this.$store.state.allUser.sort((x, y) => y.id - x.id)
      return sorted
    }
  },
  mounted () {
    this.$store.dispatch('fetchAllUser')
  },
}
</script>
<style scoped>
.card {
  display:flex;
  flex-direction: column;
  height: 100%;
}
</style>
