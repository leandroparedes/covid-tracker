<template>
    <v-card class="elevation-2">
        <v-card-title class="headline primary--text">
            {{ $moment(situation.date, 'YYYY-MM-DD').locale($vuetify.lang.current).fromNow() }}
        </v-card-title>
        <v-card-subtitle class="pt-1 pb-0 caption">
            {{ $moment(situation.date, 'YYYY-MM-DD').locale($vuetify.lang.current).format('dddd, MMMM Do YYYY') }}
        </v-card-subtitle>
        <v-card-text>
            <reports-card :reports="situation.reports"></reports-card>
            <preparedness-responses-card
                :preparednessAndResponses="situation.preparedness_and_responses"
            ></preparedness-responses-card>
        </v-card-text>
    </v-card>
</template>

<script>
import ReportsCard from '@/components/timeline/ReportsCard.vue';
import PreparednessResponsesCard from '@/components/timeline/PreparednessResponsesCard.vue';

export default {
    name: 'SituationCard',
    props: ['situation'],
    components: { ReportsCard, PreparednessResponsesCard }
}
</script>