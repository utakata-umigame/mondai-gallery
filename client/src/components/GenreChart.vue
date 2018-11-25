<script>
import { Radar } from 'vue-chartjs'

export default {
  extends: Radar,
  props: {
    list: Array
  },
  computed: {
    genre () {
      return this.$store.state.genre
    },
    genreNames: function () {
      let list = []
      for(let key in this.$store.state.genre) {
        list.push(this.$store.state.genre[key])
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
        let val = counts.get(m.genre) || 0
        counts.set(m.genre, val+1)
      })
      let data = []
      for (let key in this.genre) {
        data.push(counts.get(key) || 0)
      }
      this.renderChart({
        labels: this.genreNames,
        datasets: [
          {
            borderColor: "rgb(255, 99, 132)",
            data: data
          }
        ]
      }, {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'ジャンル'
        },
        legend: {
          display: false
        },
        scale: {
          ticks: {
            min: 0
          }
        }
      })
    }
  }
}
</script>
