<template>
    <div>
        <div class="display-3 mb-4">{{ title }}</div>

        <v-row class="mb-3">
            <v-col cols="12" sm="6" md="3">
                <v-card>
                    <v-card-title class="d-flex justify-space-between">
                        Población
                        <v-icon dark>mdi-human-male</v-icon>
                    </v-card-title>
                    <v-card-text class="display-1">
                        {{ info.population | formatNumber }}
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <v-card>
                    <v-card-title class="d-flex justify-space-between">
                        Confirmados
                        <v-icon dark>mdi-check-circle</v-icon>
                    </v-card-title>
                    <v-card-text class="display-1">
                        {{ info.confirmed | formatNumber }}
                        <span class="body-1 blue-grey--text">{{ percentageDifference(info.population, info.confirmed) | percentage }}</span>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <v-card>
                    <v-card-title class="d-flex justify-space-between">
                        Muertos
                        <v-icon dark>mdi-coffin</v-icon>
                    </v-card-title>
                    <v-card-text class="display-1">
                        {{ info.deaths | formatNumber }}
                        <span class="body-1 blue-grey--text">{{ percentageDifference(info.population, info.deaths) | percentage }}</span>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title class="d-flex justify-space-between">
                        Recuperados
                        <v-icon dark>mdi-heart</v-icon>
                    </v-card-title>
                    <v-card-text class="display-1">
                        {{ info.recovered | formatNumber }}
                        <span class="body-1 blue-grey--text">{{ percentageDifference(info.population, info.recovered) | percentage }}</span>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-card class="pa-4">
            <chart
                v-if="chartLoaded"
                :chart-data="chartData"
                :chart-options="chartOptions"
            ></chart>
        </v-card>

        <div class="mb-2 mt-12 d-flex justify-space-between">
            <div class="display-2">Paises</div>
            <div>
                <v-text-field
                    v-model="searchInput"
                    label="Buscar un país"
                    outlined
                    required
                ></v-text-field>
            </div>
        </div>

        <div
            v-if="searchInput"
            class="headline mb-3"
        >
            Buscando <span class="blue--text">{{ searchInput }}</span>
        </div>

        <v-row>
            <v-col
                cols="12" sm="6" md="3"
                v-for="(country, index) in filteredCountries"
                :key="index"
            >
                <v-hover v-slot:default="{ hover }">
                    <v-card
                        :elevation="hover ? 20 : 2"
                        class="pa-1" @click="changeData(country.name)"
                    >
                        <v-card-title>{{ country.name }}</v-card-title>
                        <v-card-subtitle>Casos confirmados</v-card-subtitle>
                        <v-card-text>
                            <span class="display-1">{{ country.confirmed | formatNumber }}</span>
                            <span class="body-1 blue-grey--text">
                                {{ percentageDifference(country.population, country.confirmed) | percentage }}
                            </span>
                        </v-card-text>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Chart from '@/components/Chart.vue';

export default {
    name: 'home',
    components: { Chart },
    data: function () {
        return {
            title: 'Global',
            chartLoaded: false,
            chartData: {
                labels: [],
                datasets: []
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            },
            info: {
                population: 0,
                deaths: 0,
                recovered: 0,
                confirmed: 0
            },
            countries: [],
            filteredCountries: [],
            searchInput: ''
        }
    },
    mounted () {
        const country = this.$route.query.country || 'Global';
        const historyUrl = `https://covid-api-wrapper.herokuapp.com/history?country=${country}`;
        this.title = country;

        this.axios.get(historyUrl).then(res => {
            const data = res.data.All;
            this.loadChartData(this.sort(data.dates));
            this.loadInfoData(data);
        });

        const countriesUrl = 'https://covid-api-wrapper.herokuapp.com/cases';

        this.axios.get(countriesUrl).then(res => {
            this.loadCountriesData(this.sortByConfirmed(res.data));
            this.filteredCountries = this.countries;
        });
    },
    methods: {
        changeData: function (country) {
            this.$router.push({ query: { country: country }});

            const historyUrl = `https://covid-api-wrapper.herokuapp.com/history?country=${country}`;

            this.axios.get(historyUrl).then(res => {
                const data = res.data.All;
                this.title = country;
                this.loadChartData(this.sort(data.dates));
                this.loadInfoData(data);

                window.scrollTo(0, 0);
            });
        },
        loadChartData: function (data) {
            this.loaded = false;
            this.chartData = { labels: [], datasets: [] };
            this.chartData.labels = Object.keys(data);
            this.chartData.datasets.push({
                label: 'Casos confirmados',
                backgroundColor: '#375a7f',
                data: Object.values(data)
            });
            this.chartLoaded = true;
        },
        loadInfoData: function (data) {
            this.info.population = data.population;
            this.info.deaths = data.deaths;
            this.info.recovered = data.recovered;
            this.info.confirmed = data.confirmed;
        },
        loadCountriesData: function (data) {
            Object.keys(data).map(async (country) => {
                this.countries.push({
                    name: country,
                    population: data[country].All.population,
                    deaths: data[country].All.deaths,
                    recovered: data[country].All.recovered,
                    confirmed: data[country].All.confirmed
                });
            });
        },
        percentageDifference: function (value_a, value_b) {
            return ((value_b * 100) / value_a).toFixed(5);
        },
        sort: function (o) {
            return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
        },
        sortByConfirmed: function (data) {
            let sorted = {};
            Object
                .keys(data).sort(function(a, b){
                    return data[b].All.confirmed - data[a].All.confirmed;
                })
                .forEach(function(key) {
                    sorted[key] = data[key];
                });
            return sorted;
        }
    },
    watch: {
        searchInput: function (value) {
            this.filteredCountries = this.countries.filter(country => country.name.toLowerCase().includes(value.toLowerCase()));
        }
    }
}
</script>