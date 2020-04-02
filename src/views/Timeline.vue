<template>
    <div>
        <div v-if="! loading">
            <div
                class="font-weight-black text-center text-uppercase mb-8"
                :class="displayClass"
            >
                {{ $vuetify.lang.t('$vuetify.timelineTitle') }}
            </div>

            <v-row>
                <v-col
                    sm="6" offset-sm="6"
                    lg="4" offset-lg="8"
                    class="d-flex"
                >
                    <datepicker @go-to-date="handleGoToDate"></datepicker>
                    
                    <v-btn
                        fab
                        @click="goToBookmarked"
                        v-if="$store.state.bookmark"
                        class="ml-4"
                        :title="$vuetify.lang.t('$vuetify.goToBookmark')"
                    >
                        <v-icon color="primary">fas fa-bookmark</v-icon>
                    </v-btn>
                </v-col>
            </v-row>

            <v-timeline :dense="timelineDense">
                <v-timeline-item
                    v-for="(situation, index) in situations.data"
                    :key="index"
                >
                    <template v-slot:opposite>
                        <highlights :highlights="situation.highlights"></highlights>
                    </template>
                    <situation-card :situation="situation"></situation-card>
                </v-timeline-item>
            </v-timeline>

            <div
                v-if="situations.links && situations.links.next"
                class="text-center"
            >
                <v-btn
                    @click="loadMore"
                    :loading="loadingMore"
                    text
                    x-large
                >
                    {{ $vuetify.lang.t('$vuetify.loadMore') }}
                </v-btn>
            </div>
        </div>
        <timeline-placeholder v-else></timeline-placeholder>
        
        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
import SituationCard from '@/components/timeline/SituationCard.vue';
import Highlights from '@/components/timeline/Highlights.vue';
import Datepicker from '@/components/timeline/Datepicker.vue';

import TimelinePlaceholder from '@/components/placeholders/Timeline.vue';

export default {
    name: 'Timeline',
    components: {
            SituationCard,
            Highlights,
            Datepicker,
            TimelinePlaceholder
        },
    data: function () {
        return {
            situations: [],
            loading: false,
            loadingMore: false
        }
    },
    mounted () {
        this.loading = true;

        const url = 'https://covid-situations.herokuapp.com/v1/situations?page=1&perPage=10';

        this.axios.get(url).then(res => {
            this.situations = res.data;
        }).finally(() => this.loading = false);
    },
    methods: {
        loadMore: async function () {
            this.loadingMore = true;

            return this.axios.get(this.situations.links.next).then(res => {
                res.data.data.map(situation => {
                    this.situations.data.push(situation);
                });
                this.situations.links.next = res.data.links.next;
                return true;
            }).finally(() => this.loadingMore = false);
        },
        goToBookmarked: function () {
            const bookmarkID = localStorage.getItem('bookmarkID');

            if (! bookmarkID) {
                this.loading = false;
                return;
            }

            this.scrollTo(bookmarkID);
        },
        scrollTo: async function (id) {
            this.loading = true;

            let element = document.getElementById(id);
            while (! element) {
                const loaded = await this.loadMore();
                if (loaded) element = document.getElementById(id);
            }

            // without this, scrollIntoView doesn't center the element on the screen
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                this.loading = false;
            }, 1000);
        },
        handleGoToDate: function (date) {
            this.scrollTo(date.split('-').join(''));
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