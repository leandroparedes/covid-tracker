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
    props: {
        options: {
            type: Object,
            default: null
        }
    },
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

        this.renderChart(this.chartData, this.options)
    },
    computed: {
        chartStyle: function () {
            const height = this.windowWidth >= 600 ? '450px' : '500px';
            const width = this.windowWidth >= 600 ? '100%' : '500px';
            return { height, width };
        },
        size: function () {
            return {
                height: {
                    400: this.windowWidth >= 600,
                    500: this.windowWidth < 600
                },
                width: {
                    900: this.windowWidth >= 600,
                    500: this.windowWidth < 600,
                }
            };
        }
    }
}
</script>