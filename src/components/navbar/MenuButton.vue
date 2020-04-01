<template>
    <v-menu
        offset-y
        :close-on-content-click="false"
        nudge-width="260"
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

                <v-list-item>
                    <v-list-item-action>
                        <v-switch
                            hide-details
                            flat
                            :ripple="false"
                            @change="changeChartType"
                        >
                        </v-switch>
                    </v-list-item-action>
                    <v-list-item-title>
                        {{ $vuetify.lang.t('$vuetify.chart') }} :
                        {{ this.$store.state.chartType == 'linear' 
                            ? $vuetify.lang.t('$vuetify.linear') 
                            : $vuetify.lang.t('$vuetify.logarithmic') }}
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
</template>

<script>
export default {
    name: 'MenuButton',
    data: function () {
        return {
            languages: [
                { locale: 'en', name: 'english' },
                { locale: 'es', name: 'spanish' }
            ]
        }
    },
    methods: {
        changeLocale: function (locale) {
            this.$vuetify.lang.current = locale;
        },
        changeChartType: function () {
            if (this.$store.state.chartType == 'linear') {
                this.$store.commit('set_chart_type', 'logarithmic');
            } else {
                this.$store.commit('set_chart_type', 'linear');
            }
        }
    }
}
</script>