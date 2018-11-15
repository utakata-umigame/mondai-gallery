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
      let years = this.timelineItems.map(x => new Date(x.date).getFullYear())
      let data = this.timelineItems.map(x => {
        return {
          nameMonth: this.formatDate(new Date(x.date)),
          date: new Date(x.date),
          title: x.title,
          description: x.description
        }
      })
      return [{
        year: {
          from: Math.min(...years),
          to: Math.max(...years)
        },
        items: this.sort(data)
      }]
    },
    day: () => ({
      0: '日',
      1: '月',
      2: '火',
      3: '水',
      4: '木',
      5: '金',
      6: '土',
    })
  },
  methods: {
    sort (data) {
      return data.sort((x, y) => {
        return y.date - x.date
      })
    },
    formatDate(date) {
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let dateNum = date.getDate()
      let dayNum = date.getDay()
      return year + '年' + month + '月' + dateNum + '日' + '(' + this.day[dayNum] + ')'
    }
  },
  data () {
    return {
      /* timelineItems: [
        {
          year: {
            from: '2017',
            to: '2018'
          },
          items: [
            {
              nameMonth: 'February　3',
              title: 'Five',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius earum architecto dolor, vitae magnam voluptate accusantium assumenda numquam error mollitia, officia facere consequuntur reprehenderit cum voluptates, ea tempore beatae unde.'
            },
            {
              nameMonth: 'January',
              title: 'Five',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius earum architecto dolor, vitae magnam voluptate accusantium assumenda numquam error mollitia, officia facere consequuntur reprehenderit cum voluptates, ea tempore beatae unde.'
            }
          ]
        },
        {
          year: {
            from: '2016',
            to: '2017'
          },
          items: [
            {
              nameMonth: 'February',
              title: 'Five',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius earum architecto dolor, vitae magnam voluptate accusantium assumenda numquam error mollitia, officia facere consequuntur reprehenderit cum voluptates, ea tempore beatae unde.'
            },
            {
              nameMonth: 'January',
              title: 'Five',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius earum architecto dolor, vitae magnam voluptate accusantium assumenda numquam error mollitia, officia facere consequuntur reprehenderit cum voluptates, ea tempore beatae unde.'
            }
          ]
        },
      ] */
    }
  }
}
</script>
