<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <router-link to="/home">
            <span class="icon is-small is-primary">
              <b-icon icon="home"/>
            </span>
            <span>ホーム</span>
          </router-link>
        </li>
        <li class="is-active">
          <a href="#">
            <span class="icon is-small is-primary">
              <b-icon icon="settings"></b-icon>
            </span>
            <span>個人設定</span>
          </a>
        </li>
      </ul>
    </nav>
    <div class="columns">
      <aside class="menu column is-one-quarter">
        <p class="menu-label">Settings</p>
        <ul class="menu-list">
          <li>
            <a @click="setTab(0)">プロフィール</a>
          </li>
          <li>
            <a @click="setTab(1)">アカウント</a>
          </li>
        </ul>
      </aside>
      <div class="column is-three-quarter">
        <div class="card mb" v-if="activeTab === 0">
          <section class="section">
            <p class="subtitle">
              <img
                :src="profile.picUrl"
                v-if="profile.picUrl"
                width="48"
                height="48"
                alt="No Image"
              >
              <b-icon size="is-medium" icon="account-box" :style="{'color': profile.color}" v-else/>
              {{profile.nickname}}
            </p>
            <b-field label="プロフィール画像">
              <b-input type="text" v-model="profile.picUrl" placeholder="画像のURL"></b-input>
            </b-field>
            <b-field label="テーマカラー(カラーコード)">
              <b-input type="text" v-model="profile.color" placeholder="例)#000"></b-input>
            </b-field>
            <b-input type="color" class="mb" v-model="profile.color"></b-input>
            <b-field label="自己紹介">
              <b-input type="textarea" v-model.trim="profile.bio" placeholder="自己紹介" :rows="6"></b-input>
            </b-field>
          </section>
        </div>
        <div class="card mb" v-if="activeTab === 1">
          <section class="section">
            <b-field label="ラテシンのID">
              <b-input
                type="number"
                v-model="profile.latethink"
                placeholder=".../mondai/profile/[ID]"
              ></b-input>
            </b-field>
            <b-field label="CindyのID">
              <b-input type="number" v-model="profile.cindy" placeholder=".../profile/show/[ID]"></b-input>
            </b-field>
            <b-field label="R鯖のID">
              <b-input type="number" v-model="profile.R" placeholder=".../Mmail/userpage/[ID]"></b-input>
            </b-field>
            <b-field label="らてらて鯖のID">
              <b-input
                type="number"
                v-model="profile.latelate"
                placeholder=".../mondai/profile/[ID]"
              ></b-input>
            </b-field>
            <b-field label="らてしんPROのID">
              <b-input type="number" v-model="profile.latePro" placeholder=".../users/profile/[ID]"></b-input>
            </b-field>
            <b-field label="TwitterのID">
              <b-input type="text" v-model="profile.twitter" placeholder=".../twitter.com/[ID]"></b-input>
            </b-field>
            <b-field label="GitHubのID">
              <b-input type="text" v-model="profile.github" placeholder=".../github.com/[ID]"></b-input>
            </b-field>
          </section>
        </div>
        <div class="buttons has-addons">
          <span class="button is-primary is-outlined" @click="submit">保存</span>
          <span class="button is-danger is-outlined" @click="$router.push('/mypage')">キャンセル</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted: function() {
    var vm = this;
    this.$http
      .get(this.$endPoint("/api/mypage"))
      .then(function(res) {
        vm.profile = res.data;
      })
      .catch(function(error) {
        if (error) {
          vm.$toast.open({
            message: "エラー",
            type: "is-danger"
          });
        }
      });
  },
  data() {
    return {
      activeTab: 0,
      profile: {
        nickname: "",
        username: "",
        signup_date: "",
        bio: "",
        latethink: 0,
        cindy: 0,
        R: 0,
        latelate: 0,
        latePro: 0,
        twitter: "-",
        github: "",
        color: "#000000",
        picUrl: ""
      }
    };
  },
  methods: {
    submit: function() {
      let vm = this;
      this.$http
        .post(this.$endPoint("/api/profile/edit"), this.profile)
        .catch(function(err) {
          if (err) {
            vm.$toast.open({
              message: "エラー",
              type: "is-danger"
            });
          }
        })
        .then(function() {
          vm.$router.push("/mypage");
        });
    },
    setTab(num) {
      this.$set(this, "activeTab", num);
    }
  }
};
</script>
<style scoped>
</style>
