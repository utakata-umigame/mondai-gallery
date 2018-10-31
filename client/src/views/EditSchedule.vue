<template>
  <div>
    <h2 class="title"><span>スケジュール</span><b-tag type="is-danger" size="is-medium">DEV</b-tag></h2>
    <form @submit.prevent="addTask">
      <b-field label="イベント">
        <b-input
          v-model="newTask.title"
          placeholder="タイトル"
          required>
        </b-input>
      </b-field>
      <b-field label="内容">
        <b-input
          v-model="newTask.description"
          type="textarea"
          rows="3"
          placeholder="内容">
        </b-input>
      </b-field>
      <b-field label="日付を指定">
          <b-datepicker
            v-model="newTask.endDate"
            :min-date="getYesterday()"
            placeholder="Type or select a date..."
            icon="calendar-today"
            required>
          </b-datepicker>
      </b-field>
      <!--<b-field label="時刻を指定">
        <b-timepicker
          placeholder="Click to select..."
          icon="clock"
          hour-format="12">
        </b-timepicker>
      </b-field>-->
      <button class="button is-outlined is-primary"><b-icon icon="plus-circle"/><span>追加</span></button>
    </form>
    <div v-for="item in schedule.tasks" :class="{'done': item.isDone}" class="panel-block">
      <b-field>
        <b-checkbox v-model="item.isDone">
        </b-checkbox>
        <span class="mr">{{formatDate(item.endDate)}}</span>
        <strong>{{item.title}}</strong>
        <button class="button is-white" @click="remove(item)"><b-icon type="is-danger" icon="minus-circle"/></button>
      </b-field>
    </div>
    <div class="buttons has-addons">
      <span @click="confirm" class="button is-success is-outlined"><b-icon icon="content-save"></b-icon>&ensp;保存して戻る</span>
      <!--<button @click="saveOffline" class="button is-outlined is-success"><b-icon icon="content-save"/><span>オフライン保存</span></button>-->
      <span @click="confirmCancel" class="button is-danger is-outlined"><b-icon icon="close-circle"></b-icon>&ensp;キャンセル</span>
    </div>
  </div>
</template>
<script>
export default {
  localStorage: {
    schedule: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      schedule: {
        tasks: []
      },
      minDate: new Date(),
      newTask: {
        title: '',
        description: '',
        endDate: new Date(),
        createdDate: new Date(),
        isDone: false
      },
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
  },
  created () {
    this.$http.get(this.$endPoint('/api/schedule/' + this.$route.params.id))
      .then(res => {
        if (res) {
          this.schedule.tasks = res.data.tasks.map(t => {
            return {
              'title': t.title,
              'description': t.description,
              'createdDate': new Date(t.createdDate),
              'endDate': new Date(t.endDate),
              'isDone': t.isDone
            }
          })
          this.sort()
        }
      })
  },
  methods: {
    sort () {
      this.schedule.tasks.sort((x, y) => {
        return new Date(x.endDate) - new Date(y.endDate)
      })
    },
    getYesterday () {
      let today = new Date()
      today.setDate(today.getDate() - 1)
      return today
    },
    addTask () {
      let t = Object.assign({}, this.newTask)
      this.schedule.tasks.push(t)
      this.sort()
    },
    remove(task) {
      this.schedule.tasks = this.schedule.tasks.filter(x => x !== task)
    },
    formatDate(date) {
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let dateNum = date.getDate()
      let dayNum = date.getDay()
      return year + '年' + month + '月' + dateNum + '日' + '(' + this.day[dayNum] + ')'
    },
    saveOffline () {
      this.$localStorage.set('schedule', this.schedule)
    },
    confirm () {
      this.$dialog.confirm({
        message: '元のバージョンは失われます。続行しますか?',
        onConfirm: this.submit
      })
    },
    submit () {
      this.$http.post(this.$endPoint('/api/schedule/edit/' + this.$route.params.id), this.schedule)
        .then(res => {
          if (!res.data.error) {
            this.$toast.open({
              'type': 'is-success',
              'message': '追加しました。'
            })
          } else {
            this.$toast.open({
              'type': 'is-danger',
              'message':'編集権限がありません。'
            })
          }
        })
        .catch(err => {
          this.$toast.open({
            'type': 'is-danger',
            'message':'編集権限がありません。'
          })
        })
    },
    confirmCancel () {
      this.$dialog.confirm({
        message: '編集内容は失われます。続行しますか?',
        onConfirm: this.cancel
      })
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.done {
  text-decoration: line-through;
  color: grey;
}
</style>
