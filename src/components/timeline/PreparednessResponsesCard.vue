<template>
    <v-list v-if="preparednessAndResponses" dense>
        <v-subheader class="text-uppercase">
            {{ $vuetify.lang.t('$vuetify.preparednessAndResponses') }}
        </v-subheader>

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
    </v-list>
</template>

<script>
export default {
    name: 'PreparednessAndResponsesCard',
    props: ['preparednessAndResponses']
}
</script>

<style>

</style>