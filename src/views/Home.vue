<template>
    <div>
        <div class="display-2 mb-4">{{ translatedName(selectedCountry) }}</div>

        <v-row class="mb-3">
            <v-col cols="12" sm="4">
                <v-card class="border-top-secondary">
                    <v-card-title class="d-flex justify-space-between">
                        {{ $vuetify.lang.t('$vuetify.population') }}
                        <v-icon dark class="secondary--text">mdi-human-male</v-icon>
                    </v-card-title>
                    <v-card-text class="display-1">
                        {{ selectedCountry.population | formatNumber }}
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="4">
                <v-card class="border-top-primary">
                    <v-card-title class="d-flex justify-space-between">
                        {{ $vuetify.lang.t('$vuetify.confirmed') }}
                        <v-icon dark class="primary--text">mdi-check</v-icon>
                    </v-card-title>
                    <v-card-text class="display-1">
                        {{ selectedCountry.confirmed | formatNumber }}
                        <span class="body-1 blue-grey--text">{{ percentageDifference(selectedCountry.population, selectedCountry.confirmed) | percentage }}</span>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="4">
                <v-card class="border-top-danger">
                    <v-card-title class="d-flex justify-space-between">
                        {{ $vuetify.lang.t('$vuetify.deaths') }}
                        <v-icon dark class="error--text">mdi-coffin</v-icon>
                    </v-card-title>
                    <v-card-text class="display-1">
                        {{ selectedCountry.deaths | formatNumber }}
                        <span class="body-1 blue-grey--text">{{ percentageDifference(selectedCountry.population, selectedCountry.deaths) | percentage }}</span>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-card>
            <v-card-title>
                {{ $vuetify.lang.t(
                    '$vuetify.showingDataFrom',
                    $moment(lastDate).locale($vuetify.lang.current).fromNow()
                ) }}
            </v-card-title>
            <v-card-text class="px-6 pt-1 pb-6">
                <chart
                    v-if="chartLoaded"
                    :chart-data="chartData"
                ></chart>
            </v-card-text>
        </v-card>

        <div class="mt-12 d-flex flex-column flex-sm-row justify-space-between">
            <div class="display-2">
                {{ $vuetify.lang.t('$vuetify.countries') }}
            </div>
            <div class="mt-4 mt-sm-0">
                <v-text-field
                    v-model="searchInput"
                    :label="$vuetify.lang.t('$vuetify.searchCountry')"
                    outlined
                    clearable
                    required
                    @click:clear="clearSearchInput"
                ></v-text-field>
            </div>
        </div>

        <div
            v-if="searchInput"
            class="headline mb-3"
        >
            {{ $vuetify.lang.t('$vuetify.searching') }} <span class="blue--text">{{ searchInput }}</span>
        </div>

        <v-row>
            <v-col
                cols="12" sm="6" md="3"
                v-for="(country, index) in filteredCountries"
                :key="index"
            >
                <v-hover v-slot:default="{ hover }">
                    <v-card
                        :elevation="hover ? 10 : 2"
                        class="pa-1"
                        @click="changeData(country.originalName)"
                        :class="{'active disabled-events' : isSelected(country.originalName)}"
                    >
                        <v-card-title>
                            <div class="text-truncate">
                                {{ translatedName(country) }}
                            </div>
                        </v-card-title>
                        <v-card-subtitle>
                            {{ $vuetify.lang.t('$vuetify.confirmedCases') }}
                        </v-card-subtitle>
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
            selectedCountry: null,
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

            const countryInfoUrl = `https://covid-api-wrapper.herokuapp.com/cases?country=${country}`;
            
            this.axios.get(countryInfoUrl).then(res => {
                this.selectedCountry = res.data;
            });

            const confirmedUrl = `https://covid-api-wrapper.herokuapp.com/history?country=${country}`;

            this.axios.get(confirmedUrl).then(res => {
                this.loadConfirmedData(res.data.dates);
                this.tableData = res.data.dates;
            });

            const deathsUrl = `https://covid-api-wrapper.herokuapp.com/history?country=${country}&status=Deaths`;

            this.axios.get(deathsUrl).then(res => {
                this.loadDeathsData(res.data.dates);
            }).finally(() => {
                this.loading = false;
                this.chartLoaded = true;
            });
        },
        loadConfirmedData: function (data) {
            const sortedData = this.sort(data);
            this.chartData.labels = Object.keys(sortedData);
            this.chartData.datasets.push({
                label: this.$vuetify.lang.t('$vuetify.confirmed'),
                borderColor: '#2196f3',
                data: Object.values(sortedData),
                fill: false,
                pointBackgroundColor: '#2196f3'
            });
        },
        loadDeathsData: function (data) {
            const sortedData = this.sort(data);
            this.chartData.labels = Object.keys(sortedData);
            this.chartData.datasets.push({
                label: this.$vuetify.lang.t('$vuetify.deaths'),
                borderColor: '#ff5252',
                data: Object.values(sortedData),
                fill: false,
                pointBackgroundColor: '#ff5252',
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
        clearSearchInput: function () {
            this.searchInput = '';
        },
        translatedName: function (country) {
            if (country) {
                switch (this.$vuetify.lang.current) {
                    case 'es': return country.name_es || country.name; break;
                    case 'en': return country.name; break;
                    default: return country.name;
                }
            } else {
                return '';
            }
        }
    },
    watch: {
        searchInput: function (value) {
            if (value) {
                this.filteredCountries = this.countries.filter(country => country.name.toLowerCase().includes(value.toLowerCase()));
            } else {
                this.filteredCountries = this.countries;
            }
        }
    },
    computed: {
        lastDate: function () {
            if (this.tableData) {
                return Object.keys(this.tableData)[Object.keys(this.tableData).length - 1];
            } else {
                return Date.now();
            }
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
    .disabled-events {
        pointer-events: none;
    }
</style> 