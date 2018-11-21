<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: {
    list: Array
  },
  mounted () {
    let counts = new Map()
    this.list.forEach(m => {
      let val = 0
      if (counts.get(m.author)) val = counts.get(m.author)
      counts.set(m.author, val+1)
    })
    let sorted = [...counts.entries()].sort((x, y) => y[1] - x[1])
    console.log(sorted)
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
    }, {responsive: true, maintainAspectRatio: false})
  }
}
</script>
