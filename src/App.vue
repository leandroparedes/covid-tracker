<template>
    <v-app>
        <v-app-bar app dense>
            <router-link to="/" tag="div" style="cursor:pointer" class="v-toolbar__title">Covid-T</router-link>

            <v-spacer></v-spacer>

            <router-link to="/compare" tag="div" style="cursor:pointer">
                <v-icon>mdi-chart-areaspline-variant</v-icon> <span class="ml-2">Comparar paises</span>
            </router-link>
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
