<template>
    <div>
        <div class="mt-12 d-flex flex-column flex-sm-row justify-space-between mb-5">
            <v-card class="empty-card title"></v-card>
            <v-card class="empty-card searchInput"></v-card>
        </div>
        <v-row>
            <v-col v-for="i in 8" :key="i" cols="12" sm="6" md="3">
                <v-card class="empty-card"></v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'CountriesListPlaceholder'
}
</script>

<style scoped>
    .empty-card {
        height: 140px;
    }
    .title {
        width: 350px;
        height: 50px;
    }
    .searchInput {
        width: 200px;
        height: 50px;
    }
</style>