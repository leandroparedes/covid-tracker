<template>
    <v-badge
        color="error"
        overlap
        dot
        offset-y="15"
        offset-x="10"
        :value="bookmarkExists"
    >
        <v-btn icon to="/timeline" active-class="no-active">
            <v-icon>mdi-timeline-text-outline</v-icon>
        </v-btn>
    </v-badge>
</template>

<script>
export default {
    name: 'TimelineButton',
    computed: {
        bookmarkExists: function () {
            return this.$store.state.bookmark != null;
        }
    }
}
</script>