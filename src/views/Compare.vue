<template>
    <div>
        <v-autocomplete
            v-model="values"
            :items="countries"
            outlined
            chips
            small-chips
            label="Busca paises para compararlos"
            multiple
        ></v-autocomplete>

        <v-card class="px-4 pb-4 pt-1" v-if="values.length">
            <v-card-title>Casos confirmados</v-card-title>
            <chart
                v-if="chartLoaded"
                :chart-data="chartData"
                :chart-options="chartOptions"
            ></chart>
        </v-card>
        <div v-else class="text-center pa-4 font-weight-light font-italic">
            No hay paises seleccionados
        </div>

        <div class="text-center mt-8">
            <router-link to="/">Volver al inicio</router-link>
        </div>
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
            countries: [],
            values: [],
            chartLoaded: false,
            chartData: {
                labels: [],
                datasets: []
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            },
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
        randomColor: function () {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    },
    watch: {
        values: function (newArray, oldArray) {
            this.chartLoaded = false;
            if (newArray.length < oldArray.length) {
                const removed = oldArray.filter(c => !newArray.includes(c))[0];
                const datasets = this.chartData.datasets.filter(d => d.label  != removed);
                this.chartData = {labels: this.chartData.labels, datasets: datasets};
                this.chartLoaded = true;
            } else {
                const lastAdded = newArray.length > 0 ? newArray[newArray.length -1] : newArray[0];

                const historyUrl = `https://covid-api-wrapper.herokuapp.com/history?country=${lastAdded}`;

                this.axios.get(historyUrl).then(res => {
                    const sortedData = this.sort(res.data.dates);
                    this.chartData.labels = Object.keys(sortedData);
                    this.chartData.datasets.push({
                        label: res.data.originalName,
                        borderColor: this.randomColor(),
                        fill: false,
                        data: Object.values(sortedData)
                    });
                }).finally(() => this.chartLoaded = true);
            }
        }
    }
}
</script>