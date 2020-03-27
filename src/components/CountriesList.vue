<template>
    <div>
        <div class="mt-12 d-flex flex-column flex-sm-row justify-space-between">
            <div class="display-2">
                {{ $vuetify.lang.t('$vuetify.countries') }}
            </div>
            <div class="mt-4 mt-sm-0">
                <v-text-field
                    v-model="search"
                    :label="$vuetify.lang.t('$vuetify.searchCountry')"
                    outlined
                    clearable
                    required
                    @click:clear="clearInput"
                ></v-text-field>
            </div>
        </div>

        <div v-if="search" class="headline mb-3">
            {{ $vuetify.lang.t('$vuetify.searching') }} <span class="blue--text">{{ search }}</span>
        </div>

        <v-row>
            <v-col
                cols="12" sm="6" md="3"
                v-for="(country, index) in filtered"
                :key="index"
            >
                <v-hover v-slot:default="{ hover }">
                    <v-card
                        :elevation="hover ? 10 : 4"
                        class="pa-1"
                        @click="changeCountry(country.originalName)"
                        :class="{'active disabled-events' : isSelected(country.originalName)}"
                    >
                        <v-card-title>
                            <div class="text-truncate">
                                {{ translateCountryName(country) }}
                            </div>
                        </v-card-title>
                        <v-card-subtitle>
                            {{ $vuetify.lang.t('$vuetify.confirmedCases') }}
                        </v-card-subtitle>
                        <v-card-text>
                            <span class="display-1">{{ country.confirmed | formatNumber }}</span>
                            <span class="body-1 blue-grey--text">
                                {{ percentageDifference(country.population, country.confirmed) | percentage }}
                            </span>
                        </v-card-text>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'CountriesList',
    props: ['countries'],
    data: function () {
        return {
            search: '',
            filtered: []
        }
    },
    mounted () {
        this.filtered = this.countries;
    },
    methods: {
        clearInput: function () {
            this.search = '';
        },
        isSelected: function (countryName) {
            const countryQuery = this.$route.query.country || 'Global';
            return countryQuery == countryName;
        },
        changeCountry: function (countryName) {
            this.$emit('change-country', countryName);
        }
    },
    watch: {
        search: function (value) {
            const searchValue = value ? value.toLowerCase() : '';
            this.filtered = this.countries.filter(country => {
                return country.name.toLowerCase().includes(searchValue) || country.name_es.toLowerCase().includes(searchValue);
            });
        },
        countries: function () {
            this.filtered = this.countries;
        }
    }
}
</script>

<style scoped>
    .active {
        color: #2196f3 !important;
        border: 1px solid #2196f3 !important;
    }
    .disabled-events {
        pointer-events: none;
    }
</style>