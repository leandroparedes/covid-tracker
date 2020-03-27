<template>
    <div>
        <div class="display-2 mb-4">{{ translateCountryName(selectedCountry) }}</div>

        <country-daily-info :country="selectedCountry"></country-daily-info>

        <chart-history
            v-if="chartLoaded"
            :chart-data="chartData"
        ></chart-history>

        <countries-list
            :countries="countries"
            @change-country="handleChangeCountry"
        ></countries-list>

        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
import CountryDailyInfo from '@/components/CountryDailyInfo.vue';
import ChartHistory from '@/components/ChartHistory.vue';
import CountriesList from '@/components/CountriesList.vue';

export default {
    name: 'home',
    components: {
        CountryDailyInfo,
        ChartHistory,
        CountriesList
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
            loading: false
        }
    },
    mounted () {
        const country = this.$route.query.country || 'Global';
        this.loadData(country);

        const countriesUrl = 'https://covid-api-wrapper.herokuapp.com/cases';

        this.axios.get(countriesUrl).then(res => {
            this.loadCountriesData(res.data);
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
        handleChangeCountry: function (countryName) {
            this.chartData = { labels: [], datasets: [] };
            this.$router.push({ query: { country: countryName }}).catch(err => {});
            this.loadData(countryName);
            window.scrollTo(0, 0);
        }
    }
}
</script>