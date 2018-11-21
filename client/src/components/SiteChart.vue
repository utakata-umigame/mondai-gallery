<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: {
    list: Array
  },
  computed: {
    site () {
      return this.$store.state.site
    }
  },
  mounted () {
    let counts = new Map()
    this.list.forEach(m => {
      let val = 0
      if (counts.get(m.site)) val = counts.get(m.site)
      counts.set(m.site, val+1)
    })
    let sorted = [...counts.entries()].sort((x, y) => y[1] - x[1])
    console.log(sorted)
    let labels = sorted.map(x => this.site[x[0]].name)
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
