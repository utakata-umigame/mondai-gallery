<template>
  <div>
    <div class="panel mb" v-if="sorted.length > 0">
      <div class="tile is-ancestor">
        <div class="tile is-parent flex">
          <div class="tile is-4 is-child box notification" v-for="item in sorted" :class="{'is-white': !item.isDone}">
            <p class="title is-4">{{item.title}}</p>
            <p class="subtitle is-6" v-if="item.editor">
              <img :src="profile.picUrl" v-if="profile.picUrl" width="32" height="32" alt="No Image">
              <b-icon v-else icon="account-box":style="{'color': item.editor.color||'#555'}"></b-icon>
              <router-link :to="{ name: 'Profile', params: {id: item.editor.id} }">{{item.editor.nickname}}</router-link>
            </p>
            <p class="subtitle grey is-6">{{formatDate(item.endDate)}}</p>
            <b-tag class="mr" v-if="siteName[item.site]">{{siteName[item.site].name}}</b-tag>
            <b-tag v-if="item.type">{{item.type}}</b-tag>
            <p class="multiline">{{item.description}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    color: String,
    schedule: {
      tasks: []
    }
  },
  data () {
    return {
      day: {
        0: '日',
        1: '月',
        2: '火',
        3: '水',
        4: '木',
        5: '金',
        6: '土',
      }
    }
  },
  computed: {
    siteName: function () {
      return this.$store.state.site
    },
    sorted () {
      return this.schedule.tasks.sort((x, y) => {
        return new Date(x.endDate) - new Date(y.endDate)
      })
    }
  },
  methods: {
    formatDate(date) {
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let dateNum = date.getDate()
      let dayNum = date.getDay()
      return year + '年' + month + '月' + dateNum + '日' + '(' + this.day[dayNum] + ')'
    }
  }
}
</script>
<style scoped>
.grey {
  color: grey;
}
.done {
  text-decoration: line-through;
  color: grey;
}
.flex {
  flex-wrap: wrap;
}
</style>
