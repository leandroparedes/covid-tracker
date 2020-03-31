<template>
    <v-card class="elevation-2" :id="'id-' + id">
        <v-card-title
            class="headline primary--text text-capitalize d-flex justify-space-between"
        >
            <div>
                {{ $moment(situation.date, 'YYYY-MM-DD').locale($vuetify.lang.current).format('dddd, MMMM Do YYYY') }}
            </div>
            <div>
                <a
                    v-if="situation.original_report_link"
                    :href="situation.original_report_link"
                    target="_blank"
                    :title="$vuetify.lang.t('$vuetify.goToOriginalReport')"
                >
                    <v-icon size="16" color="primary">fas fa-external-link-alt</v-icon>
                </a>
            </div>
        </v-card-title>
        <v-card-subtitle class="pt-1 pb-0 caption text-capitalize">
            {{ $moment(situation.date, 'YYYY-MM-DD').locale($vuetify.lang.current).fromNow() }}
        </v-card-subtitle>
        <div class="pa-3 subtitle-1 font-weight-light">
            <v-tabs grow show-arrows centered>
                <v-tab :title="$vuetify.lang.t('$vuetify.reports')">
                    <v-icon>far fa-file-alt</v-icon>
                </v-tab>
                <v-tab :title="$vuetify.lang.t('$vuetify.preparednessAndResponses')">
                    <v-icon>fas fa-shield-virus</v-icon>
                </v-tab>
                <v-tab :title="$vuetify.lang.t('$vuetify.relatedLinks')">
                    <v-icon>fas fa-link</v-icon>
                </v-tab>

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
        </div>
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