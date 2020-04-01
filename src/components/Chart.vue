<template>
    <div>
        <div class="d-flex flex-row-reverse mb-5 mb-md-0 justify-start">
            <v-menu
                offset-y
                :close-on-click="true"
            >
                <template v-slot:activator="{ on }">
                    <v-btn text v-on="on">
                        {{ $vuetify.lang.t(`$vuetify.${selectedChartType}`) }}
                        <v-icon small class="ml-2">fas fa-angle-down</v-icon>
                    </v-btn>
                </template>

                <v-card tile>
                    <v-list>
                        <v-list-item
                            v-for="(chartType, index) in chartTypes"
                            :key="index"
                            @click="changeChartType(chartType)"
                        >
                            {{ $vuetify.lang.t(`$vuetify.${chartType}`) }}
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
        </div>

        <div
            style="position: relative; width:100%"
            :style="{'height': chartHeight}"
        >
            <canvas ref="canvas"></canvas>
        </div>
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
            chartTypes: ['linear', 'logarithmic'],
            selectedChartType: 'linear',
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
                    type: this.selectedChartType,
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
    methods: {
        changeChartType: function (type) {
            this.selectedChartType = type;
        }
    },
    watch: {
        'chartData.datasets': function () {
            this.$data._chart.update();
        },
        selectedChartType: function () {
            this.$data._chart.destroy();
            this.options.scales.yAxes[0].type = this.selectedChartType;
            this.renderChart(this.chartData, this.options);
        }
    },
    computed: {
        chartHeight: function () {
            return this.windowWidth >= 600 ? '60vh' : '50vh';
        }
    }
}
</script>