<template>
    <div>
        <v-row>
            <v-col cols="8" lg="6">
                <v-card class="title"></v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" lg="4">
                <v-card class="card-height"></v-card>
            </v-col>
            <v-col cols="12" lg="4">
                <v-card class="card-height"></v-card>
            </v-col>
            <v-col cols="12" lg="4">
                <v-card class="card-height"></v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'CountryDailyInfoPlaceholder'
}
</script>

<style scoped>
    .title {
        height: 50px;
    }
    .card-height {
        height: 125px
    }
</style>