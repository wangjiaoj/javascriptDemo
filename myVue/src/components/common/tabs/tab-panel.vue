<template>
    <div class="iv-tab-content" v-show="show">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        props: {
            label: {
                type: String
            },
            disabled: {
                type: Boolean,
                defalut: false
            },
            name: {
                type: String
            },
        },
        data: function() {
            return {
                show: true,
                currentName: this.name
            }
        },
        mounted() {
            this.updateNav();
        },
        methods: {
            updateNav() {
                this.$parent.updateNav();
            }
        }
    }
</script>