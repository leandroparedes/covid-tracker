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

        this.renderChart(this.chartData, {
            responsive: true,
            legend: {
                onClick: (e, legendItem) => {
                    var index = legendItem.datasetIndex;
                    var ci = this.$data._chart;
                    var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;
                    ci.data.datasets.forEach(function(e, i) {
                        var meta = ci.getDatasetMeta(i);

                        if (i !== index) {
                            if (!alreadyHidden) {
                                meta.hidden = meta.hidden === null ? !meta.hidden : null;
                            } else if (meta.hidden === null) {
                                meta.hidden = true;
                            }
                        } else if (i === index) {
                                meta.hidden = null;
                        }
                    });
                    ci.update();
                }
            }
        });
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