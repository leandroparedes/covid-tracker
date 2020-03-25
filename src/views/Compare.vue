<template>
    <div>
        <div class="headline mb-5">Comparar países</div>
        <v-autocomplete
            v-model="values"
            :items="countries"
            outlined
            chips
            small-chips
            clearable
            label="Países"
            multiple
            ref="select"
            :disabled="loading"
            @click:clear="clear"
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

        <div v-if="values.length">
            <v-card>
                <v-tabs
                    fixed-tabs
                    background-color="#1e1e1e"
                    center-active
                    show-arrows
                >
                    <v-tab>Confirmados</v-tab>
                    <v-tab>Muertos</v-tab>

                    <v-tab-item class="pa-6">
                        <chart
                            v-if="confirmedChartLoaded"
                            :chart-data="confirmedChartData"
                        ></chart>
                    </v-tab-item>
                    <v-tab-item class="pa-6">
                        <chart
                            v-if="deathsChartLoaded"
                            :chart-data="deathsChartData"
                        ></chart>
                    </v-tab-item>
                </v-tabs>
            </v-card>

            <v-row>
                <v-col
                    cols="12" sm="6" md="3"
                    v-for="(country, index) in countriesInfo"
                    :key="index"
                >
                    <v-hover v-slot:default="{ hover }">
                        <v-card
                            :elevation="hover ? 20 : 2"
                            class="pa-1"
                        >
                            <v-card-title class="pb-0">
                                <div class="text-truncate">
                                    <router-link :to="{
                                        path: '/',
                                        query: { country: country.originalName }
                                    }">
                                        {{ country.name }}
                                    </router-link>
                                </div>
                            </v-card-title>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="6">
                                        <div class="overline">Población</div>
                                        <div class="body-2">{{ country.population | formatNumber }}</div>
                                    </v-col>
                                    <v-col cols="6">
                                        <div class="overline">Confirmados</div>
                                        <div class="body-2">{{ country.confirmed | formatNumber }}</div>
                                    </v-col>
                                    <v-col cols="6">
                                        <div class="overline">Muertos</div>
                                        <div class="body-2">{{ country.deaths | formatNumber }}</div>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
        </div>
        <div v-else class="text-center pa-4 font-weight-light font-italic">
            No hay paises seleccionados
        </div>

        <div class="text-center mt-8">
            <router-link to="/">Volver al inicio</router-link>
        </div>

        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
import Chart from '@/components/Chart.vue';
import Vue from 'vue';

export default {
    name: 'compare',
    components: { Chart },
    data: function () {
        return {
            loading: false,
            countries: [],
            values: [],
            confirmedChartLoaded: false,
            confirmedChartData: {
                labels: [],
                datasets: []
            },
            deathsChartLoaded: false,
            deathsChartData: {
                labels: [],
                datasets: []
            },
            countriesInfo: []
        }
    },
    mounted () {
        const countriesUrl = 'https://covid-api-wrapper.herokuapp.com/cases';

        this.axios.get(countriesUrl).then(res => {
            res.data.map(country => {
                this.countries.push(country.originalName);
            });
        });
    },
    methods: {
        sort: function (o) {
            return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
        },
        getColor: function () {
            var color = Math.floor(Math.random() * 16777216).toString(16);
            return '#000000'.slice(0, -color.length) + color;
        },
        remove: function (countryName) {
            this.values = this.values.filter(v => v != countryName);
        },
        clear: function () {
            this.values = [];
        }
    },
    watch: {
        values: function (newArray, oldArray) {
            this.loading = true;

            setTimeout(() => {
                this.$refs.select.isMenuActive = false
            }, 50);

            this.confirmedChartLoaded = false;
            this.deathsChartLoaded = false;

            if (newArray.length == 0) {
                this.confirmedChartData.datasets = [];
                this.deathsChartData.datasets = [];

                this.countriesInfo = [];

                this.confirmedChartLoaded = true;
                this.deathsChartLoaded = true;

                this.loading = false;
            } else if (newArray.length < oldArray.length) {
                const removed = oldArray.filter(c => !newArray.includes(c))[0];

                this.confirmedChartData.datasets = this.confirmedChartData.datasets.filter(d => d.label  != removed);
                this.deathsChartData.datasets = this.deathsChartData.datasets.filter(d => d.label  != removed);

                this.countriesInfo = this.countriesInfo.filter(c => c.originalName != removed);

                this.confirmedChartLoaded = true;
                this.deathsChartLoaded = true;
                this.loading = false;
            } else {
                const lastAdded = newArray.length > 0 ? newArray[newArray.length -1] : newArray[0];

                const confirmedUrl = `https://covid-api-wrapper.herokuapp.com/history?country=${lastAdded}&status=Confirmed`;
                const deathsUrl = `https://covid-api-wrapper.herokuapp.com/history?country=${lastAdded}&status=Deaths`;

                const color = this.getColor();
                this.axios.get(confirmedUrl).then(res => {
                    const sortedData = this.sort(res.data.dates);
                    this.confirmedChartData.labels = Object.keys(sortedData);
                    this.confirmedChartData.datasets.push({
                        label: res.data.originalName,
                        borderColor: color,
                        fill: false,
                        data: Object.values(sortedData),
                        pointBackgroundColor: color,
                        pointHoverBackgroundColor: color,
                        pointHoverBorderColor: color,
                    });

                    this.countriesInfo.push({
                        name: res.data.name,
                        originalName: res.data.originalName,
                        population: res.data.population,
                        confirmed: res.data.confirmed,
                        deaths: res.data.deaths,
                        recovered: res.data.recovered
                    });
                }).finally(() => {
                    this.confirmedChartLoaded = true;
                });

                this.axios.get(deathsUrl).then(res => {
                    const sortedData = this.sort(res.data.dates);
                    this.deathsChartData.labels = Object.keys(sortedData);
                    this.deathsChartData.datasets.push({
                        label: res.data.originalName,
                        borderColor: color,
                        fill: false,
                        data: Object.values(sortedData),
                        pointBackgroundColor: color,
                        pointHoverBackgroundColor: color,
                        pointHoverBorderColor: color,
                    });
                }).finally(() => {
                    this.deathsChartLoaded = true;
                    this.loading = false;
                });
            }
        }
    }
}
</script>