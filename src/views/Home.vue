<template>
    <div>
        <div class="display-2 mb-4">{{ translatedName(selectedCountry) }}</div>

        <country-daily-info :country="selectedCountry"></country-daily-info>

        <chart-history
            v-if="chartLoaded"
            :chart-data="chartData"
        ></chart-history>

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
import CountryDailyInfo from '@/components/CountryDailyInfo.vue';
import ChartHistory from '@/components/ChartHistory.vue';

export default {
    name: 'home',
    components: {
        CountryDailyInfo,
        ChartHistory
    },
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
    }
}
</script>

<style scoped>
    .active {
        color: #2196f3 !important;
        border: 1px solid #2196f3 !important;
    }
    .disabled-events {
        pointer-events: none;
    }
</style> 