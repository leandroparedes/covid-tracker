<template>
    <div>
        <div
            class="font-weight-black text-center text-uppercase mb-8"
            :class="displayClass"
        >
            {{ $vuetify.lang.t('$vuetify.timelineTitle') }}
        </div>

        <v-timeline :dense="timelineDense">
            <v-timeline-item
                v-for="(situation, index) in situations"
                :key="index"
            >
                <template v-slot:opposite>
                    <highlights :highlights="situation.highlights"></highlights>
                </template>
                <situation-card :situation="situation"></situation-card>
            </v-timeline-item>
        </v-timeline>

        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
import SituationCard from '@/components/timeline/SituationCard.vue';
import Highlights from '@/components/timeline/Highlights.vue';

export default {
    name: 'Timeline',
    components: { SituationCard, Highlights },
    data: function () {
        return {
            situations: [],
            loading: false
        }
    },
    mounted () {
        this.loading = true;

        const url = "https://covid-situations.herokuapp.com/v1/situations";

        this.axios.get(url).then(res => {
            this.situations = res.data;
        }).finally(() => this.loading = false);
    },
    computed: {
        timelineDense: function () {
            if (this.$vuetify.breakpoint.name == 'xs'
                || this.$vuetify.breakpoint.name == 'sm'
                || this.$vuetify.breakpoint.name == 'md'
            ) {
                    return true;
            }
            return false;
        },
        displayClass: function () {
            if (this.$vuetify.breakpoint.name == 'md' 
                ||this.$vuetify.breakpoint.name == 'lg' 
                || this.$vuetify.breakpoint.name == 'xl'
            ) {
                return 'display-2';
            }

            return 'display-1';
        }
    }
}
</script>