<template>
    <v-card :style="{'border-top': `4px solid ${this.color}`}">
        <v-card-title class="d-flex justify-space-between">
            <slot name="title">Information</slot>
            <v-icon :color="color">
                <slot name="icon">fas fa-info-circle</slot>
            </v-icon>
        </v-card-title>
        <v-card-text class="headline">
            <slot name="count-total">0</slot>
            <span class="body-1 font-weight-bold success--text ml-1">
                <slot name="count-today"></slot>
            </span>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'InfoCard',

    props: {
        color: {
            type: String,
            default: '#2196f3'
        }
    }
}
</script>