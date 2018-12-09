<template>
  <div>
    <b-field>
      <b-select v-model="show">
        <option value="list">一覧</option>
        <option value="card">カード</option>
      </b-select>
    </b-field>
    <div id="articles" class="has-background-white p10" v-if="show==='list'">
      <div class="mb" v-for="item in mondaiList" :key="item.id">
        <article class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <img :src="picture[item.picture] || picture['puzzle']" alt="Placeholder image">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <div>
                <strong class="mr">
                  <router-link
                    class="has-text-link title is-5"
                    :to="{ name: 'MondaiList', params: {id: item.id} }"
                  >{{item.name}}</router-link>
                </strong>
                <small>{{item.editor.nickname}}</small>
                <br>
                <b-taglist>
                  <b-tag class="is-primary" v-if="item.fromMyMondais">自作問題のみ</b-tag>
                  <b-tag class="is-primary" v-if="item.read.includes(user.id)">読んだ！済</b-tag>
                  <b-tag v-for="tag in item.tags" :key="tag">{{tag}}</b-tag>
                </b-taglist>
                {{item.description}}
                <div class>
                  <b-tag v-if="item.read.length" class="is-rounded is-outlined">
                    {{item.read.length}}
                    <span>読んだ！</span>
                  </b-tag>
                </div>
                <p class="grey">{{item.updateDate}}</p>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div class="mb" v-for="item in acceptedList" v-bind:key="item.id">
        <article class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <img :src="picture[item.picture] || picture['puzzle']" alt="Placeholder image">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <div>
                <strong class="mr">
                  <router-link
                    class="has-text-link title is-5"
                    :to="{ name: 'MondaiList', params: {id: item.id} }"
                  >{{item.name}}</router-link>
                </strong>
                <small>{{item.editor.nickname}}</small>
                <b-icon icon="lock" v-if="item.private"></b-icon>
                <br>
                <b-taglist>
                  <b-tag class="is-danger">許可あり</b-tag>
                  <b-tag class="is-primary" v-if="item.fromMyMondais">自作問題のみ</b-tag>
                  <b-tag class="is-primary" v-if="item.read.includes(user.id)">読んだ！済</b-tag>
                  <b-tag v-for="tag in item.tags" :key="tag">{{tag}}</b-tag>
                </b-taglist>
                {{item.description}}
                <div class>
                  <b-tag v-if="item.read.length" class="is-rounded is-outlined">
                    {{item.read.length}}
                    <span>読んだ！</span>
                  </b-tag>
                </div>
                <p class="grey">{{item.updateDate}}</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <div class="columns is-multiline" v-if="show==='card'">
      <div class="column is-4" v-for="item in mondaiList" v-bind:key="item.id">
        <div class="card">
          <div class="card-image">
            <figure class="image is-16by9">
              <img :src="picture[item.picture] || picture['puzzle']" alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content">
            <router-link
              class="has-text-link title is-5"
              :to="{ name: 'MondaiList', params: {id: item.id} }"
            >{{item.name}}</router-link>
            <b-icon icon="lock" v-if="item.private"></b-icon>
            <div class="media">
              <div class="media-left">
                <img
                  :src="item.editor.picUrl"
                  v-if="item.editor.picUrl"
                  width="24"
                  height="24"
                  alt="No Image"
                >
                <figure class="image is-24x24" v-else>
                  <b-icon
                    size="is-medium"
                    :style="{'color': item.editor.color||'#555'}"
                    icon="account-box"
                  />
                </figure>
              </div>
              <div class="media-content">
                <p>{{item.editor.nickname}}</p>
              </div>
            </div>
            <b-taglist>
              <b-tag class="is-primary" v-if="item.fromMyMondais">自作問題のみ</b-tag>
              <b-tag class="is-primary" v-if="item.read.includes(user.id)">読んだ！済</b-tag>
              <b-tag v-for="tag in item.tags" :key="tag">{{tag}}</b-tag>
            </b-taglist>
            <p class="multiline mb">{{item.description}}</p>
            <p class="grey">{{item.updateDate}}</p>
            <div class>
              <b-tag v-if="item.read.length" class="is-rounded is-outlined">
                {{item.read.length}}
                <span>読んだ！</span>
              </b-tag>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-4" v-for="item in acceptedList" v-bind:key="item.id">
        <div class="card">
          <div class="card-image">
            <figure class="image is-16by9">
              <img :src="picture[item.picture] || picture['puzzle']" alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content">
            <router-link
              class="has-text-link title is-5"
              :to="{ name: 'MondaiList', params: {id: item.id} }"
            >{{item.name}}</router-link>
            <b-icon icon="lock" v-if="item.private"></b-icon>
            <div class="media">
              <div class="media-left">
                <img
                  :src="item.editor.picUrl"
                  v-if="item.editor.picUrl"
                  width="24"
                  height="24"
                  alt="No Image"
                >
                <figure class="image is-24x24" v-else>
                  <b-icon
                    size="is-medium"
                    :style="{'color': item.editor.color||'#555'}"
                    icon="account-box"
                  />
                </figure>
              </div>
              <div class="media-content">
                <p>{{item.editor.nickname}}</p>
              </div>
            </div>
            <b-taglist>
              <b-tag class="is-danger">許可あり</b-tag>
              <b-tag class="is-primary" v-if="item.fromMyMondais">自作問題のみ</b-tag>
              <b-tag class="is-primary" v-if="item.read.includes(user.id)">読んだ！済</b-tag>
              <b-tag v-for="tag in item.tags" :key="tag">{{tag}}</b-tag>
            </b-taglist>
            <p class="multiline mb">{{item.description}}</p>
            <p class="grey">{{item.updateDate}}</p>
            <div class>
              <b-tag v-if="item.read.length" class="is-rounded is-outlined">
                {{item.read.length}}
                <span>読んだ！</span>
              </b-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  localStorage: {
    mondaiList: {
      type: Object,
      default: []
    }
  },
  data() {
    return {
      name: "-",
      genreFilter: "all",
      siteFilter: "all",
      mondaiList: [],
      acceptedList: [],
      show: 'list'
    };
  },
  computed: {
    picture() {
      return this.$store.state.picture;
    },
    user() {
      return this.$store.state.user;
    }
  },
  mounted: function() {
    let mondaiList = this.$localStorage.get("mondaiList") || [];
    if (mondaiList.length > 0) {
      this.mondaiList = mondaiList;
    }
    let vm = this;
    this.$http
      .get(this.$endPoint("/api/mondaiList"))
      .then(function(response) {
        let sorted = response.data.sort((x, y) => {
          // Descending sort
          return y.id - x.id;
        });
        vm.mondaiList = sorted;
        vm.$localStorage.set("mondaiList", vm.mondaiList);
      })
      .catch(function(error) {
        console.log(error);
      });
    this.$http
      .get(this.$endPoint("/api/acceptedList"))
      .then(function(response) {
        let sorted = response.data.sort((x, y) => {
          // Descending sort
          return y.id - x.id;
        });
        vm.acceptedList = sorted;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    url: function(id) {
      return "/mondaiList/show/" + id;
    },
    to: function(id) {
      this.$router.push(this.url(id));
    }
  }
};
</script>
<style scoped>
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
