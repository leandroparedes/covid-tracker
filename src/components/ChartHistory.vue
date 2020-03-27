<template>
    <v-card>
        <v-card-title>
            {{ $vuetify.lang.t(
                '$vuetify.showingDataFrom',
                $moment(lastDate).locale($vuetify.lang.current).fromNow()
            ) }}
        </v-card-title>
        <chart
            class="px-lg-6 pb-lg-6 px-2 pb-2"
            :chart-data="chartData"
        ></chart>
    </v-card>
</template>

<script>
import Chart from '@/components/Chart.vue';

export default {
    name: 'ChartHistory',
    props: ['chartData'],
    components: { Chart },
    computed: {
        lastDate: function () {
            return this.chartData.labels[0];
        }
    }
}
</script>