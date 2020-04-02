<template>
    <div>
        <v-card class="heading mx-auto mb-6"></v-card>
        <v-row class="mb-6">
            <v-col
                sm="6" offset-sm="6"
                lg="4" offset-lg="8"
            >
                <v-card class="datepicker"></v-card>
            </v-col>
        </v-row>
    
    <v-timeline :dense="dense">
        <v-timeline-item color="secondary" v-for="i in 3" :key="i">
            <v-card class="timeline-item"></v-card>
        </v-timeline-item>
    </v-timeline>
    </div>
</template>

<script>
export default {
    name: 'TimelinePlaceholder',
    computed: {
        dense: function () {
            return this.$vuetify.breakpoint.name == 'xs'
                    || this.$vuetify.breakpoint.name == 'sm'
                    || this.$vuetify.breakpoint.name == 'md';
        }
    }
}
</script>

<style scoped>
    .heading {
        height: 60px;
        width: 80%;
    }
    .datepicker {
        height: 50px;
    }
    .timeline-item {
        height: 400px;
    }
</style>