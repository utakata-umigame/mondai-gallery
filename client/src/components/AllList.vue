<template>
  <div>
    <div class="columns is-multiline">
      <div class="column is-4" v-for="item in mondaiList" v-bind:key="item.id">
        <div class="card">
          <div class="card-content">
            <p class="title is-4">
              <span>{{item.name}}</span>
              <b-icon icon="lock" v-if="item.private"></b-icon>
            </p>
            <div class="media">
              <div class="media-left">
                <img :src="item.editor.picUrl" v-if="item.editor.picUrl" width="24" height="24" alt="No Image">
                <figure class="image is-24x24" v-else>
                  <b-icon size="is-medium" :style="{'color': item.editor.color||'#555'}" icon="account-box"/>
                </figure>
              </div>
              <div class="media-content">
                <p>{{item.editor.nickname}}</p>
              </div>
            </div>
            <b-taglist>
              <b-tag class='is-primary' v-if='item.fromMyMondais'>自作問題のみ</b-tag>
              <b-tag v-for="tag in item.tags" :key="tag">{{tag}}</b-tag>
            </b-taglist>
            <div class="content">
              <p class="multiline">{{item.description}}</p>
              <p class="grey">{{item.updateDate}}</p>
            </div>
          </div>
          <footer class="card-footer">
            <router-link class="card-footer-item" :to="{ name: 'MondaiList', params: {id: item.id} }">詳細</router-link>
          </footer>
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
  data () {
    return {
      name: '-',
      genreFilter: 'all',
      siteFilter: 'all',
      mondaiList: []
    }
  },
  mounted: function () {
    let mondaiList = this.$localStorage.get('mondaiList') || []
    if (mondaiList.length > 0) {
      this.mondaiList = mondaiList
    }
    let vm = this
    this.$http.get(this.$endPoint('/api/mondaiList'))
      .then(function (response) {
        let sorted = response.data.sort((x, y) => {
          // Descending sort
          return y.id - x.id
        })
        vm.mondaiList = sorted
        vm.$localStorage.set('mondaiList', vm.mondaiList)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    url: function (id) {
      return '/mondaiList/show/' + id
    },
    to: function (id) {
      this.$router.push(this.url(id))
    }
  }
}
</script>
