<template>
    <div>
        <v-list dense disabled>
            <v-subheader class="text-uppercase">
                {{ $vuetify.lang.t('$vuetify.reports') }}
            </v-subheader>
            <v-list-item-group color="primary">
                <v-list-item
                    v-for="(report, index) in slicedReports"
                    :key="index"
                >
                    <v-list-item-content>
                        {{ report }}
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>

        <div v-if="reports.length > this.showCount" class="text-center">
            <v-btn
                text
                color="primary"
                @click="toggleShow"
            >
                {{ isShowingMore ? $vuetify.lang.t('$vuetify.showLess') : $vuetify.lang.t('$vuetify.showMore') }}
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ReportsList',
    props: ['reports'],
    data: function () {
        return {
            slicedReports: [],
            showCount: 2,
            isShowingMore: false
        }
    },
    mounted () {
        this.slicedReports = this.reports.slice(0, this.showCount);
    },
    methods: {
        toggleShow: function () {
            if (this.slicedReports.length === this.reports.length) {
                this.slicedReports = this.reports.slice(0, this.showCount);
                this.isShowingMore = false;
            } else {
                this.slicedReports = this.reports;
                this.isShowingMore = true;
            }
        }
    },
    watch: {
        reports: function () {
            this.slicedReports = this.reports.slice(0, this.showCount);
        }
    }
}
</script>