<template>
    <span>
        <home-button></home-button>

        <timeline-button></timeline-button>

        <compare-charts-button></compare-charts-button>

        <menu-button></menu-button>
    </span>
</template>

<script>
import TimelineButton from './TimelineButton.vue';
import HomeButton from './HomeButton.vue';
import CompareChartsButton from './CompareChartsButton.vue';
import MenuButton from './MenuButton.vue';

export default {
    name: 'NavbarButtons',
    components: {
        TimelineButton,
        HomeButton,
        CompareChartsButton,
        MenuButton
    }
}
</script>

<style scoped>
    ::v-deep .v-btn--active.no-active::before {
        opacity: 0 !important;
    }
</style>