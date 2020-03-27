<template>
    <v-card class="border-top-danger">
        <v-card-title class="d-flex justify-space-between">
            {{ $vuetify.lang.t('$vuetify.deaths') }}
            <v-icon dark class="error--text">mdi-coffin</v-icon>
        </v-card-title>
        <v-card-text class="display-1">
            {{ country.deaths | formatNumber }}
            <span class="body-1 blue-grey--text">{{ percentageDifference(country.population, country.deaths) | percentage }}</span>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'DeathsCard',
    props: ['country']
}
</script>

<style scoped>
    .border-top-danger {
        border-top: 3px solid #ff5252 !important;
    }
</style>