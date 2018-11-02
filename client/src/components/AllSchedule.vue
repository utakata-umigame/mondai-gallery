<template>
  <ScheduleView :schedule="schedule"/>
</template>
<script>
import ScheduleView from '@/components/ScheduleView'
export default {
  components: {
    ScheduleView
  },
  data () {
    return {
      schedule: {
        color: '',
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
  },
  methods: {

  }
}
</script>
