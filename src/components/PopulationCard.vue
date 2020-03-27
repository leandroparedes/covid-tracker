<template>
    <v-card class="border-top-secondary">
        <v-card-title class="d-flex justify-space-between">
            {{ $vuetify.lang.t('$vuetify.population') }}
            <v-icon dark class="secondary--text">mdi-human-male</v-icon>
        </v-card-title>
        <v-card-text class="display-1">
            {{ country.population | formatNumber }}
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'PopulationCard',
    props: ['country']
}
</script>

<style scoped>
    .border-top-secondary {
        border-top: 3px solid #424242 !important;
    }
</style>