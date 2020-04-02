<template>
    <div>
        <div class="text-center">
            <div class="display-2 font-weight-black">COMPARE</div>
        </div>

        <v-autocomplete
            v-model="values"
            :items="items"
            outlined
            chips
            small-chips
            clearable
            label="Choose countries to compare"
            multiple
            class="mt-8"
        >
            <template v-slot:selection="data">
                <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="remove(data.item)"
                >{{ data.item }}</v-chip>
            </template>
        </v-autocomplete>

        <v-row v-if="values.length" class="mb-8">
            <v-col
                cols="12" lg="6"
                v-for="(type,index) in chartTypes"
                :key="index"
            >
                <v-card>
                    <div class="title pl-4 pt-4 text-capitalize">{{ type }}</div>
                    <v-tabs centered>
                        <v-tab>Cases</v-tab>
                        <v-tab>Recovered</v-tab>
                        <v-tab>Deaths</v-tab>

                        <v-tab-item class="pa-4">
                            <historical-chart
                                v-if="casesChartLoaded"
                                :chart-data="casesChart"
                                :type="type"
                            ></historical-chart>
                        </v-tab-item>

                        <v-tab-item class="pa-4">
                            <historical-chart
                                v-if="recoveredChartLoaded"
                                :chart-data="recoveredChart"
                                :type="type"
                            ></historical-chart>
                        </v-tab-item>

                        <v-tab-item class="pa-4">
                            <historical-chart
                                v-if="deathsChartLoaded"
                                :chart-data="deathsChart"
                                :type="type"
                            ></historical-chart>
                        </v-tab-item>
                    </v-tabs>
                </v-card>
            </v-col>
        </v-row>
        <div v-else class="text-center grey--text mt-6">
            <v-icon size="100" color="grey">fas fa-globe-americas</v-icon>
            <div class="headline mt-6">Select countries to compare</div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import HistoricalChart from '@/components/HistoricalChart.vue';

export default {
    name: 'Compare',

    components: { HistoricalChart },

    data: function () {
        return {
            chartTypes: ['linear', 'logarithmic'],

            values: [],
            items: [],

            casesChartLoaded: false,
            casesChart: {
                labels: [],
                datasets: []
            },

            recoveredChartLoaded: false,
            recoveredChart: {
                labels: [],
                datasets: []
            },

            deathsChartLoaded: false,
            deathsChart: {
                labels: [],
                datasets: []
            }
        }
    },

    mounted () {
        this.$store.dispatch('fetch_countries_data');
        const countries = this.$store.state.countries.data;
        countries.map(country => this.items.push(country.country));
    },

    methods: {
        remove: function (country) {
            this.values = this.values.filter(v => v != country);
        },
        getRandomColor: function () {
            var color = Math.floor(Math.random() * 16777216).toString(16);
            return '#000000'.slice(0, -color.length) + color;
        }
    },

    watch: {
        values: function (newValues, oldValues) {
            if (newValues.length === 0) {
                this.casesChart = { labels: [], datasets: [] };
                this.recoveredChart = { labels: [], datasets: [] };
                this.deathsChart = { labels: [], datasets: [] };
            } else if (newValues.length < oldValues.length) {
                const removed = oldValues.filter(c => !newValues.includes(c))[0];
                this.casesChart.datasets = this.casesChart.datasets.filter(d => d.label != removed);
                this.recoveredChart.datasets = this.recoveredChart.datasets.filter(d => d.label != removed);
                this.deathsChart.datasets = this.deathsChart.datasets.filter(d => d.label != removed);
            } else {
                this.casesChartLoaded = false;
                this.recoveredChartLoaded = false;
                this.deathsChartLoaded = false;

                const lastAddedCountry = newValues.length > 0 ? newValues[newValues.length -1] : newValues[0];
                const historicalUrl = `https://corona.lmao.ninja/v2/historical/${lastAddedCountry}`;

                const color = this.getRandomColor();

                this.axios.get(historicalUrl).then(res => {
                    this.casesChart.labels = Object.keys(res.data.timeline.cases);
                    this.casesChart.datasets.push({
                        label: res.data.country,
                        data: Object.values(res.data.timeline.cases),
                        fill: false,
                        borderColor: color,
                        pointBackgroundColor: color
                    });

                    this.recoveredChart.labels = Object.keys(res.data.timeline.recovered);
                    this.recoveredChart.datasets.push({
                        label: res.data.country,
                        data: Object.values(res.data.timeline.recovered),
                        fill: false,
                        borderColor: color,
                        pointBackgroundColor: color
                    });

                    this.deathsChart.labels = Object.keys(res.data.timeline.deaths);
                    this.deathsChart.datasets.push({
                        label: res.data.country,
                        data: Object.values(res.data.timeline.deaths),
                        fill: false,
                        borderColor: color,
                        pointBackgroundColor: color
                    });
                }).finally(() => {
                    this.casesChartLoaded = true;
                    this.recoveredChartLoaded = true;
                    this.deathsChartLoaded = true;
                });
            }
        }
    }
}
</script>