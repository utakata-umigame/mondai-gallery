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
      let data = sorted.map(x => x[1]).slice(0,4)
      let topCount = data.reduce((sum, next) => sum + next, 0)
      let otherCount = this.list.length - topCount
      let over4 = labels.length > 4
      this.renderChart({
        labels: over4 ? [...labels.slice(0,4), 'その他'] : labels.slice(0, 4),
        datasets: [
          {
            backgroundColor: [
              '#41B883',
              '#E46651',
              '#00D8FF',
              '#DD1B16'
            ],
            data: over4 ? [...data, otherCount] : data
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: '作者'
        },
        legend: {
          position: 'bottom'
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
