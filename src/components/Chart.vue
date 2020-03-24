<template>
    <div>
        <canvas ref="canvas" :style="chartStyle"></canvas>
    </div>
</template>

<script>
import { Line, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;
import Chart from 'chart.js';

export default {
    extends: Line,
    mixins: [reactiveProp],
    data: function () {
        return {
            windowWidth: window.innerWidth,
        }
    },
    mounted () {
        Chart.defaults.global.elements.point.radius = this.windowWidth >= 600 ? 3 : 1;
        Chart.defaults.global.elements.line.borderWidth = this.windowWidth >= 600 ? 3 : 2;

         window.onresize = () => {
            this.windowWidth = window.innerWidth;
        }

        this.renderChart(this.chartData, { responsive: true });
    },
    watch: {
        'chartData.datasets': function () {
            this.$data._chart.update();
        }
    },
    computed: {
        chartStyle: function () {
            const height = this.windowWidth >= 600 ? '450px' : '500px';
            const width = this.windowWidth >= 600 ? '100%' : '500px';
            return { height, width };
        }
    }
}
</script>