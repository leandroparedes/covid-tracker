<template>
    <v-card class="elevation-2" :id="'id-' + id">
        <v-card-title class="headline primary--text text-capitalize">
            {{ $moment(situation.date, 'YYYY-MM-DD').locale($vuetify.lang.current).format('dddd, MMMM Do YYYY') }}
        </v-card-title>
        <v-card-subtitle class="pt-1 pb-0 caption text-capitalize">
            {{ $moment(situation.date, 'YYYY-MM-DD').locale($vuetify.lang.current).fromNow() }}
        </v-card-subtitle>
        <v-card-text>
            <reports-list :reports="situation.reports" @scroll-to-top="handlerScrollToTop"></reports-list>
            <preparedness-responses-list
                :preparednessAndResponses="situation.preparedness_and_responses"
            ></preparedness-responses-list>
        </v-card-text>
    </v-card>
</template>

<script>
import ReportsList from '@/components/timeline/ReportsList.vue';
import PreparednessResponsesList from '@/components/timeline/PreparednessResponsesList.vue';

export default {
    name: 'SituationCard',
    props: ['situation'],
    components: { ReportsList, PreparednessResponsesList },
    data: function () {
        return {
            id: Math.random()
        }
    },
    methods: {
        handlerScrollToTop: function () {
            const element = document.getElementById('id-' + this.id);
            element.scrollIntoView();
            window.scrollBy(0, -100);
        }
    }
}
</script>