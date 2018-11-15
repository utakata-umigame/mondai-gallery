<template>
  <Timeline
    :timeline-items="timelineItems"
    message-when-no-items="まだ登録されていません。"/>
</template>
<script>
import Timeline from 'timeline-vuejs'
export default {
  props: {
    timelineItems: []
  },
  components: {
    Timeline
  },
  data () {
    return {
      timelineItems: [
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
      ]
    }
  }
}
</script>
