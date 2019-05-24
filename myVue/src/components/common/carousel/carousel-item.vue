<template>
     
</template>
<script>
    export default {
        props: {
            img: {
                type: String
            },
            alt: {
                type: String
            },
        },
        data() {
            return {
                show: false,
            }
        },
        computed: {

        },
        mounted() {
            this.updateNav();
        },
        methods: {
            updateNav() {
                this.$parent.updateNav();
            },
        },
    }
</script>
<style lang="scss">

</style>