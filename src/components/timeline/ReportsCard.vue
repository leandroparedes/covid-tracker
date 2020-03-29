<template>
    <v-list dense disabled>
        <v-subheader class="text-uppercase">
            {{ $vuetify.lang.t('$vuetify.reports') }}
        </v-subheader>
        <v-list-item-group color="primary">
            <v-list-item
                v-for="(report, index) in reports"
                :key="index"
            >
                <v-list-item-content>
                    {{ report }}
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
    </v-list>
</template>

<script>
export default {
    name: 'ReportsCard',
    props: ['reports']
}
</script>