<template>
  <Timeline
    :timeline-items="timeline"
    message-when-no-items="まだ登録されていません。"/>
</template>
<script>
import Timeline from 'timeline-vuejs'
export default {
  props: {
    timelineItems: Array
  },
  components: {
    Timeline
  },
  computed: {
    timeline () {
      if (this.timelineItems.length === 0) return []
      let years = this.timelineItems.map(x => new Date(x.date).getFullYear())
      let data = this.timelineItems.map(x => {
        return {
          nameMonth: this.formatDate(new Date(x.date)),
          date: new Date(x.date),
          title: x.title,
          description: x.description
        }
      })
      let sorted = this.sort(data)
      let set = new Set(years.sort((x, y) => y - x))
      let res = []
      set.forEach(y => {
        res.push({
          year: {
            from: y,
            to: '　'
          },
          items: sorted.filter(x => x.date.getFullYear() === y)
        })
      })
      return res
    },
    day: () => ({
      0: '日',
      1: '月',
      2: '火',
      3: '水',
      4: '木',
      5: '金',
      6: '土',
    }),
    month: () => ({
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December'
    })
  },
  methods: {
    sort (data) {
      return data.sort((x, y) => {
        return y.date - x.date
      })
    },
    formatDate(date) {
      let month = date.getMonth() + 1
      let dateNum = date.getDate()
      let dayNum = date.getDay()
      return month + '/' + dateNum + '(' + this.day[dayNum] + ')'
    }
  },
  data () {
    return {
    }
  }
}
</script>
