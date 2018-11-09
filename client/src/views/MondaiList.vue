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
              <b-icon icon="format-list-bulleted"/>
            </span>
            <span>{{mondaiList.name}}</span>
          </a>
        </li>
      </ul>
    </nav>
    <div class="columns">
      <div class="column is-one-third">
        <div class="card mb">
          <div class="card-content">
            <p class="title is-4">{{mondaiList.name}}</p>
            <p class="subtitle is-6">
              <img :src="mondaiList.editor.picUrl" v-if="mondaiList.editor.picUrl" width="32" height="32" alt="No Image">
              <b-icon v-else icon="account-box" :style="{'color': mondaiList.editor.color||'#555'}"/>
              <a @click="to(profileUrl())">{{mondaiList.editor.nickname}}</a>
            </p>
            <b-taglist>
              <b-tag v-for="item in mondaiList.tags">{{item}}</b-tag>
            </b-taglist>
            <p class="multiline card-body">{{mondaiList.description}}</p>
          </div>
        </div>
        <!-- 次に見る -->
        <div class="panel" v-if="otherList.length > 0">
          <div class="panel-heading">
            <b-icon icon="arrow-right-drop-circle-outline"></b-icon><span>次に見る</span>
          </div>
          <list-link :item="item" v-for="item in otherList" v-bind:key="item.id"></list-link>
        </div>
      </div>
      <div class="column">
        <!-- リスト -->
        <div class="panel">
          <div class="panel-heading">
            <div class="level">
              <div class="level-left">
                <div class="level-item">
                  <b-select placeholder="Select a name" v-model="siteFilter">
                    <option v-for="item in siteList" :value="item.key" :key="item.key">{{item.value.name}}</option>
                  </b-select>
                </div>
                <div class="level-item">
                  <b-select placeholder="Select a genre" v-model="genreFilter">
                    <option v-for="item in genreList" :value="item.key" :key="item.key">{{item.value}}</option>
                  </b-select>
                </div>
                <div class="level-item">
                  <a class="button is-outlined is-danger" v-on:click='clearFilter()'>クリア</a>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <b-select v-model='detail'>
                    <option :value="false">リスト</option>
                    <option :value="true">詳細</option>
                  </b-select>
                </div>
                <div class="level-item">
                  <button class="button is-outlined is-secondary" @click="$router.push(editUrl())" v-if="isMine">編集</button>
                </div>
              </div>
            </div>
          </div>
          <transition-group
            name="mondai"
            @beforeEnter="beforeEnter"
            @afterEnter="afterEnter">
            <a class="panel-block" v-for="item in filter(mondaiList.mondai)" v-bind:key="item._id" target='_blank' v-bind:href='url(item.site,item.id)' :data-index="item._id">
                <mondai-view :item="item" v-if="detail"/>
                <simple-mondai :item="item" v-else/>
            </a>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SimpleMondaiView from '@/components/SimpleMondaiView'
export default {
  components: {
    'simple-mondai': SimpleMondaiView
  },
  data () {
    return {
      name: 'MondaiList',
      genreFilter: 'all',
      siteFilter: 'all',
      detail: false,
      isMine: false,
      otherList: [],
      mondaiList: {
        'name': '',
        'description': '',
        'editor': {
          'id': 0,
          'username': '',
          'nickname': '',
          'color': ''
        },
        'mondai': []
      }
    }
  },
  computed: {
    site: function () {
      return this.$store.state.site
    },
    siteList: function () {
      let list = [{key: 'all', value: {'name': 'すべてのサイト'}}]
      for (let key in this.$store.state.site) {
        list.push({key: key, value: this.$store.state.site[key]})
      }
      return list
    },
    genre: function () {
      return this.$store.state.genre
    },
    genreList: function () {
      let list = [{key: 'all', value: 'すべてのジャンル'}]
      for (let key in this.$store.state.genre) {
        list.push({key: key, value: this.$store.state.genre[key]})
      }
      return list
    }
  },
  watch: {
    '$route' (to, from) {
      this.fetchList()
    }
  },
  mounted: function () {
    this.fetchList()
  },
  methods: {
    beforeEnter (el) {
      el.style.transitionDelay = Math.min(100 * el.dataset.index, 3000) + 'ms'
    },
    afterEnter (el) {
      el.style.transitionDelay = ''
    },
    url: function (siteName, id) {
      return this.site[siteName].showUrl + id
    },
    editUrl: function () {
      return '/mondaiList/edit/' + this.mondaiList.id
    },
    profileUrl: function () {
      return '/profile/show/' + this.mondaiList.editor.id
    },
    to: function (url) {
      this.$router.push(url)
    },
    filter: function (mondai) {
      let filtered = mondai
      // ジャンル
      if (this.genreFilter !== 'all') filtered = filtered.filter(x => x.genre === this.genreFilter)
      // サイト
      if (this.siteFilter !== 'all') filtered = filtered.filter(x => x.site === this.siteFilter)

      return filtered
    },
    sort: function (mondai) {
      let sorted = mondai.sort((x,y)=> {
        return x._id - y._id
      })
      return sorted
    },
    clearFilter: function () {
      this.genreFilter = 'all'
      this.siteFilter = 'all'
    },
    fetchList: function () {
      let vm = this
      let id = this.$route.params.id
      let data = this.$store.state.savedLists[id]
      if (data) {
        this.mondaiList = data.mondaiList
        this.mondaiList.mondai = this.sort(this.filter(data.mondaiList.mondai))
        this.otherList = data.otherList
        this.isMine = data.isMine
      } else {
        this.$http.get(this.$endPoint('/api/mondaiList/' + id))
          .then( response => {
            vm.mondaiList = response.data
            vm.mondaiList.mondai = vm.sort(vm.filter(vm.mondaiList.mondai))
            vm.$http.get(vm.$endPoint('/api/mondaiList'))
              .then( res => {
                vm.otherList = res.data.filter(x => x.editor.id === vm.mondaiList.editor.id && x.id !== vm.mondaiList.id)
              })
          })
          .catch(function (err) {
            if (err) {
              vm.$toast.open({
                'message': err.message,
                'type': 'is-danger'
              })
            }
          })
          .then(() => {
            vm.$http.get(vm.$endPoint('/api/user'))
              .then( res => {
                if (res) {
                  if (res.data) {
                    if (res.data.username === vm.mondaiList.editor.username) {
                      vm.isMine = true
                    }
                    let data = {
                      id: vm.mondaiList.id,
                      mondaiList: vm.mondaiList,
                      otherList: vm.otherList,
                      isMine: vm.isMine
                    }
                    vm.$store.commit('setSavedList', data)
                  }
                }
              })
          })
      }
    }
  }
}
</script>
<style scoped>
.level {
  width: 100%;
}
.mr {
  margin-right: 5px;
}
.mb {
  margin-bottom: 10px;
}
small {
  margin-right: 5px;
}
.mondai-move:not(.mondai-leave-active) {
  transition: all .5s ease;
}
.mondai-enter-active {
  transition: all .3s ease;
}
.mondai-enter {
  opacity: 0;
}
.mondai-leave-active {
  opacity: 0;
  position: absolute;
}
.mondai-leave-to {
  opacity: 0;
}
</style>
