<template>
    <div>
        <div
            class="font-weight-black text-center text-uppercase"
            :class="displayClass"
        >
            {{ $vuetify.lang.t('$vuetify.timelineTitle') }}
        </div>

        <div class="d-flex flex-row-reverse mb-4">
            <v-switch
                v-model="reverse"
                hide-details
                flat
                :ripple="false"
                :label="$vuetify.lang.t('$vuetify.newerFirst')"
            ></v-switch>
        </div>

        <v-timeline :dense="timelineDense">
            <v-timeline-item
                v-for="(situation, index) in situations"
                :key="index"
            >
                <template
                    v-slot:opposite
                    v-if="situation.highlights"
                >
                    <div class="overline">Highlights</div>
                    <div
                        v-for="(highlight, index) in situation.highlights"
                        :key="index"
                    >
                        <div
                            class="primary--text font-weight-light mb-2"
                            :class="displaySize(situation.highlights.length)"
                        >
                            {{ highlight }}
                        </div>
                    </div>
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

export default {
    name: 'Timeline',
    components: { SituationCard },
    data: function () {
        return {
            situations: [],
            loading: false,
            reverse: false
        }
    },
    mounted () {
        this.loading = true;

        const url = "https://covid-situations.herokuapp.com/v1/situations";

        this.axios.get(url).then(res => {
            this.situations = res.data;
        }).finally(() => this.loading = false);
    },
    methods: {
        displaySize: function (highlightsCount) {
            if (highlightsCount > 4) {
                return 'headline';
            }
            return 'display-1'
        }
    },
    watch: {
        reverse: function () {
            this.situations.reverse();
        }
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