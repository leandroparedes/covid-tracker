<template>
    <v-list v-if="relatedLinks" dense>
        <v-subheader class="text-uppercase">
            {{ $vuetify.lang.t('$vuetify.relatedLinks') }}
        </v-subheader>

        <v-list-item-group color="primary">
            <v-list-item
                v-for="(link, index) in relatedLinks"
                :key="index"
            >
                <v-list-item-content>
                    <a :href="link.link_url" target="_blank">{{ link.link_text }}</a>
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
    </v-list>
    <div v-else class="text-center">
        <div class="subtitle-1 font-weight-light pt-8 pb-5">
            {{ $vuetify.lang.t('$vuetify.noRelatedLinks') }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'RelatedLinks',
    props: ['relatedLinks']
}
</script>

<style>

</style>