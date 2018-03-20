<script>
  import { Bar, mixins } from 'vue-chartjs'

  const {reactiveProp} = mixins

  export default {
    extends: Bar,

    name: 'bar-chart',

    mixins: [
      reactiveProp
    ],

    props: ['options'],

    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>