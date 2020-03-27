<template>
    <div>
        <country-daily-info
            v-if="countryInfoLoaded"
            :country="selectedCountry"
        ></country-daily-info>

        <chart-history
            v-if="chartLoaded"
            :chart-data="chartData"
        ></chart-history>

        <countries-list
            v-if="countriesLoaded"
            :countries="countries"
            @change-country="handleChangeCountry"
        ></countries-list>

        <v-overlay :value="! allLoaded">
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
            countryInfoLoaded: false,
            chartLoaded: false,
            countriesLoaded: false,
            
            selectedCountry: null,
            chartData: {
                labels: [],
                datasets: []
            },
            countries: []
        }
    },
    mounted () {
        this.loadData(this.$route.query.country || 'Global');

        this.axios.get('https://covid-api-wrapper.herokuapp.com/cases').then(res => {
            res.data.map(country => this.countries.push(country));
            this.countriesLoaded = true;
        });
    },
    methods: {
        loadData: function (country) {
            this.countryInfoLoaded = false;
            this.chartLoaded = false;

            this.axios.get(`https://covid-api-wrapper.herokuapp.com/country/${country}`).then(res => {
                this.selectedCountry = res.data.country;

                this.loadChartData(res.data.confirmedData, {
                    label: this.$vuetify.lang.t('$vuetify.confirmed'),
                    color: '#2196f3',
                });

                this.loadChartData(res.data.deathsData, {
                    label: this.$vuetify.lang.t('$vuetify.deaths'),
                    color: '#ff5252',
                });
            }).finally(() => {
                this.countryInfoLoaded = true;
                this.chartLoaded = true;
            });
        },
        loadChartData: function (data, options) {
            const sortedData = this.sort(data);
            this.chartData.labels = Object.keys(sortedData);
            this.chartData.datasets.push({
                label: options.label,
                borderColor: options.color,
                data: Object.values(sortedData),
                fill: false,
                pointBackgroundColor: options.color,
            });
        },
        handleChangeCountry: function (countryName) {
            this.chartData = { labels: [], datasets: [] };
            this.$router.push({ query: { country: countryName }}).catch(err => {});
            this.loadData(countryName);
            window.scrollTo(0, 0);
        }
    },
    computed: {
        allLoaded: function () {
            return this.countryInfoLoaded && this.chartLoaded && this.countriesLoaded;
        }
    }
}
</script>