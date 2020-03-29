<template>
    <v-badge
        color="error"
        overlap
        dot
        offset-y="15"
        offset-x="10"
        :value="! buttonTimelineClicked"
    >
        <v-btn icon to="/timeline" active-class="no-active" @click="buttonTimelineClicked = true">
            <v-icon>mdi-timeline-text-outline</v-icon>
        </v-btn>
    </v-badge>
</template>

<script>
export default {
    name: 'ButtonTimeline',
    data: function () {
        return {
             buttonTimelineClicked: false
        }
    }
}
</script>

<style scoped>
    .v-btn--active.no-active::before {
        opacity: 0 !important;
    }
</style>