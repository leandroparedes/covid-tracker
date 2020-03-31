<template>
    <v-card class="elevation-2" :id="'id-' + id">
        <v-card-title class="headline primary--text text-capitalize">
            {{ $moment(situation.date, 'YYYY-MM-DD').locale($vuetify.lang.current).format('dddd, MMMM Do YYYY') }}
        </v-card-title>
        <v-card-subtitle class="pt-1 pb-0 caption text-capitalize">
            {{ $moment(situation.date, 'YYYY-MM-DD').locale($vuetify.lang.current).fromNow() }}
        </v-card-subtitle>
        <v-card-text>
            <v-tabs grow class="mt-4">
                <v-tab><v-icon>far fa-file-alt</v-icon></v-tab>
                <v-tab><v-icon>fas fa-shield-virus</v-icon></v-tab>
                <v-tab><v-icon>fas fa-link</v-icon></v-tab>

                <v-tab-item>
                    <reports-list
                        :reports="situation.reports"
                        @scroll-to-top="handlerScrollToTop"
                    ></reports-list>
                </v-tab-item>

                <v-tab-item>
                    <preparedness-responses-list
                        :preparednessAndResponses="situation.preparedness_and_responses"
                    ></preparedness-responses-list>
                </v-tab-item>
                
                <v-tab-item>
                    <related-links
                        :related-links="situation.related_links"
                    ></related-links>
                </v-tab-item>
            </v-tabs>
        </v-card-text>
    </v-card>
</template>

<script>
import ReportsList from '@/components/timeline/ReportsList.vue';
import PreparednessResponsesList from '@/components/timeline/PreparednessResponsesList.vue';
import RelatedLinks from '@/components/timeline/RelatedLinks.vue';

export default {
    name: 'SituationCard',
    props: ['situation'],
    components: {
        ReportsList,
        PreparednessResponsesList,
        RelatedLinks
    },
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