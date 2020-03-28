<template>
    <v-card class="border-top-primary">
        <v-card-title class="d-flex justify-space-between">
            {{ $vuetify.lang.t('$vuetify.confirmed') }}
            <v-icon dark class="primary--text">
                fas fa-head-side-cough
            </v-icon>
        </v-card-title>
        <v-card-text class="display-1">
            {{ country.confirmed | formatNumber }}
            <span class="body-1 font-weight-bold success--text">+{{ country.newConfirmed | formatNumber }}</span>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'ConfirmedCard',
    props: ['country']
}
</script>

<style scoped>
    .border-top-primary {
        border-top: 3px solid #2196f3 !important;
    }
</style>