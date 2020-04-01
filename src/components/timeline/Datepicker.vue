<template>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="true"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                v-model="date"
                readonly
                v-on="on"
                filled
                rounded
                :label="$vuetify.lang.t('$vuetify.goToDate')"
            ></v-text-field>
        </template>
            <v-date-picker
                color="primary"
                v-model="date"
                type="date"
                no-title
                scrollable
                @change="selectDate"
                :allowed-dates="allowedDates"
                first-day-of-week="1"
            ></v-date-picker>
    </v-menu>
</template>

<script>
export default {
    name: 'Datepicker',
    data: function () {
        return {
            date: new Date('2019-12-31').toISOString().substr(0, 7),
            menu: false,
            dates: []
        }
    },
    mounted () {
        const url = 'https://covid-situations.herokuapp.com/v1/situations?fields=date';

        this.axios(url).then(res => {
            res.data.map(data => {
                this.dates.push(data.date.replace(/\//g, '-'));
            });
        });
    },
    methods: {
        selectDate: function () {
            this.$refs.menu.save(this.date);
            this.$emit('go-to-date', this.date);
        },
       allowedDates: function (val) {
           return this.dates.indexOf(val) !== -1;
       }
    }
}
</script>