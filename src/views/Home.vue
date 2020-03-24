<template>
    <div>
        <div class="display-2 mb-4">{{ info.title }}</div>

        <v-row class="mb-3">
            <v-col cols="12" sm="6" md="3">
                <v-card class="border-top-secondary">
                    <v-card-title class="d-flex justify-space-between">
                        Población
                        <v-icon dark class="secondary--text">mdi-human-male</v-icon>
                    </v-card-title>
                    <v-card-text class="display-1">
                        {{ info.population | formatNumber }}
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <v-card class="border-top-primary">
                    <v-card-title class="d-flex justify-space-between">
                        Confirmados
                        <v-icon dark class="primary--text">mdi-check</v-icon>
                    </v-card-title>
                    <v-card-text class="display-1">
                        {{ info.confirmed | formatNumber }}
                        <span class="body-1 blue-grey--text">{{ percentageDifference(info.population, info.confirmed) | percentage }}</span>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <v-card class="border-top-danger">
                    <v-card-title class="d-flex justify-space-between">
                        Muertos
                        <v-icon dark class="error--text">mdi-coffin</v-icon>
                    </v-card-title>
                    <v-card-text class="display-1">
                        {{ info.deaths | formatNumber }}
                        <span class="body-1 blue-grey--text">{{ percentageDifference(info.population, info.deaths) | percentage }}</span>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="border-top-success">
                    <v-card-title class="d-flex justify-space-between">
                        Recuperados
                        <v-icon dark class="success--text">mdi-heart</v-icon>
                    </v-card-title>
                    <v-card-text class="display-1">
                        {{ info.recovered | formatNumber }}
                        <span class="body-1 blue-grey--text">{{ percentageDifference(info.population, info.recovered) | percentage }}</span>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-card class="px-2 pt-1 pb-4">
            <v-card-title>
                Mostrando datos desde {{ lastDate | moment('from') }}
            </v-card-title>
            <chart
                v-if="chartLoaded"
                :chart-data="chartData"
            ></chart>
        </v-card>

        <div class="mt-12 d-flex flex-column flex-sm-row justify-space-between">
            <div class="display-2">Paises</div>
            <div class="mt-4 mt-sm-0">
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
                        class="pa-1"
                        @click="changeData(country.originalName)"
                        :class="{'active' : isSelected(country.originalName)}"
                        :disabled="isSelected(country.originalName)"
                    >
                        <v-card-title>
                            <div class="text-truncate">{{ country.name }}</div>
                        </v-card-title>
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

        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
import Chart from '@/components/Chart.vue';

export default {
    name: 'home',
    components: { Chart },
    data: function () {
        return {
            info: {
                title: '',
                population: 0,
                confirmed: 0,
                deaths: 0,
                recovered: 0,
            },
            chartLoaded: false,
            chartData: {
                labels: [],
                datasets: []
            },
            countries: [],
            filteredCountries: [],
            searchInput: '',
            tableData: null,
            loading: false
        }
    },
    mounted () {
        const country = this.$route.query.country || 'Global';
        this.loadData(country);

        const countriesUrl = 'https://covid-api-wrapper.herokuapp.com/cases';

        this.axios.get(countriesUrl).then(res => {
            this.loadCountriesData(res.data);
            this.filteredCountries = this.countries;
        });
    },
    methods: {
        loadData: function (country) {
            this.loading = true;
            this.chartLoaded = false;
            const confirmedUrl = `https://covid-api-wrapper.herokuapp.com/history?country=${country}`;

            this.axios.get(confirmedUrl).then(res => {
                this.loadInfo(res.data);
                this.loadConfirmedData(res.data.dates);
                this.tableData = res.data.dates;
            });

            const deathsUrl = `https://covid-api-wrapper.herokuapp.com/history?country=${country}&status=Deaths`;

            this.axios.get(deathsUrl).then(res => {
                this.loadDeathsData(res.data.dates);
            })

            const recoveredUrl = `https://covid-api-wrapper.herokuapp.com/history?country=${country}&status=Recovered`;

            this.axios.get(recoveredUrl).then(res => {
                this.loadRecoveredData(res.data.dates);
            }).finally(() => {
                this.loading = false;
                this.chartLoaded = true;
            });
        },
        loadInfo: function (data) {
            this.info.title = data.name;
            this.info.population = data.population;
            this.info.confirmed = data.confirmed;
            this.info.deaths = data.deaths;
            this.info.recovered = data.recovered;
        },
        loadConfirmedData: function (data) {
            const sortedData = this.sort(data);
            this.chartData.labels = Object.keys(sortedData);
            this.chartData.datasets.push({
                label: 'Confirmados',
                borderColor: '#2196f3',
                data: Object.values(sortedData),
                fill: false,
                pointBackgroundColor: '#2196f3',
                pointHoverBackgroundColor: '#2196f3',
                pointHoverBorderColor: '#2196f3',
            });
        },
        loadDeathsData: function (data) {
            const sortedData = this.sort(data);
            this.chartData.labels = Object.keys(sortedData);
            this.chartData.datasets.push({
                label: 'Muertes',
                borderColor: '#ff5252',
                data: Object.values(sortedData),
                fill: false,
                pointBackgroundColor: '#ff5252',
                pointHoverBackgroundColor: '#ff5252',
                pointHoverBorderColor: '#ff5252',
            });
        },
        loadRecoveredData: function (data) {
            const sortedData = this.sort(data);
            this.chartData.labels = Object.keys(sortedData);
            this.chartData.datasets.push({
                label: 'Recuperados',
                borderColor: '#4caf50',
                data: Object.values(sortedData),
                fill: false,
                pointBackgroundColor: '#4caf50',
                pointHoverBackgroundColor: '#4caf50',
                pointHoverBorderColor: '#4caf50',
            });
        },
        loadCountriesData: function (data) {
            data.map(country => this.countries.push(country));
        },
        changeData: function (countryName) {
            this.chartData = { labels: [], datasets: [] };
            this.$router.push({ query: { country: countryName }}).catch(err => {});
            this.loadData(countryName);
            window.scrollTo(0, 0);
        },
        isSelected: function (countryName) {
            return this.$route.query.country == countryName
                        || (! this.$route.query.country && countryName == 'Global');
        },
        sort: function (o) {
            return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
        },
        percentageDifference: function (value_a, value_b) {
            return ((value_b * 100) / value_a).toFixed(5);
        },
    },
    watch: {
        searchInput: function (value) {
            this.filteredCountries = this.countries.filter(country => country.name.toLowerCase().includes(value.toLowerCase()));
        }
    },
    computed: {
        lastDate: function () {
            return Object.keys(this.tableData)[Object.keys(this.tableData).length - 1];
        }
    }
}
</script>

<style scoped>
    .border-top-primary {
        border-top: 3px solid #2196f3 !important;
    }
    .border-top-secondary {
        border-top: 3px solid #424242 !important;
    }
    .border-top-danger {
        border-top: 3px solid #ff5252 !important;
    }
    .border-top-success {
        border-top: 3px solid #4caf50 !important;
    }
    .active {
        color: #2196f3 !important;
        border: 1px solid #2196f3 !important;
    }
</style> 