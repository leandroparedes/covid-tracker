<template>
    <back-to-top bottom="25px" right="25px" visibleoffsetbottom="60">
        <v-btn
            icon
            fab
            class="background-color: primary darken-1"
            x-small
            dark
            elevation="15"
        >
            <v-icon>fas fa-angle-up</v-icon>
        </v-btn>
    </back-to-top>
</template>

<script>
import BackToTop from 'vue-backtotop';

export default {
    name: 'BackToTopButton',
    components: { BackToTop }
}
</script>