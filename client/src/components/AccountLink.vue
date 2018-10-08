<template>
  <footer class="card-footer">
    <a class="card-footer-item" target="_blank" v-bind:href="profileUrl('http://sui-hei.net/mondai/profile/', profile.latethink)" v-if="profile.latethink">ラテシン<b-icon icon="open-in-new"></b-icon></a>
    <a class="card-footer-item" target="_blank" v-bind:href="profileUrl('https://www.cindythink.com/profile/show/', profile.cindy)" v-if="profile.cindy">Cindy<b-icon icon="open-in-new"></b-icon></a>
    <a class="card-footer-item" target="_blank" v-bind:href="profileUrl('http://openumigame.sakura.ne.jp/openumi/Mmail/userpage/', profile.R)" v-if="profile.R">R鯖<b-icon icon="open-in-new"></b-icon></a>
    <a class="card-footer-item" target="_blank" v-bind:href="profileUrl('https://late-late.jp/mondai/profile/', profile.latelate)" v-if="profile.latelate">らてらて鯖<b-icon icon="open-in-new"></b-icon></a>
    <a class="card-footer-item" target="_blank" v-bind:href="profileUrl('https://sui-hei-pro.net/users/profile/', profile.latePro)" v-if="profile.latePro ">らてしんPRO<b-icon icon="open-in-new"></b-icon></a>
    <a class="card-footer-item" target="_blank" v-bind:href="profileUrl('https://twitter.com/', profile.twitter)" v-if="profile.twitter"><b-icon icon="twitter">Twitter</b-icon><b-icon icon="open-in-new"></b-icon></a>
    <a class="card-footer-item" target="_blank" v-bind:href="profileUrl('https://github.com/', profile.github)" v-if="profile.github"><b-icon icon="github-circle">GitHub</b-icon><b-icon icon="open-in-new"></b-icon></a>
  </footer>
</template>
<script>
export default {
  props: {
    profile: {
      latethink: Number,
      cindy: Number,
      R: Number,
      twitter: String,
      github: String
    }
  },
  methods: {
    profileUrl: function (site, id) {
      return site + id
    }
  }
}
</script>
