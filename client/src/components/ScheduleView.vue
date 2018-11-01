<template>
  <div>
    <div class="panel mb" v-if="schedule.tasks.length > 0">
      <div class="panel-heading caption-light":style="{'background-color': color||'#555', 'color': '#fff'}">
        スケジュール
      </div>
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-4 is-child box" v-for="item in schedule.tasks" :class="{'done': item.isDone}">
            <p class="title is-4">{{item.title}}</p>
            <p class="subtitle grey is-6">{{formatDate(item.endDate)}}</p>
            <p class="multiline">{{item.description}}</p>
          </div>
        </div>
      </div>
      <!--<div v-for="item in schedule.tasks" :class="{'done': item.isDone}" class="panel-block">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <span class="mr">{{formatDate(item.endDate)}}</span>
              <strong>{{item.title}}</strong>
            </div>
          </div>
        </div>
      </div>-->
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
</style>
