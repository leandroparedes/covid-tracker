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
            <span
                v-if="country.newConfirmed > 0"
                class="title success--text"
            >
                +{{ country.newConfirmed | formatNumber }}
            </span>
            <span
                v-else
                class="caption grey--text text--lighten-2"
            >
                {{ $vuetify.lang.t('$vuetify.noNewConfirmed') }}
            </span>
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