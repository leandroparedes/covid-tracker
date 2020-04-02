<template>
    <v-app>
        <v-app-bar app>
            <v-btn icon large to="/global">
                <v-icon>fas fa-globe-americas</v-icon>
            </v-btn>
        <v-content>
            <v-container>
                <router-view :key="$route.fullPath"></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: 'App'
}
</script>
