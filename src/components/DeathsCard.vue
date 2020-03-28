<template>
    <v-card class="border-top-danger">
        <v-card-title class="d-flex justify-space-between">
            {{ $vuetify.lang.t('$vuetify.deaths') }}
            <v-icon dark class="error--text">
                fas fa-skull-crossbones
            </v-icon>
        </v-card-title>
        <v-card-text class="display-1">
            {{ country.deaths | formatNumber }}
            <span
                v-if="country.newDeaths > 0"
                class="title success--text"
            >
                +{{ country.newDeaths | formatNumber }}
            </span>
            <span
                v-else
                class="caption grey--text text--lighten-2"
            >
                {{ $vuetify.lang.t('$vuetify.noNewDeaths') }}
            </span>
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