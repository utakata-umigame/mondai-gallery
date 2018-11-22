<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: {
    list: Array
  },
  methods: {
    render () {
      let counts = new Map()
      this.list.forEach(m => {
        let val = counts.get(m.author) || 0
        counts.set(m.author, val+1)
      })
      let sorted = [...counts.entries()].sort((x, y) => y[1] - x[1])
      let labels = sorted.map(x => x[0])
      let data = sorted.map(x => x[1])
      this.renderChart({
        labels: labels,
        datasets: [
          {
            backgroundColor: [
              '#41B883',
              '#E46651',
              '#00D8FF',
              '#DD1B16'
            ],
            data: data
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: '作者'
        }
      })
    }
  },
  watch: {
    list () {
      this.render()
    }
  },
  mounted () {
    this.render()
  }
}
</script>
