<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: {
    list: Array
  },
  computed: {
    genre () {
      return this.$store.state.genre
    }
  },
  mounted () {
    let counts = new Map()
    this.list.forEach(m => {
      let val = counts.get(m.genre) || 0
      counts.set(m.genre, val+1)
    })
    let sorted = [...counts.entries()].sort((x, y) => y[1] - x[1])
    let labels = sorted.map(x => this.genre[x[0]])
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
    }, {responsive: true, maintainAspectRatio: false})
  }
}
</script>
