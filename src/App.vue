<template>
    <v-app>
        <v-app-bar app>
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
