<template>
    <v-list v-if="preparednessAndResponses" dense>
        <v-subheader class="text-uppercase">
            <div>
                {{ $vuetify.lang.t('$vuetify.preparednessAndResponses') }}
            </div>
        </v-subheader>

        <span>
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
    <div v-else class="text-center">
        <div class="subtitle-1 pt-5">
            {{ $vuetify.lang.t('$vuetify.noPreparednessOrResponses') }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'PreparednessAndResponsesList',
    props: ['preparednessAndResponses']
}
</script>

<style>

</style>