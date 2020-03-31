<template>
    <v-simple-table
        v-if="situationInNumbers"
        class="mt-3"
    >
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-left">{{ $vuetify.lang.t('$vuetify.location') }}</th>
                    <th class="text-left">{{ $vuetify.lang.t('$vuetify.confirmed') }}</th>
                    <th class="text-left">{{ $vuetify.lang.t('$vuetify.suspected') }}</th>
                    <th class="text-left">{{ $vuetify.lang.t('$vuetify.severe') }}</th>
                    <th class="text-left">{{ $vuetify.lang.t('$vuetify.deaths') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in situationInNumbers" :key="index">
                    <td>{{ item.location }}</td>
                    <td>{{ item.numbers.confirmed || 0 }}</td>
                    <td>{{ item.numbers.suspected || 0 }}</td>
                    <td>{{ item.numbers.severe || 0 }}</td>
                    <td>{{ item.numbers.deaths || 0 }}</td>
                </tr>
            </tbody>
      </template>
    </v-simple-table>
    <div v-else class="text-center">
        <div class="subtitle-1 font-weight-light pt-8 pb-5">
            {{ $vuetify.lang.t('$vuetify.noSituationInNumbers') }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'SituationInNumbers',
    props: ['situationInNumbers']
}
</script>