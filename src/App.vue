<template>
    <v-app>
        <v-app-bar app>
            <router-link to="/" tag="div" style="cursor:pointer" class="v-toolbar__title">Covid-T</router-link>

            <v-spacer></v-spacer>

            <navbar-buttons></navbar-buttons>

        </v-app-bar>

        <v-content>
            <v-container class="my-8 px-md-12">
                <router-view :key="$route.fullPath"></router-view>
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
import NavbarButtons from '@/components/navbar/NavbarButtons.vue';

export default {
    name: 'App',
    components: { NavbarButtons }
};
</script>