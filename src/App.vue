<template>
    <v-app>
        <v-app-bar app>
            <router-link to="/" tag="div" style="cursor:pointer" class="v-toolbar__title">Covid-T</router-link>

            <v-spacer></v-spacer>

            <v-btn to="/compare" icon>
                <v-icon>mdi-chart-line</v-icon>
            </v-btn>

            <v-switch
                v-model="$vuetify.theme.dark"
                hide-details
                flat
                :ripple="false"
                class="ml-2"
            >
            </v-switch>

            <v-menu bottom left>
                <template v-slot:activator="{ on }">
                    <v-btn
                        icon
                        v-on="on"
                    >
                        {{ $vuetify.lang.current }}
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                        v-for="(lang, i) in languages"
                        :key="i"
                        @click="changeLocale(lang.locale)"
                    >
                        <v-list-item-title>
                            {{ $vuetify.lang.t(`$vuetify.${lang.name}`) }}
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
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
    name: 'App',
    data: function () {
        return {
            languages: [
                {
                    locale: 'en',
                    name: 'english'
                },
                {
                    locale: 'es',
                    name: 'spanish'
                }
            ]
        }
    },
    methods: {
        changeLocale: function (locale) {
            this.$vuetify.lang.current = locale;
        }
    }
};
</script>

<style scoped>
    .v-card__text, .v-card__title {
        word-break: normal !important;
    }
</style>
