<template>
    <v-app>
        <v-app-bar app>
            <router-link to="/" tag="div" style="cursor:pointer" class="v-toolbar__title">Covid-T</router-link>

            <v-spacer></v-spacer>

            <v-btn to="/compare" icon active-class="no-active">
                <v-icon>mdi-chart-line</v-icon>
            </v-btn>

            <v-menu
                offset-y
                :close-on-content-click="false"
                nudge-width="160"
            >
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                
                <v-card tile>
                    <v-list>
                        <v-subheader class="text-uppercase">{{ $vuetify.lang.t('$vuetify.options') }}</v-subheader>

                        <v-list-item>
                            <v-list-item-action>
                                <v-switch
                                    v-model="$vuetify.theme.dark"
                                    hide-details
                                    flat
                                    :ripple="false"
                                >
                                </v-switch>
                            </v-list-item-action>
                            <v-list-item-title>
                                {{ $vuetify.theme.dark ? $vuetify.lang.t('$vuetify.darkMode') : $vuetify.lang.t('$vuetify.lightMode') }}
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-group>
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title>{{ $vuetify.lang.t('$vuetify.language') }}</v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list-item
                                v-for="(lang, i) in languages"
                                :key="i"
                                @click="changeLocale(lang.locale)"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ $vuetify.lang.t(`$vuetify.${lang.name}`) }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-menu>

        </v-app-bar>

        <v-content>
            <v-container class="my-8 px-md-12">
                <router-view></router-view>
            </v-container>
        </v-content>

        <v-footer
            padless
            class="font-weight-medium"
            >
            <v-col
                class="text-center"
                cols="12"
            >
                {{ new Date().getFullYear() }} —
                <strong>{{ $vuetify.lang.t('$vuetify.developedBy') }}
                    <a href="https://github.com/leandroparedes" target="_blank">
                        Leandro Paredes
                    </a>
                </strong>
                
            </v-col>
        </v-footer>
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
    .v-btn--active.no-active::before {
        opacity: 0 !important;
    }
</style>
