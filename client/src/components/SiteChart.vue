<script>
import { PolarArea } from 'vue-chartjs'

export default {
  extends: PolarArea,
  props: {
    list: Array
  },
  computed: {
    site () {
      return this.$store.state.site
    },
    siteNames () {
      let list = []
      for(let key in this.$store.state.site) {
        list.push(this.$store.state.site[key].name)
      }
      return list
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
      let data = []
      for (let key in this.site) {
        data.push(counts.get(key) || 0)
      }
      this.renderChart({
        labels: this.siteNames,
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
          text: 'サイト'
        },
        legend: {
          position: 'bottom'
        }
      })
    }
  }
}
</script>
