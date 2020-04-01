<template>
    <div
        style="position: relative; width:100%"
        :style="{'height': chartHeight}"
    >
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script>
import { Line, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;
import Chart from 'chart.js';
import { mapState } from 'vuex';

export default {
    extends: Line,
    mixins: [reactiveProp],
    data: function () {
        return {
            windowWidth: window.innerWidth,
            options: {},
        }
    },
    mounted () {
        Chart.defaults.global.elements.point.radius = this.windowWidth >= 600 ? 3 : 1;
        Chart.defaults.global.elements.line.borderWidth = this.windowWidth >= 600 ? 3 : 2;

        this.options = {
            responsive: true,
            maintainAspectRatio: false,
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
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                backgroundColor: '#000',
                titleFontSize: 18,
                titleFontColor: '#2196f3',
                titleAlign: 'center',
                titleMarginBottom: 10,
                bodySpacing: 10,
                bodyFontSize: 14,
                xPadding: 10,
                yPadding: 10,
                callbacks: {
                    label: function (tooltipItem, data) {
                        return ' ' + data.datasets[tooltipItem.datasetIndex].label + ': ' + Intl.NumberFormat('de-DE').format(tooltipItem.yLabel);
                    }
                }
            },
            hover: {
                mode: 'index',
                intersect: false
            },
            scales: {
                yAxes: [{
                    type: this.chartType,
                    ticks: {
                        callback: function (n, index, values) {
                            if (n < 1e3) return n;
                            if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
                            if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
                            if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
                            if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
                        },
                        maxTicksLimit: 10
                    },
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'day',
                        unitStepSize: window.innerWidth >= 600 ? 5 : 15
                    }
                }]
            },
            elements: {
                point: {
                    hoverRadius: window.innerWidth >= 600 ? 8 : 4,
                    hoverBackgroundColor: '#fff',
                    hoverBorderWidth: window.innerWidth >= 600 ? 4 : 2,
                }
            }
        };

         window.onresize = () => {
            this.windowWidth = window.innerWidth;
        }

        this.renderChart(this.chartData, this.options);
    },
    watch: {
        'chartData.datasets': function () {
            this.$data._chart.update();
        },
        chartType: function () {
            this.$data._chart.destroy();
            this.options.scales.yAxes[0].type = this.chartType;
            this.renderChart(this.chartData, this.options);
        }
    },
    computed: {
        chartHeight: function () {
            return this.windowWidth >= 600 ? '60vh' : '50vh';
        },
        ...mapState({
            chartType: state => state.chartType
        })
    }
}
</script>