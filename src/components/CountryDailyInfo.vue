<template>
    <div>
        <div class="display-2 mb-4">
            {{ translateCountryName(country) }}
        </div>

        <v-row class="mb-3">
            <v-col cols="12" sm="4">
                <population-card :country="country"></population-card>
            </v-col>
            <v-col cols="12" sm="4">
                <confirmed-card :country="country"></confirmed-card>
            </v-col>
            <v-col cols="12" sm="4">
                <deaths-card :country="country"></deaths-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import PopulationCard from '@/components/PopulationCard.vue';
import ConfirmedCard from '@/components/ConfirmedCard.vue';
import DeathsCard from '@/components/DeathsCard.vue';

export default {
    name: 'CountryDailyInfo',
    props: ['country'],
    components: {
        PopulationCard,
        ConfirmedCard,
        DeathsCard
    },
}
</script>