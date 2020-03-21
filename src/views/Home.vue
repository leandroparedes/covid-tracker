<template>
    <div>
        home
    </div>
</template>

<script>
export default {
    name: 'home',
    created () {
        const url = 'https://covid-api.mmediagroup.fr/v1/history?country=Global&status=confirmed';
        this.axios.get(url).then(res => {
            console.log(res);
        });
    }
}
</script>