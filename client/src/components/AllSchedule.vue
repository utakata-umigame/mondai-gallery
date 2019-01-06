<template>
  <div>
    <div class="content">
      <b-datepicker
          inline
          v-model="date"
          :month-names="['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']"
          :day-names="['日','月','火','水','木','金','土']"
          :events="events()"
          @input="filter"
          indicators="dots"
          >
      </b-datepicker>
      <button @click="reset" class="button is-primary is-outlined">リセット</button>
  </div>
    <ScheduleView :schedule="filtered"/>
  </div>
</template>
<script>
import ScheduleView from '@/components/ScheduleView'
export default {
  components: {
    ScheduleView
  },
  data () {
    return {
      date: new Date(),
      schedule: {
        color: '',
        tasks: []
      },
      filtered: {
        tasks: []
      }
    }
  },
  created () {
    this.$http.get(this.$endPoint('/api/schedule'))
      .then(res => {
        this.schedule.tasks = res.data.map(t => {
          t.createdDate = new Date(t.createdDate)
          t.endDate = new Date(t.endDate)
          return t
        })
      })
      .then(() => {
        this.filtered = Object.assign({}, this.schedule)
      })
  },
  methods: {
    events () {
      return this.schedule.tasks.map(x => {
        let d = x.endDate
        return {
          date: d,
          type: 'is-info'
        }
      })
    },
    filter () {
      this.filtered.tasks = this.schedule.tasks.filter(x => this.fullDate(x.endDate) === this.fullDate(this.date))
    },
    reset () {
      this.filtered = Object.assign({}, this.schedule)
    },
    fullDate (date) {
      return date.getYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
    }
  }
}
</script>
