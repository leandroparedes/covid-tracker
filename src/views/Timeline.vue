<template>
    <div>
        <div class="display-1 font-weight-black text-center text-uppercase">
            Coronavirus outbreak timeline
        </div>

        <div class="d-flex flex-row-reverse mb-4">
            <v-switch
                v-model="reverse"
                hide-details
                flat
                :ripple="false"
                label="Newer first"
            ></v-switch>
        </div>

        <v-timeline :dense="timelineDense"
        >
            <v-timeline-item
                v-for="(situation, index) in situations"
                :key="index"
            >
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
    watch: {
        reverse: function () {
            this.situations.reverse();
        }
    },
    computed: {
        timelineDense: function () {
            if (this.$vuetify.breakpoint.name == 'xs'
                || this.$vuetify.breakpoint.name == 'sm'
                || this.$vuetify.breakpoint.name == 'md') {
                    return true;
            }
            return false;
        }
    }
}
</script>