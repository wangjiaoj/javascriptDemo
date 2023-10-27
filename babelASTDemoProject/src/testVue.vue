<template>
 <p>{{ name }} World!</p>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue'
export default defineComponent({
    name: 'foo',
    setup() {
        return {
            name: ref('jack')
        }
    }
})
</script>
<style lang="scss">
input {
    color: #333;
}
</style>
