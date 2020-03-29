<template>
    <v-list v-if="preparednessAndResponses" dense>
        <v-subheader class="text-uppercase d-flex justify-space-between">
            <div>
                {{ $vuetify.lang.t('$vuetify.preparednessAndResponses') }}
            </div>
            <v-btn text small color="primary" @click="showList = !showList">
                {{ showList ? $vuetify.lang.t('$vuetify.hide') : $vuetify.lang.t('$vuetify.show') }}
            </v-btn>
        </v-subheader>

        <span v-if="showList">
            <v-list-group
                v-for="(action, index) in preparednessAndResponses"
                :key="index"
            >
                <template v-slot:activator>
                    <v-list-item-title>{{ action.authority }}</v-list-item-title>
                </template>

                <v-list-item
                    v-for="(action, index) in action.actions"
                    :key="index"
                >
                    <v-list-item-content>{{ action }}</v-list-item-content>
                </v-list-item>
            </v-list-group>
        </span>
    </v-list>
</template>

<script>
export default {
    name: 'PreparednessAndResponsesList',
    props: ['preparednessAndResponses'],
    data: function () {
        return {
            showList: false
        }
    }
}
</script>

<style>

</style>