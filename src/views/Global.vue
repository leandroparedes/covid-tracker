<template>
    <div>
        <div class="text-center">
            <div class="display-2 font-weight-black">GLOBAL</div>
            <div class="title error--text mt-4">Affected countries: {{ global.totals.affectedCountries }}</div>
        </div>

        <v-row class="mt-4">
            <v-col cols="12" sm="6" lg="3">
                <info-card color="#424242">
                    <template v-slot:title>Cases</template>
                    <template v-slot:icon>fas fa-globe-americas</template>
                    <template v-slot:count-total>{{ global.totals.cases | formatNumber }}</template>
                </info-card>
            </v-col>

            <v-col cols="12" sm="6" lg="3">
                <info-card color="#2196f3">
                    <template v-slot:title>Actives</template>
                    <template v-slot:icon>fas fa-head-side-mask</template>
                    <template v-slot:count-total>{{ global.totals.active | formatNumber }}</template>
                </info-card>
            </v-col>

            <v-col cols="12" sm="6" lg="3">
                <info-card color="#4caf50">
                    <template v-slot:title>Recovered</template>
                    <template v-slot:icon>fas fa-heart</template>
                    <template v-slot:count-total>{{ global.totals.recovered |formatNumber }}</template>
                </info-card>
            </v-col>

            <v-col cols="12" sm="6" lg="3">
                <info-card color="#ff5252">
                    <template v-slot:title>Deaths</template>
                    <template v-slot:icon>fas fa-skull-crossbones</template>
                    <template v-slot:count-total>{{ global.totals.deaths | formatNumber }}</template>
                </info-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import InfoCard from '@/components/InfoCard.vue';

export default {
    name: 'Home',

    components: {
        InfoCard
    },

    mounted () {
        this.$store.dispatch('fetch_global_data');
    },

    computed: {
        ...mapState(['global'])
    }
}
</script>
