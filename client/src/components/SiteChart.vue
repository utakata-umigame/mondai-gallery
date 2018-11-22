<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: {
    list: Array
  },
  computed: {
    site () {
      return this.$store.state.site
    }
  },
  mounted () {
    this.render()
  },
  watch: {
    list () {
      this.render()
    }
  },
  methods: {
    render () {
      let counts = new Map()
      this.list.forEach(m => {
        let val = counts.get(m.site) || 0
        counts.set(m.site, val+1)
      })
      let sorted = [...counts.entries()].sort((x, y) => y[1] - x[1])
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
}
</script>
