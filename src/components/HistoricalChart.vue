<template>
    <base-chart :chart-data="chartData" :type="type"></base-chart>
</template>

<script>
import BaseChart from './BaseChart.vue';

export default {
    name: 'HistoricalChart',

    props: ['chartData', 'type'],

    components: { BaseChart }
}
</script>
