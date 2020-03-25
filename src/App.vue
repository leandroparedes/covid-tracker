<template>
    <v-app>
        <v-app-bar app>
            <router-link to="/" tag="div" style="cursor:pointer" class="v-toolbar__title">Covid-T</router-link>

            <v-spacer></v-spacer>

            <v-btn to="/compare" icon>
                <v-icon>mdi-chart-line</v-icon>
            </v-btn>
        </v-app-bar>

        <v-content>
            <v-container class="my-8 px-md-12">
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: 'App'
};
</script>

<style scoped>
    .v-card__text, .v-card__title {
        word-break: normal !important;
    }
</style>
