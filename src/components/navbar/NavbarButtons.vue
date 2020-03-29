<template>
    <span>
        <home-button></home-button>

        <timeline-button></timeline-button>

        <compare-charts-button></compare-charts-button>

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
    </span>
</template>

<script>
import TimelineButton from './TimelineButton.vue';
import HomeButton from './HomeButton.vue';
import CompareChartsButton from './CompareChartsButton.vue';

export default {
    name: 'NavbarButtons',
    components: {
        TimelineButton,
        CompareChartsButton,
    }
}
</script>

<style scoped>
    ::v-deep .v-btn--active.no-active::before {
        opacity: 0 !important;
    }
</style>