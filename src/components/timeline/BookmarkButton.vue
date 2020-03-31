<template>
    <v-btn
        icon
        large
        @click="bookmark(situation.date)"
        :title="$vuetify.lang.t('$vuetify.saveBookmark')"
        color="primary"
    >
        <v-icon size="16">
            {{ bookmarked ? 'fas fa-bookmark' : 'far fa-bookmark' }}
        </v-icon>
    </v-btn>
</template>

<script>
export default {
    name: 'BookmarkButton',
    props: ['situation'],
    methods: {
        bookmark: function (date) {
            const bookmarkID = date.split('/').join('');
            this.$store.dispatch('bookmark', bookmarkID);
        }
    },
    computed: {
        bookmarked: function () {
            return this.$store.state.bookmark == this.situation.date.split('/').join('');
        }
    }
}
</script>